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

module.exports = PulleyJoint;

var common = require('../util/common');
var options = require('../util/options');
var create = require('../util/create');
var Settings = require('../Settings');

var Math = require('../common/Math');
var Vec2 = require('../common/Vec2');
var Vec3 = require('../common/Vec3');
var Mat22 = require('../common/Mat22');
var Mat33 = require('../common/Mat33');
var Rot = require('../common/Rot');
var Sweep = require('../common/Sweep');
var Transform = require('../common/Transform');
var Velocity = require('../common/Velocity');
var Position = require('../common/Position');

var Joint = require('../Joint');
var Body = require('../Body');

PulleyJoint.TYPE = 'pulley-joint';
PulleyJoint.MIN_PULLEY_LENGTH = 2.0; // minPulleyLength
Joint.TYPES[PulleyJoint.TYPE] = PulleyJoint;

PulleyJoint._super = Joint;
PulleyJoint.prototype = create(PulleyJoint._super.prototype);

/**
 * @typedef {Object} PulleyJointDef
 *
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 *
 * @prop {Vec2} groundAnchorA The first ground anchor in world coordinates.
 *          This point never moves.
 * @prop {Vec2} groundAnchorB The second ground anchor in world coordinates.
 *          This point never moves.
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {float} ratio The pulley ratio, used to simulate a block-and-tackle.
 * @prop {float} lengthA The reference length for the segment attached to bodyA.
 * @prop {float} lengthB The reference length for the segment attached to bodyB.
 */
var PulleyJointDef = {
  collideConnected : true
};

/**
 * The pulley joint is connected to two bodies and two fixed ground points. The
 * pulley supports a ratio such that: length1 + ratio * length2 <= constant
 * 
 * Yes, the force transmitted is scaled by the ratio.
 * 
 * Warning: the pulley joint can get a bit squirrelly by itself. They often work
 * better when combined with prismatic joints. You should also cover the the
 * anchor points with static shapes to prevent one side from going to zero
 * length.
 *
 * @param {PulleyJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
  if (!(this instanceof PulleyJoint)) {
    return new PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
  }

  def = options(def, PulleyJointDef);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = PulleyJoint.TYPE;
  this.m_groundAnchorA = groundA ? groundA : def.groundAnchorA || Vec2.neo(-1.0, 1.0);
  this.m_groundAnchorB = groundB ? groundB : def.groundAnchorB || Vec2.neo(1.0, 1.0);
  this.m_localAnchorA = anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
  this.m_localAnchorB = anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1.0, 0.0);
  this.m_lengthA = Math.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
  this.m_lengthB = Math.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
  this.m_ratio = Math.isFinite(ratio) ? ratio : def.ratio;

  _ASSERT && common.assert(ratio > Math.EPSILON);

  this.m_constant = this.m_lengthA + this.m_ratio * this.m_lengthB;

  this.m_impulse = 0.0;

  // Solver temp
  this.m_uA; // Vec2
  this.m_uB; // Vec2
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  this.m_mass; // float

  // Pulley:
  // length1 = norm(p1 - s1)
  // length2 = norm(p2 - s2)
  // C0 = (length1 + ratio * length2)_initial
  // C = C0 - (length1 + ratio * length2)
  // u1 = (p1 - s1) / norm(p1 - s1)
  // u2 = (p2 - s2) / norm(p2 - s2)
  // Cdot = -dot(u1, v1 + cross(w1, r1)) - ratio * dot(u2, v2 + cross(w2, r2))
  // J = -[u1 cross(r1, u1) ratio * u2 ratio * cross(r2, u2)]
  // K = J * invM * JT
  // = invMass1 + invI1 * cross(r1, u1)^2 + ratio^2 * (invMass2 + invI2 *
  // cross(r2, u2)^2)
}

PulleyJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    groundAnchorA: this.m_groundAnchorA,
    groundAnchorB: this.m_groundAnchorB,
    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    lengthA: this.m_lengthA,
    lengthB: this.m_lengthB,
    ratio: this.m_ratio,
  };
};

PulleyJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new PulleyJoint(data);
  return joint;
};

/**
 * Get the first ground anchor.
 */
PulleyJoint.prototype.getGroundAnchorA = function() {
  return this.m_groundAnchorA;
}

/**
 * Get the second ground anchor.
 */
PulleyJoint.prototype.getGroundAnchorB = function() {
  return this.m_groundAnchorB;
}

/**
 * Get the current length of the segment attached to bodyA.
 */
PulleyJoint.prototype.getLengthA = function() {
  return this.m_lengthA;
}

/**
 * Get the current length of the segment attached to bodyB.
 */
PulleyJoint.prototype.getLengthB = function() {
  return this.m_lengthB;
}

/**
 * Get the pulley ratio.
 */
PulleyJoint.prototype.getRatio = function() {
  return this.m_ratio;
}

/**
 * Get the current length of the segment attached to bodyA.
 */
