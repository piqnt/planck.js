import { Vec2, Transform } from "../common";
import { RayCastInput, RayCastOutput, DistanceProxy, AABB } from "../collision";
import { MassData } from "../";

// Types
export type ShapeType = "circle" | "edge" | "polygon" | "chain";

export class Shape {
  m_type: ShapeType;
  m_radius: number;

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

export function CircleShape(position: Vec2, radius?: number): CircleShape;
export function CircleShape(radius?: number): CircleShape;
export class CircleShape extends Shape {
  static TYPE: 'circle';

  constructor(position: Vec2, radius?: number);
  constructor(radius?: number);

  m_type: 'circle';
  m_p: Vec2;

  getCenter(): Vec2;
  getVertex(index?: number): Vec2;
  getVertexCount(index?: number): 1;
}

export function EdgeShape(v1: Vec2, v2: Vec2): EdgeShape;
export class EdgeShape extends Shape {
  static TYPE: 'edge';

  constructor(v1: Vec2, v2: Vec2);

  m_type: 'edge';
  m_vertex1: Vec2;
  m_vertex2: Vec2;
  m_vertex0: Vec2;
  m_vertex3: Vec2;
  m_hasVertex0: boolean;
  m_hasVertex3: boolean;

  setNext(v3?: Vec2): EdgeShape;
  setPrev(v0?: Vec2): EdgeShape;
  // @private @internal
  // _set(v1: Vec2, v2: Vec2): EdgeShape;
}

export function PolygonShape(vertices: Vec2[]): PolygonShape;
export class PolygonShape extends Shape {
  static TYPE: 'polygon';

  constructor(vertices: Vec2[]);

  m_type: 'polygon';
  m_centroid: Vec2;
  m_vertices: Vec2[];
  m_normals: Vec2[];
  m_count: number;

  getVertex(index: number): Vec2;
  validate(): void;

  // @private @internal
  // _set(vertices: Vec2[]): void;
  // _setAsBox(hx: number, hy: number, center: Vec2, angle?: number): void;
  // _setAsBox(hx: number, hy: number): void;
}

export function BoxShape(hx: number, hy: number, center?: Vec2, angle?: number): BoxShape;
export class BoxShape extends PolygonShape {
  constructor(hx: number, hy: number, center?: Vec2, angle?: number);
}

export function ChainShape(vertices: Vec2[], loop?: boolean): ChainShape;
export class ChainShape extends Shape {
  static TYPE: 'chain';

  constructor(vertices: Vec2[], loop?: boolean);

  m_type: 'chain';
  m_vertices: Vec2[];
  m_count: number;
  m_prevVertex: Vec2 | null;
  m_nextVertex: Vec2 | null;
  m_hasPrevVertex: boolean;
  m_hasNextVertex: boolean;

  // @private @internal
  // _createLoop(vertices: Vec2[]): ChainShape;
  // _createChain(vertices: Vec2[]): ChainShape;
  // _setPrevVertex(prevVertex: Vec2): void;
  // _setNextVertex(nextVertex: Vec2): void;
  getChildEdge(edge: EdgeShape, childIndex: number): void;
  getVertex(index: number): Vec2;
}
