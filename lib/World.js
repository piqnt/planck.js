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

module.exports = World;

var options = require('./util/options');
var common = require('./util/common');
var Vec2 = require('./common/Vec2');
var BroadPhase = require('./collision/BroadPhase');
var Solver = require('./Solver');
var Body = require('./Body');
var Joint = require('./Joint');
var Contact = require('./Contact');

/**
 * @typedef {Object} WorldDef
 *
 * @prop {Vec2} [gravity = { x : 0, y : 0}]
 * @prop {boolean} [allowSleep = true]
 * @prop {boolean} [warmStarting = true]
 * @prop {boolean} [continuousPhysics = true]
 * @prop {boolean} [subStepping = false]
 * @prop {boolean} [blockSolve = true]
 * @prop {int} [velocityIterations = 8] For the velocity constraint solver.
 * @prop {int} [positionIterations = 3] For the position constraint solver.
 */
var WorldDef = {
  gravity : Vec2.zero(),
  allowSleep : true,
  warmStarting : true,
  continuousPhysics : true,
  subStepping : false,
  blockSolve : true,
  velocityIterations : 8,
  positionIterations : 3
};

/**
 * @param {WordDef|Vec2} def World definition or gravity vector.
 */
function World(def) {
  if (!(this instanceof World)) {
    return new World(def);
  }

  if (def && Vec2.isValid(def)) {
    def = {gravity : def};
  }

  def = options(def, WorldDef);

  this.m_solver = new Solver(this);

  this.m_broadPhase = new BroadPhase();

  this.m_contactList = null;
  this.m_contactCount = 0;

  this.m_bodyList = null;
  this.m_bodyCount = 0;

  this.m_jointList = null;
  this.m_jointCount = 0;

  this.m_stepComplete = true;

  this.m_allowSleep = def.allowSleep;
  this.m_gravity = Vec2.clone(def.gravity);

  this.m_clearForces = true;
  this.m_newFixture = false;
  this.m_locked = false;

  // These are for debugging the solver.
  this.m_warmStarting = def.warmStarting;
  this.m_continuousPhysics = def.continuousPhysics;
  this.m_subStepping = def.subStepping;

  this.m_blockSolve = def.blockSolve;
  this.m_velocityIterations = def.velocityIterations;
  this.m_positionIterations = def.positionIterations;

  this.m_t = 0;

  this.m_stepCount = 0;

  // Broad-phase callback.
  this.addPair = this.createContact.bind(this);
}

World.prototype._serialize = function() {
  var bodies = [];
  var joints = [];

  for (var b = this.getBodyList(); b; b = b.getNext()) {
    bodies.push(b);
  }

  for (var j = this.getJointList(); j; j = j.getNext()) {
    if (typeof j._serialize === 'function') {
      joints.push(j);
    }
  }

  return {
    gravity: this.m_gravity,
    bodies: bodies,
    joints: joints,
  };
};

World._deserialize = function(data, context, restore) {
  if (!data) {
    return new World();
  }

  var world = new World(data.gravity);

  data.bodies && data.bodies.reverse().forEach(function(data) {
    world._addBody(restore(Body, data, world));
  });

  data.joints && data.joints.reverse().forEach(function(data) {
    world.createJoint(restore(Joint, data, world));
  });

  return world;
};

/**
 * Get the world body list. With the returned body, use Body.getNext to get the
 * next body in the world list. A null body indicates the end of the list.
 *
 * @return the head of the world body list.
 */
World.prototype.getBodyList = function() {
  return this.m_bodyList;
}

/**
 * Get the world joint list. With the returned joint, use Joint.getNext to get
 * the next joint in the world list. A null joint indicates the end of the list.
 *
 * @return the head of the world joint list.
 */
World.prototype.getJointList = function() {
  return this.m_jointList;
}

/**
 * Get the world contact list. With the returned contact, use Contact.getNext to
 * get the next contact in the world list. A null contact indicates the end of
 * the list.
 *
 * @return the head of the world contact list. Warning: contacts are created and
 *         destroyed in the middle of a time step. Use ContactListener to avoid
 *         missing contacts.
 */
World.prototype.getContactList = function() {
  return this.m_contactList;
}

