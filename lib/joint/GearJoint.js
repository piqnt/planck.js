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

module.exports = GearJoint;

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

var RevoluteJoint = require('./RevoluteJoint');
var PrismaticJoint = require('./PrismaticJoint');

GearJoint.TYPE = 'gear-joint';
Joint.TYPES[GearJoint.TYPE] = GearJoint;

GearJoint._super = Joint;
GearJoint.prototype = create(GearJoint._super.prototype);

/**
 * @typedef {Object} GearJointDef
 *
 * Gear joint definition.
 *
 * @prop {float} ratio The gear ratio. See GearJoint for explanation.
 *
 * @prop {RevoluteJoint|PrismaticJoint} joint1 The first revolute/prismatic
 *          joint attached to the gear joint.
 * @prop {PrismaticJoint|RevoluteJoint} joint2 The second prismatic/revolute
 *          joint attached to the gear joint.
 */

var DEFAULTS = {
  ratio : 1.0
};

/**
 * A gear joint is used to connect two joints together. Either joint can be a
 * revolute or prismatic joint. You specify a gear ratio to bind the motions
 * together: coordinate1 + ratio * coordinate2 = constant
 * 
 * The ratio can be negative or positive. If one joint is a revolute joint and
 * the other joint is a prismatic joint, then the ratio will have units of
 * length or units of 1/length. Warning: You have to manually destroy the gear
 * joint if joint1 or joint2 is destroyed.
 * 
 * This definition requires two existing revolute or prismatic joints (any
 * combination will work).
 *
 * @param {GearJointDef} def
 * @param {Body} bodyA
 * @param {Body} bodyB
 */
