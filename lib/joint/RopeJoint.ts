/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2021 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

import options from '../util/options';
import Settings from '../Settings';

import Math from '../common/Math';
import Vec2 from '../common/Vec2';
import Vec3 from '../common/Vec3';
import Mat22 from '../common/Mat22';
import Mat33 from '../common/Mat33';
import Rot from '../common/Rot';
import Sweep from '../common/Sweep';
import Transform from '../common/Transform';
import Velocity from '../common/Velocity';
import Position from '../common/Position';

import { default as Joint, JointOpt, JointDef} from '../Joint';
import Body from '../Body';

var inactiveLimit = 0;
var atLowerLimit = 1;
var atUpperLimit = 2;
var equalLimits = 3;

/**
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 */
export interface RopeJointOpt extends JointOpt {
  /**
   * The maximum length of the rope.
   * Warning: this must be larger than linearSlop or the joint will have no effect.
   */
  maxLength?: number;
}
/**
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 */
export interface RopeJointDef extends JointDef, RopeJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2;
}

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
export default class RopeJoint extends Joint {
  static TYPE = 'rope-joint' as 'rope-joint';

  /** @internal */ m_type: 'rope-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;

  /** @internal */ m_maxLength: number;

  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_length: number;
  /** @internal */ m_state: number; // TODO enum

  // Solver temp
  /** @internal */ m_u; // Vec2
  /** @internal */ m_rA; // Vec2
  /** @internal */ m_rB; // Vec2
  /** @internal */ m_localCenterA; // Vec2
  /** @internal */ m_localCenterB; // Vec2
  /** @internal */ m_invMassA; // float
  /** @internal */ m_invMassB; // float
  /** @internal */ m_invIA; // float
  /** @internal */ m_invIB; // float

  constructor(def: RopeJointDef);
  constructor(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
  constructor(def: RopeJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2) {
    // @ts-ignore
    if (!(this instanceof RopeJoint)) {
      return new RopeJoint(def, bodyA, bodyB, anchor);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
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

  _serialize() {
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

  static _deserialize(data, world, restore) {
    data = Object.assign({}, data);
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    var joint = new RopeJoint(data);
    return joint;
  };

  /**
   * The local anchor point relative to bodyA's origin.
   */
  getLocalAnchorA() {
    return this.m_localAnchorA;
  }

  /**
   * The local anchor point relative to bodyB's origin.
   */
  getLocalAnchorB() {
    return this.m_localAnchorB;
  }

  /**
   * Set the maximum length of the rope.
   */
  setMaxLength(length) {
    this.m_maxLength = length;
  }

  /**
   * Get the maximum length of the rope.
   */
  getMaxLength() {
    return this.m_maxLength;
  }

  getLimitState() {
    // TODO LimitState
    return this.m_state;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   * 
   * @return {Vec2}
   */
  getAnchorA() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
   * 
   * @return {Vec2}
   */
  getAnchorB() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  }

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   * 
   * @param {float} inv_dt
   * @return {Vec2}
   */
  getReactionForce(inv_dt) {
    return Vec2.mul(this.m_impulse, this.m_u).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   * 
   * @param {float} inv_dt
   * @return {float}
   */
  getReactionTorque(inv_dt) {
    return 0.0;
  }

  initVelocityConstraints(step) {
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

  solveVelocityConstraints(step) {
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

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step) {
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

}

Joint.TYPES[RopeJoint.TYPE] = RopeJoint;