World.prototype.getBodyCount = function() {
  return this.m_bodyCount;
}

World.prototype.getJointCount = function() {
  return this.m_jointCount;
}

/**
 * Get the number of contacts (each may have 0 or more contact points).
 */
World.prototype.getContactCount = function() {
  return this.m_contactCount;
}

/**
 * Change the global gravity vector.
 */
World.prototype.setGravity = function(gravity) {
  this.m_gravity = gravity;
}

/**
 * Get the global gravity vector.
 */
World.prototype.getGravity = function() {
  return this.m_gravity;
}

/**
 * Is the world locked (in the middle of a time step).
 */
World.prototype.isLocked = function() {
  return this.m_locked;
}

/**
 * Enable/disable sleep.
 */
World.prototype.setAllowSleeping = function(flag) {
  if (flag == this.m_allowSleep) {
    return;
  }

  this.m_allowSleep = flag;
  if (this.m_allowSleep == false) {
    for (var b = this.m_bodyList; b; b = b.m_next) {
      b.setAwake(true);
    }
  }
}

World.prototype.getAllowSleeping = function() {
  return this.m_allowSleep;
}

/**
 * Enable/disable warm starting. For testing.
 */
World.prototype.setWarmStarting = function(flag) {
  this.m_warmStarting = flag;
}

World.prototype.getWarmStarting = function() {
  return this.m_warmStarting;
}

/**
 * Enable/disable continuous physics. For testing.
 */
World.prototype.setContinuousPhysics = function(flag) {
  this.m_continuousPhysics = flag;
}

World.prototype.getContinuousPhysics = function() {
  return this.m_continuousPhysics;
}

/**
 * Enable/disable single stepped continuous physics. For testing.
 */
World.prototype.setSubStepping = function(flag) {
  this.m_subStepping = flag;
}

World.prototype.getSubStepping = function() {
  return this.m_subStepping;
}

/**
 * Set flag to control automatic clearing of forces after each time step.
 */
World.prototype.setAutoClearForces = function(flag) {
  this.m_clearForces = flag;
}

/**
 * Get the flag that controls automatic clearing of forces after each time step.
 */
World.prototype.getAutoClearForces = function() {
  return this.m_clearForces;
}

/**
 * Manually clear the force buffer on all bodies. By default, forces are cleared
 * automatically after each call to step. The default behavior is modified by
 * calling setAutoClearForces. The purpose of this function is to support
 * sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
 * under a variable frame-rate. When you perform sub-stepping you will disable
 * auto clearing of forces and instead call clearForces after all sub-steps are
 * complete in one pass of your game loop.
 *
 * @see setAutoClearForces
 */
World.prototype.clearForces = function() {
  for (var body = this.m_bodyList; body; body = body.getNext()) {
    body.m_force.setZero();
    body.m_torque = 0.0;
  }
}

/**
 * @function World~rayCastCallback
 *
 * @param fixture
 */

/**
 * Query the world for all fixtures that potentially overlap the provided AABB.
 *
 * @param {World~queryCallback} queryCallback Called for each fixture
 *          found in the query AABB. It may return `false` to terminate the
 *          query.
 *
 * @param aabb The query box.
 */
World.prototype.queryAABB = function(aabb, queryCallback) {
  _ASSERT && common.assert(typeof queryCallback === 'function');
  var broadPhase = this.m_broadPhase;
  this.m_broadPhase.query(aabb, function(proxyId) { //TODO GC
    var proxy = broadPhase.getUserData(proxyId); // FixtureProxy
    return queryCallback(proxy.fixture);
  });
}

/**
 * @function World~rayCastCallback
 *
 * Callback class for ray casts. See World.rayCast
 *
 * Called for each fixture found in the query. You control how the ray cast
 * proceeds by returning a float: return -1: ignore this fixture and continue
 * return 0: terminate the ray cast return fraction: clip the ray to this point
 * return 1: don't clip the ray and continue
 *
 * @param fixture The fixture hit by the ray
 * @param point The point of initial intersection
 * @param normal The normal vector at the point of intersection
 * @param fraction
 *
 * @return {float} -1 to filter, 0 to terminate, fraction to clip the ray for
 *         closest hit, 1 to continue
 */

