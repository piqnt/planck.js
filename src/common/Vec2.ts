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
import Math from './Math';


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


export default class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(obj: { x: number, y: number });
  constructor();
  // tslint:disable-next-line:typedef
  constructor(x?, y?) {
    if (!(this instanceof Vec2)) {
      return new Vec2(x, y);
    }
    if (typeof x === 'undefined') {
      this.x = 0;
      this.y = 0;
    } else if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
    _ASSERT && Vec2.assert(this);
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

  /** @internal */
  static neo(x: number, y: number): Vec2 {
    const obj = Object.create(Vec2.prototype);
    obj.x = x;
    obj.y = y;
    return obj;
  }

  static clone(v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(v.x, v.y);
  }

  /** @internal */
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
    return Math.isFinite(obj.x) && Math.isFinite(obj.y);
  }

  static assert(o: any): void {
    if (!_ASSERT) return;
    if (!Vec2.isValid(o)) {
      _DEBUG && common.debug(o);
      throw new Error('Invalid Vec2!');
    }
  }

  clone(): Vec2 {
    return Vec2.clone(this);
  }

  /**
   * Set this vector to all zeros.
   *
   * @returns this
   */
  setZero(): Vec2 {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  set(x: number, y: number): Vec2;
  set(value: Vec2): Vec2;
  /**
   * Set this vector to some specified coordinates.
   *
   * @returns this
   */
  // tslint:disable-next-line:typedef
  set(x, y?) {
    if (typeof x === 'object') {
      _ASSERT && Vec2.assert(x);
      this.x = x.x;
      this.y = x.y;
    } else {
      _ASSERT && Math.assert(x);
      _ASSERT && Math.assert(y);
      this.x = x;
      this.y = y;
    }
    return this;
  }

  /**
   * Set this vector to some specified coordinates.
   *
   * @returns this
   */
   setNum(x: number, y: number) {
    _ASSERT && Math.assert(x);
    _ASSERT && Math.assert(y);
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Set this vector to some specified coordinates.
   *
   * @returns this
   */
  setVec2(value: Vec2) {
    _ASSERT && Vec2.assert(value);
    this.x = value.x;
    this.y = value.y;

    return this;
  }

  /**
   * @internal
   * @deprecated Use setCombine or setMul
   */
  wSet(a: number, v: Vec2, b?: number, w?: Vec2): Vec2 {
    if (typeof b !== 'undefined' || typeof w !== 'undefined') {
      return this.setCombine(a, v, b, w);
    } else {
      return this.setMul(a, v);
    }
  }

  /**
   * Set linear combination of v and w: `a * v + b * w`
   */
  setCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(v);
    _ASSERT && Math.assert(b);
    _ASSERT && Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x = x;
    this.y = y;
    return this;
  }

  setMul(a: number, v: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Add a vector to this vector.
   *
   * @returns this
   */
  add(w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(w);
    this.x += w.x;
    this.y += w.y;
    return this;
  }

  /**
   * @internal
   * @deprecated Use addCombine or addMul
   */
  wAdd(a: number, v: Vec2, b?: number, w?: Vec2): Vec2 {
    if (typeof b !== 'undefined' || typeof w !== 'undefined') {
      return this.addCombine(a, v, b, w);
    } else {
      return this.addMul(a, v);
    }
  }

  /**
   * Add linear combination of v and w: `a * v + b * w`
   */
  addCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(v);
    _ASSERT && Math.assert(b);
    _ASSERT && Vec2.assert(w);

    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x += x;
    this.y += y;
    return this;
  }

  addMul(a: number, v: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * @deprecated Use subCombine or subMul
   */
  wSub(a: number, v: Vec2, b?: number, w?: Vec2): Vec2 {
    if (typeof b !== 'undefined' || typeof w !== 'undefined') {
      return this.subCombine(a, v, b, w);
    } else {
      return this.subMul(a, v);
    }}

  /**
   * Subtract linear combination of v and w: `a * v + b * w`
   */
  subCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(v);
    _ASSERT && Math.assert(b);
    _ASSERT && Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x -= x;
    this.y -= y;
    return this;
  }

  subMul(a: number, v: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
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
  sub(w: Vec2): Vec2 {
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
    _ASSERT && Math.assert(m);
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
    if (length < Math.EPSILON) {
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
  static lengthOf(v: Vec2): number {
    _ASSERT && Vec2.assert(v);
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  /**
   * Get the length squared.
   */
  static lengthSquared(v: Vec2): number {
    _ASSERT && Vec2.assert(v);
    return v.x * v.x + v.y * v.y;
  }

  static distance(v: Vec2, w: Vec2): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static distanceSquared(v: Vec2, w: Vec2): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return dx * dx + dy * dy;
  }

  static areEqual(v: Vec2, w: Vec2): boolean {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
  }

  /**
   * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
   */
  static skew(v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(-v.y, v.x);
  }

  /**
   * Perform the dot product on two vectors.
   */
  static dot(v: Vec2, w: Vec2): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v.x * w.x + v.y * w.y;
  }

  static cross(v: Vec2, w: Vec2): number;
  static cross(v: Vec2, w: number): Vec2;
  static cross(v: number, w: Vec2): Vec2;
  /**
   * Perform the cross product on two vectors. In 2D this produces a scalar.
   *
   * Perform the cross product on a vector and a scalar. In 2D this produces a
   * vector.
   */
  // tslint:disable-next-line:typedef
  static cross(v, w) {
    if (typeof w === 'number') {
      _ASSERT && Vec2.assert(v);
      _ASSERT && Math.assert(w);
      return Vec2.neo(w * v.y, -w * v.x);

    } else if (typeof v === 'number') {
      _ASSERT && Math.assert(v);
      _ASSERT && Vec2.assert(w);
      return Vec2.neo(-v * w.y, v * w.x);

    } else {
      _ASSERT && Vec2.assert(v);
      _ASSERT && Vec2.assert(w);
      return v.x * w.y - v.y * w.x;
    }
  }

  /**
   * Perform the cross product on two vectors. In 2D this produces a scalar.
   */
  static crossVec2Vec2(v: Vec2, w: Vec2): number {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return v.x * w.y - v.y * w.x;
  }

  /**
   * Perform the cross product on a vector and a scalar. In 2D this produces a
   * vector.
   */
  static crossVec2Num(v: Vec2, w: number): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Math.assert(w);
    return Vec2.neo(w * v.y, -w * v.x);
  }

  /**
   * Perform the cross product on a vector and a scalar. In 2D this produces a
   * vector.
   */
  static crossNumVec2(v: number, w: Vec2): Vec2 {
    _ASSERT && Math.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(-v * w.y, v * w.x);
  }

  static addCross(a: Vec2, v: Vec2, w: number): Vec2;
  static addCross(a: Vec2, v: number, w: Vec2): Vec2;
  /**
   * Returns `a + (v x w)`
   */
  // tslint:disable-next-line:typedef
  static addCross(a, v, w) {
    if (typeof w === 'number') {
      _ASSERT && Vec2.assert(v);
      _ASSERT && Math.assert(w);
      return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);

    } else if (typeof v === 'number') {
      _ASSERT && Math.assert(v);
      _ASSERT && Vec2.assert(w);
      return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
    }

    _ASSERT && common.assert(false);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossVec2Num(a: Vec2, v: Vec2, w: number): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Math.assert(w);
    return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossNumVec2(a: Vec2, v: number, w: Vec2): Vec2 {
    _ASSERT && Math.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
  }

  static add(v: Vec2, w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(v.x + w.x, v.y + w.y);
  }

  /** @internal @deprecated */
  static wAdd(a: number, v: Vec2, b: number, w: Vec2): Vec2 {
    if (typeof b !== 'undefined' || typeof w !== 'undefined') {
      return Vec2.combine(a, v, b, w);
    } else {
      return Vec2.mulNumVec2(a, v);
    }
  }

  static combine(a: number, v: Vec2, b: number, w: Vec2): Vec2 {
    return Vec2.zero().setCombine(a, v, b, w);
  }

  static sub(v: Vec2, w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(v.x - w.x, v.y - w.y);
  }

  static mul(a: Vec2, b: number): Vec2;
  static mul(a: number, b: Vec2): Vec2;
  // tslint:disable-next-line:typedef
  static mul(a, b) {
    if (typeof a === 'object') {
      _ASSERT && Vec2.assert(a);
      _ASSERT && Math.assert(b);
      return Vec2.neo(a.x * b, a.y * b);

    } else if (typeof b === 'object') {
      _ASSERT && Math.assert(a);
      _ASSERT && Vec2.assert(b);
      return Vec2.neo(a * b.x, a * b.y);
    }
  }

  static mulVec2Num(a: Vec2, b: number): Vec2 {
    _ASSERT && Vec2.assert(a);
    _ASSERT && Math.assert(b);
    return Vec2.neo(a.x * b, a.y * b);
  }

  static mulNumVec2(a: number, b: Vec2): Vec2 {
    _ASSERT && Math.assert(a);
    _ASSERT && Vec2.assert(b);
    return Vec2.neo(a * b.x, a * b.y);
  }

  neg(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  static neg(v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(-v.x, -v.y);
  }

  static abs(v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(Math.abs(v.x), Math.abs(v.y));
  }

  static mid(v: Vec2, w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
  }

  static upper(v: Vec2, w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(Math.max(v.x, w.x), Math.max(v.y, w.y));
  }

  static lower(v: Vec2, w: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.neo(Math.min(v.x, w.x), Math.min(v.y, w.y));
  }

  clamp(max: number): Vec2 {
    const lengthSqr = this.x * this.x + this.y * this.y;
    if (lengthSqr > max * max) {
      const invLength = Math.invSqrt(lengthSqr);
      this.x *= invLength * max;
      this.y *= invLength * max;
    }
    return this;
  }

  static clamp(v: Vec2, max: number): Vec2 {
    v = Vec2.neo(v.x, v.y);
    v.clamp(max);
    return v;
  }

  /**  @internal @deprecated */
  // tslint:disable-next-line:typedef
  static scaleFn(x: number, y: number) {
    return function(v: Vec2): Vec2 {
      return Vec2.neo(v.x * x, v.y * y);
    };
  }

  /**  @internal @deprecated */
  // tslint:disable-next-line:typedef
  static translateFn(x: number, y: number) {
    return function(v: Vec2): Vec2 {
      return Vec2.neo(v.x + x, v.y + y);
    };
  }
}
