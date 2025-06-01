/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../common/Matrix";
import { ShapeType } from "../collision/Shape";
import { clamp } from "../common/Math";
import { TransformValue } from "../common/Transform";
import { Mat22 } from "../common/Mat22";
import { SettingsInternal as Settings } from "../Settings";
import { Manifold, ManifoldType, WorldManifold } from "../collision/Manifold";
import { testOverlap } from "../collision/Distance";
import { Fixture } from "./Fixture";
import { Body } from "./Body";
import { ContactImpulse, TimeStep } from "./Solver";
import { Pool } from "../util/Pool";
import { getTransform } from "./Position";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;

// Solver debugging is normally disabled because the block solver sometimes has to deal with a poorly conditioned effective mass matrix.
/** @internal */ const DEBUG_SOLVER = false;

/** @internal */ const contactPool = new Pool<Contact>({
  create() {
    return new Contact();
  },
  release(contact: Contact) {
    contact.recycle();
  },
});

/** @internal */ const oldManifold = new Manifold();

/** @internal */ const worldManifold = new WorldManifold();

/**
 * A contact edge is used to connect bodies and contacts together in a contact
 * graph where each body is a node and each contact is an edge. A contact edge
 * belongs to a doubly linked list maintained in each attached body. Each
 * contact has two contact nodes, one for each attached body.
 */
export class ContactEdge {
  contact: Contact;
  prev: ContactEdge | null = null;
  next: ContactEdge | null = null;
  other: Body | null = null;
  constructor(contact: Contact) {
    this.contact = contact;
  }

  /** @internal */
  recycle() {
    this.prev = null;
    this.next = null;
    this.other = null;
  }
}

export type EvaluateFunction = (
  manifold: Manifold,
  xfA: TransformValue,
  fixtureA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fixtureB: Fixture,
  indexB: number,
) => void;

/**
 * Friction mixing law. The idea is to allow either fixture to drive the
 * friction to zero. For example, anything slides on ice.
 */
export function mixFriction(friction1: number, friction2: number): number {
  return math_sqrt(friction1 * friction2);
}

/**
 * Restitution mixing law. The idea is allow for anything to bounce off an
 * inelastic surface. For example, a superball bounces on anything.
 */
export function mixRestitution(restitution1: number, restitution2: number): number {
  return restitution1 > restitution2 ? restitution1 : restitution2;
}

// TODO: move this to Settings?
/** @internal */ const s_registers = [];

// TODO: merge with ManifoldPoint?
export class VelocityConstraintPoint {
  rA = matrix.vec2(0, 0);
  rB = matrix.vec2(0, 0);
  normalImpulse = 0;
  tangentImpulse = 0;
  normalMass = 0;
  tangentMass = 0;
  velocityBias = 0;

  recycle() {
    matrix.zeroVec2(this.rA);
    matrix.zeroVec2(this.rB);
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
    this.normalMass = 0;
    this.tangentMass = 0;
    this.velocityBias = 0;
  }
}

/** @internal */ const cA = matrix.vec2(0, 0);
/** @internal */ const vA = matrix.vec2(0, 0);
/** @internal */ const cB = matrix.vec2(0, 0);
/** @internal */ const vB = matrix.vec2(0, 0);
/** @internal */ const tangent = matrix.vec2(0, 0);
/** @internal */ const xfA = matrix.transform(0, 0, 0);
/** @internal */ const xfB = matrix.transform(0, 0, 0);
/** @internal */ const pointA = matrix.vec2(0, 0);
/** @internal */ const pointB = matrix.vec2(0, 0);
/** @internal */ const clipPoint = matrix.vec2(0, 0);
/** @internal */ const planePoint = matrix.vec2(0, 0);
/** @internal */ const rA = matrix.vec2(0, 0);
/** @internal */ const rB = matrix.vec2(0, 0);
/** @internal */ const P = matrix.vec2(0, 0);
/** @internal */ const normal = matrix.vec2(0, 0);
/** @internal */ const point = matrix.vec2(0, 0);
/** @internal */ const dv = matrix.vec2(0, 0);
/** @internal */ const dv1 = matrix.vec2(0, 0);
/** @internal */ const dv2 = matrix.vec2(0, 0);
/** @internal */ const b = matrix.vec2(0, 0);
/** @internal */ const a = matrix.vec2(0, 0);
/** @internal */ const x = matrix.vec2(0, 0);
/** @internal */ const d = matrix.vec2(0, 0);
/** @internal */ const P1 = matrix.vec2(0, 0);
/** @internal */ const P2 = matrix.vec2(0, 0);
/** @internal */ const temp = matrix.vec2(0, 0);

