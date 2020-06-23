/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports = Body;

var common = require('./util/common');
var options = require('./util/options');

var Vec2 = require('./common/Vec2');
var Rot = require('./common/Rot');
var Math = require('./common/Math');
var Sweep = require('./common/Sweep');
var Transform = require('./common/Transform');
var Velocity = require('./common/Velocity');
var Position = require('./common/Position');

var Fixture = require('./Fixture');
var Shape = require('./Shape');

var staticBody = Body.STATIC = 'static';
var kinematicBody = Body.KINEMATIC = 'kinematic';
var dynamicBody = Body.DYNAMIC = 'dynamic';

/**
 * @typedef {Object} BodyDef
 *
 * @prop type Body types are static, kinematic, or dynamic. Note: if a dynamic
 *       body would have zero mass, the mass is set to one.
 *
 * @prop position The world position of the body. Avoid creating bodies at the
 *       origin since this can lead to many overlapping shapes.
 *
 * @prop angle The world angle of the body in radians.
 *
 * @prop linearVelocity The linear velocity of the body's origin in world
 *       co-ordinates.
 *
 * @prop angularVelocity
 *
 * @prop linearDamping Linear damping is use to reduce the linear velocity. The
 *       damping parameter can be larger than 1.0 but the damping effect becomes
 *       sensitive to the time step when the damping parameter is large.
 *
 * @prop angularDamping Angular damping is use to reduce the angular velocity.
 *       The damping parameter can be larger than 1.0 but the damping effect
 *       becomes sensitive to the time step when the damping parameter is large.
 *
 * @prop fixedRotation Should this body be prevented from rotating? Useful for
 *       characters.
 *
 * @prop bullet Is this a fast moving body that should be prevented from
 *       tunneling through other moving bodies? Note that all bodies are
 *       prevented from tunneling through kinematic and static bodies. This
 *       setting is only considered on dynamic bodies. Warning: You should use
 *       this flag sparingly since it increases processing time.
 *
 * @prop active Does this body start out active?
 *
 * @prop awake Is this body initially awake or sleeping?
 *
 * @prop allowSleep Set this flag to false if this body should never fall
 *       asleep. Note that this increases CPU usage.
 */
var BodyDef = {
  type : staticBody,
  position : Vec2.zero(),
  angle : 0.0,

  linearVelocity : Vec2.zero(),
  angularVelocity : 0.0,

  linearDamping : 0.0,
  angularDamping : 0.0,

  fixedRotation : false,
  bullet : false,
  gravityScale : 1.0,

  allowSleep : true,
  awake : true,
  active : true,

  userData : null
};

/**
 * @class
 * 
 * A rigid body composed of one or more fixtures.
 * 
 * @param {World} world
 * @param {BodyDef} def
 */
function Body(world, def) {

  def = options(def, BodyDef);

  _ASSERT && common.assert(Vec2.isValid(def.position));
  _ASSERT && common.assert(Vec2.isValid(def.linearVelocity));
  _ASSERT && common.assert(Math.isFinite(def.angle));
  _ASSERT && common.assert(Math.isFinite(def.angularVelocity));
  _ASSERT && common.assert(Math.isFinite(def.angularDamping) && def.angularDamping >= 0.0);
  _ASSERT && common.assert(Math.isFinite(def.linearDamping) && def.linearDamping >= 0.0);

  this.m_world = world;

  this.m_awakeFlag = def.awake;
  this.m_autoSleepFlag = def.allowSleep;
  this.m_bulletFlag = def.bullet;
  this.m_fixedRotationFlag = def.fixedRotation;
  this.m_activeFlag = def.active;

  this.m_islandFlag = false;
  this.m_toiFlag = false;

  this.m_userData = def.userData;
  this.m_type = def.type;

  if (this.m_type == dynamicBody) {
    this.m_mass = 1.0;
    this.m_invMass = 1.0;
  } else {
    this.m_mass = 0.0;
    this.m_invMass = 0.0;
  }

  // Rotational inertia about the center of mass.
  this.m_I = 0.0;
  this.m_invI = 0.0;

  // the body origin transform
  this.m_xf = Transform.identity();
  this.m_xf.p = Vec2.clone(def.position);
  this.m_xf.q.setAngle(def.angle);

  // the swept motion for CCD
  this.m_sweep = new Sweep();
  this.m_sweep.setTransform(this.m_xf);

  // position and velocity correction
  this.c_velocity = new Velocity();
  this.c_position = new Position();

  this.m_force = Vec2.zero();
  this.m_torque = 0.0;

  this.m_linearVelocity = Vec2.clone(def.linearVelocity);
  this.m_angularVelocity = def.angularVelocity;

  this.m_linearDamping = def.linearDamping;
  this.m_angularDamping = def.angularDamping;
  this.m_gravityScale = def.gravityScale;

  this.m_sleepTime = 0.0;

  this.m_jointList = null;
  this.m_contactList = null;
  this.m_fixtureList = null;

  this.m_prev = null;
  this.m_next = null;

  this.m_destroyed = false;
}

