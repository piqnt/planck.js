/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../common/Matrix";
import { Vec2Value } from "../common/Vec2";
import { TransformValue } from "../common/Transform";
import { EPSILON } from "../common/Math";

/** @internal */ const math_sqrt = Math.sqrt;

/** @internal */ const pointA = matrix.vec2(0, 0);
/** @internal */ const pointB = matrix.vec2(0, 0);
/** @internal */ const temp = matrix.vec2(0, 0);
/** @internal */ const cA = matrix.vec2(0, 0);
/** @internal */ const cB = matrix.vec2(0, 0);
/** @internal */ const dist = matrix.vec2(0, 0);
/** @internal */ const planePoint = matrix.vec2(0, 0);
/** @internal */ const clipPoint = matrix.vec2(0, 0);

export enum ManifoldType {
  e_unset = -1,
  e_circles = 0,
  e_faceA = 1,
  e_faceB = 2,
}

export enum ContactFeatureType {
  e_unset = -1,
  e_vertex = 0,
  e_face = 1,
}

/**
 * This is used for determining the state of contact points.
 */
export enum PointState {
  /** Point does not exist */
  nullState = 0,
  /** Point was added in the update */
  addState = 1,
  /** Point persisted across the update */
  persistState = 2,
  /** Point was removed in the update */
  removeState = 3,
}

/**
 * Used for computing contact manifolds.
 */
export class ClipVertex {
  v = matrix.vec2(0, 0);
  id: ContactID = new ContactID();

  set(o: ClipVertex): void {
    matrix.copyVec2(this.v, o.v);
    this.id.set(o.id);
  }
  recycle() {
    matrix.zeroVec2(this.v);
    this.id.recycle();
  }
}

/**
 * A manifold for two touching convex shapes. Manifolds are created in `evaluate`
 * method of Contact subclasses.
 *
 * Supported manifold types are e_faceA or e_faceB for clip point versus plane
 * with radius and e_circles point versus point with radius.
 *
 * We store contacts in this way so that position correction can account for
 * movement, which is critical for continuous physics. All contact scenarios
 * must be expressed in one of these types. This structure is stored across time
 * steps, so we keep it small.
 */
export class Manifold {
  type: ManifoldType;

  /**
   * Usage depends on manifold type:
   * - circles: not used
   * - faceA: the normal on polygonA
   * - faceB: the normal on polygonB
   */
  localNormal = matrix.vec2(0, 0);

  /**
   * Usage depends on manifold type:
   * - circles: the local center of circleA
   * - faceA: the center of faceA
   * - faceB: the center of faceB
   */
  localPoint = matrix.vec2(0, 0);

  /** The points of contact */
  points: ManifoldPoint[] = [new ManifoldPoint(), new ManifoldPoint()];

  /** The number of manifold points */
  pointCount: number = 0;

  set(that: Manifold): void {
    this.type = that.type;
    matrix.copyVec2(this.localNormal, that.localNormal);
    matrix.copyVec2(this.localPoint, that.localPoint);
    this.pointCount = that.pointCount;
    this.points[0].set(that.points[0]);
    this.points[1].set(that.points[1]);
  }

  recycle(): void {
    this.type = ManifoldType.e_unset;
    matrix.zeroVec2(this.localNormal);
    matrix.zeroVec2(this.localPoint);
    this.pointCount = 0;
    this.points[0].recycle();
    this.points[1].recycle();
  }

