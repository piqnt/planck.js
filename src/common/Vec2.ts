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

import { EPSILON } from "./Math";


/** @internal */ const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === 'undefined' ? false : CONSTRUCTOR_FACTORY;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_sqrt = Math.sqrt;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;


export interface Vec2Value {
  x: number;
  y: number;
}

/*
  _serialize(): object {
    return {
      x: this.x,
      y: this.y
    };
  }

  toString(): string {
    return JSON.stringify(this);
  }

  _deserialize(data: any): Vec2Value {
    return { x: data.x, y: data.y };
  }
*/


/**
 * create a new Vec2
 */
export function create (x: number=0, y: number=0): Vec2Value {
  return { x, y };
}

export function zero(): Vec2Value {
  return { x: 0, y: 0 };
}

export function copy (v: Vec2Value, out: Vec2Value): Vec2Value {
  _ASSERT && assert(out) && assert(v);
  out.x = v.x;
  out.y = v.y;
  return out;
}

export function set (x: number, y: number, out: Vec2Value): Vec2Value {
  _ASSERT && assert(out);
  out.x = x;
  out.y = y;
  return out;
}

export function clone (v: Vec2Value): Vec2Value {
  _ASSERT && assert(v);
  return create(v.x, v.y);
}

/**
 * Does this vector contain finite coordinates?
 */
export function isValid (obj: any): boolean {
  if (obj === null || typeof obj === 'undefined') {
    return false;
  }
  return Number.isFinite(obj.x) && Number.isFinite(obj.y);
}

export function assert (o: any): void {
  _ASSERT && console.assert(!isValid(o), 'Invalid Vec2!', o);
}

/**
 * Set this vector to all zeros.
 *
 * @returns Vec2
 */
export function setZero(out: Vec2Value): Vec2Value {
  out.x = 0.0;
  out.y = 0.0;
  return out;
}

/**
 * scale a vector by a number
 */
export function scale(v: Vec2Value, a: number, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);

  const x = a * v.x;
  const y = a * v.y;

  return set(x, y, out);
}

/**
 * Add linear combination of v and w: `src + (a * v + b * w)`
 */
export function addCombine(src: Vec2Value, a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);
  _ASSERT && assert(src);
  _ASSERT && console.assert(Number.isFinite(b));
  _ASSERT && assert(w);

  const x = a * v.x + b * w.x;
  const y = a * v.y + b * w.y;

  return set(src.x + x, src.y + y, out);
}

/**
 *  out = src + (a * v)
 */
export function addMul (src: Vec2Value, a: number, v: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);
  const x = a * v.x;
  const y = a * v.y;

  return set(src.x + x, src.y + y, out);
}

/**
 * Subtract linear combination of v and w: `src + (a * v + b * w)`
 */
export function subCombine (src: Vec2Value, a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);
  _ASSERT && console.assert(Number.isFinite(b));
  _ASSERT && assert(w);

  const x = a * v.x + b * w.x;
  const y = a * v.y + b * w.y;

  return set(src.x - x, src.y - y, out);
}

/**
 *  out = src - (a * v)
 */
export function subMul (src: Vec2Value, a: number, v: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);
  const x = a * v.x;
  const y = a * v.y;

  return set(src.x - x, src.y - y, out);
}

/**
 * Convert this vector into a unit vector.
 *
 * @returns old length
 */
export function normalize (v: Vec2Value, out: Vec2Value=create()): number {
  const len = length(v);
  if (len < EPSILON) {
    return 0.0;
  }
  const invLength = 1.0 / len;

  set(v.x * invLength, v.y * invLength, out)
  return len;
}

/**
 * Get the length of this vector's normal.
 *
 * For performance, use this instead of lengthSquared (if possible).
 */
