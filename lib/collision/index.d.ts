import { Vec2 } from "../common";
import { Shape } from "../shape";

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
  extend(value: number): AABB;
  rayCast(output: RayCastOutput, input: RayCastInput): boolean;
  toString(): string;
}

export let AABB: {
  new(lower?: Vec2, upper?: Vec2): AABB;
     (lower?: Vec2, upper?: Vec2): AABB;

  isValid(o: any): boolean;
  assert(o: any): void;
  extend(aabb: AABB, value: number): void;
  testOverlap(a: AABB, b: AABB): boolean;
  areEqual(a: AABB, b: AABB): boolean;
  diff(a: AABB, b: AABB): number;
};

export interface TreeNode {
  id: number;
  aabb: AABB;
  userData: any;
  parent: TreeNode;
  child1: TreeNode;
  child2: TreeNode;
  height: number;
}

export interface DynamicTree {
    getUserData(id: number): unknown;
    getFatAABB(id: number): AABB;
    allocateNode(): TreeNode;
    freeNode(node: TreeNode): void;
    createProxy(aabb: AABB, userData: any): string;
    destroyProxy(id: number): void;
    moveProxy(id: number, aabb: AABB, d: Vec2): boolean;
    insertLeaf(leaf: TreeNode): void;
    removeLeaf(leaf: TreeNode): void;
    balance(iA: TreeNode): TreeNode;
    getHeight(): number;
    getAreaRatio(): number;
    computeHeight(node?: TreeNode): number;
    validateStructure(node: TreeNode): void;
    validateMetrics(node: TreeNode): void;
    validate(): void;
    getMaxBalance(): number;
    rebuildBottomUp(): void;
    shiftOrigin(newOrigin: Vec2): void;
    query(aabb: AABB, queryCallback: (id: number) => boolean): void;
    rayCast(input: RayCastInput, rayCastCallback: (subInput: RayCastInput, id: number) => number): void;
}