function GearJoint(def, bodyA, bodyB, joint1, joint2, ratio) {
  if (!(this instanceof GearJoint)) {
    return new GearJoint(def, bodyA, bodyB, joint1, joint2, ratio);
  }

  def = options(def, DEFAULTS);
  Joint.call(this, def, bodyA, bodyB);
  bodyA = this.m_bodyA;
  bodyB = this.m_bodyB;

  this.m_type = GearJoint.TYPE;

  _ASSERT && common.assert(joint1.m_type === RevoluteJoint.TYPE
      || joint1.m_type === PrismaticJoint.TYPE);
  _ASSERT && common.assert(joint2.m_type === RevoluteJoint.TYPE
      || joint2.m_type === PrismaticJoint.TYPE);

  this.m_joint1 = joint1 ? joint1 : def.joint1;
  this.m_joint2 = joint2 ? joint2 : def.joint2;
  this.m_ratio = Math.isFinite(ratio) ? ratio : def.ratio;

  this.m_type1 = this.m_joint1.getType();
  this.m_type2 = this.m_joint2.getType();

  // joint1 connects body A to body C
  // joint2 connects body B to body D

  var coordinateA, coordinateB; // float

  // TODO_ERIN there might be some problem with the joint edges in Joint.

  this.m_bodyC = this.m_joint1.getBodyA();
  this.m_bodyA = this.m_joint1.getBodyB();

  // Get geometry of joint1
  var xfA = this.m_bodyA.m_xf;
  var aA = this.m_bodyA.m_sweep.a;
  var xfC = this.m_bodyC.m_xf;
  var aC = this.m_bodyC.m_sweep.a;

  if (this.m_type1 === RevoluteJoint.TYPE) {
    var revolute = this.m_joint1;// RevoluteJoint
    this.m_localAnchorC = revolute.m_localAnchorA;
    this.m_localAnchorA = revolute.m_localAnchorB;
    this.m_referenceAngleA = revolute.m_referenceAngle;
    this.m_localAxisC = Vec2.zero();

    coordinateA = aA - aC - this.m_referenceAngleA;
  } else {
    var prismatic = this.m_joint1; // PrismaticJoint
    this.m_localAnchorC = prismatic.m_localAnchorA;
    this.m_localAnchorA = prismatic.m_localAnchorB;
    this.m_referenceAngleA = prismatic.m_referenceAngle;
    this.m_localAxisC = prismatic.m_localXAxisA;

    var pC = this.m_localAnchorC;
    var pA = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mul(xfA.q, this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
    coordinateA = Vec2.dot(pA, this.m_localAxisC) - Vec2.dot(pC, this.m_localAxisC);
  }

  this.m_bodyD = this.m_joint2.getBodyA();
  this.m_bodyB = this.m_joint2.getBodyB();

  // Get geometry of joint2
  var xfB = this.m_bodyB.m_xf;
  var aB = this.m_bodyB.m_sweep.a;
  var xfD = this.m_bodyD.m_xf;
  var aD = this.m_bodyD.m_sweep.a;

  if (this.m_type2 === RevoluteJoint.TYPE) {
    var revolute = this.m_joint2; // RevoluteJoint
    this.m_localAnchorD = revolute.m_localAnchorA;
    this.m_localAnchorB = revolute.m_localAnchorB;
    this.m_referenceAngleB = revolute.m_referenceAngle;
    this.m_localAxisD = Vec2.zero();

    coordinateB = aB - aD - this.m_referenceAngleB;
  } else {
    var prismatic = this.m_joint2; // PrismaticJoint
    this.m_localAnchorD = prismatic.m_localAnchorA;
    this.m_localAnchorB = prismatic.m_localAnchorB;
    this.m_referenceAngleB = prismatic.m_referenceAngle;
    this.m_localAxisD = prismatic.m_localXAxisA;

    var pD = this.m_localAnchorD;
    var pB = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mul(xfB.q, this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
    coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
  }

  this.m_constant = coordinateA + this.m_ratio * coordinateB;

  this.m_impulse = 0.0;

  // Solver temp
  this.m_lcA, this.m_lcB, this.m_lcC, this.m_lcD; // Vec2
  this.m_mA, this.m_mB, this.m_mC, this.m_mD; // float
  this.m_iA, this.m_iB, this.m_iC, this.m_iD; // float
  this.m_JvAC, this.m_JvBD; // Vec2
  this.m_JwA, this.m_JwB, this.m_JwC, this.m_JwD; // float
  this.m_mass; // float

  // Gear Joint:
  // C0 = (coordinate1 + ratio * coordinate2)_initial
  // C = (coordinate1 + ratio * coordinate2) - C0 = 0
  // J = [J1 ratio * J2]
  // K = J * invM * JT
  // = J1 * invM1 * J1T + ratio * ratio * J2 * invM2 * J2T
  //
  // Revolute:
  // coordinate = rotation
  // Cdot = angularVelocity
  // J = [0 0 1]
  // K = J * invM * JT = invI
  //
  // Prismatic:
  // coordinate = dot(p - pg, ug)
  // Cdot = dot(v + cross(w, r), ug)
  // J = [ug cross(r, ug)]
  // K = J * invM * JT = invMass + invI * cross(r, ug)^2
};

GearJoint.prototype._serialize = function() {
  return {
    type: this.m_type,
    bodyA: this.m_bodyA,
    bodyB: this.m_bodyB,
    collideConnected: this.m_collideConnected,

    joint1: this.m_joint1,
    joint2: this.m_joint2,
    ratio: this.m_ratio,

    _constant: this.m_constant,
  };
};

GearJoint._deserialize = function(data, world, restore) {
  data.bodyA = restore(Body, data.bodyA, world);
  data.bodyB = restore(Body, data.bodyB, world);
  data.joint1 = restore(Joint, data.joint1, world);
  data.joint2 = restore(Joint, data.joint2, world);
  var joint = new GearJoint(data);
  if(data._constant) joint.m_constant = data._constant;
  return joint;
};

/**
 * Get the first joint.
 */
GearJoint.prototype.getJoint1 = function() {
  return this.m_joint1;
}

/**
 * Get the second joint.
 */
GearJoint.prototype.getJoint2 = function() {
  return this.m_joint2;
}

/**
 * Set/Get the gear ratio.
 */
GearJoint.prototype.setRatio = function(ratio) {
  _ASSERT && common.assert(Math.isFinite(ratio));
  this.m_ratio = ratio;
}

GearJoint.prototype.getRatio = function() {
  return this.m_ratio;
}

GearJoint.prototype.getAnchorA = function() {
  return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
}

GearJoint.prototype.getAnchorB = function() {
  return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
}

GearJoint.prototype.getReactionForce = function(inv_dt) {
  return Vec2.mul(this.m_impulse, this.m_JvAC).mul(inv_dt);
}

GearJoint.prototype.getReactionTorque = function(inv_dt) {
  var L = this.m_impulse * this.m_JwA; // float
  return inv_dt * L;
}

GearJoint.prototype.initVelocityConstraints = function(step) {
  this.m_lcA = this.m_bodyA.m_sweep.localCenter;
  this.m_lcB = this.m_bodyB.m_sweep.localCenter;
  this.m_lcC = this.m_bodyC.m_sweep.localCenter;
  this.m_lcD = this.m_bodyD.m_sweep.localCenter;
  this.m_mA = this.m_bodyA.m_invMass;
  this.m_mB = this.m_bodyB.m_invMass;
  this.m_mC = this.m_bodyC.m_invMass;
  this.m_mD = this.m_bodyD.m_invMass;
  this.m_iA = this.m_bodyA.m_invI;
  this.m_iB = this.m_bodyB.m_invI;
  this.m_iC = this.m_bodyC.m_invI;
  this.m_iD = this.m_bodyD.m_invI;

  var aA = this.m_bodyA.c_position.a;
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;

  var aB = this.m_bodyB.c_position.a;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;

  var aC = this.m_bodyC.c_position.a;
  var vC = this.m_bodyC.c_velocity.v;
  var wC = this.m_bodyC.c_velocity.w;

  var aD = this.m_bodyD.c_position.a;
  var vD = this.m_bodyD.c_velocity.v;
  var wD = this.m_bodyD.c_velocity.w;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);
  var qC = Rot.neo(aC);
  var qD = Rot.neo(aD);

  this.m_mass = 0.0;

  if (this.m_type1 == RevoluteJoint.TYPE) {
    this.m_JvAC = Vec2.zero();
    this.m_JwA = 1.0;
    this.m_JwC = 1.0;
    this.m_mass += this.m_iA + this.m_iC;
  } else {
    var u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
    var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
    var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
    this.m_JvAC = u;
    this.m_JwC = Vec2.cross(rC, u);
    this.m_JwA = Vec2.cross(rA, u);
    this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
  }

  if (this.m_type2 == RevoluteJoint.TYPE) {
    this.m_JvBD = Vec2.zero();
    this.m_JwB = this.m_ratio;
    this.m_JwD = this.m_ratio;
    this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
  } else {
    var u = Rot.mulVec2(qD, this.m_localAxisD); // Vec2
    var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD); // Vec2
    var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB); // Vec2
    this.m_JvBD = Vec2.mul(this.m_ratio, u);
    this.m_JwD = this.m_ratio * Vec2.cross(rD, u);
    this.m_JwB = this.m_ratio * Vec2.cross(rB, u);
    this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
  }

  // Compute effective mass.
  this.m_mass = this.m_mass > 0.0 ? 1.0 / this.m_mass : 0.0;

  if (step.warmStarting) {
    vA.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
    wA += this.m_iA * this.m_impulse * this.m_JwA;
    
    vB.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
    wB += this.m_iB * this.m_impulse * this.m_JwB;
    
    vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
    wC -= this.m_iC * this.m_impulse * this.m_JwC;
  
    vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
    wD -= this.m_iD * this.m_impulse * this.m_JwD;

  } else {
    this.m_impulse = 0.0;
  }

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
  this.m_bodyC.c_velocity.v.set(vC);
  this.m_bodyC.c_velocity.w = wC;
  this.m_bodyD.c_velocity.v.set(vD);
  this.m_bodyD.c_velocity.w = wD;
}

