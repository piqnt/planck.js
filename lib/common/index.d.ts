/**
 * @author Oliver Zell <https://github.com/zOadT>
 */

declare namespace planck {
  let Math: Math & {
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

  type Sweep = any; // TODO

  interface Velocity {
    v: Vec2;
    w: number;
  }

  interface Position {
    c: Vec2;
    a: number;
    getTransform(xf: Transform, p: Vec2): Transform;
  }

  interface Vec2 {
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

  let Vec2: {
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

  interface Vec3 {
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

  let Vec3: {
    new(x: number, y: number, z: number): Vec3;
    (x: number, y: number, z: number): Vec3;

    new(obj: { x: number, y: number, z: number }): Vec3;
    (obj: { x: number, y: number, z: number }): Vec3;

    new(): Vec3;
    (): Vec3;

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

  interface Transform {
    p: Vec2;
    q: Rot;

    setIdentity(): void;
    set(position: Vec2, rotation: number): void;
    set(xf: Transform): void;
  }
  let Transform: {
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
    mulT(a: Transform, b: Vec2): Vec2;
    mulT(a: Transform, b: Transform): Transform;
  };

  interface Rot {
    s: number;
    c: number;

    setIdentity(): void;
    set(angle: number | Rot): void;
    setAngle(angle: number): void;
    getAngle(): number;
    getXAxis(): Vec2;
    getYAxis(): Vec2;
  }

  let Rot: {
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
    mulSub(rot: Rot, v: Vec2, w: Vec2): Vec2;
    mulT(rot: Rot, m: Rot): Rot;
    mulT(rot: Rot, m: Vec2): Vec2;
  };

  interface Mat22 {
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
}
