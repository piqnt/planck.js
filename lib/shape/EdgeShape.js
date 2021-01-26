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

module.exports = EdgeShape;

var create = require('../util/create');
var options = require('../util/options');
var Settings = require('../Settings');
var Shape = require('../Shape');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Rot = require('../common/Rot');
var Vec2 = require('../common/Vec2');
var AABB = require('../collision/AABB');

EdgeShape._super = Shape;
EdgeShape.prototype = create(EdgeShape._super.prototype);

EdgeShape.TYPE = 'edge';
Shape.TYPES[EdgeShape.TYPE] = EdgeShape;

/**
 * A line segment (edge) shape. These can be connected in chains or loops to
 * other edge shapes. The connectivity information is used to ensure correct
 * contact normals.
 */
function EdgeShape(v1, v2) {
  if (!(this instanceof EdgeShape)) {
    return new EdgeShape(v1, v2);
  }

  EdgeShape._super.call(this);

  this.m_type = EdgeShape.TYPE;
  this.m_radius = Settings.polygonRadius;

  // These are the edge vertices
  this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
  this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();

  // Optional adjacent vertices. These are used for smooth collision.
  // Used by chain shape.
  this.m_vertex0 = Vec2.zero();
  this.m_vertex3 = Vec2.zero();
  this.m_hasVertex0 = false;
  this.m_hasVertex3 = false;
}

EdgeShape.prototype._serialize = function() {
  return {
    type: this.m_type,

    vertex1: this.m_vertex1,
    vertex2: this.m_vertex2,

    vertex0: this.m_vertex0,
    vertex3: this.m_vertex3,
    hasVertex0: this.m_hasVertex0,
    hasVertex3: this.m_hasVertex3,
  };
};

EdgeShape._deserialize = function(data) {
  var shape = new EdgeShape(data.vertex1, data.vertex2);
  if (shape.hasVertex0) {
    shape.setPrev(data.vertex0);
  }
  if (shape.hasVertex3) {
    shape.setNext(data.vertex3);
  }
  return shape;
};

EdgeShape.prototype.setNext = function(v3) {
  if (v3) {
    this.m_vertex3.set(v3);
    this.m_hasVertex3 = true;
  } else {
    this.m_vertex3.setZero();
    this.m_hasVertex3 = false;
  }
  return this;
};

EdgeShape.prototype.setPrev = function(v0) {
  if (v0) {
    this.m_vertex0.set(v0);
    this.m_hasVertex0 = true;
  } else {
    this.m_vertex0.setZero();
    this.m_hasVertex0 = false;
  }
  return this;
};

/**
 * Set this as an isolated edge.
 */
EdgeShape.prototype._set = function(v1, v2) {
  this.m_vertex1.set(v1);
  this.m_vertex2.set(v2);
  this.m_hasVertex0 = false;
  this.m_hasVertex3 = false;
  return this;
}

/**
 * @deprecated
 */
EdgeShape.prototype._clone = function() {
  var clone = new EdgeShape();
  clone.m_type = this.m_type;
  clone.m_radius = this.m_radius;
  clone.m_vertex1.set(this.m_vertex1);
  clone.m_vertex2.set(this.m_vertex2);
  clone.m_vertex0.set(this.m_vertex0);
  clone.m_vertex3.set(this.m_vertex3);
  clone.m_hasVertex0 = this.m_hasVertex0;
  clone.m_hasVertex3 = this.m_hasVertex3;
  return clone;
}

EdgeShape.prototype.getChildCount = function() {
  return 1;
}

EdgeShape.prototype.testPoint = function(xf, p) {
  return false;
}

// p = p1 + t * d
// v = v1 + s * e
// p1 + t * d = v1 + s * e
// s * e - t * d = p1 - v1
EdgeShape.prototype.rayCast = function(output, input, xf, childIndex) {
  // NOT_USED(childIndex);

  // Put the ray into the edge's frame of reference.
  var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
  var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
  var d = Vec2.sub(p2, p1);

  var v1 = this.m_vertex1;
  var v2 = this.m_vertex2;
  var e = Vec2.sub(v2, v1);
  var normal = Vec2.neo(e.y, -e.x);
  normal.normalize();

  // q = p1 + t * d
  // dot(normal, q - v1) = 0
  // dot(normal, p1 - v1) + t * dot(normal, d) = 0
  var numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
  var denominator = Vec2.dot(normal, d);

  if (denominator == 0.0) {
    return false;
  }

  var t = numerator / denominator;
  if (t < 0.0 || input.maxFraction < t) {
    return false;
  }

  var q = Vec2.add(p1, Vec2.mul(t, d));

  // q = v1 + s * r
  // s = dot(q - v1, r) / dot(r, r)
  var r = Vec2.sub(v2, v1);
  var rr = Vec2.dot(r, r);
  if (rr == 0.0) {
    return false;
  }

  var s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
  if (s < 0.0 || 1.0 < s) {
    return false;
  }

  output.fraction = t;
  if (numerator > 0.0) {
    output.normal = Rot.mulVec2(xf.q, normal).neg();
  } else {
    output.normal = Rot.mulVec2(xf.q, normal);
  }
  return true;
}

EdgeShape.prototype.computeAABB = function(aabb, xf, childIndex) {
  var v1 = Transform.mulVec2(xf, this.m_vertex1);
  var v2 = Transform.mulVec2(xf, this.m_vertex2);

  aabb.combinePoints(v1, v2);
  aabb.extend(this.m_radius)
}

EdgeShape.prototype.computeMass = function(massData, density) {
  massData.mass = 0.0;
  massData.center.setCombine(0.5, this.m_vertex1, 0.5, this.m_vertex2);
  massData.I = 0.0;
}

EdgeShape.prototype.computeDistanceProxy = function(proxy) {
  proxy.m_vertices.push(this.m_vertex1);
  proxy.m_vertices.push(this.m_vertex2);
  proxy.m_count = 2;
  proxy.m_radius = this.m_radius;
};
