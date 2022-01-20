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

import common from '../util/common';
import Math from '../common/Math';
import Vec2 from '../common/Vec2';


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * Ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
 */
export interface RayCastInput {
  p1: Vec2;
  p2: Vec2;
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

export default class AABB {
  lowerBound: Vec2;
  upperBound: Vec2;

  constructor(lower?: Vec2, upper?: Vec2) {
    if (!(this instanceof AABB)) {
      return new AABB(lower, upper);
    }

    this.lowerBound = Vec2.zero();
    this.upperBound = Vec2.zero();

    if (typeof lower === 'object') {
      this.lowerBound.setVec2(lower);
    }
    if (typeof upper === 'object') {
      this.upperBound.setVec2(upper);
    } else if (typeof lower === 'object') {
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
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
  }

  static assert(o: any): void {
    if (!_ASSERT) return;
    if (!AABB.isValid(o)) {
      _DEBUG && common.debug(o);
      throw new Error('Invalid AABB!');
    }
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
  combine(a: AABB, b?: AABB): void {
    b = b || this;

    const lowerA = a.lowerBound;
    const upperA = a.upperBound;
    const lowerB = b.lowerBound;
    const upperB = b.upperBound;

    const lowerX = Math.min(lowerA.x, lowerB.x);
    const lowerY = Math.min(lowerA.y, lowerB.y);
    const upperX = Math.max(upperB.x, upperA.x);
    const upperY = Math.max(upperB.y, upperA.y);

    this.lowerBound.setNum(lowerX, lowerY);
    this.upperBound.setNum(upperX, upperY);
  }

  combinePoints(a: Vec2, b: Vec2): void {
    this.lowerBound.setNum(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.upperBound.setNum(Math.max(a.x, b.x), Math.max(a.y, b.y));
  }

  set(aabb: AABB): void {
    this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
    this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
  }

  contains(aabb: AABB): boolean {
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

  static extend(aabb: AABB, value: number): void {
    aabb.lowerBound.x -= value;
    aabb.lowerBound.y -= value;
    aabb.upperBound.x += value;
    aabb.upperBound.y += value;
  }

  static testOverlap(a: AABB, b: AABB): boolean {
    const d1x = b.lowerBound.x - a.upperBound.x;
    const d2x = a.lowerBound.x - b.upperBound.x;

    const d1y = b.lowerBound.y - a.upperBound.y;
    const d2y = a.lowerBound.y - b.upperBound.y;

    if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
      return false;
    }
    return true;
  }

  static areEqual(a: AABB, b: AABB): boolean {
    return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
  }

  static diff(a: AABB, b: AABB): number {
    const wD = Math.max(0, Math.min(a.upperBound.x, b.upperBound.x) - Math.max(b.lowerBound.x, a.lowerBound.x));
    const hD = Math.max(0, Math.min(a.upperBound.y, b.upperBound.y) - Math.max(b.lowerBound.y, a.lowerBound.y));

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

    for (let f: 'x' | 'y' = 'x'; f !== null; f = (f === 'x' ? 'y' : null)) {
      if (absD.x < Math.EPSILON) {
        // Parallel.
        if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
          return false;
        }
      } else {
        const inv_d = 1.0 / d[f];
        let t1 = (this.lowerBound[f] - p[f]) * inv_d;
        let t2 = (this.upperBound[f] - p[f]) * inv_d;

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
          normal[f] = s;
          tmin = t1;
        }

        // Pull the max down
        tmax = Math.min(tmax, t2);

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

  /** @internal */
  toString(): string {
    return JSON.stringify(this);
  }
}
