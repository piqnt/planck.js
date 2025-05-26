/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { options } from "../../util/options";
import { clamp } from "../../common/Math";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { Mat22 } from "../../common/Mat22";
import { Rot } from "../../common/Rot";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

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
  linearOffset?: Vec2Value;
}

/**
 * Motor joint definition.
 */
export interface MotorJointDef extends JointDef, MotorJointOpt {}

/** @internal */ const DEFAULTS = {
  maxForce: 1.0,
  maxTorque: 1.0,
  correctionFactor: 0.3,
};

declare module "./MotorJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function MotorJoint(def: MotorJointDef): MotorJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function MotorJoint(def: MotorJointOpt, bodyA: Body, bodyB: Body): MotorJoint;
}

/**
 * A motor joint is used to control the relative motion between two bodies. A
 * typical usage is to control the movement of a dynamic body with respect to
 * the ground.
 */
// @ts-expect-error
export class MotorJoint extends Joint {
  static TYPE = "motor-joint" as const;

  /** @internal */ m_type: "motor-joint";
  /** @internal */ m_linearOffset: Vec2;
  /** @internal */ m_angularOffset: number;
  /** @internal */ m_linearImpulse: Vec2;
  /** @internal */ m_angularImpulse: number;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_maxTorque: number;
  /** @internal */ m_correctionFactor: number;

  // Solver temp
  /** @internal */ m_rA: Vec2;
  /** @internal */ m_rB: Vec2;
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_linearError: Vec2;
  /** @internal */ m_angularError: number;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_linearMass: Mat22;
  /** @internal */ m_angularMass: number;

