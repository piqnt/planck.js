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
import { clamp } from "../../common/Math";
import { Vec2Value } from "../../common/Vec2";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_PI = Math.PI;

/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
export interface DistanceJointOpt extends JointOpt {
  /**
   * The mass-spring-damper frequency in Hertz. A value of 0 disables softness.
   */
  frequencyHz?: number;
  /**
   * The damping ratio. 0 = no damping, 1 = critical damping.
   */
  dampingRatio?: number;
  /**
   * Distance length.
   */
  length?: number;
}
/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
export interface DistanceJointDef extends JointDef, DistanceJointOpt {
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

declare module "./DistanceJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function DistanceJoint(def: DistanceJointDef): DistanceJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function DistanceJoint(
    def: DistanceJointOpt,
    bodyA: Body,
    bodyB: Body,
    anchorA: Vec2Value,
    anchorB: Vec2Value,
  ): DistanceJoint;
}

/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 */
// @ts-expect-error
export class DistanceJoint extends Joint {
  static TYPE = "distance-joint" as const;

  // Solver shared
  /** @internal */ m_localAnchorA: Vec2Value;
  /** @internal */ m_localAnchorB: Vec2Value;
  /** @internal */ m_length: number;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_gamma: number;
  /** @internal */ m_bias: number;

  // Solver temp
  /** @internal */ m_u: Vec2Value;
  /** @internal */ m_rA: Vec2Value;
  /** @internal */ m_rB: Vec2Value;
  /** @internal */ m_localCenterA: Vec2Value;
  /** @internal */ m_localCenterB: Vec2Value;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_mass: number;

