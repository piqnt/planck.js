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
import Vec2 from './Vec2';
import Rot from './Rot';
import Transform from './Transform';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 */
export default class Sweep {
  /** Local center of mass position */
  localCenter: Vec2;

  /** World center position */
  c: Vec2;

  /** World angle */
  a: number;

  /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
  alpha0: number;

  c0: Vec2;
  a0: number;

  constructor(c?: Vec2, a?: number) {
    _ASSERT && common.assert(typeof c === 'undefined');
    _ASSERT && common.assert(typeof a === 'undefined');
    this.localCenter = Vec2.zero();
    this.c = Vec2.zero();
    this.a = 0;
    this.alpha0 = 0;
    this.c0 = Vec2.zero();
    this.a0 = 0;
  }

  setTransform(xf: Transform): void {
    const c = Transform.mulVec2(xf, this.localCenter);
    this.c.setVec2(c);
    this.c0.setVec2(c);

    this.a = xf.q.getAngle();
    this.a0 = xf.q.getAngle();
  }

  setLocalCenter(localCenter: Vec2, xf: Transform): void {
    this.localCenter.setVec2(localCenter);

    const c = Transform.mulVec2(xf, this.localCenter);
    this.c.setVec2(c);
    this.c0.setVec2(c);
  }

  /**
   * Get the interpolated transform at a specific time.
   *
   * @param xf
   * @param beta A factor in [0,1], where 0 indicates alpha0
   */
  getTransform(xf: Transform, beta: number = 0): void {
    xf.q.setAngle((1.0 - beta) * this.a0 + beta * this.a);
    xf.p.setCombine((1.0 - beta), this.c0, beta, this.c);

    // shift to origin
    xf.p.sub(Rot.mulVec2(xf.q, this.localCenter));
  }

  /**
   * Advance the sweep forward, yielding a new initial state.
   *
   * @param alpha The new initial time
   */
  advance(alpha: number): void {
    _ASSERT && common.assert(this.alpha0 < 1.0);
    const beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
    this.c0.setCombine(beta, this.c, 1 - beta, this.c0);
    this.a0 = beta * this.a + (1 - beta) * this.a0;
    this.alpha0 = alpha;
  }

  forward(): void {
    this.a0 = this.a;
    this.c0.setVec2(this.c);
  }

  /**
   * normalize the angles in radians to be between -pi and pi.
   */
  normalize(): void {
    const a0 = Math.mod(this.a0, -Math.PI, +Math.PI);
    this.a -= this.a0 - a0;
    this.a0 = a0;
  }

  clone(): Sweep {
    const clone = new Sweep();
    clone.localCenter.setVec2(this.localCenter);
    clone.alpha0 = this.alpha0;
    clone.a0 = this.a0;
    clone.a = this.a;
    clone.c0.setVec2(this.c0);
    clone.c.setVec2(this.c);
    return clone;
  }

  set(that: Sweep): void {
    this.localCenter.setVec2(that.localCenter);
    this.alpha0 = that.alpha0;
    this.a0 = that.a0;
    this.a = that.a;
    this.c0.setVec2(that.c0);
    this.c.setVec2(that.c);
  }
}