/**
 *
 * Ray-cast the world for all fixtures in the path of the ray. Your callback
 * controls whether you get the closest point, any point, or n-points. The
 * ray-cast ignores shapes that contain the starting point.
 *
 * @param {World~RayCastCallback} reportFixtureCallback A user implemented
 *          callback function.
 * @param point1 The ray starting point
 * @param point2 The ray ending point
 */
World.prototype.rayCast = function(point1, point2, reportFixtureCallback) {
  _ASSERT && common.assert(typeof reportFixtureCallback === 'function');
  var broadPhase = this.m_broadPhase;

  this.m_broadPhase.rayCast({
    maxFraction : 1.0,
    p1 : point1,
    p2 : point2
  }, function(input, proxyId) { // TODO GC
    var proxy = broadPhase.getUserData(proxyId); // FixtureProxy
    var fixture = proxy.fixture;
    var index = proxy.childIndex;
    var output = {}; // TODO GC
    var hit = fixture.rayCast(output, input, index);
    if (hit) {
      var fraction = output.fraction;
      var point = Vec2.add(Vec2.mul((1.0 - fraction), input.p1), Vec2.mul(fraction, input.p2));
      return reportFixtureCallback(fixture, point, output.normal, fraction);
    }
    return input.maxFraction;
  });
}

/**
 * Get the number of broad-phase proxies.
 */
World.prototype.getProxyCount = function() {
  return this.m_broadPhase.getProxyCount();
}

/**
 * Get the height of broad-phase dynamic tree.
 */
World.prototype.getTreeHeight = function() {
  return this.m_broadPhase.getTreeHeight();
}

/**
 * Get the balance of broad-phase dynamic tree.
 *
 * @returns {int}
 */
World.prototype.getTreeBalance = function() {
  return this.m_broadPhase.getTreeBalance();
}

/**
 * Get the quality metric of broad-phase dynamic tree. The smaller the better.
 * The minimum is 1.
 *
 * @returns {float}
 */
World.prototype.getTreeQuality = function() {
  return this.m_broadPhase.getTreeQuality();
}

/**
 * Shift the world origin. Useful for large worlds. The body shift formula is:
 * position -= newOrigin
 *
 * @param {Vec2} newOrigin The new origin with respect to the old origin
 */
World.prototype.shiftOrigin = function(newOrigin) {
  _ASSERT && common.assert(this.m_locked == false);
  if (this.m_locked) {
    return;
  }

  for (var b = this.m_bodyList; b; b = b.m_next) {
    b.m_xf.p.sub(newOrigin);
    b.m_sweep.c0.sub(newOrigin);
    b.m_sweep.c.sub(newOrigin);
  }

  for (var j = this.m_jointList; j; j = j.m_next) {
    j.shiftOrigin(newOrigin);
  }

  this.m_broadPhase.shiftOrigin(newOrigin);
}

/**
 * @internal Used for deserialize.
 */
World.prototype._addBody = function(body) {
  _ASSERT && common.assert(this.isLocked() === false);
  if (this.isLocked()) {
    return;
  }

  // Add to world doubly linked list.
  body.m_prev = null;
  body.m_next = this.m_bodyList;
  if (this.m_bodyList) {
    this.m_bodyList.m_prev = body;
  }
  this.m_bodyList = body;
  ++this.m_bodyCount;
}

/**
 * Create a rigid body given a definition. No reference to the definition is
 * retained.
 *
 * Warning: This function is locked during callbacks.
 *
 * @param {BodyDef|Vec2} def Body definition or position.
 * @param {float} angle Body angle if def is position.
 */
World.prototype.createBody = function(def, angle) {
  _ASSERT && common.assert(this.isLocked() == false);
  if (this.isLocked()) {
    return null;
  }

  if (def && Vec2.isValid(def)) {
    def = {
      position : def,
      angle : angle
    };
  }

  var body = new Body(this, def);

  this._addBody(body);

  return body;
}

World.prototype.createDynamicBody = function(def, angle) {
  if (!def) {
    def = {};
  } else if (Vec2.isValid(def)) {
    def = { position : def, angle : angle };
  }
  def.type = 'dynamic';
  return this.createBody(def);
}