GearJoint.prototype.solveVelocityConstraints = function(step) {
  var vA = this.m_bodyA.c_velocity.v;
  var wA = this.m_bodyA.c_velocity.w;
  var vB = this.m_bodyB.c_velocity.v;
  var wB = this.m_bodyB.c_velocity.w;
  var vC = this.m_bodyC.c_velocity.v;
  var wC = this.m_bodyC.c_velocity.w;
  var vD = this.m_bodyD.c_velocity.v;
  var wD = this.m_bodyD.c_velocity.w;

  var Cdot = Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC)
      + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD); // float
  Cdot += (this.m_JwA * wA - this.m_JwC * wC)
      + (this.m_JwB * wB - this.m_JwD * wD);

  var impulse = -this.m_mass * Cdot; // float
  this.m_impulse += impulse;

  vA.addMul(this.m_mA * impulse, this.m_JvAC);
  wA += this.m_iA * impulse * this.m_JwA;
  vB.addMul(this.m_mB * impulse, this.m_JvBD);
  wB += this.m_iB * impulse * this.m_JwB;
  vC.subMul(this.m_mC * impulse, this.m_JvAC);
  wC -= this.m_iC * impulse * this.m_JwC;
  vD.subMul(this.m_mD * impulse, this.m_JvBD);
  wD -= this.m_iD * impulse * this.m_JwD;

  this.m_bodyA.c_velocity.v.set(vA);
  this.m_bodyA.c_velocity.w = wA;
  this.m_bodyB.c_velocity.v.set(vB);
  this.m_bodyB.c_velocity.w = wB;
  this.m_bodyC.c_velocity.v.set(vC);
  this.m_bodyC.c_velocity.w = wC;
  this.m_bodyD.c_velocity.v.set(vD);
  this.m_bodyD.c_velocity.w = wD;
}

