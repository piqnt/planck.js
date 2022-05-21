/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2021 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Settings from '../Settings';
import common from '../util/common';
import Pool from '../util/Pool';
import Vec2 from '../common/Vec2';
import Math from '../common/Math';
import AABB, { RayCastCallback, RayCastInput } from './AABB';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


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
export default class DynamicTree<T> {
  m_root: TreeNode<T>;
  m_lastProxyId: number;
  m_nodes: {
    [id: number]: TreeNode<T>
  };
  m_pool: Pool<TreeNode<T>>;

  constructor() {
    this.m_root = null;
    this.m_nodes = {};
    this.m_lastProxyId = 0;

    this.m_pool = new Pool<TreeNode<T>>({
      create(): TreeNode<T> {
        return new TreeNode();
      }
    });
  }

  /**
   * Get proxy user data.
   *
   * @return the proxy user data or 0 if the id is invalid.
   */
  getUserData(id: number): T {
    const node = this.m_nodes[id];
    _ASSERT && common.assert(!!node);
    return node.userData;
  }

  /**
   * Get the fat AABB for a node id.
   *
   * @return the proxy user data or 0 if the id is invalid.
   */
  getFatAABB(id: number): AABB {
    const node = this.m_nodes[id];
    _ASSERT && common.assert(!!node);
    return node.aabb;
  }

  allocateNode(): TreeNode<T> {
    const node = this.m_pool.allocate();
    node.id = ++this.m_lastProxyId;
    node.userData = null;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    node.height = -1;
    this.m_nodes[node.id] = node;
    return node;
  }

  freeNode(node: TreeNode<T>): void {
    this.m_pool.release(node);
    node.height = -1;
    // tslint:disable-next-line:no-dynamic-delete
    delete this.m_nodes[node.id];
  }