Body.prototype._serialize = function() {
  var fixtures = [];
  for (var f = this.m_fixtureList; f; f = f.m_next) {
    fixtures.push(f);
  }
  return {
    type: this.m_type,
    position: this.m_xf.p,
    angle: this.m_xf.q.getAngle(),
    linearVelocity: this.m_linearVelocity,
    angularVelocity: this.m_angularVelocity,
    fixtures: fixtures,
  };
};

Body._deserialize = function(data, world, restore) {
  var body = new Body(world, data);

  data.fixtures.forEach(function(data) {
    var fixture = restore(Fixture, data, body);
    body._addFixture(fixture);
  });

  return body;
};

Body.prototype.isWorldLocked = function() {
  return this.m_world && this.m_world.isLocked() ? true : false;
};

Body.prototype.getWorld = function() {
  return this.m_world;
};

Body.prototype.getNext = function() {
  return this.m_next;
};

Body.prototype.setUserData = function(data) {
  this.m_userData = data;
};

Body.prototype.getUserData = function() {
  return this.m_userData;
};

Body.prototype.getFixtureList = function() {
  return this.m_fixtureList;
};

Body.prototype.getJointList = function() {
  return this.m_jointList;
};

/**
 * Warning: this list changes during the time step and you may miss some
 * collisions if you don't use ContactListener.
 */
Body.prototype.getContactList = function() {
  return this.m_contactList;
};

Body.prototype.isStatic = function() {
  return this.m_type == staticBody;
};

Body.prototype.isDynamic = function() {
  return this.m_type == dynamicBody;
};

Body.prototype.isKinematic = function() {
  return this.m_type == kinematicBody;
};

/**
 * This will alter the mass and velocity.
 */
Body.prototype.setStatic = function() {
  this.setType(staticBody);
  return this;
};

Body.prototype.setDynamic = function() {
  this.setType(dynamicBody);
  return this;
};

Body.prototype.setKinematic = function() {
  this.setType(kinematicBody);
  return this;
};

/**
 * @private
 */
Body.prototype.getType = function() {
  return this.m_type;
};

/**
 * 
 * @private
 */
Body.prototype.setType = function(type) {
  _ASSERT && common.assert(type === staticBody || type === kinematicBody || type === dynamicBody);
  _ASSERT && common.assert(this.isWorldLocked() == false);

  if (this.isWorldLocked() == true) {
    return;
  }

  if (this.m_type == type) {
    return;
  }

  this.m_type = type;

  this.resetMassData();

  if (this.m_type == staticBody) {
    this.m_linearVelocity.setZero();
    this.m_angularVelocity = 0.0;
    this.m_sweep.forward();
    this.synchronizeFixtures();
  }

  this.setAwake(true);

  this.m_force.setZero();
  this.m_torque = 0.0;

  // Delete the attached contacts.
  var ce = this.m_contactList;
  while (ce) {
    var ce0 = ce;
    ce = ce.next;
    this.m_world.destroyContact(ce0.contact);
  }
  this.m_contactList = null;

  // Touch the proxies so that new contacts will be created (when appropriate)
  var broadPhase = this.m_world.m_broadPhase;
  for (var f = this.m_fixtureList; f; f = f.m_next) {
    var proxyCount = f.m_proxyCount;
    for (var i = 0; i < proxyCount; ++i) {
      broadPhase.touchProxy(f.m_proxies[i].proxyId);
    }
  }
};

