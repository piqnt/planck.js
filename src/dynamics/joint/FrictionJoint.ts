/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { options } from "../../util/options";
import * as geo from "../../common/Geo";
import { clamp } from "../../common/Math";
import { Vec2Value } from "../../common/Vec2";
import { Mat22Value } from "../../common/Mat22";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

/**
 * Friction joint definition.
 */
export interface FrictionJointOpt extends JointOpt {
  /**
   * The maximum friction force in N.
   */
  maxForce?: number;
  /**
   * The maximum friction torque in N-m.
   */
  maxTorque?: number;
}

/**
 * Friction joint definition.
 */
export interface FrictionJointDef extends JointDef, FrictionJointOpt {
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
  maxForce: 0.0,
  maxTorque: 0.0,
};

/**
 * Friction joint. This is used for top-down friction. It provides 2D
 * translational friction and angular friction.
 */
export class FrictionJoint extends Joint {
  static TYPE = "friction-joint" as const;

  /** @internal */ m_type: "friction-joint";

  /** @internal */ m_localAnchorA: Vec2Value;
  /** @internal */ m_localAnchorB: Vec2Value;

  // Solver shared
  /** @internal */ m_linearImpulse: Vec2Value;
  /** @internal */ m_angularImpulse: number;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_maxTorque: number;

  // Solver temp
  /** @internal */ m_rA: Vec2Value;
  /** @internal */ m_rB: Vec2Value;
  /** @internal */ m_localCenterA: Vec2Value;
  /** @internal */ m_localCenterB: Vec2Value;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_linearMass: Mat22Value;
  /** @internal */ m_angularMass: number;

  constructor(def: FrictionJointDef);
  /**
   * @param anchor Anchor in global coordination.
   */
  constructor(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor?: Vec2Value);
  constructor(def: FrictionJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2Value) {

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = FrictionJoint.TYPE;

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

    // Solver shared
    this.m_linearImpulse = geo.vec2(0, 0);
    this.m_angularImpulse = 0.0;
    this.m_maxForce = def.maxForce;
    this.m_maxTorque = def.maxTorque;

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

  /** @hidden */
  _serialize(): object {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      maxForce: this.m_maxForce,
      maxTorque: this.m_maxTorque,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): FrictionJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new FrictionJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<FrictionJointDef>): void {
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
    if (Number.isFinite(def.maxForce)) {
      this.m_maxForce = def.maxForce;
    }
    if (Number.isFinite(def.maxTorque)) {
      this.m_maxTorque = def.maxTorque;
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
    geo.scaleVec2(result, inv_dt, this.m_linearImpulse);
    return result;
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

    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const qA = geo.rotation(aA);
    const qB = geo.rotation(aB);

    // Compute the effective mass matrix.
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

    const K = geo.mat22();
    K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
    K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;

    this.m_linearMass = geo.mat22();
    geo.inverseMat22(this.m_linearMass, K);

    this.m_angularMass = iA + iB;
    if (this.m_angularMass > 0.0) {
      this.m_angularMass = 1.0 / this.m_angularMass;
    }

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      geo.mulVec2(this.m_linearImpulse, step.dtRatio);
      this.m_angularImpulse *= step.dtRatio;

      const P = geo.vec2(this.m_linearImpulse.x, this.m_linearImpulse.y);

      geo.minusScaleVec2(vA, mA, P);
      wA -= iA * (geo.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);

      geo.plusScaleVec2(vB, mB, P);
      wB += iB * (geo.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
    } else {
      geo.zeroVec2(this.m_linearImpulse);
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

    // Solve angular friction
    {
      const Cdot = wB - wA;
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
      const Cdot = geo.vec2(0, 0);
      geo.dvp(Cdot, vB, wB, this.m_rB, vA, wA, this.m_rA);

      const impulse = geo.vec2(0, 0);
      geo.mulMat22Vec2(impulse, this.m_linearMass, Cdot);
      geo.negVec2(impulse);
      const oldImpulse = geo.vec2(0, 0);
      geo.copyVec2(oldImpulse, this.m_linearImpulse);
      geo.plusVec2(this.m_linearImpulse, impulse);

      const maxImpulse = h * this.m_maxForce;

      if (geo.lengthSqrVec2(this.m_linearImpulse) > maxImpulse * maxImpulse) {
        geo.normalizeVec2(this.m_linearImpulse);
        geo.mulVec2(this.m_linearImpulse, maxImpulse);
      }

      geo.subVec2(impulse, this.m_linearImpulse, oldImpulse);

      geo.minusScaleVec2(vA, mA, impulse);
      wA -= iA * geo.crossVec2Vec2(this.m_rA, impulse);

      geo.plusScaleVec2(vB, mB, impulse);
      wB += iB * geo.crossVec2Vec2(this.m_rB, impulse);
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
