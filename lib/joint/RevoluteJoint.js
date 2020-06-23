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

module.exports = RevoluteJoint;

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

RevoluteJoint.TYPE = 'revolute-joint';
Joint.TYPES[RevoluteJoint.TYPE] = RevoluteJoint;

RevoluteJoint._super = Joint;
RevoluteJoint.prototype = create(RevoluteJoint._super.prototype);

/**
 * @typedef {Object} RevoluteJointDef
 *
 * Revolute joint definition. This requires defining an anchor point where the
 * bodies are joined. The definition uses local anchor points so that the
 * initial configuration can violate the constraint slightly. You also need to
 * specify the initial relative angle for joint limits. This helps when saving
 * and loading a game.
 *
 * The local anchor points are measured from the body's origin rather than the
 * center of mass because: 1. you might not know where the center of mass will
 * be. 2. if you add/remove shapes from a body and recompute the mass, the
 * joints will be broken.
 *
 * @prop {bool} enableLimit A flag to enable joint limits.
 * @prop {bool} enableMotor A flag to enable the joint motor.
 * @prop {float} lowerAngle The lower angle for the joint limit (radians).
 * @prop {float} upperAngle The upper angle for the joint limit (radians).
 * @prop {float} motorSpeed The desired motor speed. Usually in radians per
 *       second.
 * @prop {float} maxMotorTorque The maximum motor torque used to achieve the
 *       desired motor speed. Usually in N-m.
 *
 * @prop {Vec2} localAnchorA The local anchor point relative to bodyA's origin.
 * @prop {Vec2} localAnchorB The local anchor point relative to bodyB's origin.
 * @prop {float} referenceAngle The bodyB angle minus bodyA angle in the
 *       reference state (radians).
 */

var DEFAULTS = {
  lowerAngle : 0.0,
  upperAngle : 0.0,
  maxMotorTorque : 0.0,
  motorSpeed : 0.0,
  enableLimit : false,
  enableMotor : false
};

/**
 * A revolute joint constrains two bodies to share a common point while they are
 * free to rotate about the point. The relative rotation about the shared point
 * is the joint angle. You can limit the relative rotation with a joint limit
 * that specifies a lower and upper angle. You can use a motor to drive the
 * relative rotation about the shared point. A maximum motor torque is provided
 * so that infinite forces are not generated.
 *
 * @param {RevoluteJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function RevoluteJoint(def, bodyA, bodyB, anchor) {
  if (!(this instanceof RevoluteJoint)) {
    return new RevoluteJoint(def, bodyA, bodyB, anchor);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = RevoluteJoint.TYPE;

  this.m_localAnchorA =  Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
  this.m_localAnchorB =  Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
  this.m_referenceAngle = Math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();

  this.m_impulse = Vec3();
  this.m_motorImpulse = 0.0;

  this.m_lowerAngle = def.lowerAngle;
  this.m_upperAngle = def.upperAngle;
  this.m_maxMotorTorque = def.maxMotorTorque;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;

  // Solver temp
  this.m_rA; // Vec2
  this.m_rB; // Vec2
  this.m_localCenterA; // Vec2
  this.m_localCenterB; // Vec2
  this.m_invMassA; // float
  this.m_invMassB; // float
  this.m_invIA; // float
  this.m_invIB; // float
  // effective mass for point-to-point constraint.
  this.m_mass = new Mat33();
  // effective mass for motor/limit angular constraint.
  this.m_motorMass; // float
  this.m_limitState = inactiveLimit;

  // Point-to-point constraint
  // C = p2 - p1
  // Cdot = v2 - v1
  // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
  // J = [-I -r1_skew I r2_skew ]
  // Identity used:
  // w k % (rx i + ry j) = w * (-ry i + rx j)

  // Motor constraint
  // Cdot = w2 - w1
  // J = [0 0 -1 0 0 1]
  // K = invI1 + invI2
}

RevoluteJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    lowerAngle: this.m_lowerAngle,
    upperAngle: this.m_upperAngle,
    maxMotorTorque: this.m_maxMotorTorque,
    motorSpeed: this.m_motorSpeed,
    enableLimit: this.m_enableLimit,
    enableMotor: this.m_enableMotor,

    localAnchorA: this.m_localAnchorA,
    localAnchorB: this.m_localAnchorB,
    referenceAngle: this.m_referenceAngle,
  };
};

RevoluteJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  var joint = new RevoluteJoint(data);
  return joint;
};

/**
 * @internal
 */
RevoluteJoint.prototype._setAnchors = function(def) {
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
}

/**
 * The local anchor point relative to bodyA's origin.
 */
RevoluteJoint.prototype.getLocalAnchorA = function() {
  return this.m_localAnchorA;
}

/**
 * The local anchor point relative to bodyB's origin.
 */
RevoluteJoint.prototype.getLocalAnchorB = function() {
  return this.m_localAnchorB;
}

/**
 * Get the reference angle.
 */
RevoluteJoint.prototype.getReferenceAngle = function() {
  return this.m_referenceAngle;
}

/**
 * Get the current joint angle in radians.
 */
