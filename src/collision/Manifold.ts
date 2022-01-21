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

import Vec2 from '../common/Vec2';
import Transform from '../common/Transform';
import Math from '../common/Math';
import Rot from '../common/Rot';

export enum ManifoldType {
  e_circles = 0,
  e_faceA = 1,
  e_faceB = 2
}

export enum ContactFeatureType {
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
 *
 * @prop type e_circle, e_faceA, e_faceB
 * @prop localPoint Usage depends on manifold type:<br>
 *       e_circles: the local center of circleA <br>
 *       e_faceA: the center of faceA <br>
 *       e_faceB: the center of faceB
 * @prop localNormal Usage depends on manifold type:<br>
 *       e_circles: not used <br>
 *       e_faceA: the normal on polygonA <br>
 *       e_faceB: the normal on polygonB
 * @prop points The points of contact {ManifoldPoint[]}
 * @prop pointCount The number of manifold points
 */
export default class Manifold {
  type: ManifoldType;
  localNormal: Vec2 = Vec2.zero();
  localPoint: Vec2 = Vec2.zero();
  points: ManifoldPoint[] = [ new ManifoldPoint(), new ManifoldPoint() ];
  pointCount: number = 0;

  /**
   * Evaluate the manifold with supplied transforms. This assumes modest motion
   * from the original state. This does not change the point count, impulses, etc.
   * The radii must come from the shapes that generated the manifold.
   */
  getWorldManifold(wm: WorldManifold | undefined, xfA: Transform, radiusA: number, xfB: Transform, radiusB: number): WorldManifold {
    if (this.pointCount == 0) {
      return;
    }

    wm = wm || new WorldManifold();

    let normal = wm.normal;
    const points = wm.points;
    const separations = wm.separations;

    // TODO: improve
    switch (this.type) {
      case ManifoldType.e_circles: {
        normal = Vec2.neo(1.0, 0.0);
        const pointA = Transform.mulVec2(xfA, this.localPoint);
        const pointB = Transform.mulVec2(xfB, this.points[0].localPoint);
        const dist = Vec2.sub(pointB, pointA);
        if (Vec2.lengthSquared(dist) > Math.EPSILON * Math.EPSILON) {
          normal.setVec2(dist);
          normal.normalize();
        }
        const cA = pointA.clone().addMul(radiusA, normal);
        const cB = pointB.clone().addMul(-radiusB, normal);
        points[0] = Vec2.mid(cA, cB);
        separations[0] = Vec2.dot(Vec2.sub(cB, cA), normal);
        points.length = 1;
        separations.length = 1;
        break;
      }

      case ManifoldType.e_faceA: {
        normal = Rot.mulVec2(xfA.q, this.localNormal);
        const planePoint = Transform.mulVec2(xfA, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const clipPoint = Transform.mulVec2(xfB, this.points[i].localPoint);
          const cA = Vec2.clone(clipPoint).addMul(radiusA - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
          const cB = Vec2.clone(clipPoint).subMul(radiusB, normal);
          points[i] = Vec2.mid(cA, cB);
          separations[i] = Vec2.dot(Vec2.sub(cB, cA), normal);
        }
        points.length = this.pointCount;
        separations.length = this.pointCount;
        break;
      }

      case ManifoldType.e_faceB: {
        normal = Rot.mulVec2(xfB.q, this.localNormal);
        const planePoint = Transform.mulVec2(xfB, this.localPoint);

        for (let i = 0; i < this.pointCount; ++i) {
          const clipPoint = Transform.mulVec2(xfA, this.points[i].localPoint);
          const cB = Vec2.combine(1, clipPoint, radiusB - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
          const cA = Vec2.combine(1, clipPoint, -radiusA, normal);
          points[i] = Vec2.mid(cA, cB);
          separations[i] = Vec2.dot(Vec2.sub(cA, cB), normal);
        }
        points.length = this.pointCount;
        separations.length = this.pointCount;
        // Ensure normal points from A to B.
        normal.mul(-1);
        break;
      }
    }

    wm.normal = normal;
    wm.points = points;
    wm.separations = separations;
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
   * Usage depends on manifold type.
   *       e_circles: the local center of circleB,
   *       e_faceA: the local center of cirlceB or the clip point of polygonB,
   *       e_faceB: the clip point of polygonA.
   */
  localPoint: Vec2 = Vec2.zero();
  /**
   * The non-penetration impulse
   */
  normalImpulse: number = 0;
  /**
   * The friction impulse
   */
  tangentImpulse: number = 0;
  /**
   * Uniquely identifies a contact point between two shapes to facilatate warm starting
   */
  id: ContactID = new ContactID();
}

/**
 * Contact ids to facilitate warm starting.
 */
export class ContactID {
  cf: ContactFeature = new ContactFeature();

  /**
   * Used to quickly compare contact ids.
   */
  get key(): number {
    return this.cf.indexA + this.cf.indexB * 4 + this.cf.typeA * 16 + this.cf.typeB * 64;
  }

  set(o: ContactID): void {
    // this.key = o.key;
    this.cf.set(o.cf);
  }
}

/**
 * The features that intersect to form the contact point.
 */
export class ContactFeature {
  /**
   * Feature index on shapeA
   */
  indexA: number;
  /**
   * Feature index on shapeB
   */
  indexB: number;
  /**
   * The feature type on shapeA
   */
  typeA: ContactFeatureType;
  /**
   * The feature type on shapeB
   */
  typeB: ContactFeatureType;
  set(o: ContactFeature): void {
    this.indexA = o.indexA;
    this.indexB = o.indexB;
    this.typeA = o.typeA;
    this.typeB = o.typeB;
  }
}

/**
 * This is used to compute the current state of a contact manifold.
 */
export class WorldManifold {
  /**
   * World vector pointing from A to B
   */
  normal: Vec2;
  /**
   * World contact point (point of intersection)
   */
  points: Vec2[] = []; // [maxManifoldPoints]
  /**
   * A negative value indicates overlap, in meters
   */
  separations: number[] = []; // [maxManifoldPoints]
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
      if (manifold2.points[j].id.key == id.key) {
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
      if (manifold1.points[j].id.key == id.key) {
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
    vOut[numOut].id.cf.indexA = vertexIndexA;
    vOut[numOut].id.cf.indexB = vIn[0].id.cf.indexB;
    vOut[numOut].id.cf.typeA = ContactFeatureType.e_vertex;
    vOut[numOut].id.cf.typeB = ContactFeatureType.e_face;
    ++numOut;
  }

  return numOut;
}