Body.prototype.isBullet = function() {
  return this.m_bulletFlag;
};

/**
 * Should this body be treated like a bullet for continuous collision detection?
 */
Body.prototype.setBullet = function(flag) {
  this.m_bulletFlag = !!flag;
};

Body.prototype.isSleepingAllowed = function() {
  return this.m_autoSleepFlag;
};

Body.prototype.setSleepingAllowed = function(flag) {
  this.m_autoSleepFlag = !!flag;
  if (this.m_autoSleepFlag == false) {
    this.setAwake(true);
  }
};

Body.prototype.isAwake = function() {
  return this.m_awakeFlag;
};

/**
 * Set the sleep state of the body. A sleeping body has very low CPU cost.
 * 
 * @param flag Set to true to wake the body, false to put it to sleep.
 */
Body.prototype.setAwake = function(flag) {
  if (flag) {
    if (this.m_awakeFlag == false) {
      this.m_awakeFlag = true;
      this.m_sleepTime = 0.0;
    }
  } else {
    this.m_awakeFlag = false;
    this.m_sleepTime = 0.0;
    this.m_linearVelocity.setZero();
    this.m_angularVelocity = 0.0;
    this.m_force.setZero();
    this.m_torque = 0.0;
  }
};

Body.prototype.isActive = function() {
  return this.m_activeFlag;
};

/**
 * Set the active state of the body. An inactive body is not simulated and
 * cannot be collided with or woken up. If you pass a flag of true, all fixtures
 * will be added to the broad-phase. If you pass a flag of false, all fixtures
 * will be removed from the broad-phase and all contacts will be destroyed.
 * Fixtures and joints are otherwise unaffected.
 * 
 * You may continue to create/destroy fixtures and joints on inactive bodies.
 * Fixtures on an inactive body are implicitly inactive and will not participate
 * in collisions, ray-casts, or queries. Joints connected to an inactive body
 * are implicitly inactive. An inactive body is still owned by a World object
 * and remains
 */
Body.prototype.setActive = function(flag) {
  _ASSERT && common.assert(this.isWorldLocked() == false);

  if (flag == this.m_activeFlag) {
    return;
  }

  this.m_activeFlag = !!flag;

  if (this.m_activeFlag) {
    // Create all proxies.
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
      f.createProxies(broadPhase, this.m_xf);
    }
    // Contacts are created the next time step.

  } else {
    // Destroy all proxies.
    var broadPhase = this.m_world.m_broadPhase;
    for (var f = this.m_fixtureList; f; f = f.m_next) {
      f.destroyProxies(broadPhase);
    }

    // Destroy the attached contacts.
    var ce = this.m_contactList;
    while (ce) {
      var ce0 = ce;
      ce = ce.next;
      this.m_world.destroyContact(ce0.contact);
    }
    this.m_contactList = null;
  }
};

Body.prototype.isFixedRotation = function() {
  return this.m_fixedRotationFlag;
};

/**
 * Set this body to have fixed rotation. This causes the mass to be reset.
 */
Body.prototype.setFixedRotation = function(flag) {
  if (this.m_fixedRotationFlag == flag) {
    return;
  }

  this.m_fixedRotationFlag = !!flag;

  this.m_angularVelocity = 0.0;

  this.resetMassData();
};

/**
 * Get the world transform for the body's origin.
 */
Body.prototype.getTransform = function() {
  return this.m_xf;
};

/**
 * Set the position of the body's origin and rotation. Manipulating a body's
 * transform may cause non-physical behavior. Note: contacts are updated on the
 * next call to World.step.
 * 
 * @param position The world position of the body's local origin.
 * @param angle The world rotation in radians.
 */
Body.prototype.setTransform = function(position, angle) {
  _ASSERT && common.assert(this.isWorldLocked() == false);
  if (this.isWorldLocked() == true) {
    return;
  }

  this.m_xf.set(position, angle);
  this.m_sweep.setTransform(this.m_xf);

  var broadPhase = this.m_world.m_broadPhase;
  for (var f = this.m_fixtureList; f; f = f.m_next) {
    f.synchronize(broadPhase, this.m_xf, this.m_xf);
  }
};

