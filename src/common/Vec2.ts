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

import { EPSILON } from "./Math";


/** @internal */ const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === 'undefined' ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;


export interface Vec2Value {
  x: number;
  y: number;
}

export class Vec2 {
  x: number;
  y: number;

  constructor(x: number=0, y: number=0) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof Vec2)) {
      return Vec2.create(x, y);
    }
    this.x = x;
    this.y = y;
    _ASSERT && Vec2.assert(this);
  }

  /**
   * create a new Vec2
   */
  static create(x: number=0, y: number=0): Vec2 {
    const obj = Object.create(Vec2.prototype);
    obj.x = x;
    obj.y = y;
    return obj;
  }

  /** @internal */
  _serialize(): object {
    return {
      x: this.x,
      y: this.y
    };
  }

  /** @internal */
  static _deserialize(data: any): Vec2 {
    const obj = Object.create(Vec2.prototype);
    obj.x = data.x;
    obj.y = data.y;
    return obj;
  }

  static zero(): Vec2 {
    const obj = Object.create(Vec2.prototype);
    obj.x = 0;
    obj.y = 0;
    return obj;
  }

  static copy(out: Vec2Value, v: Vec2Value): Vec2Value {
    _ASSERT && Vec2.assert(out) && Vec2.assert(v);
    out.x = v.x;
    out.y = v.y;
    return out;
  }

  static set(out: Vec2Value, x: number, y: number): Vec2Value {
    _ASSERT && Vec2.assert(out);
    out.x = x;
    out.y = y;
    return out;
  }

  static clone(v: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.create(v.x, v.y);
  }

  /** @hidden */
  toString(): string {
    return JSON.stringify(this);
  }


  /**
   * Does this vector contain finite coordinates?
   */
  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return Number.isFinite(obj.x) && Number.isFinite(obj.y);
  }

  static assert(o: any): void {
    _ASSERT && console.assert(!Vec2.isValid(o), 'Invalid Vec2!', o);
  }

  /**
   * Set this vector to all zeros.
   *
   * @returns Vec2
   */
  static setZero(out: Vec2Value): Vec2 {
    out.x = 0.0;
    out.y = 0.0;
    return out;
  }

  /**
   * Set linear combination of v and w: `a * v + b * w`
   */
  setCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x = x;
    this.y = y;
    return this;
  }

  setMul(a: number, v: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x = x;
    this.y = y;
    return this;
  }


  /**
   * Add linear combination of v and w: `a * v + b * w`
   */
  addCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);

    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x += x;
    this.y += y;
    return this;
  }

  addMul(a: number, v: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Subtract linear combination of v and w: `a * v + b * w`
   */
  subCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x -= x;
    this.y -= y;
    return this;
  }

  subMul(a: number, v: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Subtract a vector from this vector
   *
   * @returns this
   */
  sub(w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(w);
    this.x -= w.x;
    this.y -= w.y;
    return this;
  }

  /**
   * Multiply this vector by a scalar.
   *
   * @returns this
   */
  mul(m: number): Vec2 {
    _ASSERT && console.assert(Number.isFinite(m));
    this.x *= m;
    this.y *= m;
    return this;
  }

  /**
   * Get the length of this vector (the norm).
   *
   * For performance, use this instead of lengthSquared (if possible).
   */
  length(): number {
    return Vec2.lengthOf(this);
  }

  /**
   * Get the length squared.
   */
  lengthSquared(): number {
    return Vec2.lengthSquared(this);
  }

  /**
   * Convert this vector into a unit vector.
   *
   * @returns old length
   */
  normalize(): number {
    const length = this.length();
    if (length < EPSILON) {
      return 0.0;
    }
    const invLength = 1.0 / length;
    this.x *= invLength;
    this.y *= invLength;
    return length;
  }

  /**
   * Get the length of this vector (the norm).
   *
   * For performance, use this instead of lengthSquared (if possible).
   */
  static lengthOf(v: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    return math_sqrt(v.x * v.x + v.y * v.y);
  }

  /**
   * Get the length squared.
   */
  static lengthSquared(v: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    return v.x * v.x + v.y * v.y;
  }

  static distance(v: Vec2Value, w: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return math_sqrt(dx * dx + dy * dy);
  }

  static distanceSquared(v: Vec2Value, w: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return dx * dx + dy * dy;
  }

  static areEqual(v: Vec2Value, w: Vec2Value): boolean {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
  }

  /**
   * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
   */
  static skew(v: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.create(-v.y, v.x);
  }

  /** Dot product on two vectors */
  static dot(v: Vec2Value, w: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v.x * w.x + v.y * w.y;
  }

  /** Cross product between two vectors */
  static cross(v: Vec2Value, w: Vec2Value): number;
  /** Cross product between a vector and a scalar */
  static cross(v: Vec2Value, w: number): Vec2;
  /** Cross product between a scalar and a vector */
  static cross(v: number, w: Vec2Value): Vec2;
  static cross(v: any, w: any): any {
    if (typeof w === 'number') {
      _ASSERT && Vec2.assert(v);
      _ASSERT && console.assert(Number.isFinite(w));
      return Vec2.create(w * v.y, -w * v.x);

    } else if (typeof v === 'number') {
      _ASSERT && console.assert(Number.isFinite(v));
      _ASSERT && Vec2.assert(w);
      return Vec2.create(-v * w.y, v * w.x);

    } else {
      _ASSERT && Vec2.assert(v);
      _ASSERT && Vec2.assert(w);
      return v.x * w.y - v.y * w.x;
    }
  }

  /** Cross product on two vectors */
  static crossVec2Vec2(v: Vec2Value, w: Vec2Value): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v.x * w.y - v.y * w.x;
  }

  /** Cross product on a vector and a scalar */
  static crossVec2Num(v: Vec2Value, w: number): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(w));
    return Vec2.create(w * v.y, -w * v.x);
  }

  /** Cross product on a vector and a scalar */
  static crossNumVec2(v: number, w: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(v));
    _ASSERT && Vec2.assert(w);
    return Vec2.create(-v * w.y, v * w.x);
  }

  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: Vec2Value, w: number): Vec2;
  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: number, w: Vec2Value): Vec2;
  static addCross(a: Vec2Value, v: any, w: any): Vec2 {
    if (typeof w === 'number') {
      _ASSERT && Vec2.assert(v);
      _ASSERT && console.assert(Number.isFinite(w));
      return Vec2.create(w * v.y + a.x, -w * v.x + a.y);

    } else if (typeof v === 'number') {
      _ASSERT && console.assert(Number.isFinite(v));
      _ASSERT && Vec2.assert(w);
      return Vec2.create(-v * w.y + a.x, v * w.x + a.y);
    }

    _ASSERT && console.assert(false);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossVec2Num(a: Vec2Value, v: Vec2Value, w: number): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(w));
    return Vec2.create(w * v.y + a.x, -w * v.x + a.y);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossNumVec2(a: Vec2Value, v: number, w: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(v));
    _ASSERT && Vec2.assert(w);
    return Vec2.create(-v * w.y + a.x, v * w.x + a.y);
  }

  static add(v: Vec2Value, w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.create(v.x + w.x, v.y + w.y);
  }

  static combine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    return Vec2.zero().setCombine(a, v, b, w);
  }

  static sub(v: Vec2Value, w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.create(v.x - w.x, v.y - w.y);
  }

  static mul(a: Vec2Value, b: number): Vec2;
  static mul(a: number, b: Vec2Value): Vec2;
  static mul(a: any, b: any): Vec2 {
    if (typeof a === 'object') {
      _ASSERT && Vec2.assert(a);
      _ASSERT && console.assert(Number.isFinite(b));
      return Vec2.create(a.x * b, a.y * b);

    } else if (typeof b === 'object') {
      _ASSERT && console.assert(Number.isFinite(a));
      _ASSERT && Vec2.assert(b);
      return Vec2.create(a * b.x, a * b.y);
    }
  }

  static mulVec2Num(a: Vec2Value, b: number): Vec2 {
    _ASSERT && Vec2.assert(a);
    _ASSERT && console.assert(Number.isFinite(b));
    return Vec2.create(a.x * b, a.y * b);
  }

  static mulNumVec2(a: number, b: Vec2Value): Vec2 {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(b);
    return Vec2.create(a * b.x, a * b.y);
  }

  neg(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  static neg(v: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.create(-v.x, -v.y);
  }

  static abs(v: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.create(math_abs(v.x), math_abs(v.y));
  }

  static mid(v: Vec2Value, w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.create((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
  }

  static upper(v: Vec2Value, w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.create(math_max(v.x, w.x), math_max(v.y, w.y));
  }

  static lower(v: Vec2Value, w: Vec2Value): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.create(math_min(v.x, w.x), math_min(v.y, w.y));
  }

  clamp(max: number): Vec2 {
    const lengthSqr = this.x * this.x + this.y * this.y;
    if (lengthSqr > max * max) {
      const scale = max / math_sqrt(lengthSqr);
      this.x *= scale;
      this.y *= scale;
    }
    return this;
  }

  static clamp(v: Vec2Value, max: number): Vec2 {
    const r = Vec2.create(v.x, v.y);
    r.clamp(max);
    return r;
  }

}