World.prototype.createKinematicBody = function(def, angle) {
  if (!def) {
    def = {};
  } else if (Vec2.isValid(def)) {
    def = { position : def, angle : angle };
  }
  def.type = 'kinematic';
  return this.createBody(def);
}

/**
 * Destroy a rigid body given a definition. No reference to the definition is
 * retained.
 *
 * Warning: This automatically deletes all associated shapes and joints.
 *
 * Warning: This function is locked during callbacks.
 *
 * @param {Body} b
 */
World.prototype.destroyBody = function(b) {
  _ASSERT && common.assert(this.m_bodyCount > 0);
  _ASSERT && common.assert(this.isLocked() == false);
  if (this.isLocked()) {
    return;
  }

  if (b.m_destroyed) {
    return false;
  }

  // Delete the attached joints.
  var je = b.m_jointList;
  while (je) {
    var je0 = je;
    je = je.next;

    this.publish('remove-joint', je0.joint);
    this.destroyJoint(je0.joint);

    b.m_jointList = je;
  }
  b.m_jointList = null;

  // Delete the attached contacts.
  var ce = b.m_contactList;
  while (ce) {
    var ce0 = ce;
    ce = ce.next;

    this.destroyContact(ce0.contact);

    b.m_contactList = ce;
  }
  b.m_contactList = null;

  // Delete the attached fixtures. This destroys broad-phase proxies.
  var f = b.m_fixtureList;
  while (f) {
    var f0 = f;
    f = f.m_next;

    this.publish('remove-fixture', f0);
    f0.destroyProxies(this.m_broadPhase);

    b.m_fixtureList = f;
  }
  b.m_fixtureList = null;

  // Remove world body list.
  if (b.m_prev) {
    b.m_prev.m_next = b.m_next;
  }

  if (b.m_next) {
    b.m_next.m_prev = b.m_prev;
  }

  if (b == this.m_bodyList) {
    this.m_bodyList = b.m_next;
  }

  b.m_destroyed = true;

  --this.m_bodyCount;

  this.publish('remove-body', b);

  return true;
}

/**
 * Create a joint to constrain bodies together. No reference to the definition
 * is retained. This may cause the connected bodies to cease colliding.
 *
 * Warning: This function is locked during callbacks.
 *
 * @param {Joint} join
 * @param {Body} bodyB
 * @param {Body} bodyA
 */
World.prototype.createJoint = function(joint) {
  _ASSERT && common.assert(!!joint.m_bodyA);
  _ASSERT && common.assert(!!joint.m_bodyB);
  _ASSERT && common.assert(this.isLocked() == false);
  if (this.isLocked()) {
    return null;
  }

  // Connect to the world list.
  joint.m_prev = null;
  joint.m_next = this.m_jointList;
  if (this.m_jointList) {
    this.m_jointList.m_prev = joint;
  }
  this.m_jointList = joint;
  ++this.m_jointCount;

  // Connect to the bodies' doubly linked lists.
  joint.m_edgeA.joint = joint;
  joint.m_edgeA.other = joint.m_bodyB;
  joint.m_edgeA.prev = null;
  joint.m_edgeA.next = joint.m_bodyA.m_jointList;
  if (joint.m_bodyA.m_jointList)
    joint.m_bodyA.m_jointList.prev = joint.m_edgeA;
  joint.m_bodyA.m_jointList = joint.m_edgeA;

  joint.m_edgeB.joint = joint;
  joint.m_edgeB.other = joint.m_bodyA;
  joint.m_edgeB.prev = null;
  joint.m_edgeB.next = joint.m_bodyB.m_jointList;
  if (joint.m_bodyB.m_jointList)
    joint.m_bodyB.m_jointList.prev = joint.m_edgeB;
  joint.m_bodyB.m_jointList = joint.m_edgeB;

  // If the joint prevents collisions, then flag any contacts for filtering.
  if (joint.m_collideConnected == false) {
    for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
      if (edge.other == joint.m_bodyA) {
        // Flag the contact for filtering at the next time step (where either
        // body is awake).
        edge.contact.flagForFiltering();
      }
    }
  }

  // Note: creating a joint doesn't wake the bodies.

  return joint;
}

