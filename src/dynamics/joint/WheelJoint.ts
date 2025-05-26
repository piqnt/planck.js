/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { options } from "../../util/options";
import { SettingsInternal as Settings } from "../../Settings";
import { clamp } from "../../common/Math";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { Rot } from "../../common/Rot";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_PI = Math.PI;

/**
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
export interface WheelJointOpt extends JointOpt {
  /**
   * Enable/disable the joint motor.
   */
  enableMotor?: boolean;
  /**
   * The maximum motor torque, usually in N-m.
   */
  maxMotorTorque?: number;
  /**
   * The desired motor speed in radians per second.
   */
  motorSpeed?: number;
  /**
   * Suspension frequency, zero indicates no suspension.
   */
  frequencyHz?: number;
  /**
   * Suspension damping ratio, one indicates critical damping.
   */
  dampingRatio?: number;
}

/**
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
export interface WheelJointDef extends JointDef, WheelJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2Value;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2Value;
  /**
   * The local translation axis in bodyA.
   */
  localAxisA: Vec2Value;

  /** @internal renamed to localAxisA */
  localAxis?: Vec2Value;

  /** @internal */ anchorA?: Vec2Value;
  /** @internal */ anchorB?: Vec2Value;
}

/** @internal */ const DEFAULTS = {
  enableMotor: false,
  maxMotorTorque: 0.0,
  motorSpeed: 0.0,
  frequencyHz: 2.0,
  dampingRatio: 0.7,
};

declare module "./WheelJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function WheelJoint(def: WheelJointDef): WheelJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function WheelJoint(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2Value, axis: Vec2Value): WheelJoint;
}

/**
 * A wheel joint. This joint provides two degrees of freedom: translation along
 * an axis fixed in bodyA and rotation in the plane. In other words, it is a
 * point to line constraint with a rotational motor and a linear spring/damper.
 * This joint is designed for vehicle suspensions.
 */
// @ts-expect-error
export class WheelJoint extends Joint {
  static TYPE = "wheel-joint" as const;

  /** @internal */ m_type: "wheel-joint";
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_localXAxisA: Vec2;
  /** @internal */ m_localYAxisA: Vec2;

  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_motorMass: number;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_springMass: number;
  /** @internal */ m_springImpulse: number;

  /** @internal */ m_maxMotorTorque: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableMotor: boolean;

  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;

  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;

  // Solver temp
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;

  /** @internal */ m_ax: Vec2;
  /** @internal */ m_ay: Vec2;
  /** @internal */ m_sAx: number;
  /** @internal */ m_sBx: number;
  /** @internal */ m_sAy: number;
  /** @internal */ m_sBy: number;

