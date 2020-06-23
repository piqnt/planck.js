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

module.exports = WheelJoint;

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

WheelJoint.TYPE = 'wheel-joint';
Joint.TYPES[WheelJoint.TYPE] = WheelJoint;

WheelJoint._super = Joint;
WheelJoint.prototype = create(WheelJoint._super.prototype);

/**
 * @typedef {Object} WheelJointDef
 *
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 *
 * @prop {boolean} enableMotor Enable/disable the joint motor.
 * @prop {float} maxMotorTorque The maximum motor torque, usually in N-m.
 * @prop {float} motorSpeed The desired motor speed in radians per second.
 * @prop {float} frequencyHz Suspension frequency, zero indicates no suspension.
 * @prop {float} dampingRatio Suspension damping ratio, one indicates critical
 *       damping.
 *
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {Vec2} localAxisA The local translation axis in bodyA.
 */
var DEFAULTS = {
  enableMotor : false,
  maxMotorTorque : 0.0,
  motorSpeed : 0.0,
  frequencyHz : 2.0,
  dampingRatio : 0.7,
};

/**
 * A wheel joint. This joint provides two degrees of freedom: translation along
 * an axis fixed in bodyA and rotation in the plane. In other words, it is a
 * point to line constraint with a rotational motor and a linear spring/damper.
 * This joint is designed for vehicle suspensions.
 *
 * @param {WheelJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function WheelJoint(def, bodyA, bodyB, anchor, axis) {
  if (!(this instanceof WheelJoint)) {
    return new WheelJoint(def, bodyA, bodyB, anchor, axis);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = WheelJoint.TYPE;

  this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
  this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
  this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || def.localAxis || Vec2.neo(1.0, 0.0));
  this.m_localYAxisA = Vec2.cross(1.0, this.m_localXAxisA);

  this.m_mass = 0.0;
  this.m_impulse = 0.0;
  this.m_motorMass = 0.0;
  this.m_motorImpulse = 0.0;
  this.m_springMass = 0.0;
  this.m_springImpulse = 0.0;

  this.m_maxMotorTorque = def.maxMotorTorque;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableMotor = def.enableMotor;

  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;

  this.m_bias = 0.0;
  this.m_gamma = 0.0;

  // Solver temp
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float

  this.m_ax = Vec2.zero();
  this.m_ay = Vec2.zero(); // Vec2
  this.m_sAx;
  this.m_sBx; // float
  this.m_sAy;
  this.m_sBy; // float

  // Linear constraint (point-to-line)
  // d = pB - pA = xB + rB - xA - rA
  // C = dot(ay, d)
  // Cdot = dot(d, cross(wA, ay)) + dot(ay, vB + cross(wB, rB) - vA - cross(wA,
  // rA))
  // = -dot(ay, vA) - dot(cross(d + rA, ay), wA) + dot(ay, vB) + dot(cross(rB,
  // ay), vB)
  // J = [-ay, -cross(d + rA, ay), ay, cross(rB, ay)]

  // Spring linear constraint
  // C = dot(ax, d)
  // Cdot = = -dot(ax, vA) - dot(cross(d + rA, ax), wA) + dot(ax, vB) +
  // dot(cross(rB, ax), vB)
  // J = [-ax -cross(d+rA, ax) ax cross(rB, ax)]

  // Motor rotational constraint
  // Cdot = wB - wA
  // J = [0 0 -1 0 0 1]
}

WheelJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    enableMotor: this.m_enableMotor,
    maxMotorTorque: this.m_maxMotorTorque,
    motorSpeed: this.m_motorSpeed,
    frequencyHz: this.m_frequencyHz,
    dampingRatio: this.m_dampingRatio,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    localAxisA: this.m_localXAxisA,
  };
};

WheelJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new WheelJoint(data);
  return joint;
};

/**
 * @internal
 */
WheelJoint.prototype._setAnchors = function(def) {
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

  if (def.localAxisA) {
    this.m_localXAxisA.set(def.localAxisA);
    this.m_localYAxisA.set(Vec2.cross(1.0, def.localAxisA));
  }
}

/**
 * The local anchor point relative to bodyA's origin.
 */
WheelJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
}

/**
 * The local anchor point relative to bodyB's origin.
 */
WheelJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
}

/**
 * The local joint axis relative to bodyA.
 */
WheelJoint.prototype.getLocalAxisA = function() {
  return this.m_localXAxisA;
}

/**
 * Get the current joint translation, usually in meters.
 */
WheelJoint.prototype.getJointTranslation = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;

  var pA = bA.getWorldPoint(this.m_localAnchorA); // Vec2
  var pB = bB.getWorldPoint(this.m_localAnchorB); // Vec2
  var d = Vec2.sub(pB, pA); // Vec2
  var axis = bA.getWorldVector(this.m_localXAxisA); // Vec2

  var translation = Vec2.dot(d, axis); // float
  return translation;
}

/**
 * Get the current joint translation speed, usually in meters per second.
 */
WheelJoint.prototype.getJointSpeed = function() {
  var wA = this.m_bodyA.m_angularVelocity;
  var wB = this.m_bodyB.m_angularVelocity;
  return wB - wA;
}

/**
 * Is the joint motor enabled?
 */
WheelJoint.prototype.isMotorEnabled = function() {
  return this.m_enableMotor;
}

/**
 * Enable/disable the joint motor.
 */
WheelJoint.prototype.enableMotor = function(flag) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_enableMotor = flag;
}

/**
 * Set the motor speed, usually in radians per second.
 */
WheelJoint.prototype.setMotorSpeed = function(speed) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_motorSpeed = speed;
}

/**
 * Get the motor speed, usually in radians per second.
 */
WheelJoint.prototype.getMotorSpeed = function() {
  return this.m_motorSpeed;
}

/**
 * Set/Get the maximum motor force, usually in N-m.
 */
WheelJoint.prototype.setMaxMotorTorque = function(torque) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_maxMotorTorque = torque;
}

WheelJoint.prototype.getMaxMotorTorque = function() {
  return this.m_maxMotorTorque;
}

/**
 * Get the current motor torque given the inverse time step, usually in N-m.
 */
WheelJoint.prototype.getMotorTorque = function(inv_dt) {
  return inv_dt * this.m_motorImpulse;
}

/**
 * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
 * the spring.
 */
WheelJoint.prototype.setSpringFrequencyHz = function(hz) {
  this.m_frequencyHz = hz;
}

WheelJoint.prototype.getSpringFrequencyHz = function() {
  return this.m_frequencyHz;
}

/**
 * Set/Get the spring damping ratio
 */
WheelJoint.prototype.setSpringDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio;
}

WheelJoint.prototype.getSpringDampingRatio = function() {
  return this.m_dampingRatio;
}

WheelJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

WheelJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

WheelJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
}

WheelJoint.prototype.getReactionTorque = function(inv_dt) {
  return inv_dt * this.m_motorImpulse;
}