  /**
   * @param def DistanceJoint definition.
   */
  constructor(def: DistanceJointDef);
  /**
   * @param anchorA Anchor A in global coordination.
   * @param anchorB Anchor B in global coordination.
   */
  constructor(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA?: Vec2Value, anchorB?: Vec2Value);
  constructor(def: DistanceJointDef, bodyA?: Body, bodyB?: Body, anchorA?: Vec2Value, anchorB?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof DistanceJoint)) {
      return new DistanceJoint(def, bodyA, bodyB, anchorA, anchorB);
    }

    // order of constructor arguments is changed in v0.2
    if (bodyB && anchorA && "m_type" in anchorA && "x" in bodyB && "y" in bodyB) {
      const temp = bodyB;
      bodyB = anchorA as any as Body;
      anchorA = temp as any as Vec2Value;
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = DistanceJoint.TYPE;

    // Solver shared
    this.m_localAnchorA = geo.vec2(0, 0);
    if (anchorA) {
      geo.copyVec2(this.m_localAnchorA, bodyA.getLocalPoint(anchorA));
    } else if (geo.isVec2(def.localAnchorA)) {
      geo.copyVec2(this.m_localAnchorA, def.localAnchorA);
    }

    this.m_localAnchorB = geo.vec2(0, 0);
    if (anchorB) {
      geo.copyVec2(this.m_localAnchorB, bodyB.getLocalPoint(anchorB));
    } else if (geo.isVec2(def.localAnchorB)) {
      geo.copyVec2(this.m_localAnchorB, def.localAnchorB);
    }

    if (Number.isFinite(def.length)) {
      this.m_length = def.length;
    } else {
      this.m_length = geo.distVec2(bodyA.getWorldPoint(this.m_localAnchorA), bodyB.getWorldPoint(this.m_localAnchorB));
    }

    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_impulse = 0.0;
    this.m_gamma = 0.0;
    this.m_bias = 0.0;

    // 1-D constrained system
    // m (v2 - v1) = lambda
    // v2 + (beta/h) * x1 + gamma * lambda = 0, gamma has units of inverse mass.
    // x2 = x1 + h * v2

    // 1-D mass-damper-spring system
    // m (v2 - v1) + h * d * v2 + h * k *

    // C = norm(p2 - p1) - L
    // u = (p2 - p1) / norm(p2 - p1)
    // Cdot = dot(u, v2 + cross(w2, r2) - v1 - cross(w1, r1))
    // J = [-u -cross(r1, u) u cross(r2, u)]
    // K = J * invM * JT
    // = invMass1 + invI1 * cross(r1, u)^2 + invMass2 + invI2 * cross(r2, u)^2
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
      length: this.m_length,

      impulse: this.m_impulse,
      gamma: this.m_gamma,
      bias: this.m_bias,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): DistanceJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new DistanceJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<DistanceJointDef>): void {
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

    if (def.length > 0) {
      this.m_length = +def.length;
    } else if (def.length < 0) {
      // don't change length
    } else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
      this.m_length = geo.distVec2(
        this.m_bodyA.getWorldPoint(this.m_localAnchorA),
        this.m_bodyB.getWorldPoint(this.m_localAnchorB),
      );
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
   * Set the natural length. Manipulating the length can lead to non-physical
   * behavior when the frequency is zero.
   */
  setLength(length: number): void {
    this.m_length = length;
  }

  /**
   * Get the natural length.
   */
  getLength(): number {
    return this.m_length;
  }

  setFrequency(hz: number): void {
    this.m_frequencyHz = hz;
  }

  getFrequency(): number {
    return this.m_frequencyHz;
  }

  setDampingRatio(ratio: number): void {
    this.m_dampingRatio = ratio;
  }

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
    const result = geo.vec2(0, 0);
    geo.scaleVec2(result, this.m_impulse, this.m_u);
    geo.mulVec2(result, inv_dt);
    return result;
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return 0.0;
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

    const qA = geo.rotation(aA);
    const qB = geo.rotation(aB);

    this.m_rA = geo.vec2(0, 0);
    geo.rotSubVec2(this.m_rA, qA, this.m_localAnchorA, this.m_localCenterA);
    this.m_rB = geo.vec2(0, 0);
    geo.rotSubVec2(this.m_rB, qB, this.m_localAnchorB, this.m_localCenterB);
    this.m_u = geo.vec2(0, 0);
    geo.combine4Vec2(this.m_u, 1, cB, 1, this.m_rB, -1, cA, -1, this.m_rA);

    // Handle singularity.
    const length = geo.lengthVec2(this.m_u);
    if (length > Settings.linearSlop) {
      geo.mulVec2(this.m_u, 1.0 / length);
    } else {
      geo.zeroVec2(this.m_u);
    }

    const crAu = geo.crossVec2Vec2(this.m_rA, this.m_u);
    const crBu = geo.crossVec2Vec2(this.m_rB, this.m_u);
    let invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;

    // Compute the effective mass matrix.
    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;

    if (this.m_frequencyHz > 0.0) {
      const C = length - this.m_length;

      // Frequency
      const omega = 2.0 * math_PI * this.m_frequencyHz;

      // Damping coefficient
      const d = 2.0 * this.m_mass * this.m_dampingRatio * omega;

      // Spring stiffness
      const k = this.m_mass * omega * omega;

      // magic formulas
      const h = step.dt;
      this.m_gamma = h * (d + h * k);
      this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
      this.m_bias = C * h * k * this.m_gamma;

      invMass += this.m_gamma;
      this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
    } else {
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    }

    if (step.warmStarting) {
      // Scale the impulse to support a variable time step.
      this.m_impulse *= step.dtRatio;

      const P = geo.vec2(0, 0);
      geo.plusScaleVec2(P, this.m_impulse, this.m_u);

      geo.minusScaleVec2(vA, this.m_invMassA, P);
      wA -= this.m_invIA * geo.crossVec2Vec2(this.m_rA, P);

      geo.plusScaleVec2(vB, this.m_invMassB, P);
      wB += this.m_invIB * geo.crossVec2Vec2(this.m_rB, P);
    } else {
      this.m_impulse = 0.0;
    }

    geo.copyVec2(this.m_bodyA.c_velocity.v, vA);
    this.m_bodyA.c_velocity.w = wA;
    geo.copyVec2(this.m_bodyB.c_velocity.v, vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    // Cdot = dot(u, v + cross(w, r))
    const vp = geo.vec2(0, 0);
    geo.dvp(vp, vB, wB, this.m_rB, vA, wA, this.m_rA);
    const Cdot = geo.dotVec2(this.m_u, vp);

    const impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
    this.m_impulse += impulse;

    const P = geo.vec2(0, 0);
    geo.scaleVec2(P, impulse, this.m_u);
    geo.minusScaleVec2(vA, this.m_invMassA, P);
    wA -= this.m_invIA * geo.crossVec2Vec2(this.m_rA, P);
    geo.plusScaleVec2(vB, this.m_invMassB, P);
    wB += this.m_invIB * geo.crossVec2Vec2(this.m_rB, P);

    geo.copyVec2(this.m_bodyA.c_velocity.v, vA);
    this.m_bodyA.c_velocity.w = wA;
    geo.copyVec2(this.m_bodyB.c_velocity.v, vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step: TimeStep): boolean {
    if (this.m_frequencyHz > 0.0) {
      // There is no position correction for soft distance constraints.
      return true;
    }

    const cA = this.m_bodyA.c_position.c;
    let aA = this.m_bodyA.c_position.a;
    const cB = this.m_bodyB.c_position.c;
    let aB = this.m_bodyB.c_position.a;

    const qA = geo.rotation(aA);
    const qB = geo.rotation(aB);

    const rA = geo.vec2(0, 0);
    geo.rotSubVec2(rA, qA, this.m_localAnchorA, this.m_localCenterA);
    const rB = geo.vec2(0, 0);
    geo.rotSubVec2(rB, qB, this.m_localAnchorB, this.m_localCenterB);
    const u = geo.vec2(0, 0);
    geo.combine4Vec2(u, 1, cB, 1, rB, -1, cA, -1, rA);

    const length = geo.normalizeVec2Length(u);
    const C = clamp(length - this.m_length, -Settings.maxLinearCorrection, Settings.maxLinearCorrection);

    const impulse = -this.m_mass * C;
    const P = geo.vec2(0, 0);
    geo.plusScaleVec2(P, impulse, u);

    geo.minusScaleVec2(cA, this.m_invMassA, P);
    aA -= this.m_invIA * geo.crossVec2Vec2(rA, P);
    geo.plusScaleVec2(cB, this.m_invMassB, P);
    aB += this.m_invIB * geo.crossVec2Vec2(rB, P);

    geo.copyVec2(this.m_bodyA.c_position.c, cA);
    this.m_bodyA.c_position.a = aA;
    geo.copyVec2(this.m_bodyB.c_position.c, cB);
    this.m_bodyB.c_position.a = aB;

    return math_abs(C) < Settings.linearSlop;
  }
}
