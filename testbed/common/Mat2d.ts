import { type Vec2Value } from "planck";

/**
 * A 2D affine matrix, plain data in the DOM's layout: `x' = a x + c y + e`,
 * `y' = b x + d y + f`. The functions write into an `out` (planck 2's
 * convention), nothing allocates.
 */
export interface Mat2d {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export function makeMat2d(): Mat2d {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}

export function identityMat2d(out: Mat2d): void {
  out.a = 1;
  out.b = 0;
  out.c = 0;
  out.d = 1;
  out.e = 0;
  out.f = 0;
}

export function copyMat2d(out: Mat2d, m: Mat2d): void {
  out.a = m.a;
  out.b = m.b;
  out.c = m.c;
  out.d = m.d;
  out.e = m.e;
  out.f = m.f;
}

// translate/scale post-compose: each wraps around the current transform's output, e.g.
// translate(m, -cx, -cy); scale(m, z, z); translate(m, cx, cy) scales around screen point (cx, cy)
export function translateMat2d(m: Mat2d, x: number, y: number): void {
  m.e += x;
  m.f += y;
}

export function scaleMat2d(m: Mat2d, x: number, y: number): void {
  m.a *= x;
  m.c *= x;
  m.e *= x;
  m.b *= y;
  m.d *= y;
  m.f *= y;
}

/** out = A(B(p)): B is applied first (inner), A second (outer); out may be A or B */
export function mulMat2ds(out: Mat2d, A: Mat2d, B: Mat2d): void {
  const a = A.a * B.a + A.c * B.b;
  const b = A.b * B.a + A.d * B.b;
  const c = A.a * B.c + A.c * B.d;
  const d = A.b * B.c + A.d * B.d;
  const e = A.a * B.e + A.c * B.f + A.e;
  const f = A.b * B.e + A.d * B.f + A.f;
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
}

/** out = m(v); out may be v */
export function mulMat2dVec2(out: Vec2Value, m: Mat2d, v: Vec2Value): void {
  const x = v.x;
  const y = v.y;
  out.x = m.a * x + m.c * y + m.e;
  out.y = m.b * x + m.d * y + m.f;
}

/** out = m⁻¹(v); out may be v */
export function invMat2dVec2(out: Vec2Value, m: Mat2d, v: Vec2Value): void {
  const id = 1 / (m.a * m.d - m.c * m.b);
  const x = v.x;
  const y = v.y;
  out.x = m.d * id * x - m.c * id * y + (m.f * m.c - m.e * m.d) * id;
  out.y = m.a * id * y - m.b * id * x + (m.e * m.b - m.f * m.a) * id;
}

// embeds a world->pixel (CSS-pixel, Y-down) affine into a world->clip-space column-major mat4,
// composing with the pixel->clip conversion (which flips Y back to clip's Y-up) so the shader's
// `projectionMatrix * vec4(worldX, worldY, 0, 1)` lands directly in clip space
export function mat2dToProjection(out: Float32Array, m: Mat2d, screenWidth: number, screenHeight: number): void {
  const sx = 2 / screenWidth;
  const sy = -2 / screenHeight;
  // pixelToClip (scale sx,sy / translate -1,1) appended with m (world->pixel): pixelToClip(m(p))
  const a = sx * m.a;
  const b = sy * m.b;
  const c = sx * m.c;
  const d = sy * m.d;
  const tx = sx * m.e - 1;
  const ty = sy * m.f + 1;

  out.fill(0);
  out[0] = a;
  out[1] = b;
  out[4] = c;
  out[5] = d;
  out[10] = 1;
  out[12] = tx;
  out[13] = ty;
  out[15] = 1;
}
