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

module.exports = WeldJoint;

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

WeldJoint.TYPE = 'weld-joint';
Joint.TYPES[WeldJoint.TYPE] = WeldJoint;

WeldJoint._super = Joint;
WeldJoint.prototype = create(WeldJoint._super.prototype);

/**
 * @typedef {Object} WeldJointDef
 *
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 * 
 * @prop {float} frequencyHz The mass-spring-damper frequency in Hertz. Rotation
 *       only. Disable softness with a value of 0.
 * @prop {float} dampingRatio The damping ratio. 0 = no damping, 1 = critical
 *       damping.
 *
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {float} referenceAngle The bodyB angle minus bodyA angle in the
 *       reference state (radians).
 */
var DEFAULTS = {
  frequencyHz : 0.0,
  dampingRatio : 0.0,
}

/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 *
 * @param {WeldJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function WeldJoint(def, bodyA, bodyB, anchor) {
  if (!(this instanceof WeldJoint)) {
    return new WeldJoint(def, bodyA, bodyB, anchor);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = WeldJoint.TYPE;

  this.m_localAnchorA = anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero();
  this.m_localAnchorB = anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero();
  this.m_referenceAngle = Math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();

  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;

  this.m_impulse = Vec3();

  this.m_bias = 0.0;
  this.m_gamma = 0.0;

  // Solver temp
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  this.m_mass = new Mat33();

  // Point-to-point constraint
  // C = p2 - p1
  // Cdot = v2 - v1
  // / = v2 + cross(w2, r2) - v1 - cross(w1, r1)
  // J = [-I -r1_skew I r2_skew ]
  // Identity used:
  // w k % (rx i + ry j) = w * (-ry i + rx j)

  // Angle constraint
  // C = angle2 - angle1 - referenceAngle
  // Cdot = w2 - w1
  // J = [0 0 -1 0 0 1]
  // K = invI1 + invI2
}

WeldJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,
    
    frequencyHz: this.m_frequencyHz,
    dampingRatio: this.m_dampingRatio,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    referenceAngle: this.m_referenceAngle,
  };
};

WeldJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new WeldJoint(data);
  return joint;
};

/**
 * The local anchor point relative to bodyA's origin.
 */
WeldJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
};

/**
 * The local anchor point relative to bodyB's origin.
 */
WeldJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
};

/**
 * Get the reference angle.
 */
WeldJoint.prototype.getReferenceAngle = function() {
  return this.m_referenceAngle;
};

/**
 * Set/get frequency in Hz.
 */
WeldJoint.prototype.setFrequency = function(hz) {
  this.m_frequencyHz = hz;
};

WeldJoint.prototype.getFrequency = function() {
  return this.m_frequencyHz;
};

/**
 * Set/get damping ratio.
 */
WeldJoint.prototype.setDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio;
};

WeldJoint.prototype.getDampingRatio = function() {
  return this.m_dampingRatio;
};

WeldJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
};

WeldJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
};

WeldJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
};

WeldJoint.prototype.getReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z;
};

