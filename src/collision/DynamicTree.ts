/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SettingsInternal as Settings } from "../Settings";
import { Pool } from "../util/Pool";
import { Vec2, Vec2Value } from "../common/Vec2";
import { AABB, AABBValue, RayCastCallback, RayCastInput } from "./AABB";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_max = Math.max;

export type DynamicTreeQueryCallback = (nodeId: number) => boolean;

/**
 * A node in the dynamic tree. The client does not interact with this directly.
 */
export class TreeNode<T> {
  id: number;
  /** Enlarged AABB */
  aabb: AABB = new AABB();
  userData: T = null;
  parent: TreeNode<T> = null;
  child1: TreeNode<T> = null;
  child2: TreeNode<T> = null;
  /** 0: leaf, -1: free node */
  height: number = -1;

  constructor(id?: number) {
    this.id = id;
  }

  /** @internal */
  toString(): string {
    return this.id + ": " + this.userData;
  }

  isLeaf(): boolean {
    return this.child1 == null;
  }
}

/** @internal */ const poolTreeNode = new Pool<TreeNode<any>>({
  create(): TreeNode<any> {
    return new TreeNode();
  },
  release(node: TreeNode<any>) {
    node.userData = null;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    node.height = -1;
    node.id = undefined;
  },
});

/**
 * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
 * dynamic tree arranges data in a binary tree to accelerate queries such as
 * volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
 * expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
 * than the client object. This allows the client object to move by small
 * amounts without triggering a tree update.
 *
 * Nodes are pooled and relocatable, so we use node indices rather than
 * pointers.
 */
export class DynamicTree<T> {
  m_root: TreeNode<T>;
  m_lastProxyId: number;
  m_nodes: {
    [id: number]: TreeNode<T>;
  };

  constructor() {
    this.m_root = null;
    this.m_nodes = {};
    this.m_lastProxyId = 0;
  }

  /**
   * Get proxy user data.
   *
   * @return the proxy user data or 0 if the id is invalid.
   */
  getUserData(id: number): T {
    const node = this.m_nodes[id];
    if (_ASSERT) console.assert(!!node);
    return node.userData;
  }

  /**
   * Get the fat AABB for a node id.
   *
   * @return the proxy user data or 0 if the id is invalid.
   */
  getFatAABB(id: number): AABB {
    const node = this.m_nodes[id];
    if (_ASSERT) console.assert(!!node);
    return node.aabb;
  }

  allocateNode(): TreeNode<T> {
    const node = poolTreeNode.allocate();
    node.id = ++this.m_lastProxyId;
    this.m_nodes[node.id] = node;
    return node;
  }

  freeNode(node: TreeNode<T>): void {
    // tslint:disable-next-line:no-dynamic-delete
    delete this.m_nodes[node.id];
    poolTreeNode.release(node);
  }

  /**
   * Create a proxy in the tree as a leaf node. We return the index of the node
   * instead of a pointer so that we can grow the node pool.
   *
   * Create a proxy. Provide a tight fitting AABB and a userData pointer.
   */
  createProxy(aabb: AABBValue, userData: T): number {
    if (_ASSERT) console.assert(AABB.isValid(aabb));

    const node = this.allocateNode();

    node.aabb.set(aabb);

    // Fatten the aabb.
    AABB.extend(node.aabb, Settings.aabbExtension);

    node.userData = userData;
    node.height = 0;

    this.insertLeaf(node);

    return node.id;
  }

  /**
   * Destroy a proxy. This asserts if the id is invalid.
   */
  destroyProxy(id: number): void {
    const node = this.m_nodes[id];

    if (_ASSERT) console.assert(!!node);
    if (_ASSERT) console.assert(node.isLeaf());

    this.removeLeaf(node);
    this.freeNode(node);
  }

  /**
   * Move a proxy with a swepted AABB. If the proxy has moved outside of its
   * fattened AABB, then the proxy is removed from the tree and re-inserted.
   * Otherwise the function returns immediately.
   *
   * @param d Displacement
   *
   * @return true if the proxy was re-inserted.
   */
  moveProxy(id: number, aabb: AABBValue, d: Vec2Value): boolean {
    if (_ASSERT) console.assert(AABB.isValid(aabb));
    if (_ASSERT) console.assert(!d || Vec2.isValid(d));

    const node = this.m_nodes[id];

    if (_ASSERT) console.assert(!!node);
    if (_ASSERT) console.assert(node.isLeaf());

    if (node.aabb.contains(aabb)) {
      return false;
    }

    this.removeLeaf(node);

    node.aabb.set(aabb);

    // Extend AABB.
    aabb = node.aabb;
    AABB.extend(aabb, Settings.aabbExtension);

    // Predict AABB displacement.
    // const d = Vec2.mul(Settings.aabbMultiplier, displacement);

    if (d.x < 0.0) {
      aabb.lowerBound.x += d.x * Settings.aabbMultiplier;
    } else {
      aabb.upperBound.x += d.x * Settings.aabbMultiplier;
    }

    if (d.y < 0.0) {
      aabb.lowerBound.y += d.y * Settings.aabbMultiplier;
    } else {
      aabb.upperBound.y += d.y * Settings.aabbMultiplier;
    }

    this.insertLeaf(node);

    return true;
  }

