/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../../common/Matrix";
import { EPSILON } from "../../common/Math";
import { Rot } from "../../common/Rot";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { Shape } from "../Shape";
import { AABBValue, RayCastInput, RayCastOutput } from "../AABB";
import { Transform, TransformValue } from "../../common/Transform";
import { MassData } from "../../dynamics/Body";
import { DistanceProxy } from "../Distance";

/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_PI = Math.PI;

/** @internal */ const temp = matrix.vec2(0, 0);

declare module "./CircleShape" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function CircleShape(position: Vec2Value, radius?: number): CircleShape;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function CircleShape(radius?: number): CircleShape;
}

/** Circle shape. */
// @ts-expect-error
export class CircleShape extends Shape {
  static TYPE = "circle" as const;
  /** @hidden */ m_type: "circle";

  /** @hidden */ m_p: Vec2;
  /** @hidden */ m_radius: number;

  constructor(position: Vec2Value, radius?: number);
  constructor(radius?: number);
  constructor(a: any, b?: any) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof CircleShape)) {
      return new CircleShape(a, b);
    }

    super();

    this.m_type = CircleShape.TYPE;
    this.m_p = Vec2.zero();
    this.m_radius = 1;

    if (typeof a === "object" && Vec2.isValid(a)) {
      this.m_p.setVec2(a);

      if (typeof b === "number") {
        this.m_radius = b;
      }
    } else if (typeof a === "number") {
      this.m_radius = a;
    }
  }

  /** @hidden */
  _serialize(): object {
    return {
      type: this.m_type,

      p: this.m_p,
      radius: this.m_radius,
    };
  }

  /** @hidden */
  static _deserialize(data: any): CircleShape {
    return new CircleShape(data.p, data.radius);
  }

  /** @hidden */
  _reset(): void {
    // noop
  }

  getType(): "circle" {
    return this.m_type;
  }

  getRadius(): number {
    return this.m_radius;
  }

  getCenter(): Vec2 {
    return this.m_p;
  }

  /**
   * @internal @deprecated Shapes should be treated as immutable.
   *
   * clone the concrete shape.
   */
  _clone(): CircleShape {
    const clone = new CircleShape();
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_p = this.m_p.clone();
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
  testPoint(xf: TransformValue, p: Vec2Value): boolean {
    const center = matrix.transformVec2(temp, xf, this.m_p);
    return matrix.distSqrVec2(p, center) <= this.m_radius * this.m_radius;
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
    // Collision Detection in Interactive 3D Environments by Gino van den Bergen
    // From Section 3.1.2
    // x = s + a * r
    // norm(x) = radius

    const position = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
    const s = Vec2.sub(input.p1, position);
    const b = Vec2.dot(s, s) - this.m_radius * this.m_radius;

    // Solve quadratic equation.
    const r = Vec2.sub(input.p2, input.p1);
    const c = Vec2.dot(s, r);
    const rr = Vec2.dot(r, r);
    const sigma = c * c - rr * b;

    // Check for negative discriminant and short segment.
    if (sigma < 0.0 || rr < EPSILON) {
      return false;
    }

    // Find the point of intersection of the line with the circle.
    let a = -(c + math_sqrt(sigma));

    // Is the intersection point on the segment?
    if (0.0 <= a && a <= input.maxFraction * rr) {
      a /= rr;
      output.fraction = a;
      output.normal = Vec2.add(s, Vec2.mulNumVec2(a, r));
      output.normal.normalize();
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
  computeAABB(aabb: AABBValue, xf: TransformValue, childIndex: number): void {
    const p = matrix.transformVec2(temp, xf, this.m_p);

    matrix.setVec2(aabb.lowerBound, p.x - this.m_radius, p.y - this.m_radius);
    matrix.setVec2(aabb.upperBound, p.x + this.m_radius, p.y + this.m_radius);
  }

  /**
   * Compute the mass properties of this shape using its dimensions and density.
   * The inertia tensor is computed about the local origin.
   *
   * @param massData Returns the mass data for this shape.
   * @param density The density in kilograms per meter squared.
   */
  computeMass(massData: MassData, density: number): void {
    massData.mass = density * math_PI * this.m_radius * this.m_radius;
    matrix.copyVec2(massData.center, this.m_p);
    // inertia about the local origin
    massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + matrix.lengthSqrVec2(this.m_p));
  }

  computeDistanceProxy(proxy: DistanceProxy): void {
    proxy.m_vertices[0] = this.m_p;
    proxy.m_vertices.length = 1;
    proxy.m_count = 1;
    proxy.m_radius = this.m_radius;
  }
}

export { CircleShape as Circle };