  /**
   * Create a proxy in the tree as a leaf node. We return the index of the node
   * instead of a pointer so that we can grow the node pool.
   *
   * Create a proxy. Provide a tight fitting AABB and a userData pointer.
   */
  createProxy(aabb: AABB, userData: T): number {
    _ASSERT && common.assert(AABB.isValid(aabb));

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

    _ASSERT && common.assert(!!node);
    _ASSERT && common.assert(node.isLeaf());

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
  moveProxy(id: number, aabb: AABB, d: Vec2): boolean {
    _ASSERT && common.assert(AABB.isValid(aabb));
    _ASSERT && common.assert(!d || Vec2.isValid(d));

    const node = this.m_nodes[id];

    _ASSERT && common.assert(!!node);
    _ASSERT && common.assert(node.isLeaf());

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
    _ASSERT && common.assert(AABB.isValid(leaf.aabb));

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

      const combinedAABB = new AABB();
      combinedAABB.combine(index.aabb, leafAABB);
      const combinedArea = combinedAABB.getPerimeter();

      // Cost of creating a new parent for this node and the new leaf
      const cost = 2.0 * combinedArea;

      // Minimum cost of pushing the leaf further down the tree
      const inheritanceCost = 2.0 * (combinedArea - area);

      // Cost of descending into child1
      let cost1;
      if (child1.isLeaf()) {
        const aabb = new AABB();
        aabb.combine(leafAABB, child1.aabb);
        cost1 = aabb.getPerimeter() + inheritanceCost;
      } else {
        const aabb = new AABB();
        aabb.combine(leafAABB, child1.aabb);
        const oldArea = child1.aabb.getPerimeter();
        const newArea = aabb.getPerimeter();
        cost1 = (newArea - oldArea) + inheritanceCost;
      }

      // Cost of descending into child2
      let cost2;
      if (child2.isLeaf()) {
        const aabb = new AABB();
        aabb.combine(leafAABB, child2.aabb);
        cost2 = aabb.getPerimeter() + inheritanceCost;
      } else {
        const aabb = new AABB();
        aabb.combine(leafAABB, child2.aabb);
        const oldArea = child2.aabb.getPerimeter();
        const newArea = aabb.getPerimeter();
        cost2 = newArea - oldArea + inheritanceCost;
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

      _ASSERT && common.assert(child1 != null);
      _ASSERT && common.assert(child2 != null);

      index.height = 1 + Math.max(child1.height, child2.height);
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
        index.height = 1 + Math.max(child1.height, child2.height);

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
    _ASSERT && common.assert(iA != null);

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

        A.height = 1 + Math.max(B.height, G.height);
        C.height = 1 + Math.max(A.height, F.height);
      } else {
        C.child2 = G;
        A.child2 = F;
        F.parent = A;
        A.aabb.combine(B.aabb, F.aabb);
        C.aabb.combine(A.aabb, G.aabb);

        A.height = 1 + Math.max(B.height, F.height);
        C.height = 1 + Math.max(A.height, G.height);
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

        A.height = 1 + Math.max(C.height, E.height);
        B.height = 1 + Math.max(A.height, D.height);
      } else {
        B.child2 = E;
        A.child1 = D;
        D.parent = A;
        A.aabb.combine(C.aabb, D.aabb);
        B.aabb.combine(A.aabb, E.aabb);

        A.height = 1 + Math.max(C.height, D.height);
        B.height = 1 + Math.max(A.height, E.height);
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
    while (node = it.next()) {
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
    if (typeof id !== 'undefined') {
      node = this.m_nodes[id];
    } else {
      node = this.m_root;
    }

    // _ASSERT && common.assert(0 <= id && id < this.m_nodeCapacity);

    if (node.isLeaf()) {
      return 0;
    }

    const height1 = this.computeHeight(node.child1.id);
    const height2 = this.computeHeight(node.child2.id);
    return 1 + Math.max(height1, height2);
  }

  validateStructure(node: TreeNode<T>): void {
    if (node == null) {
      return;
    }

    if (node === this.m_root) {
      _ASSERT && common.assert(node.parent == null);
    }

    const child1 = node.child1;
    const child2 = node.child2;

    if (node.isLeaf()) {
      _ASSERT && common.assert(child1 == null);
      _ASSERT && common.assert(child2 == null);
      _ASSERT && common.assert(node.height === 0);
      return;
    }

    // _ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // _ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);

    _ASSERT && common.assert(child1.parent === node);
    _ASSERT && common.assert(child2.parent === node);

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
      _ASSERT && common.assert(child1 == null);
      _ASSERT && common.assert(child2 == null);
      _ASSERT && common.assert(node.height === 0);
      return;
    }

    // _ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
    // _ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);

    const height1 = child1.height;
    const height2 = child2.height;
    const height = 1 + Math.max(height1, height2);
    _ASSERT && common.assert(node.height === height);

    const aabb = new AABB();
    aabb.combine(child1.aabb, child2.aabb);

    _ASSERT && common.assert(AABB.areEqual(aabb, node.aabb));

    this.validateMetrics(child1);
    this.validateMetrics(child2);
  }

  /**
   * Validate this tree. For testing.
   */
  validate(): void {
    this.validateStructure(this.m_root);
    this.validateMetrics(this.m_root);

    _ASSERT && common.assert(this.getHeight() === this.computeHeight());
  }

  /**
   * Get the maximum balance of an node in the tree. The balance is the difference
   * in height of the two children of a node.
   */
  getMaxBalance(): number {
    let maxBalance = 0;
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while (node = it.next()) {
      if (node.height <= 1) {
        continue;
      }

      _ASSERT && common.assert(!node.isLeaf());

      const balance = Math.abs(node.child2.height - node.child1.height);
      maxBalance = Math.max(maxBalance, balance);
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
    while (node = it.next()) {
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
          const b = new AABB();
          b.combine(aabbi, aabbj);
          const cost = b.getPerimeter();
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
      parent.height = 1 + Math.max(child1.height, child2.height);
      parent.aabb.combine(child1.aabb, child2.aabb);
      parent.parent = null;

      child1.parent = parent;
      child2.parent = parent;

      nodes[jMin] = nodes[count - 1];
      nodes[iMin] = parent;
      --count;
    }

    this.m_root = nodes[0];

    this.validate();
  }

  /**
   * Shift the world origin. Useful for large worlds. The shift formula is:
   * position -= newOrigin
   *
   * @param newOrigin The new origin with respect to the old origin
   */
  shiftOrigin(newOrigin: Vec2): void {
    // Build array of leaves. Free the rest.
    let node;
    const it = this.iteratorPool.allocate().preorder(this.m_root);
    while (node = it.next()) {
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
  query(aabb: AABB, queryCallback: DynamicTreeQueryCallback): void {
    _ASSERT && common.assert(typeof queryCallback === 'function');
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
   * @param rayCastCallback A function that is called for each proxy that is hit by the ray.
   */
  rayCast(input: RayCastInput, rayCastCallback: RayCastCallback): void {
    // TODO: GC
    _ASSERT && common.assert(typeof rayCastCallback === 'function');
    const p1 = input.p1;
    const p2 = input.p2;
    const r = Vec2.sub(p2, p1);
    _ASSERT && common.assert(r.lengthSquared() > 0.0);
    r.normalize();

    // v is perpendicular to the segment.
    const v = Vec2.crossNumVec2(1.0, r);
    const abs_v = Vec2.abs(v);

    // Separating axis for segment (Gino, p80).
    // |dot(v, p1 - c)| > dot(|v|, h)

    let maxFraction = input.maxFraction;

    // Build a bounding box for the segment.
    const segmentAABB = new AABB();
    let t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
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
      const separation = Math.abs(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
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
          return;
        }

        if (value > 0.0) {
          // update segment bounding box.
          maxFraction = value;
          t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
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
    release(stack: RayCastInput): void {
    }
  });

  private stackPool: Pool<Array<TreeNode<T>>> = new Pool<Array<TreeNode<T>>>({
    create(): Array<TreeNode<T>> {
      return [];
    },
    release(stack: Array<TreeNode<T>>): void {
      stack.length = 0;
    }
  });

  private iteratorPool: Pool<Iterator<T>> = new Pool<Iterator<T>>({
    create(): Iterator<T> {
      return new Iterator();
    },
    release(iterator: Iterator<T>): void {
      iterator.close();
    }
  });

}

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
