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
import { Vec2 } from './Vec2';


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
export class Mat22 {
  ex: Vec2;
  ey: Vec2;

  constructor(a: number, b: number, c: number, d: number);
  constructor(a: { x: number; y: number }, b: { x: number; y: number });
  constructor();
  // tslint:disable-next-line:typedef
  constructor(a?, b?, c?, d?) {
    if (typeof a === 'object' && a !== null) {
      this.ex = Vec2.clone(a);
      this.ey = Vec2.clone(b);
    } else if (typeof a === 'number') {
      this.ex = Vec2.neo(a, c);
      this.ey = Vec2.neo(b, d);
    } else {
      this.ex = Vec2.zero();
      this.ey = Vec2.zero();
    }
  }

  /** @internal */
  toString(): string {
    return JSON.stringify(this);
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
  }

  static assert(o: any): void {
    if (!_ASSERT) return;
    if (!Mat22.isValid(o)) {
      _DEBUG && common.debug(o);
      throw new Error('Invalid Mat22!');
    }
  }

  set(a: Mat22): void;
  set(a: Vec2, b: Vec2): void;
  set(a: number, b: number, c: number, d: number): void;
  // tslint:disable-next-line:typedef
  set(a, b?, c?, d?): void {
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number'
      && typeof d === 'number') {
      this.ex.setNum(a, c);
      this.ey.setNum(b, d);

    } else if (typeof a === 'object' && typeof b === 'object') {
      this.ex.setVec2(a);
      this.ey.setVec2(b);

    } else if (typeof a === 'object') {
      _ASSERT && Mat22.assert(a);
      this.ex.setVec2(a.ex);
      this.ey.setVec2(a.ey);

    } else {
      _ASSERT && common.assert(false);
    }
  }

  setIdentity(): void {
    this.ex.x = 1.0;
    this.ey.x = 0.0;
    this.ex.y = 0.0;
    this.ey.y = 1.0;
  }

  setZero(): void {
    this.ex.x = 0.0;
    this.ey.x = 0.0;
    this.ex.y = 0.0;
    this.ey.y = 0.0;
  }

  getInverse(): Mat22 {
    const a = this.ex.x;
    const b = this.ey.x;
    const c = this.ex.y;
    const d = this.ey.y;
    let det = a * d - b * c;
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    const imx = new Mat22();
    imx.ex.x = det * d;
    imx.ey.x = -det * b;
    imx.ex.y = -det * c;
    imx.ey.y = det * a;
    return imx;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient than
   * computing the inverse in one-shot cases.
   */
  solve(v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    const a = this.ex.x;
    const b = this.ey.x;
    const c = this.ex.y;
    const d = this.ey.y;
    let det = a * d - b * c;
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    const w = Vec2.zero();
    w.x = det * (d * v.x - b * v.y);
    w.y = det * (a * v.y - c * v.x);
    return w;
  }

  /**
   * Multiply a matrix times a vector. If a rotation matrix is provided, then this
   * transforms the vector from one frame to another.
   */
  static mul(mx: Mat22, my: Mat22): Mat22;
  static mul(mx: Mat22, v: Vec2): Vec2;
  // tslint:disable-next-line:typedef
  static mul(mx, v) {
    if (v && 'x' in v && 'y' in v) {
      _ASSERT && Vec2.assert(v);
      const x = mx.ex.x * v.x + mx.ey.x * v.y;
      const y = mx.ex.y * v.x + mx.ey.y * v.y;
      return Vec2.neo(x, y);

    } else if (v && 'ex' in v && 'ey' in v) { // Mat22
      _ASSERT && Mat22.assert(v);
      // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
      const a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
      const b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
      const c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
      const d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
      return new Mat22(a, b, c, d);
    }

    _ASSERT && common.assert(false);
  }

  static mulVec2(mx: Mat22, v: Vec2): Vec2 {
    _ASSERT && Vec2.assert(v);
    const x = mx.ex.x * v.x + mx.ey.x * v.y;
    const y = mx.ex.y * v.x + mx.ey.y * v.y;
    return Vec2.neo(x, y);
  }

  static mulMat22(mx: Mat22, v: Mat22): Mat22 {
    _ASSERT && Mat22.assert(v);
    // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
    const a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
    const b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
    const c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
    const d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
    return new Mat22(a, b, c, d);
  }

  /**
   * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
   * then this transforms the vector from one frame to another (inverse
   * transform).
   */
  static mulT(mx: Mat22, my: Mat22): Mat22;
  static mulT(mx: Mat22, v: Vec2): Vec2;
  // tslint:disable-next-line:typedef
  static mulT(mx, v) {
    if (v && 'x' in v && 'y' in v) { // Vec2
      _ASSERT && Vec2.assert(v);
      return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));

    } else if (v && 'ex' in v && 'ey' in v) { // Mat22
      _ASSERT && Mat22.assert(v);
      const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
      const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
      return new Mat22(c1, c2);
    }

    _ASSERT && common.assert(false);
  }

  static mulTVec2(mx: Mat22, v: Vec2): Vec2 {
    _ASSERT && Mat22.assert(mx);
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
  }

  static mulTMat22(mx: Mat22, v: Mat22): Mat22 {
    _ASSERT && Mat22.assert(mx);
    _ASSERT && Mat22.assert(v);
    const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
    const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
    return new Mat22(c1, c2);
  }

  static abs(mx: Mat22): Mat22 {
    _ASSERT && Mat22.assert(mx);
    return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
  }

  static add(mx1: Mat22, mx2: Mat22): Mat22 {
    _ASSERT && Mat22.assert(mx1);
    _ASSERT && Mat22.assert(mx2);
    return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
  }
}
