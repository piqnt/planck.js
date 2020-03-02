export let Math: Math & {
  readonly EPSILON: number;
  /**
   * This function is used to ensure that a floating point number is not a NaN or
   * infinity.
   */
  isFinite(x: any): boolean;
  assert(x: any): void;
  invSqrt(x: number): number;
  nextPowerOfTwo(x: number): number;
  isPowerOfTwo(x: number): boolean;
  mod(num: number, min: number, max: number): number;
  mod(num: number, max?: number): number;
  clamp(num: number, min: number, max: number): number;
  random(min: number, max: number): number;
  random(max?: number): number;
};

export interface Velocity {
  v: Vec2;
  w: number;
}

export interface Position {
  c: Vec2;
  a: number;
  getTransform(xf: Transform, p: Vec2): Transform;
}

export interface Vec2 {
  x: number;
  y: number;

  toString(): string;
  clone(): Vec2;
  setZero(): Vec2;
  set(x: number, y: number): Vec2;
  set(value: Vec2): Vec2;
  setCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
  setMul(a: number, v: Vec2): Vec2;
  add(w: Vec2): Vec2;
  addCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
  addMul(a: number, v: Vec2): Vec2;
  sub(w: Vec2): Vec2;
  subCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
  subMul(a: number, v: Vec2): Vec2;
  mul(m: number): Vec2;
  length(): number;
  lengthSquared(): number;
  normalize(): number;
  neg(): Vec2;
  clamp(max: number): Vec2;
}

export let Vec2: {
  new(x: number, y: number): Vec2;
  (x: number, y: number): Vec2;

  new(obj: { x: number, y: number }): Vec2;
  (obj: { x: number, y: number }): Vec2;

  new(): Vec2;
  (): Vec2;

  zero(): Vec2;
  // neo(x: number, y: number): Vec2; internal
  clone(v: Vec2): Vec2;
  isValid(v: any): boolean;
  assert(o: any): void;
  lengthOf(v: Vec2): number;
  lengthSquared(v: Vec2): number;
  distance(v: Vec2, w: Vec2): number;
  distanceSquared(v: Vec2, w: Vec2): number;
  areEqual(v: Vec2, w: Vec2): boolean;
  skew(v: Vec2): Vec2;
  dot(v: Vec2, w: Vec2): number;
  cross(v: Vec2, w: Vec2): number;
  cross(v: Vec2, w: number): Vec2;
  cross(v: number, w: Vec2): Vec2;
  addCross(a: Vec2, v: Vec2, w: number): Vec2;
  addCross(a: Vec2, v: number, w: Vec2): Vec2;
  add(v: Vec2, w: Vec2): Vec2;
  combine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
  // combine(a: number, v: Vec2): Vec2;
  sub(v: Vec2, w: Vec2): Vec2;
  mul(a: Vec2, b: number): Vec2;
  mul(a: number, b: Vec2): Vec2;
  neg(v: Vec2): Vec2;
  abs(v: Vec2): Vec2;
  mid(v: Vec2, w: Vec2): Vec2;
  upper(v: Vec2, w: Vec2): Vec2;
  lower(v: Vec2, w: Vec2): Vec2;
  clamp(v: Vec2, max: number): Vec2;
};

export interface Vec3 {
  x: number;
  y: number;
  z: number;

  toString(): string;
  setZero(): Vec3;
  set(x: number, y: number, z: number): Vec3;
  add(w: Vec3): Vec3;
  sub(w: Vec3): Vec3;
  mul(m: number): Vec3;
  neg(): Vec3;
}

export let Vec3: {
  new(x: number, y: number, z: number): Vec3;
  (x: number, y: number, z: number): Vec3;

  new(obj: { x: number, y: number, z: number }): Vec3;
  (obj: { x: number, y: number, z: number }): Vec3;

  new(): Vec3;
  (): Vec3;

  // neo(x: number, y: number, z: number): Vec3; internal
  clone(v: Vec3): Vec3;
  areEqual(v: Vec3, w: Vec3): boolean;
  dot(v: Vec3, w: Vec3): number;
  cross(v: Vec3, w: Vec3): Vec3;
  add(v: Vec3, w: Vec3): Vec3;
  sub(v: Vec3, w: Vec3): Vec3;
  mul(v: Vec3, m: number): Vec3;
  neg(v: Vec3): Vec3;

  isValid(v: any): void;
  assert(o: any): void;
};

export interface Transform {
  p: Vec2;
  q: Rot;

