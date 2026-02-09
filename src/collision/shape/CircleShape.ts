/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as geo from "../../common/Geo";
import { EPSILON } from "../../common/Math";
import { Vec2Value } from "../../common/Vec2";
import { Shape } from "../Shape";
import { AABBValue } from "../AABB";
import { RayCastInput, RayCastOutput } from "../Raycast";
import { TransformValue } from "../../common/Transform";
import { MassData } from "../../dynamics/Body";
import { DistanceProxy } from "../Distance";

/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_PI = Math.PI;

/** @internal */ const temp = geo.vec2(0, 0);

/** Circle shape. */
export class CircleShape extends Shape {
  static TYPE = "circle" as const;
  /** @hidden */ m_type: "circle";

  /** @hidden */ m_p: Vec2Value;
  /** @hidden */ m_radius: number;

  constructor(position: Vec2Value, radius?: number);
  constructor(radius?: number);
  constructor(a: any, b?: any) {
    super();

    this.m_type = CircleShape.TYPE;
    this.m_p = geo.vec2(0, 0);
    this.m_radius = 1;

    if (typeof a === "object" && geo.isVec2(a)) {
      geo.copyVec2(this.m_p, a);

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

  getCenter(): Vec2Value {
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
    clone.m_p = geo.vec2(this.m_p.x, this.m_p.y);
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
    geo.transformVec2(temp, xf, this.m_p);
    return geo.distSqrVec2(p, temp) <= this.m_radius * this.m_radius;
  }

  /**
   * Cast a ray against a child shape.
   *
   * @param output The ray-cast results.
   * @param input The ray-cast input parameters.
   * @param xf The transform to be applied to the shape.
   * @param childIndex The child shape index
   */
  rayCast(output: RayCastOutput, input: RayCastInput, xf: TransformValue, childIndex: number): boolean {
    // Collision Detection in Interactive 3D Environments by Gino van den Bergen
    // From Section 3.1.2
    // x = s + a * r
    // norm(x) = radius

    const position = geo.vec2(0, 0);
    geo.transformVec2(position, xf, this.m_p);
    const s = geo.vec2(0, 0);
    geo.subVec2(s, input.p1, position);
    const b = geo.dotVec2(s, s) - this.m_radius * this.m_radius;

    // Solve quadratic equation.
    const r = geo.vec2(0, 0);
    geo.subVec2(r, input.p2, input.p1);
    const c = geo.dotVec2(s, r);
    const rr = geo.dotVec2(r, r);
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
      output.normal = geo.vec2(0, 0);
      geo.combine2Vec2(output.normal, 1, s, a, r);
      geo.normalizeVec2(output.normal);
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
    geo.transformVec2(temp, xf, this.m_p);

    geo.setVec2(aabb.lowerBound, temp.x - this.m_radius, temp.y - this.m_radius);
    geo.setVec2(aabb.upperBound, temp.x + this.m_radius, temp.y + this.m_radius);
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
    geo.copyVec2(massData.center, this.m_p);
    // inertia about the local origin
    massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + geo.lengthSqrVec2(this.m_p));
  }

  computeDistanceProxy(proxy: DistanceProxy): void {
    proxy.m_vertices[0] = this.m_p;
    proxy.m_vertices.length = 1;
    proxy.m_count = 1;
    proxy.m_radius = this.m_radius;
  }
}

export { CircleShape as Circle };
