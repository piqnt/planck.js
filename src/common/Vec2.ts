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
  static create(x: number=0, y: number=0): Vec2Value {
    return { x, y };
  }

  /** @internal */
  _serialize(): object {
    return {
      x: this.x,
      y: this.y
    };
  }

  /** @internal */
  static _deserialize(data: any): Vec2Value {
    return { x: data.x, y: data.y };
  }

  static zero(): Vec2Value {
    return { x: 0, y: 0 };
  }

  static copy(v: Vec2Value, out: Vec2Value): Vec2Value {
    _ASSERT && Vec2.assert(out) && Vec2.assert(v);
    out.x = v.x;
    out.y = v.y;
    return out;
  }

  static set(x: number, y: number, out: Vec2Value): Vec2Value {
    _ASSERT && Vec2.assert(out);
    out.x = x;
    out.y = y;
    return out;
  }

  static clone(v: Vec2Value): Vec2Value {
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
  static setZero(out: Vec2Value): Vec2Value {
    out.x = 0.0;
    out.y = 0.0;
    return out;
  }

  /**
   * scale a vector by a number
   */
  static scale(v: Vec2Value, a: number, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);

    const x = a * v.x;
    const y = a * v.y;

    return Vec2.set(x, y, out);
  }

  /**
   * Add linear combination of v and w: `src + (a * v + b * w)`
   */
  static addCombine(src: Vec2Value, a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(src);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);

    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    return Vec2.set(src.x + x, src.y + y, out);
  }

  addMul(a: number, v: Vec2Value): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Subtract linear combination of v and w: `src + (a * v + b * w)`
   */
  static subCombine(src: Vec2Value, a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);
    
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    return Vec2.set(src.x - x, src.y - y, out);
  }

  subMul(a: number, v: Vec2Value): Vec2Value {
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
  sub(w: Vec2Value): Vec2Value {
    _ASSERT && Vec2.assert(w);
    this.x -= w.x;
    this.y -= w.y;
    return this;
  }

  /**
   * Convert this vector into a unit vector.
   *
   * @returns old length
   */
  static normalize(v: Vec2Value, out: Vec2Value=Vec2.create()): number {
    const length = Vec2.length(v);
    if (length < EPSILON) {
      return 0.0;
    }
    const invLength = 1.0 / length;

    Vec2.set(v.x * invLength, v.y * invLengthx, out)
    return length;
  }

  /**
   * Get the length of this vector's normal.
   *
   * For performance, use this instead of lengthSquared (if possible).
   */
  static length(v: Vec2Value): number {
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
  static skew(v: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    return Vec2.set(-v.y, v.x, out);
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
  static cross(v: Vec2Value, w: number): Vec2Value;
  /** Cross product between a scalar and a vector */
  static cross(v: number, w: Vec2Value): Vec2Value;
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
  static crossVec2Num(v: Vec2Value, w: number, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(w));
    return Vec2.set(w * v.y, -w * v.x, out);
  }

  /** Cross product on a vector and a scalar */
  static crossNumVec2(v: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(v));
    _ASSERT && Vec2.assert(w);
    return Vec2.set(-v * w.y, v * w.x, out);
  }

  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: Vec2Value, w: number, out: Vec2Value=Vec2.create()): Vec2Value;
  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value;
  static addCross(a: Vec2Value, v: any, w: any, out: Vec2Value=Vec2.create()): Vec2Value {
    if (typeof w === 'number') {
      _ASSERT && Vec2.assert(v);
      _ASSERT && console.assert(Number.isFinite(w));
      return Vec2.set(w * v.y + a.x, -w * v.x + a.y, out);

    } else if (typeof v === 'number') {
      _ASSERT && console.assert(Number.isFinite(v));
      _ASSERT && Vec2.assert(w);
      return Vec2.set(-v * w.y + a.x, v * w.x + a.y, out);
    }

    _ASSERT && console.assert(false);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossVec2Num(a: Vec2Value, v: Vec2Value, w: number, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(w));
    return Vec2.set(w * v.y + a.x, -w * v.x + a.y, out);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossNumVec2(a: Vec2Value, v: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(v));
    _ASSERT && Vec2.assert(w);
    return Vec2.set(-v * w.y + a.x, v * w.x + a.y, out);
  }

  static add(v: Vec2Value, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.set(v.x + w.x, v.y + w.y, out);
  }

  /**
   * Set linear combination of v and w: `a * v + b * w`
   */
  static combine(a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(v);
    _ASSERT && console.assert(Number.isFinite(b));
    _ASSERT && Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    return Vec2.set(x, y, out);
  }

  static sub(v: Vec2Value, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.set(v.x - w.x, v.y - w.y, out);
  }

  static mul(a: Vec2Value, b: number, out: Vec2Value=Vec2.create()): Vec2Value;
  static mul(a: number, b: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value;
  static mul(a: any, b: any, out: Vec2Value=Vec2.create()): Vec2Value {
    if (typeof a === 'object') {
      _ASSERT && Vec2.assert(a);
      _ASSERT && console.assert(Number.isFinite(b));
      return Vec2.set(a.x * b, a.y * b, out);

    } else if (typeof b === 'object') {
      _ASSERT && console.assert(Number.isFinite(a));
      _ASSERT && Vec2.assert(b);
      return Vec2.set(a * b.x, a * b.y, out);
    }
  }

  static mulVec2Num(a: Vec2Value, b: number, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(a);
    _ASSERT && console.assert(Number.isFinite(b));
    return Vec2.set(a.x * b, a.y * b, out);
  }

  static mulNumVec2(a: number, b: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && console.assert(Number.isFinite(a));
    _ASSERT && Vec2.assert(b);
    return Vec2.set(a * b.x, a * b.y, out);
  }

  static neg(v: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    return Vec2.set(-v.x, -v.y, out);
  }

  static abs(v: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    return Vec2.set(math_abs(v.x), math_abs(v.y), out);
  }

  static mid(v: Vec2Value, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.set((v.x + w.x) * 0.5, (v.y + w.y) * 0.5, out);
  }

  static upper(v: Vec2Value, w: Vec2Value, out: Vec2Value=Vec2.create(): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.set(math_max(v.x, w.x), math_max(v.y, w.y), out);
  }

  static lower(v: Vec2Value, w: Vec2Value, out: Vec2Value=Vec2.create()): Vec2Value {
    _ASSERT && Vec2.assert(v);
    _ASSERT && Vec2.assert(w);
    return Vec2.set(math_min(v.x, w.x), math_min(v.y, w.y), out);
  }

  static clamp(v: Vec2Value, max: number, out: Vec2Value=Vec2.create()): Vec2Value {
    const lengthSqr = v.x * v.x + v.y * v.y;
    if (lengthSqr > max * max) {
      const scale = max / math_sqrt(lengthSqr);
      return Vec2.set(v.x * scale, v.y * scale, out);
    }

    return Vec2.copy(v, out);
  }

}
