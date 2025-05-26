/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SettingsInternal as Settings } from "../../Settings";
import { clamp } from "../../common/Math";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { Vec3 } from "../../common/Vec3";
import { Mat22 } from "../../common/Mat22";
import { Mat33 } from "../../common/Mat33";
import { Rot } from "../../common/Rot";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;

// todo: use string?
/** @internal */ enum LimitState {
  inactiveLimit = 0,
  atLowerLimit = 1,
  atUpperLimit = 2,
  equalLimits = 3,
}

/**
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
 */
export interface RevoluteJointOpt extends JointOpt {
  /**
   * The lower angle for the joint limit (radians).
   */
  lowerAngle?: number;
  /**
   * The upper angle for the joint limit (radians).
   */
  upperAngle?: number;
  /**
   * The maximum motor torque used to achieve the desired motor speed. Usually
   * in N-m.
   */
  maxMotorTorque?: number;
  /**
   * The desired motor speed. Usually in radians per second.
   */
  motorSpeed?: number;
  /**
   * A flag to enable joint limits.
   */
  enableLimit?: boolean;
  /**
   * A flag to enable the joint motor.
   */
  enableMotor?: boolean;
}

/**
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
 */
export interface RevoluteJointDef extends JointDef, RevoluteJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2Value;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2Value;
  /**
   * The bodyB angle minus bodyA angle in the reference state (radians).
   */
  referenceAngle?: number;

  /** @internal */ anchorA?: Vec2Value;
  /** @internal */ anchorB?: Vec2Value;
}

/** @internal */ const DEFAULTS = {
  lowerAngle: 0.0,
  upperAngle: 0.0,
  maxMotorTorque: 0.0,
  motorSpeed: 0.0,
  enableLimit: false,
  enableMotor: false,
};

declare module "./RevoluteJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function RevoluteJoint(def: RevoluteJointDef): RevoluteJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function RevoluteJoint(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2Value): RevoluteJoint;
}

/**
 * A revolute joint constrains two bodies to share a common point while they are
 * free to rotate about the point. The relative rotation about the shared point
 * is the joint angle. You can limit the relative rotation with a joint limit
 * that specifies a lower and upper angle. You can use a motor to drive the
 * relative rotation about the shared point. A maximum motor torque is provided
 * so that infinite forces are not generated.
 */
// @ts-expect-error
export class RevoluteJoint extends Joint {
  static TYPE = "revolute-joint" as const;

  /** @internal */ m_type: "revolute-joint";
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngle: number;
  /** @internal */ m_impulse: Vec3;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_lowerAngle: number;
  /** @internal */ m_upperAngle: number;
  /** @internal */ m_maxMotorTorque: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableLimit: boolean;
  /** @internal */ m_enableMotor: boolean;

  // Solver temp
  /** @internal */ m_rA: Vec2;
  /** @internal */ m_rB: Vec2;
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  // effective mass for point-to-point constraint.
  /** @internal */ m_mass: Mat33;
  // effective mass for motor/limit angular constraint.
  /** @internal */ m_motorMass: number;
  /** @internal */ m_limitState: number;