Body.prototype.synchronizeTransform = function() {
  this.m_sweep.getTransform(this.m_xf, 1);
};

/**
 * Update fixtures in broad-phase.
 */
Body.prototype.synchronizeFixtures = function() {
  var xf = Transform.identity();

  this.m_sweep.getTransform(xf, 0);

  var broadPhase = this.m_world.m_broadPhase;
  for (var f = this.m_fixtureList; f; f = f.m_next) {
    f.synchronize(broadPhase, xf, this.m_xf);
  }
};

/**
 * Used in TOI.
 */
Body.prototype.advance = function(alpha) {
  // Advance to the new safe time. This doesn't sync the broad-phase.
  this.m_sweep.advance(alpha);
  this.m_sweep.c.set(this.m_sweep.c0);
  this.m_sweep.a = this.m_sweep.a0;
  this.m_sweep.getTransform(this.m_xf, 1);
};

/**
 * Get the world position for the body's origin.
 */
Body.prototype.getPosition = function() {
  return this.m_xf.p;
};

Body.prototype.setPosition = function(p) {
  this.setTransform(p, this.m_sweep.a);
};

/**
 * Get the current world rotation angle in radians.
 */
Body.prototype.getAngle = function() {
  return this.m_sweep.a;
};

Body.prototype.setAngle = function(angle) {
  this.setTransform(this.m_xf.p, angle);
};

/**
 * Get the world position of the center of mass.
 */
Body.prototype.getWorldCenter = function() {
  return this.m_sweep.c;
};

/**
 * Get the local position of the center of mass.
 */
Body.prototype.getLocalCenter = function() {
  return this.m_sweep.localCenter;
};

/**
 * Get the linear velocity of the center of mass.
 * 
 * @return the linear velocity of the center of mass.
 */
Body.prototype.getLinearVelocity = function() {
  return this.m_linearVelocity;
};

/**
 * Get the world linear velocity of a world point attached to this body.
 * 
 * @param worldPoint A point in world coordinates.
 */
Body.prototype.getLinearVelocityFromWorldPoint = function(worldPoint) {
  var localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
  return Vec2.add(this.m_linearVelocity, Vec2.cross(this.m_angularVelocity,
      localCenter));
};

/**
 * Get the world velocity of a local point.
 * 
 * @param localPoint A point in local coordinates.
 */
Body.prototype.getLinearVelocityFromLocalPoint = function(localPoint) {
  return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
};

/**
 * Set the linear velocity of the center of mass.
 * 
 * @param v The new linear velocity of the center of mass.
 */
Body.prototype.setLinearVelocity = function(v) {
  if (this.m_type == staticBody) {
    return;
  }
  if (Vec2.dot(v, v) > 0.0) {
    this.setAwake(true);
  }
  this.m_linearVelocity.set(v);
};

/**
 * Get the angular velocity.
 * 
 * @returns the angular velocity in radians/second.
 */
Body.prototype.getAngularVelocity = function() {
  return this.m_angularVelocity;
};

/**
 * Set the angular velocity.
 * 
 * @param omega The new angular velocity in radians/second.
 */
Body.prototype.setAngularVelocity = function(w) {
  if (this.m_type == staticBody) {
    return;
  }
  if (w * w > 0.0) {
    this.setAwake(true);
  }
  this.m_angularVelocity = w;
};

Body.prototype.getLinearDamping = function() {
  return this.m_linearDamping;
};

Body.prototype.setLinearDamping = function(linearDamping) {
  this.m_linearDamping = linearDamping;
};

Body.prototype.getAngularDamping = function() {
  return this.m_angularDamping;
};

Body.prototype.setAngularDamping = function(angularDamping) {
  this.m_angularDamping = angularDamping;
};

Body.prototype.getGravityScale = function() {
  return this.m_gravityScale;
};

/**
 * Scale the gravity applied to this body.
 */
Body.prototype.setGravityScale = function(scale) {
  this.m_gravityScale = scale;
};

/**
 * Get the total mass of the body.
 * 
 * @returns The mass, usually in kilograms (kg).
 */