  /**
   * Evaluate the manifold with supplied transforms. This assumes modest motion
   * from the original state. This does not change the point count, impulses, etc.
   * The radii must come from the shapes that generated the manifold.
   */
  getWorldManifold(
    wm: WorldManifold | null,
    xfA: TransformValue,
    radiusA: number,
    xfB: TransformValue,
    radiusB: number,
  ): WorldManifold {
    if (this.pointCount == 0) {
      return wm;
    }

    wm = wm || new WorldManifold();

    wm.pointCount = this.pointCount;

    const normal = wm.normal;
    const points = wm.points;
    const separations = wm.separations;

    switch (this.type) {
      case ManifoldType.e_circles: {
        matrix.setVec2(normal, 1.0, 0.0);
        const manifoldPoint = this.points[0];
        matrix.transformVec2(pointA, xfA, this.localPoint);
        matrix.transformVec2(pointB, xfB, manifoldPoint.localPoint);
        matrix.subVec2(dist, pointB, pointA);
        const lengthSqr = matrix.lengthSqrVec2(dist);
        if (lengthSqr > EPSILON * EPSILON) {
          const length = math_sqrt(lengthSqr);
          matrix.scaleVec2(normal, 1 / length, dist);
        }
        matrix.combine2Vec2(cA, 1, pointA, radiusA, normal);
        matrix.combine2Vec2(cB, 1, pointB, -radiusB, normal);
        matrix.combine2Vec2(points[0], 0.5, cA, 0.5, cB);
        separations[0] = matrix.dotVec2(matrix.subVec2(temp, cB, cA), normal);
        break;
      }

      case ManifoldType.e_faceA: {
        matrix.rotVec2(normal, xfA.q, this.localNormal);
        matrix.transformVec2(planePoint, xfA, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const manifoldPoint = this.points[i];
          matrix.transformVec2(clipPoint, xfB, manifoldPoint.localPoint);
          matrix.combine2Vec2(
            cA,
            1,
            clipPoint,
            radiusA - matrix.dotVec2(matrix.subVec2(temp, clipPoint, planePoint), normal),
            normal,
          );
          matrix.combine2Vec2(cB, 1, clipPoint, -radiusB, normal);
          matrix.combine2Vec2(points[i], 0.5, cA, 0.5, cB);
          separations[i] = matrix.dotVec2(matrix.subVec2(temp, cB, cA), normal);
        }
        break;
      }

      case ManifoldType.e_faceB: {
        matrix.rotVec2(normal, xfB.q, this.localNormal);
        matrix.transformVec2(planePoint, xfB, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const manifoldPoint = this.points[i];
          matrix.transformVec2(clipPoint, xfA, manifoldPoint.localPoint);
          matrix.combine2Vec2(
            cB,
            1,
            clipPoint,
            radiusB - matrix.dotVec2(matrix.subVec2(temp, clipPoint, planePoint), normal),
            normal,
          );
          matrix.combine2Vec2(cA, 1, clipPoint, -radiusA, normal);
          matrix.combine2Vec2(points[i], 0.5, cA, 0.5, cB);
          separations[i] = matrix.dotVec2(matrix.subVec2(temp, cA, cB), normal);
        }
        // Ensure normal points from A to B.
        matrix.negVec2(normal);
        break;
      }
    }

    return wm;
  }

  static clipSegmentToLine = clipSegmentToLine;
  static ClipVertex = ClipVertex;
  static getPointStates = getPointStates;
  static PointState = PointState;
}

/**
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * details related to the geometry and dynamics of the contact points.
 *
 * This structure is stored across time steps, so we keep it small.
 *
 * Note: impulses are used for internal caching and may not provide reliable
 * contact forces, especially for high speed collisions.
 */
export class ManifoldPoint {
  /**
   * Usage depends on manifold type:
   * - circles: the local center of circleB
   * - faceA: the local center of circleB or the clip point of polygonB
   * - faceB: the clip point of polygonA
   */
  localPoint = matrix.vec2(0, 0);
  /**
   * The non-penetration impulse
   */
  normalImpulse = 0;
  /**
   * The friction impulse
   */
  tangentImpulse = 0;
  /**
   * Uniquely identifies a contact point between two shapes to facilitate warm starting
   */
  readonly id = new ContactID();

  set(that: ManifoldPoint): void {
    matrix.copyVec2(this.localPoint, that.localPoint);
    this.normalImpulse = that.normalImpulse;
    this.tangentImpulse = that.tangentImpulse;
    this.id.set(that.id);
  }

  recycle(): void {
    matrix.zeroVec2(this.localPoint);
    this.normalImpulse = 0;
    this.tangentImpulse = 0;
    this.id.recycle();
  }
}

/**
 * Contact ids to facilitate warm starting.
 *
 * ContactFeature: The features that intersect to form the contact point.
 */
export class ContactID {
  /**
   * Used to quickly compare contact ids.
   */
  key = -1;

  /** ContactFeature index on shapeA */
  indexA = -1;

  /** ContactFeature index on shapeB */
  indexB = -1;

  /** ContactFeature type on shapeA */
  typeA = ContactFeatureType.e_unset;

  /** ContactFeature type on shapeB */
  typeB = ContactFeatureType.e_unset;

