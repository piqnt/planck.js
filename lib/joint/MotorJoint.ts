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

import common from '../util/common';
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

/**
 * Motor joint definition.
 */
export interface MotorJointOpt extends JointOpt {
  /**
   * The bodyB angle minus bodyA angle in radians.
   */
  angularOffset?: number;
  /**
   * The maximum motor force in N.
   */
  maxForce?: number;
  /**
   * The maximum motor torque in N-m.
   */
  maxTorque?: number;
  /**
   * Position correction factor in the range [0,1].
   */
  correctionFactor?: number;
  /**
   * Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.
   */
  linearOffset?: Vec2;
}
/**
 * Motor joint definition.
 */
export interface MotorJointDef extends JointDef, MotorJointOpt {
}

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
export default class MotorJoint extends Joint {
  static TYPE = 'motor-joint' as 'motor-joint';

  /** @internal */ m_type: 'motor-joint';
  /** @internal */ m_linearOffset: Vec2;
  /** @internal */ m_angularOffset: number;
  /** @internal */ m_linearImpulse: Vec2;
  /** @internal */ m_angularImpulse: number;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_maxTorque: number;
  /** @internal */ m_correctionFactor: number;
  // Solver temp
  /** @internal */ m_rA; // Vec2
  /** @internal */ m_rB; // Vec2
  /** @internal */ m_localCenterA; // Vec2
  /** @internal */ m_localCenterB; // Vec2
  /** @internal */ m_linearError; // Vec2
  /** @internal */ m_angularError; // float
  /** @internal */ m_invMassA; // float
  /** @internal */ m_invMassB; // float
  /** @internal */ m_invIA; // float
  /** @internal */ m_invIB; // float
  /** @internal */ m_linearMass; // Mat22
  /** @internal */ m_angularMass; // float

  constructor(def: MotorJointDef);
  constructor(def: MotorJointOpt, bodyA: Body, bodyB: Body);
  constructor(def: MotorJointDef | MotorJointOpt, bodyA?: Body, bodyB?: Body) {
    // @ts-ignore
    if (!(this instanceof MotorJoint)) {
      return new MotorJoint(def, bodyA, bodyB);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = MotorJoint.TYPE;

    this.m_linearOffset = Math.isFinite(def.linearOffset) ? def.linearOffset : bodyA.getLocalPoint(bodyB.getPosition());
    this.m_angularOffset = Math.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();

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

  _serialize() {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      maxForce: this.m_maxForce,
      maxTorque: this.m_maxTorque,
      correctionFactor: this.m_correctionFactor,

      linearOffset: this.m_linearOffset,
      angularOffset: this.m_angularOffset,
    };
  };

  static _deserialize(data, world, restore) {
    data = Object.assign({}, data);
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    var joint = new MotorJoint(data);
    return joint;
  };

  /**
   * @internal
   */
  _setAnchors(def) {
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
   * Set the maximum friction force in N.
   */
  setMaxForce(force) {
    _ASSERT && common.assert(Math.isFinite(force) && force >= 0.0);
    this.m_maxForce = force;
  }

  /**
   * Get the maximum friction force in N.
   */
  getMaxForce() {
    return this.m_maxForce;
  }

  /**
   * Set the maximum friction torque in N*m.
   */
  setMaxTorque(torque) {
    _ASSERT && common.assert(Math.isFinite(torque) && torque >= 0.0);
    this.m_maxTorque = torque;
  }

  /**
   * Get the maximum friction torque in N*m.
   */
  getMaxTorque() {
    return this.m_maxTorque;
  }

  /**
   * Set the position correction factor in the range [0,1].
   */
  setCorrectionFactor(factor) {
    _ASSERT && common.assert(Math.isFinite(factor) && 0.0 <= factor && factor <= 1.0);
    this.m_correctionFactor = factor;
  }

  /**
   * Get the position correction factor in the range [0,1].
   */
  getCorrectionFactor() {
    return this.m_correctionFactor;
  }

  /**
   * Set/get the target linear offset, in frame A, in meters.
   */
  setLinearOffset(linearOffset) {
    if (linearOffset.x != this.m_linearOffset.x
        || linearOffset.y != this.m_linearOffset.y) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_linearOffset = linearOffset;
    }
  }

  getLinearOffset() {
    return this.m_linearOffset;
  }

  /**
   * Set/get the target angular offset, in radians.
   */
  setAngularOffset(angularOffset) {
    if (angularOffset != this.m_angularOffset) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_angularOffset = angularOffset;
    }
  }

  getAngularOffset() {
    return this.m_angularOffset;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   * 
   * @return {Vec2}
   */
  getAnchorA() {
    return this.m_bodyA.getPosition();
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
   * 
   * @return {Vec2}
   */
  getAnchorB() {
    return this.m_bodyB.getPosition();
  }

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   * 
   * @param {float} inv_dt
   * @return {Vec2}
   */
  getReactionForce(inv_dt) {
    return Vec2.mul(inv_dt, this.m_linearImpulse);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   * 
   * @param {float} inv_dt
   * @return {float}
   */
  getReactionTorque(inv_dt) {
    return inv_dt * this.m_angularImpulse;
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

  solveVelocityConstraints(step) {
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
      let Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
      let impulse = -this.m_angularMass * Cdot;

      let oldImpulse = this.m_angularImpulse;
      let maxImpulse = h * this.m_maxTorque;
      this.m_angularImpulse = Math.clamp(this.m_angularImpulse + impulse,
          -maxImpulse, maxImpulse);
      impulse = this.m_angularImpulse - oldImpulse;

      wA -= iA * impulse;
      wB += iB * impulse;
    }

    // Solve linear friction
    {
      let Cdot = Vec2.zero();
      Cdot.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
      Cdot.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA));
      Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);

      let impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
      let oldImpulse = Vec2.clone(this.m_linearImpulse);
      this.m_linearImpulse.add(impulse);

      let maxImpulse = h * this.m_maxForce;

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

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step) {
    return true;
  }

}

Joint.TYPES[MotorJoint.TYPE] = MotorJoint;
