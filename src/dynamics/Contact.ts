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

import { ShapeType } from "../collision/Shape";
import common from '../util/common';
import Math from '../common/Math';
import Vec2 from '../common/Vec2';
import Transform from '../common/Transform';
import Mat22 from '../common/Mat22';
import Rot from '../common/Rot';
import Settings from '../Settings';
import Manifold, { ManifoldType, WorldManifold } from '../collision/Manifold';
import { testOverlap } from '../collision/Distance';
import Fixture from "./Fixture";
import Body from "./Body";
import { ContactImpulse, TimeStep } from "./Solver";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


const DEBUG_SOLVER = false;

/**
 * A contact edge is used to connect bodies and contacts together in a contact
 * graph where each body is a node and each contact is an edge. A contact edge
 * belongs to a doubly linked list maintained in each attached body. Each
 * contact has two contact nodes, one for each attached body.
 *
 * @prop {Contact} contact The contact
 * @prop {ContactEdge} prev The previous contact edge in the body's contact list
 * @prop {ContactEdge} next The next contact edge in the body's contact list
 * @prop {Body} other Provides quick access to the other body attached.
 */
export class ContactEdge {
  contact: Contact;
  prev: ContactEdge | undefined;
  next: ContactEdge | undefined;
  other: Body | undefined;
  constructor(contact: Contact) {
    this.contact = contact;
  }
}

export type EvaluateFunction = (
  manifold: Manifold,
  xfA: Transform,
  fixtureA: Fixture,
  indexA: number,
  xfB: Transform,
  fixtureB: Fixture,
  indexB: number
) => void;

export type ContactCallback = (
  manifold: Manifold,
  xfA: Transform,
  fixtureA: Fixture,
  indexA: number,
  xfB: Transform,
  fixtureB: Fixture,
  indexB: number
) => void /* & { destroyFcn?: (contact: Contact) => void }*/;


/**
 * Friction mixing law. The idea is to allow either fixture to drive the
 * restitution to zero. For example, anything slides on ice.
 */
export function mixFriction(friction1: number, friction2: number): number {
  return Math.sqrt(friction1 * friction2);
}

/**
 * Restitution mixing law. The idea is allow for anything to bounce off an
 * inelastic surface. For example, a superball bounces on anything.
 */
export function mixRestitution(restitution1: number, restitution2: number): number {
  return restitution1 > restitution2 ? restitution1 : restitution2;
}

// TODO: move this to Settings?
const s_registers = [];

// TODO: merge with ManifoldPoint?
export class VelocityConstraintPoint {
  rA: Vec2 = Vec2.zero();
  rB: Vec2 = Vec2.zero();
  normalImpulse: number = 0;
  tangentImpulse: number = 0;
  normalMass: number = 0;
  tangentMass: number = 0;
  velocityBias: number = 0;
}

/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 */
export default class Contact {
  /** @internal */
  m_nodeA: ContactEdge;
  /** @internal */
  m_nodeB: ContactEdge;
  /** @internal */
  m_fixtureA: Fixture;
  /** @internal */
  m_fixtureB: Fixture;
  /** @internal */
  m_indexA: number;
  /** @internal */
  m_indexB: number;
  /** @internal */
  m_evaluateFcn: EvaluateFunction;
  /** @internal */
  m_manifold: Manifold = new Manifold();
  /** @internal */
  m_prev: Contact | null = null;
  /** @internal */
  m_next: Contact | null = null;
  /** @internal */
  m_toi: number = 1.0;
  /** @internal */
  m_toiCount: number = 0;
  /** @internal This contact has a valid TOI in m_toi */
  m_toiFlag: boolean = false;
  /** @internal */
  m_friction: number;
  /** @internal */
  m_restitution: number;
  /** @internal */
  m_tangentSpeed: number = 0.0;
  /** @internal This contact can be disabled (by user) */
  m_enabledFlag: boolean = true;
  /** @internal Used when crawling contact graph when forming islands. */
  m_islandFlag: boolean = false;
  /** @internal Set when the shapes are touching. */
  m_touchingFlag: boolean = false;
  /** @internal This contact needs filtering because a fixture filter was changed. */
  m_filterFlag: boolean = false;
  /** @internal This bullet contact had a TOI event */
  m_bulletHitFlag: boolean = false;

  /** @internal Contact reporting impulse object cache */
  m_impulse: ContactImpulse = new ContactImpulse(this);