Body.prototype.getMass = function() {
  return this.m_mass;
};

/**
 * Get the rotational inertia of the body about the local origin.
 * 
 * @return the rotational inertia, usually in kg-m^2.
 */
Body.prototype.getInertia = function() {
  return this.m_I + this.m_mass
      * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
};

/**
 * @typedef {Object} MassData This holds the mass data computed for a shape.
 * 
 * @prop mass The mass of the shape, usually in kilograms.
 * @prop center The position of the shape's centroid relative to the shape's
 *       origin.
 * @prop I The rotational inertia of the shape about the local origin.
 */
function MassData() {
  this.mass = 0;
  this.center = Vec2.zero();
  this.I = 0;
};

/**
 * Copy the mass data of the body to data.
 */
Body.prototype.getMassData = function(data) {
  data.mass = this.m_mass;
  data.I = this.getInertia();
  data.center.set(this.m_sweep.localCenter);
};

/**
 * This resets the mass properties to the sum of the mass properties of the
 * fixtures. This normally does not need to be called unless you called
 * SetMassData to override the mass and you later want to reset the mass.
 */
Body.prototype.resetMassData = function() {
  // Compute mass data from shapes. Each shape has its own density.
  this.m_mass = 0.0;
  this.m_invMass = 0.0;
  this.m_I = 0.0;
  this.m_invI = 0.0;
  this.m_sweep.localCenter.setZero();

  // Static and kinematic bodies have zero mass.
  if (this.isStatic() || this.isKinematic()) {
    this.m_sweep.c0.set(this.m_xf.p);
    this.m_sweep.c.set(this.m_xf.p);
    this.m_sweep.a0 = this.m_sweep.a;
    return;
  }

  _ASSERT && common.assert(this.isDynamic());

  // Accumulate mass over all fixtures.
  var localCenter = Vec2.zero();
  for (var f = this.m_fixtureList; f; f = f.m_next) {
    if (f.m_density == 0.0) {
      continue;
    }

    var massData = new MassData();
    f.getMassData(massData);
    this.m_mass += massData.mass;
    localCenter.addMul(massData.mass, massData.center);
    this.m_I += massData.I;
  }

  // Compute center of mass.
  if (this.m_mass > 0.0) {
    this.m_invMass = 1.0 / this.m_mass;
    localCenter.mul(this.m_invMass);

  } else {
    // Force all dynamic bodies to have a positive mass.
    this.m_mass = 1.0;
    this.m_invMass = 1.0;
  }

  if (this.m_I > 0.0 && this.m_fixedRotationFlag == false) {
    // Center the inertia about the center of mass.
    this.m_I -= this.m_mass * Vec2.dot(localCenter, localCenter);
    _ASSERT && common.assert(this.m_I > 0.0);
    this.m_invI = 1.0 / this.m_I;

  } else {
    this.m_I = 0.0;
    this.m_invI = 0.0;
  }

  // Move center of mass.
  var oldCenter = Vec2.clone(this.m_sweep.c);
  this.m_sweep.setLocalCenter(localCenter, this.m_xf);

  // Update center of mass velocity.
  this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(
      this.m_sweep.c, oldCenter)));
};

/**
 * Set the mass properties to override the mass properties of the fixtures. Note
 * that this changes the center of mass position. Note that creating or
 * destroying fixtures can also alter the mass. This function has no effect if
 * the body isn't dynamic.
 * 
 * @param massData The mass properties.
 */
Body.prototype.setMassData = function(massData) {
  _ASSERT && common.assert(this.isWorldLocked() == false);
  if (this.isWorldLocked() == true) {
    return;
  }

  if (this.m_type != dynamicBody) {
    return;
  }

  this.m_invMass = 0.0;
  this.m_I = 0.0;
  this.m_invI = 0.0;

  this.m_mass = massData.mass;
  if (this.m_mass <= 0.0) {
    this.m_mass = 1.0;
  }

  this.m_invMass = 1.0 / this.m_mass;

  if (massData.I > 0.0 && this.m_fixedRotationFlag == false) {
    this.m_I = massData.I - this.m_mass
        * Vec2.dot(massData.center, massData.center);
    _ASSERT && common.assert(this.m_I > 0.0);
    this.m_invI = 1.0 / this.m_I;
  }

  // Move center of mass.
  var oldCenter = Vec2.clone(this.m_sweep.c);
  this.m_sweep.setLocalCenter(massData.center, this.m_xf);

  // Update center of mass velocity.
  this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(
      this.m_sweep.c, oldCenter)));
};

