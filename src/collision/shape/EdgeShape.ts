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

import Settings from '../../Settings';
import Shape from '../Shape';
import Transform from '../../common/Transform';
import Rot from '../../common/Rot';
import Vec2 from '../../common/Vec2';
import AABB, { RayCastInput, RayCastOutput } from '../AABB';
import { MassData } from '../../dynamics/Body';
import { DistanceProxy } from '../Distance';

/**
 * A line segment (edge) shape. These can be connected in chains or loops to
 * other edge shapes. The connectivity information is used to ensure correct
 * contact normals.
 */
export default class EdgeShape extends Shape {
  static TYPE = 'edge' as const;

  // These are the edge vertices
  m_vertex1: Vec2;
  m_vertex2: Vec2;

  // Optional adjacent vertices. These are used for smooth collision.
  // Used by chain shape.
  m_vertex0: Vec2;
  m_vertex3: Vec2;
  m_hasVertex0: boolean;
  m_hasVertex3: boolean;

  constructor(v1?: Vec2, v2?: Vec2) {
    // @ts-ignore
    if (!(this instanceof EdgeShape)) {
      return new EdgeShape(v1, v2);
    }

    super();

    this.m_type = EdgeShape.TYPE;
    this.m_radius = Settings.polygonRadius;


    this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
    this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();

    this.m_vertex0 = Vec2.zero();
    this.m_vertex3 = Vec2.zero();
    this.m_hasVertex0 = false;
    this.m_hasVertex3 = false;
  }

  /** @internal */
  _serialize(): object {
    return {
      type: this.m_type,

      vertex1: this.m_vertex1,
      vertex2: this.m_vertex2,

      vertex0: this.m_vertex0,
      vertex3: this.m_vertex3,
      hasVertex0: this.m_hasVertex0,
      hasVertex3: this.m_hasVertex3,
    };
  }

  /** @internal */
  static _deserialize(data: any): EdgeShape {
    const shape = new EdgeShape(data.vertex1, data.vertex2);
    if (shape.m_hasVertex0) {
      shape.setPrevVertex(data.vertex0);
    }
    if (shape.m_hasVertex3) {
      shape.setNextVertex(data.vertex3);
    }
    return shape;
  }

  /** @internal @deprecated */
  setNext(v?: Vec2): EdgeShape {
    return this.setNextVertex(v);
  }

  /**
   * Optional next vertex, used for smooth collision.
   */
  setNextVertex(v?: Vec2): EdgeShape {
    if (v) {
      this.m_vertex3.setVec2(v);
      this.m_hasVertex3 = true;
    } else {
      this.m_vertex3.setZero();
      this.m_hasVertex3 = false;
    }
    return this;
  }

  /**
   * Optional next vertex, used for smooth collision.
   */
  getNextVertex(): Vec2 {
    return this.m_vertex3;
  }

  /** @internal @deprecated */
  setPrev(v?: Vec2): EdgeShape {
    return this.setPrevVertex(v);
  }

  /**
   * Optional prev vertex, used for smooth collision.
   */
  setPrevVertex(v?: Vec2): EdgeShape {
    if (v) {
      this.m_vertex0.setVec2(v);
      this.m_hasVertex0 = true;
    } else {
      this.m_vertex0.setZero();
      this.m_hasVertex0 = false;
    }
    return this;
  }

  /**
   * Optional prev vertex, used for smooth collision.
   */
  getPrevVertex(): Vec2 {
    return this.m_vertex0;
  }

  /**
   * Set this as an isolated edge.
   */
  _set(v1: Vec2, v2: Vec2): EdgeShape {
    this.m_vertex1.setVec2(v1);
    this.m_vertex2.setVec2(v2);
    this.m_hasVertex0 = false;
    this.m_hasVertex3 = false;
    return this;
  }

  /**
   * @internal
   * @deprecated Shapes should be treated as immutable.
   *
   * clone the concrete shape.
   */
  _clone(): EdgeShape {
    const clone = new EdgeShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_vertex1.setVec2(this.m_vertex1);
    clone.m_vertex2.setVec2(this.m_vertex2);
    clone.m_vertex0.setVec2(this.m_vertex0);
    clone.m_vertex3.setVec2(this.m_vertex3);
    clone.m_hasVertex0 = this.m_hasVertex0;
    clone.m_hasVertex3 = this.m_hasVertex3;
    return clone;
  }

  /**
   * Get the number of child primitives.
   */
  getChildCount(): 1 {
    return 1;
  }

  /**
   * Test a point for containment in this shape. This only works for convex
   * shapes.
   *
   * @param xf The shape world transform.
   * @param p A point in world coordinates.
   */
  testPoint(xf: Transform, p: Vec2): false {
    return false;
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
    // p = p1 + t * d
    // v = v1 + s * e
    // p1 + t * d = v1 + s * e
    // s * e - t * d = p1 - v1

    // NOT_USED(childIndex);

    // Put the ray into the edge's frame of reference.
    const p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
    const p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
    const d = Vec2.sub(p2, p1);

    const v1 = this.m_vertex1;
    const v2 = this.m_vertex2;
    const e = Vec2.sub(v2, v1);
    const normal = Vec2.neo(e.y, -e.x);
    normal.normalize();

    // q = p1 + t * d
    // dot(normal, q - v1) = 0
    // dot(normal, p1 - v1) + t * dot(normal, d) = 0
    const numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
    const denominator = Vec2.dot(normal, d);

    if (denominator == 0.0) {
      return false;
    }

    const t = numerator / denominator;
    if (t < 0.0 || input.maxFraction < t) {
      return false;
    }

    const q = Vec2.add(p1, Vec2.mulNumVec2(t, d));

    // q = v1 + s * r
    // s = dot(q - v1, r) / dot(r, r)
    const r = Vec2.sub(v2, v1);
    const rr = Vec2.dot(r, r);
    if (rr == 0.0) {
      return false;
    }

    const s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
    if (s < 0.0 || 1.0 < s) {
      return false;
    }

    output.fraction = t;
    if (numerator > 0.0) {
      output.normal = Rot.mulVec2(xf.q, normal).neg();
    } else {
      output.normal = Rot.mulVec2(xf.q, normal);
    }
    return true;
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
    const v1 = Transform.mulVec2(xf, this.m_vertex1);
    const v2 = Transform.mulVec2(xf, this.m_vertex2);

    aabb.combinePoints(v1, v2);
    aabb.extend(this.m_radius);
  }

  /**
   * Compute the mass properties of this shape using its dimensions and density.
   * The inertia tensor is computed about the local origin.
   *
   * @param massData Returns the mass data for this shape.
   * @param density The density in kilograms per meter squared.
   */
  computeMass(massData: MassData, density?: number): void {
    massData.mass = 0.0;
    massData.center.setCombine(0.5, this.m_vertex1, 0.5, this.m_vertex2);
    massData.I = 0.0;
  }

  computeDistanceProxy(proxy: DistanceProxy): void {
    proxy.m_vertices.push(this.m_vertex1);
    proxy.m_vertices.push(this.m_vertex2);
    proxy.m_count = 2;
    proxy.m_radius = this.m_radius;
  }

}
