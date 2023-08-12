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

import { options } from '../../util/options';
import { SettingsInternal as Settings } from '../../Settings';
import { math as Math } from '../../common/Math';
import { Vec2 } from '../../common/Vec2';
import { Rot } from '../../common/Rot';
import { Joint, JointOpt, JointDef } from '../Joint';
import { Body } from '../Body';
import { TimeStep } from "../Solver";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;
const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === 'undefined' ? false : CONSTRUCTOR_FACTORY;


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
   * Enable/disable the joint limit.
   */
  enableLimit?: boolean;
  /**
   * The lower translation limit, usually in meters.
   */
  lowerTranslation?: number;
  /**
   * The upper translation limit, usually in meters.
   */
  upperTranslation?: number;
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
   * Suspension stiffness. Typically in units N/m.
   */
  stiffness?: number;
  /**
   * Suspension damping. Typically in units of N*s/m.
   */
  damping?: number;
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
  localAnchorA: Vec2;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2;
  /**
   * The local translation axis in bodyA.
   */
  localAxisA: Vec2;
}

const DEFAULTS = {
  enableLimit : false,
  lowerTranslation : 0.0,
  upperTranslation : 0.0,
  enableMotor : false,
  maxMotorTorque : 0.0,
  motorSpeed : 0.0,
  stiffness : 0.0,
  damping : 0.0,
};

/**
 * A wheel joint. This joint provides two degrees of freedom: translation along
 * an axis fixed in bodyA and rotation in the plane. In other words, it is a
 * point to line constraint with a rotational motor and a linear spring/damper.
 * The spring/damper is initialized upon creation. This joint is designed for
 * vehicle suspensions.
 */
export class WheelJoint extends Joint {
  static TYPE = 'wheel-joint' as const;

  /** @internal */ m_type: 'wheel-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_localXAxisA: Vec2;
  /** @internal */ m_localYAxisA: Vec2;

  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_motorMass: number;
  /** @internal */ m_axialMass: number;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_springMass: number;
  /** @internal */ m_springImpulse: number;

  /** @internal */ m_lowerImpulse: number;
  /** @internal */ m_upperImpulse: number;
  /** @internal */ m_translation: number;
  /** @internal */ m_lowerTranslation: number;
  /** @internal */ m_upperTranslation: number;

  /** @internal */ m_maxMotorTorque: number;
  /** @internal */ m_motorSpeed: number;

  /** @internal */ m_enableLimit: boolean;
  /** @internal */ m_enableMotor: boolean;

  /** @internal */ m_stiffness: number;
  /** @internal */ m_damping: number;

  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;

  // Solver temp
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;

  /** @internal */ m_ax: Vec2 = Vec2.zero();
  /** @internal */ m_ay: Vec2 = Vec2.zero();
  /** @internal */ m_sAx: number;
  /** @internal */ m_sBx: number;
  /** @internal */ m_sAy: number;
  /** @internal */ m_sBy: number;