/**
 * Destroy a joint. This may cause the connected bodies to begin colliding.
 * Warning: This function is locked during callbacks.
 *
 * @param {Joint} join
 */
World.prototype.destroyJoint = function(joint) {
  _ASSERT && common.assert(this.isLocked() == false);
  if (this.isLocked()) {
    return;
  }

  // Remove from the doubly linked list.
  if (joint.m_prev) {
    joint.m_prev.m_next = joint.m_next;
  }

  if (joint.m_next) {
    joint.m_next.m_prev = joint.m_prev;
  }

  if (joint == this.m_jointList) {
    this.m_jointList = joint.m_next;
  }

  // Disconnect from bodies.
  var bodyA = joint.m_bodyA;
  var bodyB = joint.m_bodyB;

  // Wake up connected bodies.
  bodyA.setAwake(true);
  bodyB.setAwake(true);

  // Remove from body 1.
  if (joint.m_edgeA.prev) {
    joint.m_edgeA.prev.next = joint.m_edgeA.next;
  }

  if (joint.m_edgeA.next) {
    joint.m_edgeA.next.prev = joint.m_edgeA.prev;
  }

  if (joint.m_edgeA == bodyA.m_jointList) {
    bodyA.m_jointList = joint.m_edgeA.next;
  }

  joint.m_edgeA.prev = null;
  joint.m_edgeA.next = null;

  // Remove from body 2
  if (joint.m_edgeB.prev) {
    joint.m_edgeB.prev.next = joint.m_edgeB.next;
  }

  if (joint.m_edgeB.next) {
    joint.m_edgeB.next.prev = joint.m_edgeB.prev;
  }

  if (joint.m_edgeB == bodyB.m_jointList) {
    bodyB.m_jointList = joint.m_edgeB.next;
  }

  joint.m_edgeB.prev = null;
  joint.m_edgeB.next = null;

  _ASSERT && common.assert(this.m_jointCount > 0);
  --this.m_jointCount;

  // If the joint prevents collisions, then flag any contacts for filtering.
  if (joint.m_collideConnected == false) {
    var edge = bodyB.getContactList();
    while (edge) {
      if (edge.other == bodyA) {
        // Flag the contact for filtering at the next time step (where either
        // body is awake).
        edge.contact.flagForFiltering();
      }

      edge = edge.next;
    }
  }

  this.publish('remove-joint', joint);
}

var s_step = new Solver.TimeStep(); // reuse

/**
 * Take a time step. This performs collision detection, integration, and
 * constraint solution.
 *
 * Broad-phase, narrow-phase, solve and solve time of impacts.
 *
 * @param {float} timeStep Time step, this should not vary.
 * @param {int} velocityIterations
 * @param {int} positionIterations
 */
World.prototype.step = function(timeStep, velocityIterations, positionIterations) {

  if ((velocityIterations | 0) !== velocityIterations) {
    // TODO: remove this in future
    velocityIterations = 0;
  }

  velocityIterations = velocityIterations || this.m_velocityIterations;
  positionIterations = positionIterations || this.m_positionIterations;

  // TODO: move this to testbed
  this.m_stepCount++;

  // If new fixtures were added, we need to find the new contacts.
  if (this.m_newFixture) {
    this.findNewContacts();
    this.m_newFixture = false;
  }

  this.m_locked = true;

  s_step.reset(timeStep);
  s_step.velocityIterations = velocityIterations;
  s_step.positionIterations = positionIterations;
  s_step.warmStarting = this.m_warmStarting;
  s_step.blockSolve = this.m_blockSolve;

  // Update contacts. This is where some contacts are destroyed.
  this.updateContacts();

  // Integrate velocities, solve velocity constraints, and integrate positions.
  if (this.m_stepComplete && timeStep > 0.0) {
    this.m_solver.solveWorld(s_step);

    // Synchronize fixtures, check for out of range bodies.
    for (var b = this.m_bodyList; b; b = b.getNext()) {
      // If a body was not in an island then it did not move.
      if (b.m_islandFlag == false) {
        continue;
      }

      if (b.isStatic()) {
        continue;
      }

      // Update fixtures (for broad-phase).
      b.synchronizeFixtures();
    }
    // Look for new contacts.
    this.findNewContacts();
  }

  // Handle TOI events.
  if (this.m_continuousPhysics && timeStep > 0.0) {
    this.m_solver.solveWorldTOI(s_step);
  }

  if (this.m_clearForces) {
    this.clearForces();
  }

  this.m_locked = false;
}

