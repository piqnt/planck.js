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


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


const math: Math & {
  readonly EPSILON: number;
  /**
   * This function is used to ensure that a floating point number is not a NaN or
   * infinity.
   */
  isFinite(x: any): boolean;
  assert(x: any): void;
  /**
   * This is a approximate yet fast inverse square-root (todo).
   */
  invSqrt(x: number): number;
  /**
   * Next Largest Power of 2 Given a binary integer value x, the next largest
   * power of 2 can be computed by a SWAR algorithm that recursively "folds" the
   * upper bits into the lower bits. This process yields a bit vector with the
   * same most significant 1 as x, but all 1's below it. Adding 1 to that value
   * yields the next largest power of 2. For a 32-bit value:
   */
  nextPowerOfTwo(x: number): number;
  isPowerOfTwo(x: number): boolean;
  mod(num: number, min?: number, max?: number): number;
  /**
   * Returns a min if num is less than min, and max if more than max, otherwise returns num.
   */
  clamp(num: number, min: number, max: number): number;
  /**
   * Returns a random number between min and max when two arguments are provided.
   * If one arg is provided between 0 to max.
   * If one arg is passed between 0 to 1.
   */
  random(min?: number, max?: number): number;
} = Object.create(Math);

export default math;

// @ts-ignore
// noinspection JSConstantReassignment
math.EPSILON = 1e-9; // TODO

math.isFinite = function(x: unknown): boolean {
  return (typeof x === 'number') && isFinite(x) && !isNaN(x);
};

math.assert = function(x: any): void {
  if (!_ASSERT) return;
  if (!math.isFinite(x)) {
    _DEBUG && common.debug(x);
    throw new Error('Invalid Number!');
  }
};

math.invSqrt = function(x: number): number {
  // TODO:
  return 1 / Math.sqrt(x);
};

math.nextPowerOfTwo = function(x: number): number {
  // TODO
  x |= (x >> 1);
  x |= (x >> 2);
  x |= (x >> 4);
  x |= (x >> 8);
  x |= (x >> 16);
  return x + 1;
};

math.isPowerOfTwo = function(x: number): boolean {
  return x > 0 && (x & (x - 1)) === 0;
};

math.mod = function(num: number, min?: number, max?: number): number {
  if (typeof min === 'undefined') {
    max = 1;
    min = 0;
  } else if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  if (max > min) {
    num = (num - min) % (max - min);
    return num + (num < 0 ? max : min);
  } else {
    num = (num - max) % (min - max);
    return num + (num <= 0 ? min : max);
  }
};

math.clamp = function(num: number, min: number, max: number): number {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

math.random = function(min?: number, max?: number): number {
  if (typeof min === 'undefined') {
    max = 1;
    min = 0;
  } else if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return min === max ? min : Math.random() * (max - min) + min;
};
