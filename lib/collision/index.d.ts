export type BroadPhase = any; // TODO

export type RayCastInput = { // TODO interface?
  p1: planck.Vec2,
  p2: planck.Vec2,
  maxFraction: number,
};

export type RayCastOutput = {
  normal: planck.Vec2,
  fraction: number,
};

export interface DistanceProxy {
  m_buffer: planck.Vec2[];
  m_vertices: planck.Vec2[];
  m_count: number;
  m_radius: number;

  getVertexCount(): number;
  getVertex(index: number): planck.Vec2;
  getSupport(d: planck.Vec2): number;
  getSupportVertex(d: planck.Vec2): planck.Vec2;
  set(shape: planck.Shape, index: number): void; // TODO index is only used by Chain
}

export interface AABB {
  lowerBound: planck.Vec2;
  upperBound: planck.Vec2;

  isValid(): boolean;
  getCenter(): planck.Vec2;
  getExtents(): planck.Vec2;
  getPerimeter(): number;
  combine(a: AABB, b: AABB): void;
  combinePoints(a: planck.Vec2, b: planck.Vec2): void;
  set(aabb: AABB): void;
  contains(aabb: AABB): boolean;
  extend(value: number): void;
  rayCast(output: RayCastOutput, input: RayCastInput): boolean;
  toString(): string;
}

export let AABB: {
  new(lower: planck.Vec2, upper: planck.Vec2): AABB;
     (lower: planck.Vec2, upper: planck.Vec2): AABB;

  isValid(o: any): boolean;
  assert(o: any): void;
  extend(aabb: AABB, value: number): void;
  testOverlap(a: AABB, b: AABB): boolean;
  areEqual(a: AABB, b: AABB): boolean;
  diff(a: AABB, b: AABB): number;
};
