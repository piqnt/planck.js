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

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

var Settings = require('../Settings');
var common = require('../util/common');
var Math = require('../common/Math');
var AABB = require('./AABB');
var DynamicTree = require('./DynamicTree');

module.exports = BroadPhase;

/**
 * The broad-phase wraps and extends a dynamic-tree to keep track of moved
 * objects and query them on update.
 */
function BroadPhase() {
  this.m_tree = new DynamicTree();
  this.m_proxyCount = 0;
  this.m_moveBuffer = [];
  this.queryCallback = this.queryCallback.bind(this);
};

/**
 * Get user data from a proxy. Returns null if the id is invalid.
 */
BroadPhase.prototype.getUserData = function(proxyId) {
  return this.m_tree.getUserData(proxyId);
}

/**
 * Test overlap of fat AABBs.
 */
BroadPhase.prototype.testOverlap = function(proxyIdA, proxyIdB) {
  var aabbA = this.m_tree.getFatAABB(proxyIdA);
  var aabbB = this.m_tree.getFatAABB(proxyIdB);
  return AABB.testOverlap(aabbA, aabbB);
}

/**
 * Get the fat AABB for a proxy.
 */
BroadPhase.prototype.getFatAABB = function(proxyId) {
  return this.m_tree.getFatAABB(proxyId);
}

/**
 * Get the number of proxies.
 */
BroadPhase.prototype.getProxyCount = function() {
  return this.m_proxyCount;
}

/**
 * Get the height of the embedded tree.
 */
BroadPhase.prototype.getTreeHeight = function() {
  return this.m_tree.getHeight();
}

/**
 * Get the balance (integer) of the embedded tree.
 */
BroadPhase.prototype.getTreeBalance = function() {
  return this.m_tree.getMaxBalance();
}

/**
 * Get the quality metric of the embedded tree.
 */
BroadPhase.prototype.getTreeQuality = function() {
  return this.m_tree.getAreaRatio();
}

/**
 * Query an AABB for overlapping proxies. The callback class is called for each
 * proxy that overlaps the supplied AABB.
 */
BroadPhase.prototype.query = function(aabb, queryCallback) {
  this.m_tree.query(aabb, queryCallback);
}

/**
 * Ray-cast against the proxies in the tree. This relies on the callback to
 * perform a exact ray-cast in the case were the proxy contains a shape. The
 * callback also performs the any collision filtering. This has performance
 * roughly equal to k * log(n), where k is the number of collisions and n is the
 * number of proxies in the tree.
 * 
 * @param input The ray-cast input data. The ray extends from p1 to p1 +
 *          maxFraction * (p2 - p1).
 * @param rayCastCallback A function that is called for each proxy that is hit by
 *          the ray.
 */
BroadPhase.prototype.rayCast = function(input, rayCastCallback) {
  this.m_tree.rayCast(input, rayCastCallback);
}

/**
 * Shift the world origin. Useful for large worlds. The shift formula is:
 * position -= newOrigin
 * 
 * @param newOrigin The new origin with respect to the old origin
 */
BroadPhase.prototype.shiftOrigin = function(newOrigin) {
  this.m_tree.shiftOrigin(newOrigin);
}

/**
 * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
 * is called.
 */
BroadPhase.prototype.createProxy = function(aabb, userData) {
  _ASSERT && common.assert(AABB.isValid(aabb));
  var proxyId = this.m_tree.createProxy(aabb, userData);
  this.m_proxyCount++;
  this.bufferMove(proxyId);
  return proxyId;
}

/**
 * Destroy a proxy. It is up to the client to remove any pairs.
 */
BroadPhase.prototype.destroyProxy = function(proxyId) {
  this.unbufferMove(proxyId);
  this.m_proxyCount--;
  this.m_tree.destroyProxy(proxyId);
}

/**
 * Call moveProxy as many times as you like, then when you are done call
 * UpdatePairs to finalized the proxy pairs (for your time step).
 */
BroadPhase.prototype.moveProxy = function(proxyId, aabb, displacement) {
  _ASSERT && common.assert(AABB.isValid(aabb));
  var changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
  if (changed) {
    this.bufferMove(proxyId);
  }
}

/**
 * Call to trigger a re-processing of it's pairs on the next call to
 * UpdatePairs.
 */
BroadPhase.prototype.touchProxy = function(proxyId) {
  this.bufferMove(proxyId);
}

BroadPhase.prototype.bufferMove = function(proxyId) {
  this.m_moveBuffer.push(proxyId);
}

BroadPhase.prototype.unbufferMove = function(proxyId) {
  for (var i = 0; i < this.m_moveBuffer.length; ++i) {
    if (this.m_moveBuffer[i] == proxyId) {
      this.m_moveBuffer[i] = null;
    }
  }
}

/**
 * @function BroadPhase~addPair
 * @param {Object} userDataA
 * @param {Object} userDataB
 */

/**
 * Update the pairs. This results in pair callbacks. This can only add pairs.
 * 
 * @param {BroadPhase~AddPair} addPairCallback
 */
BroadPhase.prototype.updatePairs = function(addPairCallback) {
  _ASSERT && common.assert(typeof addPairCallback === 'function');
  this.m_callback = addPairCallback;

  // Perform tree queries for all moving proxies.
  while (this.m_moveBuffer.length > 0) {
    this.m_queryProxyId = this.m_moveBuffer.pop();
    if (this.m_queryProxyId === null) {
      continue;
    }

    // We have to query the tree with the fat AABB so that
    // we don't fail to create a pair that may touch later.
    var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);

    // Query tree, create pairs and add them pair buffer.
    this.m_tree.query(fatAABB, this.queryCallback);
  }

  // Try to keep the tree balanced.
  // this.m_tree.rebalance(4);
}

BroadPhase.prototype.queryCallback = function(proxyId) {
  // A proxy cannot form a pair with itself.
  if (proxyId == this.m_queryProxyId) {
    return true;
  }

  var proxyIdA = Math.min(proxyId, this.m_queryProxyId);
  var proxyIdB = Math.max(proxyId, this.m_queryProxyId);

  // TODO: Skip any duplicate pairs.

  var userDataA = this.m_tree.getUserData(proxyIdA);
  var userDataB = this.m_tree.getUserData(proxyIdB);

  // Send the pairs back to the client.
  this.m_callback(userDataA, userDataB);

  return true;
}