  setFeatures(indexA: number, typeA: ContactFeatureType, indexB: number, typeB: ContactFeatureType): void {
    this.indexA = indexA;
    this.indexB = indexB;
    this.typeA = typeA;
    this.typeB = typeB;
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
  }

  set(that: ContactID): void {
    this.indexA = that.indexA;
    this.indexB = that.indexB;
    this.typeA = that.typeA;
    this.typeB = that.typeB;
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
  }

  swapFeatures(): void {
    const indexA = this.indexA;
    const indexB = this.indexB;
    const typeA = this.typeA;
    const typeB = this.typeB;
    this.indexA = indexB;
    this.indexB = indexA;
    this.typeA = typeB;
    this.typeB = typeA;
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
  }

  recycle(): void {
    this.indexA = 0;
    this.indexB = 0;
    this.typeA = ContactFeatureType.e_unset;
    this.typeB = ContactFeatureType.e_unset;
    this.key = -1;
  }
}

/**
 * This is used to compute the current state of a contact manifold.
 */
export class WorldManifold {
  /** World vector pointing from A to B */
  normal = matrix.vec2(0, 0);

  /** World contact point (point of intersection) */
  points = [matrix.vec2(0, 0), matrix.vec2(0, 0)]; // [maxManifoldPoints]

  /** A negative value indicates overlap, in meters */
  separations = [0, 0]; // [maxManifoldPoints]

  /** The number of manifold points */
  pointCount = 0;

  recycle() {
    matrix.zeroVec2(this.normal);
    matrix.zeroVec2(this.points[0]);
    matrix.zeroVec2(this.points[1]);
    this.separations[0] = 0;
    this.separations[1] = 0;
    this.pointCount = 0;
  }
}

/**
 * Compute the point states given two manifolds. The states pertain to the
 * transition from manifold1 to manifold2. So state1 is either persist or remove
 * while state2 is either add or persist.
 */
export function getPointStates(
  state1: PointState[],
  state2: PointState[],
  manifold1: Manifold,
  manifold2: Manifold,
): void {
  // state1, state2: PointState[Settings.maxManifoldPoints]

  // for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
  // state1[i] = PointState.nullState;
  // state2[i] = PointState.nullState;
  // }

  // Detect persists and removes.
  for (let i = 0; i < manifold1.pointCount; ++i) {
    const id = manifold1.points[i].id;

    state1[i] = PointState.removeState;

    for (let j = 0; j < manifold2.pointCount; ++j) {
      if (manifold2.points[j].id.key === id.key) {
        state1[i] = PointState.persistState;
        break;
      }
    }
  }

  // Detect persists and adds.
  for (let i = 0; i < manifold2.pointCount; ++i) {
    const id = manifold2.points[i].id;

    state2[i] = PointState.addState;

    for (let j = 0; j < manifold1.pointCount; ++j) {
      if (manifold1.points[j].id.key === id.key) {
        state2[i] = PointState.persistState;
        break;
      }
    }
  }
}

/**
 * Clipping for contact manifolds. Sutherland-Hodgman clipping.
 */
export function clipSegmentToLine(
  vOut: ClipVertex[],
  vIn: ClipVertex[],
  normal: Vec2Value,
  offset: number,
  vertexIndexA: number,
): number {
  // Start with no output points
  let numOut = 0;

  // Calculate the distance of end points to the line
  const distance0 = matrix.dotVec2(normal, vIn[0].v) - offset;
  const distance1 = matrix.dotVec2(normal, vIn[1].v) - offset;

  // If the points are behind the plane
  if (distance0 <= 0.0) vOut[numOut++].set(vIn[0]);
  if (distance1 <= 0.0) vOut[numOut++].set(vIn[1]);

  // If the points are on different sides of the plane
  if (distance0 * distance1 < 0.0) {
    // Find intersection point of edge and plane
    const interp = distance0 / (distance0 - distance1);
    matrix.combine2Vec2(vOut[numOut].v, 1 - interp, vIn[0].v, interp, vIn[1].v);

    // VertexA is hitting edgeB.
    vOut[numOut].id.setFeatures(vertexIndexA, ContactFeatureType.e_vertex, vIn[0].id.indexB, ContactFeatureType.e_face);
    ++numOut;
  }

  return numOut;
}
