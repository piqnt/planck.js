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

module.exports = PolygonShape;

var common = require('../util/common');
var create = require('../util/create');
var options = require('../util/options');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Rot = require('../common/Rot');
var Vec2 = require('../common/Vec2');
var AABB = require('../collision/AABB');
var Settings = require('../Settings');
var Shape = require('../Shape');

PolygonShape._super = Shape;
PolygonShape.prototype = create(PolygonShape._super.prototype);

PolygonShape.TYPE = 'polygon';
Shape.TYPES[PolygonShape.TYPE] = PolygonShape;

/**
 * A convex polygon. It is assumed that the interior of the polygon is to the
 * left of each edge. Polygons have a maximum number of vertices equal to
 * Settings.maxPolygonVertices. In most cases you should not need many vertices
 * for a convex polygon. extends Shape
 */
function PolygonShape(vertices) {
  if (!(this instanceof PolygonShape)) {
    return new PolygonShape(vertices);
  }

  PolygonShape._super.call(this);

  this.m_type = PolygonShape.TYPE;
  this.m_radius = Settings.polygonRadius;
  this.m_centroid = Vec2.zero();
  this.m_vertices = []; // Vec2[Settings.maxPolygonVertices]
  this.m_normals = []; // Vec2[Settings.maxPolygonVertices]
  this.m_count = 0;

  if (vertices && vertices.length) {
    this._set(vertices);
  }
}

PolygonShape.prototype._serialize = function() {
  return {
    type: this.m_type,

    vertices: this.m_vertices,
  };
};

PolygonShape._deserialize = function(data, fixture, restore) {
  var vertices = data.vertices && data.vertices.map(v => Vec2._deserialize(v));
  var shape = new PolygonShape(vertices);
  return shape;
};

PolygonShape.prototype.getVertex = function(index) {
  _ASSERT && common.assert(0 <= index && index < this.m_count);
  return this.m_vertices[index];
}

/**
 * @deprecated
 */
PolygonShape.prototype._clone = function() {
  var clone = new PolygonShape();
  clone.m_type = this.m_type;
  clone.m_radius = this.m_radius;
  clone.m_count = this.m_count;
  clone.m_centroid.set(this.m_centroid);
  for (var i = 0; i < this.m_count; i++) {
    clone.m_vertices.push(this.m_vertices[i].clone());
  }
  for (var i = 0; i < this.m_normals.length; i++) {
    clone.m_normals.push(this.m_normals[i].clone());
  }
  return clone;
}

PolygonShape.prototype.getChildCount = function() {
  return 1;
}

function ComputeCentroid(vs, count) {
  _ASSERT && common.assert(count >= 3);

  var c = Vec2.zero();
  var area = 0.0;

  // pRef is the reference point for forming triangles.
  // It's location doesn't change the result (except for rounding error).
  var pRef = Vec2.zero();
  if (false) {
    // This code would put the reference point inside the polygon.
    for (var i = 0; i < count; ++i) {
      pRef.add(vs[i]);
    }
    pRef.mul(1.0 / count);
  }

  var inv3 = 1.0 / 3.0;

  for (var i = 0; i < count; ++i) {
    // Triangle vertices.
    var p1 = pRef;
    var p2 = vs[i];
    var p3 = i + 1 < count ? vs[i + 1] : vs[0];

    var e1 = Vec2.sub(p2, p1);
    var e2 = Vec2.sub(p3, p1);

    var D = Vec2.cross(e1, e2);

    var triangleArea = 0.5 * D;
    area += triangleArea;

    // Area weighted centroid
    c.addMul(triangleArea * inv3, p1);
    c.addMul(triangleArea * inv3, p2);
    c.addMul(triangleArea * inv3, p3);
  }

  // Centroid
  _ASSERT && common.assert(area > Math.EPSILON);
  c.mul(1.0 / area);
  return c;
}

PolygonShape.prototype._reset = function() {
  this._set(this.m_vertices)
}

/**
 * @private
 *
 * Create a convex hull from the given array of local points. The count must be
 * in the range [3, Settings.maxPolygonVertices].
 *
 * Warning: the points may be re-ordered, even if they form a convex polygon
 * Warning: collinear points are handled but not removed. Collinear points may
 * lead to poor stacking behavior.
 */
