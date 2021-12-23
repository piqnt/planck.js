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

import type { MassData } from '../../dynamics/Body';
import AABB, { RayCastOutput, RayCastInput } from '../AABB';
import { DistanceProxy } from '../Distance';
import common from '../../util/common';
import Math from '../../common/Math';
import Transform from '../../common/Transform';
import Rot from '../../common/Rot';
import Vec2 from '../../common/Vec2';
import Settings from '../../Settings';
import Shape from '../Shape';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * A convex polygon. It is assumed that the interior of the polygon is to the
 * left of each edge. Polygons have a maximum number of vertices equal to
 * Settings.maxPolygonVertices. In most cases you should not need many vertices
 * for a convex polygon. extends Shape
 */
export default class PolygonShape extends Shape {
  static TYPE = 'polygon' as const;

  m_centroid: Vec2;
  m_vertices: Vec2[]; // [Settings.maxPolygonVertices]
  m_normals: Vec2[]; // [Settings.maxPolygonVertices]
  m_count: number;

  // @ts-ignore
  constructor(vertices?: Vec2[]) {
    // @ts-ignore
    if (!(this instanceof PolygonShape)) {
      return new PolygonShape(vertices);
    }

    super();

    this.m_type = PolygonShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_centroid = Vec2.zero();
    this.m_vertices = [];
    this.m_normals = [];
    this.m_count = 0;

    if (vertices && vertices.length) {
      this._set(vertices);
    }
  }

  /** @internal */
  _serialize(): object {
    return {
      type: this.m_type,

      vertices: this.m_vertices,
    };
  }

  /** @internal */
  static _deserialize(data: any, fixture: any, restore: any): PolygonShape {
    const vertices = [] as Vec2[];
    if (data.vertices) {
      for (let i = 0; i < data.vertices.length; i++) {
        vertices.push(restore(Vec2, data.vertices[i]));
      }
    }

    const shape = new PolygonShape(vertices);
    return shape;
  }

  getVertex(index: number): Vec2 {
    _ASSERT && common.assert(0 <= index && index < this.m_count);
    return this.m_vertices[index];
  }

  /**
   * @internal
   * @deprecated Shapes should be treated as immutable.
   *
   * clone the concrete shape.
   */
  _clone(): PolygonShape {
    const clone = new PolygonShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_count = this.m_count;
    clone.m_centroid.setVec2(this.m_centroid);
    for (let i = 0; i < this.m_count; i++) {
      clone.m_vertices.push(this.m_vertices[i].clone());
    }
    for (let i = 0; i < this.m_normals.length; i++) {
      clone.m_normals.push(this.m_normals[i].clone());
    }
    return clone;
  }

  /**
   * Get the number of child primitives.
   */
  getChildCount(): 1 {
    return 1;
  }

  /** @internal */
  _reset(): void {
    this._set(this.m_vertices);
  }

  /**
   * @internal
   *
   * Create a convex hull from the given array of local points. The count must be
   * in the range [3, Settings.maxPolygonVertices].
   *
   * Warning: the points may be re-ordered, even if they form a convex polygon
   * Warning: collinear points are handled but not removed. Collinear points may
   * lead to poor stacking behavior.
   */
  _set(vertices: Vec2[]): void {
    _ASSERT && common.assert(3 <= vertices.length && vertices.length <= Settings.maxPolygonVertices);
    if (vertices.length < 3) {
      this._setAsBox(1.0, 1.0);
      return;
    }

    let n = Math.min(vertices.length, Settings.maxPolygonVertices);

    // Perform welding and copy vertices into local buffer.
    const ps = [] as Vec2[]; // [Settings.maxPolygonVertices];
    for (let i = 0; i < n; ++i) {
      const v = vertices[i];

      let unique = true;
      for (let j = 0; j < ps.length; ++j) {
        if (Vec2.distanceSquared(v, ps[j]) < 0.25 * Settings.linearSlopSquared) {
          unique = false;
          break;
        }
      }

      if (unique) {
        ps.push(v);
      }
    }

    n = ps.length;
    if (n < 3) {
      // Polygon is degenerate.
      _ASSERT && common.assert(false);
      this._setAsBox(1.0, 1.0);
      return;
    }

    // Create the convex hull using the Gift wrapping algorithm
    // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm

    // Find the right most point on the hull (in case of multiple points bottom most is used)
    let i0 = 0;
    let x0 = ps[0].x;
    for (let i = 1; i < n; ++i) {
      const x = ps[i].x;
      if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
        i0 = i;
        x0 = x;
      }
    }

