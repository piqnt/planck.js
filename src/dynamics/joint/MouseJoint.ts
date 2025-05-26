/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { options } from "../../util/options";
import { EPSILON } from "../../common/Math";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { Mat22 } from "../../common/Mat22";
import { Rot } from "../../common/Rot";
import { Transform } from "../../common/Transform";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { TimeStep } from "../Solver";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_PI = Math.PI;

/**
 * Mouse joint definition. This requires a world target point, tuning
 * parameters, and the time step.
 */
export interface MouseJointOpt extends JointOpt {
  /**
   * [maxForce = 0.0] The maximum constraint force that can be exerted to move
   * the candidate body. Usually you will express as some multiple of the
   * weight (multiplier * mass * gravity).
   */
  maxForce?: number;
  /**
   * [frequencyHz = 5.0] The response speed.
   */
  frequencyHz?: number;
  /**
   * [dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
   * damping.
   */
  dampingRatio?: number;
}

/**
 * Mouse joint definition. This requires a world target point, tuning
 * parameters, and the time step.
 */
export interface MouseJointDef extends JointDef, MouseJointOpt {
  /**
   * The initial world target point. This is assumed to coincide with the body
   * anchor initially.
   */
  target: Vec2Value;
}

/** @internal */ const DEFAULTS = {
  maxForce: 0.0,
  frequencyHz: 5.0,
  dampingRatio: 0.7,
};

declare module "./MouseJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function MouseJoint(def: MouseJointDef): MouseJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function MouseJoint(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2Value): MouseJoint;
}

/**
 * A mouse joint is used to make a point on a body track a specified world
 * point. This a soft constraint with a maximum force. This allows the
 * constraint to stretch and without applying huge forces.
 *
 * You need to call setTarget(target) every time that mouse is
 * moved, to track the new location of the mouse.
 *
 * NOTE: this joint is not documented in the manual because it was developed to
 * be used in the testbed. If you want to learn how to use the mouse joint, look
 * at the testbed.
 */
// @ts-expect-error
export class MouseJoint extends Joint {
  static TYPE = "mouse-joint" as const;

  /** @internal */ m_type: "mouse-joint";
  /** @internal */ m_targetA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_impulse: Vec2;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_beta: number;
  /** @internal */ m_gamma: number;
  // Solver temp
  /** @internal */ m_rB: Vec2;
  /** @internal */ m_localCenterB: Vec2;
  /** @internal */ m_invMassB: number;
  /** @internal */ m_invIB: number;
  /** @internal */ m_mass: Mat22;
  /** @internal */ m_C: Vec2;