  insertLeaf(leaf: TreeNode<T>): void {
    if (_ASSERT) console.assert(AABB.isValid(leaf.aabb));

    if (this.m_root == null) {
      this.m_root = leaf;
      this.m_root.parent = null;
      return;
    }

    // Find the best sibling for this node
    const leafAABB = leaf.aabb;
    let index = this.m_root;
    while (!index.isLeaf()) {
      const child1 = index.child1;
      const child2 = index.child2;

      const area = index.aabb.getPerimeter();

      const combinedArea = AABB.combinedPerimeter(index.aabb, leafAABB);

      // Cost of creating a new parent for this node and the new leaf
      const cost = 2.0 * combinedArea;

      // Minimum cost of pushing the leaf further down the tree
      const inheritanceCost = 2.0 * (combinedArea - area);

      // Cost of descending into child1
      const newArea1 = AABB.combinedPerimeter(leafAABB, child1.aabb);
      let cost1 = newArea1 + inheritanceCost;
      if (!child1.isLeaf()) {
        const oldArea = child1.aabb.getPerimeter();
        cost1 -= oldArea;
      }

      // Cost of descending into child2
      const newArea2 = AABB.combinedPerimeter(leafAABB, child2.aabb);
      let cost2 = newArea2 + inheritanceCost;
      if (!child2.isLeaf()) {
        const oldArea = child2.aabb.getPerimeter();
        cost2 -= oldArea;
      }

      // Descend according to the minimum cost.
      if (cost < cost1 && cost < cost2) {
        break;
      }

      // Descend
      if (cost1 < cost2) {
        index = child1;
      } else {
        index = child2;
      }
    }

    const sibling = index;

    // Create a new parent.
    const oldParent = sibling.parent;
    const newParent = this.allocateNode();
    newParent.parent = oldParent;
    newParent.userData = null;
    newParent.aabb.combine(leafAABB, sibling.aabb);
    newParent.height = sibling.height + 1;

    if (oldParent != null) {
      // The sibling was not the root.
      if (oldParent.child1 === sibling) {
        oldParent.child1 = newParent;
      } else {
        oldParent.child2 = newParent;
      }

      newParent.child1 = sibling;
      newParent.child2 = leaf;
      sibling.parent = newParent;
      leaf.parent = newParent;
    } else {
      // The sibling was the root.
      newParent.child1 = sibling;
      newParent.child2 = leaf;
      sibling.parent = newParent;
      leaf.parent = newParent;
      this.m_root = newParent;
    }

    // Walk back up the tree fixing heights and AABBs
    index = leaf.parent;
    while (index != null) {
      index = this.balance(index);

      const child1 = index.child1;
      const child2 = index.child2;

      if (_ASSERT) console.assert(child1 != null);
      if (_ASSERT) console.assert(child2 != null);

      index.height = 1 + math_max(child1.height, child2.height);
      index.aabb.combine(child1.aabb, child2.aabb);

      index = index.parent;
    }

    // validate();
  }

  removeLeaf(leaf: TreeNode<T>): void {
    if (leaf === this.m_root) {
      this.m_root = null;
      return;
    }

    const parent = leaf.parent;
    const grandParent = parent.parent;
    let sibling;
    if (parent.child1 === leaf) {
      sibling = parent.child2;
    } else {
      sibling = parent.child1;
    }

    if (grandParent != null) {
      // Destroy parent and connect sibling to grandParent.
      if (grandParent.child1 === parent) {
        grandParent.child1 = sibling;
      } else {
        grandParent.child2 = sibling;
      }
      sibling.parent = grandParent;
      this.freeNode(parent);

      // Adjust ancestor bounds.
      let index = grandParent;
      while (index != null) {
        index = this.balance(index);

        const child1 = index.child1;
        const child2 = index.child2;

        index.aabb.combine(child1.aabb, child2.aabb);
        index.height = 1 + math_max(child1.height, child2.height);

        index = index.parent;
      }
    } else {
      this.m_root = sibling;
      sibling.parent = null;
      this.freeNode(parent);
    }

    // validate();
  }