  setIdentity(): void;
  set(position: Vec2, rotation: number): void;
  set(xf: Transform): void;
}
export let Transform: {
  new(position: Vec2, rotation: number): Transform;
  (position: Vec2, rotation: number): Transform;

  new(): Transform;
  (): Transform;

  clone(xf: Transform): Transform;
  // neo(position: Vec2, rotation: number): Transform; internal
  identity(): Transform;
  isValid(o: any): boolean;
  assert(o: any): void;
  mul(a: Transform, b: Vec2): Vec2;
  mul(a: Transform, b: Transform): Transform;
  mul(a: Transform, b: Vec2[]): Vec2[];
  mul(a: Transform, b: Transform[]): Transform[];
  // deprecated
  // mulAll(a: Transform, b: Vec2[]): Vec2[];
  // mulAll(a: Transform, b: Transform[]): Transform[];
  mulVec2(a: Transform, b: Vec2): Vec2;
  mulXf(a: Transform, b: Transform): Transform;
  mulT(a: Transform, b: Vec2): Vec2;
  mulT(a: Transform, b: Transform): Transform;
  mulTVec2(a: Transform, b: Vec2): Vec2;
  mulTXf(a: Transform, b: Transform): Transform;
};

export interface Rot {
  s: number;
  c: number;

  setIdentity(): void;
  set(angle: number | Rot): void;
  setAngle(angle: number): void;
  getAngle(): number;
  getXAxis(): Vec2;
  getYAxis(): Vec2;
}

export let Rot: {
  new(angle: number): Rot;
  (angle: number): Rot;

  new(rot: Rot): Rot;
  (rot: Rot): Rot;

  new(): Rot;
  (): Rot;

  // neo(angle: number): Rot; internal
  clone(rot: Rot): Rot;
  identity(): Rot;
  isValid(o: any): boolean;
  assert(o: any): void;
  mul(rot: Rot, m: Rot): Rot;
  mul(rot: Rot, m: Vec2): Vec2;
  mulRot(rot: Rot, m: Rot): Rot;
  mulVec2(rot: Rot, m: Vec2): Vec2;
  mulSub(rot: Rot, v: Vec2, w: Vec2): Vec2;
  mulT(rot: Rot, m: Rot): Rot;
  mulT(rot: Rot, m: Vec2): Vec2;
  mulTRot(rot: Rot, m: Rot): Rot;
  mulTVec2(rot: Rot, m: Vec2): Vec2;
};

export interface Mat22 {
  ex: Vec2;
  ey: Vec2;
  toString(): string;
  set(a: Mat22): void;
  set(a: Vec2, b: Vec2): void;
  set(a: number, b: number, c: number, d: number): void;
  setIdentity(): void;
  setZero(): void;
  getInverse(): Mat22;
  solve(v: Vec2): Vec2;
}

export let Mat22: {
  new(a: number, b: number, c: number, d: number): Mat22;
  new(a: { x: number; y: number }, b: { x: number; y: number }): Mat22;
  new(): Mat22;

  isValid(o: any): boolean;
  assert(o: any): void;

  mul(mx: Mat22, my: Mat22): Mat22;
  mul(mx: Mat22, v: Vec2): Vec2;
  mulVec2(mx: Mat22, v: Vec2): Vec2;
  mulMat22(mx: Mat22, my: Mat22): Mat22;
  mulT(mx: Mat22, my: Mat22): Mat22;
  mulT(mx: Mat22, v: Vec2): Vec2;
  abs(mx: Mat22): Mat22;
  add(mx1: Mat22, mx2: Mat22): Mat22;
};

export interface Mat33 {
  ex: Vec3;
  ey: Vec3;
  ez: Vec3;

  toString(): string;
  setZero(): Mat33;
  solve33(v: Vec3): Vec3;
  solve22(v: Vec2): Vec2;
  getInverse22(M: Mat33): void;
  getSymInverse33(M: Mat33): void;
}

export let Mat33: {
  new(a: Vec3, b: Vec3, c: Vec3): Mat33;
  new(a: any, b: any, c: any): Mat33;
  new(): Mat33;

  isValid(o: any): boolean;
  assert(o: any): void;

  mul(a: Mat33, b: Vec2): Vec2;
  mul(a: Mat33, b: Vec3): Vec3;
  mulVec3(a: Mat33, b: Vec3): Vec3;
  mulVec2(a: Mat33, b: Vec2): Vec2;
  add(a: Mat33, b: Mat33): Mat33;
};

export interface Sweep {
  localCenter: Vec2;
  c: Vec2;
  a: number;
  alpha0: number;
  c0: Vec2;
  a0: number;

  setTransform(xf: Transform): void;
  setLocalCenter(localCenter: Vec2, xf: Transform): void;
  getTransform(xf: Transform, beta: number): void;
  advance(alpha: number): void;
  forward(): void;
  normalize(): void;
  clone(): Sweep;
  set(sweep: Sweep): void;
}
