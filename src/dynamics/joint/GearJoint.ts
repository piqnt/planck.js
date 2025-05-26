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
import {} from "../../common/Math";
import { Vec2 } from "../../common/Vec2";
import { Rot } from "../../common/Rot";
import { Joint, JointOpt, JointDef } from "../Joint";
import { Body } from "../Body";
import { RevoluteJoint } from "./RevoluteJoint";
import { PrismaticJoint } from "./PrismaticJoint";
import { TimeStep } from "../Solver";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

/**
 * Gear joint definition.
 */
export interface GearJointOpt extends JointOpt {
  /**
   * The gear ratio. See {@link GearJoint} for explanation.
   */
  ratio?: number;
}

/**
 * Gear joint definition.
 */
export interface GearJointDef extends JointDef, GearJointOpt {
  /**
   * The first revolute/prismatic joint attached to the gear joint.
   */
  joint1: RevoluteJoint | PrismaticJoint;
  /**
   * The second prismatic/revolute joint attached to the gear joint.
   */
  joint2: RevoluteJoint | PrismaticJoint;
}

/** @internal */ const DEFAULTS = {
  ratio: 1.0,
};

declare module "./GearJoint" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function GearJoint(def: GearJointDef): GearJoint;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function GearJoint(
    def: GearJointOpt,
    bodyA: Body,
    bodyB: Body,
    joint1: RevoluteJoint | PrismaticJoint,
    joint2: RevoluteJoint | PrismaticJoint,
    ratio?: number,
  ): GearJoint;
}

/**
 * A gear joint is used to connect two joints together. Either joint can be a
 * revolute or prismatic joint. You specify a gear ratio to bind the motions
 * together: coordinate1 + ratio * coordinate2 = constant
 *
 * The ratio can be negative or positive. If one joint is a revolute joint and
 * the other joint is a prismatic joint, then the ratio will have units of
 * length or units of 1/length. Warning: You have to manually destroy the gear
 * joint if joint1 or joint2 is destroyed.
 *
 * This definition requires two existing revolute or prismatic joints (any
 * combination will work).
 */
// @ts-expect-error
export class GearJoint extends Joint {
  static TYPE = "gear-joint" as const;

  /** @internal */ m_type: "gear-joint";
  /** @internal */ m_joint1: RevoluteJoint | PrismaticJoint;
  /** @internal */ m_joint2: RevoluteJoint | PrismaticJoint;
  /** @internal */ m_type1: "revolute-joint" | "prismatic-joint";
  /** @internal */ m_type2: "revolute-joint" | "prismatic-joint";
  /** @internal */ m_bodyC: Body;
  /** @internal */ m_localAnchorC: Vec2;
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_referenceAngleA: number;
  /** @internal */ m_localAxisC: Vec2;
  /** @internal */ m_bodyD: Body;
  /** @internal */ m_localAnchorD: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngleB: number;
  /** @internal */ m_localAxisD: Vec2;
  /** @internal */ m_ratio: number;
  /** @internal */ m_constant: number;
  /** @internal */ m_impulse: number;

  // Solver temp
  /** @internal */ m_lcA: Vec2;
  /** @internal */ m_lcB: Vec2;
  /** @internal */ m_lcC: Vec2;
  /** @internal */ m_lcD: Vec2;
  /** @internal */ m_mA: number;
  /** @internal */ m_mB: number;
  /** @internal */ m_mC: number;
  /** @internal */ m_mD: number;
  /** @internal */ m_iA: number;
  /** @internal */ m_iB: number;
  /** @internal */ m_iC: number;
  /** @internal */ m_iD: number;
  /** @internal */ m_JvAC: Vec2;
  /** @internal */ m_JvBD: Vec2;
  /** @internal */ m_JwA: number;
  /** @internal */ m_JwB: number;
  /** @internal */ m_JwC: number;
  /** @internal */ m_JwD: number;
  /** @internal */ m_mass: number;