  // VelocityConstraint
  /** @internal */ v_points: VelocityConstraintPoint[] = []; // [maxManifoldPoints];
  /** @internal */ v_normal: Vec2 = Vec2.zero();
  /** @internal */ v_normalMass: Mat22 = new Mat22();
  /** @internal */ v_K: Mat22 = new Mat22();
  /** @internal */ v_pointCount: number;
  /** @internal */ v_tangentSpeed: number | undefined;
  /** @internal */ v_friction: number | undefined;
  /** @internal */ v_restitution: number | undefined;
  /** @internal */ v_invMassA: number | undefined;
  /** @internal */ v_invMassB: number | undefined;
  /** @internal */ v_invIA: number | undefined;
  /** @internal */ v_invIB: number | undefined;

  // PositionConstraint
  /** @internal */ p_localPoints: Vec2[] = []; // [maxManifoldPoints];
  /** @internal */ p_localNormal: Vec2 = Vec2.zero();
  /** @internal */ p_localPoint: Vec2 = Vec2.zero();
  /** @internal */ p_localCenterA: Vec2 = Vec2.zero();
  /** @internal */ p_localCenterB: Vec2 = Vec2.zero();
  /** @internal */ p_type: ManifoldType | undefined;
  /** @internal */ p_radiusA: number | undefined;
  /** @internal */ p_radiusB: number | undefined;
  /** @internal */ p_pointCount: number | undefined;
  /** @internal */ p_invMassA: number | undefined;
  /** @internal */ p_invMassB: number | undefined;
  /** @internal */ p_invIA: number | undefined;
  /** @internal */ p_invIB: number | undefined;

  constructor(fA: Fixture, indexA: number, fB: Fixture, indexB: number, evaluateFcn: EvaluateFunction) {
    // Nodes for connecting bodies.
    this.m_nodeA = new ContactEdge(this);
    this.m_nodeB = new ContactEdge(this);

    this.m_fixtureA = fA;
    this.m_fixtureB = fB;

    this.m_indexA = indexA;
    this.m_indexB = indexB;

    this.m_evaluateFcn = evaluateFcn;

    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
  }

  initConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;

    const shapeA = fixtureA.getShape();
    const shapeB = fixtureB.getShape();

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const manifold = this.getManifold();

    const pointCount = manifold.pointCount;
    _ASSERT && common.assert(pointCount > 0);

    this.v_invMassA = bodyA.m_invMass;
    this.v_invMassB = bodyB.m_invMass;
    this.v_invIA = bodyA.m_invI;
    this.v_invIB = bodyB.m_invI;

    this.v_friction = this.m_friction;
    this.v_restitution = this.m_restitution;
    this.v_tangentSpeed = this.m_tangentSpeed;

    this.v_pointCount = pointCount;

    this.v_K.setZero();
    this.v_normalMass.setZero();

    this.p_invMassA = bodyA.m_invMass;
    this.p_invMassB = bodyB.m_invMass;
    this.p_invIA = bodyA.m_invI;
    this.p_invIB = bodyB.m_invI;
    this.p_localCenterA = Vec2.clone(bodyA.m_sweep.localCenter);
    this.p_localCenterB = Vec2.clone(bodyB.m_sweep.localCenter);

    this.p_radiusA = shapeA.m_radius;
    this.p_radiusB = shapeB.m_radius;

    this.p_type = manifold.type;
    this.p_localNormal = Vec2.clone(manifold.localNormal);
    this.p_localPoint = Vec2.clone(manifold.localPoint);
    this.p_pointCount = pointCount;