  /**
   * Perform a left or right rotation if node A is imbalanced. Returns the new
   * root index.
   */
  balance(iA: TreeNode<T>): TreeNode<T> {
    if (_ASSERT) console.assert(iA != null);

    const A = iA;
    if (A.isLeaf() || A.height < 2) {
      return iA;
    }

    const B = A.child1;
    const C = A.child2;

    const balance = C.height - B.height;

    // Rotate C up
    if (balance > 1) {
      const F = C.child1;
      const G = C.child2;

      // Swap A and C
      C.child1 = A;
      C.parent = A.parent;
      A.parent = C;

      // A's old parent should point to C
      if (C.parent != null) {
        if (C.parent.child1 === iA) {
          C.parent.child1 = C;
        } else {
          C.parent.child2 = C;
        }
      } else {
        this.m_root = C;
      }

      // Rotate
      if (F.height > G.height) {
        C.child2 = F;
        A.child2 = G;
        G.parent = A;
        A.aabb.combine(B.aabb, G.aabb);
        C.aabb.combine(A.aabb, F.aabb);

        A.height = 1 + math_max(B.height, G.height);
        C.height = 1 + math_max(A.height, F.height);
      } else {
        C.child2 = G;
        A.child2 = F;
        F.parent = A;
        A.aabb.combine(B.aabb, F.aabb);
        C.aabb.combine(A.aabb, G.aabb);

        A.height = 1 + math_max(B.height, F.height);
        C.height = 1 + math_max(A.height, G.height);
      }

      return C;
    }

    // Rotate B up
    if (balance < -1) {
      const D = B.child1;
      const E = B.child2;

      // Swap A and B
      B.child1 = A;
      B.parent = A.parent;
      A.parent = B;

      // A's old parent should point to B
      if (B.parent != null) {
        if (B.parent.child1 === A) {
          B.parent.child1 = B;
        } else {
          B.parent.child2 = B;
        }
      } else {
        this.m_root = B;
      }

      // Rotate
      if (D.height > E.height) {
        B.child2 = D;
        A.child1 = E;
        E.parent = A;
        A.aabb.combine(C.aabb, E.aabb);
        B.aabb.combine(A.aabb, D.aabb);

        A.height = 1 + math_max(C.height, E.height);
        B.height = 1 + math_max(A.height, D.height);
      } else {
        B.child2 = E;
        A.child1 = D;
        D.parent = A;
        A.aabb.combine(C.aabb, D.aabb);
        B.aabb.combine(A.aabb, E.aabb);

        A.height = 1 + math_max(C.height, D.height);
        B.height = 1 + math_max(A.height, E.height);
      }

      return B;
    }

    return A;
  }

  /**
   * Compute the height of the binary tree in O(N) time. Should not be called
   * often.
   */
  getHeight(): number {
    if (this.m_root == null) {
      return 0;
    }

    return this.m_root.height;
  }

  /**
   * Get the ratio of the sum of the node areas to the root area.
   */
  getAreaRatio(): number {
    if (this.m_root == null) {
      return 0.0;
    }

    const root = this.m_root;
    const rootArea = root.aabb.getPerimeter();

    let totalArea = 0.0;
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while ((node = it.next())) {
      if (node.height < 0) {
        // Free node in pool
        continue;
      }

      totalArea += node.aabb.getPerimeter();
    }

    this.iteratorPool.release(it);

    return totalArea / rootArea;
  }

  /**
   * Compute the height of a sub-tree.
   */
  computeHeight(id?: number): number {
    let node;
    if (typeof id !== "undefined") {
      node = this.m_nodes[id];
    } else {
      node = this.m_root;
    }

    // if (_ASSERT) console.assert(0 <= id && id < this.m_nodeCapacity);

    if (node.isLeaf()) {
      return 0;
    }

    const height1 = this.computeHeight(node.child1.id);
    const height2 = this.computeHeight(node.child2.id);
    return 1 + math_max(height1, height2);
  }

  validateStructure(node: TreeNode<T>): void {
    if (node == null) {
      return;
    }

    if (node === this.m_root) {
      if (_ASSERT) console.assert(node.parent == null);
    }

    const child1 = node.child1;
    const child2 = node.child2;

    if (node.isLeaf()) {
      if (_ASSERT) console.assert(child1 == null);
      if (_ASSERT) console.assert(child2 == null);
      if (_ASSERT) console.assert(node.height === 0);
      return;
    }

    // if (_ASSERT) console.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // if (_ASSERT) console.assert(0 <= child2 && child2 < this.m_nodeCapacity);

    if (_ASSERT) console.assert(child1.parent === node);
    if (_ASSERT) console.assert(child2.parent === node);

    this.validateStructure(child1);
    this.validateStructure(child2);
  }