  constructor(def: MotorJointDef);
  constructor(def: MotorJointOpt, bodyA: Body, bodyB: Body);
  constructor(def: MotorJointDef | MotorJointOpt, bodyA?: Body, bodyB?: Body) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof MotorJoint)) {
      return new MotorJoint(def, bodyA, bodyB);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = MotorJoint.TYPE;

    this.m_linearOffset = Vec2.isValid(def.linearOffset)
      ? Vec2.clone(def.linearOffset)
      : bodyA.getLocalPoint(bodyB.getPosition());
    this.m_angularOffset = Number.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();

    this.m_linearImpulse = Vec2.zero();
    this.m_angularImpulse = 0.0;

    this.m_maxForce = def.maxForce;
    this.m_maxTorque = def.maxTorque;
    this.m_correctionFactor = def.correctionFactor;

    // Point-to-point constraint
    // Cdot = v2 - v1
    // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
    // J = [-I -r1_skew I r2_skew ]
    // Identity used:
    // w k % (rx i + ry j) = w * (-ry i + rx j)
    //
    // r1 = offset - c1
    // r2 = -c2

    // Angle constraint
    // Cdot = w2 - w1
    // J = [0 0 -1 0 0 1]
    // K = invI1 + invI2
  }

  /** @hidden */
  _serialize(): object {
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
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): MotorJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new MotorJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<MotorJointDef>): void {
    if (Number.isFinite(def.angularOffset)) {
      this.m_angularOffset = def.angularOffset;
    }
    if (Number.isFinite(def.maxForce)) {
      this.m_maxForce = def.maxForce;
    }
    if (Number.isFinite(def.maxTorque)) {
      this.m_maxTorque = def.maxTorque;
    }
    if (Number.isFinite(def.correctionFactor)) {
      this.m_correctionFactor = def.correctionFactor;
    }
    if (Vec2.isValid(def.linearOffset)) {
      this.m_linearOffset.set(def.linearOffset);
    }
  }

  /**
   * Set the maximum friction force in N.
   */
  setMaxForce(force: number): void {
    if (_ASSERT) console.assert(Number.isFinite(force) && force >= 0.0);
    this.m_maxForce = force;
  }

  /**
   * Get the maximum friction force in N.
   */
  getMaxForce(): number {
    return this.m_maxForce;
  }

  /**
   * Set the maximum friction torque in N*m.
   */
  setMaxTorque(torque: number): void {
    if (_ASSERT) console.assert(Number.isFinite(torque) && torque >= 0.0);
    this.m_maxTorque = torque;
  }

  /**
   * Get the maximum friction torque in N*m.
   */
  getMaxTorque(): number {
    return this.m_maxTorque;
  }

  /**
   * Set the position correction factor in the range [0,1].
   */
  setCorrectionFactor(factor: number): void {
    if (_ASSERT) console.assert(Number.isFinite(factor) && 0.0 <= factor && factor <= 1.0);
    this.m_correctionFactor = factor;
  }

  /**
   * Get the position correction factor in the range [0,1].
   */
  getCorrectionFactor(): number {
    return this.m_correctionFactor;
  }

  /**
   * Set/get the target linear offset, in frame A, in meters.
   */
  setLinearOffset(linearOffset: Vec2Value): void {
    if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_linearOffset.set(linearOffset);
    }
  }

  getLinearOffset(): Vec2 {
    return this.m_linearOffset;
  }

  /**
   * Set/get the target angular offset, in radians.
   */
  setAngularOffset(angularOffset: number): void {
    if (angularOffset != this.m_angularOffset) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_angularOffset = angularOffset;
    }
  }

  getAngularOffset(): number {
    return this.m_angularOffset;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   */
  getAnchorA(): Vec2 {
    return this.m_bodyA.getPosition();
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
   */
  getAnchorB(): Vec2 {
    return this.m_bodyB.getPosition();
  }

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   */
  getReactionForce(inv_dt: number): Vec2 {
    return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return inv_dt * this.m_angularImpulse;
  }

  initVelocityConstraints(step: TimeStep): void {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;

    const cA = this.m_bodyA.c_position.c;
    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const cB = this.m_bodyB.c_position.c;
    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    // Compute the effective mass matrix.
    this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_linearOffset, this.m_localCenterA));
    this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));

    // J = [-I -r1_skew I r2_skew]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    // Upper 2 by 2 of K for point to point
    const K = new Mat22();
    K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
    K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;

    this.m_linearMass = K.getInverse();

    this.m_angularMass = iA + iB;
    if (this.m_angularMass > 0.0) {
      this.m_angularMass = 1.0 / this.m_angularMass;
    }

    this.m_linearError = Vec2.zero();
    this.m_linearError.addCombine(1, cB, 1, this.m_rB);
    this.m_linearError.subCombine(1, cA, 1, this.m_rA);

    this.m_angularError = aB - aA - this.m_angularOffset;

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      this.m_linearImpulse.mul(step.dtRatio);
      this.m_angularImpulse *= step.dtRatio;

      const P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);

      vA.subMul(mA, P);
      wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);

      vB.addMul(mB, P);
      wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
    } else {
      this.m_linearImpulse.setZero();
      this.m_angularImpulse = 0.0;
    }

    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    const h = step.dt;
    const inv_h = step.inv_dt;

    // Solve angular friction
    {
      const Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
      let impulse = -this.m_angularMass * Cdot;

      const oldImpulse = this.m_angularImpulse;
      const maxImpulse = h * this.m_maxTorque;
      this.m_angularImpulse = clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
      impulse = this.m_angularImpulse - oldImpulse;

      wA -= iA * impulse;
      wB += iB * impulse;
    }

    // Solve linear friction
    {
      const Cdot = Vec2.zero();
      Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
      Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
      Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);

      let impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
      const oldImpulse = Vec2.clone(this.m_linearImpulse);
      this.m_linearImpulse.add(impulse);

      const maxImpulse = h * this.m_maxForce;

      this.m_linearImpulse.clamp(maxImpulse);

      impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);

      vA.subMul(mA, impulse);
      wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);

      vB.addMul(mB, impulse);
      wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
    }

    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step: TimeStep): boolean {
    return true;
  }
}
