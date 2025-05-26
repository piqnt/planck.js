/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EPSILON } from "../common/Math";
import { Vec2, Vec2Value } from "../common/Vec2";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;

/**
 * Ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
 */
export interface RayCastInput {
  p1: Vec2Value;
  p2: Vec2Value;
  maxFraction: number;
}

export type RayCastCallback = (subInput: RayCastInput, id: number) => number;

/**
 * Ray-cast output data. The ray hits at `p1 + fraction * (p2 - p1)`,
 * where `p1` and `p2` come from RayCastInput.
 */
export interface RayCastOutput {
  normal: Vec2;
  fraction: number;
}

/** Axis-aligned bounding box */
export interface AABBValue {
  lowerBound: Vec2Value;
  upperBound: Vec2Value;
}

declare module "./AABB" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function AABB(lower?: Vec2Value, upper?: Vec2Value): AABB;
}

/** Axis-aligned bounding box */
// @ts-expect-error
export class AABB {
  lowerBound: Vec2;
  upperBound: Vec2;

  constructor(lower?: Vec2Value, upper?: Vec2Value) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof AABB)) {
      return new AABB(lower, upper);
    }

    this.lowerBound = Vec2.zero();
    this.upperBound = Vec2.zero();

    if (typeof lower === "object") {
      this.lowerBound.setVec2(lower);
    }
    if (typeof upper === "object") {
      this.upperBound.setVec2(upper);
    } else if (typeof lower === "object") {
      this.upperBound.setVec2(lower);
    }
  }

  /**
   * Verify that the bounds are sorted.
   */
  isValid(): boolean {
    return AABB.isValid(this);
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return (
      Vec2.isValid(obj.lowerBound) &&
      Vec2.isValid(obj.upperBound) &&
      Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0
    );
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!AABB.isValid(o), "Invalid AABB!", o);
  }

  /**
   * Get the center of the AABB.
   */
  getCenter(): Vec2 {
    return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
  }

  /**
   * Get the extents of the AABB (half-widths).
   */
  getExtents(): Vec2 {
    return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
  }

  /**
   * Get the perimeter length.
   */
  getPerimeter(): number {
    return 2.0 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
  }

  /**
   * Combine one or two AABB into this one.
   */
  combine(a: AABBValue, b?: AABBValue): void {
    b = b || this;

    const lowerA = a.lowerBound;
    const upperA = a.upperBound;
    const lowerB = b.lowerBound;
    const upperB = b.upperBound;

    const lowerX = math_min(lowerA.x, lowerB.x);
    const lowerY = math_min(lowerA.y, lowerB.y);
    const upperX = math_max(upperB.x, upperA.x);
    const upperY = math_max(upperB.y, upperA.y);

    this.lowerBound.setNum(lowerX, lowerY);
    this.upperBound.setNum(upperX, upperY);
  }

  combinePoints(a: Vec2Value, b: Vec2Value): void {
    this.lowerBound.setNum(math_min(a.x, b.x), math_min(a.y, b.y));
    this.upperBound.setNum(math_max(a.x, b.x), math_max(a.y, b.y));
  }

  set(aabb: AABBValue): void {
    this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
    this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
  }

  contains(aabb: AABBValue): boolean {
    let result = true;
    result = result && this.lowerBound.x <= aabb.lowerBound.x;
    result = result && this.lowerBound.y <= aabb.lowerBound.y;
    result = result && aabb.upperBound.x <= this.upperBound.x;
    result = result && aabb.upperBound.y <= this.upperBound.y;
    return result;
  }

  extend(value: number): AABB {
    AABB.extend(this, value);
    return this;
  }

  static extend(out: AABBValue, value: number): AABBValue {
    out.lowerBound.x -= value;
    out.lowerBound.y -= value;
    out.upperBound.x += value;
    out.upperBound.y += value;
    return out;
  }

  static testOverlap(a: AABBValue, b: AABBValue): boolean {
    const d1x = b.lowerBound.x - a.upperBound.x;
    const d2x = a.lowerBound.x - b.upperBound.x;

    const d1y = b.lowerBound.y - a.upperBound.y;
    const d2y = a.lowerBound.y - b.upperBound.y;

    if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
      return false;
    }
    return true;
  }

  static areEqual(a: AABBValue, b: AABBValue): boolean {
    return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
  }

  static diff(a: AABBValue, b: AABBValue): number {
    const wD = math_max(0, math_min(a.upperBound.x, b.upperBound.x) - math_max(b.lowerBound.x, a.lowerBound.x));
    const hD = math_max(0, math_min(a.upperBound.y, b.upperBound.y) - math_max(b.lowerBound.y, a.lowerBound.y));

    const wA = a.upperBound.x - a.lowerBound.x;
    const hA = a.upperBound.y - a.lowerBound.y;

    const wB = b.upperBound.x - b.lowerBound.x;
    const hB = b.upperBound.y - b.lowerBound.y;

    return wA * hA + wB * hB - wD * hD;
  }

  rayCast(output: RayCastOutput, input: RayCastInput): boolean {
    // From Real-time Collision Detection, p179.

    let tmin = -Infinity;
    let tmax = Infinity;

    const p = input.p1;
    const d = Vec2.sub(input.p2, input.p1);
    const absD = Vec2.abs(d);

    const normal = Vec2.zero();

    {
      if (absD.x < EPSILON) {
        // Parallel.
        if (p.x < this.lowerBound.x || this.upperBound.x < p.x) {
          return false;
        }
      } else {
        const inv_d = 1.0 / d.x;
        let t1 = (this.lowerBound.x - p.x) * inv_d;
        let t2 = (this.upperBound.x - p.x) * inv_d;

        // Sign of the normal vector.
        let s = -1.0;

        if (t1 > t2) {
          const temp = t1;
          t1 = t2;
          t2 = temp;
          s = 1.0;
        }

        // Push the min up
        if (t1 > tmin) {
          normal.setZero();
          normal.x = s;
          tmin = t1;
        }

        // Pull the max down
        tmax = math_min(tmax, t2);

        if (tmin > tmax) {
          return false;
        }
      }
    }

    {
      if (absD.y < EPSILON) {
        // Parallel.
        if (p.y < this.lowerBound.y || this.upperBound.y < p.y) {
          return false;
        }
      } else {
        const inv_d = 1.0 / d.y;
        let t1 = (this.lowerBound.y - p.y) * inv_d;
        let t2 = (this.upperBound.y - p.y) * inv_d;

        // Sign of the normal vector.
        let s = -1.0;

        if (t1 > t2) {
          const temp = t1;
          t1 = t2;
          t2 = temp;
          s = 1.0;
        }

        // Push the min up
        if (t1 > tmin) {
          normal.setZero();
          normal.y = s;
          tmin = t1;
        }

        // Pull the max down
        tmax = math_min(tmax, t2);

        if (tmin > tmax) {
          return false;
        }
      }
    }

    // Does the ray start inside the box?
    // Does the ray intersect beyond the max fraction?
    if (tmin < 0.0 || input.maxFraction < tmin) {
      return false;
    }

    // Intersection.
    output.fraction = tmin;
    output.normal = normal;
    return true;
  }

  /** @hidden */
  toString(): string {
    return JSON.stringify(this);
  }

  static combinePoints(out: AABBValue, a: Vec2Value, b: Vec2Value): AABBValue {
    out.lowerBound.x = math_min(a.x, b.x);
    out.lowerBound.y = math_min(a.y, b.y);
    out.upperBound.x = math_max(a.x, b.x);
    out.upperBound.y = math_max(a.y, b.y);
    return out;
  }

  static combinedPerimeter(a: AABBValue, b: AABBValue) {
    const lx = math_min(a.lowerBound.x, b.lowerBound.x);
    const ly = math_min(a.lowerBound.y, b.lowerBound.y);
    const ux = math_max(a.upperBound.x, b.upperBound.x);
    const uy = math_max(a.upperBound.y, b.upperBound.y);
    return 2.0 * (ux - lx + uy - ly);
  }
}