  validateMetrics(node: TreeNode<T>): void {
    if (node == null) {
      return;
    }

    const child1 = node.child1;
    const child2 = node.child2;

    if (node.isLeaf()) {
      if (_ASSERT) console.assert(child1 == null);
      if (_ASSERT) console.assert(child2 == null);
      if (_ASSERT) console.assert(node.height === 0);
      return;
    }

    // if (_ASSERT) console.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // if (_ASSERT) console.assert(0 <= child2 && child2 < this.m_nodeCapacity);

    if (_ASSERT) {
      const height1 = child1.height;
      const height2 = child2.height;
      const height = 1 + math_max(height1, height2);
      console.assert(node.height === height);
    }

    if (_ASSERT) {
      const aabb = new AABB();
      aabb.combine(child1.aabb, child2.aabb);
      console.assert(AABB.areEqual(aabb, node.aabb));
    }

    this.validateMetrics(child1);
    this.validateMetrics(child2);
  }

  /**
   * Validate this tree. For testing.
   */
  validate(): void {
    if (!_ASSERT) return;
    this.validateStructure(this.m_root);
    this.validateMetrics(this.m_root);

    console.assert(this.getHeight() === this.computeHeight());
  }

  /**
   * Get the maximum balance of an node in the tree. The balance is the difference
   * in height of the two children of a node.
   */
  getMaxBalance(): number {
    let maxBalance = 0;
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while ((node = it.next())) {
      if (node.height <= 1) {
        continue;
      }

      if (_ASSERT) console.assert(!node.isLeaf());

      const balance = math_abs(node.child2.height - node.child1.height);
      maxBalance = math_max(maxBalance, balance);
    }
    this.iteratorPool.release(it);

    return maxBalance;
  }

  /**
   * Build an optimal tree. Very expensive. For testing.
   */
  rebuildBottomUp(): void {
    const nodes = [];
    let count = 0;

    // Build array of leaves. Free the rest.
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while ((node = it.next())) {
      if (node.height < 0) {
        // free node in pool
        continue;
      }

      if (node.isLeaf()) {
        node.parent = null;
        nodes[count] = node;
        ++count;
      } else {
        this.freeNode(node);
      }
    }
    this.iteratorPool.release(it);

    while (count > 1) {
      let minCost = Infinity;
      let iMin = -1;
      let jMin = -1;
      for (let i = 0; i < count; ++i) {
        const aabbi = nodes[i].aabb;
        for (let j = i + 1; j < count; ++j) {
          const aabbj = nodes[j].aabb;
          const cost = AABB.combinedPerimeter(aabbi, aabbj);
          if (cost < minCost) {
            iMin = i;
            jMin = j;
            minCost = cost;
          }
        }
      }

      const child1 = nodes[iMin];
      const child2 = nodes[jMin];

      const parent = this.allocateNode();
      parent.child1 = child1;
      parent.child2 = child2;
      parent.height = 1 + math_max(child1.height, child2.height);
      parent.aabb.combine(child1.aabb, child2.aabb);
      parent.parent = null;

      child1.parent = parent;
      child2.parent = parent;

      nodes[jMin] = nodes[count - 1];
      nodes[iMin] = parent;
      --count;
    }

    this.m_root = nodes[0];

    if (_ASSERT) this.validate();
  }

  /**
   * Shift the world origin. Useful for large worlds. The shift formula is:
   * position -= newOrigin
   *
   * @param newOrigin The new origin with respect to the old origin
   */
  shiftOrigin(newOrigin: Vec2Value): void {
    // Build array of leaves. Free the rest.
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while ((node = it.next())) {
      const aabb = node.aabb;
      aabb.lowerBound.x -= newOrigin.x;
      aabb.lowerBound.y -= newOrigin.y;
      aabb.upperBound.x -= newOrigin.x;
      aabb.upperBound.y -= newOrigin.y;
    }
    this.iteratorPool.release(it);
  }

  /**
   * Query an AABB for overlapping proxies. The callback class is called for each
   * proxy that overlaps the supplied AABB.
   */
  query(aabb: AABBValue, queryCallback: DynamicTreeQueryCallback): void {
    if (_ASSERT) console.assert(typeof queryCallback === "function");
    const stack = this.stackPool.allocate();

    stack.push(this.m_root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node == null) {
        continue;
      }

      if (AABB.testOverlap(node.aabb, aabb)) {
        if (node.isLeaf()) {
          const proceed = queryCallback(node.id);
          if (proceed === false) {
            return;
          }
        } else {
          stack.push(node.child1);
          stack.push(node.child2);
        }
      }
    }

