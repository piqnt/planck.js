export type BroadPhase = any; // TODO

export type RayCastInput = { // TODO interface?
  p1: Vec2,
  p2: Vec2,
  maxFraction: number,
};

export type RayCastOutput = {
  normal: Vec2,
  fraction: number,
};

export interface DistanceProxy {
  m_buffer: Vec2[];
  m_vertices: Vec2[];
  m_count: number;
  m_radius: number;

  getVertexCount(): number;
  getVertex(index: number): Vec2;
  getSupport(d: Vec2): number;
  getSupportVertex(d: Vec2): Vec2;
  set(shape: Shape, index: number): void; // TODO index is only used by Chain
}

export interface AABB {
  lowerBound: Vec2;
  upperBound: Vec2;

  isValid(): boolean;
  getCenter(): Vec2;
  getExtents(): Vec2;
  getPerimeter(): number;
  combine(a: AABB, b: AABB): void;
  combinePoints(a: Vec2, b: Vec2): void;
  set(aabb: AABB): void;
  contains(aabb: AABB): boolean;
  extend(value: number): void;
  rayCast(output: RayCastOutput, input: RayCastInput): boolean;
  toString(): string;
}

export let AABB: {
  new(lower: Vec2, upper: Vec2): AABB;
     (lower: Vec2, upper: Vec2): AABB;

  isValid(o: any): boolean;
  assert(o: any): void;
  extend(aabb: AABB, value: number): void;
  testOverlap(a: AABB, b: AABB): boolean;
  areEqual(a: AABB, b: AABB): boolean;
  diff(a: AABB, b: AABB): number;
};