  constructor(def: RevoluteJointDef);
  constructor(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor?: Vec2Value);
  constructor(def: RevoluteJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof RevoluteJoint)) {
      return new RevoluteJoint(def, bodyA, bodyB, anchor);
    }

    def = def ?? ({} as RevoluteJointDef);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_mass = new Mat33();
    this.m_limitState = LimitState.inactiveLimit;

    this.m_type = RevoluteJoint.TYPE;

    if (Vec2.isValid(anchor)) {
      this.m_localAnchorA = bodyA.getLocalPoint(anchor);
    } else if (Vec2.isValid(def.localAnchorA)) {
      this.m_localAnchorA = Vec2.clone(def.localAnchorA);
    } else {
      this.m_localAnchorA = Vec2.zero();
    }

    if (Vec2.isValid(anchor)) {
      this.m_localAnchorB = bodyB.getLocalPoint(anchor);
    } else if (Vec2.isValid(def.localAnchorB)) {
      this.m_localAnchorB = Vec2.clone(def.localAnchorB);
    } else {
      this.m_localAnchorB = Vec2.zero();
    }

    if (Number.isFinite(def.referenceAngle)) {
      this.m_referenceAngle = def.referenceAngle;
    } else {
      this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
    }

    this.m_impulse = new Vec3();
    this.m_motorImpulse = 0.0;

    this.m_lowerAngle = def.lowerAngle ?? DEFAULTS.lowerAngle;
    this.m_upperAngle = def.upperAngle ?? DEFAULTS.upperAngle;
    this.m_maxMotorTorque = def.maxMotorTorque ?? DEFAULTS.maxMotorTorque;
    this.m_motorSpeed = def.motorSpeed ?? DEFAULTS.motorSpeed;
    this.m_enableLimit = def.enableLimit ?? DEFAULTS.enableLimit;
    this.m_enableMotor = def.enableMotor ?? DEFAULTS.enableMotor;

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

  /** @hidden */
  _serialize(): object {
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
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): RevoluteJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new RevoluteJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<RevoluteJointDef>): void {
    if (def.anchorA) {
      this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
    } else if (def.localAnchorA) {
      this.m_localAnchorA.setVec2(def.localAnchorA);
    }
    if (def.anchorB) {
      this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
    } else if (def.localAnchorB) {
      this.m_localAnchorB.setVec2(def.localAnchorB);
    }
    if (Number.isFinite(def.referenceAngle)) {
      this.m_referenceAngle = def.referenceAngle;
    }
    if (def.enableLimit !== undefined) {
      this.m_enableLimit = def.enableLimit;
    }
    if (Number.isFinite(def.lowerAngle)) {
      this.m_lowerAngle = def.lowerAngle;
    }
    if (Number.isFinite(def.upperAngle)) {
      this.m_upperAngle = def.upperAngle;
    }
    if (Number.isFinite(def.maxMotorTorque)) {
      this.m_maxMotorTorque = def.maxMotorTorque;
    }
    if (Number.isFinite(def.motorSpeed)) {
      this.m_motorSpeed = def.motorSpeed;
    }
    if (def.enableMotor !== undefined) {
      this.m_enableMotor = def.enableMotor;
    }
  }

  /**
   * The local anchor point relative to bodyA's origin.
   */
  getLocalAnchorA(): Vec2 {
    return this.m_localAnchorA;
  }

  /**
   * The local anchor point relative to bodyB's origin.
   */
  getLocalAnchorB(): Vec2 {
    return this.m_localAnchorB;
  }

  /**
   * Get the reference angle.
   */
  getReferenceAngle(): number {
    return this.m_referenceAngle;
  }

  /**
   * Get the current joint angle in radians.
   */
  getJointAngle(): number {
    const bA = this.m_bodyA;
    const bB = this.m_bodyB;
    return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
  }

  /**
   * Get the current joint angle speed in radians per second.
   */
  getJointSpeed(): number {
    const bA = this.m_bodyA;
    const bB = this.m_bodyB;
    return bB.m_angularVelocity - bA.m_angularVelocity;
  }

  /**
   * Is the joint motor enabled?
   */
  isMotorEnabled(): boolean {
    return this.m_enableMotor;
  }

  /**
   * Enable/disable the joint motor.
   */
  enableMotor(flag: boolean): void {
    if (flag == this.m_enableMotor) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableMotor = flag;
  }

  /**
   * Get the current motor torque given the inverse time step. Unit is N*m.
   */
  getMotorTorque(inv_dt: number): number {
    return inv_dt * this.m_motorImpulse;
  }

  /**
   * Set the motor speed in radians per second.
   */
  setMotorSpeed(speed: number): void {
    if (speed == this.m_motorSpeed) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
  }

  /**
   * Get the motor speed in radians per second.
   */
  getMotorSpeed(): number {
    return this.m_motorSpeed;
  }

  /**
   * Set the maximum motor torque, usually in N-m.
   */
  setMaxMotorTorque(torque: number): void {
    if (torque == this.m_maxMotorTorque) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorTorque = torque;
  }

  getMaxMotorTorque(): number {
    return this.m_maxMotorTorque;
  }

  /**
   * Is the joint limit enabled?
   */
  isLimitEnabled(): boolean {
    return this.m_enableLimit;
  }

  /**
   * Enable/disable the joint limit.
   */
  enableLimit(flag: boolean): void {
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
  getLowerLimit(): number {
    return this.m_lowerAngle;
  }

  /**
   * Get the upper joint limit in radians.
   */
  getUpperLimit(): number {
    return this.m_upperAngle;
  }

  /**
   * Set the joint limits in radians.
   */
  setLimits(lower: number, upper: number): void {
    if (_ASSERT) console.assert(lower <= upper);

    if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_impulse.z = 0.0;
      this.m_lowerAngle = lower;
      this.m_upperAngle = upper;
    }
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   */
  getAnchorA(): Vec2 {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
   */
  getAnchorB(): Vec2 {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  }

  /**
   * Get the reaction force given the inverse time step. Unit is N.
   */
  getReactionForce(inv_dt: number): Vec2 {
    return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
  }

  /**
   * Get the reaction torque due to the joint limit given the inverse time step.
   * Unit is N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return inv_dt * this.m_impulse.z;
  }

  initVelocityConstraints(step: TimeStep): void {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;

    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    const fixedRotation = iA + iB === 0.0;

    this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
    this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
    this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
    this.m_mass.ex.y = this.m_mass.ey.x;
    this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
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
      const jointAngle = aB - aA - this.m_referenceAngle;

      if (math_abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * Settings.angularSlop) {
        this.m_limitState = LimitState.equalLimits;
      } else if (jointAngle <= this.m_lowerAngle) {
        if (this.m_limitState != LimitState.atLowerLimit) {
          this.m_impulse.z = 0.0;
        }
        this.m_limitState = LimitState.atLowerLimit;
      } else if (jointAngle >= this.m_upperAngle) {
        if (this.m_limitState != LimitState.atUpperLimit) {
          this.m_impulse.z = 0.0;
        }
        this.m_limitState = LimitState.atUpperLimit;
      } else {
        this.m_limitState = LimitState.inactiveLimit;
        this.m_impulse.z = 0.0;
      }
    } else {
      this.m_limitState = LimitState.inactiveLimit;
    }

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      this.m_impulse.mul(step.dtRatio);
      this.m_motorImpulse *= step.dtRatio;

      const P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);

      vA.subMul(mA, P);
      wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);

      vB.addMul(mB, P);
      wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);
    } else {
      this.m_impulse.setZero();
      this.m_motorImpulse = 0.0;
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

    const fixedRotation = iA + iB === 0.0;

    // Solve motor constraint.
    if (this.m_enableMotor && this.m_limitState != LimitState.equalLimits && fixedRotation == false) {
      const Cdot = wB - wA - this.m_motorSpeed;
      let impulse = -this.m_motorMass * Cdot;
      const oldImpulse = this.m_motorImpulse;
      const maxImpulse = step.dt * this.m_maxMotorTorque;
      this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
      impulse = this.m_motorImpulse - oldImpulse;

      wA -= iA * impulse;
      wB += iB * impulse;
    }

    // Solve limit constraint.
    if (this.m_enableLimit && this.m_limitState != LimitState.inactiveLimit && fixedRotation == false) {
      const Cdot1 = Vec2.zero();
      Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
      Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
      const Cdot2 = wB - wA;
      const Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);

      const impulse = Vec3.neg(this.m_mass.solve33(Cdot));

      if (this.m_limitState == LimitState.equalLimits) {
        this.m_impulse.add(impulse);
      } else if (this.m_limitState == LimitState.atLowerLimit) {
        const newImpulse = this.m_impulse.z + impulse.z;

        if (newImpulse < 0.0) {
          const rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
          const reduced = this.m_mass.solve22(rhs);
          impulse.x = reduced.x;
          impulse.y = reduced.y;
          impulse.z = -this.m_impulse.z;
          this.m_impulse.x += reduced.x;
          this.m_impulse.y += reduced.y;
          this.m_impulse.z = 0.0;
        } else {
          this.m_impulse.add(impulse);
        }
      } else if (this.m_limitState == LimitState.atUpperLimit) {
        const newImpulse = this.m_impulse.z + impulse.z;

        if (newImpulse > 0.0) {
          const rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
          const reduced = this.m_mass.solve22(rhs);
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

      const P = Vec2.neo(impulse.x, impulse.y);

      vA.subMul(mA, P);
      wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);

      vB.addMul(mB, P);
      wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
    } else {
      // Solve point-to-point constraint
      const Cdot = Vec2.zero();
      Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
      Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
      const impulse = this.m_mass.solve22(Vec2.neg(Cdot));

      this.m_impulse.x += impulse.x;
      this.m_impulse.y += impulse.y;

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
    const cA = this.m_bodyA.c_position.c;
    let aA = this.m_bodyA.c_position.a;
    const cB = this.m_bodyB.c_position.c;
    let aB = this.m_bodyB.c_position.a;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    let angularError = 0.0;
    let positionError = 0.0;

    const fixedRotation = this.m_invIA + this.m_invIB == 0.0;

    // Solve angular limit constraint.
    if (this.m_enableLimit && this.m_limitState != LimitState.inactiveLimit && fixedRotation == false) {
      const angle = aB - aA - this.m_referenceAngle;
      let limitImpulse = 0.0;

      if (this.m_limitState == LimitState.equalLimits) {
        // Prevent large angular corrections
        const C = clamp(angle - this.m_lowerAngle, -Settings.maxAngularCorrection, Settings.maxAngularCorrection);
        limitImpulse = -this.m_motorMass * C;
        angularError = math_abs(C);
      } else if (this.m_limitState == LimitState.atLowerLimit) {
        let C = angle - this.m_lowerAngle;
        angularError = -C;

        // Prevent large angular corrections and allow some slop.
        C = clamp(C + Settings.angularSlop, -Settings.maxAngularCorrection, 0.0);
        limitImpulse = -this.m_motorMass * C;
      } else if (this.m_limitState == LimitState.atUpperLimit) {
        let C = angle - this.m_upperAngle;
        angularError = C;

        // Prevent large angular corrections and allow some slop.
        C = clamp(C - Settings.angularSlop, 0.0, Settings.maxAngularCorrection);
        limitImpulse = -this.m_motorMass * C;
      }

      aA -= this.m_invIA * limitImpulse;
      aB += this.m_invIB * limitImpulse;
    }

    // Solve point-to-point constraint.
    {
      qA.setAngle(aA);
      qB.setAngle(aB);
      const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

      const C = Vec2.zero();
      C.addCombine(1, cB, 1, rB);
      C.subCombine(1, cA, 1, rA);
      positionError = C.length();

      const mA = this.m_invMassA;
      const mB = this.m_invMassB;
      const iA = this.m_invIA;
      const iB = this.m_invIB;

      const K = new Mat22();
      K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
      K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
      K.ey.x = K.ex.y;
      K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;

      const impulse = Vec2.neg(K.solve(C));

      cA.subMul(mA, impulse);
      aA -= iA * Vec2.crossVec2Vec2(rA, impulse);

      cB.addMul(mB, impulse);
      aB += iB * Vec2.crossVec2Vec2(rB, impulse);
    }

    this.m_bodyA.c_position.c.setVec2(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.setVec2(cB);
    this.m_bodyB.c_position.a = aB;

    return positionError <= Settings.linearSlop && angularError <= Settings.angularSlop;
  }
}
