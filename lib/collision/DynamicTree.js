/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

var Settings = require('../Settings');
var common = require('../util/common');
var Pool = require('../util/Pool');
var Vec2 = require('../common/Vec2');
var Math = require('../common/Math');
var AABB = require('./AABB');

module.exports = DynamicTree;

/**
 * A node in the dynamic tree. The client does not interact with this directly.
 * 
 * @prop {AABB} aabb Enlarged AABB
 * @prop {integer} height 0: leaf, -1: free node
 */
function TreeNode(id) {
  this.id = id;
  this.aabb = new AABB();
  this.userData = null;
  this.parent = null;
  this.child1 = null;
  this.child2 = null;
  this.height = -1;

  this.toString = function() {
    return this.id + ": " + this.userData;
  }
};

TreeNode.prototype.isLeaf = function() {
  return this.child1 == null;
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
function DynamicTree() {
  this.m_root = null;
  this.m_nodes = {}
  this.m_lastProxyId = 0;

  this.m_pool = new Pool({
    create : function() {
      return new TreeNode();
    }
  });
};

/**
 * Get proxy user data.
 * 
 * @return the proxy user data or 0 if the id is invalid.
 */
DynamicTree.prototype.getUserData = function(id) {
  var node = this.m_nodes[id];
  _ASSERT && common.assert(!!node);
  return node.userData;
}

/**
 * Get the fat AABB for a node id.
 * 
 * @return the proxy user data or 0 if the id is invalid.
 */
DynamicTree.prototype.getFatAABB = function(id) {
  var node = this.m_nodes[id];
  _ASSERT && common.assert(!!node);
  return node.aabb;
}

DynamicTree.prototype.allocateNode = function() {
  var node = this.m_pool.allocate();
  node.id = ++this.m_lastProxyId;
  node.userData = null;
  node.parent = null;
  node.child1 = null;
  node.child2 = null;
  node.height = -1;
  this.m_nodes[node.id] = node;
  return node;
}

DynamicTree.prototype.freeNode = function(node) {
  this.m_pool.release(node);
  node.height = -1;
  delete this.m_nodes[node.id];
}

/**
 * Create a proxy in the tree as a leaf node. We return the index of the node
 * instead of a pointer so that we can grow the node pool.
 * 
 * Create a proxy. Provide a tight fitting AABB and a userData pointer.
 */
DynamicTree.prototype.createProxy = function(aabb, userData) {
  _ASSERT && common.assert(AABB.isValid(aabb))

  var node = this.allocateNode()

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
DynamicTree.prototype.destroyProxy = function(id) {
  var node = this.m_nodes[id];

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
 * @param id
 * @param aabb
 * @param {Vec2} d Displacement
 * 
 * @return true if the proxy was re-inserted.
 */
DynamicTree.prototype.moveProxy = function(id, aabb, d) {
  _ASSERT && common.assert(AABB.isValid(aabb));
  _ASSERT && common.assert(!d || Vec2.isValid(d));

  var node = this.m_nodes[id];

  _ASSERT && common.assert(!!node);
  _ASSERT && common.assert(node.isLeaf());

  if (node.aabb.contains(aabb)) {
    return false;
  }

  this.removeLeaf(node);

  node.aabb.set(aabb)

  // Extend AABB.
  aabb = node.aabb;
  AABB.extend(aabb, Settings.aabbExtension);

  // Predict AABB displacement.
  // var d = Vec2.mul(Settings.aabbMultiplier, displacement);

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

DynamicTree.prototype.insertLeaf = function(leaf) {
  _ASSERT && common.assert(AABB.isValid(leaf.aabb));

  if (this.m_root == null) {
    this.m_root = leaf;
    this.m_root.parent = null;
    return;
  }

  // Find the best sibling for this node
  var leafAABB = leaf.aabb;
  var index = this.m_root;
  while (index.isLeaf() == false) {
    var child1 = index.child1;
    var child2 = index.child2;

    var area = index.aabb.getPerimeter();

    var combinedAABB = new AABB();
    combinedAABB.combine(index.aabb, leafAABB);
    var combinedArea = combinedAABB.getPerimeter();

    // Cost of creating a new parent for this node and the new leaf
    var cost = 2.0 * combinedArea;

    // Minimum cost of pushing the leaf further down the tree
    var inheritanceCost = 2.0 * (combinedArea - area);

    // Cost of descending into child1
    var cost1;
    if (child1.isLeaf()) {
      var aabb = new AABB();
      aabb.combine(leafAABB, child1.aabb);
      cost1 = aabb.getPerimeter() + inheritanceCost;
    } else {
      var aabb = new AABB();
      aabb.combine(leafAABB, child1.aabb);
      var oldArea = child1.aabb.getPerimeter();
      var newArea = aabb.getPerimeter();
      cost1 = (newArea - oldArea) + inheritanceCost;
    }

    // Cost of descending into child2
    var cost2;
    if (child2.isLeaf()) {
      var aabb = new AABB();
      aabb.combine(leafAABB, child2.aabb);
      cost2 = aabb.getPerimeter() + inheritanceCost;
    } else {
      var aabb = new AABB();
      aabb.combine(leafAABB, child2.aabb);
      var oldArea = child2.aabb.getPerimeter();
      var newArea = aabb.getPerimeter();
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

  var sibling = index;

  // Create a new parent.
  var oldParent = sibling.parent;
  var newParent = this.allocateNode();
  newParent.parent = oldParent;
  newParent.userData = null;
  newParent.aabb.combine(leafAABB, sibling.aabb);
  newParent.height = sibling.height + 1;

  if (oldParent != null) {
    // The sibling was not the root.
    if (oldParent.child1 == sibling) {
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

    var child1 = index.child1;
    var child2 = index.child2;

    _ASSERT && common.assert(child1 != null);
    _ASSERT && common.assert(child2 != null);

    index.height = 1 + Math.max(child1.height, child2.height);
    index.aabb.combine(child1.aabb, child2.aabb);

    index = index.parent;
  }

  // validate();
}

DynamicTree.prototype.removeLeaf = function(leaf) {
  if (leaf == this.m_root) {
    this.m_root = null;
    return;
  }

  var parent = leaf.parent;
  var grandParent = parent.parent;
  var sibling;
  if (parent.child1 == leaf) {
    sibling = parent.child2;
  } else {
    sibling = parent.child1;
  }

  if (grandParent != null) {
    // Destroy parent and connect sibling to grandParent.
    if (grandParent.child1 == parent) {
      grandParent.child1 = sibling;
    } else {
      grandParent.child2 = sibling;
    }
    sibling.parent = grandParent;
    this.freeNode(parent);

    // Adjust ancestor bounds.
    var index = grandParent;
    while (index != null) {
      index = this.balance(index);

      var child1 = index.child1;
      var child2 = index.child2;

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
DynamicTree.prototype.balance = function(iA) {
  _ASSERT && common.assert(iA != null);

  var A = iA;
  if (A.isLeaf() || A.height < 2) {
    return iA;
  }

  var B = A.child1;
  var C = A.child2;

  var balance = C.height - B.height;

  // Rotate C up
  if (balance > 1) {
    var F = C.child1;
    var G = C.child2;

    // Swap A and C
    C.child1 = A;
    C.parent = A.parent;
    A.parent = C;

    // A's old parent should point to C
    if (C.parent != null) {
      if (C.parent.child1 == iA) {
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
    var D = B.child1;
    var E = B.child2;

    // Swap A and B
    B.child1 = A;
    B.parent = A.parent;
    A.parent = B;

    // A's old parent should point to B
    if (B.parent != null) {
      if (B.parent.child1 == A) {
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
DynamicTree.prototype.getHeight = function() {
  if (this.m_root == null) {
    return 0;
  }

  return this.m_root.height;
}

/**
 * Get the ratio of the sum of the node areas to the root area.
 */
DynamicTree.prototype.getAreaRatio = function() {
  if (this.m_root == null) {
    return 0.0;
  }

  var root = this.m_root;
  var rootArea = root.aabb.getPerimeter();

  var totalArea = 0.0;
  var node, it = iteratorPool.allocate().preorder(this.m_root);
  while (node = it.next()) {
    if (node.height < 0) {
      // Free node in pool
      continue;
    }

    totalArea += node.aabb.getPerimeter();
  }

  iteratorPool.release(it);

  return totalArea / rootArea;
}

/**
 * Compute the height of a sub-tree.
 */
DynamicTree.prototype.computeHeight = function(id) {
  var node;
  if (typeof id !== 'undefined') {
    node = this.m_nodes[id];
  } else {
    node = this.m_root;
  }

  // _ASSERT && common.assert(0 <= id && id < this.m_nodeCapacity);

  if (node.isLeaf()) {
    return 0;
  }

  var height1 = this.computeHeight(node.child1.id);
  var height2 = this.computeHeight(node.child2.id);
  return 1 + Math.max(height1, height2);
}

DynamicTree.prototype.validateStructure = function(node) {
  if (node == null) {
    return;
  }

  if (node == this.m_root) {
    _ASSERT && common.assert(node.parent == null);
  }

  var child1 = node.child1;
  var child2 = node.child2;

  if (node.isLeaf()) {
    _ASSERT && common.assert(child1 == null);
    _ASSERT && common.assert(child2 == null);
    _ASSERT && common.assert(node.height == 0);
    return;
  }

  // _ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
  // _ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);

  _ASSERT && common.assert(child1.parent == node);
  _ASSERT && common.assert(child2.parent == node);

  this.validateStructure(child1);
  this.validateStructure(child2);
}

DynamicTree.prototype.validateMetrics = function(node) {
  if (node == null) {
    return;
  }

  var child1 = node.child1;
  var child2 = node.child2;

  if (node.isLeaf()) {
    _ASSERT && common.assert(child1 == null);
    _ASSERT && common.assert(child2 == null);
    _ASSERT && common.assert(node.height == 0);
    return;
  }

  // _ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
  // _ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);

  var height1 = child1.height;
  var height2 = child2.height;
  var height = 1 + Math.max(height1, height2);
  _ASSERT && common.assert(node.height == height);

  var aabb = new AABB();
  aabb.combine(child1.aabb, child2.aabb);

  _ASSERT && common.assert(AABB.areEqual(aabb, node.aabb));

  this.validateMetrics(child1);
  this.validateMetrics(child2);
}

// Validate this tree. For testing.
DynamicTree.prototype.validate = function() {
  this.validateStructure(this.m_root);
  this.validateMetrics(this.m_root);

  _ASSERT && common.assert(this.getHeight() == this.computeHeight());
}

/**
 * Get the maximum balance of an node in the tree. The balance is the difference
 * in height of the two children of a node.
 */
DynamicTree.prototype.getMaxBalance = function() {
  var maxBalance = 0;
  var node, it = iteratorPool.allocate().preorder(this.m_root);
  while (node = it.next()) {
    if (node.height <= 1) {
      continue;
    }

    _ASSERT && common.assert(node.isLeaf() == false);

    var balance = Math.abs(node.child2.height - node.child1.height);
    maxBalance = Math.max(maxBalance, balance);
  }
  iteratorPool.release(it);

  return maxBalance;
}

/**
 * Build an optimal tree. Very expensive. For testing.
 */
DynamicTree.prototype.rebuildBottomUp = function() {
  var nodes = [];
  var count = 0;

  // Build array of leaves. Free the rest.
  var node, it = iteratorPool.allocate().preorder(this.m_root);
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
  iteratorPool.release(it);

  while (count > 1) {
    var minCost = Infinity;
    var iMin = -1, jMin = -1;
    for (var i = 0; i < count; ++i) {
      var aabbi = nodes[i].aabb;
      for (var j = i + 1; j < count; ++j) {
        var aabbj = nodes[j].aabb;
        var b = new AABB();
        b.combine(aabbi, aabbj);
        var cost = b.getPerimeter();
        if (cost < minCost) {
          iMin = i;
          jMin = j;
          minCost = cost;
        }
      }
    }

    var child1 = nodes[iMin];
    var child2 = nodes[jMin];

    var parent = this.allocateNode();
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
DynamicTree.prototype.shiftOrigin = function(newOrigin) {
  // Build array of leaves. Free the rest.
  var node, it = iteratorPool.allocate().preorder(this.m_root);
  while (node = it.next()) {
    var aabb = node.aabb;
    aabb.lowerBound.x -= newOrigin.x;
    aabb.lowerBound.y -= newOrigin.y;
    aabb.upperBound.x -= newOrigin.x;
    aabb.upperBound.y -= newOrigin.y;
  }
  iteratorPool.release(it);
}

/**
 * @function {DynamicTree~queryCallback}
 * 
 * @param id Node id.
 */

/**
 * Query an AABB for overlapping proxies. The callback class is called for each
 * proxy that overlaps the supplied AABB.
 * 
 * @param {DynamicTree~queryCallback} queryCallback
 */
DynamicTree.prototype.query = function(aabb, queryCallback) {
  _ASSERT && common.assert(typeof queryCallback === 'function')
  var stack = stackPool.allocate();

  stack.push(this.m_root);
  while (stack.length > 0) {
    var node = stack.pop();
    if (node == null) {
      continue;
    }

    if (AABB.testOverlap(node.aabb, aabb)) {
      if (node.isLeaf()) {
        var proceed = queryCallback(node.id);
        if (proceed == false) {
          return;
        }
      } else {
        stack.push(node.child1);
        stack.push(node.child2);
      }
    }
  }

  stackPool.release(stack);
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
DynamicTree.prototype.rayCast = function(input, rayCastCallback) { // TODO GC
  _ASSERT && common.assert(typeof rayCastCallback === 'function')
  var p1 = input.p1;
  var p2 = input.p2;
  var r = Vec2.sub(p2, p1);
  _ASSERT && common.assert(r.lengthSquared() > 0.0);
  r.normalize();

  // v is perpendicular to the segment.
  var v = Vec2.cross(1.0, r);
  var abs_v = Vec2.abs(v);

  // Separating axis for segment (Gino, p80).
  // |dot(v, p1 - c)| > dot(|v|, h)

  var maxFraction = input.maxFraction;

  // Build a bounding box for the segment.
  var segmentAABB = new AABB();
  var t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
  segmentAABB.combinePoints(p1, t);

  var stack = stackPool.allocate();
  var subInput = inputPool.allocate();

  stack.push(this.m_root);
  while (stack.length > 0) {
    var node = stack.pop();
    if (node == null) {
      continue;
    }

    if (AABB.testOverlap(node.aabb, segmentAABB) == false) {
      continue;
    }

    // Separating axis for segment (Gino, p80).
    // |dot(v, p1 - c)| > dot(|v|, h)
    var c = node.aabb.getCenter();
    var h = node.aabb.getExtents();
    var separation = Math.abs(Vec2.dot(v, Vec2.sub(p1, c)))
        - Vec2.dot(abs_v, h);
    if (separation > 0.0) {
      continue;
    }

    if (node.isLeaf()) {
      subInput.p1 = Vec2.clone(input.p1);
      subInput.p2 = Vec2.clone(input.p2);
      subInput.maxFraction = maxFraction;

      var value = rayCastCallback(subInput, node.id);

      if (value == 0.0) {
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

  stackPool.release(stack);
  inputPool.release(subInput);
}

var inputPool = new Pool({
  create : function() {
    return {};
  },
  release : function(stack) {
  }
});

var stackPool = new Pool({
  create : function() {
    return [];
  },
  release : function(stack) {
    stack.length = 0;
  }
});

var iteratorPool = new Pool({
  create : function() {
    return new Iterator();
  },
  release : function(iterator) {
    iterator.close();
  }
});

function Iterator() {
  var parents = [];
  var states = [];
  return {
    preorder : function(root) {
      parents.length = 0;
      parents.push(root);
      states.length = 0;
      states.push(0);
      return this;
    },
    next : function() {
      while (parents.length > 0) {
        var i = parents.length - 1;
        var node = parents[i];
        if (states[i] === 0) {
          states[i] = 1;
          return node;
        }
        if (states[i] === 1) {
          states[i] = 2;
          if (node.child1) {
            parents.push(node.child1);
            states.push(1);
            return node.child1;
          }
        }
        if (states[i] === 2) {
          states[i] = 3;
          if (node.child2) {
            parents.push(node.child2);
            states.push(1);
            return node.child2;
          }
        }
        parents.pop();
        states.pop();
      }
    },
    close : function() {
      parents.length = 0;
    }
  };
}
