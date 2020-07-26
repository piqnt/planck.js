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

module.exports = MotorJoint;

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

MotorJoint.TYPE = 'motor-joint';
Joint.TYPES[MotorJoint.TYPE] = MotorJoint;

MotorJoint._super = Joint;
MotorJoint.prototype = create(MotorJoint._super.prototype);

/**
 * @typedef {Object} MotorJointDef
 *
 * Motor joint definition.
 * 
 * @prop {float} angularOffset The bodyB angle minus bodyA angle in radians.
 * @prop {float} maxForce The maximum motor force in N.
 * @prop {float} maxTorque The maximum motor torque in N-m.
 * @prop {float} correctionFactor Position correction factor in the range [0,1].
 * @prop {Vec2} linearOffset Position of bodyB minus the position of bodyA, in
 *       bodyA's frame, in meters.
 */

var DEFAULTS = {
  maxForce : 1.0,
  maxTorque : 1.0,
  correctionFactor : 0.3
};

/**
 * A motor joint is used to control the relative motion between two bodies. A
 * typical usage is to control the movement of a dynamic body with respect to
 * the ground.
 *
 * @param {MotorJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function MotorJoint(def, bodyA, bodyB) {
  if (!(this instanceof MotorJoint)) {
    return new MotorJoint(def, bodyA, bodyB);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = MotorJoint.TYPE;

  this.m_linearOffset = def.linearOffset ? def.linearOffset : bodyA.getLocalPoint(bodyB.getPosition());

  var angleA = bodyA.getAngle();
  var angleB = bodyB.getAngle();
  this.m_angularOffset = angleB - angleA;

  this.m_linearImpulse = Vec2.zero();
  this.m_angularImpulse = 0.0;

  this.m_maxForce = def.maxForce;
  this.m_maxTorque = def.maxTorque;
  this.m_correctionFactor = def.correctionFactor;

  // Solver temp
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_linearError; // Vec2
  this.m_angularError; // float
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  this.m_linearMass; // Mat22
  this.m_angularMass; // float

  // Point-to-point constraint
  // Cdot = v2 - v1
  // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
  // J = [-I -r1_skew I r2_skew ]
  // Identity used:
  // w k % (rx i + ry j) = w * (-ry i + rx j)

  // Angle constraint
  // Cdot = w2 - w1
  // J = [0 0 -1 0 0 1]
  // K = invI1 + invI2
}

MotorJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    linearOffset: this.m_linearOffset,
    maxForce: this.m_maxForce,
    maxTorque: this.m_maxTorque,
    correctionFactor: this.m_correctionFactor,

    _angularOffset: this.m_angularOffset,
  };
};

MotorJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new MotorJoint(data);
  if(data._angularOffset) joint.m_angularOffset = data._angularOffset;
  return joint;
};

/**
 * Set the maximum friction force in N.
 */
MotorJoint.prototype.setMaxForce = function(force) {
  _ASSERT && common.assert(Math.isFinite(force) && force >= 0.0);
  this.m_maxForce = force;
}

/**
 * Get the maximum friction force in N.
 */
MotorJoint.prototype.getMaxForce = function() {
  return this.m_maxForce;
}

/**
 * Set the maximum friction torque in N*m.
 */
MotorJoint.prototype.setMaxTorque = function(torque) {
  _ASSERT && common.assert(Math.isFinite(torque) && torque >= 0.0);
  this.m_maxTorque = torque;
}

/**
 * Get the maximum friction torque in N*m.
 */
MotorJoint.prototype.getMaxTorque = function() {
  return this.m_maxTorque;
}

/**
 * Set the position correction factor in the range [0,1].
 */
MotorJoint.prototype.setCorrectionFactor = function(factor) {
  _ASSERT && common.assert(Math.isFinite(factor) && 0.0 <= factor && factor <= 1.0);
  this.m_correctionFactor = factor;
}

/**
 * Get the position correction factor in the range [0,1].
 */
MotorJoint.prototype.getCorrectionFactor = function() {
  return this.m_correctionFactor;
}

/**
 * Set/get the target linear offset, in frame A, in meters.
 */