    this.stackPool.release(stack);
  }

  /**
   * Ray-cast against the proxies in the tree. This relies on the callback to
   * perform a exact ray-cast in the case were the proxy contains a shape. The
   * callback also performs the any collision filtering. This has performance
   * roughly equal to k * log(n), where k is the number of collisions and n is the
   * number of proxies in the tree.
   *
   * @param input The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
   * @param rayCastCallback A function that is called for each proxy that is hit by the ray. If the return value is a positive number it will update the maxFraction of the ray cast input, and if it is zero it will terminate they ray cast.
   */
  rayCast(input: RayCastInput, rayCastCallback: RayCastCallback): void {
    // TODO: GC
    if (_ASSERT) console.assert(typeof rayCastCallback === "function");
    const p1 = input.p1;
    const p2 = input.p2;
    const r = Vec2.sub(p2, p1);
    if (_ASSERT) console.assert(r.lengthSquared() > 0.0);
    r.normalize();

    // v is perpendicular to the segment.
    const v = Vec2.crossNumVec2(1.0, r);
    const abs_v = Vec2.abs(v);

    // Separating axis for segment (Gino, p80).
    // |dot(v, p1 - c)| > dot(|v|, h)

    let maxFraction = input.maxFraction;

    // Build a bounding box for the segment.
    const segmentAABB = new AABB();
    let t = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
    segmentAABB.combinePoints(p1, t);

    const stack = this.stackPool.allocate();
    const subInput = this.inputPool.allocate();

    stack.push(this.m_root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node == null) {
        continue;
      }

      if (AABB.testOverlap(node.aabb, segmentAABB) === false) {
        continue;
      }

      // Separating axis for segment (Gino, p80).
      // |dot(v, p1 - c)| > dot(|v|, h)
      const c = node.aabb.getCenter();
      const h = node.aabb.getExtents();
      const separation = math_abs(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
      if (separation > 0.0) {
        continue;
      }

      if (node.isLeaf()) {
        subInput.p1 = Vec2.clone(input.p1);
        subInput.p2 = Vec2.clone(input.p2);
        subInput.maxFraction = maxFraction;

        const value = rayCastCallback(subInput, node.id);

        if (value === 0.0) {
          // The client has terminated the ray cast.
          break;
        } else if (value > 0.0) {
          // update segment bounding box.
          maxFraction = value;
          t = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
          segmentAABB.combinePoints(p1, t);
        }
      } else {
        stack.push(node.child1);
        stack.push(node.child2);
      }
    }
    this.stackPool.release(stack);
    this.inputPool.release(subInput);
  }

  private inputPool: Pool<RayCastInput> = new Pool<RayCastInput>({
    create(): RayCastInput {
      // tslint:disable-next-line:no-object-literal-type-assertion
      return {} as RayCastInput;
    },
    release(stack: RayCastInput): void {},
  });

  private stackPool: Pool<Array<TreeNode<T>>> = new Pool<Array<TreeNode<T>>>({
    create(): Array<TreeNode<T>> {
      return [];
    },
    release(stack: Array<TreeNode<T>>): void {
      stack.length = 0;
    },
  });

  private iteratorPool: Pool<Iterator<T>> = new Pool<Iterator<T>>({
    create(): Iterator<T> {
      return new Iterator();
    },
    release(iterator: Iterator<T>): void {
      iterator.close();
    },
  });
}

/** @internal */
class Iterator<T> {
  parents: Array<TreeNode<T>> = [];
  states: number[] = [];
  preorder(root: TreeNode<T>): Iterator<T> {
    this.parents.length = 0;
    this.parents.push(root);
    this.states.length = 0;
    this.states.push(0);
    return this;
  }
  next(): TreeNode<T> {
    while (this.parents.length > 0) {
      const i = this.parents.length - 1;
      const node = this.parents[i];
      if (this.states[i] === 0) {
        this.states[i] = 1;
        return node;
      }
      if (this.states[i] === 1) {
        this.states[i] = 2;
        if (node.child1) {
          this.parents.push(node.child1);
          this.states.push(1);
          return node.child1;
        }
      }
      if (this.states[i] === 2) {
        this.states[i] = 3;
        if (node.child2) {
          this.parents.push(node.child2);
          this.states.push(1);
          return node.child2;
        }
      }
      this.parents.pop();
      this.states.pop();
    }
  }
  close(): void {
    this.parents.length = 0;
  }
}
