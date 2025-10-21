/*
 * Planck.js
 *
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RotValue } from "./Rot";
import type { TransformValue } from "./Transform";
import type { Vec2Value } from "./Vec2";
import type { Vec3Value } from "./Vec3";
import type { Mat22Value } from "./Mat22";
import type { Mat33Value } from "./Mat33";

/** Return a new Vec2 object with the given x and y. */
export function vec2(inx: number, iny: number): Vec2Value {
  return { x: inx, y: iny };
}

/** Return a new Vec3 object with the given x and y. */
export function vec3(inx: number, iny: number, inz: number): Vec3Value {
  return { x: inx, y: iny, z: inz };
}

/** Return a new Rot object with the given angle. */
export function rotation(angle: number): RotValue {
  return { s: Math.sin(angle), c: Math.cos(angle) };
}

/** Assigns the given x and y to the out Vec2Value. */
export function setVec2(out: Vec2Value, inx: number, iny: number): void {
  out.x = inx;
  out.y = iny;
}

/** Assigns the given x, y and z to the out Vec3Value. */
export function setVec3(out: Vec3Value, x: number, y: number, z: number): void {
  out.x = x;
  out.y = y;
  out.z = z;
}

/** Copies the x and y from the w to the out. */
export function copyVec2(out: Vec2Value, w: Vec2Value): void {
  out.x = w.x;
  out.y = w.y;
}

/** Copies the x, y, z from the w to the out. */
export function copyVec3(out: Vec2Value, w: Vec2Value): void {
  out.x = w.x;
  out.y = w.y;
}

/** Assigns zero to the x and y of the out. */
export function zeroVec2(out: Vec2Value): void {
  out.x = 0;
  out.y = 0;
}

/** Assigns zero to the x, y and z of the out. */
export function zeroVec3(out: Vec3Value): void {
  out.x = 0;
  out.y = 0;
  out.z = 0;
}

export function negVec2(out: Vec2Value): void {
  out.x = -out.x;
  out.y = -out.y;
}

export function negVec3(out: Vec3Value): void {
  out.x = -out.x;
  out.y = -out.y;
  out.z = -out.z;
}

/** Adds w to out, equivalent to out += w, or out.add(w) */
export function plusVec2(out: Vec2Value, w: Vec2Value): void {
  out.x += w.x;
  out.y += w.y;
}

/** Adds w to out, equivalent to out += w, or out.add(w) */
export function plusVec3(out: Vec3Value, w: Vec3Value): void {
  out.x += w.x;
  out.y += w.y;
  out.z += w.z;
}

/** Adds w and v and assigns the result to out, equivalent to out = v + w */
export function addVec2(out: Vec2Value, v: Vec2Value, w: Vec2Value): void {
  out.x = v.x + w.x;
  out.y = v.x + w.y;
}

export function clampVec2(out: Vec2Value, max: number): void {
  const lengthSqr = out.x * out.x + out.y * out.y;
  if (lengthSqr > max * max) {
    const scale = max / Math.sqrt(lengthSqr);
    out.x *= scale;
    out.y *= scale;
  }
}

/**
 * Subtract w from out and assign the result to out.
 * This is equivalent to out = out - w, or out.sub(w).
 */
export function minusVec2(out: Vec2Value, w: Vec2Value): void {
  out.x -= w.x;
  out.y -= w.y;
}

export function minusCrossNumVec2(out: Vec2Value, w: number, v: Vec2Value): void {
  out.x -= -w * v.y;
  out.y -= w * v.x;
}

export function plusCrossNumVec2(out: Vec2Value, w: number, v: Vec2Value): void {
  out.x += -w * v.y;
  out.y += w * v.x;
}

export function dotCrossNumVec2(i: Vec2Value, w: number, v: Vec2Value): number {
  return i.x * (-w * v.y) + i.y * (w * v.x);
}

export function dotSubVec2(a: Vec2Value, b: Vec2Value, c: Vec2Value): number {
  return (a.x - b.x) * c.x + (a.y - b.y) * c.y;
}

/** Subtracts w from v and assigns the result to out, equivalent to out = v - w */
export function subVec2(out: Vec2Value, v: Vec2Value, w: Vec2Value): void {
  out.x = v.x - w.x;
  out.y = v.y - w.y;
}

export function absVec2(out: Vec2Value, v: Vec2Value): void {
  out.x = Math.abs(v.x);
  out.y = Math.abs(v.y);
}

/** Multiplies out by m, equivalent to out *= m, or out.mul(m) */
export function mulVec2(out: Vec2Value, m: number): void {
  out.x *= m;
  out.y *= m;
}