/**
 * Call this method to find new contacts.
 */
World.prototype.findNewContacts = function() {
  this.m_broadPhase.updatePairs(this.addPair);
}

/**
 * @private
 *
 * @param {FixtureProxy} proxyA
 * @param {FixtureProxy} proxyB
 */
World.prototype.createContact = function(proxyA, proxyB) {
  var fixtureA = proxyA.fixture;
  var fixtureB = proxyB.fixture;

  var indexA = proxyA.childIndex;
  var indexB = proxyB.childIndex;

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  // Are the fixtures on the same body?
  if (bodyA == bodyB) {
    return;
  }

  // TODO_ERIN use a hash table to remove a potential bottleneck when both
  // bodies have a lot of contacts.
  // Does a contact already exist?
  var edge = bodyB.getContactList(); // ContactEdge
  while (edge) {
    if (edge.other == bodyA) {
      var fA = edge.contact.getFixtureA();
      var fB = edge.contact.getFixtureB();
      var iA = edge.contact.getChildIndexA();
      var iB = edge.contact.getChildIndexB();

      if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
        // A contact already exists.
        return;
      }

      if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
        // A contact already exists.
        return;
      }
    }

    edge = edge.next;
  }

  if (bodyB.shouldCollide(bodyA) == false) {
    return;
  }
  if (fixtureB.shouldCollide(fixtureA) == false) {
    return;
  }

  // Call the factory.
  var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
  if (contact == null) {
    return;
  }

  // Insert into the world.
  contact.m_prev = null;
  if (this.m_contactList != null) {
    contact.m_next = this.m_contactList;
    this.m_contactList.m_prev = contact;
  }
  this.m_contactList = contact;

  ++this.m_contactCount;
}

/**
 * Removes old non-overlapping contacts, applies filters and updates contacts.
 */
World.prototype.updateContacts = function() {
  // Update awake contacts.
  var c, next_c = this.m_contactList;
  while (c = next_c) {
    next_c = c.getNext()
    var fixtureA = c.getFixtureA();
    var fixtureB = c.getFixtureB();
    var indexA = c.getChildIndexA();
    var indexB = c.getChildIndexB();
    var bodyA = fixtureA.getBody();
    var bodyB = fixtureB.getBody();

    // Is this contact flagged for filtering?
    if (c.m_filterFlag) {
      if (bodyB.shouldCollide(bodyA) == false) {
        this.destroyContact(c);
        continue;
      }

      if (fixtureB.shouldCollide(fixtureA) == false) {
        this.destroyContact(c);
        continue;
      }

      // Clear the filtering flag.
      c.m_filterFlag = false;
    }

    var activeA = bodyA.isAwake() && !bodyA.isStatic();
    var activeB = bodyB.isAwake() && !bodyB.isStatic();

    // At least one body must be awake and it must be dynamic or kinematic.
    if (activeA == false && activeB == false) {
      continue;
    }

    var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
    var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
    var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);

    // Here we destroy contacts that cease to overlap in the broad-phase.
    if (overlap == false) {
      this.destroyContact(c);
      continue;
    }

    // The contact persists.
    c.update(this);
  }
}

/**
 * @param {Contact} contact
 */
World.prototype.destroyContact = function(contact) {
  Contact.destroy(contact, this);

  // Remove from the world.
  if (contact.m_prev) {
    contact.m_prev.m_next = contact.m_next;
  }
  if (contact.m_next) {
    contact.m_next.m_prev = contact.m_prev;
  }
  if (contact == this.m_contactList) {
    this.m_contactList = contact.m_next;
  }

  --this.m_contactCount;
}

World.prototype._listeners = null;

/**
 * Register an event listener.
 *
 * @param {string} name
 * @param {function} listener
 */
World.prototype.on = function(name, listener) {
  if (typeof name !== 'string' || typeof listener !== 'function') {
    return this;
  }
  if (!this._listeners) {
    this._listeners = {};
  }
  if (!this._listeners[name]) {
    this._listeners[name] = [];
  }
  this._listeners[name].push(listener);
  return this;
};

