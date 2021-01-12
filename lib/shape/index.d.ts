import { Vec2, Transform } from "../common";
import { RayCastInput, RayCastOutput, DistanceProxy, AABB } from "../collision";
import { MassData } from "../";

// Types
export type ShapeType = "circle" | "edge" | "polygon" | "chain";

export interface Shape {
  /** @internal */ m_type: ShapeType;
  /** @internal */ m_radius: number;

  isValid(shape: any): boolean;
  getRadius(): number;
  getType(): ShapeType;
  getChildCount(): number;
  testPoint(xf: Transform, p: Vec2): false;
  rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex?: number): boolean;
  computeAABB(aabb: AABB, xf: Transform, childIndex?: number): void;
  computeMass(massData: MassData, density?: number): void;
  computeDistanceProxy(proxy: DistanceProxy): void;
}

export let CircleShape: {
  TYPE: 'circle',

  new (position: Vec2, radius?: number): CircleShape;
      (position: Vec2, radius?: number): CircleShape,
  new (radius?: number): CircleShape,
      (radius?: number): CircleShape,
}
export interface CircleShape extends Shape {
  /** @internal */ m_type: 'circle';
  /** @internal */ m_p: Vec2;

  getCenter(): Vec2;
  getVertex(index?: number): Vec2;
  getVertexCount(index?: number): 1;
}

export let EdgeShape: {
  TYPE: 'edge';

  new (v1: Vec2, v2: Vec2): EdgeShape;
      (v1: Vec2, v2: Vec2): EdgeShape;
}
export interface EdgeShape extends Shape {
  /** @internal */ m_type: 'edge';
  /** @internal */ m_vertex1: Vec2;
  /** @internal */ m_vertex2: Vec2;
  /** @internal */ m_vertex0: Vec2;
  /** @internal */ m_vertex3: Vec2;
  /** @internal */ m_hasVertex0: boolean;
  /** @internal */ m_hasVertex3: boolean;

  setNext(v3?: Vec2): EdgeShape;
  setPrev(v0?: Vec2): EdgeShape;
  /** @internal */ _set(v1: Vec2, v2: Vec2): EdgeShape;
}

export let PolygonShape: {
  TYPE: 'polygon';

  new (vertices: Vec2[]): PolygonShape;
      (vertices: Vec2[]): PolygonShape;
}
export interface PolygonShape extends Shape {
  /** @internal */ m_type: 'polygon';
  /** @internal */ m_centroid: Vec2;
  /** @internal */ m_vertices: Vec2[];
  /** @internal */ m_normals: Vec2[];
  /** @internal */ m_count: number;

  getVertex(index: number): Vec2;
  validate(): void;

  /** @internal */ _set(vertices: Vec2[]): void;
  /** @internal */ _setAsBox(hx: number, hy: number, center: Vec2, angle?: number): void;
  /** @internal */ _setAsBox(hx: number, hy: number): void;
}

export let BoxShape: {
  TYPE: 'polygon';

  new (hx: number, hy: number, center?: Vec2, angle?: number): BoxShape;
      (hx: number, hy: number, center?: Vec2, angle?: number): BoxShape;
}
export interface BoxShape extends PolygonShape {

}

export let ChainShape: {
  TYPE: 'chain'

  new (vertices: Vec2[], loop?: boolean): ChainShape;
      (vertices: Vec2[], loop?: boolean): ChainShape;
}
export interface ChainShape extends Shape {
  /** @internal */ m_type: 'chain';
  /** @internal */ m_vertices: Vec2[];
  /** @internal */ m_count: number;
  /** @internal */ m_prevVertex: Vec2 | null;
  /** @internal */ m_nextVertex: Vec2 | null;
  /** @internal */ m_hasPrevVertex: boolean;
  /** @internal */ m_hasNextVertex: boolean;

  getChildEdge(edge: EdgeShape, childIndex: number): void;
  getVertex(index: number): Vec2;

  /** @internal */ _createLoop(vertices: Vec2[]): ChainShape;
  /** @internal */ _createChain(vertices: Vec2[]): ChainShape;
  setPrevVertex(prevVertex: Vec2): void;
  setNextVertex(nextVertex: Vec2): void;
}