WheelJoint.prototype.initVelocityConstraints = function(step) {
  this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
  this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
  this.m_invMassA = this.m_bodyA.m_invMass;
  this.m_invMassB = this.m_bodyB.m_invMass;
  this.m_invIA = this.m_bodyA.m_invI;
  this.m_invIB = this.m_bodyB.m_invI;

  var mA = this.m_invMassA;
  var mB = this.m_invMassB; // float
  var iA = this.m_invIA;
  var iB = this.m_invIB; // float

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
  d.subCombine(1, cA, 1, rA); // Vec2

  // Point to line constraint
  {
    this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
    this.m_sAy = Vec2.cross(Vec2.add(d, rA), this.m_ay);
    this.m_sBy = Vec2.cross(rB, this.m_ay);

    this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy
        * this.m_sBy;

    if (this.m_mass > 0.0) {
      this.m_mass = 1.0 / this.m_mass;
    }
  }

  // Spring constraint
  this.m_springMass = 0.0;
  this.m_bias = 0.0;
  this.m_gamma = 0.0;
  if (this.m_frequencyHz > 0.0) {
    this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
    this.m_sAx = Vec2.cross(Vec2.add(d, rA), this.m_ax);
    this.m_sBx = Vec2.cross(rB, this.m_ax);

    var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx
        * this.m_sBx; // float

    if (invMass > 0.0) {
      this.m_springMass = 1.0 / invMass;

      var C = Vec2.dot(d, this.m_ax); // float

      // Frequency
      var omega = 2.0 * Math.PI * this.m_frequencyHz; // float

      // Damping coefficient
      var d = 2.0 * this.m_springMass * this.m_dampingRatio * omega; // float

      // Spring stiffness
      var k = this.m_springMass * omega * omega; // float

      // magic formulas
      var h = step.dt; // float
      this.m_gamma = h * (d + h * k);
      if (this.m_gamma > 0.0) {
        this.m_gamma = 1.0 / this.m_gamma;
      }

      this.m_bias = C * h * k * this.m_gamma;

      this.m_springMass = invMass + this.m_gamma;
      if (this.m_springMass > 0.0) {
        this.m_springMass = 1.0 / this.m_springMass;
      }
    }
  } else {
    this.m_springImpulse = 0.0;
  }

  // Rotational motor
  if (this.m_enableMotor) {
    this.m_motorMass = iA + iB;
    if (this.m_motorMass > 0.0) {
      this.m_motorMass = 1.0 / this.m_motorMass;
    }
  } else {
    this.m_motorMass = 0.0;
    this.m_motorImpulse = 0.0;
  }

  if (step.warmStarting) {
    // Account for variable time step.
    this.m_impulse *= step.dtRatio;
    this.m_springImpulse *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;

    var P = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
    var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
    var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;

    vA.subMul(this.m_invMassA, P);
    wA -= this.m_invIA * LA;

    vB.addMul(this.m_invMassB, P);
    wB += this.m_invIB * LB;

  } else {
    this.m_impulse = 0.0;
    this.m_springImpulse = 0.0;
    this.m_motorImpulse = 0.0;
  }

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
}

WheelJoint.prototype.solveVelocityConstraints = function(step) {
  var mA = this.m_invMassA;
  var mB = this.m_invMassB; // float
  var iA = this.m_invIA;
  var iB = this.m_invIB; // float

  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  // Solve spring constraint
  {
    var Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx
        * wB - this.m_sAx * wA; // float
    var impulse = -this.m_springMass
        * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse); // float
    this.m_springImpulse += impulse;

    var P = Vec2.mul(impulse, this.m_ax); // Vec2
    var LA = impulse * this.m_sAx; // float
    var LB = impulse * this.m_sBx; // float

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  }

  // Solve rotational motor constraint
  {
    var Cdot = wB - wA - this.m_motorSpeed; // float
    var impulse = -this.m_motorMass * Cdot; // float

    var oldImpulse = this.m_motorImpulse; // float
    var maxImpulse = step.dt * this.m_maxMotorTorque; // float
    this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse,
        -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;

    wA -= iA * impulse;
    wB += iB * impulse;
  }

  // Solve point to line constraint
  {
    var Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy
        * wB - this.m_sAy * wA; // float
    var impulse = -this.m_mass * Cdot; // float
    this.m_impulse += impulse;

    var P = Vec2.mul(impulse, this.m_ay); // Vec2
    var LA = impulse * this.m_sAy; // float
    var LB = impulse * this.m_sBy; // float

    vA.subMul(mA, P);
    wA -= iA * LA;

    vB.addMul(mB, P);
    wB += iB * LB;
  }

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
}

WheelJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
  var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
  var d = Vec2.zero();
  d.addCombine(1, cB, 1, rB);
  d.subCombine(1, cA, 1, rA);

  var ay = Rot.mulVec2(qA, this.m_localYAxisA);

  var sAy = Vec2.cross(Vec2.add(d, rA), ay); // float
  var sBy = Vec2.cross(rB, ay); // float

  var C = Vec2.dot(d, ay); // float

  var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy
      * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy; // float

  var impulse; // float
  if (k != 0.0) {
    impulse = -C / k;
  } else {
    impulse = 0.0;
  }

  var P = Vec2.mul(impulse, ay); // Vec2
  var LA = impulse * sAy; // float
  var LB = impulse * sBy; // float

  cA.subMul(this.m_invMassA, P);
  aA -= this.m_invIA * LA;
  cB.addMul(this.m_invMassB, P);
  aB += this.m_invIB * LB;

  this.m_bodyA.c_position.c.set(cA);
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c.set(cB);
  this.m_bodyB.c_position.a = aB;

  return Math.abs(C) <= Settings.linearSlop;
}