PolygonShape.prototype._set = function(vertices) {
  _ASSERT && common.assert(3 <= vertices.length && vertices.length <= Settings.maxPolygonVertices);
  if (vertices.length < 3) {
    this._setAsBox(1.0, 1.0);
    return;
  }

  var n = Math.min(vertices.length, Settings.maxPolygonVertices);

  // Perform welding and copy vertices into local buffer.
  var ps = []; // [Settings.maxPolygonVertices];
  for (var i = 0; i < n; ++i) {
    var v = vertices[i];

    var unique = true;
    for (var j = 0; j < ps.length; ++j) {
      if (Vec2.distanceSquared(v, ps[j]) < 0.25 * Settings.linearSlopSquared) {
        unique = false;
        break;
      }
    }

    if (unique) {
      ps.push(v);
    }
  }

  n = ps.length;
  if (n < 3) {
    // Polygon is degenerate.
    _ASSERT && common.assert(false);
    this._setAsBox(1.0, 1.0);
    return;
  }

  // Create the convex hull using the Gift wrapping algorithm
  // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm

  // Find the right most point on the hull (in case of multiple points bottom most is used)
  var i0 = 0;
  var x0 = ps[0].x;
  for (var i = 1; i < n; ++i) {
    var x = ps[i].x;
    if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
      i0 = i;
      x0 = x;
    }
  }

  var hull = []; // [Settings.maxPolygonVertices];
  var m = 0;
  var ih = i0;

  for (;;) {
    hull[m] = ih;

    var ie = 0;
    for (var j = 1; j < n; ++j) {
      if (ie === ih) {
        ie = j;
        continue;
      }

      var r = Vec2.sub(ps[ie], ps[hull[m]]);
      var v = Vec2.sub(ps[j], ps[hull[m]]);
      var c = Vec2.cross(r, v);
      // c < 0 means counter-clockwise wrapping, c > 0 means clockwise wrapping
      if (c < 0.0) {
        ie = j;
      }

      // Collinearity check
      if (c === 0.0 && v.lengthSquared() > r.lengthSquared()) {
        ie = j;
      }
    }

    ++m;
    ih = ie;

    if (ie === i0) {
      break;
    }
  }

  if (m < 3) {
    // Polygon is degenerate.
    _ASSERT && common.assert(false);
    this._setAsBox(1.0, 1.0);
    return;
  }

  this.m_count = m;

  // Copy vertices.
  this.m_vertices = [];
  for (var i = 0; i < m; ++i) {
    this.m_vertices[i] = ps[hull[i]];
  }

  // Compute normals. Ensure the edges have non-zero length.
  for (var i = 0; i < m; ++i) {
    var i1 = i;
    var i2 = i + 1 < m ? i + 1 : 0;
    var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
    _ASSERT && common.assert(edge.lengthSquared() > Math.EPSILON * Math.EPSILON);
    this.m_normals[i] = Vec2.cross(edge, 1.0);
    this.m_normals[i].normalize();
  }

  // Compute the polygon centroid.
  this.m_centroid = ComputeCentroid(this.m_vertices, m);
}

/**
 * @private
 */
PolygonShape.prototype._setAsBox = function(hx, hy, center, angle) {
  // start with right-bottom, counter-clockwise, as in Gift wrapping algorithm in PolygonShape._set()
  this.m_vertices[0] = Vec2.neo(hx, -hy);
  this.m_vertices[1] = Vec2.neo(hx, hy);
  this.m_vertices[2] = Vec2.neo(-hx, hy);
  this.m_vertices[3] = Vec2.neo(-hx, -hy);

  this.m_normals[0] = Vec2.neo(1.0, 0.0);
  this.m_normals[1] = Vec2.neo(0.0, 1.0);
  this.m_normals[2] = Vec2.neo(-1.0, 0.0);
  this.m_normals[3] = Vec2.neo(0.0, -1.0);

  this.m_count = 4;

  if (Vec2.isValid(center)) {
    angle = angle || 0;

    this.m_centroid.set(center);

    var xf = Transform.identity();
    xf.p.set(center);
    xf.q.set(angle);

    // Transform vertices and normals.
    for (var i = 0; i < this.m_count; ++i) {
      this.m_vertices[i] = Transform.mulVec2(xf, this.m_vertices[i]);
      this.m_normals[i] = Rot.mulVec2(xf.q, this.m_normals[i]);
    }
  }
}

PolygonShape.prototype.testPoint = function(xf, p) {
  var pLocal = Rot.mulTVec2(xf.q, Vec2.sub(p, xf.p));

  for (var i = 0; i < this.m_count; ++i) {
    var dot = Vec2.dot(this.m_normals[i], Vec2.sub(pLocal, this.m_vertices[i]));
    if (dot > 0.0) {
      return false;
    }
  }

  return true;
}

PolygonShape.prototype.rayCast = function(output, input, xf, childIndex) {

  // Put the ray into the polygon's frame of reference.
  var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
  var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
  var d = Vec2.sub(p2, p1);

  var lower = 0.0;
  var upper = input.maxFraction;

  var index = -1;

  for (var i = 0; i < this.m_count; ++i) {
    // p = p1 + a * d
    // dot(normal, p - v) = 0
    // dot(normal, p1 - v) + a * dot(normal, d) = 0
    var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
    var denominator = Vec2.dot(this.m_normals[i], d);

    if (denominator == 0.0) {
      if (numerator < 0.0) {
        return false;
      }
    } else {
      // Note: we want this predicate without division:
      // lower < numerator / denominator, where denominator < 0
      // Since denominator < 0, we have to flip the inequality:
      // lower < numerator / denominator <==> denominator * lower > numerator.
      if (denominator < 0.0 && numerator < lower * denominator) {
        // Increase lower.
        // The segment enters this half-space.
        lower = numerator / denominator;
        index = i;
      } else if (denominator > 0.0 && numerator < upper * denominator) {
        // Decrease upper.
        // The segment exits this half-space.
        upper = numerator / denominator;
      }
    }

    // The use of epsilon here causes the assert on lower to trip
    // in some cases. Apparently the use of epsilon was to make edge
    // shapes work, but now those are handled separately.
    // if (upper < lower - Math.EPSILON)
    if (upper < lower) {
      return false;
    }
  }

  _ASSERT && common.assert(0.0 <= lower && lower <= input.maxFraction);

  if (index >= 0) {
    output.fraction = lower;
    output.normal = Rot.mulVec2(xf.q, this.m_normals[index]);
    return true;
  }

  return false;
};

