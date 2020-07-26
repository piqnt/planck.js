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

module.exports = RopeJoint;

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

var inactiveLimit = 0;
var atLowerLimit = 1;
var atUpperLimit = 2;
var equalLimits = 3;

RopeJoint.TYPE = 'rope-joint';
Joint.TYPES[RopeJoint.TYPE] = RopeJoint;

RopeJoint._super = Joint;
RopeJoint.prototype = create(RopeJoint._super.prototype);

/**
 * @typedef {Object} RopeJointDef
 *
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 *
 * @prop {float} maxLength The maximum length of the rope. Warning: this must be
 *       larger than linearSlop or the joint will have no effect.
 *
 * @prop {Vec2} def.localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} def.localAnchorB The local anchor point relative to bodyB's origin.
 */

var DEFAULTS = {
  maxLength : 0.0,
};

/**
 * A rope joint enforces a maximum distance between two points on two bodies. It
 * has no other effect.
 * 
 * Warning: if you attempt to change the maximum length during the simulation
 * you will get some non-physical behavior.
 * 
 * A model that would allow you to dynamically modify the length would have some
 * sponginess, so I chose not to implement it that way. See DistanceJoint if you
 * want to dynamically control length.
 *
 * @param {RopeJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function RopeJoint(def, bodyA, bodyB, anchor) {
  if (!(this instanceof RopeJoint)) {
    return new RopeJoint(def, bodyA, bodyB, anchor);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = RopeJoint.TYPE;
  this.m_localAnchorA = anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
  this.m_localAnchorB = anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1.0, 0.0);

  this.m_maxLength = def.maxLength;

  this.m_mass = 0.0;
  this.m_impulse = 0.0;
  this.m_length = 0.0;
  this.m_state = inactiveLimit;

  // Solver temp
  this.m_u; // Vec2
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  this.m_mass; // float

  // Limit:
  // C = norm(pB - pA) - L
  // u = (pB - pA) / norm(pB - pA)
  // Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
  // J = [-u -cross(rA, u) u cross(rB, u)]
  // K = J * invM * JT
  // = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2
};

RopeJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    maxLength: this.m_maxLength,
  };
};

RopeJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new RopeJoint(data);
  return joint;
};

/**
 * The local anchor point relative to bodyA's origin.
 */
RopeJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
}

/**
 * The local anchor point relative to bodyB's origin.
 */
RopeJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
}

/**
 * Set/Get the maximum length of the rope.
 */
RopeJoint.prototype.setMaxLength = function(length) {
  this.m_maxLength = length;
}

RopeJoint.prototype.getMaxLength = function() {
  return this.m_maxLength;
}

RopeJoint.prototype.getLimitState = function() {
  // TODO LimitState
  return this.m_state;
}

RopeJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

RopeJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

RopeJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.mul(this.m_impulse, this.m_u).mul(inv_dt);
}

RopeJoint.prototype.getReactionTorque = function(inv_dt) {
  return 0.0;
}

RopeJoint.prototype.initVelocityConstraints = function(step) {
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

  this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
  this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
  this.m_u = Vec2.zero();
  this.m_u.addCombine(1, cB, 1, this.m_rB);
  this.m_u.subCombine(1, cA, 1, this.m_rA); // Vec2

  this.m_length = this.m_u.length();

  var C = this.m_length - this.m_maxLength; // float
  if (C > 0.0) {
    this.m_state = atUpperLimit;
  } else {
    this.m_state = inactiveLimit;
  }

  if (this.m_length > Settings.linearSlop) {
    this.m_u.mul(1.0 / this.m_length);
  } else {
    this.m_u.setZero();
    this.m_mass = 0.0;
    this.m_impulse = 0.0;
    return;
  }

  // Compute effective mass.
  var crA = Vec2.cross(this.m_rA, this.m_u); // float
  var crB = Vec2.cross(this.m_rB, this.m_u); // float
  var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB
      + this.m_invIB * crB * crB; // float

  this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;

  if (step.warmStarting) {
    // Scale the impulse to support a variable time step.
    this.m_impulse *= step.dtRatio;

    var P = Vec2.mul(this.m_impulse, this.m_u);
    
    vA.subMul(this.m_invMassA, P);
    wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
    
    vB.addMul(this.m_invMassB, P);
    wB += this.m_invIB * Vec2.cross(this.m_rB, P);
    
  } else {
    this.m_impulse = 0.0;
  }

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
}

RopeJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  // Cdot = dot(u, v + cross(w, r))
  var vpA = Vec2.addCross(vA, wA, this.m_rA); // Vec2
  var vpB = Vec2.addCross(vB, wB, this.m_rB); // Vec2
  var C = this.m_length - this.m_maxLength; // float
  var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA)); // float

  // Predictive constraint.
  if (C < 0.0) {
    Cdot += step.inv_dt * C;
  }

  var impulse = -this.m_mass * Cdot; // float
  var oldImpulse = this.m_impulse; // float
  this.m_impulse = Math.min(0.0, this.m_impulse + impulse);
  impulse = this.m_impulse - oldImpulse;

  var P = Vec2.mul(impulse, this.m_u); // Vec2
  vA.subMul(this.m_invMassA, P);
  wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
  vB.addMul(this.m_invMassB, P);
  wB += this.m_invIB * Vec2.cross(this.m_rB, P);

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

RopeJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c; // Vec2
  var aA = this.m_bodyA.c_position.a; // float
  var cB = this.m_bodyB.c_position.c; // Vec2
  var aB = this.m_bodyB.c_position.a; // float

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
  var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
  var u = Vec2.zero();
  u.addCombine(1, cB, 1, rB);
  u.subCombine(1, cA, 1, rA); // Vec2

  var length = u.normalize(); // float
  var C = length - this.m_maxLength; // float

  C = Math.clamp(C, 0.0, Settings.maxLinearCorrection);

  var impulse = -this.m_mass * C; // float
  var P = Vec2.mul(impulse, u); // Vec2

  cA.subMul(this.m_invMassA, P);
  aA -= this.m_invIA * Vec2.cross(rA, P);
  cB.addMul(this.m_invMassB, P);
  aB += this.m_invIB * Vec2.cross(rB, P);

  this.m_bodyA.c_position.c.set(cA);
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c.set(cB);
  this.m_bodyB.c_position.a = aB;

  return length - this.m_maxLength < Settings.linearSlop;
}