/**
 * Apply a force at a world point. If the force is not applied at the center of
 * mass, it will generate a torque and affect the angular velocity. This wakes
 * up the body.
 * 
 * @param force The world force vector, usually in Newtons (N).
 * @param point The world position of the point of application.
 * @param wake Also wake up the body
 */
Body.prototype.applyForce = function(force, point, wake) {
  if (this.m_type != dynamicBody) {
    return;
  }
  if (wake && this.m_awakeFlag == false) {
    this.setAwake(true);
  }
  // Don't accumulate a force if the body is sleeping.
  if (this.m_awakeFlag) {
    this.m_force.add(force);
    this.m_torque += Vec2.cross(Vec2.sub(point, this.m_sweep.c), force);
  }
};

/**
 * Apply a force to the center of mass. This wakes up the body.
 * 
 * @param force The world force vector, usually in Newtons (N).
 * @param wake Also wake up the body
 */
Body.prototype.applyForceToCenter = function(force, wake) {
  if (this.m_type != dynamicBody) {
    return;
  }
  if (wake && this.m_awakeFlag == false) {
    this.setAwake(true);
  }
  // Don't accumulate a force if the body is sleeping
  if (this.m_awakeFlag) {
    this.m_force.add(force);
  }
};

/**
 * Apply a torque. This affects the angular velocity without affecting the
 * linear velocity of the center of mass. This wakes up the body.
 * 
 * @param torque About the z-axis (out of the screen), usually in N-m.
 * @param wake Also wake up the body
 */
Body.prototype.applyTorque = function(torque, wake) {
  if (this.m_type != dynamicBody) {
    return;
  }
  if (wake && this.m_awakeFlag == false) {
    this.setAwake(true);
  }
  // Don't accumulate a force if the body is sleeping
  if (this.m_awakeFlag) {
    this.m_torque += torque;
  }
};

/**
 * Apply an impulse at a point. This immediately modifies the velocity. It also
 * modifies the angular velocity if the point of application is not at the
 * center of mass. This wakes up the body.
 * 
 * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
 * @param point The world position of the point of application.
 * @param wake Also wake up the body
 */
Body.prototype.applyLinearImpulse = function(impulse, point, wake) {
  if (this.m_type != dynamicBody) {
    return;
  }
  if (wake && this.m_awakeFlag == false) {
    this.setAwake(true);
  }

  // Don't accumulate velocity if the body is sleeping
  if (this.m_awakeFlag) {
    this.m_linearVelocity.addMul(this.m_invMass, impulse);
    this.m_angularVelocity += this.m_invI * Vec2.cross(Vec2.sub(point, this.m_sweep.c), impulse);
  }
};

/**
 * Apply an angular impulse.
 * 
 * @param impulse The angular impulse in units of kg*m*m/s
 * @param wake Also wake up the body
 */
Body.prototype.applyAngularImpulse = function(impulse, wake) {
  if (this.m_type != dynamicBody) {
    return;
  }

  if (wake && this.m_awakeFlag == false) {
    this.setAwake(true);
  }
  // Don't accumulate velocity if the body is sleeping
  if (this.m_awakeFlag) {
    this.m_angularVelocity += this.m_invI * impulse;
  }
};

/**
 * This is used to prevent connected bodies (by joints) from colliding,
 * depending on the joint's collideConnected flag.
 */
Body.prototype.shouldCollide = function(that) {
  // At least one body should be dynamic.
  if (this.m_type != dynamicBody && that.m_type != dynamicBody) {
    return false;
  }
  // Does a joint prevent collision?
  for (var jn = this.m_jointList; jn; jn = jn.next) {
    if (jn.other == that) {
      if (jn.joint.m_collideConnected == false) {
        return false;
      }
    }
  }
  return true;
};

