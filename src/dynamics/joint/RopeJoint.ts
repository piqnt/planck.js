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
/** @internal */ const math_min = Math.min;

/** @internal */ enum LimitState {
  inactiveLimit = 0,
  atLowerLimit = 1,
  atUpperLimit = 2,
  equalLimits = 3,
}

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
  localAnchorA: Vec2Value;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2Value;
}

/** @internal */ const DEFAULTS = {
  maxLength: 0.0,
};

declare module "./RopeJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function RopeJoint(def: RopeJointDef): RopeJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function RopeJoint(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2Value): RopeJoint;
}

/**
 * A rope joint enforces a maximum distance between two points on two bodies. It
 * has no other effect.
 *
 * Warning: if you attempt to change the maximum length during the simulation
 * you will get some non-physical behavior.
 *
 * A model that would allow you to dynamically modify the length would have some
 * sponginess, so I chose not to implement it that way. See {@link DistanceJoint} if you
 * want to dynamically control length.
 */
// @ts-expect-error
export class RopeJoint extends Joint {
  static TYPE = "rope-joint" as const;

  /** @internal */ m_type: "rope-joint";
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;

  /** @internal */ m_maxLength: number;

  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_length: number;
  /** @internal */ m_state: number; // TODO enum

  // Solver temp
  /** @internal */ m_u: Vec2;
  /** @internal */ m_rA: Vec2;
  /** @internal */ m_rB: Vec2;
  /** @internal */ m_localCenterA: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassA: number;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIA: number;
  /** @internal */ m_invIB: number;

  constructor(def: RopeJointDef);
  constructor(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor?: Vec2Value);
  constructor(def: RopeJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof RopeJoint)) {
      return new RopeJoint(def, bodyA, bodyB, anchor);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = RopeJoint.TYPE;
    this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1.0, 0.0));
    this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1.0, 0.0));

    this.m_maxLength = def.maxLength;

    this.m_mass = 0.0;
    this.m_impulse = 0.0;
    this.m_length = 0.0;
    this.m_state = LimitState.inactiveLimit;

    // Limit:
    // C = norm(pB - pA) - L
    // u = (pB - pA) / norm(pB - pA)
    // Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
    // J = [-u -cross(rA, u) u cross(rB, u)]
    // K = J * invM * JT
    // = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2
  }

  /** @hidden */
  _serialize(): object {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      maxLength: this.m_maxLength,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): RopeJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new RopeJoint(data);
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<RopeJointDef>): void {
    if (Number.isFinite(def.maxLength)) {
      this.m_maxLength = def.maxLength;
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
   * Set the maximum length of the rope.
   */
  setMaxLength(length: number): void {
    this.m_maxLength = length;
  }

  /**
   * Get the maximum length of the rope.
   */
  getMaxLength(): number {
    return this.m_maxLength;
  }

  getLimitState(): number {
    // TODO LimitState
    return this.m_state;
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
    return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
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

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    this.m_u = Vec2.zero();
    this.m_u.addCombine(1, cB, 1, this.m_rB);
    this.m_u.subCombine(1, cA, 1, this.m_rA);

    this.m_length = this.m_u.length();

    const C = this.m_length - this.m_maxLength;
    if (C > 0.0) {
      this.m_state = LimitState.atUpperLimit;
    } else {
      this.m_state = LimitState.inactiveLimit;
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
    const crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
    const crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
    const invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;

    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;

    if (step.warmStarting) {
      // Scale the impulse to support a variable time step.
      this.m_impulse *= step.dtRatio;

      const P = Vec2.mulNumVec2(this.m_impulse, this.m_u);

      vA.subMul(this.m_invMassA, P);
      wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);

      vB.addMul(this.m_invMassB, P);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
    } else {
      this.m_impulse = 0.0;
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

    // Cdot = dot(u, v + cross(w, r))
    const vpA = Vec2.addCrossNumVec2(vA, wA, this.m_rA);
    const vpB = Vec2.addCrossNumVec2(vB, wB, this.m_rB);
    const C = this.m_length - this.m_maxLength;
    let Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));

    // Predictive constraint.
    if (C < 0.0) {
      Cdot += step.inv_dt * C;
    }

    let impulse = -this.m_mass * Cdot;
    const oldImpulse = this.m_impulse;
    this.m_impulse = math_min(0.0, this.m_impulse + impulse);
    impulse = this.m_impulse - oldImpulse;

    const P = Vec2.mulNumVec2(impulse, this.m_u);
    vA.subMul(this.m_invMassA, P);
    wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
    vB.addMul(this.m_invMassB, P);
    wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);

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

    const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    const u = Vec2.zero();
    u.addCombine(1, cB, 1, rB);
    u.subCombine(1, cA, 1, rA);

    const length = u.normalize();
    let C = length - this.m_maxLength;

    C = clamp(C, 0.0, Settings.maxLinearCorrection);

    const impulse = -this.m_mass * C;
    const P = Vec2.mulNumVec2(impulse, u);

    cA.subMul(this.m_invMassA, P);
    aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
    cB.addMul(this.m_invMassB, P);
    aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);

    this.m_bodyA.c_position.c.setVec2(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.setVec2(cB);
    this.m_bodyB.c_position.a = aB;

    return length - this.m_maxLength < Settings.linearSlop;
  }
}
