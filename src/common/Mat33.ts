/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2, Vec2Value } from "./Vec2";
import { Vec3, Vec3Value } from "./Vec3";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

/**
 * A 3-by-3 matrix. Stored in column-major order.
 */
export class Mat33 {
  ex: Vec3;
  ey: Vec3;
  ez: Vec3;

  constructor(a: Vec3Value, b: Vec3Value, c: Vec3Value);
  constructor();
  constructor(a?: Vec3Value, b?: Vec3Value, c?: Vec3Value) {
    if (typeof a === "object" && a !== null) {
      this.ex = Vec3.clone(a);
      this.ey = Vec3.clone(b);
      this.ez = Vec3.clone(c);
    } else {
      this.ex = Vec3.zero();
      this.ey = Vec3.zero();
      this.ez = Vec3.zero();
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
    return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Mat33.isValid(o), "Invalid Mat33!", o);
  }

  /**
   * Set this matrix to all zeros.
   */
  setZero(): Mat33 {
    this.ex.setZero();
    this.ey.setZero();
    this.ez.setZero();
    return this;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient than
   * computing the inverse in one-shot cases.
   */
  solve33(v: Vec3Value): Vec3 {
    // let det = matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, this.ez));
    let cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
    let cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
    let cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
    let det = this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z;
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    const r = new Vec3();
    // r.x = det * matrix.dotVec3(v, matrix.newCrossVec3(this.ey, this.ez));
    cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
    cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
    cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
    r.x = det * (v.x * cross_x + v.y * cross_y + v.z * cross_z);

    // r.y = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(v, this.ez));
    cross_x = v.y * this.ez.z - v.z * this.ez.y;
    cross_y = v.z * this.ez.x - v.x * this.ez.z;
    cross_z = v.x * this.ez.y - v.y * this.ez.x;
    r.y = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);

    // r.z = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, v));
    cross_x = this.ey.y * v.z - this.ey.z * v.y;
    cross_y = this.ey.z * v.x - this.ey.x * v.z;
    cross_z = this.ey.x * v.y - this.ey.y * v.x;
    r.z = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
    return r;
  }

  /**
   * Solve A * x = b, where b is a column vector. This is more efficient than
   * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
   * equation.
   */
  solve22(v: Vec2Value): Vec2 {
    const a11 = this.ex.x;
    const a12 = this.ey.x;
    const a21 = this.ex.y;
    const a22 = this.ey.y;
    let det = a11 * a22 - a12 * a21;
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    const r = Vec2.zero();
    r.x = det * (a22 * v.x - a12 * v.y);
    r.y = det * (a11 * v.y - a21 * v.x);
    return r;
  }

  /**
   * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
   * singular.
   */
  getInverse22(M: Mat33): void {
    const a = this.ex.x;
    const b = this.ey.x;
    const c = this.ex.y;
    const d = this.ey.y;
    let det = a * d - b * c;
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    M.ex.x = det * d;
    M.ey.x = -det * b;
    M.ex.z = 0.0;
    M.ex.y = -det * c;
    M.ey.y = det * a;
    M.ey.z = 0.0;
    M.ez.x = 0.0;
    M.ez.y = 0.0;
    M.ez.z = 0.0;
  }

  /**
   * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
   * if singular.
   */
  getSymInverse33(M: Mat33): void {
    let det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
    if (det !== 0.0) {
      det = 1.0 / det;
    }
    const a11 = this.ex.x;
    const a12 = this.ey.x;
    const a13 = this.ez.x;
    const a22 = this.ey.y;
    const a23 = this.ez.y;
    const a33 = this.ez.z;

    M.ex.x = det * (a22 * a33 - a23 * a23);
    M.ex.y = det * (a13 * a23 - a12 * a33);
    M.ex.z = det * (a12 * a23 - a13 * a22);

    M.ey.x = M.ex.y;
    M.ey.y = det * (a11 * a33 - a13 * a13);
    M.ey.z = det * (a13 * a12 - a11 * a23);

    M.ez.x = M.ex.z;
    M.ez.y = M.ey.z;
    M.ez.z = det * (a11 * a22 - a12 * a12);
  }

  /**
   * Multiply a matrix times a vector.
   */
  static mul(a: Mat33, b: Vec2Value): Vec2;
  static mul(a: Mat33, b: Vec3Value): Vec3;
  static mul(a, b) {
    if (_ASSERT) Mat33.assert(a);
    if (b && "z" in b && "y" in b && "x" in b) {
      if (_ASSERT) Vec3.assert(b);
      const x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
      const y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
      const z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
      return new Vec3(x, y, z);
    } else if (b && "y" in b && "x" in b) {
      if (_ASSERT) Vec2.assert(b);
      const x = a.ex.x * b.x + a.ey.x * b.y;
      const y = a.ex.y * b.x + a.ey.y * b.y;
      return Vec2.neo(x, y);
    }

    if (_ASSERT) console.assert(false);
  }

  static mulVec3(a: Mat33, b: Vec3Value): Vec3 {
    if (_ASSERT) Mat33.assert(a);
    if (_ASSERT) Vec3.assert(b);
    const x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
    const y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
    const z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
    return new Vec3(x, y, z);
  }

  static mulVec2(a: Mat33, b: Vec2Value): Vec2 {
    if (_ASSERT) Mat33.assert(a);
    if (_ASSERT) Vec2.assert(b);
    const x = a.ex.x * b.x + a.ey.x * b.y;
    const y = a.ex.y * b.x + a.ey.y * b.y;
    return Vec2.neo(x, y);
  }

  static add(a: Mat33, b: Mat33): Mat33 {
    if (_ASSERT) Mat33.assert(a);
    if (_ASSERT) Mat33.assert(b);
    return new Mat33(Vec3.add(a.ex, b.ex), Vec3.add(a.ey, b.ey), Vec3.add(a.ez, b.ez));
  }
}
