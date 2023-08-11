/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2023 Ali Shakiba
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

import { RotValue } from "./Rot";
import { TransformValue } from "./Transform";
import { Vec2Value } from "./Vec2";
import { Vec3Value } from "./Vec3";

export function vec2(x: number, y: number): Vec2Value {
  return { x, y };
}

export function vec3(x: number, y: number, z: number): Vec3Value {
  return { x, y, z };
}

export function rotation(angle: number): RotValue {
  return { s: Math.sin(angle), c: Math.cos(angle) };
}

export function transform(x: number, y: number, a: number): TransformValue {
  return { p: vec2(x, y), q: rotation(a) };
}

export function setVec2(out: Vec2Value, x: number, y: number): Vec2Value {
  out.x = x;
  out.y = y;
  return out;
}

export function copyVec2(out: Vec2Value, w: Vec2Value): Vec2Value {
  out.x = w.x;
  out.y = w.y;
  return out;
}

export function zeroVec2(out: Vec2Value): Vec2Value {
  out.x = 0;
  out.y = 0;
  return out;
}

export function negVec2(out: Vec2Value): Vec2Value {
  out.x = -out.x;
  out.y = -out.y;
  return out;
}

export function addVec2(out: Vec2Value, w: Vec2Value): Vec2Value {
  out.x += w.x;
  out.y += w.y;
  return out;
}

export function sumVec2(out: Vec2Value, v: Vec2Value, w: Vec2Value): Vec2Value {
  out.x = v.x + w.x;
  out.y = v.x + w.y;
  return out;
}

export function subVec2(out: Vec2Value, w: Vec2Value): Vec2Value {
  out.x -= w.x;
  out.y -= w.y;
  return out;
}

export function diffVec2(out: Vec2Value, v: Vec2Value, w: Vec2Value): Vec2Value {
  out.x = v.x - w.x;
  out.y = v.y - w.y;
  return out;
}

export function scaleVec2(out: Vec2Value, m: number): Vec2Value {
  out.x *= m;
  out.y *= m;
  return out;
}

export function setMulVec2(out: Vec2Value, m: number, w: Vec2Value): Vec2Value {
  out.x = m * w.x;
  out.y = m * w.y;
  return out;
}

export function addMulVec2(out: Vec2Value, m: number, w: Vec2Value): Vec2Value {
  out.x += m * w.x;
  out.y += m * w.y;
  return out;
}

export function subMulVec2(out: Vec2Value, m: number, w: Vec2Value): Vec2Value {
  out.x -= m * w.x;
  out.y -= m * w.y;
  return out;
}

export function combineVec2(out: Vec2Value, am: number, a: Vec2Value, bm: number, b: Vec2Value): Vec2Value {
  out.x = am * a.x + bm * b.x;
  out.y = am * a.y + bm * b.y;
  return out;
}

export function normalizeVec2Length(out: Vec2Value): number {
  const length = Math.sqrt(out.x * out.x + out.y * out.y);
  if (length !== 0) {
    const invLength = 1 / length;
    out.x *= invLength;
    out.y *= invLength;
  }
  return length;
}

export function normalizeVec2(out: Vec2Value): Vec2Value {
  const length = Math.sqrt(out.x * out.x + out.y * out.y);
  if (length > 0) {
    const invLength = 1 / length;
    out.x *= invLength;
    out.y *= invLength;
  }
  return out;
}

export function crossVec2Num(out: Vec2Value, v: Vec2Value, w: number): Vec2Value {
  const x = w * v.y;
  const y = -w * v.x;
  out.x = x;
  out.y = y;
  return out;
}

export function crossNumVec2(out: Vec2Value, w: number, v: Vec2Value): Vec2Value {
  const x = -w * v.y;
  const y = w * v.x;
  out.x = x;
  out.y = y;
  return out;
}

export function crossVec2Vec2(a: Vec2Value, b: Vec2Value): number {
  return a.x * b.y - a.y * b.x;
}

export function dotVec2(a: Vec2Value, b: Vec2Value): number {
  return a.x * b.x + a.y * b.y;
}

export function lengthVec2(a: Vec2Value): number {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

export function lengthSqrVec2(a: Vec2Value): number {
  return a.x * a.x + a.y * a.y;
}

export function distVec2(a: Vec2Value, b: Vec2Value): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distSqrVec2(a: Vec2Value, b: Vec2Value): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function dotVec3(v: Vec3Value, w: Vec3Value): number {
  return v.x * w.x + v.y * w.y + v.z * w.z;
}

export function setRotAngle(out: RotValue, a: number): RotValue {
  out.c = Math.cos(a);
  out.s = Math.sin(a);
  return out;
}

export function rotVec2(out: Vec2Value, q: RotValue, v: Vec2Value): Vec2Value {
  out.x = q.c * v.x - q.s * v.y;
  out.y = q.s * v.x + q.c * v.y;
  return out;
}

export function invRotVec2(out: Vec2Value, q: RotValue, v: Vec2Value): Vec2Value {
  const x = q.c * v.x + q.s * v.y;
  const y = -q.s * v.x + q.c * v.y;
  out.x = x;
  out.y = y;
  return out;
}

export function rerotVec2(out: Vec2Value, before: RotValue, after: RotValue, v: Vec2Value): Vec2Value {
  const x0 = before.c * v.x + before.s * v.y;
  const y0 = -before.s * v.x + before.c * v.y;
  const x = after.c * x0 - after.s * y0;
  const y = after.s * x0 + after.c * y0;
  out.x = x;
  out.y = y;
  return out;
}

export function transformVec2(out: Vec2Value, xf: TransformValue, v: Vec2Value): Vec2Value {
  const x = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
  const y = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
  out.x = x;
  out.y = y;
  return out;
}

export function invTransformVec2(out: Vec2Value, xf: TransformValue, v: Vec2Value): Vec2Value {
  const px = v.x - xf.p.x;
  const py = v.y - xf.p.y;
  const x = (xf.q.c * px + xf.q.s * py);
  const y = (-xf.q.s * px + xf.q.c * py);
  out.x = x;
  out.y = y;
  return out;
}

export function retransformVec2(out: Vec2Value, from: TransformValue, to: TransformValue, v: Vec2Value): Vec2Value {
  const x0 = from.q.c * v.x - from.q.s * v.y + from.p.x;
  const y0 = from.q.s * v.x + from.q.c * v.y + from.p.y;
  const px = x0 - to.p.x;
  const py = y0 - to.p.y;
  const x = to.q.c * px + to.q.s * py;
  const y = -to.q.s * px + to.q.c * py;
  out.x = x;
  out.y = y;
  return out;
}

export function invTransformTransform(out: TransformValue, a: TransformValue, b: TransformValue): TransformValue {
  const c = a.q.c * b.q.c + a.q.s * b.q.s;
  const s = a.q.c * b.q.s - a.q.s * b.q.c;
  const x = a.q.c * (b.p.x - a.p.x) + a.q.s * (b.p.y - a.p.y);
  const y = -a.q.s * (b.p.x - a.p.x) + a.q.c * (b.p.y - a.p.y);
  out.q.c = c;
  out.q.s = s;
  out.p.x = x;
  out.p.y = y;
  return out;
}