/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 */
export class Contact {
  // Nodes for connecting bodies.
  /** @internal */ m_nodeA = new ContactEdge(this);
  /** @internal */ m_nodeB = new ContactEdge(this);
  /** @internal */ m_fixtureA: Fixture | null = null;
  /** @internal */ m_fixtureB: Fixture | null = null;
  /** @internal */ m_indexA = -1;
  /** @internal */ m_indexB = -1;
  /** @internal */ m_evaluateFcn: EvaluateFunction | null = null;
  /** @internal */ m_manifold: Manifold = new Manifold();
  /** @internal */ m_prev: Contact | null = null;
  /** @internal */ m_next: Contact | null = null;
  /** @internal */ m_toi = 1.0;
  /** @internal */ m_toiCount = 0;
  // This contact has a valid TOI in m_toi
  /** @internal */ m_toiFlag = false;
  /** @internal */ m_friction = 0.0;
  /** @internal */ m_restitution = 0.0;
  /** @internal */ m_tangentSpeed = 0.0;
  /** @internal This contact can be disabled (by user) */
  m_enabledFlag = true;
  /** @internal Used when crawling contact graph when forming islands. */
  m_islandFlag = false;
  /** @internal Set when the shapes are touching. */
  m_touchingFlag = false;
  /** @internal This contact needs filtering because a fixture filter was changed. */
  m_filterFlag = false;
  /** @internal This bullet contact had a TOI event */
  m_bulletHitFlag = false;

  /** @internal Contact reporting impulse object cache */
  m_impulse: ContactImpulse = new ContactImpulse(this);

  // VelocityConstraint
  /** @internal */ v_points = [new VelocityConstraintPoint(), new VelocityConstraintPoint()]; // [maxManifoldPoints];
  /** @internal */ v_normal = matrix.vec2(0, 0);
  /** @internal */ v_normalMass: Mat22 = new Mat22();
  /** @internal */ v_K: Mat22 = new Mat22();
  /** @internal */ v_pointCount = 0;
  /** @internal */ v_tangentSpeed = 0;
  /** @internal */ v_friction = 0;
  /** @internal */ v_restitution = 0;
  /** @internal */ v_invMassA = 0;
  /** @internal */ v_invMassB = 0;
  /** @internal */ v_invIA = 0;
  /** @internal */ v_invIB = 0;

  // PositionConstraint
  /** @internal */ p_localPoints = [matrix.vec2(0, 0), matrix.vec2(0, 0)]; // [maxManifoldPoints];
  /** @internal */ p_localNormal = matrix.vec2(0, 0);
  /** @internal */ p_localPoint = matrix.vec2(0, 0);
  /** @internal */ p_localCenterA = matrix.vec2(0, 0);
  /** @internal */ p_localCenterB = matrix.vec2(0, 0);
  /** @internal */ p_type = ManifoldType.e_unset;
  /** @internal */ p_radiusA = 0;
  /** @internal */ p_radiusB = 0;
  /** @internal */ p_pointCount = 0;
  /** @internal */ p_invMassA = 0;
  /** @internal */ p_invMassB = 0;
  /** @internal */ p_invIA = 0;
  /** @internal */ p_invIB = 0;

  /** @internal */
  initialize(fA: Fixture, indexA: number, fB: Fixture, indexB: number, evaluateFcn: EvaluateFunction) {
    this.m_fixtureA = fA;
    this.m_fixtureB = fB;

    this.m_indexA = indexA;
    this.m_indexB = indexB;

    this.m_evaluateFcn = evaluateFcn;

    this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
    this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
  }

  /** @internal */
  recycle() {
    this.m_nodeA.recycle();
    this.m_nodeB.recycle();
    this.m_fixtureA = null;
    this.m_fixtureB = null;
    this.m_indexA = -1;
    this.m_indexB = -1;
    this.m_evaluateFcn = null;
    this.m_manifold.recycle();
    this.m_prev = null;
    this.m_next = null;
    this.m_toi = 1;
    this.m_toiCount = 0;
    this.m_toiFlag = false;
    this.m_friction = 0;
    this.m_restitution = 0;
    this.m_tangentSpeed = 0;
    this.m_enabledFlag = true;
    this.m_islandFlag = false;
    this.m_touchingFlag = false;
    this.m_filterFlag = false;
    this.m_bulletHitFlag = false;

    this.m_impulse.recycle();

    // VelocityConstraint
    for (const point of this.v_points) {
      point.recycle();
    }
    matrix.zeroVec2(this.v_normal);
    this.v_normalMass.setZero();
    this.v_K.setZero();
    this.v_pointCount = 0;
    this.v_tangentSpeed = 0;
    this.v_friction = 0;
    this.v_restitution = 0;
    this.v_invMassA = 0;
    this.v_invMassB = 0;
    this.v_invIA = 0;
    this.v_invIB = 0;

    // PositionConstraint
    for (const point of this.p_localPoints) {
      matrix.zeroVec2(point);
    }
    matrix.zeroVec2(this.p_localNormal);
    matrix.zeroVec2(this.p_localPoint);
    matrix.zeroVec2(this.p_localCenterA);
    matrix.zeroVec2(this.p_localCenterB);
    this.p_type = ManifoldType.e_unset;
    this.p_radiusA = 0;
    this.p_radiusB = 0;
    this.p_pointCount = 0;
    this.p_invMassA = 0;
    this.p_invMassB = 0;
    this.p_invIA = 0;
    this.p_invIB = 0;
  }

  initConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;
    const shapeA = fixtureA.m_shape;
    const shapeB = fixtureB.m_shape;
    if (shapeA === null || shapeB === null) return;

    const manifold = this.m_manifold;

    const pointCount = manifold.pointCount;
    if (_ASSERT) console.assert(pointCount > 0);

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
    matrix.copyVec2(this.p_localCenterA, bodyA.m_sweep.localCenter);
    matrix.copyVec2(this.p_localCenterB, bodyB.m_sweep.localCenter);

    this.p_radiusA = shapeA.m_radius;
    this.p_radiusB = shapeB.m_radius;

    this.p_type = manifold.type;
    matrix.copyVec2(this.p_localNormal, manifold.localNormal);
    matrix.copyVec2(this.p_localPoint, manifold.localPoint);
    this.p_pointCount = pointCount;

    for (let j = 0; j < Settings.maxManifoldPoints; ++j) {
      this.v_points[j].recycle();
      matrix.zeroVec2(this.p_localPoints[j]);
    }

    for (let j = 0; j < pointCount; ++j) {
      const cp = manifold.points[j];
      const vcp = this.v_points[j];
      if (step.warmStarting) {
        vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
        vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
      }
      matrix.copyVec2(this.p_localPoints[j], cp.localPoint);
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
  getWorldManifold(worldManifold: WorldManifold | null): WorldManifold | undefined {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;
    const shapeA = fixtureA.m_shape;
    const shapeB = fixtureB.m_shape;
    if (shapeA === null || shapeB === null) return;

    return this.m_manifold.getWorldManifold(
      worldManifold,
      bodyA.getTransform(),
      shapeA.m_radius,
      bodyB.getTransform(),
      shapeB.m_radius,
    );
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
   * "pre-solve" callback. This value persists until set or reset.
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
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    this.m_friction = mixFriction(fixtureA.m_friction, fixtureB.m_friction);
  }

  /**
   * Override the default restitution mixture. You can call this in
   * "pre-solve" callback. The value persists until you set or reset.
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
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    this.m_restitution = mixRestitution(fixtureA.m_restitution, fixtureB.m_restitution);
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
  evaluate(manifold: Manifold, xfA: TransformValue, xfB: TransformValue): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    this.m_evaluateFcn(manifold, xfA, fixtureA, this.m_indexA, xfB, fixtureB, this.m_indexB);
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
    beginContact(contact: Contact): void;
    endContact(contact: Contact): void;
    preSolve(contact: Contact, oldManifold: Manifold): void;
  }): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;
    const shapeA = fixtureA.m_shape;
    const shapeB = fixtureB.m_shape;
    if (shapeA === null || shapeB === null) return;

    // Re-enable this contact.
    this.m_enabledFlag = true;

    let touching = false;
    const wasTouching = this.m_touchingFlag;

    const sensorA = fixtureA.m_isSensor;
    const sensorB = fixtureB.m_isSensor;
    const sensor = sensorA || sensorB;

    const xfA = bodyA.m_xf;
    const xfB = bodyB.m_xf;

    // Is this contact a sensor?
    if (sensor) {
      touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);

      // Sensors don't generate manifolds.
      this.m_manifold.pointCount = 0;
    } else {
      oldManifold.recycle();
      oldManifold.set(this.m_manifold);
      this.m_manifold.recycle();

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
          if (omp.id.key === nmp.id.key) {
            nmp.normalImpulse = omp.normalImpulse;
            nmp.tangentImpulse = omp.tangentImpulse;
            break;
          }
        }
      }

      if (touching !== wasTouching) {
        bodyA.setAwake(true);
        bodyB.setAwake(true);
      }
    }

    this.m_touchingFlag = touching;

    const hasListener = typeof listener === "object" && listener !== null;

    if (!wasTouching && touching && hasListener) {
      listener.beginContact(this);
    }

    if (wasTouching && !touching && hasListener) {
      listener.endContact(this);
    }

    if (!sensor && touching && hasListener && oldManifold) {
      listener.preSolve(this, oldManifold);
    }
  }

  solvePositionConstraint(step: TimeStep): number {
    return this._solvePositionConstraint(step, null, null);
  }

  solvePositionConstraintTOI(step: TimeStep, toiA: Body, toiB: Body): number {
    return this._solvePositionConstraint(step, toiA, toiB);
  }

  private _solvePositionConstraint(step: TimeStep, toiA: Body | null, toiB: Body | null): number {
    const toi = toiA !== null && toiB !== null ? true : false;
    let minSeparation = 0.0;

    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return minSeparation;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return minSeparation;

    // const velocityA = bodyA.c_velocity;
    // const velocityB = bodyB.c_velocity;
    const positionA = bodyA.c_position;
    const positionB = bodyB.c_position;

    const localCenterA = this.p_localCenterA;
    const localCenterB = this.p_localCenterB;

    let mA = 0.0;
    let iA = 0.0;
    if (!toi || bodyA === toiA || bodyA === toiB) {
      mA = this.p_invMassA;
      iA = this.p_invIA;
    }

    let mB = 0.0;
    let iB = 0.0;
    if (!toi || bodyB === toiA || bodyB === toiB) {
      mB = this.p_invMassB;
      iB = this.p_invIB;
    }

    matrix.copyVec2(cA, positionA.c);
    let aA = positionA.a;

    matrix.copyVec2(cB, positionB.c);
    let aB = positionB.a;

    // Solve normal constraints
    for (let j = 0; j < this.p_pointCount; ++j) {
      getTransform(xfA, localCenterA, cA, aA);
      getTransform(xfB, localCenterB, cB, aB);

      // PositionSolverManifold
      let separation: number;
      switch (this.p_type) {
        case ManifoldType.e_circles: {
          matrix.transformVec2(pointA, xfA, this.p_localPoint);
          matrix.transformVec2(pointB, xfB, this.p_localPoints[0]);
          matrix.subVec2(normal, pointB, pointA);
          matrix.normalizeVec2(normal);

          matrix.combine2Vec2(point, 0.5, pointA, 0.5, pointB);
          separation =
            matrix.dotVec2(pointB, normal) - matrix.dotVec2(pointA, normal) - this.p_radiusA - this.p_radiusB;
          break;
        }

        case ManifoldType.e_faceA: {
          matrix.rotVec2(normal, xfA.q, this.p_localNormal);
          matrix.transformVec2(planePoint, xfA, this.p_localPoint);
          matrix.transformVec2(clipPoint, xfB, this.p_localPoints[j]);
          separation =
            matrix.dotVec2(clipPoint, normal) - matrix.dotVec2(planePoint, normal) - this.p_radiusA - this.p_radiusB;
          matrix.copyVec2(point, clipPoint);
          break;
        }

        case ManifoldType.e_faceB: {
          matrix.rotVec2(normal, xfB.q, this.p_localNormal);
          matrix.transformVec2(planePoint, xfB, this.p_localPoint);
          matrix.transformVec2(clipPoint, xfA, this.p_localPoints[j]);
          separation =
            matrix.dotVec2(clipPoint, normal) - matrix.dotVec2(planePoint, normal) - this.p_radiusA - this.p_radiusB;
          matrix.copyVec2(point, clipPoint);

          // Ensure normal points from A to B
          matrix.negVec2(normal);
          break;
        }
        // todo: what should we do here?
        default: {
          return minSeparation;
        }
      }

      matrix.subVec2(rA, point, cA);
      matrix.subVec2(rB, point, cB);

      // Track max constraint error.
      minSeparation = math_min(minSeparation, separation);

      const baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
      const linearSlop = Settings.linearSlop;
      const maxLinearCorrection = Settings.maxLinearCorrection;

      // Prevent large corrections and allow slop.
      const C = clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0.0);

      // Compute the effective mass.
      const rnA = matrix.crossVec2Vec2(rA, normal);
      const rnB = matrix.crossVec2Vec2(rB, normal);
      const K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

      // Compute normal impulse
      const impulse = K > 0.0 ? -C / K : 0.0;

      matrix.scaleVec2(P, impulse, normal);

      matrix.minusScaleVec2(cA, mA, P);
      aA -= iA * matrix.crossVec2Vec2(rA, P);

      matrix.plusScaleVec2(cB, mB, P);
      aB += iB * matrix.crossVec2Vec2(rB, P);
    }

    matrix.copyVec2(positionA.c, cA);
    positionA.a = aA;

    matrix.copyVec2(positionB.c, cB);
    positionB.a = aB;

    return minSeparation;
  }

  initVelocityConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;

    const velocityA = bodyA.c_velocity;
    const velocityB = bodyB.c_velocity;

    const positionA = bodyA.c_position;
    const positionB = bodyB.c_position;

    const radiusA = this.p_radiusA;
    const radiusB = this.p_radiusB;
    const manifold = this.m_manifold;

    const mA = this.v_invMassA;
    const mB = this.v_invMassB;
    const iA = this.v_invIA;
    const iB = this.v_invIB;
    const localCenterA = this.p_localCenterA;
    const localCenterB = this.p_localCenterB;

    matrix.copyVec2(cA, positionA.c);
    const aA = positionA.a;
    matrix.copyVec2(vA, velocityA.v);
    const wA = velocityA.w;

    matrix.copyVec2(cB, positionB.c);
    const aB = positionB.a;
    matrix.copyVec2(vB, velocityB.v);
    const wB = velocityB.w;

    if (_ASSERT) console.assert(manifold.pointCount > 0);

    getTransform(xfA, localCenterA, cA, aA);
    getTransform(xfB, localCenterB, cB, aB);

    worldManifold.recycle();
    manifold.getWorldManifold(worldManifold, xfA, radiusA, xfB, radiusB);

    matrix.copyVec2(this.v_normal, worldManifold.normal);

    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint
      const wmp = worldManifold.points[j];

      matrix.subVec2(vcp.rA, wmp, cA);
      matrix.subVec2(vcp.rB, wmp, cB);

      const rnA = matrix.crossVec2Vec2(vcp.rA, this.v_normal);
      const rnB = matrix.crossVec2Vec2(vcp.rB, this.v_normal);

      const kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

      vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;

      matrix.crossVec2Num(tangent, this.v_normal, 1.0);

      const rtA = matrix.crossVec2Vec2(vcp.rA, tangent);
      const rtB = matrix.crossVec2Vec2(vcp.rB, tangent);

      const kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;

      vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;

      // Setup a velocity bias for restitution.
      vcp.velocityBias = 0.0;
      let vRel = 0;
      vRel += matrix.dotVec2(this.v_normal, vB);
      vRel += matrix.dotVec2(this.v_normal, matrix.crossNumVec2(temp, wB, vcp.rB));
      vRel -= matrix.dotVec2(this.v_normal, vA);
      vRel -= matrix.dotVec2(this.v_normal, matrix.crossNumVec2(temp, wA, vcp.rA));
      if (vRel < -Settings.velocityThreshold) {
        vcp.velocityBias = -this.v_restitution * vRel;
      }
    }

    // If we have two points, then prepare the block solver.
    if (this.v_pointCount == 2 && step.blockSolve) {
      const vcp1 = this.v_points[0]; // VelocityConstraintPoint
      const vcp2 = this.v_points[1]; // VelocityConstraintPoint

      const rn1A = matrix.crossVec2Vec2(vcp1.rA, this.v_normal);
      const rn1B = matrix.crossVec2Vec2(vcp1.rB, this.v_normal);
      const rn2A = matrix.crossVec2Vec2(vcp2.rA, this.v_normal);
      const rn2B = matrix.crossVec2Vec2(vcp2.rB, this.v_normal);

      const k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
      const k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
      const k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;

      // Ensure a reasonable condition number.
      const k_maxConditionNumber = 1000.0;
      if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
        // K is safe to invert.
        this.v_K.ex.setNum(k11, k12);
        this.v_K.ey.setNum(k12, k22);
        // this.v_normalMass.set(this.v_K.getInverse());
        const a = this.v_K.ex.x;
        const b = this.v_K.ey.x;
        const c = this.v_K.ex.y;
        const d = this.v_K.ey.y;
        let det = a * d - b * c;
        if (det !== 0.0) {
          det = 1.0 / det;
        }
        this.v_normalMass.ex.x = det * d;
        this.v_normalMass.ey.x = -det * b;
        this.v_normalMass.ex.y = -det * c;
        this.v_normalMass.ey.y = det * a;
      } else {
        // The constraints are redundant, just use one.
        // TODO_ERIN use deepest?
        this.v_pointCount = 1;
      }
    }

    matrix.copyVec2(positionA.c, cA);
    positionA.a = aA;
    matrix.copyVec2(velocityA.v, vA);
    velocityA.w = wA;

    matrix.copyVec2(positionB.c, cB);
    positionB.a = aB;
    matrix.copyVec2(velocityB.v, vB);
    velocityB.w = wB;
  }

  warmStartConstraint(step: TimeStep): void {
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;

    const velocityA = bodyA.c_velocity;
    const velocityB = bodyB.c_velocity;
    // const positionA = bodyA.c_position;
    // const positionB = bodyB.c_position;

    const mA = this.v_invMassA;
    const iA = this.v_invIA;
    const mB = this.v_invMassB;
    const iB = this.v_invIB;

    matrix.copyVec2(vA, velocityA.v);
    let wA = velocityA.w;
    matrix.copyVec2(vB, velocityB.v);
    let wB = velocityB.w;

    matrix.copyVec2(normal, this.v_normal);
    matrix.crossVec2Num(tangent, normal, 1.0);

    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint

      matrix.combine2Vec2(P, vcp.normalImpulse, normal, vcp.tangentImpulse, tangent);

      wA -= iA * matrix.crossVec2Vec2(vcp.rA, P);
      matrix.minusScaleVec2(vA, mA, P);
      wB += iB * matrix.crossVec2Vec2(vcp.rB, P);
      matrix.plusScaleVec2(vB, mB, P);
    }

    matrix.copyVec2(velocityA.v, vA);
    velocityA.w = wA;
    matrix.copyVec2(velocityB.v, vB);
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
    const fixtureA = this.m_fixtureA;
    const fixtureB = this.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;

    const velocityA = bodyA.c_velocity;
    // const positionA = bodyA.c_position;

    const velocityB = bodyB.c_velocity;
    // const positionB = bodyB.c_position;

    const mA = this.v_invMassA;
    const iA = this.v_invIA;
    const mB = this.v_invMassB;
    const iB = this.v_invIB;

    matrix.copyVec2(vA, velocityA.v);
    let wA = velocityA.w;
    matrix.copyVec2(vB, velocityB.v);
    let wB = velocityB.w;

    matrix.copyVec2(normal, this.v_normal);
    matrix.crossVec2Num(tangent, normal, 1.0);
    const friction = this.v_friction;

    if (_ASSERT) console.assert(this.v_pointCount == 1 || this.v_pointCount == 2);

    // Solve tangent constraints first because non-penetration is more important
    // than friction.
    for (let j = 0; j < this.v_pointCount; ++j) {
      const vcp = this.v_points[j]; // VelocityConstraintPoint

      // Relative velocity at contact
      matrix.zeroVec2(dv);
      matrix.plusVec2(dv, vB);
      matrix.plusVec2(dv, matrix.crossNumVec2(temp, wB, vcp.rB));
      matrix.minusVec2(dv, vA);
      matrix.minusVec2(dv, matrix.crossNumVec2(temp, wA, vcp.rA));

      // Compute tangent force
      const vt = matrix.dotVec2(dv, tangent) - this.v_tangentSpeed;
      let lambda = vcp.tangentMass * -vt;

      // Clamp the accumulated force
      const maxFriction = friction * vcp.normalImpulse;
      const newImpulse = clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
      lambda = newImpulse - vcp.tangentImpulse;
      vcp.tangentImpulse = newImpulse;

      // Apply contact impulse
      matrix.scaleVec2(P, lambda, tangent);

      matrix.minusScaleVec2(vA, mA, P);
      wA -= iA * matrix.crossVec2Vec2(vcp.rA, P);

      matrix.plusScaleVec2(vB, mB, P);
      wB += iB * matrix.crossVec2Vec2(vcp.rB, P);
    }

    // Solve normal constraints
    if (this.v_pointCount == 1 || step.blockSolve == false) {
      for (let i = 0; i < this.v_pointCount; ++i) {
        const vcp = this.v_points[i]; // VelocityConstraintPoint

        // Relative velocity at contact
        matrix.zeroVec2(dv);
        matrix.plusVec2(dv, vB);
        matrix.plusVec2(dv, matrix.crossNumVec2(temp, wB, vcp.rB));
        matrix.minusVec2(dv, vA);
        matrix.minusVec2(dv, matrix.crossNumVec2(temp, wA, vcp.rA));

        // Compute normal impulse
        const vn = matrix.dotVec2(dv, normal);
        let lambda = -vcp.normalMass * (vn - vcp.velocityBias);

        // Clamp the accumulated impulse
        const newImpulse = math_max(vcp.normalImpulse + lambda, 0.0);
        lambda = newImpulse - vcp.normalImpulse;
        vcp.normalImpulse = newImpulse;

        // Apply contact impulse
        matrix.scaleVec2(P, lambda, normal);

        matrix.minusScaleVec2(vA, mA, P);
        wA -= iA * matrix.crossVec2Vec2(vcp.rA, P);

        matrix.plusScaleVec2(vB, mB, P);
        wB += iB * matrix.crossVec2Vec2(vcp.rB, P);
      }
    } else {
      // Block solver developed in collaboration with Dirk Gregorius (back in
      // 01/07 on Box2D_Lite).
      // Build the mini LCP for this contact patch
      //
      // vn = A * x + b, vn >= 0, x >= 0 and vn_i * x_i = 0 with i = 1..2
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

      matrix.setVec2(a, vcp1.normalImpulse, vcp2.normalImpulse);
      if (_ASSERT) console.assert(a.x >= 0.0 && a.y >= 0.0);

      // Relative velocity at contact
      // let dv1 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp1.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp1.rA));
      matrix.zeroVec2(dv1);
      matrix.plusVec2(dv1, vB);
      matrix.plusVec2(dv1, matrix.crossNumVec2(temp, wB, vcp1.rB));
      matrix.minusVec2(dv1, vA);
      matrix.minusVec2(dv1, matrix.crossNumVec2(temp, wA, vcp1.rA));

      // let dv2 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp2.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp2.rA));
      matrix.zeroVec2(dv2);
      matrix.plusVec2(dv2, vB);
      matrix.plusVec2(dv2, matrix.crossNumVec2(temp, wB, vcp2.rB));
      matrix.minusVec2(dv2, vA);
      matrix.minusVec2(dv2, matrix.crossNumVec2(temp, wA, vcp2.rA));

      // Compute normal velocity
      let vn1 = matrix.dotVec2(dv1, normal);
      let vn2 = matrix.dotVec2(dv2, normal);

      matrix.setVec2(b, vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);

      // Compute b'
      // b.sub(Mat22.mulVec2(this.v_K, a));
      b.x -= this.v_K.ex.x * a.x + this.v_K.ey.x * a.y;
      b.y -= this.v_K.ex.y * a.x + this.v_K.ey.y * a.y;

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
        // const x = Mat22.mulVec2(this.v_normalMass, b).neg();
        matrix.zeroVec2(x);
        x.x = -(this.v_normalMass.ex.x * b.x + this.v_normalMass.ey.x * b.y);
        x.y = -(this.v_normalMass.ex.y * b.x + this.v_normalMass.ey.y * b.y);

        if (x.x >= 0.0 && x.y >= 0.0) {
          // Get the incremental impulse
          matrix.subVec2(d, x, a);

          // Apply incremental impulse
          matrix.scaleVec2(P1, d.x, normal);
          matrix.scaleVec2(P2, d.y, normal);

          // vA.subCombine(mA, P1, mA, P2);
          matrix.combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
          wA -= iA * (matrix.crossVec2Vec2(vcp1.rA, P1) + matrix.crossVec2Vec2(vcp2.rA, P2));

          // vB.addCombine(mB, P1, mB, P2);
          matrix.combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
          wB += iB * (matrix.crossVec2Vec2(vcp1.rB, P1) + matrix.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            matrix.zeroVec2(dv1);
            matrix.plusVec2(dv1, vB);
            matrix.plusVec2(dv1, matrix.crossNumVec2(temp, wB, vcp1.rB));
            matrix.minusVec2(dv1, vA);
            matrix.minusVec2(dv1, matrix.crossNumVec2(temp, wA, vcp1.rA));

            matrix.zeroVec2(dv2);
            matrix.plusVec2(dv2, vB);
            matrix.plusVec2(dv2, matrix.crossNumVec2(temp, wB, vcp2.rB));
            matrix.minusVec2(dv2, vA);
            matrix.minusVec2(dv2, matrix.crossNumVec2(temp, wA, vcp2.rA));

            // Compute normal velocity
            vn1 = matrix.dotVec2(dv1, normal);
            vn2 = matrix.dotVec2(dv2, normal);

            if (_ASSERT) console.assert(math_abs(vn1 - vcp1.velocityBias) < k_errorTol);
            if (_ASSERT) console.assert(math_abs(vn2 - vcp2.velocityBias) < k_errorTol);
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
          matrix.subVec2(d, x, a);

          // Apply incremental impulse
          matrix.scaleVec2(P1, d.x, normal);
          matrix.scaleVec2(P2, d.y, normal);

          // vA.subCombine(mA, P1, mA, P2);
          matrix.combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
          wA -= iA * (matrix.crossVec2Vec2(vcp1.rA, P1) + matrix.crossVec2Vec2(vcp2.rA, P2));

          // vB.addCombine(mB, P1, mB, P2);
          matrix.combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
          wB += iB * (matrix.crossVec2Vec2(vcp1.rB, P1) + matrix.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            matrix.zeroVec2(dv1);
            matrix.plusVec2(dv1, vB);
            matrix.plusVec2(dv1, matrix.crossNumVec2(temp, wB, vcp1.rB));
            matrix.minusVec2(dv1, vA);
            matrix.minusVec2(dv1, matrix.crossNumVec2(temp, wA, vcp1.rA));

            // Compute normal velocity
            vn1 = matrix.dotVec2(dv1, normal);

            if (_ASSERT) console.assert(math_abs(vn1 - vcp1.velocityBias) < k_errorTol);
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
          matrix.subVec2(d, x, a);

          // Apply incremental impulse
          matrix.scaleVec2(P1, d.x, normal);
          matrix.scaleVec2(P2, d.y, normal);

          // vA.subCombine(mA, P1, mA, P2);
          matrix.combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
          wA -= iA * (matrix.crossVec2Vec2(vcp1.rA, P1) + matrix.crossVec2Vec2(vcp2.rA, P2));

          // vB.addCombine(mB, P1, mB, P2);
          matrix.combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
          wB += iB * (matrix.crossVec2Vec2(vcp1.rB, P1) + matrix.crossVec2Vec2(vcp2.rB, P2));

          // Accumulate
          vcp1.normalImpulse = x.x;
          vcp2.normalImpulse = x.y;

          if (DEBUG_SOLVER) {
            // Postconditions
            matrix.zeroVec2(dv2);
            matrix.plusVec2(dv2, vB);
            matrix.plusVec2(dv2, matrix.crossNumVec2(temp, wB, vcp2.rB));
            matrix.minusVec2(dv2, vA);
            matrix.minusVec2(dv2, matrix.crossNumVec2(temp, wA, vcp2.rA));

            // Compute normal velocity
            vn2 = matrix.dotVec2(dv2, normal);

            if (_ASSERT) console.assert(math_abs(vn2 - vcp2.velocityBias) < k_errorTol);
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
          matrix.subVec2(d, x, a);

          // Apply incremental impulse
          matrix.scaleVec2(P1, d.x, normal);
          matrix.scaleVec2(P2, d.y, normal);

          // vA.subCombine(mA, P1, mA, P2);
          matrix.combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
          wA -= iA * (matrix.crossVec2Vec2(vcp1.rA, P1) + matrix.crossVec2Vec2(vcp2.rA, P2));

          // vB.addCombine(mB, P1, mB, P2);
          matrix.combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
          wB += iB * (matrix.crossVec2Vec2(vcp1.rB, P1) + matrix.crossVec2Vec2(vcp2.rB, P2));

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

    matrix.copyVec2(velocityA.v, vA);
    velocityA.w = wA;

    matrix.copyVec2(velocityB.v, vB);
    velocityB.w = wB;
  }

  /** @internal */
  static addType(type1: ShapeType, type2: ShapeType, callback: EvaluateFunction): void {
    s_registers[type1] = s_registers[type1] || {};
    s_registers[type1][type2] = callback;
  }

  /** @internal */
  static create(fixtureA: Fixture, indexA: number, fixtureB: Fixture, indexB: number): Contact | null {
    const typeA = fixtureA.m_shape.m_type;
    const typeB = fixtureB.m_shape.m_type;

    const contact = contactPool.allocate();
    let evaluateFcn;
    if ((evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB])) {
      contact.initialize(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
    } else if ((evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA])) {
      contact.initialize(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
    } else {
      return null;
    }

    // Contact creation may swap fixtures.
    fixtureA = contact.m_fixtureA;
    fixtureB = contact.m_fixtureB;
    indexA = contact.getChildIndexA();
    indexB = contact.getChildIndexB();
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;

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

  /** @internal */
  static destroy(contact: Contact, listener: { endContact: (contact: Contact) => void }): void {
    const fixtureA = contact.m_fixtureA;
    const fixtureB = contact.m_fixtureB;
    if (fixtureA === null || fixtureB === null) return;
    const bodyA = fixtureA.m_body;
    const bodyB = fixtureB.m_body;
    if (bodyA === null || bodyB === null) return;

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

    if (contact.m_manifold.pointCount > 0 && !fixtureA.m_isSensor && !fixtureB.m_isSensor) {
      bodyA.setAwake(true);
      bodyB.setAwake(true);
    }

    // const typeA = fixtureA.getType();
    // const typeB = fixtureB.getType();

    // const destroyFcn = s_registers[typeA][typeB].destroyFcn;
    // if (typeof destroyFcn === 'function') {
    //   destroyFcn(contact);
    // }

    contactPool.release(contact);
  }
}