/** Multiplies out by m, equivalent to out *= m, or out.mul(m) */
export function mulVec3(out: Vec3Value, m: number): void {
  out.x *= m;
  out.y *= m;
  out.z *= m;
}

/** Multiplies w by m and assigns the result to out, equivalent to out = m * w */
export function scaleVec2(out: Vec2Value, m: number, w: Vec2Value): void {
  out.x = m * w.x;
  out.y = m * w.y;
}

/** Multiplies w by m and adds the result to out, equivalent to out += m * w */
export function plusScaleVec2(out: Vec2Value, m: number, w: Vec2Value): void {
  out.x += m * w.x;
  out.y += m * w.y;
}

/** Multiplies w by m and subtracts the result from out, equivalent to out -= m * w */
export function minusScaleVec2(out: Vec2Value, m: number, w: Vec2Value): void {
  const ox = m * w.x;
  const oy = m * w.y;
  out.x -= ox;
  out.y -= oy;
}

export function crossSubVec2Num(out: Vec2Value, a: Vec2Value, b: Vec2Value, w: number): void {
  // we need temporary variables, because out might be an input
  const ox = w * (a.y - b.y);
  const oy = -w * (a.x - b.x);
  out.x = ox;
  out.y = oy;
}

export function combine2Vec2(out: Vec2Value, am: number, a: Vec2Value, bm: number, b: Vec2Value): void {
  const ox = am * a.x + bm * b.x;
  const oy = am * a.y + bm * b.y;
  out.x = ox;
  out.y = oy;
}

export function combine3Vec2(
  out: Vec2Value,
  am: number,
  a: Vec2Value,
  bm: number,
  b: Vec2Value,
  cm: number,
  c: Vec2Value,
): void {
  const ox = am * a.x + bm * b.x + cm * c.x;
  const oy = am * a.y + bm * b.y + cm * c.y;
  out.x = ox;
  out.y = oy;
}

