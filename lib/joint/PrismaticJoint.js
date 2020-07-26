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

module.exports = PrismaticJoint;

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

var inactiveLimit = 0;
var atLowerLimit = 1;
var atUpperLimit = 2;
var equalLimits = 3;

PrismaticJoint.TYPE = 'prismatic-joint';
Joint.TYPES[PrismaticJoint.TYPE] = PrismaticJoint;

PrismaticJoint._super = Joint;
PrismaticJoint.prototype = create(PrismaticJoint._super.prototype);

/**
 * @typedef {Object} PrismaticJointDef
 *
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 * 
 * @prop {boolean} enableLimit Enable/disable the joint limit.
 * @prop {float} lowerTranslation The lower translation limit, usually in
 *       meters.
 * @prop {float} upperTranslation The upper translation limit, usually in
 *       meters.
 * @prop {boolean} enableMotor Enable/disable the joint motor.
 * @prop {float} maxMotorForce The maximum motor torque, usually in N-m.
 * @prop {float} motorSpeed The desired motor speed in radians per second.
 *
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {Vec2} localAxisA The local translation unit axis in bodyA.
 * @prop {float} referenceAngle The constrained angle between the bodies:
 *       bodyB_angle - bodyA_angle.
 */

var DEFAULTS = {
  enableLimit : false,
  lowerTranslation : 0.0,
  upperTranslation : 0.0,
  enableMotor : false,
  maxMotorForce : 0.0,
  motorSpeed : 0.0
};

/**
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in bodyA. Relative rotation is prevented. You can use a
 * joint limit to restrict the range of motion and a joint motor to drive the
 * motion or to model joint friction.
 *
 * @param {PrismaticJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function PrismaticJoint(def, bodyA, bodyB, anchor, axis) {
  if (!(this instanceof PrismaticJoint)) {
    return new PrismaticJoint(def, bodyA, bodyB, anchor, axis);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = PrismaticJoint.TYPE;

  this.m_localAnchorA = anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero();
  this.m_localAnchorB = anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero();
  this.m_localXAxisA = axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1.0, 0.0);
  this.m_localXAxisA.normalize();
  this.m_localYAxisA = Vec2.cross(1.0, this.m_localXAxisA);
  this.m_referenceAngle = Math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();

  this.m_impulse = Vec3();
  this.m_motorMass = 0.0;
  this.m_motorImpulse = 0.0;

  this.m_lowerTranslation = def.lowerTranslation;
  this.m_upperTranslation = def.upperTranslation;
  this.m_maxMotorForce = def.maxMotorForce;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = inactiveLimit;

  this.m_axis = Vec2.zero();
  this.m_perp = Vec2.zero();

  // Solver temp
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  this.m_axis, this.m_perp; // Vec2
  this.m_s1, this.m_s2; // float
  this.m_a1, this.m_a2; // float
  this.m_K = new Mat33();
  this.m_motorMass; // float

  // Linear constraint (point-to-line)
  // d = p2 - p1 = x2 + r2 - x1 - r1
  // C = dot(perp, d)
  // Cdot = dot(d, cross(w1, perp)) + dot(perp, v2 + cross(w2, r2) - v1 -
  // cross(w1, r1))
  // = -dot(perp, v1) - dot(cross(d + r1, perp), w1) + dot(perp, v2) +
  // dot(cross(r2, perp), v2)
  // J = [-perp, -cross(d + r1, perp), perp, cross(r2,perp)]
  //
  // Angular constraint
  // C = a2 - a1 + a_initial
  // Cdot = w2 - w1
  // J = [0 0 -1 0 0 1]
  //
  // K = J * invM * JT
  //
  // J = [-a -s1 a s2]
  // [0 -1 0 1]
  // a = perp
  // s1 = cross(d + r1, a) = cross(p2 - x1, a)
  // s2 = cross(r2, a) = cross(p2 - x2, a)

  // Motor/Limit linear constraint
  // C = dot(ax1, d)
  // Cdot = = -dot(ax1, v1) - dot(cross(d + r1, ax1), w1) + dot(ax1, v2) +
  // dot(cross(r2, ax1), v2)
  // J = [-ax1 -cross(d+r1,ax1) ax1 cross(r2,ax1)]

  // Block Solver
  // We develop a block solver that includes the joint limit. This makes the
  // limit stiff (inelastic) even
  // when the mass has poor distribution (leading to large torques about the
  // joint anchor points).
  //
  // The Jacobian has 3 rows:
  // J = [-uT -s1 uT s2] // linear
  // [0 -1 0 1] // angular
  // [-vT -a1 vT a2] // limit
  //
  // u = perp
  // v = axis
  // s1 = cross(d + r1, u), s2 = cross(r2, u)
  // a1 = cross(d + r1, v), a2 = cross(r2, v)

  // M * (v2 - v1) = JT * df
  // J * v2 = bias
  //
  // v2 = v1 + invM * JT * df
  // J * (v1 + invM * JT * df) = bias
  // K * df = bias - J * v1 = -Cdot
  // K = J * invM * JT
  // Cdot = J * v1 - bias
  //
  // Now solve for f2.
  // df = f2 - f1
  // K * (f2 - f1) = -Cdot
  // f2 = invK * (-Cdot) + f1
  //
  // Clamp accumulated limit impulse.
  // lower: f2(3) = max(f2(3), 0)
  // upper: f2(3) = min(f2(3), 0)
  //
  // Solve for correct f2(1:2)
  // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:3) * f1
  // = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:2) * f1(1:2) + K(1:2,3) * f1(3)
  // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3)) +
  // K(1:2,1:2) * f1(1:2)
  // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
  // f1(1:2)
  //
  // Now compute impulse to be applied:
  // df = f2 - f1
}

PrismaticJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    lowerTranslation: this.m_lowerTranslation,
    upperTranslation: this.m_upperTranslation,
    maxMotorForce: this.m_maxMotorForce,
    motorSpeed: this.m_motorSpeed,
    enableLimit: this.m_enableLimit,
    enableMotor: this.m_enableMotor,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    localAxisA: this.m_localXAxisA,
    referenceAngle: this.m_referenceAngle,
  };
};

PrismaticJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  data.localAxisA = Vec2(data.localAxisA);
  var joint = new PrismaticJoint(data);
  return joint;
};

/**
 * The local anchor point relative to bodyA's origin.
 */
PrismaticJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
}

/**
 * The local anchor point relative to bodyB's origin.
 */
PrismaticJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
}

/**
 * The local joint axis relative to bodyA.
 */
PrismaticJoint.prototype.getLocalAxisA = function() {
  return this.m_localXAxisA;
}

/**
 * Get the reference angle.
 */
PrismaticJoint.prototype.getReferenceAngle = function() {
  return this.m_referenceAngle;
}

/**
 * Get the current joint translation, usually in meters.
 */
PrismaticJoint.prototype.getJointTranslation = function() {
  var pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  var pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  var d = Vec2.sub(pB, pA);
  var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);

  var translation = Vec2.dot(d, axis);
  return translation;
}

/**
 * Get the current joint translation speed, usually in meters per second.
 */
PrismaticJoint.prototype.getJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;

  var rA = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter)); // Vec2
  var rB = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter)); // Vec2
  var p1 = Vec2.add(bA.m_sweep.c, rA); // Vec2
  var p2 = Vec2.add(bB.m_sweep.c, rB); // Vec2
  var d = Vec2.sub(p2, p1); // Vec2
  var axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA); // Vec2

  var vA = bA.m_linearVelocity; // Vec2
  var vB = bB.m_linearVelocity; // Vec2
  var wA = bA.m_angularVelocity; // float
  var wB = bB.m_angularVelocity; // float

  var speed = Vec2.dot(d, Vec2.cross(wA, axis))
      + Vec2.dot(axis, Vec2.sub(Vec2.addCross(vB, wB, rB), Vec2.addCross(vA, wA, rA))); // float
  return speed;
}

/**
 * Is the joint limit enabled?
 */
PrismaticJoint.prototype.isLimitEnabled = function() {
  return this.m_enableLimit;
}

/**
 * Enable/disable the joint limit.
 */
PrismaticJoint.prototype.enableLimit = function(flag) {
  if (flag != this.m_enableLimit) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableLimit = flag;
    this.m_impulse.z = 0.0;
  }
}

/**
 * Get the lower joint limit, usually in meters.
 */
PrismaticJoint.prototype.getLowerLimit = function() {
  return this.m_lowerTranslation;
}

/**
 * Get the upper joint limit, usually in meters.
 */
PrismaticJoint.prototype.getUpperLimit = function() {
  return this.m_upperTranslation;
}

/**
 * Set the joint limits, usually in meters.
 */
PrismaticJoint.prototype.setLimits = function(lower, upper) {
  _ASSERT && common.assert(lower <= upper);
  if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_lowerTranslation = lower;
    this.m_upperTranslation = upper;
    this.m_impulse.z = 0.0;
  }
}

/**
 * Is the joint motor enabled?
 */
PrismaticJoint.prototype.isMotorEnabled = function() {
  return this.m_enableMotor;
}

/**
 * Enable/disable the joint motor.
 */
PrismaticJoint.prototype.enableMotor = function(flag) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_enableMotor = flag;
}

/**
 * Set the motor speed, usually in meters per second.
 */
PrismaticJoint.prototype.setMotorSpeed = function(speed) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_motorSpeed = speed;
}

/**
 * Set the maximum motor force, usually in N.
 */
