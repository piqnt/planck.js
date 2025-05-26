/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

/** 3D vector */
export interface Vec3Value {
  x: number;
  y: number;
  z: number;
}

declare module "./Vec3" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec3(x: number, y: number, z: number): Vec3;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec3(obj: Vec3Value): Vec3;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Vec3(): Vec3;
}

/** 3D vector */
// @ts-expect-error
export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number);
  constructor(obj: Vec3Value);
  constructor();
  constructor(x?, y?, z?) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof Vec3)) {
      return new Vec3(x, y, z);
    }
    if (typeof x === "undefined") {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else if (typeof x === "object") {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    if (_ASSERT) Vec3.assert(this);
  }

  /** @hidden */
  _serialize(): object {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  /** @hidden */
  static _deserialize(data: any): Vec3 {
    const obj = Object.create(Vec3.prototype);
    obj.x = data.x;
    obj.y = data.y;
    obj.z = data.z;
    return obj;
  }

  /** @hidden */
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

  static clone(v: Vec3Value): Vec3 {
    if (_ASSERT) Vec3.assert(v);
    return Vec3.neo(v.x, v.y, v.z);
  }

  /** @hidden */
  toString(): string {
    return JSON.stringify(this);
  }

  /** Does this vector contain finite coordinates? */
  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return Number.isFinite(obj.x) && Number.isFinite(obj.y) && Number.isFinite(obj.z);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Vec3.isValid(o), "Invalid Vec3!", o);
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

  add(w: Vec3Value): Vec3 {
    this.x += w.x;
    this.y += w.y;
    this.z += w.z;
    return this;
  }

  sub(w: Vec3Value): Vec3 {
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

  static areEqual(v: Vec3Value, w: Vec3Value): boolean {
    if (_ASSERT) Vec3.assert(v);
    if (_ASSERT) Vec3.assert(w);
    return (
      v === w ||
      (typeof v === "object" &&
        v !== null &&
        typeof w === "object" &&
        w !== null &&
        v.x === w.x &&
        v.y === w.y &&
        v.z === w.z)
    );
  }

  /** Dot product on two vectors */
  static dot(v: Vec3Value, w: Vec3Value): number {
    return v.x * w.x + v.y * w.y + v.z * w.z;
  }

  /** Cross product on two vectors */
  static cross(v: Vec3Value, w: Vec3Value): Vec3 {
    return new Vec3(v.y * w.z - v.z * w.y, v.z * w.x - v.x * w.z, v.x * w.y - v.y * w.x);
  }

  static add(v: Vec3Value, w: Vec3Value): Vec3 {
    return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
  }

  static sub(v: Vec3Value, w: Vec3Value): Vec3 {
    return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
  }

  static mul(v: Vec3Value, m: number): Vec3 {
    return new Vec3(m * v.x, m * v.y, m * v.z);
  }

  neg(): Vec3 {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  static neg(v: Vec3Value): Vec3 {
    return new Vec3(-v.x, -v.y, -v.z);
  }
}