MotorJoint.prototype.setLinearOffset = function(linearOffset) {
  if (linearOffset.x != this.m_linearOffset.x
      || linearOffset.y != this.m_linearOffset.y) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_linearOffset = linearOffset;
  }
}

MotorJoint.prototype.getLinearOffset = function() {
  return this.m_linearOffset;
}

/**
 * Set/get the target angular offset, in radians.
 */
MotorJoint.prototype.setAngularOffset = function(angularOffset) {
  if (angularOffset != this.m_angularOffset) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_angularOffset = angularOffset;
  }
}

MotorJoint.prototype.getAngularOffset = function() {
  return this.m_angularOffset;
}

MotorJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getPosition();
}

MotorJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getPosition();
}

MotorJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.mul(inv_dt, this.m_linearImpulse);
}

MotorJoint.prototype.getReactionTorque = function(inv_dt) {
  return inv_dt * this.m_angularImpulse;
}

MotorJoint.prototype.initVelocityConstraints = function(step) {
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

  var qA = Rot.neo(aA), qB = Rot.neo(aB);

  // Compute the effective mass matrix.
  this.m_rA = Rot.mulVec2(qA, Vec2.neg(this.m_localCenterA));
  this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));

  // J = [-I -r1_skew I r2_skew]
  // [ 0 -1 0 1]
  // r_skew = [-ry; rx]

  // Matlab
  // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
  // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
  // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

  var mA = this.m_invMassA;
  var mB = this.m_invMassB;
  var iA = this.m_invIA;
  var iB = this.m_invIB;

  var K = new Mat22();
  K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y
      * this.m_rB.y;
  K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
  K.ey.x = K.ex.y;
  K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x
      * this.m_rB.x;

  this.m_linearMass = K.getInverse();

  this.m_angularMass = iA + iB;
  if (this.m_angularMass > 0.0) {
    this.m_angularMass = 1.0 / this.m_angularMass;
  }

  this.m_linearError = Vec2.zero();
  this.m_linearError.addCombine(1, cB, 1, this.m_rB);
  this.m_linearError.subCombine(1, cA, 1, this.m_rA);
  this.m_linearError.sub(Rot.mulVec2(qA, this.m_linearOffset));

  this.m_angularError = aB - aA - this.m_angularOffset;

  if (step.warmStarting) {
    // Scale impulses to support a variable time step.
    this.m_linearImpulse.mul(step.dtRatio);
    this.m_angularImpulse *= step.dtRatio;

    var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);

    vA.subMul(mA, P);
    wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_angularImpulse);

    vB.addMul(mB, P);
    wB += iB * (Vec2.cross(this.m_rB, P) + this.m_angularImpulse);

  } else {
    this.m_linearImpulse.setZero();
    this.m_angularImpulse = 0.0;
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

MotorJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var mA = this.m_invMassA, mB = this.m_invMassB;
  var iA = this.m_invIA, iB = this.m_invIB;

  var h = step.dt;
  var inv_h = step.inv_dt;

  // Solve angular friction
  {
    var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
    var impulse = -this.m_angularMass * Cdot;

    var oldImpulse = this.m_angularImpulse;
    var maxImpulse = h * this.m_maxTorque;
    this.m_angularImpulse = Math.clamp(this.m_angularImpulse + impulse,
        -maxImpulse, maxImpulse);
    impulse = this.m_angularImpulse - oldImpulse;

    wA -= iA * impulse;
    wB += iB * impulse;
  }

  // Solve linear friction
  {
    var Cdot = Vec2.zero();
    Cdot.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
    Cdot.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA));
    Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);

    var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
    var oldImpulse = Vec2.clone(this.m_linearImpulse);
    this.m_linearImpulse.add(impulse);

    var maxImpulse = h * this.m_maxForce;

    this.m_linearImpulse.clamp(maxImpulse);

    impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);

    vA.subMul(mA, impulse);
    wA -= iA * Vec2.cross(this.m_rA, impulse);

    vB.addMul(mB, impulse);
    wB += iB * Vec2.cross(this.m_rB, impulse);
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

MotorJoint.prototype.solvePositionConstraints = function(step) {
  return true;
}