PulleyJoint.prototype.getCurrentLengthA = function() {
  var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  var s = this.m_groundAnchorA;
  return Vec2.distance(p, s);
}

/**
 * Get the current length of the segment attached to bodyB.
 */
PulleyJoint.prototype.getCurrentLengthB = function() {
  var p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  var s = this.m_groundAnchorB;
  return Vec2.distance(p, s);
}

PulleyJoint.prototype.shiftOrigin = function(newOrigin) {
  this.m_groundAnchorA.sub(newOrigin);
  this.m_groundAnchorB.sub(newOrigin);
}

PulleyJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

PulleyJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

PulleyJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.mul(this.m_impulse, this.m_uB).mul(inv_dt);
}

PulleyJoint.prototype.getReactionTorque = function(inv_dt) {
  return 0.0;
}

PulleyJoint.prototype.initVelocityConstraints = function(step) {
  this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
  this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
  this.m_invMassA = this.m_bodyA.m_invMass;
  this.m_invMassB = this.m_bodyB.m_invMass;
  this.m_invIA = this.m_bodyA.m_invI;
  this.m_invIB = this.m_bodyB.m_invI;

  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;

  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

  // Get the pulley axes.
  this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
  this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);

  var lengthA = this.m_uA.length();
  var lengthB = this.m_uB.length();

  if (lengthA > 10.0 * Settings.linearSlop) {
    this.m_uA.mul(1.0 / lengthA);
  } else {
    this.m_uA.setZero();
  }

  if (lengthB > 10.0 * Settings.linearSlop) {
    this.m_uB.mul(1.0 / lengthB);
  } else {
    this.m_uB.setZero();
  }

  // Compute effective mass.
  var ruA = Vec2.cross(this.m_rA, this.m_uA); // float
  var ruB = Vec2.cross(this.m_rB, this.m_uB); // float

  var mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
  var mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float

  this.m_mass = mA + this.m_ratio * this.m_ratio * mB;

  if (this.m_mass > 0.0) {
    this.m_mass = 1.0 / this.m_mass;
  }

  if (step.warmStarting) {
    // Scale impulses to support variable time steps.
    this.m_impulse *= step.dtRatio;

    // Warm starting.
    var PA = Vec2.mul(-this.m_impulse, this.m_uA);
    var PB = Vec2.mul(-this.m_ratio * this.m_impulse, this.m_uB);

    vA.addMul(this.m_invMassA, PA);
    wA += this.m_invIA * Vec2.cross(this.m_rA, PA);

    vB.addMul(this.m_invMassB, PB);
    wB += this.m_invIB * Vec2.cross(this.m_rB, PB);

  } else {
    this.m_impulse = 0.0;
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

PulleyJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
  var vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));

  var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio
      * Vec2.dot(this.m_uB, vpB); // float
  var impulse = -this.m_mass * Cdot; // float
  this.m_impulse += impulse;

  var PA = Vec2.mul(-impulse, this.m_uA); // Vec2
  var PB = Vec2.mul(-this.m_ratio * impulse, this.m_uB); // Vec2
  vA.addMul(this.m_invMassA, PA);
  wA += this.m_invIA * Vec2.cross(this.m_rA, PA);
  vB.addMul(this.m_invMassB, PB);
  wB += this.m_invIB * Vec2.cross(this.m_rB, PB);

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

PulleyJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA), qB = Rot.neo(aB);

  var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

  // Get the pulley axes.
  var uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
  var uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);

  var lengthA = uA.length();
  var lengthB = uB.length();

  if (lengthA > 10.0 * Settings.linearSlop) {
    uA.mul(1.0 / lengthA);
  } else {
    uA.setZero();
  }

  if (lengthB > 10.0 * Settings.linearSlop) {
    uB.mul(1.0 / lengthB);
  } else {
    uB.setZero();
  }

  // Compute effective mass.
  var ruA = Vec2.cross(rA, uA);
  var ruB = Vec2.cross(rB, uB);

  var mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
  var mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float

  var mass = mA + this.m_ratio * this.m_ratio * mB; // float

  if (mass > 0.0) {
    mass = 1.0 / mass;
  }

  var C = this.m_constant - lengthA - this.m_ratio * lengthB; // float
  var linearError = Math.abs(C); // float

  var impulse = -mass * C; // float

  var PA = Vec2.mul(-impulse, uA); // Vec2
  var PB = Vec2.mul(-this.m_ratio * impulse, uB); // Vec2

  cA.addMul(this.m_invMassA, PA);
  aA += this.m_invIA * Vec2.cross(rA, PA);
  cB.addMul(this.m_invMassB, PB);
  aB += this.m_invIB * Vec2.cross(rB, PB);

  this.m_bodyA.c_position.c = cA;
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c = cB;
  this.m_bodyB.c_position.a = aB;

  return linearError < Settings.linearSlop;
}
