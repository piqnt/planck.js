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
import { Vec3 } from '../../common/Vec3';
import { Mat22 } from '../../common/Mat22';
import { Mat33 } from '../../common/Mat33';
import { Rot } from '../../common/Rot';
import { Joint, JointOpt, JointDef } from '../Joint';
import { Body } from '../Body';
import { TimeStep } from "../Solver";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;
const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === 'undefined' ? false : CONSTRUCTOR_FACTORY;


const inactiveLimit = 0;
const atLowerLimit = 1;
const atUpperLimit = 2;
const equalLimits = 3;

/**
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
export interface PrismaticJointOpt extends JointOpt {
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
  maxMotorForce?: number;
  /**
   * The desired motor speed in radians per second.
   */
  motorSpeed?: number;
}
/**
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
export interface PrismaticJointDef extends JointDef, PrismaticJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2;
  /**
   * The local translation unit axis in bodyA.
   */
  localAxisA: Vec2;
  /**
   * referenceAngle The constrained angle between the bodies:
   * bodyB_angle - bodyA_angle.
   */
  referenceAngle: number;
}

const DEFAULTS = {
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
 */
export class PrismaticJoint extends Joint {
  static TYPE = 'prismatic-joint' as const;

  /** @internal */ m_type: 'prismatic-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_localXAxisA: Vec2;
  /** @internal */ m_localYAxisA: Vec2;
  /** @internal */ m_referenceAngle: number;
  /** @internal */ m_impulse: Vec2;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_lowerImpulse: number;
  /** @internal */ m_upperImpulse: number;
  /** @internal */ m_lowerTranslation: number;
  /** @internal */ m_upperTranslation: number;
  /** @internal */ m_maxMotorForce: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableLimit: boolean;
  /** @internal */ m_enableMotor: boolean;
  /** @internal */ m_axis: Vec2;
  /** @internal */ m_perp: Vec2;
  // Solver temp
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_s1: number;
  /** @internal */ m_s2: number;
  /** @internal */ m_a1: number;
  /** @internal */ m_a2: number;
  /** @internal */ m_K: Mat22;
  /** @internal */ m_translation: number;
  /** @internal */ m_axialMass: number;

  constructor(def: PrismaticJointDef);
  constructor(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);
  constructor(def: PrismaticJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2, axis?: Vec2) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof PrismaticJoint)) {
      return new PrismaticJoint(def, bodyA, bodyB, anchor, axis);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = PrismaticJoint.TYPE;

    this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
    this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
    this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1.0, 0.0));
    this.m_localXAxisA.normalize();
    this.m_localYAxisA = Vec2.crossNumVec2(1.0, this.m_localXAxisA);
    this.m_referenceAngle = Math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();

    this.m_impulse = new Vec2();
    this.m_axialMass = 0.0;
    this.m_motorImpulse = 0.0;
    this.m_lowerImpulse = 0.0;
    this.m_upperImpulse = 0.0;

    this.m_lowerTranslation = def.lowerTranslation;
    this.m_upperTranslation = def.upperTranslation;

    _ASSERT && Math.assert(this.m_lowerTranslation <= this.m_upperTranslation);

    this.m_maxMotorForce = def.maxMotorForce;
    this.m_motorSpeed = def.motorSpeed;
    this.m_enableLimit = def.enableLimit;
    this.m_enableMotor = def.enableMotor;

    this.m_axis = Vec2.zero();
    this.m_perp = Vec2.zero();

    this.m_K = new Mat22();

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
    // Cdot = -dot(ax1, v1) - dot(cross(d + r1, ax1), w1) + dot(ax1, v2) +
    // dot(cross(r2, ax1), v2)
    // J = [-ax1 -cross(d+r1,ax1) ax1 cross(r2,ax1)]

    // Predictive limit is applied even when the limit is not active.
    // Prevents a constraint speed that can lead to a constraint error in one time step.
    // Want C2 = C1 + h * Cdot >= 0
    // Or:
    // Cdot + C1/h >= 0
    // I do not apply a negative constraint error because that is handled in position correction.
    // So:
    // Cdot + max(C1, 0)/h >= 0

    // Block Solver
    // We develop a block solver that includes the angular and linear constraints.
    // This makes the limit stiffer.
    //
    // The Jacobian has 2 rows:
    // J = [-uT -s1 uT s2] // linear
    // [0 -1 0 1] // angular
    //
    // u = perp
    // s1 = cross(d + r1, u), s2 = cross(r2, u)
    // a1 = cross(d + r1, v), a2 = cross(r2, v)
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
      maxMotorForce: this.m_maxMotorForce,
      motorSpeed: this.m_motorSpeed,
      enableLimit: this.m_enableLimit,
      enableMotor: this.m_enableMotor,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      localAxisA: this.m_localXAxisA,
      referenceAngle: this.m_referenceAngle,
    };
  }

  /** @internal */
  static _deserialize(data: any, world: any, restore: any): PrismaticJoint {
    data = {...data};
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    data.localAxisA = Vec2.clone(data.localAxisA);
    const joint = new PrismaticJoint(data);
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
   * Get the reference angle.
   */
  getReferenceAngle(): number {
    return this.m_referenceAngle;
  }

  /**
   * Get the current joint translation, usually in meters.
   */
  getJointTranslation(): number {
    const pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    const pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    const d = Vec2.sub(pB, pA);
    const axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);

    const translation = Vec2.dot(d, axis);
    return translation;
  }

  /**
   * Get the current joint translation speed, usually in meters per second.
   */
  getJointSpeed(): number {
    const bA = this.m_bodyA;
    const bB = this.m_bodyB;

    const rA = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter)); // Vec2
    const rB = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter)); // Vec2
    const p1 = Vec2.add(bA.m_sweep.c, rA); // Vec2
    const p2 = Vec2.add(bB.m_sweep.c, rB); // Vec2
    const d = Vec2.sub(p2, p1); // Vec2
    const axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA); // Vec2

    const vA = bA.m_linearVelocity; // Vec2
    const vB = bB.m_linearVelocity; // Vec2
    const wA = bA.m_angularVelocity; // float
    const wB = bB.m_angularVelocity; // float

    const speed = Vec2.dot(d, Vec2.crossNumVec2(wA, axis))
        + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB, wB, rB), Vec2.addCrossNumVec2(vA, wA, rA))); // float
    return speed;
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
      this.m_lowerImpulse = 0.0;
      this.m_upperImpulse = 0.0;
    }
  }

  /**
   * Get the lower joint limit, usually in meters.
   */
  getLowerLimit(): number {
    return this.m_lowerTranslation;
  }

  /**
   * Get the upper joint limit, usually in meters.
   */
  getUpperLimit(): number {
    return this.m_upperTranslation;
  }

  /**
   * Set the joint limits, usually in meters.
   */
  setLimits(lower: number, upper: number): void {
    _ASSERT && console.assert(lower <= upper);
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
   * Set the motor speed, usually in meters per second.
   */
  setMotorSpeed(speed: number): void {
    if (speed == this.m_motorSpeed) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_motorSpeed = speed;
  }

  /**
   * Set the maximum motor force, usually in N.
   */
  setMaxMotorForce(force: number): void {
    if (force == this.m_maxMotorForce) return;
    this.m_bodyA.setAwake(true);
    this.m_bodyB.setAwake(true);
    this.m_maxMotorForce = force;
  }

  getMaxMotorForce(): number {
    return this.m_maxMotorForce;
  }

  /**
   * Get the motor speed, usually in meters per second.
   */
  getMotorSpeed(): number {
    return this.m_motorSpeed;
  }

  /**
   * Get the current motor force given the inverse time step, usually in N.
   */
  getMotorForce(inv_dt: number): number {
    return inv_dt * this.m_motorImpulse;
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
    return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_lowerImpulse + this.m_upperImpulse, this.m_axis).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return inv_dt * this.m_impulse.y;
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

    // Compute the effective masses.
    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
    const d = Vec2.zero();
    d.addCombine(1, cB, 1, rB);
    d.subCombine(1, cA, 1, rA);

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    // Compute motor Jacobian and effective mass.
    {
      this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
      this.m_a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_axis);
      this.m_a2 = Vec2.crossVec2Vec2(rB, this.m_axis);

      this.m_axialMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2
          * this.m_a2;
      if (this.m_axialMass > 0.0) {
        this.m_axialMass = 1.0 / this.m_axialMass;
      }
    }

    // Prismatic constraint.
    {
      this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);

      this.m_s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_perp);
      this.m_s2 = Vec2.crossVec2Vec2(rB, this.m_perp);

      const s1test = Vec2.crossVec2Vec2(rA, this.m_perp);

      const k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
      const k12 = iA * this.m_s1 + iB * this.m_s2;
      let k22 = iA + iB;
      if (k22 == 0.0) {
        // For bodies with fixed rotation.
        k22 = 1.0;
      }

      this.m_K.ex.set(k11, k12);
      this.m_K.ey.set(k12, k22);
    }

    if (this.m_enableLimit) {
      this.m_translation = Vec2.dot(this.m_axis, d);
    } else {
      this.m_lowerImpulse = 0.0;
      this.m_upperImpulse = 0.0;
    }

    if (this.m_enableMotor == false) {
      this.m_motorImpulse = 0.0;
    }

    if (step.warmStarting) {
      // Account for variable time step.
      this.m_impulse.mul(step.dtRatio);
      this.m_motorImpulse *= step.dtRatio;
      this.m_lowerImpulse *= step.dtRatio;
      this.m_upperImpulse *= step.dtRatio;

      const axialImpulse = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse;
      const P = Vec2.combine(this.m_impulse.x, this.m_perp, axialImpulse, this.m_axis);
      const LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + axialImpulse * this.m_a1;
      const LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + axialImpulse * this.m_a2;

      vA.subMul(mA, P);
      wA -= iA * LA;

      vB.addMul(mB, P);
      wB += iB * LB;
    } else {
      this.m_impulse.setZero();
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
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    // Solve linear motor constraint
    if (this.m_enableMotor) {
      const Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB
          - this.m_a1 * wA;
      let impulse = this.m_axialMass * (this.m_motorSpeed - Cdot);
      const oldImpulse = this.m_motorImpulse;
      const maxImpulse = step.dt * this.m_maxMotorForce;
      this.m_motorImpulse = Math.clamp(this.m_motorImpulse + impulse,
          -maxImpulse, maxImpulse);
      impulse = this.m_motorImpulse - oldImpulse;

      const P = Vec2.mulNumVec2(impulse, this.m_axis);
      const LA = impulse * this.m_a1;
      const LB = impulse * this.m_a2;

      vA.subMul(mA, P);
      wA -= iA * LA;
      vB.addMul(mB, P);
      wB += iB * LB;
    }

    if (this.m_enableLimit) {
      // Lower limit
      {
        const C = this.m_translation - this.m_lowerTranslation;
        const Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB - this.m_a1 * wA;
        let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0.0) * step.inv_dt);
        const oldImpulse = this.m_lowerImpulse;
        this.m_lowerImpulse = Math.max(this.m_lowerImpulse + impulse, 0.0);
        impulse = this.m_lowerImpulse - oldImpulse;

        const P = Vec2.mulNumVec2(impulse, this.m_axis);
        const LA = impulse * this.m_a1;
        const LB = impulse * this.m_a2;

        vA.subMul(mA, P);
        wA -= iA * LA;
        vB.addMul(mB, P);
        wB += iB * LB;
      }
      // Upper limit
      // Note: signs are flipped to keep C positive when the constraint is satisfied.
      // This also keeps the impulse positive when the limit is active.
      {
        const C = this.m_upperTranslation - this.m_translation;
        const Cdot = Vec2.dot(this.m_axis, Vec2.sub(vA, vB)) + this.m_a1 * wA - this.m_a2 * wB;
        let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0.0) * step.inv_dt);
        const oldImpulse = this.m_upperImpulse;
        this.m_upperImpulse = Math.max(this.m_upperImpulse + impulse, 0.0);
        impulse = this.m_upperImpulse - oldImpulse;

        const P = Vec2.mulNumVec2(impulse, this.m_axis);
        const LA = impulse * this.m_a1;
        const LB = impulse * this.m_a2;

        vA.addMul(mA, P);
        wA += iA * LA;
        vB.subMul(mB, P);
        wB -= iB * LB;
      }
    }

    // Solve the prismatic constraint in block form.
    {
      const Cdot = Vec2.zero();
      Cdot.x = Vec2.dot(this.m_perp, Vec2.sub(vB, vA)) + this.m_s2 * wB - this.m_s1 * wA;
      Cdot.y = wB - wA;

      const df = this.m_K.solve(Vec2.neg(Cdot));
      this.m_impulse.add(df);

      const P = Vec2.mulNumVec2(df.x, this.m_perp); // Vec2
      const LA = df.x * this.m_s1 + df.y; // float
      const LB = df.x * this.m_s2 + df.y; // float

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

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    // Compute fresh Jacobians
    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
    const d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA)); // Vec2

    const axis = Rot.mulVec2(qA, this.m_localXAxisA); // Vec2
    const a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), axis); // float
    const a2 = Vec2.crossVec2Vec2(rB, axis); // float
    const perp = Rot.mulVec2(qA, this.m_localYAxisA); // Vec2

    const s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), perp); // float
    const s2 = Vec2.crossVec2Vec2(rB, perp); // float

    let impulse = new Vec3();
    const C1 = Vec2.zero(); // Vec2
    C1.x = Vec2.dot(perp, d);
    C1.y = aB - aA - this.m_referenceAngle;

    let linearError = Math.abs(C1.x); // float
    const angularError = Math.abs(C1.y); // float

    const linearSlop = Settings.linearSlop;
    const maxLinearCorrection = Settings.maxLinearCorrection;

    let active = false; // bool
    let C2 = 0.0; // float
    if (this.m_enableLimit) {

      const translation = Vec2.dot(axis, d); // float
      if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * linearSlop) {
        C2 = translation;
        linearError = Math.max(linearError, Math.abs(translation));
        active = true;

      } else if (translation <= this.m_lowerTranslation) {
        C2 = Math.min(translation - this.m_lowerTranslation, 0.0);
        linearError = Math
            .max(linearError, this.m_lowerTranslation - translation);
        active = true;

      } else if (translation >= this.m_upperTranslation) {
        C2 = Math.max(translation - this.m_upperTranslation, 0.0);
        linearError = Math
            .max(linearError, translation - this.m_upperTranslation);
        active = true;
      }
    }

    if (active) {
      const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
      const k12 = iA * s1 + iB * s2; // float
      const k13 = iA * s1 * a1 + iB * s2 * a2; // float
      let k22 = iA + iB; // float
      if (k22 == 0.0) {
        // For fixed rotation
        k22 = 1.0;
      }
      const k23 = iA * a1 + iB * a2; // float
      const k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2; // float

      const K = new Mat33();
      K.ex.set(k11, k12, k13);
      K.ey.set(k12, k22, k23);
      K.ez.set(k13, k23, k33);

      const C = new Vec3();
      C.x = C1.x;
      C.y = C1.y;
      C.z = C2;

      impulse = K.solve33(Vec3.neg(C));
    } else {
      const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
      const k12 = iA * s1 + iB * s2; // float
      let k22 = iA + iB; // float
      if (k22 == 0.0) {
        k22 = 1.0;
      }

      const K = new Mat22();
      K.ex.setNum(k11, k12);
      K.ey.setNum(k12, k22);

      const impulse1 = K.solve(Vec2.neg(C1)); // Vec2
      impulse.x = impulse1.x;
      impulse.y = impulse1.y;
      impulse.z = 0.0;
    }

    const P = Vec2.combine(impulse.x, perp, impulse.z, axis); // Vec2
    const LA = impulse.x * s1 + impulse.y + impulse.z * a1; // float
    const LB = impulse.x * s2 + impulse.y + impulse.z * a2; // float

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

}
