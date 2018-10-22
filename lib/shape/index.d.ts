declare namespace planck {
  // Types
  type ShapeType = "circle" | "edge" | "polygon" | "chain";

  interface Shape {
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
  interface CircleShape extends Shape {
    m_type: 'circle';

    m_p: Vec2;

    getCenter(): Vec2;
    getVertex(index?: number): Vec2;
    getVertexCount(index?: number): 1;
  }
  interface EdgeShape extends Shape {
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
  interface PolygonShape extends Shape {
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
  interface ChainShape extends Shape {
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

  // API
  let Circle: {
    new(position: Vec2, radius?: number): CircleShape;
       (position: Vec2, radius?: number): CircleShape;

    new(radius?: number): CircleShape;
       (radius?: number): CircleShape;

    TYPE: 'circle';
  };
  let Edge: {
    new(v1: Vec2, v2: Vec2): EdgeShape;
       (v1: Vec2, v2: Vec2): EdgeShape;

    TYPE: 'edge';
  };
  let Polygon: {
    new(vertices: Vec2[]): PolygonShape;
       (vertices: Vec2[]): PolygonShape;

    TYPE: 'polygon';
  };
  let Chain: {
    new(vertices: Vec2[], loop?: boolean): ChainShape;
    (vertices: Vec2[], loop?: boolean): ChainShape;

    TYPE: 'chain';
  };
  let Box: {
    new(hx: number, hy: number, center?: Vec2, angle?: number): PolygonShape;
       (hx: number, hy: number, center?: Vec2, angle?: number): PolygonShape;

    TYPE: 'polygon';
  };
}
