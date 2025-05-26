/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clamp, EPSILON } from "./Math";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;

/** 2D vector */
export interface Vec2Value {
  x: number;
  y: number;
}

declare module "./Vec2" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec2(x: number, y: number): Vec2;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec2(obj: Vec2Value): Vec2;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec2(): Vec2;
}

/** 2D vector */
// @ts-expect-error
export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(obj: Vec2Value);
  constructor();
  // tslint:disable-next-line:typedef
  constructor(x?, y?) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof Vec2)) {
      return new Vec2(x, y);
    }
    if (typeof x === "undefined") {
      this.x = 0;
      this.y = 0;
    } else if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
    if (_ASSERT) Vec2.assert(this);
  }

  /** @hidden */
  _serialize(): object {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /** @hidden */
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

  /** @hidden */
  static neo(x: number, y: number): Vec2 {
    const obj = Object.create(Vec2.prototype);
    obj.x = x;
    obj.y = y;
    return obj;
  }

  static clone(v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    return Vec2.neo(v.x, v.y);
  }

  /** @hidden */
  toString(): string {
    return JSON.stringify(this);
  }

  /**
   * Does this vector contain finite coordinates?
   */
  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return Number.isFinite(obj.x) && Number.isFinite(obj.y);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Vec2.isValid(o), "Invalid Vec2!", o);
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
  set(value: Vec2Value): Vec2;
  /**
   * Set this vector to some specified coordinates.
   *
   * @returns this
   */
  // tslint:disable-next-line:typedef
  set(x, y?) {
    if (typeof x === "object") {
      if (_ASSERT) Vec2.assert(x);
      this.x = x.x;
      this.y = x.y;
    } else {
      if (_ASSERT) console.assert(Number.isFinite(x));
      if (_ASSERT) console.assert(Number.isFinite(y));
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
    if (_ASSERT) console.assert(Number.isFinite(x));
    if (_ASSERT) console.assert(Number.isFinite(y));
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Set this vector to some specified coordinates.
   *
   * @returns this
   */
  setVec2(value: Vec2Value) {
    if (_ASSERT) Vec2.assert(value);
    this.x = value.x;
    this.y = value.y;

    return this;
  }

  /** @internal @deprecated Use setCombine or setMul */
  wSet(a: number, v: Vec2Value, b?: number, w?: Vec2Value): Vec2 {
    if (typeof b !== "undefined" || typeof w !== "undefined") {
      return this.setCombine(a, v, b, w);
    } else {
      return this.setMul(a, v);
    }
  }

  /**
   * Set linear combination of v and w: `a * v + b * w`
   */
  setCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) console.assert(Number.isFinite(b));
    if (_ASSERT) Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x = x;
    this.y = y;
    return this;
  }

  setMul(a: number, v: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
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
  add(w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(w);
    this.x += w.x;
    this.y += w.y;
    return this;
  }

  /** @internal @deprecated Use addCombine or addMul */
  wAdd(a: number, v: Vec2Value, b?: number, w?: Vec2Value): Vec2 {
    if (typeof b !== "undefined" || typeof w !== "undefined") {
      return this.addCombine(a, v, b, w);
    } else {
      return this.addMul(a, v);
    }
  }

  /**
   * Add linear combination of v and w: `a * v + b * w`
   */
  addCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) console.assert(Number.isFinite(b));
    if (_ASSERT) Vec2.assert(w);

    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x += x;
    this.y += y;
    return this;
  }

  addMul(a: number, v: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
    const x = a * v.x;
    const y = a * v.y;

    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * @deprecated Use subCombine or subMul
   */
  wSub(a: number, v: Vec2Value, b?: number, w?: Vec2Value): Vec2 {
    if (typeof b !== "undefined" || typeof w !== "undefined") {
      return this.subCombine(a, v, b, w);
    } else {
      return this.subMul(a, v);
    }
  }

  /**
   * Subtract linear combination of v and w: `a * v + b * w`
   */
  subCombine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) console.assert(Number.isFinite(b));
    if (_ASSERT) Vec2.assert(w);
    const x = a * v.x + b * w.x;
    const y = a * v.y + b * w.y;

    // `this` may be `w`
    this.x -= x;
    this.y -= y;
    return this;
  }

  subMul(a: number, v: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(v);
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
    if (_ASSERT) Vec2.assert(w);
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
    if (_ASSERT) console.assert(Number.isFinite(m));
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
   * Returns a new unit vector from the provided vector.
   *
   * @returns new unit vector
   */
  static normalize(v: Vec2Value): Vec2 {
    const length = Vec2.lengthOf(v);
    if (length < EPSILON) {
      return Vec2.zero();
    }
    const invLength = 1.0 / length;
    return Vec2.neo(v.x * invLength, v.y * invLength);
  }

  /**
   * Get the length of this vector (the norm).
   *
   * For performance, use this instead of lengthSquared (if possible).
   */
  static lengthOf(v: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    return math_sqrt(v.x * v.x + v.y * v.y);
  }

  /**
   * Get the length squared.
   */
  static lengthSquared(v: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    return v.x * v.x + v.y * v.y;
  }

  static distance(v: Vec2Value, w: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return math_sqrt(dx * dx + dy * dy);
  }

  static distanceSquared(v: Vec2Value, w: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    const dx = v.x - w.x;
    const dy = v.y - w.y;
    return dx * dx + dy * dy;
  }

  static areEqual(v: Vec2Value, w: Vec2Value): boolean {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return v === w || (typeof w === "object" && w !== null && v.x === w.x && v.y === w.y);
  }

  /**
   * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
   */
  static skew(v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    return Vec2.neo(-v.y, v.x);
  }

  /** Dot product on two vectors */
  static dot(v: Vec2Value, w: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return v.x * w.x + v.y * w.y;
  }

  /** Cross product between two vectors */
  static cross(v: Vec2Value, w: Vec2Value): number;
  /** Cross product between a vector and a scalar */
  static cross(v: Vec2Value, w: number): Vec2;
  /** Cross product between a scalar and a vector */
  static cross(v: number, w: Vec2Value): Vec2;
  static cross(v: any, w: any): any {
    if (typeof w === "number") {
      if (_ASSERT) Vec2.assert(v);
      if (_ASSERT) console.assert(Number.isFinite(w));
      return Vec2.neo(w * v.y, -w * v.x);
    } else if (typeof v === "number") {
      if (_ASSERT) console.assert(Number.isFinite(v));
      if (_ASSERT) Vec2.assert(w);
      return Vec2.neo(-v * w.y, v * w.x);
    } else {
      if (_ASSERT) Vec2.assert(v);
      if (_ASSERT) Vec2.assert(w);
      return v.x * w.y - v.y * w.x;
    }
  }

  /** Cross product on two vectors */
  static crossVec2Vec2(v: Vec2Value, w: Vec2Value): number {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return v.x * w.y - v.y * w.x;
  }

  /** Cross product on a vector and a scalar */
  static crossVec2Num(v: Vec2Value, w: number): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) console.assert(Number.isFinite(w));
    return Vec2.neo(w * v.y, -w * v.x);
  }

  /** Cross product on a vector and a scalar */
  static crossNumVec2(v: number, w: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(v));
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(-v * w.y, v * w.x);
  }

  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: Vec2Value, w: number): Vec2;
  /** Returns `a + (v x w)` */
  static addCross(a: Vec2Value, v: number, w: Vec2Value): Vec2;
  static addCross(a: Vec2Value, v: any, w: any): Vec2 {
    if (typeof w === "number") {
      if (_ASSERT) Vec2.assert(v);
      if (_ASSERT) console.assert(Number.isFinite(w));
      return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
    } else if (typeof v === "number") {
      if (_ASSERT) console.assert(Number.isFinite(v));
      if (_ASSERT) Vec2.assert(w);
      return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
    }

    if (_ASSERT) console.assert(false);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossVec2Num(a: Vec2Value, v: Vec2Value, w: number): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) console.assert(Number.isFinite(w));
    return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
  }

  /**
   * Returns `a + (v x w)`
   */
  static addCrossNumVec2(a: Vec2Value, v: number, w: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(v));
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
  }

  static add(v: Vec2Value, w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(v.x + w.x, v.y + w.y);
  }

  /** @hidden @deprecated */
  static wAdd(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    if (typeof b !== "undefined" || typeof w !== "undefined") {
      return Vec2.combine(a, v, b, w);
    } else {
      return Vec2.mulNumVec2(a, v);
    }
  }

  static combine(a: number, v: Vec2Value, b: number, w: Vec2Value): Vec2 {
    return Vec2.zero().setCombine(a, v, b, w);
  }

  static sub(v: Vec2Value, w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(v.x - w.x, v.y - w.y);
  }

  static mul(a: Vec2Value, b: number): Vec2;
  static mul(a: number, b: Vec2Value): Vec2;
  static mul(a: any, b: any): Vec2 {
    if (typeof a === "object") {
      if (_ASSERT) Vec2.assert(a);
      if (_ASSERT) console.assert(Number.isFinite(b));
      return Vec2.neo(a.x * b, a.y * b);
    } else if (typeof b === "object") {
      if (_ASSERT) console.assert(Number.isFinite(a));
      if (_ASSERT) Vec2.assert(b);
      return Vec2.neo(a * b.x, a * b.y);
    }
  }

  static mulVec2Num(a: Vec2Value, b: number): Vec2 {
    if (_ASSERT) Vec2.assert(a);
    if (_ASSERT) console.assert(Number.isFinite(b));
    return Vec2.neo(a.x * b, a.y * b);
  }

  static mulNumVec2(a: number, b: Vec2Value): Vec2 {
    if (_ASSERT) console.assert(Number.isFinite(a));
    if (_ASSERT) Vec2.assert(b);
    return Vec2.neo(a * b.x, a * b.y);
  }

  neg(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  static neg(v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    return Vec2.neo(-v.x, -v.y);
  }

  static abs(v: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    return Vec2.neo(math_abs(v.x), math_abs(v.y));
  }

  static mid(v: Vec2Value, w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
  }

  static upper(v: Vec2Value, w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(math_max(v.x, w.x), math_max(v.y, w.y));
  }

  static lower(v: Vec2Value, w: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(v);
    if (_ASSERT) Vec2.assert(w);
    return Vec2.neo(math_min(v.x, w.x), math_min(v.y, w.y));
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
    const r = Vec2.neo(v.x, v.y);
    r.clamp(max);
    return r;
  }

  /** @hidden */
  static clampVec2(v: Vec2Value, min?: Vec2Value, max?: Vec2Value): Vec2Value {
    return {
      x: clamp(v.x, min?.x, max?.x),
      y: clamp(v.y, min?.y, max?.y),
    };
  }

  /**  @hidden @deprecated */
  static scaleFn(x: number, y: number) {
    // todo: this was used in examples, remove in the future
    return function (v: Vec2Value): Vec2 {
      return Vec2.neo(v.x * x, v.y * y);
    };
  }

  /**  @hidden @deprecated */
  static translateFn(x: number, y: number) {
    // todo: this was used in examples, remove in the future
    return function (v: Vec2Value): Vec2 {
      return Vec2.neo(v.x + x, v.y + y);
    };
  }
}