RevoluteJoint.prototype.getJointAngle = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
}

/**
 * Get the current joint angle speed in radians per second.
 */
RevoluteJoint.prototype.getJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  return bB.m_angularVelocity - bA.m_angularVelocity;
}

/**
 * Is the joint motor enabled?
 */
RevoluteJoint.prototype.isMotorEnabled = function() {
  return this.m_enableMotor;
}

/**
 * Enable/disable the joint motor.
 */
RevoluteJoint.prototype.enableMotor = function(flag) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_enableMotor = flag;
}

/**
 * Get the current motor torque given the inverse time step. Unit is N*m.
 */
RevoluteJoint.prototype.getMotorTorque = function(inv_dt) {
  return inv_dt * this.m_motorImpulse;
}

/**
 * Set the motor speed in radians per second.
 */
RevoluteJoint.prototype.setMotorSpeed = function(speed) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_motorSpeed = speed;
}

/**
 * Get the motor speed in radians per second.
 */
RevoluteJoint.prototype.getMotorSpeed = function() {
  return this.m_motorSpeed;
}

/**
 * Set the maximum motor torque, usually in N-m.
 */
RevoluteJoint.prototype.setMaxMotorTorque = function(torque) {
  this.m_bodyA.setAwake(true);
  this.m_bodyB.setAwake(true);
  this.m_maxMotorTorque = torque;
}

RevoluteJoint.prototype.getMaxMotorTorque = function() {
  return this.m_maxMotorTorque;
}

/**
 * Is the joint limit enabled?
 */
RevoluteJoint.prototype.isLimitEnabled = function() {
  return this.m_enableLimit;
}

/**
 * Enable/disable the joint limit.
 */
RevoluteJoint.prototype.enableLimit = function(flag) {
  if (flag != this.m_enableLimit) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableLimit = flag;
    this.m_impulse.z = 0.0;
  }
}

/**
 * Get the lower joint limit in radians.
 */
RevoluteJoint.prototype.getLowerLimit = function() {
  return this.m_lowerAngle;
}

/**
 * Get the upper joint limit in radians.
 */
RevoluteJoint.prototype.getUpperLimit = function() {
  return this.m_upperAngle;
}

/**
 * Set the joint limits in radians.
 */
RevoluteJoint.prototype.setLimits = function(lower, upper) {
  _ASSERT && common.assert(lower <= upper);

  if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_impulse.z = 0.0;
    this.m_lowerAngle = lower;
    this.m_upperAngle = upper;
  }
}

RevoluteJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

RevoluteJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

/**
 * Get the reaction force given the inverse time step. Unit is N.
 */
RevoluteJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
}

/**
 * Get the reaction torque due to the joint limit given the inverse time step.
 * Unit is N*m.
 */
RevoluteJoint.prototype.getReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z;
}

RevoluteJoint.prototype.initVelocityConstraints = function(step) {
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

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

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

  var fixedRotation = (iA + iB === 0.0); // bool

  this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y
      * this.m_rB.y * iB;
  this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y
      * this.m_rB.x * iB;
  this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
  this.m_mass.ex.y = this.m_mass.ey.x;
  this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x
      * this.m_rB.x * iB;
  this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
  this.m_mass.ex.z = this.m_mass.ez.x;
  this.m_mass.ey.z = this.m_mass.ez.y;
  this.m_mass.ez.z = iA + iB;

  this.m_motorMass = iA + iB;
  if (this.m_motorMass > 0.0) {
    this.m_motorMass = 1.0 / this.m_motorMass;
  }

  if (this.m_enableMotor == false || fixedRotation) {
    this.m_motorImpulse = 0.0;
  }

  if (this.m_enableLimit && fixedRotation == false) {
    var jointAngle = aB - aA - this.m_referenceAngle; // float

    if (Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * Settings.angularSlop) {
      this.m_limitState = equalLimits;

    } else if (jointAngle <= this.m_lowerAngle) {
      if (this.m_limitState != atLowerLimit) {
        this.m_impulse.z = 0.0;
      }
      this.m_limitState = atLowerLimit;

    } else if (jointAngle >= this.m_upperAngle) {
      if (this.m_limitState != atUpperLimit) {
        this.m_impulse.z = 0.0;
      }
      this.m_limitState = atUpperLimit;

    } else {
      this.m_limitState = inactiveLimit;
      this.m_impulse.z = 0.0;
    }

  } else {
    this.m_limitState = inactiveLimit;
  }

  if (step.warmStarting) {
    // Scale impulses to support a variable time step.
    this.m_impulse.mul(step.dtRatio);
    this.m_motorImpulse *= step.dtRatio;

    var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);

    vA.subMul(mA, P);
    wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);

    vB.addMul(mB, P);
    wB += iB * (Vec2.cross(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);

  } else {
    this.m_impulse.setZero();
    this.m_motorImpulse = 0.0;
  }

  this.m_bodyA.c_velocity.v = vA;
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v = vB;
  this.m_bodyB.c_velocity.w = wB;
}

RevoluteJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var mA = this.m_invMassA;
  var mB = this.m_invMassB; // float
  var iA = this.m_invIA;
  var iB = this.m_invIB; // float

  var fixedRotation = (iA + iB === 0.0); // bool

  // Solve motor constraint.
  if (this.m_enableMotor && this.m_limitState != equalLimits
      && fixedRotation == false) {
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

  // Solve limit constraint.
  if (this.m_enableLimit && this.m_limitState != inactiveLimit
      && fixedRotation == false) {
    var Cdot1 = Vec2.zero();
    Cdot1.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
    Cdot1.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA));
    var Cdot2 = wB - wA; // float
    var Cdot = Vec3(Cdot1.x, Cdot1.y, Cdot2);

    var impulse = Vec3.neg(this.m_mass.solve33(Cdot)); // Vec3

    if (this.m_limitState == equalLimits) {
      this.m_impulse.add(impulse);

    } else if (this.m_limitState == atLowerLimit) {
      var newImpulse = this.m_impulse.z + impulse.z; // float

      if (newImpulse < 0.0) {
        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
        var reduced = this.m_mass.solve22(rhs); // Vec2
        impulse.x = reduced.x;
        impulse.y = reduced.y;
        impulse.z = -this.m_impulse.z;
        this.m_impulse.x += reduced.x;
        this.m_impulse.y += reduced.y;
        this.m_impulse.z = 0.0;

      } else {
        this.m_impulse.add(impulse);
      }

    } else if (this.m_limitState == atUpperLimit) {
      var newImpulse = this.m_impulse.z + impulse.z; // float

      if (newImpulse > 0.0) {
        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
        var reduced = this.m_mass.solve22(rhs); // Vec2
        impulse.x = reduced.x;
        impulse.y = reduced.y;
        impulse.z = -this.m_impulse.z;
        this.m_impulse.x += reduced.x;
        this.m_impulse.y += reduced.y;
        this.m_impulse.z = 0.0;

      } else {
        this.m_impulse.add(impulse);
      }
    }

    var P = Vec2.neo(impulse.x, impulse.y);

    vA.subMul(mA, P);
    wA -= iA * (Vec2.cross(this.m_rA, P) + impulse.z);

    vB.addMul(mB, P);
    wB += iB * (Vec2.cross(this.m_rB, P) + impulse.z);

  } else {
    // Solve point-to-point constraint
    var Cdot = Vec2.zero();
    Cdot.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
    Cdot.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA));
    var impulse = this.m_mass.solve22(Vec2.neg(Cdot)); // Vec2

    this.m_impulse.x += impulse.x;
    this.m_impulse.y += impulse.y;

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

RevoluteJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);

  var angularError = 0.0; // float
  var positionError = 0.0; // float

  var fixedRotation = (this.m_invIA + this.m_invIB == 0.0); // bool

  // Solve angular limit constraint.
  if (this.m_enableLimit && this.m_limitState != inactiveLimit
      && fixedRotation == false) {
    var angle = aB - aA - this.m_referenceAngle; // float
    var limitImpulse = 0.0; // float

    if (this.m_limitState == equalLimits) {
      // Prevent large angular corrections
      var C = Math.clamp(angle - this.m_lowerAngle,
          -Settings.maxAngularCorrection, Settings.maxAngularCorrection); // float
      limitImpulse = -this.m_motorMass * C;
      angularError = Math.abs(C);

    } else if (this.m_limitState == atLowerLimit) {
      var C = angle - this.m_lowerAngle; // float
      angularError = -C;

      // Prevent large angular corrections and allow some slop.
      C = Math.clamp(C + Settings.angularSlop, -Settings.maxAngularCorrection,
          0.0);
      limitImpulse = -this.m_motorMass * C;

    } else if (this.m_limitState == atUpperLimit) {
      var C = angle - this.m_upperAngle; // float
      angularError = C;

      // Prevent large angular corrections and allow some slop.
      C = Math.clamp(C - Settings.angularSlop, 0.0,
          Settings.maxAngularCorrection);
      limitImpulse = -this.m_motorMass * C;
    }

    aA -= this.m_invIA * limitImpulse;
    aB += this.m_invIB * limitImpulse;
  }

  // Solve point-to-point constraint.
  {
    qA.set(aA);
    qB.set(aB);
    var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
    var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2

    var C = Vec2.zero();
    C.addCombine(1, cB, 1, rB);
    C.subCombine(1, cA, 1, rA);
    positionError = C.length();

    var mA = this.m_invMassA;
    var mB = this.m_invMassB; // float
    var iA = this.m_invIA;
    var iB = this.m_invIB; // float

    var K = new Mat22();
    K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
    K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;

    var impulse = Vec2.neg(K.solve(C)); // Vec2

    cA.subMul(mA, impulse);
    aA -= iA * Vec2.cross(rA, impulse);

    cB.addMul(mB, impulse);
    aB += iB * Vec2.cross(rB, impulse);
  }

  this.m_bodyA.c_position.c.set(cA);
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c.set(cB);
  this.m_bodyB.c_position.a = aB;

  return positionError <= Settings.linearSlop
      && angularError <= Settings.angularSlop;
}