PrismaticJoint.prototype.setMaxMotorForce = function(force) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_maxMotorForce = force;
}

/**
 * Get the motor speed, usually in meters per second.
 */
PrismaticJoint.prototype.getMotorSpeed = function() {
  return this.m_motorSpeed;
}

/**
 * Get the current motor force given the inverse time step, usually in N.
 */
PrismaticJoint.prototype.getMotorForce = function(inv_dt) {
  return inv_dt * this.m_motorImpulse;
}

PrismaticJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

PrismaticJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

PrismaticJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
}

PrismaticJoint.prototype.getReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.y;
}

PrismaticJoint.prototype.initVelocityConstraints = function(step) {
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

  // Compute the effective masses.
  var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
  var d = Vec2.zero();
  d.addCombine(1, cB, 1, rB);
  d.subCombine(1, cA, 1, rA);

  var mA = this.m_invMassA, mB = this.m_invMassB;
  var iA = this.m_invIA, iB = this.m_invIB;

  // Compute motor Jacobian and effective mass.
  {
    this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
    this.m_a1 = Vec2.cross(Vec2.add(d, rA), this.m_axis);
    this.m_a2 = Vec2.cross(rB, this.m_axis);

    this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2
        * this.m_a2;
    if (this.m_motorMass > 0.0) {
      this.m_motorMass = 1.0 / this.m_motorMass;
    }
  }

  // Prismatic constraint.
  {
    this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);

    this.m_s1 = Vec2.cross(Vec2.add(d, rA), this.m_perp);
    this.m_s2 = Vec2.cross(rB, this.m_perp);

    var s1test = Vec2.cross(rA, this.m_perp);

    var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
    var k12 = iA * this.m_s1 + iB * this.m_s2;
    var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
    var k22 = iA + iB;
    if (k22 == 0.0) {
      // For bodies with fixed rotation.
      k22 = 1.0;
    }
    var k23 = iA * this.m_a1 + iB * this.m_a2;
    var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;

    this.m_K.ex.set(k11, k12, k13);
    this.m_K.ey.set(k12, k22, k23);
    this.m_K.ez.set(k13, k23, k33);
  }

  // Compute motor and limit terms.
  if (this.m_enableLimit) {

    var jointTranslation = Vec2.dot(this.m_axis, d); // float
    if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * Settings.linearSlop) {
      this.m_limitState = equalLimits;

    } else if (jointTranslation <= this.m_lowerTranslation) {
      if (this.m_limitState != atLowerLimit) {
        this.m_limitState = atLowerLimit;
        this.m_impulse.z = 0.0;
      }

    } else if (jointTranslation >= this.m_upperTranslation) {
      if (this.m_limitState != atUpperLimit) {
        this.m_limitState = atUpperLimit;
        this.m_impulse.z = 0.0;
      }

    } else {
      this.m_limitState = inactiveLimit;
      this.m_impulse.z = 0.0;
    }

  } else {
    this.m_limitState = inactiveLimit;
    this.m_impulse.z = 0.0;
  }

  if (this.m_enableMotor == false) {
    this.m_motorImpulse = 0.0;
  }

  if (step.warmStarting) {
    // Account for variable time step.
    this.m_impulse.mul(step.dtRatio);
    this.m_motorImpulse *= step.dtRatio;

    var P = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse
        + this.m_impulse.z, this.m_axis);
    var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y
        + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
    var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y
        + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  } else {
    this.m_impulse.setZero();
    this.m_motorImpulse = 0.0;
  }

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
}

PrismaticJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var mA = this.m_invMassA;
  var mB = this.m_invMassB;
  var iA = this.m_invIA;
  var iB = this.m_invIB;

  // Solve linear motor constraint.
  if (this.m_enableMotor && this.m_limitState != equalLimits) {
    var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB
        - this.m_a1 * wA;
    var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorForce;
    this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse,
        -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;

    var P = Vec2.mul(impulse, this.m_axis);
    var LA = impulse * this.m_a1;
    var LB = impulse * this.m_a2;

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  }

  var Cdot1 = Vec2.zero();
  Cdot1.x += Vec2.dot(this.m_perp, vB) + this.m_s2 * wB;
  Cdot1.x -= Vec2.dot(this.m_perp, vA) + this.m_s1 * wA;
  Cdot1.y = wB - wA;

  if (this.m_enableLimit && this.m_limitState != inactiveLimit) {
    // Solve prismatic and limit constraint in block form.
    var Cdot2 = 0;
    Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
    Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;

    var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);

    var f1 = Vec3(this.m_impulse);
    var df = this.m_K.solve33(Vec3.neg(Cdot)); // Vec3
    this.m_impulse.add(df);

    if (this.m_limitState == atLowerLimit) {
      this.m_impulse.z = Math.max(this.m_impulse.z, 0.0);
    } else if (this.m_limitState == atUpperLimit) {
      this.m_impulse.z = Math.min(this.m_impulse.z, 0.0);
    }

    // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
    // f1(1:2)
    var b = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y)); // Vec2
    var f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y)); // Vec2
    this.m_impulse.x = f2r.x;
    this.m_impulse.y = f2r.y;

    df = Vec3.sub(this.m_impulse, f1);

    var P = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis); // Vec2
    var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1; // float
    var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2; // float

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  } else {
    // Limit is inactive, just solve the prismatic constraint in block form.
    var df = this.m_K.solve22(Vec2.neg(Cdot1)); // Vec2
    this.m_impulse.x += df.x;
    this.m_impulse.y += df.y;

    var P = Vec2.mul(df.x, this.m_perp); // Vec2
    var LA = df.x * this.m_s1 + df.y; // float
    var LB = df.x * this.m_s2 + df.y; // float

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

PrismaticJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  var mA = this.m_invMassA;
  var mB = this.m_invMassB;
  var iA = this.m_invIA;
  var iB = this.m_invIB;

  // Compute fresh Jacobians
  var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
  var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
  var d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA)); // Vec2

  var axis = Rot.mulVec2(qA, this.m_localXAxisA); // Vec2
  var a1 = Vec2.cross(Vec2.add(d, rA), axis); // float
  var a2 = Vec2.cross(rB, axis); // float
  var perp = Rot.mulVec2(qA, this.m_localYAxisA); // Vec2

  var s1 = Vec2.cross(Vec2.add(d, rA), perp); // float
  var s2 = Vec2.cross(rB, perp); // float

  var impulse = Vec3();
  var C1 = Vec2.zero(); // Vec2
  C1.x = Vec2.dot(perp, d);
  C1.y = aB - aA - this.m_referenceAngle;

  var linearError = Math.abs(C1.x); // float
  var angularError = Math.abs(C1.y); // float

  var linearSlop = Settings.linearSlop;
  var maxLinearCorrection = Settings.maxLinearCorrection;

  var active = false; // bool
  var C2 = 0.0; // float
  if (this.m_enableLimit) {

    var translation = Vec2.dot(axis, d); // float
    if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * linearSlop) {
      // Prevent large angular corrections
      C2 = Math.clamp(translation, -maxLinearCorrection, maxLinearCorrection);
      linearError = Math.max(linearError, Math.abs(translation));
      active = true;

    } else if (translation <= this.m_lowerTranslation) {
      // Prevent large linear corrections and allow some slop.
      C2 = Math.clamp(translation - this.m_lowerTranslation + linearSlop,
          -maxLinearCorrection, 0.0);
      linearError = Math
          .max(linearError, this.m_lowerTranslation - translation);
      active = true;

    } else if (translation >= this.m_upperTranslation) {
      // Prevent large linear corrections and allow some slop.
      C2 = Math.clamp(translation - this.m_upperTranslation - linearSlop, 0.0,
          maxLinearCorrection);
      linearError = Math
          .max(linearError, translation - this.m_upperTranslation);
      active = true;
    }
  }

  if (active) {
    var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
    var k12 = iA * s1 + iB * s2; // float
    var k13 = iA * s1 * a1 + iB * s2 * a2; // float
    var k22 = iA + iB; // float
    if (k22 == 0.0) {
      // For fixed rotation
      k22 = 1.0;
    }
    var k23 = iA * a1 + iB * a2; // float
    var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2; // float

    var K = new Mat33()
    K.ex.set(k11, k12, k13);
    K.ey.set(k12, k22, k23);
    K.ez.set(k13, k23, k33);

    var C = Vec3();
    C.x = C1.x;
    C.y = C1.y;
    C.z = C2;

    impulse = K.solve33(Vec3.neg(C));
  } else {
    var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
    var k12 = iA * s1 + iB * s2; // float
    var k22 = iA + iB; // float
    if (k22 == 0.0) {
      k22 = 1.0;
    }

    var K = new Mat22();
    K.ex.set(k11, k12);
    K.ey.set(k12, k22);

    var impulse1 = K.solve(Vec2.neg(C1)); // Vec2
    impulse.x = impulse1.x;
    impulse.y = impulse1.y;
    impulse.z = 0.0;
  }

  var P = Vec2.combine(impulse.x, perp, impulse.z, axis); // Vec2
  var LA = impulse.x * s1 + impulse.y + impulse.z * a1; // float
  var LB = impulse.x * s2 + impulse.y + impulse.z * a2; // float

  cA.subMul(mA, P);
  aA -= iA * LA;
  cB.addMul(mB, P);
  aB += iB * LB;

  this.m_bodyA.c_position.c = cA;
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c = cB;
  this.m_bodyB.c_position.a = aB;

  return linearError <= Settings.linearSlop
      && angularError <= Settings.angularSlop;
}
