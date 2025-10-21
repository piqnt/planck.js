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
import * as geo from "../../common/Geo";
import { Vec2Value } from "../../common/Vec2";
import { Vec3Value } from "../../common/Vec3";
import { Mat33Value } from "../../common/Mat33";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_PI = Math.PI;

/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 */
export interface WeldJointOpt extends JointOpt {
  /**
   * The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
   * with a value of 0.
   */
  frequencyHz?: number;
  /**
   * The damping ratio. 0 = no damping, 1 = critical damping.
   */
  dampingRatio?: number;
  /**
   * The bodyB angle minus bodyA angle in the reference state (radians).
   */
  referenceAngle?: number;
}

/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 */
export interface WeldJointDef extends JointDef, WeldJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2Value;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2Value;

  /** @internal */ anchorA?: Vec2Value;
  /** @internal */ anchorB?: Vec2Value;
}

/** @internal */ const DEFAULTS = {
  frequencyHz: 0.0,
  dampingRatio: 0.0,
};

declare module "./WeldJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function WeldJoint(def: WeldJointDef): WeldJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function WeldJoint(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2Value): WeldJoint;
}

/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 */
// @ts-expect-error
export class WeldJoint extends Joint {
  static TYPE = "weld-joint" as const;

  /** @internal */ m_type: "weld-joint";
  /** @internal */ m_localAnchorA: Vec2Value;
  /** @internal */ m_localAnchorB: Vec2Value;
  /** @internal */ m_referenceAngle: number;

  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;

  /** @internal */ m_impulse: Vec3Value;

  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;

  // Solver temp
  /** @internal */ m_rA: Vec2Value;
  /** @internal */ m_rB: Vec2Value;
  /** @internal */ m_localCenterA: Vec2Value;
  /** @internal */ m_localCenterB: Vec2Value;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_mass: Mat33Value;