export function combine4Vec2(
  out: Vec2Value,
  am: number,
  a: Vec2Value,
  bm: number,
  b: Vec2Value,
  cm: number,
  c: Vec2Value,
  dm: number,
  d: Vec2Value,
): void {
  const ox = am * a.x + bm * b.x + cm * c.x + dm * d.x;
  const oy = am * a.y + bm * b.y + cm * c.y + dm * d.y;
  out.x = ox;
  out.y = oy;
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

export function normalizeVec2(out: Vec2Value): void {
  const length = Math.sqrt(out.x * out.x + out.y * out.y);
  if (length > 0) {
    const invLength = 1 / length;
    out.x *= invLength;
    out.y *= invLength;
  }
}

export function crossVec2Num(out: Vec2Value, v: Vec2Value, w: number): void {
  // we need temporary variables, because out might be an input
  const ox = w * v.y;
  const oy = -w * v.x;
  out.x = ox;
  out.y = oy;
}

export function crossNumVec2(out: Vec2Value, w: number, v: Vec2Value): void {
  // we need temporary variables, because out might be an input
  const ox = -w * v.y;
  const oy = w * v.x;
  out.x = ox;
  out.y = oy;
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

export function setRotAngle(out: RotValue, a: number): void {
  out.c = Math.cos(a);
  out.s = Math.sin(a);
}

export function getRotAngle(out: RotValue): number {
  return Math.atan2(out.s, out.c);
}

export function rotVec2(out: Vec2Value, q: RotValue, v: Vec2Value): void {
  const ox = q.c * v.x - q.s * v.y;
  const oy = q.s * v.x + q.c * v.y;
  out.x = ox;
  out.y = oy;
}

export function rotSubVec2(out: Vec2Value, q: RotValue, v: Vec2Value, w: Vec2Value): void {
  const ox = q.c * (v.x - w.x) - q.s * (v.y - w.y);
  const oy = q.s * (v.x - w.x) + q.c * (v.y - w.y);
  out.x = ox;
  out.y = oy;
}

export function rotNegVec2(out: Vec2Value, q: RotValue, w: Vec2Value): void {
  const ox = q.c * -w.x - q.s * -w.y;
  const oy = q.s * -w.x + q.c * -w.y;
  out.x = ox;
  out.y = oy;
}

export function derotVec2(out: Vec2Value, q: RotValue, v: Vec2Value): void {
  const ox = q.c * v.x + q.s * v.y;
  const oy = -q.s * v.x + q.c * v.y;
  out.x = ox;
  out.y = oy;
}

export function derotNegVec2(out: Vec2Value, q: RotValue, v: Vec2Value): void {
  const ox = q.c * -v.x + q.s * -v.y;
  const oy = -q.s * -v.x + q.c * -v.y;
  out.x = ox;
  out.y = oy;
}

export function rerotVec2(out: Vec2Value, before: RotValue, after: RotValue, v: Vec2Value): void {
  const x0 = before.c * v.x + before.s * v.y;
  const y0 = -before.s * v.x + before.c * v.y;
  const ox = after.c * x0 - after.s * y0;
  const oy = after.s * x0 + after.c * y0;
  out.x = ox;
  out.y = oy;
}

export function transform(inx: number, iny: number, ina: number): TransformValue {
  return {
    p: { x: inx, y: iny },
    q: { s: Math.sin(ina), c: Math.cos(ina) },
  };
}

export function setTransform(xf: TransformValue, inx: number, iny: number, ina: number): void {
  xf.p.x = inx;
  xf.p.y = iny;
  xf.q.s = Math.sin(ina);
  xf.q.c = Math.cos(ina);
}

export function copyTransform(out: TransformValue, transform: TransformValue): void {
  out.p.x = transform.p.x;
  out.p.y = transform.p.y;
  out.q.s = transform.q.s;
  out.q.c = transform.q.c;
}

export function transformVec2(out: Vec2Value, xf: TransformValue, v: Vec2Value): void {
  const ox = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
  const oy = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
  out.x = ox;
  out.y = oy;
}

export function detransformVec2(out: Vec2Value, xf: TransformValue, v: Vec2Value): void {
  const px = v.x - xf.p.x;
  const py = v.y - xf.p.y;
  const ox = xf.q.c * px + xf.q.s * py;
  const oy = -xf.q.s * px + xf.q.c * py;
  out.x = ox;
  out.y = oy;
}

export function retransformVec2(out: Vec2Value, from: TransformValue, to: TransformValue, v: Vec2Value): void {
  const x0 = from.q.c * v.x - from.q.s * v.y + from.p.x;
  const y0 = from.q.s * v.x + from.q.c * v.y + from.p.y;
  const px = x0 - to.p.x;
  const py = y0 - to.p.y;
  const ox = to.q.c * px + to.q.s * py;
  const oy = -to.q.s * px + to.q.c * py;
  out.x = ox;
  out.y = oy;
}

export function detransformTransform(out: TransformValue, a: TransformValue, b: TransformValue): void {
  const c = a.q.c * b.q.c + a.q.s * b.q.s;
  const s = a.q.c * b.q.s - a.q.s * b.q.c;
  const ox = a.q.c * (b.p.x - a.p.x) + a.q.s * (b.p.y - a.p.y);
  const oy = -a.q.s * (b.p.x - a.p.x) + a.q.c * (b.p.y - a.p.y);
  out.q.c = c;
  out.q.s = s;
  out.p.x = ox;
  out.p.y = oy;
}

export function mat22(): Mat22Value {
  return {
    ex: { x: 0, y: 0 },
    ey: { x: 0, y: 0 },
  };
}

export function mat33() {
  return {
    ex: { x: 0, y: 0, z: 0 },
    ey: { x: 0, y: 0, z: 0 },
    ez: { x: 0, y: 0, z: 0 },
  };
}

export function zeroMat22(out: Mat22Value): void {
  out.ex.x = 0;
  out.ex.y = 0;
  out.ey.x = 0;
  out.ey.y = 0;
}

export function zeroMat33(out: Mat33Value): void {
  out.ex.x = 0;
  out.ex.y = 0;
  out.ex.z = 0;
  out.ey.x = 0;
  out.ey.y = 0;
  out.ey.z = 0;
  out.ez.x = 0;
  out.ez.y = 0;
  out.ez.z = 0;
}

export function mulMat22Vec2(out: Vec2Value, m: Mat22Value, v: Vec2Value): void {
  const ox = m.ex.x * v.x + m.ey.x * v.y;
  const oy = m.ex.y * v.x + m.ey.y * v.y;
  out.x = ox;
  out.y = oy;
}

export function mulMat33Vec2(out: Vec2Value, m: Mat33Value, v: Vec2Value): void {
  const ox = m.ex.x * v.x + m.ey.x * v.y;
  const oy = m.ex.y * v.x + m.ey.y * v.y;
  out.x = ox;
  out.y = oy;
}

export function mulMat33Vec3(out: Vec3Value, m: Mat33Value, v: Vec3Value): void {
  const ox = m.ex.x * v.x + m.ey.x * v.y + m.ez.x * v.z;
  const oy = m.ex.y * v.x + m.ey.y * v.y + m.ez.y * v.z;
  const oz = m.ex.z * v.x + m.ey.z * v.y + m.ez.z * v.z;
  out.x = ox;
  out.y = oy;
  out.z = oz;
}

export function inverseMat22(out: Mat22Value, m: Mat22Value): void {
  const a = m.ex.x;
  const b = m.ey.x;
  const c = m.ex.y;
  const d = m.ey.y;
  let det = a * d - b * c;
  if (det !== 0) {
    det = 1 / det;
  }
  out.ex.x = det * d;
  out.ey.x = -det * b;
  out.ex.y = -det * c;
  out.ey.y = det * a;
}

/**
 * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
 * if singular.
 */
export function symInverseMat33(out: Mat33Value, m: Mat33Value): void {
  // let det = Vec3.dot(m.ex, Vec3.cross(m.ey, m.ez));

  let det =
    m.ex.x * (m.ey.y * m.ez.z - m.ey.z * m.ez.y) +
    m.ex.y * (m.ey.z * m.ez.x - m.ey.x * m.ez.z) +
    m.ex.z * (m.ey.x * m.ez.y - m.ey.y * m.ez.x);

  if (det !== 0) {
    det = 1 / det;
  }
  const a11 = m.ex.x;
  const a12 = m.ey.x;
  const a13 = m.ez.x;
  const a22 = m.ey.y;
  const a23 = m.ez.y;
  const a33 = m.ez.z;

  out.ex.x = det * (a22 * a33 - a23 * a23);
  out.ex.y = det * (a13 * a23 - a12 * a33);
  out.ex.z = det * (a12 * a23 - a13 * a22);

  out.ey.x = out.ex.y;
  out.ey.y = det * (a11 * a33 - a13 * a13);
  out.ey.z = det * (a13 * a12 - a11 * a23);

  out.ez.x = out.ex.z;
  out.ez.y = out.ey.z;
  out.ez.z = det * (a11 * a22 - a12 * a12);
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 */
export function solveMat22Num(out: Vec2Value, m: Mat22Value, x: number, y: number): void {
  const a11 = m.ex.x;
  const a12 = m.ey.x;
  const a21 = m.ex.y;
  const a22 = m.ey.y;
  let det = a11 * a22 - a12 * a21;
  if (det !== 0) {
    det = 1 / det;
  }
  out.x = det * (a22 * x - a12 * y);
  out.y = det * (a11 * y - a21 * x);
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 */
export function solveMat33Num(out: Vec3Value, m: Mat33Value, x: number, y: number, z: number): void {
  // let det = matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, this.ez));
  let cross_x = m.ey.y * m.ez.z - m.ey.z * m.ez.y;
  let cross_y = m.ey.z * m.ez.x - m.ey.x * m.ez.z;
  let cross_z = m.ey.x * m.ez.y - m.ey.y * m.ez.x;
  let det = m.ex.x * cross_x + m.ex.y * cross_y + m.ex.z * cross_z;
  if (det !== 0) {
    det = 1 / det;
  }

  // r.x = det * matrix.dotVec3(v, matrix.newCrossVec3(this.ey, this.ez));
  cross_x = m.ey.y * m.ez.z - m.ey.z * m.ez.y;
  cross_y = m.ey.z * m.ez.x - m.ey.x * m.ez.z;
  cross_z = m.ey.x * m.ez.y - m.ey.y * m.ez.x;
  out.x = det * (x * cross_x + y * cross_y + z * cross_z);

  // r.y = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(v, this.ez));
  cross_x = y * m.ez.z - z * m.ez.y;
  cross_y = z * m.ez.x - x * m.ez.z;
  cross_z = x * m.ez.y - y * m.ez.x;
  out.y = det * (m.ex.x * cross_x + m.ex.y * cross_y + m.ex.z * cross_z);

  // r.z = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, v));
  cross_x = m.ey.y * z - m.ey.z * y;
  cross_y = m.ey.z * x - m.ey.x * z;
  cross_z = m.ey.x * y - m.ey.y * x;
  out.z = det * (m.ex.x * cross_x + m.ex.y * cross_y + m.ex.z * cross_z);
}

/** Velocity of point r on a body, given a body linear and angular velocity. */
export function vp(out: Vec2Value, v: Vec2Value, w: number, r: Vec2Value): void {
  const ox = v.x - w * r.y;
  const oy = v.y + w * r.x;
  out.x = ox;
  out.y = oy;
}

/** Relative velocity of two points of two bodies, given linear and angular velocity of the bodies . */
export function dvp(
  out: Vec2Value,
  vB: Vec2Value,
  wB: number,
  rB: Vec2Value,
  vA: Vec2Value,
  wA: number,
  rA: Vec2Value,
) {
  const ox = vB.x - wB * rB.y - (vA.x - wA * rA.y);
  const oy = vB.y + wB * rB.x - (vA.y + wA * rA.x);
  out.x = ox;
  out.y = oy;
}

export function isVec2(obj: any): boolean {
  return typeof obj === "object" && obj !== null && Number.isFinite(obj.x) && Number.isFinite(obj.y);
}
