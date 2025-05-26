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
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_sin = Math.sin;
/** @internal */ const math_cos = Math.cos;
/** @internal */ const math_atan2 = Math.atan2;

export interface RotValue {
  /** sin(angle) */
  s: number;
  /** cos(angle) */
  c: number;
}

declare module "./Rot" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Rot(angle: number): Rot;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Rot(obj: RotValue): Rot;
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Rot(): Rot;
}

/** Rotation */
// @ts-expect-error
export class Rot {
  /** sin(angle) */
  s: number;
  /** cos(angle) */
  c: number;

  /** Initialize from an angle in radians. */
  constructor(angle?: number | RotValue) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof Rot)) {
      return new Rot(angle);
    }
    if (typeof angle === "number") {
      this.setAngle(angle);
    } else if (typeof angle === "object") {
      this.setRot(angle);
    } else {
      this.setIdentity();
    }
  }

  /** @hidden */
  static neo(angle: number): Rot {
    const obj = Object.create(Rot.prototype);
    obj.setAngle(angle);
    return obj;
  }

  static clone(rot: RotValue): Rot {
    if (_ASSERT) Rot.assert(rot);
    const obj = Object.create(Rot.prototype);
    obj.s = rot.s;
    obj.c = rot.c;
    return obj;
  }

  static identity(): Rot {
    const obj = Object.create(Rot.prototype);
    obj.s = 0.0;
    obj.c = 1.0;
    return obj;
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return Number.isFinite(obj.s) && Number.isFinite(obj.c);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Rot.isValid(o), "Invalid Rot!", o);
  }

  /** Set to the identity rotation. */
  setIdentity(): void {
    this.s = 0.0;
    this.c = 1.0;
  }

  set(angle: number | RotValue): void {
    if (typeof angle === "object") {
      if (_ASSERT) Rot.assert(angle);
      this.s = angle.s;
      this.c = angle.c;
    } else {
      if (_ASSERT) console.assert(Number.isFinite(angle));
      // TODO_ERIN optimize
      this.s = math_sin(angle);
      this.c = math_cos(angle);
    }
  }

  setRot(angle: RotValue): void {
    if (_ASSERT) Rot.assert(angle);
    this.s = angle.s;
    this.c = angle.c;
  }

  /** Set using an angle in radians. */
  setAngle(angle: number): void {
    if (_ASSERT) console.assert(Number.isFinite(angle));
    // TODO_ERIN optimize
    this.s = math_sin(angle);
    this.c = math_cos(angle);
  }

  /** Get the angle in radians. */
  getAngle(): number {
    return math_atan2(this.s, this.c);
  }

  /** Get the x-axis. */
  getXAxis(): Vec2 {
    return Vec2.neo(this.c, this.s);
  }

  /** Get the y-axis. */
  getYAxis(): Vec2 {
    return Vec2.neo(-this.s, this.c);
  }

  /** Multiply two rotations: q * r */
  static mul(rot: RotValue, m: RotValue): Rot;
  /** Rotate a vector */
  static mul(rot: RotValue, m: Vec2Value): Vec2;
  static mul(rot, m) {
    if (_ASSERT) Rot.assert(rot);
    if ("c" in m && "s" in m) {
      if (_ASSERT) Rot.assert(m);
      // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
      // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
      // s = qs * rc + qc * rs
      // c = qc * rc - qs * rs
      const qr = Rot.identity();
      qr.s = rot.s * m.c + rot.c * m.s;
      qr.c = rot.c * m.c - rot.s * m.s;
      return qr;
    } else if ("x" in m && "y" in m) {
      if (_ASSERT) Vec2.assert(m);
      return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
    }
  }

  /** Multiply two rotations: q * r */
  static mulRot(rot: RotValue, m: RotValue): Rot {
    if (_ASSERT) Rot.assert(rot);
    if (_ASSERT) Rot.assert(m);
    // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
    // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
    // s = qs * rc + qc * rs
    // c = qc * rc - qs * rs
    const qr = Rot.identity();
    qr.s = rot.s * m.c + rot.c * m.s;
    qr.c = rot.c * m.c - rot.s * m.s;
    return qr;
  }

  /** Rotate a vector */
  static mulVec2(rot: RotValue, m: Vec2Value): Vec2 {
    if (_ASSERT) Rot.assert(rot);
    if (_ASSERT) Vec2.assert(m);
    return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
  }

  static mulSub(rot: RotValue, v: Vec2Value, w: Vec2Value): Vec2 {
    const x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
    const y = rot.s * (v.x - w.x) + rot.c * (v.y - w.y);
    return Vec2.neo(x, y);
  }

  /** Transpose multiply two rotations: qT * r */
  static mulT(rot: RotValue, m: RotValue): Rot;
  /** Inverse rotate a vector */
  static mulT(rot: RotValue, m: Vec2Value): Vec2;
  static mulT(rot, m) {
    if ("c" in m && "s" in m) {
      if (_ASSERT) Rot.assert(m);
      // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
      // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
      // s = qc * rs - qs * rc
      // c = qc * rc + qs * rs
      const qr = Rot.identity();
      qr.s = rot.c * m.s - rot.s * m.c;
      qr.c = rot.c * m.c + rot.s * m.s;
      return qr;
    } else if ("x" in m && "y" in m) {
      if (_ASSERT) Vec2.assert(m);
      return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
    }
  }

  /** Transpose multiply two rotations: qT * r */
  static mulTRot(rot: RotValue, m: RotValue): Rot {
    if (_ASSERT) Rot.assert(m);
    // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
    // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
    // s = qc * rs - qs * rc
    // c = qc * rc + qs * rs
    const qr = Rot.identity();
    qr.s = rot.c * m.s - rot.s * m.c;
    qr.c = rot.c * m.c + rot.s * m.s;
    return qr;
  }

  /** Inverse rotate a vector */
  static mulTVec2(rot: RotValue, m: Vec2Value): Vec2 {
    if (_ASSERT) Vec2.assert(m);
    return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
  }
}