  constructor(def: WeldJointDef);
  constructor(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor?: Vec2Value);
  constructor(def: WeldJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof WeldJoint)) {
      return new WeldJoint(def, bodyA, bodyB, anchor);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = WeldJoint.TYPE;

    this.m_localAnchorA = geo.vec2(0, 0);
    if (anchor) {
      geo.copyVec2(this.m_localAnchorA, bodyA.getLocalPoint(anchor));
    } else if (geo.isVec2(def.localAnchorA)) {
      geo.copyVec2(this.m_localAnchorA, def.localAnchorA);
    }

    this.m_localAnchorB = geo.vec2(0, 0);
    if (anchor) {
      geo.copyVec2(this.m_localAnchorB, bodyB.getLocalPoint(anchor));
    } else if (geo.isVec2(def.localAnchorB)) {
      geo.copyVec2(this.m_localAnchorB, def.localAnchorB);
    }

    this.m_referenceAngle = Number.isFinite(def.referenceAngle)
      ? def.referenceAngle
      : bodyB.getAngle() - bodyA.getAngle();

    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;

    this.m_impulse = geo.vec3(0, 0, 0);

    this.m_bias = 0.0;
    this.m_gamma = 0.0;

    // Solver temp
    // todo: do we need to initialize?
    // this.m_rA;
    // this.m_rB;
    // this.m_localCenterA;
    // this.m_localCenterB;
    // this.m_invMassA;
    // this.m_invMassB;
    // this.m_invIA;
    // this.m_invIB;
    this.m_mass = geo.mat33();

    // Point-to-point constraint
    // C = p2 - p1
    // Cdot = v2 - v1
    // / = v2 + cross(w2, r2) - v1 - cross(w1, r1)
    // J = [-I -r1_skew I r2_skew ]
    // Identity used:
    // w k % (rx i + ry j) = w * (-ry i + rx j)

    // Angle constraint
    // C = angle2 - angle1 - referenceAngle
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

      frequencyHz: this.m_frequencyHz,
      dampingRatio: this.m_dampingRatio,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      referenceAngle: this.m_referenceAngle,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): WeldJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new WeldJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<WeldJointDef>): void {
    if (def.anchorA) {
      geo.copyVec2(this.m_localAnchorA, this.m_bodyA.getLocalPoint(def.anchorA));
    } else if (geo.isVec2(def.localAnchorA)) {
      geo.copyVec2(this.m_localAnchorA, def.localAnchorA);
    }
    if (def.anchorB) {
      geo.copyVec2(this.m_localAnchorB, this.m_bodyB.getLocalPoint(def.anchorB));
    } else if (geo.isVec2(def.localAnchorB)) {
      geo.copyVec2(this.m_localAnchorB, def.localAnchorB);
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
  getLocalAnchorA(): Vec2Value {
    return this.m_localAnchorA;
  }

  /**
   * The local anchor point relative to bodyB's origin.
   */
  getLocalAnchorB(): Vec2Value {
    return this.m_localAnchorB;
  }

  /**
   * Get the reference angle.
   */
  getReferenceAngle(): number {
    return this.m_referenceAngle;
  }

  /**
   * Set frequency in Hz.
   */
  setFrequency(hz: number): void {
    this.m_frequencyHz = hz;
  }

  /**
   * Get frequency in Hz.
   */
  getFrequency(): number {
    return this.m_frequencyHz;
  }

  /**
   * Set damping ratio.
   */
  setDampingRatio(ratio: number): void {
    this.m_dampingRatio = ratio;
  }

  /**
   * Get damping ratio.
   */
  getDampingRatio(): number {
    return this.m_dampingRatio;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   */
  getAnchorA(): Vec2Value {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
   */
  getAnchorB(): Vec2Value {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  }

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   */
  getReactionForce(inv_dt: number): Vec2Value {
    const result = geo.vec2(this.m_impulse.x, this.m_impulse.y);
    geo.mulVec2(result, inv_dt);
    return result;
  }

  /**
   * Get the reaction torque on bodyB in N*m.
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

    const qA = geo.rotation(aA);
    const qB = geo.rotation(aB);

    this.m_rA = geo.vec2(0, 0);
    geo.rotSubVec2(this.m_rA, qA, this.m_localAnchorA, this.m_localCenterA);
    this.m_rB = geo.vec2(0, 0);
    geo.rotSubVec2(this.m_rB, qB, this.m_localAnchorB, this.m_localCenterB);

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

    const K = geo.mat33();
    K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
    K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
    K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
    K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;

    if (this.m_frequencyHz > 0.0) {
      geo.inverseMat22(this.m_mass, K);

      let invM = iA + iB;
      const m = invM > 0.0 ? 1.0 / invM : 0.0;

      const C = aB - aA - this.m_referenceAngle;

      // Frequency
      const omega = 2.0 * math_PI * this.m_frequencyHz;

      // Damping coefficient
      const d = 2.0 * m * this.m_dampingRatio * omega;

      // Spring stiffness
      const k = m * omega * omega;

      // magic formulas
      const h = step.dt;
      this.m_gamma = h * (d + h * k);
      this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
      this.m_bias = C * h * k * this.m_gamma;

      invM += this.m_gamma;
      this.m_mass.ez.z = invM != 0.0 ? 1.0 / invM : 0.0;
    } else if (K.ez.z == 0.0) {
      geo.inverseMat22(this.m_mass, K);
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    } else {
      geo.symInverseMat33(this.m_mass, K);
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    }

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      geo.mulVec3(this.m_impulse, step.dtRatio);

      const P = geo.vec2(this.m_impulse.x, this.m_impulse.y);

      geo.minusScaleVec2(vA, mA, P);
      wA -= iA * (geo.crossVec2Vec2(this.m_rA, P) + this.m_impulse.z);

      geo.plusScaleVec2(vB, mB, P);
      wB += iB * (geo.crossVec2Vec2(this.m_rB, P) + this.m_impulse.z);
    } else {
      geo.zeroVec3(this.m_impulse);
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

    if (this.m_frequencyHz > 0.0) {
      const Cdot2 = wB - wA;

      const impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
      this.m_impulse.z += impulse2;

      wA -= iA * impulse2;
      wB += iB * impulse2;

      const Cdot1 = geo.vec2(0, 0);
      geo.dvp(Cdot1, vB, wB, this.m_rB, vA, wA, this.m_rA);

      const impulse1 = geo.vec2(0, 0);
      geo.mulMat33Vec2(impulse1, this.m_mass, Cdot1);
      geo.negVec2(impulse1);
      this.m_impulse.x += impulse1.x;
      this.m_impulse.y += impulse1.y;

      const P = geo.vec2(impulse1.x, impulse1.y);

      geo.minusScaleVec2(vA, mA, P);
      wA -= iA * geo.crossVec2Vec2(this.m_rA, P);

      geo.plusScaleVec2(vB, mB, P);
      wB += iB * geo.crossVec2Vec2(this.m_rB, P);
    } else {
      const Cdot1 = geo.vec2(0, 0);
      geo.dvp(Cdot1, vB, wB, this.m_rB, vA, wA, this.m_rA);

      const Cdot2 = wB - wA;
      const Cdot = geo.vec3(Cdot1.x, Cdot1.y, Cdot2);

      const impulse = geo.vec3(0, 0, 0);
      geo.mulMat33Vec3(impulse, this.m_mass, Cdot);
      geo.negVec3(impulse);
      geo.plusVec3(this.m_impulse, impulse);

      const P = geo.vec2(impulse.x, impulse.y);

      geo.minusScaleVec2(vA, mA, P);
      wA -= iA * (geo.crossVec2Vec2(this.m_rA, P) + impulse.z);

      geo.plusScaleVec2(vB, mB, P);
      wB += iB * (geo.crossVec2Vec2(this.m_rB, P) + impulse.z);
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

    const qA = geo.rotation(aA);
    const qB = geo.rotation(aB);

    const mA = this.m_invMassA;
    const mB = this.m_invMassB;
    const iA = this.m_invIA;
    const iB = this.m_invIB;

    const rA = geo.vec2(0, 0);
    geo.rotSubVec2(rA, qA, this.m_localAnchorA, this.m_localCenterA);
    const rB = geo.vec2(0, 0);
    geo.rotSubVec2(rB, qB, this.m_localAnchorB, this.m_localCenterB);

    let positionError: number;
    let angularError: number;

    const K = geo.mat33();
    K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
    K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
    K.ez.x = -rA.y * iA - rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
    K.ez.y = rA.x * iA + rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;

    if (this.m_frequencyHz > 0.0) {
      const C1 = geo.vec2(0, 0);
      geo.combine4Vec2(C1, 1, cB, 1, rB, -1, cA, -1, rA);

      positionError = geo.lengthVec2(C1);
      angularError = 0.0;

      const P = geo.vec2(0, 0);
      geo.solveMat22Num(P, K, -C1.x, -C1.y);

      geo.minusScaleVec2(cA, mA, P);
      aA -= iA * geo.crossVec2Vec2(rA, P);

      geo.plusScaleVec2(cB, mB, P);
      aB += iB * geo.crossVec2Vec2(rB, P);
    } else {
      const C1 = geo.vec2(0, 0);
      geo.combine4Vec2(C1, 1, cB, 1, rB, -1, cA, -1, rA);

      const C2 = aB - aA - this.m_referenceAngle;

      positionError = geo.lengthVec2(C1);
      angularError = math_abs(C2);

      const impulse = geo.vec3(0, 0, 0);
      if (K.ez.z > 0.0) {
        geo.solveMat33Num(impulse, K, C1.x, C1.y, C2);
        geo.negVec3(impulse);
      } else {
        const impulse2 = geo.vec2(0, 0);
        geo.solveMat22Num(impulse2, K, -C1.x, -C1.y);

        impulse.x = impulse2.x;
        impulse.y = impulse2.y;
        impulse.z = 0.0;
      }

      const P = geo.vec2(impulse.x, impulse.y);

      geo.minusScaleVec2(cA, mA, P);
      aA -= iA * (geo.crossVec2Vec2(rA, P) + impulse.z);

      geo.plusScaleVec2(cB, mB, P);
      aB += iB * (geo.crossVec2Vec2(rB, P) + impulse.z);
    }

    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;

    return positionError <= Settings.linearSlop && angularError <= Settings.angularSlop;
  }
}