WeldJoint.prototype.initVelocityConstraints = function(step) {
  this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
  this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
  this.m_invMassA = this.m_bodyA.m_invMass;
  this.m_invMassB = this.m_bodyB.m_invMass;
  this.m_invIA = this.m_bodyA.m_invI;
  this.m_invIB = this.m_bodyB.m_invI;

  var aA = this.m_bodyA.c_position.a;
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;

  var aB = this.m_bodyB.c_position.a;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var qA = Rot.neo(aA), qB = Rot.neo(aB);

  this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

  // J = [-I -r1_skew I r2_skew]
  // [ 0 -1 0 1]
  // r_skew = [-ry; rx]

  // Matlab
  // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
  // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
  // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

  var mA = this.m_invMassA;
  var mB = this.m_invMassB; // float
  var iA = this.m_invIA;
  var iB = this.m_invIB; // float

  var K = new Mat33();
  K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y
      * iB;
  K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
  K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
  K.ex.y = K.ey.x;
  K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x
      * iB;
  K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
  K.ex.z = K.ez.x;
  K.ey.z = K.ez.y;
  K.ez.z = iA + iB;

  if (this.m_frequencyHz > 0.0) {
    K.getInverse22(this.m_mass);

    var invM = iA + iB; // float
    var m = invM > 0.0 ? 1.0 / invM : 0.0; // float

    var C = aB - aA - this.m_referenceAngle; // float

    // Frequency
    var omega = 2.0 * Math.PI * this.m_frequencyHz; // float

    // Damping coefficient
    var d = 2.0 * m * this.m_dampingRatio * omega; // float

    // Spring stiffness
    var k = m * omega * omega; // float

    // magic formulas
    var h = step.dt; // float
    this.m_gamma = h * (d + h * k);
    this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
    this.m_bias = C * h * k * this.m_gamma;

    invM += this.m_gamma;
    this.m_mass.ez.z = invM != 0.0 ? 1.0 / invM : 0.0;
  } else if (K.ez.z == 0.0) {
    K.getInverse22(this.m_mass);
    this.m_gamma = 0.0;
    this.m_bias = 0.0;
  } else {
    K.getSymInverse33(this.m_mass);
    this.m_gamma = 0.0;
    this.m_bias = 0.0;
  }

  if (step.warmStarting) {
    // Scale impulses to support a variable time step.
    this.m_impulse.mul(step.dtRatio);

    var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);

    vA.subMul(mA, P);
    wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_impulse.z);

    vB.addMul(mB, P);
    wB += iB * (Vec2.cross(this.m_rB, P) + this.m_impulse.z);

  } else {
    this.m_impulse.setZero();
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

WeldJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var mA = this.m_invMassA;
  var mB = this.m_invMassB; // float
  var iA = this.m_invIA;
  var iB = this.m_invIB; // float

  if (this.m_frequencyHz > 0.0) {
    var Cdot2 = wB - wA; // float

    var impulse2 = -this.m_mass.ez.z
        * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z); // float
    this.m_impulse.z += impulse2;

    wA -= iA * impulse2;
    wB += iB * impulse2;

    var Cdot1 = Vec2.zero();
    Cdot1.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
    Cdot1.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA)); // Vec2

    var impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1)); // Vec2
    this.m_impulse.x += impulse1.x;
    this.m_impulse.y += impulse1.y;

    var P = Vec2.clone(impulse1); // Vec2

    vA.subMul(mA, P);
    wA -= iA * Vec2.cross(this.m_rA, P);

    vB.addMul(mB, P);
    wB += iB * Vec2.cross(this.m_rB, P);
  } else {
    var Cdot1 = Vec2.zero();
    Cdot1.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
    Cdot1.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA)); // Vec2
    var Cdot2 = wB - wA; // float
    var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2); // Vec3

    var impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot)); // Vec3
    this.m_impulse.add(impulse);

    var P = Vec2.neo(impulse.x, impulse.y);

    vA.subMul(mA, P);
    wA -= iA * (Vec2.cross(this.m_rA, P) + impulse.z);

    vB.addMul(mB, P);
    wB += iB * (Vec2.cross(this.m_rB, P) + impulse.z);
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

WeldJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA), qB = Rot.neo(aB);

  var mA = this.m_invMassA, mB = this.m_invMassB; // float
  var iA = this.m_invIA, iB = this.m_invIB; // float

  var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

  var positionError, angularError; // float

  var K = new Mat33();
  K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
  K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
  K.ez.x = -rA.y * iA - rB.y * iB;
  K.ex.y = K.ey.x;
  K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
  K.ez.y = rA.x * iA + rB.x * iB;
  K.ex.z = K.ez.x;
  K.ey.z = K.ez.y;
  K.ez.z = iA + iB;

  if (this.m_frequencyHz > 0.0) {
    var C1 = Vec2.zero();
    C1.addCombine(1, cB, 1, rB);
    C1.subCombine(1, cA, 1, rA); // Vec2

    positionError = C1.length();
    angularError = 0.0;

    var P = Vec2.neg(K.solve22(C1)); // Vec2

    cA.subMul(mA, P);
    aA -= iA * Vec2.cross(rA, P);

    cB.addMul(mB, P);
    aB += iB * Vec2.cross(rB, P);
  } else {
    var C1 = Vec2.zero();
    C1.addCombine(1, cB, 1, rB);
    C1.subCombine(1, cA, 1, rA);

    var C2 = aB - aA - this.m_referenceAngle; // float

    positionError = C1.length();
    angularError = Math.abs(C2);

    var C = Vec3(C1.x, C1.y, C2);

    var impulse = Vec3();
    if (K.ez.z > 0.0) {
      impulse = Vec3.neg(K.solve33(C));
    } else {
      var impulse2 = Vec2.neg(K.solve22(C1));
      impulse.set(impulse2.x, impulse2.y, 0.0);
    }

    var P = Vec2.neo(impulse.x, impulse.y);

    cA.subMul(mA, P);
    aA -= iA * (Vec2.cross(rA, P) + impulse.z);

    cB.addMul(mB, P);
    aB += iB * (Vec2.cross(rB, P) + impulse.z);
  }

  this.m_bodyA.c_position.c = cA;
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c = cB;
  this.m_bodyB.c_position.a = aB;

  return positionError <= Settings.linearSlop
      && angularError <= Settings.angularSlop;
}
