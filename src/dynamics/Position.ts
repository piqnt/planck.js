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

import { Vec2, Vec2Value } from '../common/Vec2';
import { TransformValue } from '../common/Transform';


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
