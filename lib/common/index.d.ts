export class Math {
  readonly EPSILON: number;
  /**
   * This function is used to ensure that a floating point number is not a NaN or
   * infinity.
   */
  static isFinite(x: any): boolean;
  static assert(x: any): void;
  static invSqrt(x: number): number;
  static nextPowerOfTwo(x: number): number;
  static isPowerOfTwo(x: number): boolean;
  static mod(num: number, min: number, max: number): number;
  static mod(num: number, max?: number): number;
  static clamp(num: number, min: number, max: number): number;
  static random(min: number, max: number): number;
  static random(max?: number): number;
}

export class Velocity {
  v: Vec2;
  w: number;
}

export class Position {
  c: Vec2;
  a: number;
  getTransform(xf: Transform, p: Vec2): Transform;
}

export function Vec2(x: number, y: number): Vec2;
export function Vec2(obj: { x: number, y: number }): Vec2;
export function Vec2(): Vec2;
export class Vec2 {
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

  constructor(x: number, y: number);
  constructor(obj: { x: number, y: number });
  constructor();

  static zero(): Vec2;
  // static neo(x: number, y: number): Vec2; internal
  static clone(v: Vec2): Vec2;
  static isValid(v: any): boolean;
  static assert(o: any): void;
  static lengthOf(v: Vec2): number;
  static lengthSquared(v: Vec2): number;
  static distance(v: Vec2, w: Vec2): number;
  static distanceSquared(v: Vec2, w: Vec2): number;
  static areEqual(v: Vec2, w: Vec2): boolean;
  static skew(v: Vec2): Vec2;
  static dot(v: Vec2, w: Vec2): number;
  static cross(v: Vec2, w: Vec2): number;
  static cross(v: Vec2, w: number): Vec2;
  static cross(v: number, w: Vec2): Vec2;
  static addCross(a: Vec2, v: Vec2, w: number): Vec2;
  static addCross(a: Vec2, v: number, w: Vec2): Vec2;
  static add(v: Vec2, w: Vec2): Vec2;
  static combine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
  // static combine(a: number, v: Vec2): Vec2;
  static sub(v: Vec2, w: Vec2): Vec2;
  static mul(a: Vec2, b: number): Vec2;
  static mul(a: number, b: Vec2): Vec2;
  static neg(v: Vec2): Vec2;
  static abs(v: Vec2): Vec2;
  static mid(v: Vec2, w: Vec2): Vec2;
  static upper(v: Vec2, w: Vec2): Vec2;
  static lower(v: Vec2, w: Vec2): Vec2;
  static clamp(v: Vec2, max: number): Vec2;
}

export function Vec3(x: number, y: number, z: number): Vec3;
export function Vec3(obj: { x: number, y: number, z: number }): Vec3;
export function Vec3(): Vec3;
export class Vec3 {
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

  constructor(x: number, y: number, z: number);
  constructor(obj: { x: number, y: number, z: number });
  constructor();

  // static neo(x: number, y: number, z: number): Vec3; internal
  static clone(v: Vec3): Vec3;
  static areEqual(v: Vec3, w: Vec3): boolean;
  static dot(v: Vec3, w: Vec3): number;
  static cross(v: Vec3, w: Vec3): Vec3;
  static add(v: Vec3, w: Vec3): Vec3;
  static sub(v: Vec3, w: Vec3): Vec3;
  static mul(v: Vec3, m: number): Vec3;
  static neg(v: Vec3): Vec3;

  static isValid(v: any): void;
  static assert(o: any): void;
}

export function Transform(position: Vec2, rotation: number): Transform;
export function Transform(): Transform;
export class Transform {
  p: Vec2;
  q: Rot;

  setIdentity(): void;
  set(position: Vec2, rotation: number): void;
  set(xf: Transform): void;

  constructor(position: Vec2, rotation: number);
  constructor();

  static clone(xf: Transform): Transform;
  // static neo(position: Vec2, rotation: number): Transform; internal
  static identity(): Transform;
  static isValid(o: any): boolean;
  static assert(o: any): void;
  static mul(a: Transform, b: Vec2): Vec2;
  static mul(a: Transform, b: Transform): Transform;
  static mul(a: Transform, b: Vec2[]): Vec2[];
  static mul(a: Transform, b: Transform[]): Transform[];
  // deprecated
  // mulAll(a: Transform, b: Vec2[]): Vec2[];
  // mulAll(a: Transform, b: Transform[]): Transform[];
  static mulVec2(a: Transform, b: Vec2): Vec2;
  static mulXf(a: Transform, b: Transform): Transform;
  static mulT(a: Transform, b: Vec2): Vec2;
  static mulT(a: Transform, b: Transform): Transform;
  static mulTVec2(a: Transform, b: Vec2): Vec2;
  static mulTXf(a: Transform, b: Transform): Transform;
}

export function Rot(angle: number): Rot;
export function Rot(rot: Rot): Rot;
export function Rot(): Rot;
export class Rot {
  s: number;
  c: number;

  setIdentity(): void;
  set(angle: number | Rot): void;
  setAngle(angle: number): void;
  getAngle(): number;
  getXAxis(): Vec2;
  getYAxis(): Vec2;

  constructor(angle: number);
  constructor(rot: Rot);
  constructor();

  // static neo(angle: number): Rot; internal
  static clone(rot: Rot): Rot;
  static identity(): Rot;
  static isValid(o: any): boolean;
  static assert(o: any): void;
  static mul(rot: Rot, m: Rot): Rot;
  static mul(rot: Rot, m: Vec2): Vec2;
  static mulRot(rot: Rot, m: Rot): Rot;
  static mulVec2(rot: Rot, m: Vec2): Vec2;
  static mulSub(rot: Rot, v: Vec2, w: Vec2): Vec2;
  static mulT(rot: Rot, m: Rot): Rot;
  static mulT(rot: Rot, m: Vec2): Vec2;
  static mulTRot(rot: Rot, m: Rot): Rot;
  static mulTVec2(rot: Rot, m: Vec2): Vec2;
}

export class Mat22 {
  constructor(a: number, b: number, c: number, d: number);
  constructor(a: { x: number; y: number }, b: { x: number; y: number });
  constructor();

  static isValid(o: any): boolean;
  static assert(o: any): void;

  static mul(mx: Mat22, my: Mat22): Mat22;
  static mul(mx: Mat22, v: Vec2): Vec2;
  static mulVec2(mx: Mat22, v: Vec2): Vec2;
  static mulMat22(mx: Mat22, my: Mat22): Mat22;
  static mulT(mx: Mat22, my: Mat22): Mat22;
  static mulT(mx: Mat22, v: Vec2): Vec2;
  static abs(mx: Mat22): Mat22;
  static add(mx1: Mat22, mx2: Mat22): Mat22;

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

export class Mat33 {
  constructor(a: Vec3, b: Vec3, c: Vec3);
  constructor(a: any, b: any, c: any);
  constructor();

  static isValid(o: any): boolean;
  static assert(o: any): void;

  static mul(a: Mat33, b: Vec2): Vec2;
  static mul(a: Mat33, b: Vec3): Vec3;
  static mulVec3(a: Mat33, b: Vec3): Vec3;
  static mulVec2(a: Mat33, b: Vec2): Vec2;
  static add(a: Mat33, b: Mat33): Mat33;

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

export class Sweep {
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
