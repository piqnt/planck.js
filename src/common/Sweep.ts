/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as geo from "./Geo";
import { mod } from "./Math";
import { Vec2Value } from "./Vec2";
import { TransformValue } from "./Transform";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_atan2 = Math.atan2;
/** @internal */ const math_PI = Math.PI;

/** @internal */ const temp = geo.vec2(0, 0);

/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 */
export class Sweep {
  /** Local center of mass position */
  localCenter = geo.vec2(0, 0);

  /** World center position */
  c = geo.vec2(0, 0);

  /** World angle */
  a = 0;

  /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
  alpha0 = 0;

  c0 = geo.vec2(0, 0);
  a0 = 0;

  /** @internal */
  recycle() {
    geo.zeroVec2(this.localCenter);
    geo.zeroVec2(this.c);
    this.a = 0;
    this.alpha0 = 0;
    geo.zeroVec2(this.c0);
    this.a0 = 0;
  }

  setTransform(xf: TransformValue): void {
    geo.transformVec2(temp, xf, this.localCenter);
    geo.copyVec2(this.c, temp);
    geo.copyVec2(this.c0, temp);

    this.a = this.a0 = math_atan2(xf.q.s, xf.q.c);
  }

  setLocalCenter(localCenter: Vec2Value, xf: TransformValue): void {
    geo.copyVec2(this.localCenter, localCenter);

    geo.transformVec2(temp, xf, this.localCenter);
    geo.copyVec2(this.c, temp);
    geo.copyVec2(this.c0, temp);
  }

  /**
   * Get the interpolated transform at a specific time.
   *
   * @param xf
   * @param beta A factor in [0,1], where 0 indicates alpha0
   */
  getTransform(xf: TransformValue, beta: number = 0): void {
    geo.setRotAngle(xf.q, (1.0 - beta) * this.a0 + beta * this.a);
    geo.combine2Vec2(xf.p, 1.0 - beta, this.c0, beta, this.c);

    // shift to origin
    geo.rotVec2(temp, xf.q, this.localCenter);
    geo.minusVec2(xf.p, temp);
  }

  /**
   * Advance the sweep forward, yielding a new initial state.
   *
   * @param alpha The new initial time
   */
  advance(alpha: number): void {
    if (_ASSERT) console.assert(this.alpha0 < 1.0);
    const beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
    geo.combine2Vec2(this.c0, beta, this.c, 1 - beta, this.c0);
    this.a0 = beta * this.a + (1 - beta) * this.a0;
    this.alpha0 = alpha;
  }

  forward(): void {
    this.a0 = this.a;
    geo.copyVec2(this.c0, this.c);
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
    geo.copyVec2(this.localCenter, that.localCenter);
    geo.copyVec2(this.c, that.c);
    this.a = that.a;
    this.alpha0 = that.alpha0;
    geo.copyVec2(this.c0, that.c0);
    this.a0 = that.a0;
  }
}
