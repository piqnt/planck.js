/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2, Vec2Value } from "./Vec2";
import { Rot, RotValue } from "./Rot";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

export type TransformValue = {
  p: Vec2Value;
  q: RotValue;
};

declare module "./Transform" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function Transform(position?: Vec2Value, rotation?: number): Transform;
}

/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 */
// @ts-expect-error
export class Transform {
  /** position */
  p: Vec2;

  /** rotation */
  q: Rot;

  constructor(position?: Vec2Value, rotation?: number) {
    if (_CONSTRUCTOR_FACTORY && !(this instanceof Transform)) {
      return new Transform(position, rotation);
    }
    this.p = Vec2.zero();
    this.q = Rot.identity();
    if (typeof position !== "undefined") {
      this.p.setVec2(position);
    }
    if (typeof rotation !== "undefined") {
      this.q.setAngle(rotation);
    }
  }

  static clone(xf: Transform): Transform {
    const obj = Object.create(Transform.prototype);
    obj.p = Vec2.clone(xf.p);
    obj.q = Rot.clone(xf.q);
    return obj;
  }

  /** @hidden */
  static neo(position: Vec2Value, rotation: Rot): Transform {
    const obj = Object.create(Transform.prototype);
    obj.p = Vec2.clone(position);
    obj.q = Rot.clone(rotation);
    return obj;
  }

  static identity(): Transform {
    const obj = Object.create(Transform.prototype);
    obj.p = Vec2.zero();
    obj.q = Rot.identity();
    return obj;
  }

  /** Set this to the identity transform */
  setIdentity(): void {
    this.p.setZero();
    this.q.setIdentity();
  }

  /** Set position and angle */
  set(position: Vec2Value, rotation: number): void;
  /** Copy from another transform */
  set(xf: TransformValue): void;
  set(a: any, b?: any) {
    if (typeof b === "undefined") {
      this.p.set(a.p);
      this.q.set(a.q);
    } else {
      this.p.set(a);
      this.q.set(b);
    }
  }

  /** Set position and angle */
  setNum(position: Vec2Value, rotation: number) {
    this.p.setVec2(position);
    this.q.setAngle(rotation);
  }

  setTransform(xf: TransformValue): void {
    this.p.setVec2(xf.p);
    this.q.setRot(xf.q);
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === "undefined") {
      return false;
    }
    return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
  }

  static assert(o: any): void {
    if (_ASSERT) console.assert(!Transform.isValid(o), "Invalid Transform!", o);
  }

  static mul(a: TransformValue, b: Vec2Value): Vec2;
  static mul(a: TransformValue, b: TransformValue): Transform;
  // static mul(a: Transform, b: Vec2Value[]): Vec2[];
  // static mul(a: Transform, b: Transform[]): Transform[];
  static mul(a, b) {
    if (Array.isArray(b)) {
      // todo: this was used in examples, remove in the future
      if (_ASSERT) Transform.assert(a);
      const arr = [];
      for (let i = 0; i < b.length; i++) {
        arr[i] = Transform.mul(a, b[i]);
      }
      return arr;
    } else if ("x" in b && "y" in b) {
      return Transform.mulVec2(a, b);
    } else if ("p" in b && "q" in b) {
      return Transform.mulXf(a, b);
    }
  }

  static mulAll(a: Transform, b: Vec2Value[]): Vec2[];
  static mulAll(a: Transform, b: Transform[]): Transform[];
  static mulAll(a: TransformValue, b) {
    if (_ASSERT) Transform.assert(a);
    const arr = [];
    for (let i = 0; i < b.length; i++) {
      arr[i] = Transform.mul(a, b[i]);
    }
    return arr;
  }

  /** @hidden @deprecated */
  static mulFn(a: TransformValue) {
    // todo: this was used in examples, remove in the future
    if (_ASSERT) Transform.assert(a);
    return function (b: Vec2Value): Vec2 {
      return Transform.mul(a, b);
    };
  }

  static mulVec2(a: TransformValue, b: Vec2Value): Vec2 {
    if (_ASSERT) Transform.assert(a);
    if (_ASSERT) Vec2.assert(b);
    const x = a.q.c * b.x - a.q.s * b.y + a.p.x;
    const y = a.q.s * b.x + a.q.c * b.y + a.p.y;
    return Vec2.neo(x, y);
  }

  static mulXf(a: TransformValue, b: TransformValue): Transform {
    if (_ASSERT) Transform.assert(a);
    if (_ASSERT) Transform.assert(b);
    // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
    // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
    const xf = Transform.identity();
    xf.q = Rot.mulRot(a.q, b.q);
    xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
    return xf;
  }

  static mulT(a: TransformValue, b: Vec2Value): Vec2;
  static mulT(a: TransformValue, b: TransformValue): Transform;
  static mulT(a, b) {
    if ("x" in b && "y" in b) {
      return Transform.mulTVec2(a, b);
    } else if ("p" in b && "q" in b) {
      return Transform.mulTXf(a, b);
    }
  }

  static mulTVec2(a: TransformValue, b: Vec2Value): Vec2 {
    if (_ASSERT) Transform.assert(a);
    if (_ASSERT) Vec2.assert(b);
    const px = b.x - a.p.x;
    const py = b.y - a.p.y;
    const x = a.q.c * px + a.q.s * py;
    const y = -a.q.s * px + a.q.c * py;
    return Vec2.neo(x, y);
  }

  static mulTXf(a: TransformValue, b: TransformValue): Transform {
    if (_ASSERT) Transform.assert(a);
    if (_ASSERT) Transform.assert(b);
    // v2 = A.q' * (B.q * v1 + B.p - A.p)
    // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
    const xf = Transform.identity();
    xf.q.setRot(Rot.mulTRot(a.q, b.q));
    xf.p.setVec2(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
    return xf;
  }
}