GearJoint.prototype.solvePositionConstraints = function(step) {
  var cA = this.m_bodyA.c_position.c;
  var aA = this.m_bodyA.c_position.a;
  var cB = this.m_bodyB.c_position.c;
  var aB = this.m_bodyB.c_position.a;
  var cC = this.m_bodyC.c_position.c;
  var aC = this.m_bodyC.c_position.a;
  var cD = this.m_bodyD.c_position.c;
  var aD = this.m_bodyD.c_position.a;

  var qA = Rot.neo(aA);
  var qB = Rot.neo(aB);
  var qC = Rot.neo(aC);
  var qD = Rot.neo(aD);

  var linearError = 0.0; // float

  var coordinateA, coordinateB; // float

  var JvAC, JvBD; // Vec2
  var JwA, JwB, JwC, JwD; // float
  var mass = 0.0; // float

  if (this.m_type1 == RevoluteJoint.TYPE) {
    JvAC = Vec2.zero();
    JwA = 1.0;
    JwC = 1.0;
    mass += this.m_iA + this.m_iC;

    coordinateA = aA - aC - this.m_referenceAngleA;
  } else {
    var u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
    var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
    var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
    JvAC = u;
    JwC = Vec2.cross(rC, u);
    JwA = Vec2.cross(rA, u);
    mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;

    var pC = Vec2.sub(this.m_localAnchorC, this.m_lcC); // Vec2
    var pA = Rot.mulTVec2(qC, Vec2.add(rA, Vec2.sub(cA, cC))); // Vec2
    coordinateA = Vec2.dot(Vec2.sub(pA, pC), this.m_localAxisC);
  }

  if (this.m_type2 == RevoluteJoint.TYPE) {
    JvBD = Vec2.zero();
    JwB = this.m_ratio;
    JwD = this.m_ratio;
    mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);

    coordinateB = aB - aD - this.m_referenceAngleB;
  } else {
    var u = Rot.mulVec2(qD, this.m_localAxisD);
    var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
    var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
    JvBD = Vec2.mul(this.m_ratio, u);
    JwD = this.m_ratio * Vec2.cross(rD, u);
    JwB = this.m_ratio * Vec2.cross(rB, u);
    mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD
        * JwD * JwD + this.m_iB * JwB * JwB;

    var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD); // Vec2
    var pB = Rot.mulTVec2(qD, Vec2.add(rB, Vec2.sub(cB, cD))); // Vec2
    coordinateB = Vec2.dot(pB, this.m_localAxisD)
        - Vec2.dot(pD, this.m_localAxisD);
  }

  var C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant; // float

  var impulse = 0.0; // float
  if (mass > 0.0) {
    impulse = -C / mass;
  }

  cA.addMul(this.m_mA * impulse, JvAC);
  aA += this.m_iA * impulse * JwA;
  cB.addMul(this.m_mB * impulse, JvBD);
  aB += this.m_iB * impulse * JwB;
  cC.subMul(this.m_mC * impulse, JvAC);
  aC -= this.m_iC * impulse * JwC;
  cD.subMul(this.m_mD * impulse, JvBD);
  aD -= this.m_iD * impulse * JwD;

  this.m_bodyA.c_position.c.set(cA);
  this.m_bodyA.c_position.a = aA;
  this.m_bodyB.c_position.c.set(cB);
  this.m_bodyB.c_position.a = aB;
  this.m_bodyC.c_position.c.set(cC);
  this.m_bodyC.c_position.a = aC;
  this.m_bodyD.c_position.c.set(cD);
  this.m_bodyD.c_position.a = aD;

  // TODO_ERIN not implemented
  return linearError < Settings.linearSlop;
}