    for (let j = 0; j < pointCount; ++j) {
      const cp = manifold.points[j];
      const vcp = this.v_points[j] = new VelocityConstraintPoint();

      if (step.warmStarting) {
        vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
        vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;

      } else {
        vcp.normalImpulse = 0.0;
        vcp.tangentImpulse = 0.0;
      }

      vcp.rA.setZero();
      vcp.rB.setZero();
      vcp.normalMass = 0.0;
      vcp.tangentMass = 0.0;
      vcp.velocityBias = 0.0;

      this.p_localPoints[j] = Vec2.clone(cp.localPoint);

    }
  }

  /**
   * Get the contact manifold. Do not modify the manifold unless you understand
   * the internals of the library.
   */
  getManifold(): Manifold {
    return this.m_manifold;
  }

  /**
   * Get the world manifold.
   */
  getWorldManifold(worldManifold: WorldManifold | null | undefined): WorldManifold | undefined {
    const bodyA = this.m_fixtureA.getBody();
    const bodyB = this.m_fixtureB.getBody();
    const shapeA = this.m_fixtureA.getShape();
    const shapeB = this.m_fixtureB.getShape();

    return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(),
      shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
  }

  /**
   * Enable/disable this contact. This can be used inside the pre-solve contact
   * listener. The contact is only disabled for the current time step (or sub-step
   * in continuous collisions).
   */
  setEnabled(flag: boolean): void {
    this.m_enabledFlag = !!flag;
  }

  /**
   * Has this contact been disabled?
   */
  isEnabled(): boolean {
    return this.m_enabledFlag;
  }

  /**
   * Is this contact touching?
   */
  isTouching(): boolean {
    return this.m_touchingFlag;
  }

  /**
   * Get the next contact in the world's contact list.
   */
  getNext(): Contact | null {
    return this.m_next;
  }

  /**
   * Get fixture A in this contact.
   */
  getFixtureA(): Fixture {
    return this.m_fixtureA;
  }

  /**
   * Get fixture B in this contact.
   */
  getFixtureB(): Fixture {
    return this.m_fixtureB;
  }

  /**
   * Get the child primitive index for fixture A.
   */
  getChildIndexA(): number {
    return this.m_indexA;
  }

  /**
   * Get the child primitive index for fixture B.
   */
  getChildIndexB(): number {
    return this.m_indexB;
  }

  /**
   * Flag this contact for filtering. Filtering will occur the next time step.
   */
  flagForFiltering(): void {
    this.m_filterFlag = true;
  }

  /**
   * Override the default friction mixture. You can call this in
   * ContactListener.preSolve. This value persists until set or reset.
   */
  setFriction(friction: number): void {
    this.m_friction = friction;
  }

  /**
   * Get the friction.
   */
  getFriction(): number {
    return this.m_friction;
  }

  /**
   * Reset the friction mixture to the default value.
   */
  resetFriction(): void {
    this.m_friction = mixFriction(this.m_fixtureA.m_friction,
      this.m_fixtureB.m_friction);
  }

  /**
   * Override the default restitution mixture. You can call this in
   * ContactListener.preSolve. The value persists until you set or reset.
   */
  setRestitution(restitution: number): void {
    this.m_restitution = restitution;
  }

  /**
   * Get the restitution.
   */
  getRestitution(): number {
    return this.m_restitution;
  }

  /**
   * Reset the restitution to the default value.
   */
  resetRestitution(): void {
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution,
      this.m_fixtureB.m_restitution);
  }

  /**
   * Set the desired tangent speed for a conveyor belt behavior. In meters per
   * second.
   */
  setTangentSpeed(speed: number): void {
    this.m_tangentSpeed = speed;
  }

  /**
   * Get the desired tangent speed. In meters per second.
   */
  getTangentSpeed(): number {
    return this.m_tangentSpeed;
  }

  /**
   * Called by Update method, and implemented by subclasses.
   */
  evaluate(manifold: Manifold, xfA: Transform, xfB: Transform): void {
    this.m_evaluateFcn(manifold, xfA, this.m_fixtureA, this.m_indexA, xfB,
      this.m_fixtureB, this.m_indexB);
  }

  /**
   * Updates the contact manifold and touching status.
   *
   * Note: do not assume the fixture AABBs are overlapping or are valid.
   *
   * @param listener.beginContact
   * @param listener.endContact
   * @param listener.preSolve
   */
  update(listener?: {
    beginContact(contact: Contact): void,
    endContact(contact: Contact): void,
    preSolve(contact: Contact, oldManifold: Manifold): void
  }): void {

    // Re-enable this contact.
    this.m_enabledFlag = true;

    let touching = false;
    const wasTouching = this.m_touchingFlag;

    const sensorA = this.m_fixtureA.isSensor();
    const sensorB = this.m_fixtureB.isSensor();
    const sensor = sensorA || sensorB;

    const bodyA = this.m_fixtureA.getBody();
    const bodyB = this.m_fixtureB.getBody();
    const xfA = bodyA.getTransform();
    const xfB = bodyB.getTransform();

    let oldManifold;

    // Is this contact a sensor?
    if (sensor) {
      const shapeA = this.m_fixtureA.getShape();
      const shapeB = this.m_fixtureB.getShape();
      touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);

      // Sensors don't generate manifolds.
      this.m_manifold.pointCount = 0;
    } else {

      // TODO reuse manifold
      oldManifold = this.m_manifold;
      this.m_manifold = new Manifold();

      this.evaluate(this.m_manifold, xfA, xfB);
      touching = this.m_manifold.pointCount > 0;

      // Match old contact ids to new contact ids and copy the
      // stored impulses to warm start the solver.
      for (let i = 0; i < this.m_manifold.pointCount; ++i) {
        const nmp = this.m_manifold.points[i];
        nmp.normalImpulse = 0.0;
        nmp.tangentImpulse = 0.0;

        for (let j = 0; j < oldManifold.pointCount; ++j) {
          const omp = oldManifold.points[j];
          if (omp.id.key == nmp.id.key) {
            nmp.normalImpulse = omp.normalImpulse;
            nmp.tangentImpulse = omp.tangentImpulse;
            break;
          }
        }
      }

      if (touching != wasTouching) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
      }
    }

    this.m_touchingFlag = touching;

    if (!wasTouching && touching && listener) {
      listener.beginContact(this);
    }

    if (wasTouching && !touching && listener) {
      listener.endContact(this);
    }

    if (!sensor && touching && listener) {
      listener.preSolve(this, oldManifold);
    }
  }

  solvePositionConstraint(step: TimeStep): number {
    return this._solvePositionConstraint(step);
  }

  solvePositionConstraintTOI(step: TimeStep, toiA: Body, toiB: Body): number {
    return this._solvePositionConstraint(step, toiA, toiB);
  }

  private _solvePositionConstraint(step: TimeStep, toiA?: Body, toiB?: Body): number {
    const toi: boolean = !!toiA && !!toiB;

    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const velocityA = bodyA.c_velocity;
    const velocityB = bodyB.c_velocity;
    const positionA = bodyA.c_position;
    const positionB = bodyB.c_position;

    const localCenterA = Vec2.clone(this.p_localCenterA);
    const localCenterB = Vec2.clone(this.p_localCenterB);

    let mA = 0.0;
    let iA = 0.0;
    if (!toi || (bodyA == toiA || bodyA == toiB)) {
      mA = this.p_invMassA;
      iA = this.p_invIA;
    }

    let mB = 0.0;
    let iB = 0.0;
    if (!toi || (bodyB == toiA || bodyB == toiB)) {
      mB = this.p_invMassB;
      iB = this.p_invIB;
    }

    const cA = Vec2.clone(positionA.c);
    let aA = positionA.a;

    const cB = Vec2.clone(positionB.c);
    let aB = positionB.a;

    let minSeparation = 0.0;

    // Solve normal constraints
    for (let j = 0; j < this.p_pointCount; ++j) {
      const xfA = Transform.identity();
      const xfB = Transform.identity();
      xfA.q.setAngle(aA);
      xfB.q.setAngle(aB);
      xfA.p = Vec2.sub(cA, Rot.mulVec2(xfA.q, localCenterA));
      xfB.p = Vec2.sub(cB, Rot.mulVec2(xfB.q, localCenterB));

      // PositionSolverManifold
      let normal;
      let point;
      let separation;
      switch (this.p_type) {
        case ManifoldType.e_circles: {
          const pointA = Transform.mulVec2(xfA, this.p_localPoint);
          const pointB = Transform.mulVec2(xfB, this.p_localPoints[0]);
          normal = Vec2.sub(pointB, pointA);
          normal.normalize();
          point = Vec2.combine(0.5, pointA, 0.5, pointB);
          separation = Vec2.dot(Vec2.sub(pointB, pointA), normal) - this.p_radiusA - this.p_radiusB;
          break;
        }

        case ManifoldType.e_faceA: {
          normal = Rot.mulVec2(xfA.q, this.p_localNormal);
          const planePoint = Transform.mulVec2(xfA, this.p_localPoint);
          const clipPoint = Transform.mulVec2(xfB, this.p_localPoints[j]);
          separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
          point = clipPoint;
          break;
        }

        case ManifoldType.e_faceB: {
          normal = Rot.mulVec2(xfB.q, this.p_localNormal);
          const planePoint = Transform.mulVec2(xfB, this.p_localPoint);
          const clipPoint = Transform.mulVec2(xfA, this.p_localPoints[j]);
          separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
          point = clipPoint;

          // Ensure normal points from A to B
          normal.mul(-1);
          break;
        }
      }

      const rA = Vec2.sub(point, cA);
      const rB = Vec2.sub(point, cB);

      // Track max constraint error.
      minSeparation = Math.min(minSeparation, separation);

      const baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
      const linearSlop = Settings.linearSlop;
      const maxLinearCorrection = Settings.maxLinearCorrection;

      // Prevent large corrections and allow slop.
      const C = Math.clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0.0);

      // Compute the effective mass.
      const rnA = Vec2.crossVec2Vec2(rA, normal);
      const rnB = Vec2.crossVec2Vec2(rB, normal);
      const K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

      // Compute normal impulse
      const impulse = K > 0.0 ? -C / K : 0.0;

      const P = Vec2.mulNumVec2(impulse, normal);

      cA.subMul(mA, P);
      aA -= iA * Vec2.crossVec2Vec2(rA, P);

      cB.addMul(mB, P);
      aB += iB * Vec2.crossVec2Vec2(rB, P);
    }

    positionA.c.setVec2(cA);
    positionA.a = aA;

    positionB.c.setVec2(cB);
    positionB.a = aB;

    return minSeparation;
  }

  initVelocityConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const velocityA = bodyA.c_velocity;
    const velocityB = bodyB.c_velocity;

    const positionA = bodyA.c_position;
    const positionB = bodyB.c_position;

    const radiusA = this.p_radiusA;
    const radiusB = this.p_radiusB;
    const manifold = this.getManifold();

    const mA = this.v_invMassA;
    const mB = this.v_invMassB;
    const iA = this.v_invIA;
    const iB = this.v_invIB;
    const localCenterA = Vec2.clone(this.p_localCenterA);
    const localCenterB = Vec2.clone(this.p_localCenterB);

    const cA = Vec2.clone(positionA.c);
    const aA = positionA.a;
    const vA = Vec2.clone(velocityA.v);
    const wA = velocityA.w;

    const cB = Vec2.clone(positionB.c);
    const aB = positionB.a;
    const vB = Vec2.clone(velocityB.v);
    const wB = velocityB.w;

    _ASSERT && common.assert(manifold.pointCount > 0);

    const xfA = Transform.identity();
    const xfB = Transform.identity();
    xfA.q.setAngle(aA);
    xfB.q.setAngle(aB);
    xfA.p.setCombine(1, cA, -1, Rot.mulVec2(xfA.q, localCenterA));
    xfB.p.setCombine(1, cB, -1, Rot.mulVec2(xfB.q, localCenterB));

    const worldManifold = manifold.getWorldManifold(null, xfA, radiusA, xfB, radiusB);

    this.v_normal.setVec2(worldManifold.normal);

    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint

      vcp.rA.setVec2(Vec2.sub(worldManifold.points[j], cA));
      vcp.rB.setVec2(Vec2.sub(worldManifold.points[j], cB));

      const rnA = Vec2.crossVec2Vec2(vcp.rA, this.v_normal);
      const rnB = Vec2.crossVec2Vec2(vcp.rB, this.v_normal);

      const kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

      vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;

      const tangent = Vec2.crossVec2Num(this.v_normal, 1.0);

      const rtA = Vec2.crossVec2Vec2(vcp.rA, tangent);
      const rtB = Vec2.crossVec2Vec2(vcp.rB, tangent);

      const kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;

      vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;

      // Setup a velocity bias for restitution.
      vcp.velocityBias = 0.0;
      const vRel = Vec2.dot(this.v_normal, vB)
        + Vec2.dot(this.v_normal, Vec2.crossNumVec2(wB, vcp.rB))
        - Vec2.dot(this.v_normal, vA)
        - Vec2.dot(this.v_normal, Vec2.crossNumVec2(wA, vcp.rA));
      if (vRel < -Settings.velocityThreshold) {
        vcp.velocityBias = -this.v_restitution * vRel;
      }
    }

    // If we have two points, then prepare the block solver.
    if (this.v_pointCount == 2 && step.blockSolve) {
      const vcp1 = this.v_points[0]; // VelocityConstraintPoint
      const vcp2 = this.v_points[1]; // VelocityConstraintPoint

      const rn1A = Vec2.crossVec2Vec2(vcp1.rA, this.v_normal);
      const rn1B = Vec2.crossVec2Vec2(vcp1.rB, this.v_normal);
      const rn2A = Vec2.crossVec2Vec2(vcp2.rA, this.v_normal);
      const rn2B = Vec2.crossVec2Vec2(vcp2.rB, this.v_normal);

      const k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
      const k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
      const k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;

      // Ensure a reasonable condition number.
      const k_maxConditionNumber = 1000.0;
      if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
        // K is safe to invert.
        this.v_K.ex.setNum(k11, k12);
        this.v_K.ey.setNum(k12, k22);
        this.v_normalMass.set(this.v_K.getInverse());
      } else {
        // The constraints are redundant, just use one.
        // TODO_ERIN use deepest?
        this.v_pointCount = 1;
      }
    }

    positionA.c.setVec2(cA);
    positionA.a = aA;
    velocityA.v.setVec2(vA);
    velocityA.w = wA;

    positionB.c.setVec2(cB);
    positionB.a = aB;
    velocityB.v.setVec2(vB);
    velocityB.w = wB;
  }

  warmStartConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const velocityA = bodyA.c_velocity;
    const velocityB = bodyB.c_velocity;
    const positionA = bodyA.c_position;
    const positionB = bodyB.c_position;

    const mA = this.v_invMassA;
    const iA = this.v_invIA;
    const mB = this.v_invMassB;
    const iB = this.v_invIB;

    const vA = Vec2.clone(velocityA.v);
    let wA = velocityA.w;
    const vB = Vec2.clone(velocityB.v);
    let wB = velocityB.w;

    const normal = this.v_normal;
    const tangent = Vec2.crossVec2Num(normal, 1.0);

    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint

      const P = Vec2.combine(vcp.normalImpulse, normal, vcp.tangentImpulse, tangent);
      wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);
      vA.subMul(mA, P);
      wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
      vB.addMul(mB, P);
    }

    velocityA.v.setVec2(vA);
    velocityA.w = wA;
    velocityB.v.setVec2(vB);
    velocityB.w = wB;
  }

  storeConstraintImpulses(step: TimeStep): void {
    const manifold = this.m_manifold;
    for (let j = 0; j < this.v_pointCount; ++j) {
      manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
      manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
    }
  }

  solveVelocityConstraint(step: TimeStep): void {
    const bodyA = this.m_fixtureA.m_body;
    const bodyB = this.m_fixtureB.m_body;

    const velocityA = bodyA.c_velocity;
    const positionA = bodyA.c_position;

    const velocityB = bodyB.c_velocity;
    const positionB = bodyB.c_position;

    const mA = this.v_invMassA;
    const iA = this.v_invIA;
    const mB = this.v_invMassB;
    const iB = this.v_invIB;

    const vA = Vec2.clone(velocityA.v);
    let wA = velocityA.w;
    const vB = Vec2.clone(velocityB.v);
    let wB = velocityB.w;

    const normal = this.v_normal;
    const tangent = Vec2.crossVec2Num(normal, 1.0);
    const friction = this.v_friction;

    _ASSERT && common.assert(this.v_pointCount == 1 || this.v_pointCount == 2);

    // Solve tangent constraints first because non-penetration is more important
    // than friction.
    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint

      // Relative velocity at contact
      const dv = Vec2.zero();
      dv.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, vcp.rB));
      dv.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, vcp.rA));

      // Compute tangent force
      const vt = Vec2.dot(dv, tangent) - this.v_tangentSpeed;
      let lambda = vcp.tangentMass * (-vt);

      // Clamp the accumulated force
      const maxFriction = friction * vcp.normalImpulse;
      const newImpulse = Math.clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
      lambda = newImpulse - vcp.tangentImpulse;
      vcp.tangentImpulse = newImpulse;

      // Apply contact impulse
      const P = Vec2.mulNumVec2(lambda, tangent);

      vA.subMul(mA, P);
      wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);

      vB.addMul(mB, P);
      wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
    }

    // Solve normal constraints
    if (this.v_pointCount == 1 || step.blockSolve == false) {
      for (let i = 0; i < this.v_pointCount; ++i) {
        const vcp = this.v_points[i]; // VelocityConstraintPoint

        // Relative velocity at contact
        const dv = Vec2.zero();
        dv.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, vcp.rB));
        dv.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, vcp.rA));

        // Compute normal impulse
        const vn = Vec2.dot(dv, normal);
        let lambda = -vcp.normalMass * (vn - vcp.velocityBias);

        // Clamp the accumulated impulse
        const newImpulse = Math.max(vcp.normalImpulse + lambda, 0.0);
        lambda = newImpulse - vcp.normalImpulse;
        vcp.normalImpulse = newImpulse;

        // Apply contact impulse
        const P = Vec2.mulNumVec2(lambda, normal);

        vA.subMul(mA, P);
        wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);

        vB.addMul(mB, P);
        wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
      }
    } else {
      // Block solver developed in collaboration with Dirk Gregorius (back in
      // 01/07 on Box2D_Lite).
      // Build the mini LCP for this contact patch
      //
      // vn = A * x + b, vn >= 0, , vn >= 0, x >= 0 and vn_i * x_i = 0 with i =
      // 1..2
      //
      // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
      // b = vn0 - velocityBias
      //
      // The system is solved using the "Total enumeration method" (s. Murty).
      // The complementary constraint vn_i * x_i
      // implies that we must have in any solution either vn_i = 0 or x_i = 0.
      // So for the 2D contact problem the cases
      // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and
      // vn1 = 0 need to be tested. The first valid
      // solution that satisfies the problem is chosen.
      //
      // In order to account of the accumulated impulse 'a' (because of the
      // iterative nature of the solver which only requires
      // that the accumulated impulse is clamped and not the incremental
      // impulse) we change the impulse variable (x_i).
      //
      // Substitute:
      //
      // x = a + d
      //
      // a := old total impulse
      // x := new total impulse
      // d := incremental impulse
      //
      // For the current iteration we extend the formula for the incremental
      // impulse
      // to compute the new total impulse:
      //
      // vn = A * d + b
      // = A * (x - a) + b
      // = A * x + b - A * a
      // = A * x + b'
      // b' = b - A * a;

      const vcp1 = this.v_points[0]; // VelocityConstraintPoint
      const vcp2 = this.v_points[1]; // VelocityConstraintPoint

      const a = Vec2.neo(vcp1.normalImpulse, vcp2.normalImpulse);
      _ASSERT && common.assert(a.x >= 0.0 && a.y >= 0.0);

      // Relative velocity at contact
      let dv1 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp1.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp1.rA));
      let dv2 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp2.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp2.rA));

      // Compute normal velocity
      let vn1 = Vec2.dot(dv1, normal);
      let vn2 = Vec2.dot(dv2, normal);

      const b = Vec2.neo(vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);

      // Compute b'
      b.sub(Mat22.mulVec2(this.v_K, a));

      const k_errorTol = 1e-3;
      // NOT_USED(k_errorTol);

      while (true) {
        //
        // Case 1: vn = 0
        //
        // 0 = A * x + b'
        //
        // Solve for x:
        //
        // x = - inv(A) * b'
        //
        const x = Mat22.mulVec2(this.v_normalMass, b).neg();

        if (x.x >= 0.0 && x.y >= 0.0) {
          // Get the incremental impulse
          const d = Vec2.sub(x, a);

          // Apply incremental impulse
          const P1 = Vec2.mulNumVec2(d.x, normal);
          const P2 = Vec2.mulNumVec2(d.y, normal);

          vA.subCombine(mA, P1, mA, P2);
          wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));

          vB.addCombine(mB, P1, mB, P2);
          wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            dv1 = Vec2.sub(Vec2.add(vB, Vec2.crossNumVec2(wB, vcp1.rB)), Vec2.add(vA, Vec2.crossNumVec2(wA, vcp1.rA)));
            dv2 = Vec2.sub(Vec2.add(vB, Vec2.crossNumVec2(wB, vcp2.rB)), Vec2.add(vA, Vec2.crossNumVec2(wA, vcp2.rA)));

            // Compute normal velocity
            vn1 = Vec2.dot(dv1, normal);
            vn2 = Vec2.dot(dv2, normal);

            _ASSERT && common.assert(Math.abs(vn1 - vcp1.velocityBias) < k_errorTol);
            _ASSERT && common.assert(Math.abs(vn2 - vcp2.velocityBias) < k_errorTol);
          }
          break;
        }

        //
        // Case 2: vn1 = 0 and x2 = 0
        //
        // 0 = a11 * x1 + a12 * 0 + b1'
        // vn2 = a21 * x1 + a22 * 0 + b2'
        //
        x.x = -vcp1.normalMass * b.x;
        x.y = 0.0;
        vn1 = 0.0;
        vn2 = this.v_K.ex.y * x.x + b.y;

        if (x.x >= 0.0 && vn2 >= 0.0) {
          // Get the incremental impulse
          const d = Vec2.sub(x, a);

          // Apply incremental impulse
          const P1 = Vec2.mulNumVec2(d.x, normal);
          const P2 = Vec2.mulNumVec2(d.y, normal);
          vA.subCombine(mA, P1, mA, P2);
          wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));

          vB.addCombine(mB, P1, mB, P2);
          wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            const dv1B = Vec2.add(vB, Vec2.crossNumVec2(wB, vcp1.rB));
            const dv1A = Vec2.add(vA, Vec2.crossNumVec2(wA, vcp1.rA));
            const dv1 = Vec2.sub(dv1B, dv1A);

            // Compute normal velocity
            vn1 = Vec2.dot(dv1, normal);

            _ASSERT && common.assert(Math.abs(vn1 - vcp1.velocityBias) < k_errorTol);
          }
          break;
        }

        //
        // Case 3: vn2 = 0 and x1 = 0
        //
        // vn1 = a11 * 0 + a12 * x2 + b1'
        // 0 = a21 * 0 + a22 * x2 + b2'
        //
        x.x = 0.0;
        x.y = -vcp2.normalMass * b.y;
        vn1 = this.v_K.ey.x * x.y + b.x;
        vn2 = 0.0;

        if (x.y >= 0.0 && vn1 >= 0.0) {
          // Resubstitute for the incremental impulse
          const d = Vec2.sub(x, a);

          // Apply incremental impulse
          const P1 = Vec2.mulNumVec2(d.x, normal);
          const P2 = Vec2.mulNumVec2(d.y, normal);
          vA.subCombine(mA, P1, mA, P2);
          wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));

          vB.addCombine(mB, P1, mB, P2);
          wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            const dv2B = Vec2.add(vB, Vec2.crossNumVec2(wB, vcp2.rB));
            const dv2A = Vec2.add(vA, Vec2.crossNumVec2(wA, vcp2.rA));
            const dv1 = Vec2.sub(dv2B, dv2A);

            // Compute normal velocity
            vn2 = Vec2.dot(dv2, normal);

            _ASSERT && common.assert(Math.abs(vn2 - vcp2.velocityBias) < k_errorTol);
          }
          break;
        }

        //
        // Case 4: x1 = 0 and x2 = 0
        //
        // vn1 = b1
        // vn2 = b2;
        //
        x.x = 0.0;
        x.y = 0.0;
        vn1 = b.x;
        vn2 = b.y;

        if (vn1 >= 0.0 && vn2 >= 0.0) {
          // Resubstitute for the incremental impulse
          const d = Vec2.sub(x, a);

          // Apply incremental impulse
          const P1 = Vec2.mulNumVec2(d.x, normal);
          const P2 = Vec2.mulNumVec2(d.y, normal);
          vA.subCombine(mA, P1, mA, P2);
          wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));

          vB.addCombine(mB, P1, mB, P2);
          wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          break;
        }

        // No solution, give up. This is hit sometimes, but it doesn't seem to
        // matter.
        break;
      }
    }

    velocityA.v.setVec2(vA);
    velocityA.w = wA;

    velocityB.v.setVec2(vB);
    velocityB.w = wB;
  }

  /**
   * @internal
   */
  static addType(type1: ShapeType, type2: ShapeType, callback: ContactCallback): void {
    s_registers[type1] = s_registers[type1] || {};
    s_registers[type1][type2] = callback;
  }

  /**
   * @internal
   */
  static create(fixtureA: Fixture, indexA: number, fixtureB: Fixture, indexB: number): Contact | null {
    const typeA = fixtureA.getType();
    const typeB = fixtureB.getType();

    // TODO: pool contacts
    let contact;
    let evaluateFcn;
    if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
      contact = new Contact(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
    } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
      contact = new Contact(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
    } else {
      return null;
    }

    // Contact creation may swap fixtures.
    fixtureA = contact.getFixtureA();
    fixtureB = contact.getFixtureB();
    indexA = contact.getChildIndexA();
    indexB = contact.getChildIndexB();
    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    // Connect to body A
    contact.m_nodeA.contact = contact;
    contact.m_nodeA.other = bodyB;

    contact.m_nodeA.prev = null;
    contact.m_nodeA.next = bodyA.m_contactList;
    if (bodyA.m_contactList != null) {
      bodyA.m_contactList.prev = contact.m_nodeA;
    }
    bodyA.m_contactList = contact.m_nodeA;

    // Connect to body B
    contact.m_nodeB.contact = contact;
    contact.m_nodeB.other = bodyA;

    contact.m_nodeB.prev = null;
    contact.m_nodeB.next = bodyB.m_contactList;
    if (bodyB.m_contactList != null) {
      bodyB.m_contactList.prev = contact.m_nodeB;
    }
    bodyB.m_contactList = contact.m_nodeB;

    // Wake up the bodies
    if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
      bodyA.setAwake(true);
      bodyB.setAwake(true);
    }

    return contact;
  }

  /**
   * @internal
   */
  static destroy(contact: Contact, listener: { endContact: (contact: Contact) => void }): void {
    const fixtureA = contact.m_fixtureA;
    const fixtureB = contact.m_fixtureB;

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    if (contact.isTouching()) {
      listener.endContact(contact);
    }

    // Remove from body 1
    if (contact.m_nodeA.prev) {
      contact.m_nodeA.prev.next = contact.m_nodeA.next;
    }

    if (contact.m_nodeA.next) {
      contact.m_nodeA.next.prev = contact.m_nodeA.prev;
    }

    if (contact.m_nodeA == bodyA.m_contactList) {
      bodyA.m_contactList = contact.m_nodeA.next;
    }

    // Remove from body 2
    if (contact.m_nodeB.prev) {
      contact.m_nodeB.prev.next = contact.m_nodeB.next;
    }

    if (contact.m_nodeB.next) {
      contact.m_nodeB.next.prev = contact.m_nodeB.prev;
    }

    if (contact.m_nodeB == bodyB.m_contactList) {
      bodyB.m_contactList = contact.m_nodeB.next;
    }

    if (contact.m_manifold.pointCount > 0 && fixtureA.isSensor() == false
      && fixtureB.isSensor() == false) {
      bodyA.setAwake(true);
      bodyB.setAwake(true);
    }

    const typeA = fixtureA.getType();
    const typeB = fixtureB.getType();

    // const destroyFcn = s_registers[typeA][typeB].destroyFcn;
    // if (typeof destroyFcn === 'function') {
    //   destroyFcn(contact);
    // }
  }
}