export function length (v: Vec2Value): number {
  _ASSERT && assert(v);
  return math_sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Get the length squared.
 */
export function lengthSquared (v: Vec2Value): number {
  _ASSERT && assert(v);
  return v.x * v.x + v.y * v.y;
}

export function distance (v: Vec2Value, w: Vec2Value): number {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  const dx = v.x - w.x;
  const dy = v.y - w.y;
  return math_sqrt(dx * dx + dy * dy);
}

export function distanceSquared (v: Vec2Value, w: Vec2Value): number {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  const dx = v.x - w.x;
  const dy = v.y - w.y;
  return dx * dx + dy * dy;
}

export function areEqual (v: Vec2Value, w: Vec2Value): boolean {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
}

/**
 * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
 */
export function skew (v: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  return set(-v.y, v.x, out);
}

/** Dot product on two vectors */
export function dot (v: Vec2Value, w: Vec2Value): number {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return v.x * w.x + v.y * w.y;
}

/** Cross product on two vectors */
export function crossVec2Vec2 (v: Vec2Value, w: Vec2Value): number {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return v.x * w.y - v.y * w.x;
}

/** Cross product on a vector and a scalar */
export function crossVec2Num (v: Vec2Value, w: number, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && console.assert(Number.isFinite(w));
  return set(w * v.y, -w * v.x, out);
}

/** Cross product on a vector and a scalar */
export function crossNumVec2 (v: number, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(v));
  _ASSERT && assert(w);
  return set(-v * w.y, v * w.x, out);
}

/**
 * Returns `a + (v x w)`
 */
export function addCrossVec2Num (a: Vec2Value, v: Vec2Value, w: number, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && console.assert(Number.isFinite(w));
  return set(w * v.y + a.x, -w * v.x + a.y, out);
}

/**
 * Returns `a + (v x w)`
 */
export function  addCrossNumVec2 (a: Vec2Value, v: number, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(v));
  _ASSERT && assert(w);
  return set(-v * w.y + a.x, v * w.x + a.y, out);
}

export function  add (v: Vec2Value, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return set(v.x + w.x, v.y + w.y, out);
}

/**
 * Set linear combination of v and w: `a * v + b * w`
 */
export function combine (a: number, v: Vec2Value, b: number, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(v);
  _ASSERT && console.assert(Number.isFinite(b));
  _ASSERT && assert(w);
  const x = a * v.x + b * w.x;
  const y = a * v.y + b * w.y;

  return set(x, y, out);
}

/**
 * Subtract two vectors
 * out = v - w
 */
export function sub (v: Vec2Value, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return set(v.x - w.x, v.y - w.y, out);
}

export function mulVec2Num (a: Vec2Value, b: number, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(a);
  _ASSERT && console.assert(Number.isFinite(b));
  return set(a.x * b, a.y * b, out);
}

export function mulNumVec2 (a: number, b: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && console.assert(Number.isFinite(a));
  _ASSERT && assert(b);
  return set(a * b.x, a * b.y, out);
}

export function neg (v: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  return set(-v.x, -v.y, out);
}

export function abs (v: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  return set(math_abs(v.x), math_abs(v.y), out);
}

export function mid (v: Vec2Value, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return set((v.x + w.x) * 0.5, (v.y + w.y) * 0.5, out);
}

export function upper (v: Vec2Value, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return set(math_max(v.x, w.x), math_max(v.y, w.y), out);
}

export function lower (v: Vec2Value, w: Vec2Value, out: Vec2Value=create()): Vec2Value {
  _ASSERT && assert(v);
  _ASSERT && assert(w);
  return set(math_min(v.x, w.x), math_min(v.y, w.y), out);
}

export function clamp (v: Vec2Value, max: number, out: Vec2Value=create()): Vec2Value {
  const lengthSqr = v.x * v.x + v.y * v.y;
  if (lengthSqr > max * max) {
    const scale = max / math_sqrt(lengthSqr);
    return set(v.x * scale, v.y * scale, out);
  }

  return copy(v, out);
}