  constructor(def: GearJointDef);
  constructor(
    def: GearJointOpt,
    bodyA: Body,
    bodyB: Body,
    joint1: RevoluteJoint | PrismaticJoint,
    joint2: RevoluteJoint | PrismaticJoint,
    ratio?: number,
  );
  constructor(
    def: GearJointDef,
    bodyA?: Body,
    bodyB?: Body,
    joint1?: RevoluteJoint | PrismaticJoint,
    joint2?: RevoluteJoint | PrismaticJoint,
    ratio?: number,
  ) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof GearJoint)) {
      return new GearJoint(def, bodyA, bodyB, joint1, joint2, ratio);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = GearJoint.TYPE;

    if (_ASSERT) console.assert(joint1.m_type === RevoluteJoint.TYPE || joint1.m_type === PrismaticJoint.TYPE);
    if (_ASSERT) console.assert(joint2.m_type === RevoluteJoint.TYPE || joint2.m_type === PrismaticJoint.TYPE);

    this.m_joint1 = joint1 ? joint1 : def.joint1;
    this.m_joint2 = joint2 ? joint2 : def.joint2;
    this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;

    this.m_type1 = this.m_joint1.getType() as "revolute-joint" | "prismatic-joint";
    this.m_type2 = this.m_joint2.getType() as "revolute-joint" | "prismatic-joint";

    // joint1 connects body A to body C
    // joint2 connects body B to body D

    let coordinateA: number;
    let coordinateB: number;

    // TODO_ERIN there might be some problem with the joint edges in Joint.

    this.m_bodyC = this.m_joint1.getBodyA();
    this.m_bodyA = this.m_joint1.getBodyB();

    // Get geometry of joint1
    const xfA = this.m_bodyA.m_xf;
    const aA = this.m_bodyA.m_sweep.a;
    const xfC = this.m_bodyC.m_xf;
    const aC = this.m_bodyC.m_sweep.a;

    if (this.m_type1 === RevoluteJoint.TYPE) {
      const revolute = this.m_joint1 as RevoluteJoint;
      this.m_localAnchorC = revolute.m_localAnchorA;
      this.m_localAnchorA = revolute.m_localAnchorB;
      this.m_referenceAngleA = revolute.m_referenceAngle;
      this.m_localAxisC = Vec2.zero();

      coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
      const prismatic = this.m_joint1 as PrismaticJoint;
      this.m_localAnchorC = prismatic.m_localAnchorA;
      this.m_localAnchorA = prismatic.m_localAnchorB;
      this.m_referenceAngleA = prismatic.m_referenceAngle;
      this.m_localAxisC = prismatic.m_localXAxisA;

      const pC = this.m_localAnchorC;
      const pA = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA.q, this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
      coordinateA = Vec2.dot(pA, this.m_localAxisC) - Vec2.dot(pC, this.m_localAxisC);
    }

    this.m_bodyD = this.m_joint2.getBodyA();
    this.m_bodyB = this.m_joint2.getBodyB();

    // Get geometry of joint2
    const xfB = this.m_bodyB.m_xf;
    const aB = this.m_bodyB.m_sweep.a;
    const xfD = this.m_bodyD.m_xf;
    const aD = this.m_bodyD.m_sweep.a;

    if (this.m_type2 === RevoluteJoint.TYPE) {
      const revolute = this.m_joint2 as RevoluteJoint;
      this.m_localAnchorD = revolute.m_localAnchorA;
      this.m_localAnchorB = revolute.m_localAnchorB;
      this.m_referenceAngleB = revolute.m_referenceAngle;
      this.m_localAxisD = Vec2.zero();

      coordinateB = aB - aD - this.m_referenceAngleB;
    } else {
      const prismatic = this.m_joint2 as PrismaticJoint;
      this.m_localAnchorD = prismatic.m_localAnchorA;
      this.m_localAnchorB = prismatic.m_localAnchorB;
      this.m_referenceAngleB = prismatic.m_referenceAngle;
      this.m_localAxisD = prismatic.m_localXAxisA;

      const pD = this.m_localAnchorD;
      const pB = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB.q, this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
      coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
    }

    this.m_constant = coordinateA + this.m_ratio * coordinateB;

    this.m_impulse = 0.0;

    // Gear Joint:
    // C0 = (coordinate1 + ratio * coordinate2)_initial
    // C = (coordinate1 + ratio * coordinate2) - C0 = 0
    // J = [J1 ratio * J2]
    // K = J * invM * JT
    // = J1 * invM1 * J1T + ratio * ratio * J2 * invM2 * J2T
    //
    // Revolute:
    // coordinate = rotation
    // Cdot = angularVelocity
    // J = [0 0 1]
    // K = J * invM * JT = invI
    //
    // Prismatic:
    // coordinate = dot(p - pg, ug)
    // Cdot = dot(v + cross(w, r), ug)
    // J = [ug cross(r, ug)]
    // K = J * invM * JT = invMass + invI * cross(r, ug)^2
  }

  /** @hidden */
  _serialize(): object {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      joint1: this.m_joint1,
      joint2: this.m_joint2,
      ratio: this.m_ratio,

      // _constant: this.m_constant,
    };
  }

  /** @hidden */
  static _deserialize(data: any, world: any, restore: any): GearJoint {
    data = { ...data };
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    data.joint1 = restore(Joint, data.joint1, world);
    data.joint2 = restore(Joint, data.joint2, world);
    const joint = new GearJoint(data);
    // if (data._constant) joint.m_constant = data._constant;
    return joint;
  }

  /** @hidden */
  _reset(def: Partial<GearJointDef>): void {
    // todo: implement other fields
    if (Number.isFinite(def.ratio)) {
      this.m_ratio = def.ratio;
    }
  }

  /**
   * Get the first joint.
   */
  getJoint1(): Joint {
    return this.m_joint1;
  }

  /**
   * Get the second joint.
   */
  getJoint2(): Joint {
    return this.m_joint2;
  }

  /**
   * Set the gear ratio.
   */
  setRatio(ratio: number): void {
    if (_ASSERT) console.assert(Number.isFinite(ratio));
    this.m_ratio = ratio;
  }

  /**
   * Get the gear ratio.
   */
  getRatio(): number {
    return this.m_ratio;
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
    return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number): number {
    const L = this.m_impulse * this.m_JwA;
    return inv_dt * L;
  }

  initVelocityConstraints(step: TimeStep): void {
    this.m_lcA = this.m_bodyA.m_sweep.localCenter;
    this.m_lcB = this.m_bodyB.m_sweep.localCenter;
    this.m_lcC = this.m_bodyC.m_sweep.localCenter;
    this.m_lcD = this.m_bodyD.m_sweep.localCenter;
    this.m_mA = this.m_bodyA.m_invMass;
    this.m_mB = this.m_bodyB.m_invMass;
    this.m_mC = this.m_bodyC.m_invMass;
    this.m_mD = this.m_bodyD.m_invMass;
    this.m_iA = this.m_bodyA.m_invI;
    this.m_iB = this.m_bodyB.m_invI;
    this.m_iC = this.m_bodyC.m_invI;
    this.m_iD = this.m_bodyD.m_invI;

    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const aC = this.m_bodyC.c_position.a;
    const vC = this.m_bodyC.c_velocity.v;
    let wC = this.m_bodyC.c_velocity.w;

    const aD = this.m_bodyD.c_position.a;
    const vD = this.m_bodyD.c_velocity.v;
    let wD = this.m_bodyD.c_velocity.w;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);
    const qC = Rot.neo(aC);
    const qD = Rot.neo(aD);

    this.m_mass = 0.0;

    if (this.m_type1 == RevoluteJoint.TYPE) {
      this.m_JvAC = Vec2.zero();
      this.m_JwA = 1.0;
      this.m_JwC = 1.0;
      this.m_mass += this.m_iA + this.m_iC;
    } else {
      const u = Rot.mulVec2(qC, this.m_localAxisC);
      const rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
      const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
      this.m_JvAC = u;
      this.m_JwC = Vec2.crossVec2Vec2(rC, u);
      this.m_JwA = Vec2.crossVec2Vec2(rA, u);
      this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
    }

    if (this.m_type2 == RevoluteJoint.TYPE) {
      this.m_JvBD = Vec2.zero();
      this.m_JwB = this.m_ratio;
      this.m_JwD = this.m_ratio;
      this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
    } else {
      const u = Rot.mulVec2(qD, this.m_localAxisD);
      const rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
      const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
      this.m_JvBD = Vec2.mulNumVec2(this.m_ratio, u);
      this.m_JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
      this.m_JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
      this.m_mass +=
        this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) +
        this.m_iD * this.m_JwD * this.m_JwD +
        this.m_iB * this.m_JwB * this.m_JwB;
    }

    // Compute effective mass.
    this.m_mass = this.m_mass > 0.0 ? 1.0 / this.m_mass : 0.0;

    if (step.warmStarting) {
      vA.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
      wA += this.m_iA * this.m_impulse * this.m_JwA;

      vB.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
      wB += this.m_iB * this.m_impulse * this.m_JwB;

      vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
      wC -= this.m_iC * this.m_impulse * this.m_JwC;

      vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
      wD -= this.m_iD * this.m_impulse * this.m_JwD;
    } else {
      this.m_impulse = 0.0;
    }

    this.m_bodyA.c_velocity.v.setVec2(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.setVec2(vB);
    this.m_bodyB.c_velocity.w = wB;
    this.m_bodyC.c_velocity.v.setVec2(vC);
    this.m_bodyC.c_velocity.w = wC;
    this.m_bodyD.c_velocity.v.setVec2(vD);
    this.m_bodyD.c_velocity.w = wD;
  }

  solveVelocityConstraints(step: TimeStep): void {
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;
    const vC = this.m_bodyC.c_velocity.v;
    let wC = this.m_bodyC.c_velocity.w;
    const vD = this.m_bodyD.c_velocity.v;
    let wD = this.m_bodyD.c_velocity.w;

    let Cdot =
      Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC) + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD);
    Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);

    const impulse = -this.m_mass * Cdot;
    this.m_impulse += impulse;

    vA.addMul(this.m_mA * impulse, this.m_JvAC);
    wA += this.m_iA * impulse * this.m_JwA;
    vB.addMul(this.m_mB * impulse, this.m_JvBD);
    wB += this.m_iB * impulse * this.m_JwB;
    vC.subMul(this.m_mC * impulse, this.m_JvAC);
    wC -= this.m_iC * impulse * this.m_JwC;
    vD.subMul(this.m_mD * impulse, this.m_JvBD);
    wD -= this.m_iD * impulse * this.m_JwD;

    this.m_bodyA.c_velocity.v.setVec2(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.setVec2(vB);
    this.m_bodyB.c_velocity.w = wB;
    this.m_bodyC.c_velocity.v.setVec2(vC);
    this.m_bodyC.c_velocity.w = wC;
    this.m_bodyD.c_velocity.v.setVec2(vD);
    this.m_bodyD.c_velocity.w = wD;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step: TimeStep): boolean {
    const cA = this.m_bodyA.c_position.c;
    let aA = this.m_bodyA.c_position.a;
    const cB = this.m_bodyB.c_position.c;
    let aB = this.m_bodyB.c_position.a;
    const cC = this.m_bodyC.c_position.c;
    let aC = this.m_bodyC.c_position.a;
    const cD = this.m_bodyD.c_position.c;
    let aD = this.m_bodyD.c_position.a;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);
    const qC = Rot.neo(aC);
    const qD = Rot.neo(aD);

    const linearError = 0.0;

    let coordinateA: number;
    let coordinateB: number;

    let JvAC: Vec2;
    let JvBD: Vec2;
    let JwA: number;
    let JwB: number;
    let JwC: number;
    let JwD: number;
    let mass = 0.0;

    if (this.m_type1 == RevoluteJoint.TYPE) {
      JvAC = Vec2.zero();
      JwA = 1.0;
      JwC = 1.0;
      mass += this.m_iA + this.m_iC;

      coordinateA = aA - aC - this.m_referenceAngleA;
    } else {
      const u = Rot.mulVec2(qC, this.m_localAxisC);
      const rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
      const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
      JvAC = u;
      JwC = Vec2.crossVec2Vec2(rC, u);
      JwA = Vec2.crossVec2Vec2(rA, u);
      mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;

      const pC = Vec2.sub(this.m_localAnchorC, this.m_lcC);
      const pA = Rot.mulTVec2(qC, Vec2.add(rA, Vec2.sub(cA, cC)));
      coordinateA = Vec2.dot(Vec2.sub(pA, pC), this.m_localAxisC);
    }

    if (this.m_type2 == RevoluteJoint.TYPE) {
      JvBD = Vec2.zero();
      JwB = this.m_ratio;
      JwD = this.m_ratio;
      mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);

      coordinateB = aB - aD - this.m_referenceAngleB;
    } else {
      const u = Rot.mulVec2(qD, this.m_localAxisD);
      const rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
      const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
      JvBD = Vec2.mulNumVec2(this.m_ratio, u);
      JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
      JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
      mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;

      const pD = Vec2.sub(this.m_localAnchorD, this.m_lcD);
      const pB = Rot.mulTVec2(qD, Vec2.add(rB, Vec2.sub(cB, cD)));
      coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
    }

    const C = coordinateA + this.m_ratio * coordinateB - this.m_constant;

    let impulse = 0.0;
    if (mass > 0.0) {
      impulse = -C / mass;
    }

    cA.addMul(this.m_mA * impulse, JvAC);
    aA += this.m_iA * impulse * JwA;
    cB.addMul(this.m_mB * impulse, JvBD);
    aB += this.m_iB * impulse * JwB;
    cC.subMul(this.m_mC * impulse, JvAC);
    aC -= this.m_iC * impulse * JwC;
    cD.subMul(this.m_mD * impulse, JvBD);
    aD -= this.m_iD * impulse * JwD;

    this.m_bodyA.c_position.c.setVec2(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.setVec2(cB);
    this.m_bodyB.c_position.a = aB;
    this.m_bodyC.c_position.c.setVec2(cC);
    this.m_bodyC.c_position.a = aC;
    this.m_bodyD.c_position.c.setVec2(cD);
    this.m_bodyD.c_position.a = aD;

    // TODO_ERIN not implemented
    return linearError < Settings.linearSlop;
  }
}