    const hull = [] as number[]; // [Settings.maxPolygonVertices];
    let m = 0;
    let ih = i0;

    while (true) {
      hull[m] = ih;

      let ie = 0;
      for (let j = 1; j < n; ++j) {
        if (ie === ih) {
          ie = j;
          continue;
        }

        const r = Vec2.sub(ps[ie], ps[hull[m]]);
        const v = Vec2.sub(ps[j], ps[hull[m]]);
        const c = Vec2.crossVec2Vec2(r, v);
        // c < 0 means counter-clockwise wrapping, c > 0 means clockwise wrapping
        if (c < 0.0) {
          ie = j;
        }

        // Collinearity check
        if (c === 0.0 && v.lengthSquared() > r.lengthSquared()) {
          ie = j;
        }
      }

      ++m;
      ih = ie;

      if (ie === i0) {
        break;
      }
    }

    if (m < 3) {
      // Polygon is degenerate.
      _ASSERT && common.assert(false);
      this._setAsBox(1.0, 1.0);
      return;
    }

    this.m_count = m;

    // Copy vertices.
    this.m_vertices = [];
    for (let i = 0; i < m; ++i) {
      this.m_vertices[i] = ps[hull[i]];
    }

    // Compute normals. Ensure the edges have non-zero length.
    for (let i = 0; i < m; ++i) {
      const i1 = i;
      const i2 = i + 1 < m ? i + 1 : 0;
      const edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
      _ASSERT && common.assert(edge.lengthSquared() > Math.EPSILON * Math.EPSILON);
      this.m_normals[i] = Vec2.crossVec2Num(edge, 1.0);
      this.m_normals[i].normalize();
    }

