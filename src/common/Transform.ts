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
import { Rot } from './Rot';


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 */
export class Transform {
  /** position */
  p: Vec2;

  /** rotation */
  q: Rot;

  constructor(position?: Vec2, rotation?: number) {
    if (!(this instanceof Transform)) {
      return new Transform(position, rotation);
    }
    this.p = Vec2.zero();
    this.q = Rot.identity();
    if (typeof position !== 'undefined') {
      this.p.setVec2(position);
    }
    if (typeof rotation !== 'undefined') {
      this.q.setAngle(rotation);
    }
  }

  static clone(xf: Transform): Transform {
    const obj = Object.create(Transform.prototype);
    obj.p = Vec2.clone(xf.p);
    obj.q = Rot.clone(xf.q);
    return obj;
  }

  /** @internal */
  static neo(position: Vec2, rotation: Rot): Transform {
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

  /**
   * Set this to the identity transform.
   */
  setIdentity(): void {
    this.p.setZero();
    this.q.setIdentity();
  }

  set(position: Vec2, rotation: number): void;
  set(xf: Transform): void;
  /**
   * Set this based on the position and angle.
   */
  // tslint:disable-next-line:typedef
  set(a, b?) {
    if (typeof b === 'undefined') {
      this.p.set(a.p);
      this.q.set(a.q);
    } else {
      this.p.set(a);
      this.q.set(b);
    }
  }

  /**
   * Set this based on the position and angle.
   */
  setNum(position: Vec2, rotation: number) {
    this.p.setVec2(position);
    this.q.setAngle(rotation);
  }

  setTransform(xf: Transform): void {
    this.p.setVec2(xf.p);
    this.q.setRot(xf.q);
  }

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
  }

  static assert(o: any): void {
    if (!_ASSERT) return;
    if (!Transform.isValid(o)) {
      _DEBUG && common.debug(o);
      throw new Error('Invalid Transform!');
    }
  }

  static mul(a: Transform, b: Vec2): Vec2;
  static mul(a: Transform, b: Transform): Transform;
  // static mul(a: Transform, b: Vec2[]): Vec2[];
  // static mul(a: Transform, b: Transform[]): Transform[];
  // tslint:disable-next-line:typedef
  static mul(a, b) {
    if (Array.isArray(b)) {
      _ASSERT && Transform.assert(a);
      const arr = [];
      for (let i = 0; i < b.length; i++) {
        arr[i] = Transform.mul(a, b[i]);
      }
      return arr;

    } else if ('x' in b && 'y' in b) {
      return Transform.mulVec2(a, b);

    } else if ('p' in b && 'q' in b) {
      return Transform.mulXf(a, b);
    }
  }

  static mulAll(a: Transform, b: Vec2[]): Vec2[];
  static mulAll(a: Transform, b: Transform[]): Transform[];
  // tslint:disable-next-line:typedef
  static mulAll(a: Transform, b) {
    _ASSERT && Transform.assert(a);
    const arr = [];
    for (let i = 0; i < b.length; i++) {
      arr[i] = Transform.mul(a, b[i]);
    }
    return arr;
  }

  /** @internal @deprecated */
  // tslint:disable-next-line:typedef
  static mulFn(a: Transform) {
    _ASSERT && Transform.assert(a);
    return function(b: Vec2): Vec2 {
      return Transform.mul(a, b);
    };
  }

  static mulVec2(a: Transform, b: Vec2): Vec2 {
    _ASSERT && Transform.assert(a);
    _ASSERT && Vec2.assert(b);
    const x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
    const y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
    return Vec2.neo(x, y);
  }

  static mulXf(a: Transform, b: Transform): Transform {
    _ASSERT && Transform.assert(a);
    _ASSERT && Transform.assert(b);
    // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
    // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
    const xf = Transform.identity();
    xf.q = Rot.mulRot(a.q, b.q);
    xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
    return xf;
  }

  static mulT(a: Transform, b: Vec2): Vec2;
  static mulT(a: Transform, b: Transform): Transform;
  // tslint:disable-next-line:typedef
  static mulT(a, b) {
    if ('x' in b && 'y' in b) {
      return Transform.mulTVec2(a, b);

    } else if ('p' in b && 'q' in b) {
      return Transform.mulTXf(a, b);
    }
  }

  static mulTVec2(a: Transform, b: Vec2): Vec2 {
    _ASSERT && Transform.assert(a);
    _ASSERT && Vec2.assert(b);
    const px = b.x - a.p.x;
    const py = b.y - a.p.y;
    const x = (a.q.c * px + a.q.s * py);
    const y = (-a.q.s * px + a.q.c * py);
    return Vec2.neo(x, y);
  }

  static mulTXf(a: Transform, b: Transform): Transform {
    _ASSERT && Transform.assert(a);
    _ASSERT && Transform.assert(b);
    // v2 = A.q' * (B.q * v1 + B.p - A.p)
    // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
    const xf = Transform.identity();
    xf.q.setRot(Rot.mulTRot(a.q, b.q));
    xf.p.setVec2(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
    return xf;
  }
}
