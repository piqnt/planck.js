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


export default class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number);
  constructor(obj: { x: number, y: number, z: number });
  constructor();
  // tslint:disable-next-line:typedef
  constructor(x?, y?, z?) {
    if (!(this instanceof Vec3)) {
      return new Vec3(x, y, z);
    }
    if (typeof x === 'undefined') {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    _ASSERT && Vec3.assert(this);
  }

  /** @internal */
  _serialize(): object {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  /** @internal */
  static _deserialize(data: any): Vec3 {
    const obj = Object.create(Vec3.prototype);
    obj.x = data.x;
    obj.y = data.y;
    obj.z = data.z;
    return obj;
  }

  /** @internal */
  static neo(x: number, y: number, z: number): Vec3 {
    const obj = Object.create(Vec3.prototype);
    obj.x = x;
    obj.y = y;
    obj.z = z;
    return obj;
  }

  static zero(): Vec3 {
    const obj = Object.create(Vec3.prototype);
    obj.x = 0;
    obj.y = 0;
    obj.z = 0;
    return obj;
  }

  static clone(v: Vec3): Vec3 {
    _ASSERT && Vec3.assert(v);
    return Vec3.neo(v.x, v.y, v.z);
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
    return Math.isFinite(obj.x) && Math.isFinite(obj.y) && Math.isFinite(obj.z);
  }

  static assert(o: any): void {
    if (!_ASSERT) return;
    if (!Vec3.isValid(o)) {
      _DEBUG && common.debug(o);
      throw new Error('Invalid Vec3!');
    }
  }

  setZero(): Vec3 {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    return this;
  }

  set(x: number, y: number, z: number): Vec3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  add(w: Vec3): Vec3 {
    this.x += w.x;
    this.y += w.y;
    this.z += w.z;
    return this;
  }

  sub(w: Vec3): Vec3 {
    this.x -= w.x;
    this.y -= w.y;
    this.z -= w.z;
    return this;
  }

  mul(m: number): Vec3 {
    this.x *= m;
    this.y *= m;
    this.z *= m;
    return this;
  }

  static areEqual(v: Vec3, w: Vec3): boolean {
    _ASSERT && Vec3.assert(v);
    _ASSERT && Vec3.assert(w);
    return v === w ||
      typeof v === 'object' && v !== null &&
      typeof w === 'object' && w !== null &&
      v.x === w.x && v.y === w.y && v.z === w.z;
  }

  /**
   * Perform the dot product on two vectors.
   */
  static dot(v: Vec3, w: Vec3): number {
    return v.x * w.x + v.y * w.y + v.z * w.z;
  }

  /**
   * Perform the cross product on two vectors. In 2D this produces a scalar.
   */
  static cross(v: Vec3, w: Vec3): Vec3 {
    return new Vec3(
      v.y * w.z - v.z * w.y,
      v.z * w.x - v.x * w.z,
      v.x * w.y - v.y * w.x
    );
  }

  static add(v: Vec3, w: Vec3): Vec3 {
    return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
  }

  static sub(v: Vec3, w: Vec3): Vec3 {
    return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
  }

  static mul(v: Vec3, m: number): Vec3 {
    return new Vec3(m * v.x, m * v.y, m * v.z);
  }

  neg(): Vec3 {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  static neg(v: Vec3): Vec3 {
    return new Vec3(-v.x, -v.y, -v.z);
  }
}
