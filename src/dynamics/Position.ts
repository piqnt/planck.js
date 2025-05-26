/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2, Vec2Value } from "../common/Vec2";
import { TransformValue } from "../common/Transform";

/** @internal */ const math_sin = Math.sin;
/** @internal */ const math_cos = Math.cos;

export class Position {
  /** location */
  c = Vec2.zero();

  /** angle */
  a = 0;

  // todo: cache sin/cos
  getTransform(xf: TransformValue, p: Vec2Value): TransformValue {
    // xf.q = rotation(this.a);
    // xf.p = this.c - xf.q * p
    xf.q.c = math_cos(this.a);
    xf.q.s = math_sin(this.a);
    xf.p.x = this.c.x - (xf.q.c * p.x - xf.q.s * p.y);
    xf.p.y = this.c.y - (xf.q.s * p.x + xf.q.c * p.y);
    return xf;
  }
}

export function getTransform(xf: TransformValue, p: Vec2Value, c: Vec2Value, a: number): TransformValue {
  // xf.q = rotation(a);
  // xf.p = this.c - xf.q * p
  xf.q.c = math_cos(a);
  xf.q.s = math_sin(a);
  xf.p.x = c.x - (xf.q.c * p.x - xf.q.s * p.y);
  xf.p.y = c.y - (xf.q.s * p.x + xf.q.c * p.y);
  return xf;
}
