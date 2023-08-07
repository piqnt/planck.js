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

import { Vec2 } from '../common/Vec2';
import { Transform } from '../common/Transform';
import { math as Math } from '../common/Math';
import { Rot } from '../common/Rot';

export enum ManifoldType {
  e_unset = -1,
  e_circles = 0,
  e_faceA = 1,
  e_faceB = 2
}

export enum ContactFeatureType {
  e_unset = -1,
  e_vertex = 0,
  e_face = 1
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
  removeState = 3
}

/**
 * Used for computing contact manifolds.
 */
 export class ClipVertex {
  v: Vec2 = Vec2.zero();
  id: ContactID = new ContactID();

  set(o: ClipVertex): void {
    this.v.setVec2(o.v);
    this.id.set(o.id);
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
  localNormal = Vec2.zero();

  /**
   * Usage depends on manifold type:
   * - circles: the local center of circleA
   * - faceA: the center of faceA
   * - faceB: the center of faceB
   */
  localPoint = Vec2.zero();

  /** The points of contact */
  points: ManifoldPoint[] = [ new ManifoldPoint(), new ManifoldPoint() ];

  /** The number of manifold points */
  pointCount: number = 0;

  recycle(): void {
    this.type = ManifoldType.e_unset;
    this.localNormal.setZero();
    this.localPoint.setZero
    this.pointCount = 0;
    this.points[0].recycle();
    this.points[1].recycle();
  }

  /**
   * Evaluate the manifold with supplied transforms. This assumes modest motion
   * from the original state. This does not change the point count, impulses, etc.
   * The radii must come from the shapes that generated the manifold.
   */
  getWorldManifold(wm: WorldManifold | null, xfA: Transform, radiusA: number, xfB: Transform, radiusB: number): WorldManifold {
    if (this.pointCount == 0) {
      return;
    }

    wm = wm || new WorldManifold();

    wm.pointCount = this.pointCount;

    switch (this.type) {
      case ManifoldType.e_circles: {
        wm.normal.setNum(1.0, 0.0);
        const pointA = Transform.mulVec2(xfA, this.localPoint);
        const pointB = Transform.mulVec2(xfB, this.points[0].localPoint);
        const dist = Vec2.sub(pointB, pointA);
        if (Vec2.lengthSquared(dist) > Math.EPSILON * Math.EPSILON) {
          wm.normal.setVec2(dist);
          wm.normal.normalize();
        }
        const cA = Vec2.combine(1, pointA, radiusA, wm.normal);
        const cB = Vec2.combine(1, pointB, -radiusB, wm.normal);
        wm.points[0].setCombine(0.5, cA, 0.5, cB);
        wm.separations[0] = Vec2.dot(Vec2.sub(cB, cA), wm.normal);
        break;
      }

      case ManifoldType.e_faceA: {
        wm.normal.setVec2(Rot.mulVec2(xfA.q, this.localNormal));
        const planePoint = Transform.mulVec2(xfA, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const clipPoint = Transform.mulVec2(xfB, this.points[i].localPoint);
          const cA = Vec2.combine(1, clipPoint, radiusA - Vec2.dot(Vec2.sub(clipPoint, planePoint), wm.normal), wm.normal);
          const cB = Vec2.combine(1, clipPoint, -radiusB, wm.normal);
          wm.points[i].setCombine(0.5, cA, 0.5, cB);
          wm.separations[i] = Vec2.dot(Vec2.sub(cB, cA), wm.normal);
        }
        break;
      }

      case ManifoldType.e_faceB: {
        wm.normal.setVec2(Rot.mulVec2(xfB.q, this.localNormal));
        const planePoint = Transform.mulVec2(xfB, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const clipPoint = Transform.mulVec2(xfA, this.points[i].localPoint);
          const cB = Vec2.combine(1, clipPoint, radiusB - Vec2.dot(Vec2.sub(clipPoint, planePoint), wm.normal), wm.normal);
          const cA = Vec2.combine(1, clipPoint, -radiusA, wm.normal);
          wm.points[i].setCombine(0.5, cA, 0.5, cB);
          wm.separations[i] = Vec2.dot(Vec2.sub(cA, cB), wm.normal);
        }
        // Ensure normal points from A to B.
        wm.normal.mul(-1);
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
  localPoint = Vec2.zero();
  /**
   * The non-penetration impulse
   */
  normalImpulse = 0;
  /**
   * The friction impulse
   */
  tangentImpulse = 0;
  /**
   * Uniquely identifies a contact point between two shapes to facilatate warm starting
   */
  id: ContactID = new ContactID();

  recycle(): void {
    this.localPoint.x = 0;
    this.localPoint.y = 0;
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
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64
  }

  set(that: ContactID): void {
    this.indexA = that.indexA;
    this.indexB = that.indexB;
    this.typeA = that.typeA;
    this.typeB = that.typeB;
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64
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
    this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64
  }

  recycle(): void {
    this.indexA = 0;
    this.indexB = 0;
    this.typeA = undefined;
    this.typeB = undefined;
    this.key = -1;
  }
}

/**
 * This is used to compute the current state of a contact manifold.
 */
export class WorldManifold {
  /** World vector pointing from A to B */
  normal = Vec2.zero();

  /** World contact point (point of intersection) */
  points = [Vec2.zero(), Vec2.zero()]; // [maxManifoldPoints]

  /** A negative value indicates overlap, in meters */
  separations = [0, 0]; // [maxManifoldPoints]

  /** The number of manifold points */
  pointCount = 0;

  recycle() {
    this.normal.setZero();
    this.points[0].setZero();
    this.points[1].setZero();
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
  manifold2: Manifold
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
  normal: Vec2,
  offset: number,
  vertexIndexA: number
): number {
  // Start with no output points
  let numOut = 0;

  // Calculate the distance of end points to the line
  const distance0 = Vec2.dot(normal, vIn[0].v) - offset;
  const distance1 = Vec2.dot(normal, vIn[1].v) - offset;

  // If the points are behind the plane
  if (distance0 <= 0.0)
    vOut[numOut++].set(vIn[0]);
  if (distance1 <= 0.0)
    vOut[numOut++].set(vIn[1]);

  // If the points are on different sides of the plane
  if (distance0 * distance1 < 0.0) {
    // Find intersection point of edge and plane
    const interp = distance0 / (distance0 - distance1);
    vOut[numOut].v.setCombine(1 - interp, vIn[0].v, interp, vIn[1].v);

    // VertexA is hitting edgeB.
    vOut[numOut].id.setFeatures(vertexIndexA, ContactFeatureType.e_vertex, vIn[0].id.indexB, ContactFeatureType.e_face);
    ++numOut;
  }

  return numOut;
}
