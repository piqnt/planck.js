/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2, Vec2Value } from "./Vec2";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
export class Mat22 {
  ex: Vec2;
  ey: Vec2;

  constructor(a: number, b: number, c: number, d: number);
  constructor(a: { x: number; y: number }, b: { x: number; y: number });
  constructor();
  constructor(a?, b?, c?, d?) {
    if (typeof a === "object" && a !== null) {
      this.ex = Vec2.clone(a);
      this.ey = Vec2.clone(b);
    } else if (typeof a === "number") {
      this.ex = Vec2.neo(a, c);
      this.ey = Vec2.neo(b, d);
    } else {
      this.ex = Vec2.zero();
      this.ey = Vec2.zero();
    }
  }

  /** @hidden */
  toString(): string {
    return JSON.stringify(this);
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Mat22.isValid(o), "Invalid Mat22!", o);
  }

  set(a: Mat22): void;
  set(a: Vec2Value, b: Vec2Value): void;
  set(a: number, b: number, c: number, d: number): void;
  set(a, b?, c?, d?): void {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
      this.ex.setNum(a, c);
      this.ey.setNum(b, d);
    } else if (typeof a === "object" && typeof b === "object") {
      this.ex.setVec2(a);
      this.ey.setVec2(b);
    } else if (typeof a === "object") {
      if (_ASSERT) Mat22.assert(a);
      this.ex.setVec2(a.ex);
      this.ey.setVec2(a.ey);
    } else {
      if (_ASSERT) console.assert(false);
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
  solve(v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
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
  static mul(mx: Mat22, v: Vec2Value): Vec2;
  static mul(mx, v) {
    if (v && "x" in v && "y" in v) {
      if (_ASSERT) Vec2.assert(v);
      const x = mx.ex.x * v.x + mx.ey.x * v.y;
      const y = mx.ex.y * v.x + mx.ey.y * v.y;
      return Vec2.neo(x, y);
    } else if (v && "ex" in v && "ey" in v) {
      // Mat22
      if (_ASSERT) Mat22.assert(v);
      // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
      const a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
      const b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
      const c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
      const d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
      return new Mat22(a, b, c, d);
    }

    if (_ASSERT) console.assert(false);
  }

  static mulVec2(mx: Mat22, v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    const x = mx.ex.x * v.x + mx.ey.x * v.y;
    const y = mx.ex.y * v.x + mx.ey.y * v.y;
    return Vec2.neo(x, y);
  }

  static mulMat22(mx: Mat22, v: Mat22): Mat22 {
    if (_ASSERT) Mat22.assert(v);
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
  static mulT(mx: Mat22, v: Vec2Value): Vec2;
  static mulT(mx, v) {
    if (v && "x" in v && "y" in v) {
      // Vec2
      if (_ASSERT) Vec2.assert(v);
      return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
    } else if (v && "ex" in v && "ey" in v) {
      // Mat22
      if (_ASSERT) Mat22.assert(v);
      const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
      const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
      return new Mat22(c1, c2);
    }

    if (_ASSERT) console.assert(false);
  }

  static mulTVec2(mx: Mat22, v: Vec2Value): Vec2 {
    if (_ASSERT) Mat22.assert(mx);
    if (_ASSERT) Vec2.assert(v);
    return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
  }

  static mulTMat22(mx: Mat22, v: Mat22): Mat22 {
    if (_ASSERT) Mat22.assert(mx);
    if (_ASSERT) Mat22.assert(v);
    const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
    const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
    return new Mat22(c1, c2);
  }

  static abs(mx: Mat22): Mat22 {
    if (_ASSERT) Mat22.assert(mx);
    return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
  }

  static add(mx1: Mat22, mx2: Mat22): Mat22 {
    if (_ASSERT) Mat22.assert(mx1);
    if (_ASSERT) Mat22.assert(mx2);
    return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
  }
}