/**
 * @internal Used for deserialize.
 */
Body.prototype._addFixture = function(fixture) {
  _ASSERT && common.assert(this.isWorldLocked() == false);

  if (this.isWorldLocked() == true) {
    return null;
  }

  if (this.m_activeFlag) {
    var broadPhase = this.m_world.m_broadPhase;
    fixture.createProxies(broadPhase, this.m_xf);
  }

  fixture.m_next = this.m_fixtureList;
  this.m_fixtureList = fixture;

  // Adjust mass properties if needed.
  if (fixture.m_density > 0.0) {
    this.resetMassData();
  }

  // Let the world know we have a new fixture. This will cause new contacts
  // to be created at the beginning of the next time step.
  this.m_world.m_newFixture = true;

  return fixture
};

/**
 * Creates a fixture and attach it to this body.
 * 
 * If the density is non-zero, this function automatically updates the mass of
 * the body.
 * 
 * Contacts are not created until the next time step.
 * 
 * Warning: This function is locked during callbacks.

 * @param {Shape|FixtureDef} shape Shape or fixture definition.
 * @param {FixtureDef|number} fixdef Fixture definition or just density.
 */
Body.prototype.createFixture = function(shape, fixdef) {
  _ASSERT && common.assert(this.isWorldLocked() == false);

  if (this.isWorldLocked() == true) {
    return null;
  }

  var fixture = new Fixture(this, shape, fixdef);
  this._addFixture(fixture);
  return fixture
};

/**
 * Destroy a fixture. This removes the fixture from the broad-phase and destroys
 * all contacts associated with this fixture. This will automatically adjust the
 * mass of the body if the body is dynamic and the fixture has positive density.
 * All fixtures attached to a body are implicitly destroyed when the body is
 * destroyed.
 * 
 * Warning: This function is locked during callbacks.
 * 
 * @param fixture The fixture to be removed.
 */
Body.prototype.destroyFixture = function(fixture) {
  _ASSERT && common.assert(this.isWorldLocked() == false);

  if (this.isWorldLocked() == true) {
    return;
  }

  _ASSERT && common.assert(fixture.m_body == this);

  // Remove the fixture from this body's singly linked list.
  var found = false;
  if (this.m_fixtureList === fixture) {
    this.m_fixtureList = fixture.m_next;
    found = true;

  } else {
    var node = this.m_fixtureList;
    while (node != null) {
      if (node.m_next === fixture) {
        node.m_next = fixture.m_next;
        found = true;
        break;
      }
      node = node.m_next;
    }
  }

  // You tried to remove a shape that is not attached to this body.
  _ASSERT && common.assert(found);

  // Destroy any contacts associated with the fixture.
  var edge = this.m_contactList;
  while (edge) {
    var c = edge.contact;
    edge = edge.next;

    var fixtureA = c.getFixtureA();
    var fixtureB = c.getFixtureB();

    if (fixture == fixtureA || fixture == fixtureB) {
      // This destroys the contact and removes it from
      // this body's contact list.
      this.m_world.destroyContact(c);
    }
  }

  if (this.m_activeFlag) {
    var broadPhase = this.m_world.m_broadPhase;
    fixture.destroyProxies(broadPhase);
  }

  fixture.m_body = null;
  fixture.m_next = null;

  this.m_world.publish('remove-fixture', fixture);

  // Reset the mass data.
  this.resetMassData();
};

/**
 * Get the corresponding world point of a local point.
 */
Body.prototype.getWorldPoint = function(localPoint) {
  return Transform.mulVec2(this.m_xf, localPoint);
};

/**
 * Get the corresponding world vector of a local vector.
 */
Body.prototype.getWorldVector = function(localVector) {
  return Rot.mulVec2(this.m_xf.q, localVector);
};

/**
 * Gets the corresponding local point of a world point.
 */
Body.prototype.getLocalPoint = function(worldPoint) {
  return Transform.mulTVec2(this.m_xf, worldPoint);
};

/**
 * 
 * Gets the corresponding local vector of a world vector.
 */
Body.prototype.getLocalVector = function(worldVector) {
  return Rot.mulTVec2(this.m_xf.q, worldVector);
};