  constructor(def: MouseJointDef);
  constructor(def: MouseJointOpt, bodyA: Body, bodyB: Body, target?: Vec2Value);
  constructor(def: MouseJointDef, bodyA?: Body, bodyB?: Body, target?: Vec2Value) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof MouseJoint)) {
      return new MouseJoint(def, bodyA, bodyB, target);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = MouseJoint.TYPE;

    if (_ASSERT) console.assert(Number.isFinite(def.maxForce) && def.maxForce >= 0.0);
    if (_ASSERT) console.assert(Number.isFinite(def.frequencyHz) && def.frequencyHz >= 0.0);
    if (_ASSERT) console.assert(Number.isFinite(def.dampingRatio) && def.dampingRatio >= 0.0);

    if (Vec2.isValid(target)) {
      this.m_targetA = Vec2.clone(target);
    } else if (Vec2.isValid(def.target)) {
      this.m_targetA = Vec2.clone(def.target);
    } else {
      this.m_targetA = Vec2.zero();
    }

    this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), this.m_targetA);

    this.m_maxForce = def.maxForce;
    this.m_impulse = Vec2.zero();

    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;

    this.m_beta = 0.0;
    this.m_gamma = 0.0;

    // Solver temp
    this.m_rB = Vec2.zero();
    this.m_localCenterB = Vec2.zero();
    this.m_invMassB = 0.0;
    this.m_invIB = 0.0;
    this.m_mass = new Mat22();
    this.m_C = Vec2.zero();

    // p = attached point, m = mouse point
    // C = p - m
    // Cdot = v
    // = v + cross(w, r)
    // J = [I r_skew]
    // Identity used:
    // w k % (rx i + ry j) = w * (-ry i + rx j)
  }

  /** @hidden */
  _serialize(): object {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      target: this.m_targetA,
      maxForce: this.m_maxForce,
      frequencyHz: this.m_frequencyHz,
      dampingRatio: this.m_dampingRatio,

      _localAnchorB: this.m_localAnchorB,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): MouseJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    data.target = Vec2.clone(data.target);
    const joint = new MouseJoint(data);
    if (data._localAnchorB) {
      joint.m_localAnchorB = data._localAnchorB;
    }
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<MouseJointDef>): void {
    if (Number.isFinite(def.maxForce)) {
      this.m_maxForce = def.maxForce;
    }
    if (Number.isFinite(def.frequencyHz)) {
      this.m_frequencyHz = def.frequencyHz;
    }
    if (Number.isFinite(def.dampingRatio)) {
      this.m_dampingRatio = def.dampingRatio;
    }
  }

  /**
   * Use this to update the target point.
   */
  setTarget(target: Vec2Value): void {
    if (Vec2.areEqual(target, this.m_targetA)) return;
    this.m_bodyB.setAwake(true);
    this.m_targetA.set(target);
  }

  getTarget(): Vec2 {
    return this.m_targetA;
  }

  /**
   * Set the maximum force in Newtons.
   */
  setMaxForce(force: number): void {
    this.m_maxForce = force;
  }

  /**
   * Get the maximum force in Newtons.
   */
  getMaxForce(): number {
    return this.m_maxForce;
  }

  /**
   * Set the frequency in Hertz.
   */
  setFrequency(hz: number): void {
    this.m_frequencyHz = hz;
  }

  /**
   * Get the frequency in Hertz.
   */
  getFrequency(): number {
    return this.m_frequencyHz;
  }

  /**
   * Set the damping ratio (dimensionless).
   */
  setDampingRatio(ratio: number): void {
    this.m_dampingRatio = ratio;
  }

  /**
   * Get the damping ratio (dimensionless).
   */
  getDampingRatio(): number {
    return this.m_dampingRatio;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   */
  getAnchorA(): Vec2 {
    return Vec2.clone(this.m_targetA);
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
    return Vec2.mulNumVec2(inv_dt, this.m_impulse);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    return inv_dt * 0.0;
  }

  /**
   * Shift the origin for any points stored in world coordinates.
   */
  shiftOrigin(newOrigin: Vec2Value): void {
    this.m_targetA.sub(newOrigin);
  }

  initVelocityConstraints(step: TimeStep): void {
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIB = this.m_bodyB.m_invI;

    const position = this.m_bodyB.c_position;
    const velocity = this.m_bodyB.c_velocity;

    const cB = position.c;
    const aB = position.a;
    const vB = velocity.v;
    let wB = velocity.w;

    const qB = Rot.neo(aB);

    const mass = this.m_bodyB.getMass();

    // Frequency
    const omega = 2.0 * math_PI * this.m_frequencyHz;

    // Damping coefficient
    const d = 2.0 * mass * this.m_dampingRatio * omega;

    // Spring stiffness
    const k = mass * (omega * omega);

    // magic formulas
    // gamma has units of inverse mass.
    // beta has units of inverse time.
    const h = step.dt;
    if (_ASSERT) console.assert(d + h * k > EPSILON);
    this.m_gamma = h * (d + h * k);
    if (this.m_gamma != 0.0) {
      this.m_gamma = 1.0 / this.m_gamma;
    }
    this.m_beta = h * k * this.m_gamma;

    // Compute the effective mass matrix.
    this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    // K = [(1/m1 + 1/m2) * eye(2) - skew(r1) * invI1 * skew(r1) - skew(r2) *
    // invI2 * skew(r2)]
    // = [1/m1+1/m2 0 ] + invI1 * [r1.y*r1.y -r1.x*r1.y] + invI2 * [r1.y*r1.y
    // -r1.x*r1.y]
    // [ 0 1/m1+1/m2] [-r1.x*r1.y r1.x*r1.x] [-r1.x*r1.y r1.x*r1.x]
    const K = new Mat22();
    K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
    K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
    K.ey.x = K.ex.y;
    K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;

    this.m_mass = K.getInverse();

    this.m_C.setVec2(cB);
    this.m_C.addCombine(1, this.m_rB, -1, this.m_targetA);
    this.m_C.mul(this.m_beta);

    // Cheat with some damping
    wB *= 0.98;

    if (step.warmStarting) {
      this.m_impulse.mul(step.dtRatio);
      vB.addMul(this.m_invMassB, this.m_impulse);
      wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, this.m_impulse);
    } else {
      this.m_impulse.setZero();
    }

    velocity.v.setVec2(vB);
    velocity.w = wB;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const velocity = this.m_bodyB.c_velocity;
    const vB = Vec2.clone(velocity.v);
    let wB = velocity.w;

    // Cdot = v + cross(w, r)

    const Cdot = Vec2.crossNumVec2(wB, this.m_rB);
    Cdot.add(vB);

    Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
    Cdot.neg();

    let impulse = Mat22.mulVec2(this.m_mass, Cdot);

    const oldImpulse = Vec2.clone(this.m_impulse);
    this.m_impulse.add(impulse);
    const maxImpulse = step.dt * this.m_maxForce;
    this.m_impulse.clamp(maxImpulse);
    impulse = Vec2.sub(this.m_impulse, oldImpulse);

    vB.addMul(this.m_invMassB, impulse);
    wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);

    velocity.v.setVec2(vB);
    velocity.w = wB;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step: TimeStep): boolean {
    return true;
  }
}