/**
 * Remove an event listener.
 *
 * @param {string} name
 * @param {function} listener
 */
World.prototype.off = function(name, listener) {
  if (typeof name !== 'string' || typeof listener !== 'function') {
    return this;
  }
  var listeners = this._listeners && this._listeners[name];
  if (!listeners || !listeners.length) {
    return this;
  }
  var index = listeners.indexOf(listener);
  if (index >= 0) {
    listeners.splice(index, 1);
  }
  return this;
};

World.prototype.publish = function(name, arg1, arg2, arg3) {
  var listeners = this._listeners && this._listeners[name];
  if (!listeners || !listeners.length) {
    return 0;
  }
  for (var l = 0; l < listeners.length; l++) {
    listeners[l].call(this, arg1, arg2, arg3);
  }
  return listeners.length;
};

/**
 * @event World#remove-body
 * @event World#remove-joint
 * @event World#remove-fixture
 *
 * Joints and fixtures are destroyed when their associated body is destroyed.
 * Register a destruction listener so that you may nullify references to these
 * joints and shapes.
 *
 * `function(object)` is called when any joint or fixture is about to
 * be destroyed due to the destruction of one of its attached or parent bodies.
 */

/**
 * @private
 * @param {Contact} contact
 */
World.prototype.beginContact = function(contact) {
  this.publish('begin-contact', contact);
};

/**
 * @event World#begin-contact
 *
 * Called when two fixtures begin to touch.
 *
 * Implement contact callbacks to get contact information. You can use these
 * results for things like sounds and game logic. You can also get contact
 * results by traversing the contact lists after the time step. However, you
 * might miss some contacts because continuous physics leads to sub-stepping.
 * Additionally you may receive multiple callbacks for the same contact in a
 * single time step. You should strive to make your callbacks efficient because
 * there may be many callbacks per time step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */

/**
 * @private
 * @param {Contact} contact
 */
World.prototype.endContact = function(contact) {
  this.publish('end-contact', contact);
};

/**
 * @event World#end-contact
 *
 * Called when two fixtures cease to touch.
 *
 * Implement contact callbacks to get contact information. You can use these
 * results for things like sounds and game logic. You can also get contact
 * results by traversing the contact lists after the time step. However, you
 * might miss some contacts because continuous physics leads to sub-stepping.
 * Additionally you may receive multiple callbacks for the same contact in a
 * single time step. You should strive to make your callbacks efficient because
 * there may be many callbacks per time step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */

/**
 * @private
 * @param {Contact} contact
 * @param {Manifold} oldManifold
 */
World.prototype.preSolve = function(contact, oldManifold) {
  this.publish('pre-solve', contact, oldManifold);
};

/**
 * @event World#pre-solve
 *
 * This is called after a contact is updated. This allows you to inspect a
 * contact before it goes to the solver. If you are careful, you can modify the
 * contact manifold (e.g. disable contact). A copy of the old manifold is
 * provided so that you can detect changes. Note: this is called only for awake
 * bodies. Note: this is called even when the number of contact points is zero.
 * Note: this is not called for sensors. Note: if you set the number of contact
 * points to zero, you will not get an endContact callback. However, you may get
 * a beginContact callback the next step.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */

/**
 * @private
 * @param {Contact} contact
 * @param {ContactImpulse} impulse
 */
World.prototype.postSolve = function(contact, impulse) {
  this.publish('post-solve', contact, impulse);
};

/**
 * @event World#post-solve
 *
 * This lets you inspect a contact after the solver is finished. This is useful
 * for inspecting impulses. Note: the contact manifold does not include time of
 * impact impulses, which can be arbitrarily large if the sub-step is small.
 * Hence the impulse is provided explicitly in a separate data structure. Note:
 * this is only called for contacts that are touching, solid, and awake.
 *
 * Warning: You cannot create/destroy world entities inside these callbacks.
 */

/**
 * Register a contact filter to provide specific control over collision.
 * Otherwise the default filter is used (defaultFilter). The listener is owned
 * by you and must remain in scope.
 *
 * Moved to Fixture.
 */