PolygonShape.prototype.computeAABB = function(aabb, xf, childIndex) {
  var minX = Infinity, minY = Infinity;
  var maxX = -Infinity, maxY = -Infinity;
  for (var i = 0; i < this.m_count; ++i) {
    var v = Transform.mulVec2(xf, this.m_vertices[i]);
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
  }

  aabb.lowerBound.set(minX, minY);
  aabb.upperBound.set(maxX, maxY);
  aabb.extend(this.m_radius);
}

PolygonShape.prototype.computeMass = function(massData, density) {
  // Polygon mass, centroid, and inertia.
  // Let rho be the polygon density in mass per unit area.
  // Then:
  // mass = rho * int(dA)
  // centroid.x = (1/mass) * rho * int(x * dA)
  // centroid.y = (1/mass) * rho * int(y * dA)
  // I = rho * int((x*x + y*y) * dA)
  //
  // We can compute these integrals by summing all the integrals
  // for each triangle of the polygon. To evaluate the integral
  // for a single triangle, we make a change of variables to
  // the (u,v) coordinates of the triangle:
  // x = x0 + e1x * u + e2x * v
  // y = y0 + e1y * u + e2y * v
  // where 0 <= u && 0 <= v && u + v <= 1.
  //
  // We integrate u from [0,1-v] and then v from [0,1].
  // We also need to use the Jacobian of the transformation:
  // D = cross(e1, e2)
  //
  // Simplification: triangle centroid = (1/3) * (p1 + p2 + p3)
  //
  // The rest of the derivation is handled by computer algebra.

  _ASSERT && common.assert(this.m_count >= 3);

  var center = Vec2.zero();
  var area = 0.0;
  var I = 0.0;

  // s is the reference point for forming triangles.
  // It's location doesn't change the result (except for rounding error).
  var s = Vec2.zero();

  // This code would put the reference point inside the polygon.
  for (var i = 0; i < this.m_count; ++i) {
    s.add(this.m_vertices[i]);
  }
  s.mul(1.0 / this.m_count);

  var k_inv3 = 1.0 / 3.0;

  for (var i = 0; i < this.m_count; ++i) {
    // Triangle vertices.
    var e1 = Vec2.sub(this.m_vertices[i], s);
    var e2 = i + 1 < this.m_count ? Vec2.sub(this.m_vertices[i + 1], s) : Vec2
        .sub(this.m_vertices[0], s);

    var D = Vec2.cross(e1, e2);

    var triangleArea = 0.5 * D;
    area += triangleArea;

    // Area weighted centroid
    center.addCombine(triangleArea * k_inv3, e1, triangleArea * k_inv3, e2);

    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;

    var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
    var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;

    I += (0.25 * k_inv3 * D) * (intx2 + inty2);
  }

  // Total mass
  massData.mass = density * area;

  // Center of mass
  _ASSERT && common.assert(area > Math.EPSILON);
  center.mul(1.0 / area);
  massData.center.setCombine(1, center, 1, s);

  // Inertia tensor relative to the local origin (point s).
  massData.I = density * I;

  // Shift to center of mass then to original body origin.
  massData.I += massData.mass
      * (Vec2.dot(massData.center, massData.center) - Vec2.dot(center, center));
}

// Validate convexity. This is a very time consuming operation.
// @returns true if valid
PolygonShape.prototype.validate = function() {
  for (var i = 0; i < this.m_count; ++i) {
    var i1 = i;
    var i2 = i < this.m_count - 1 ? i1 + 1 : 0;
    var p = this.m_vertices[i1];
    var e = Vec2.sub(this.m_vertices[i2], p);

    for (var j = 0; j < this.m_count; ++j) {
      if (j == i1 || j == i2) {
        continue;
      }

      var v = Vec2.sub(this.m_vertices[j], p);
      var c = Vec2.cross(e, v);
      if (c < 0.0) {
        return false;
      }
    }
  }

  return true;
}

PolygonShape.prototype.computeDistanceProxy = function(proxy) {
  proxy.m_vertices = this.m_vertices;
  proxy.m_count = this.m_count;
  proxy.m_radius = this.m_radius;
};