    // Compute the polygon centroid.
    this.m_centroid = ComputeCentroid(this.m_vertices, m);
  }

  /** @internal */
  _setAsBox(hx: number, hy: number, center?: Vec2, angle?: number): void {
    // start with right-bottom, counter-clockwise, as in Gift wrapping algorithm in PolygonShape._set()
    this.m_vertices[0] = Vec2.neo(hx, -hy);
    this.m_vertices[1] = Vec2.neo(hx, hy);
    this.m_vertices[2] = Vec2.neo(-hx, hy);
    this.m_vertices[3] = Vec2.neo(-hx, -hy);

    this.m_normals[0] = Vec2.neo(1.0, 0.0);
    this.m_normals[1] = Vec2.neo(0.0, 1.0);
    this.m_normals[2] = Vec2.neo(-1.0, 0.0);
    this.m_normals[3] = Vec2.neo(0.0, -1.0);

    this.m_count = 4;

    if (Vec2.isValid(center)) {
      angle = angle || 0;

      this.m_centroid.setVec2(center);

      const xf = Transform.identity();
      xf.p.setVec2(center);
      xf.q.setAngle(angle);

      // Transform vertices and normals.
      for (let i = 0; i < this.m_count; ++i) {
        this.m_vertices[i] = Transform.mulVec2(xf, this.m_vertices[i]);
        this.m_normals[i] = Rot.mulVec2(xf.q, this.m_normals[i]);
      }
    }
  }

  /**
   * Test a point for containment in this shape. This only works for convex
   * shapes.
   *
   * @param xf The shape world transform.
   * @param p A point in world coordinates.
   */
  testPoint(xf: Transform, p: Vec2): boolean {
    const pLocal = Rot.mulTVec2(xf.q, Vec2.sub(p, xf.p));

    for (let i = 0; i < this.m_count; ++i) {
      const dot = Vec2.dot(this.m_normals[i], Vec2.sub(pLocal, this.m_vertices[i]));
      if (dot > 0.0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Cast a ray against a child shape.
   *
   * @param output The ray-cast results.
   * @param input The ray-cast input parameters.
   * @param xf The transform to be applied to the shape.
   * @param childIndex The child shape index
   */
  rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean {

    // Put the ray into the polygon's frame of reference.
    const p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
    const p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
    const d = Vec2.sub(p2, p1);

    let lower = 0.0;
    let upper = input.maxFraction;

    let index = -1;

    for (let i = 0; i < this.m_count; ++i) {
      // p = p1 + a * d
      // dot(normal, p - v) = 0
      // dot(normal, p1 - v) + a * dot(normal, d) = 0
      const numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
      const denominator = Vec2.dot(this.m_normals[i], d);

      if (denominator == 0.0) {
        if (numerator < 0.0) {
          return false;
        }
      } else {
        // Note: we want this predicate without division:
        // lower < numerator / denominator, where denominator < 0
        // Since denominator < 0, we have to flip the inequality:
        // lower < numerator / denominator <==> denominator * lower > numerator.
        if (denominator < 0.0 && numerator < lower * denominator) {
          // Increase lower.
          // The segment enters this half-space.
          lower = numerator / denominator;
          index = i;
        } else if (denominator > 0.0 && numerator < upper * denominator) {
          // Decrease upper.
          // The segment exits this half-space.
          upper = numerator / denominator;
        }
      }

      // The use of epsilon here causes the assert on lower to trip
      // in some cases. Apparently the use of epsilon was to make edge
      // shapes work, but now those are handled separately.
      // if (upper < lower - Math.EPSILON)
      if (upper < lower) {
        return false;
      }
    }

    _ASSERT && common.assert(0.0 <= lower && lower <= input.maxFraction);

    if (index >= 0) {
      output.fraction = lower;
      output.normal = Rot.mulVec2(xf.q, this.m_normals[index]);
      return true;
    }

    return false;
  }

  /**
   * Given a transform, compute the associated axis aligned bounding box for a
   * child shape.
   *
   * @param aabb Returns the axis aligned box.
   * @param xf The world transform of the shape.
   * @param childIndex The child shape
   */
  computeAABB(aabb: AABB, xf: Transform, childIndex: number): void {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < this.m_count; ++i) {
      const v = Transform.mulVec2(xf, this.m_vertices[i]);
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, v.y);
      maxY = Math.max(maxY, v.y);
    }

    aabb.lowerBound.setNum(minX, minY);
    aabb.upperBound.setNum(maxX, maxY);
    aabb.extend(this.m_radius);
  }

  /**
   * Compute the mass properties of this shape using its dimensions and density.
   * The inertia tensor is computed about the local origin.
   *
   * @param massData Returns the mass data for this shape.
   * @param density The density in kilograms per meter squared.
   */
  computeMass(massData: MassData, density: number): void {
    // Polygon mass, centroid, and inertia.
    // Let rho be the polygon density in mass per unit area.
    // Then:
    // mass = rho * int(dA)
    // centroid.x = (1/mass) * rho * int(x * dA)
    // centroid.y = (1/mass) * rho * int(y * dA)
    // I = rho * int((x*x + y*y) * dA)
    //
    // We can compute these integrals by summing all the integrals
    // for each triangle of the polygon. To evaluate the integral
    // for a single triangle, we make a change of variables to
    // the (u,v) coordinates of the triangle:
    // x = x0 + e1x * u + e2x * v
    // y = y0 + e1y * u + e2y * v
    // where 0 <= u && 0 <= v && u + v <= 1.
    //
    // We integrate u from [0,1-v] and then v from [0,1].
    // We also need to use the Jacobian of the transformation:
    // D = cross(e1, e2)
    //
    // Simplification: triangle centroid = (1/3) * (p1 + p2 + p3)
    //
    // The rest of the derivation is handled by computer algebra.

    _ASSERT && common.assert(this.m_count >= 3);

    const center = Vec2.zero();
    let area = 0.0;
    let I = 0.0;

    // s is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    const s = Vec2.zero();

    // This code would put the reference point inside the polygon.
    for (let i = 0; i < this.m_count; ++i) {
      s.add(this.m_vertices[i]);
    }
    s.mul(1.0 / this.m_count);

    const k_inv3 = 1.0 / 3.0;

    for (let i = 0; i < this.m_count; ++i) {
      // Triangle vertices.
      const e1 = Vec2.sub(this.m_vertices[i], s);
      const e2 = i + 1 < this.m_count ? Vec2.sub(this.m_vertices[i + 1], s) : Vec2 .sub(this.m_vertices[0], s);

      const D = Vec2.crossVec2Vec2(e1, e2);

      const triangleArea = 0.5 * D;
      area += triangleArea;

      // Area weighted centroid
      center.addCombine(triangleArea * k_inv3, e1, triangleArea * k_inv3, e2);

      const ex1 = e1.x;
      const ey1 = e1.y;
      const ex2 = e2.x;
      const ey2 = e2.y;

      const intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
      const inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;

      I += (0.25 * k_inv3 * D) * (intx2 + inty2);
    }

    // Total mass
    massData.mass = density * area;

    // Center of mass
    _ASSERT && common.assert(area > Math.EPSILON);
    center.mul(1.0 / area);
    massData.center.setCombine(1, center, 1, s);

    // Inertia tensor relative to the local origin (point s).
    massData.I = density * I;

    // Shift to center of mass then to original body origin.
    massData.I += massData.mass * (Vec2.dot(massData.center, massData.center) - Vec2.dot(center, center));
  }

  /**
   * Validate convexity. This is a very time consuming operation.
   * @returns true if valid
   */
  validate(): boolean {
    for (let i = 0; i < this.m_count; ++i) {
      const i1 = i;
      const i2 = i < this.m_count - 1 ? i1 + 1 : 0;
      const p = this.m_vertices[i1];
      const e = Vec2.sub(this.m_vertices[i2], p);

      for (let j = 0; j < this.m_count; ++j) {
        if (j == i1 || j == i2) {
          continue;
        }

        const v = Vec2.sub(this.m_vertices[j], p);
        const c = Vec2.crossVec2Vec2(e, v);
        if (c < 0.0) {
          return false;
        }
      }
    }

    return true;
  }

  computeDistanceProxy(proxy: DistanceProxy): void {
    proxy.m_vertices = this.m_vertices;
    proxy.m_count = this.m_count;
    proxy.m_radius = this.m_radius;
  }
}

