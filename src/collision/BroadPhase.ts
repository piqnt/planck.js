/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2Value } from "../common/Vec2";
import { AABB, AABBValue, RayCastCallback, RayCastInput } from "./AABB";
import { DynamicTree, DynamicTreeQueryCallback } from "./DynamicTree";
import { FixtureProxy } from "../dynamics/Fixture";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_max = Math.max;
/** @internal */ const math_min = Math.min;

/**
 * The broad-phase wraps and extends a dynamic-tree to keep track of moved
 * objects and query them on update.
 */
export class BroadPhase {
  m_tree: DynamicTree<FixtureProxy> = new DynamicTree<FixtureProxy>();
  m_moveBuffer: number[] = [];

  m_callback: (userDataA: any, userDataB: any) => void;
  m_queryProxyId: number;

  /**
   * Get user data from a proxy. Returns null if the id is invalid.
   */
  getUserData(proxyId: number): FixtureProxy {
    return this.m_tree.getUserData(proxyId);
  }

  /**
   * Test overlap of fat AABBs.
   */
  testOverlap(proxyIdA: number, proxyIdB: number): boolean {
    const aabbA = this.m_tree.getFatAABB(proxyIdA);
    const aabbB = this.m_tree.getFatAABB(proxyIdB);
    return AABB.testOverlap(aabbA, aabbB);
  }

  /**
   * Get the fat AABB for a proxy.
   */
  getFatAABB(proxyId: number): AABB {
    return this.m_tree.getFatAABB(proxyId);
  }

  /**
   * Get the number of proxies.
   */
  getProxyCount(): number {
    return this.m_moveBuffer.length;
  }

  /**
   * Get the height of the embedded tree.
   */
  getTreeHeight(): number {
    return this.m_tree.getHeight();
  }

  /**
   * Get the balance (integer) of the embedded tree.
   */
  getTreeBalance(): number {
    return this.m_tree.getMaxBalance();
  }

  /**
   * Get the quality metric of the embedded tree.
   */
  getTreeQuality(): number {
    return this.m_tree.getAreaRatio();
  }

  /**
   * Query an AABB for overlapping proxies. The callback class is called for each
   * proxy that overlaps the supplied AABB.
   */
  query = (aabb: AABBValue, queryCallback: DynamicTreeQueryCallback): void => {
    this.m_tree.query(aabb, queryCallback);
  };

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
    this.m_tree.rayCast(input, rayCastCallback);
  }

  /**
   * Shift the world origin. Useful for large worlds. The shift formula is:
   * position -= newOrigin
   *
   * @param newOrigin The new origin with respect to the old origin
   */
  shiftOrigin(newOrigin: Vec2Value): void {
    this.m_tree.shiftOrigin(newOrigin);
  }

  /**
   * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
   * is called.
   */
  createProxy(aabb: AABBValue, userData: FixtureProxy): number {
    if (_ASSERT) console.assert(AABB.isValid(aabb));
    const proxyId = this.m_tree.createProxy(aabb, userData);
    this.bufferMove(proxyId);
    return proxyId;
  }

  /**
   * Destroy a proxy. It is up to the client to remove any pairs.
   */
  destroyProxy(proxyId: number): void {
    this.unbufferMove(proxyId);
    this.m_tree.destroyProxy(proxyId);
  }

  /**
   * Call moveProxy as many times as you like, then when you are done call
   * UpdatePairs to finalized the proxy pairs (for your time step).
   */
  moveProxy(proxyId: number, aabb: AABB, displacement: Vec2Value): void {
    if (_ASSERT) console.assert(AABB.isValid(aabb));
    const changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
    if (changed) {
      this.bufferMove(proxyId);
    }
  }

  /**
   * Call to trigger a re-processing of it's pairs on the next call to
   * UpdatePairs.
   */
  touchProxy(proxyId: number): void {
    this.bufferMove(proxyId);
  }

  bufferMove(proxyId: number): void {
    this.m_moveBuffer.push(proxyId);
  }

  unbufferMove(proxyId: number): void {
    for (let i = 0; i < this.m_moveBuffer.length; ++i) {
      if (this.m_moveBuffer[i] === proxyId) {
        this.m_moveBuffer[i] = null;
      }
    }
  }

  /**
   * Update the pairs. This results in pair callbacks. This can only add pairs.
   */
  updatePairs(addPairCallback: (userDataA: FixtureProxy, userDataB: FixtureProxy) => void): void {
    if (_ASSERT) console.assert(typeof addPairCallback === "function");
    this.m_callback = addPairCallback;

    // Perform tree queries for all moving proxies.
    while (this.m_moveBuffer.length > 0) {
      this.m_queryProxyId = this.m_moveBuffer.pop();
      if (this.m_queryProxyId === null) {
        continue;
      }

      // We have to query the tree with the fat AABB so that
      // we don't fail to create a pair that may touch later.
      const fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);

      // Query tree, create pairs and add them pair buffer.
      this.m_tree.query(fatAABB, this.queryCallback);
    }

    // Try to keep the tree balanced.
    // this.m_tree.rebalance(4);
  }

  queryCallback = (proxyId: number): boolean => {
    // A proxy cannot form a pair with itself.
    if (proxyId === this.m_queryProxyId) {
      return true;
    }

    const proxyIdA = math_min(proxyId, this.m_queryProxyId);
    const proxyIdB = math_max(proxyId, this.m_queryProxyId);

    // TODO: Skip any duplicate pairs.

    const userDataA = this.m_tree.getUserData(proxyIdA);
    const userDataB = this.m_tree.getUserData(proxyIdB);

    // Send the pairs back to the client.
    this.m_callback(userDataA, userDataB);

    return true;
  };
}
