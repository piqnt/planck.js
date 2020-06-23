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

module.exports = DistanceJoint;

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

DistanceJoint.TYPE = 'distance-joint';
Joint.TYPES[DistanceJoint.TYPE] = DistanceJoint;

DistanceJoint._super = Joint;
DistanceJoint.prototype = create(DistanceJoint._super.prototype);

/**
 * @typedef {Object} DistanceJointDef
 *
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 * 
 * @prop {float} frequencyHz The mass-spring-damper frequency in Hertz. A value
 *       of 0 disables softness.
 * @prop {float} dampingRatio The damping ratio. 0 = no damping, 1 = critical
 *       damping.
 *
 * @prop {Vec2} def.localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} def.localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {number} def.length Distance length.
 */

var DEFAULTS = {
  frequencyHz : 0.0,
  dampingRatio : 0.0
};

/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 *
 * @param {DistanceJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec2} anchorA Anchor A in global coordination.
 * @param {Vec2} anchorB Anchor B in global coordination.
 */
function DistanceJoint(def, bodyA, bodyB, anchorA, anchorB) {
  if (!(this instanceof DistanceJoint)) {
    return new DistanceJoint(def, bodyA, bodyB, anchorA, anchorB);
  }

  // order of constructor arguments is changed in v0.2
  if (bodyB && anchorA && ('m_type' in anchorA) && ('x' in bodyB) && ('y' in bodyB)) {
    var temp = bodyB;
    bodyB = anchorA;
    anchorA = temp;
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = DistanceJoint.TYPE;

  // Solver shared
  this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
  this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
  this.m_length = Math.isFinite(def.length) ? def.length :
    Vec2.distance(bodyA.getWorldPoint(this.m_localAnchorA), bodyB.getWorldPoint(this.m_localAnchorB));
  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;
  this.m_impulse = 0.0;
  this.m_gamma = 0.0;
  this.m_bias = 0.0;

  // Solver temp
  this.m_u; // Vec2
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA;
  this.m_invMassB;
  this.m_invIA;
  this.m_invIB;
  this.m_mass;

  // 1-D constrained system
  // m (v2 - v1) = lambda
  // v2 + (beta/h) * x1 + gamma * lambda = 0, gamma has units of inverse mass.
  // x2 = x1 + h * v2

  // 1-D mass-damper-spring system
  // m (v2 - v1) + h * d * v2 + h * k *

  // C = norm(p2 - p1) - L
  // u = (p2 - p1) / norm(p2 - p1)
  // Cdot = dot(u, v2 + cross(w2, r2) - v1 - cross(w1, r1))
  // J = [-u -cross(r1, u) u cross(r2, u)]
  // K = J * invM * JT
  // = invMass1 + invI1 * cross(r1, u)^2 + invMass2 + invI2 * cross(r2, u)^2
};

DistanceJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    frequencyHz: this.m_frequencyHz,
    dampingRatio: this.m_dampingRatio,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    length: this.m_length,

    impulse: this.m_impulse,
    gamma: this.m_gamma,
    bias: this.m_bias,
  };
};

DistanceJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new DistanceJoint(data);
  return joint;
};

/**
 * @internal
 */
DistanceJoint.prototype._setAnchors = function(def) {
  if (def.anchorA) {
    this.m_localAnchorA.set(this.m_bodyA.getLocalPoint(def.anchorA));
  } else if (def.localAnchorA) {
    this.m_localAnchorA.set(def.localAnchorA);
  }

  if (def.anchorB) {
    this.m_localAnchorB.set(this.m_bodyB.getLocalPoint(def.anchorB));
  } else if (def.localAnchorB) {
    this.m_localAnchorB.set(def.localAnchorB);
  }

  if (def.length > 0) {
    this.m_length = +def.length;
  } else if (def.length < 0) { // don't change length
  } else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
    this.m_length = Vec2.distance(
        this.m_bodyA.getWorldPoint(this.m_localAnchorA),
        this.m_bodyB.getWorldPoint(this.m_localAnchorB)
    );
  }
}

/**
 * The local anchor point relative to bodyA's origin.
 */
DistanceJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
}

/**
 * The local anchor point relative to bodyB's origin.
 */
DistanceJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
}

/**
 * Set/get the natural length. Manipulating the length can lead to non-physical
 * behavior when the frequency is zero.
 */
DistanceJoint.prototype.setLength = function(length) {
  this.m_length = length;
}

DistanceJoint.prototype.getLength = function() {
  return this.m_length;
}

DistanceJoint.prototype.setFrequency = function(hz) {
  this.m_frequencyHz = hz;
}

DistanceJoint.prototype.getFrequency = function() {
  return this.m_frequencyHz;
}

DistanceJoint.prototype.setDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio;
}

DistanceJoint.prototype.getDampingRatio = function() {
  return this.m_dampingRatio;
}

DistanceJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

DistanceJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

DistanceJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.mul(this.m_impulse, this.m_u).mul(inv_dt);
}

DistanceJoint.prototype.getReactionTorque = function(inv_dt) {
  return 0.0;
}

DistanceJoint.prototype.initVelocityConstraints = function(step) {
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
  this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));

  // Handle singularity.
  var length = this.m_u.length();
  if (length > Settings.linearSlop) {
    this.m_u.mul(1.0 / length);
  } else {
    this.m_u.set(0.0, 0.0);
  }

  var crAu = Vec2.cross(this.m_rA, this.m_u);
  var crBu = Vec2.cross(this.m_rB, this.m_u);
  var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB
      + this.m_invIB * crBu * crBu;

  // Compute the effective mass matrix.
  this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;

  if (this.m_frequencyHz > 0.0) {
    var C = length - this.m_length;

    // Frequency
    var omega = 2.0 * Math.PI * this.m_frequencyHz;

    // Damping coefficient
    var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;

    // Spring stiffness
    var k = this.m_mass * omega * omega;

    // magic formulas
    var h = step.dt;
    this.m_gamma = h * (d + h * k);
    this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
    this.m_bias = C * h * k * this.m_gamma;

    invMass += this.m_gamma;
    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
  } else {
    this.m_gamma = 0.0;
    this.m_bias = 0.0;
  }

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

DistanceJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  // Cdot = dot(u, v + cross(w, r))
  var vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
  var vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));
  var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);

  var impulse = -this.m_mass
      * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
  this.m_impulse += impulse;

  var P = Vec2.mul(impulse, this.m_u);
  vA.subMul(this.m_invMassA, P);
  wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
  vB.addMul(this.m_invMassB, P);
  wB += this.m_invIB * Vec2.cross(this.m_rB, P);

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
}

DistanceJoint.prototype.solvePositionConstraints = function(step) {
  if (this.m_frequencyHz > 0.0) {
    // There is no position correction for soft distance constraints.
    return true;
  }

  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
  var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
  var u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));

  var length = u.normalize();
  var C = length - this.m_length;
  C = Math
      .clamp(C, -Settings.maxLinearCorrection, Settings.maxLinearCorrection);

  var impulse = -this.m_mass * C;
  var P = Vec2.mul(impulse, u);

  cA.subMul(this.m_invMassA, P);
  aA -= this.m_invIA * Vec2.cross(rA, P);
  cB.addMul(this.m_invMassB, P);
  aB += this.m_invIB * Vec2.cross(rB, P);

  this.m_bodyA.c_position.c.set(cA);
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c.set(cB);
  this.m_bodyB.c_position.a = aB;

  return Math.abs(C) < Settings.linearSlop;
}