  constructor(def: WheelJointDef);
  constructor(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor?: Vec2Value, axis?: Vec2Value);
  constructor(def: WheelJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2Value, axis?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof WheelJoint)) {
      return new WheelJoint(def, bodyA, bodyB, anchor, axis);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_ax = Vec2.zero();
    this.m_ay = Vec2.zero();

    this.m_type = WheelJoint.TYPE;

    this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
    this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());

    if (Vec2.isValid(axis)) {
      this.m_localXAxisA = bodyA.getLocalVector(axis);
    } else if (Vec2.isValid(def.localAxisA)) {
      this.m_localXAxisA = Vec2.clone(def.localAxisA);
    } else if (Vec2.isValid(def.localAxis)) {
      // localAxis is renamed to localAxisA, this is for backward compatibility
      this.m_localXAxisA = Vec2.clone(def.localAxis);
    } else {
      this.m_localXAxisA = Vec2.neo(1.0, 0.0);
    }

    this.m_localYAxisA = Vec2.crossNumVec2(1.0, this.m_localXAxisA);

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

  /** @hidden */
  _serialize(): object {
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
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): WheelJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new WheelJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<WheelJointDef>): void {
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
    if (def.localAxisA) {
      this.m_localXAxisA.setVec2(def.localAxisA);
      this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1.0, def.localAxisA));
    }
    if (def.enableMotor !== undefined) {
      this.m_enableMotor = def.enableMotor;
    }
    if (Number.isFinite(def.maxMotorTorque)) {
      this.m_maxMotorTorque = def.maxMotorTorque;
    }
    if (Number.isFinite(def.motorSpeed)) {
      this.m_motorSpeed = def.motorSpeed;
    }
    if (Number.isFinite(def.frequencyHz)) {
      this.m_frequencyHz = def.frequencyHz;
    }
    if (Number.isFinite(def.dampingRatio)) {
      this.m_dampingRatio = def.dampingRatio;
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
   * The local joint axis relative to bodyA.
   */
  getLocalAxisA(): Vec2 {
    return this.m_localXAxisA;
  }

  /**
   * Get the current joint translation, usually in meters.
   */
  getJointTranslation(): number {
    const bA = this.m_bodyA;
    const bB = this.m_bodyB;

    const pA = bA.getWorldPoint(this.m_localAnchorA);
    const pB = bB.getWorldPoint(this.m_localAnchorB);
    const d = Vec2.sub(pB, pA);
    const axis = bA.getWorldVector(this.m_localXAxisA);

    const translation = Vec2.dot(d, axis);
    return translation;
  }

  /**
   * Get the current joint translation speed, usually in meters per second.
   */
  getJointSpeed(): number {
    const wA = this.m_bodyA.m_angularVelocity;
    const wB = this.m_bodyB.m_angularVelocity;
    return wB - wA;
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
   * Set the motor speed, usually in radians per second.
   */
  setMotorSpeed(speed: number): void {
    if (speed == this.m_motorSpeed) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
  }

  /**
   * Get the motor speed, usually in radians per second.
   */
  getMotorSpeed(): number {
    return this.m_motorSpeed;
  }

  /**
   * Set/Get the maximum motor force, usually in N-m.
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
   * Get the current motor torque given the inverse time step, usually in N-m.
   */
  getMotorTorque(inv_dt: number): number {
    return inv_dt * this.m_motorImpulse;
  }

  /**
   * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
   * the spring.
   */
  setSpringFrequencyHz(hz: number): void {
    this.m_frequencyHz = hz;
  }

  getSpringFrequencyHz(): number {
    return this.m_frequencyHz;
  }

  /**
   * Set/Get the spring damping ratio
   */
  setSpringDampingRatio(ratio: number): void {
    this.m_dampingRatio = ratio;
  }

  getSpringDampingRatio(): number {
    return this.m_dampingRatio;
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
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   */
  getReactionForce(inv_dt: number): Vec2 {
    return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return inv_dt * this.m_motorImpulse;
  }

  initVelocityConstraints(step: TimeStep): void {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

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

    // Compute the effective masses.
    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    const d = Vec2.zero();
    d.addCombine(1, cB, 1, rB);
    d.subCombine(1, cA, 1, rA);

    // Point to line constraint
    {
      this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
      this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ay);
      this.m_sBy = Vec2.crossVec2Vec2(rB, this.m_ay);

      this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;

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
      this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ax);
      this.m_sBx = Vec2.crossVec2Vec2(rB, this.m_ax);

      const invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;

      if (invMass > 0.0) {
        this.m_springMass = 1.0 / invMass;

        const C = Vec2.dot(d, this.m_ax);

        // Frequency
        const omega = 2.0 * math_PI * this.m_frequencyHz;

        // Damping coefficient
        const damp = 2.0 * this.m_springMass * this.m_dampingRatio * omega;

        // Spring stiffness
        const k = this.m_springMass * omega * omega;

        // magic formulas
        const h = step.dt;
        this.m_gamma = h * (damp + h * k);
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

      const P = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
      const LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
      const LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;

      vA.subMul(this.m_invMassA, P);
      wA -= this.m_invIA * LA;

      vB.addMul(this.m_invMassB, P);
      wB += this.m_invIB * LB;
    } else {
      this.m_impulse = 0.0;
      this.m_springImpulse = 0.0;
      this.m_motorImpulse = 0.0;
    }

    this.m_bodyA.c_velocity.v.setVec2(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.setVec2(vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    // Solve spring constraint
    {
      const Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx * wB - this.m_sAx * wA;
      const impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
      this.m_springImpulse += impulse;

      const P = Vec2.mulNumVec2(impulse, this.m_ax);
      const LA = impulse * this.m_sAx;
      const LB = impulse * this.m_sBx;

      vA.subMul(mA, P);
      wA -= iA * LA;

      vB.addMul(mB, P);
      wB += iB * LB;
    }

    // Solve rotational motor constraint
    {
      const Cdot = wB - wA - this.m_motorSpeed;
      let impulse = -this.m_motorMass * Cdot;

      const oldImpulse = this.m_motorImpulse;
      const maxImpulse = step.dt * this.m_maxMotorTorque;
      this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
      impulse = this.m_motorImpulse - oldImpulse;

      wA -= iA * impulse;
      wB += iB * impulse;
    }

    // Solve point to line constraint
    {
      const Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy * wB - this.m_sAy * wA;
      const impulse = -this.m_mass * Cdot;
      this.m_impulse += impulse;

      const P = Vec2.mulNumVec2(impulse, this.m_ay);
      const LA = impulse * this.m_sAy;
      const LB = impulse * this.m_sBy;

      vA.subMul(mA, P);
      wA -= iA * LA;

      vB.addMul(mB, P);
      wB += iB * LB;
    }

    this.m_bodyA.c_velocity.v.setVec2(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.setVec2(vB);
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

    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    const d = Vec2.zero();
    d.addCombine(1, cB, 1, rB);
    d.subCombine(1, cA, 1, rA);

    const ay = Rot.mulVec2(qA, this.m_localYAxisA);

    const sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), ay);
    const sBy = Vec2.crossVec2Vec2(rB, ay);

    const C = Vec2.dot(d, ay);

    const k =
      this.m_invMassA +
      this.m_invMassB +
      this.m_invIA * this.m_sAy * this.m_sAy +
      this.m_invIB * this.m_sBy * this.m_sBy;

    const impulse = k != 0.0 ? -C / k : 0.0;

    const P = Vec2.mulNumVec2(impulse, ay);
    const LA = impulse * sAy;
    const LB = impulse * sBy;

    cA.subMul(this.m_invMassA, P);
    aA -= this.m_invIA * LA;
    cB.addMul(this.m_invMassB, P);
    aB += this.m_invIB * LB;

    this.m_bodyA.c_position.c.setVec2(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.setVec2(cB);
    this.m_bodyB.c_position.a = aB;

    return math_abs(C) <= Settings.linearSlop;
  }
}
