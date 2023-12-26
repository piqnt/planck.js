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

import * as matrix from './Matrix';
import { mod } from './Math';
import { Vec2, Vec2Value } from './Vec2';
import { TransformValue } from './Transform';


/** @internal */ const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;
/** @internal */ const math_atan2 = Math.atan2;
/** @internal */ const math_PI = Math.PI;


/** @internal */ const temp = matrix.vec2(0, 0);

/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 */
export class Sweep {
  /** Local center of mass position */
  localCenter = Vec2.zero();

  /** World center position */
  c = Vec2.zero();

  /** World angle */
  a = 0;

  /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
  alpha0 = 0;

  c0 = Vec2.zero();
  a0 = 0;

  /** @internal */
  recycle() {
    matrix.zeroVec2(this.localCenter)
    matrix.zeroVec2(this.c)
    this.a = 0;
    this.alpha0 = 0;
    matrix.zeroVec2(this.c0)
    this.a0 = 0;
  }

  setTransform(xf: TransformValue): void {
    matrix.transformVec2(temp, xf, this.localCenter);
    matrix.copyVec2(this.c, temp);
    matrix.copyVec2(this.c0, temp);

    this.a = this.a0 = math_atan2(xf.q.s, xf.q.c);
  }

  setLocalCenter(localCenter: Vec2Value, xf: TransformValue): void {
    matrix.copyVec2(this.localCenter, localCenter);

    matrix.transformVec2(temp, xf, this.localCenter);
    matrix.copyVec2(this.c, temp);
    matrix.copyVec2(this.c0, temp);
  }

  /**
   * Get the interpolated transform at a specific time.
   *
   * @param xf
   * @param beta A factor in [0,1], where 0 indicates alpha0
   */
  getTransform(xf: TransformValue, beta: number = 0): void {
    matrix.setRotAngle(xf.q, (1.0 - beta) * this.a0 + beta * this.a);
    matrix.combine2Vec2(xf.p, (1.0 - beta), this.c0, beta, this.c);

    // shift to origin
    matrix.minusVec2(xf.p, matrix.rotVec2(temp, xf.q, this.localCenter));
  }

  /**
   * Advance the sweep forward, yielding a new initial state.
   *
   * @param alpha The new initial time
   */
  advance(alpha: number): void {
    _ASSERT && console.assert(this.alpha0 < 1.0);
    const beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
    matrix.combine2Vec2(this.c0, beta, this.c, 1 - beta, this.c0);
    this.a0 = beta * this.a + (1 - beta) * this.a0;
    this.alpha0 = alpha;
  }

  forward(): void {
    this.a0 = this.a;
    matrix.copyVec2(this.c0, this.c);
  }

  /**
   * normalize the angles in radians to be between -pi and pi.
   */
  normalize(): void {
    const a0 = mod(this.a0, -math_PI, +math_PI);
    this.a -= this.a0 - a0;
    this.a0 = a0;
  }

  set(that: Sweep): void {
    matrix.copyVec2(this.localCenter, that.localCenter);
    matrix.copyVec2(this.c, that.c);
    this.a = that.a;
    this.alpha0 = that.alpha0;
    matrix.copyVec2(this.c0, that.c0);
    this.a0 = that.a0;
  }
}