function ComputeCentroid(vs: Vec2[], count: number): Vec2 {
  _ASSERT && common.assert(count >= 3);

  const c = Vec2.zero();
  let area = 0.0;

  // pRef is the reference point for forming triangles.
  // It's location doesn't change the result (except for rounding error).
  const pRef = Vec2.zero();
  if (false) {
    // This code would put the reference point inside the polygon.
    for (let i = 0; i < count; ++i) {
      pRef.add(vs[i]);
    }
    pRef.mul(1.0 / count);
  }

  const inv3 = 1.0 / 3.0;

  for (let i = 0; i < count; ++i) {
    // Triangle vertices.
    const p1 = pRef;
    const p2 = vs[i];
    const p3 = i + 1 < count ? vs[i + 1] : vs[0];

    const e1 = Vec2.sub(p2, p1);
    const e2 = Vec2.sub(p3, p1);

    const D = Vec2.crossVec2Vec2(e1, e2);

    const triangleArea = 0.5 * D;
    area += triangleArea;

    // Area weighted centroid
    c.addMul(triangleArea * inv3, p1);
    c.addMul(triangleArea * inv3, p2);
    c.addMul(triangleArea * inv3, p3);
  }

  // Centroid
  _ASSERT && common.assert(area > Math.EPSILON);
  c.mul(1.0 / area);
  return c;
}
