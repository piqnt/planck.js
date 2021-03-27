// @ts-ignore
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

export default Math;