  constructor(def: WheelJointDef);
  constructor(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);
  // @ts-ignore
  constructor(def: WheelJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2, axis?: Vec2) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof WheelJoint)) {
      return new WheelJoint(def, bodyA, bodyB, anchor, axis);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = WheelJoint.TYPE;

    this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
    this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
    // @ts-ignore localAxis
    this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || def.localAxis || Vec2.neo(1.0, 0.0));
    this.m_localYAxisA = Vec2.crossNumVec2(1.0, this.m_localXAxisA);

    this.m_axialMass = 0.0;
    this.m_lowerImpulse = 0.0;
    this.m_upperImpulse = 0.0;
    this.m_lowerTranslation = def.lowerTranslation;
    this.m_upperTranslation = def.upperTranslation;
    this.m_enableLimit = def.enableLimit;

    this.m_mass = 0.0;
    this.m_impulse = 0.0;
    this.m_motorMass = 0.0;
    this.m_motorImpulse = 0.0;
    this.m_springMass = 0.0;
    this.m_springImpulse = 0.0;

    this.m_maxMotorTorque = def.maxMotorTorque;
    this.m_motorSpeed = def.motorSpeed;
    this.m_enableMotor = def.enableMotor;

    this.m_bias = 0.0;
    this.m_gamma = 0.0;

    this.m_stiffness = def.stiffness;
    this.m_damping = def.damping;

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

  /** @internal */
  _serialize(): object {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      lowerTranslation: this.m_lowerTranslation,
      upperTranslation: this.m_upperTranslation,
      enableLimit: this.m_enableLimit,

      enableMotor: this.m_enableMotor,
      maxMotorTorque: this.m_maxMotorTorque,
      motorSpeed: this.m_motorSpeed,

      stiffness: this.m_stiffness,
      damping: this.m_damping,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      localAxisA: this.m_localXAxisA,
    };
  }

  /** @internal */
  static _deserialize(data: any, world: any, restore: any): WheelJoint {
    data = {...data};
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new WheelJoint(data);
    return joint;
  }

  /** @internal */
  _setAnchors(def: {
    anchorA?: Vec2,
    localAnchorA?: Vec2,
    anchorB?: Vec2,
    localAnchorB?: Vec2,
    localAxisA?: Vec2,
  }): void {
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

    const pA = bA.getWorldPoint(this.m_localAnchorA); // Vec2
    const pB = bB.getWorldPoint(this.m_localAnchorB); // Vec2
    const d = Vec2.sub(pB, pA); // Vec2
    const axis = bA.getWorldVector(this.m_localXAxisA); // Vec2

    const translation = Vec2.dot(d, axis); // float
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
   * Is the joint limit enabled?
   */
  isLimitEnabled(): boolean {
    return this.m_enableLimit;
  }

  /**
   * Enable/disable the joint translation limit.
   */
  enableLimit(flag: boolean): void {
    if (flag == this.m_enableLimit) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_enableLimit = flag;
    this.m_lowerImpulse = 0.0;
    this.m_upperImpulse = 0.0;
  }

  /**
   * Get the lower joint translation limit, usually in meters.
   */
  getLowerLimit(): number {
    return this.m_lowerTranslation;
  }

  /**
   * Get the upper joint translation limit, usually in meters.
   */
  getUpperLimit(): number {
    return this.m_upperTranslation;
  }

  /**
   * Set the joint translation limits, usually in meters.
   */
  setLimits(lower: number, upper: number) {
    _ASSERT && Math.assert(lower <= upper);
    if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
      this.m_bodyA.setAwake(true);
      this.m_bodyB.setAwake(true);
      this.m_lowerTranslation = lower;
      this.m_upperTranslation = upper;
      this.m_lowerImpulse = 0.0;
      this.m_upperImpulse = 0.0;
    }
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
   * Access spring stiffness
   */
  setStiffness(stiffness: number): void {
    this.m_stiffness = stiffness;
  }

  getStiffness(): number {
    return this.m_stiffness;
  }

  /**
   * Access damping
   */
  setDamping(damping: number): void {
    this.m_damping = damping;
  }

  getDamping(): number {
    return this.m_damping;
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
    const mB = this.m_invMassB; // float
    const iA = this.m_invIA;
    const iB = this.m_invIB; // float

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
    d.subCombine(1, cA, 1, rA); // Vec2

    // Point to line constraint
    {
      this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
      this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ay);
      this.m_sBy = Vec2.crossVec2Vec2(rB, this.m_ay);

      this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy
          * this.m_sBy;

      if (this.m_mass > 0.0) {
        this.m_mass = 1.0 / this.m_mass;
      }
    }

    // Spring constraint
    this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
    this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ax);
    this.m_sBx = Vec2.crossVec2Vec2(rB, this.m_ax);

    const invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
    if (invMass > 0.0) {
      this.m_axialMass = 1.0 / invMass;
    } else {
      this.m_axialMass = 0.0;
    }

    this.m_springMass = 0.0;
    this.m_bias = 0.0;
    this.m_gamma = 0.0;
    if (this.m_stiffness > 0.0 && invMass > 0.0) {
      this.m_springMass = 1.0 / invMass;

      const C = Vec2.dot(d, this.m_ax);

      // magic formulas
      const h = step.dt;
      this.m_gamma = h * (this.m_damping + h * this.m_stiffness);
      if (this.m_gamma > 0.0) {
        this.m_gamma = 1.0 / this.m_gamma;
      }

      this.m_bias = C * h * this.m_stiffness * this.m_gamma;

      this.m_springMass = invMass + this.m_gamma;
      if (this.m_springMass > 0.0) {
        this.m_springMass = 1.0 / this.m_springMass;
      }
    } else {
      this.m_springImpulse = 0.0;
    }

    if (this.m_enableLimit) {
      this.m_translation = Vec2.dot(this.m_ax, d);
    } else {
      this.m_lowerImpulse = 0.0;
      this.m_upperImpulse = 0.0;
    }  

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

      const axialImpulse = this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse;
      const P = Vec2.combine(this.m_impulse, this.m_ay, axialImpulse, this.m_ax);
      const LA = this.m_impulse * this.m_sAy + axialImpulse * this.m_sAx + this.m_motorImpulse;
      const LB = this.m_impulse * this.m_sBy + axialImpulse * this.m_sBx + this.m_motorImpulse;

      vA.subMul(this.m_invMassA, P);
      wA -= this.m_invIA * LA;

      vB.addMul(this.m_invMassB, P);
      wB += this.m_invIB * LB;

    } else {
      this.m_impulse = 0.0;
      this.m_springImpulse = 0.0;
      this.m_motorImpulse = 0.0;
      this.m_lowerImpulse = 0.0;
      this.m_upperImpulse = 0.0;
    }

    this.m_bodyA.c_velocity.v.setVec2(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.setVec2(vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const mA = this.m_invMassA;
    const mB = this.m_invMassB; // float
    const iA = this.m_invIA;
    const iB = this.m_invIB; // float

    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    // Solve spring constraint
    {
      const Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx
          * wB - this.m_sAx * wA; // float
      const impulse = -this.m_springMass
          * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse); // float
      this.m_springImpulse += impulse;

      const P = Vec2.mulNumVec2(impulse, this.m_ax); // Vec2
      const LA = impulse * this.m_sAx; // float
      const LB = impulse * this.m_sBx; // float

      vA.subMul(mA, P);
      wA -= iA * LA;

      vB.addMul(mB, P);
      wB += iB * LB;
    }

    // Solve rotational motor constraint
    {
      const Cdot = wB - wA - this.m_motorSpeed; // float
      let impulse = -this.m_motorMass * Cdot; // float

      const oldImpulse = this.m_motorImpulse; // float
      const maxImpulse = step.dt * this.m_maxMotorTorque; // float
      this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse,
          -maxImpulse, maxImpulse);
      impulse = this.m_motorImpulse - oldImpulse;

      wA -= iA * impulse;
      wB += iB * impulse;
    }

    if (this.m_enableLimit) {
      // Lower limit
      {
        const C = this.m_translation - this.m_lowerTranslation;
        const Cdot = Vec2.dot(this.m_ax, Vec2.sub(vB, vA)) + this.m_sBx * wB - this.m_sAx * wA;
        let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0.0) * step.inv_dt);
        const oldImpulse = this.m_lowerImpulse;
        this.m_lowerImpulse = Math.max(this.m_lowerImpulse + impulse, 0.0);
        impulse = this.m_lowerImpulse - oldImpulse;

        const P = Vec2.mulNumVec2(impulse, this.m_ax);
        const LA = impulse * this.m_sAx;
        const LB = impulse * this.m_sBx;

        vA.subMul(mA, P);
        wA -= iA * LA;
        vA.addMul(mB, P);
        wB += iB * LB;
      }

      // Upper limit
      // Note: signs are flipped to keep C positive when the constraint is satisfied.
      // This also keeps the impulse positive when the limit is active.
      {
        const C = this.m_upperTranslation - this.m_translation;
        const Cdot = Vec2.dot(this.m_ax, Vec2.sub(vA, vB)) + this.m_sAx * wA - this.m_sBx * wB;
        let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0.0) * step.inv_dt);
        const oldImpulse = this.m_upperImpulse;
        this.m_upperImpulse = Math.max(this.m_upperImpulse + impulse, 0.0);
        impulse = this.m_upperImpulse - oldImpulse;

        const P = Vec2.mulNumVec2(impulse, this.m_ax);
        const LA = impulse * this.m_sAx;
        const LB = impulse * this.m_sBx;

        vA.addMul(mA, P);
        wA += iA * LA;
        vA.subMul(mB, P);
        wB -= iB * LB;
      }
    }

    // Solve point to line constraint
    {
      const Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy
          * wB - this.m_sAy * wA; // float
      const impulse = -this.m_mass * Cdot; // float
      this.m_impulse += impulse;

      const P = Vec2.mulNumVec2(impulse, this.m_ay); // Vec2
      const LA = impulse * this.m_sAy; // float
      const LB = impulse * this.m_sBy; // float

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

    let linearError = 0.0;

    if (this.m_enableLimit) {
      const qA = Rot.neo(aA);
      const qB = Rot.neo(aB);

      const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      const d = Vec2.zero();
      d.addCombine(1, cB, 1, rB);
      d.subCombine(1, cA, 1, rA);

      const ax = Rot.mulVec2(qA, this.m_localXAxisA);
      const sAx = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ax);
      const sBx = Vec2.crossVec2Vec2(rB, this.m_ax);

      let C = 0.0;
      const translation = Vec2.dot(ax, d);
      if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * Settings.linearSlop) {
        C = translation;
      } else if (translation <= this.m_lowerTranslation) {
        C = Math.min(translation - this.m_lowerTranslation, 0.0);
      } else if (translation >= this.m_upperTranslation) {
        C = Math.max(translation - this.m_upperTranslation, 0.0);
      }

      if (C != 0.0) {
        const invMass = this.m_invMassA + this.m_invMassB + this.m_invIA * sAx * sAx + this.m_invIB * sBx * sBx;
        let impulse = 0.0;
        if (invMass != 0.0) {
          impulse = -C / invMass;
        }

        const P = Vec2.mulNumVec2(impulse, ax);
        const LA = impulse * sAx;
        const LB = impulse * sBx;

        cA.subMul(this.m_invMassA, P);
        aA -= this.m_invIA * LA;
        cB.addMul(this.m_invMassB, P);
        aB += this.m_invIB * LB;

        linearError = Math.abs(C);
      }
    }

    // Solve perpendicular constraint
    {
      const qA = Rot.neo(aA);
      const qB = Rot.neo(aB);

      const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
      const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
      const d = Vec2.zero();
      d.addCombine(1, cB, 1, rB);
      d.subCombine(1, cA, 1, rA);

      const ay = Rot.mulVec2(qA, this.m_localYAxisA);

      const sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), ay); // float
      const sBy = Vec2.crossVec2Vec2(rB, ay); // float

      const C = Vec2.dot(d, ay); // float

      const k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy
          * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy; // float

      let impulse; // float
      if (k != 0.0) {
        impulse = -C / k;
      } else {
        impulse = 0.0;
      }

      const P = Vec2.mulNumVec2(impulse, ay); // Vec2
      const LA = impulse * sAy; // float
      const LB = impulse * sBy; // float

      cA.subMul(this.m_invMassA, P);
      aA -= this.m_invIA * LA;
      cB.addMul(this.m_invMassB, P);
      aB += this.m_invIB * LB;

      linearError = Math.max(linearError, Math.abs(C));
    }

    this.m_bodyA.c_position.c.setVec2(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.setVec2(cB);
    this.m_bodyB.c_position.a = aB;

    return linearError <= Settings.linearSlop;
  }

}
