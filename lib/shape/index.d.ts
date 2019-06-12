// Types
export type ShapeType = "circle" | "edge" | "polygon" | "chain";

export interface Shape {
  m_type: ShapeType;
  m_radius: number;

  isValid(shape: any): boolean;
  getRadius(): number;
  getType(): ShapeType;
  getChildCount(): number;
  testPoint(xf: planck.Transform, p: planck.Vec2): false;
  rayCast(output: planck.RayCastOutput, input: planck.RayCastInput, xf: planck.Transform, childIndex?: number): boolean;
  computeAABB(aabb: planck.AABB, xf: planck.Transform, childIndex?: number): void;
  computeMass(massData: planck.MassData, density?: number): void;
  computeDistanceProxy(proxy: planck.DistanceProxy): void;
}
export interface CircleShape extends Shape {
  m_type: 'circle';

  m_p: planck.Vec2;

  getCenter(): planck.Vec2;
  getVertex(index?: number): planck.Vec2;
  getVertexCount(index?: number): 1;
}
export interface EdgeShape extends Shape {
  m_type: 'edge';

  m_vertex1: planck.Vec2;
  m_vertex2: planck.Vec2;
  m_vertex0: planck.Vec2;
  m_vertex3: planck.Vec2;
  m_hasVertex0: boolean;
  m_hasVertex3: boolean;

  setNext(v3?: planck.Vec2): EdgeShape;
  setPrev(v0?: planck.Vec2): EdgeShape;
  // @private @internal
  // _set(v1: planck.Vec2, v2: planck.Vec2): EdgeShape;
}
export interface PolygonShape extends Shape {
  m_type: 'polygon';

  m_centroid: planck.Vec2;
  m_vertices: planck.Vec2[];
  m_normals: planck.Vec2[];
  m_count: number;

  getVertex(index: number): planck.Vec2;
  validate(): void;

  // @private @internal
  // _set(vertices: planck.Vec2[]): void;
  // _setAsBox(hx: number, hy: number, center: planck.Vec2, angle?: number): void;
  // _setAsBox(hx: number, hy: number): void;
}
export interface ChainShape extends Shape {
  m_type: 'chain';

  m_vertices: planck.Vec2[];
  m_count: number;
  m_prevVertex: planck.Vec2 | null;
  m_nextVertex: planck.Vec2 | null;
  m_hasPrevVertex: boolean;
  m_hasNextVertex: boolean;

  // @private @internal
  // _createLoop(vertices: planck.Vec2[]): ChainShape;
  // _createChain(vertices: planck.Vec2[]): ChainShape;
  // _setPrevVertex(prevVertex: planck.Vec2): void;
  // _setNextVertex(nextVertex: planck.Vec2): void;
  getChildEdge(edge: EdgeShape, childIndex: number): void;
  getVertex(index: number): planck.Vec2;
}

// API
export let Circle: {
  new(position: planck.Vec2, radius?: number): CircleShape;
     (position: planck.Vec2, radius?: number): CircleShape;

  new(radius?: number): CircleShape;
     (radius?: number): CircleShape;

  TYPE: 'circle';
};
export let Edge: {
  new(v1: planck.Vec2, v2: planck.Vec2): EdgeShape;
     (v1: planck.Vec2, v2: planck.Vec2): EdgeShape;

  TYPE: 'edge';
};
export let Polygon: {
  new(vertices: planck.Vec2[]): PolygonShape;
     (vertices: planck.Vec2[]): PolygonShape;

  TYPE: 'polygon';
};
export let Chain: {
  new(vertices: planck.Vec2[], loop?: boolean): ChainShape;
  (vertices: planck.Vec2[], loop?: boolean): ChainShape;

  TYPE: 'chain';
};
export let Box: {
  new(hx: number, hy: number, center?: planck.Vec2, angle?: number): PolygonShape;
     (hx: number, hy: number, center?: planck.Vec2, angle?: number): PolygonShape;

  TYPE: 'polygon';
};
