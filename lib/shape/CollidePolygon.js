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

var common = require('../util/common');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Rot = require('../common/Rot');
var Vec2 = require('../common/Vec2');
var AABB = require('../collision/AABB');
var Settings = require('../Settings');
var Manifold = require('../Manifold');
var Contact = require('../Contact');
var Shape = require('../Shape');
var PolygonShape = require('./PolygonShape');

module.exports = CollidePolygons;

Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);

function PolygonContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
  _ASSERT && common.assert(fixtureA.getType() == PolygonShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == PolygonShape.TYPE);
  CollidePolygons(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}

/**
 * Find the max separation between poly1 and poly2 using edge normals from
 * poly1.
 */
function FindMaxSeparation(poly1, xf1, poly2, xf2) {
  var count1 = poly1.m_count;
  var count2 = poly2.m_count;
  var n1s = poly1.m_normals;
  var v1s = poly1.m_vertices;
  var v2s = poly2.m_vertices;
  var xf = Transform.mulTXf(xf2, xf1);

  var bestIndex = 0;
  var maxSeparation = -Infinity;
  for (var i = 0; i < count1; ++i) {
    // Get poly1 normal in frame2.
    var n = Rot.mulVec2(xf.q, n1s[i]);
    var v1 = Transform.mulVec2(xf, v1s[i]);

    // Find deepest point for normal i.
    var si = Infinity;
    for (var j = 0; j < count2; ++j) {
      var sij = Vec2.dot(n, v2s[j]) - Vec2.dot(n, v1);
      if (sij < si) {
        si = sij;
      }
    }

    if (si > maxSeparation) {
      maxSeparation = si;
      bestIndex = i;
    }
  }

  // used to keep last FindMaxSeparation call values
  FindMaxSeparation._maxSeparation = maxSeparation;
  FindMaxSeparation._bestIndex = bestIndex;
}

/**
 * @param {ClipVertex[2]} c
 * @param {int} edge1
 */
function FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
  var normals1 = poly1.m_normals;

  var count2 = poly2.m_count;
  var vertices2 = poly2.m_vertices;
  var normals2 = poly2.m_normals;

  _ASSERT && common.assert(0 <= edge1 && edge1 < poly1.m_count);

  // Get the normal of the reference edge in poly2's frame.
  var normal1 = Rot.mulT(xf2.q, Rot.mulVec2(xf1.q, normals1[edge1]));

  // Find the incident edge on poly2.
  var index = 0;
  var minDot = Infinity;
  for (var i = 0; i < count2; ++i) {
    var dot = Vec2.dot(normal1, normals2[i]);
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }

  // Build the clip vertices for the incident edge.
  var i1 = index;
  var i2 = i1 + 1 < count2 ? i1 + 1 : 0;

  c[0].v = Transform.mulVec2(xf2, vertices2[i1]);
  c[0].id.cf.indexA = edge1;
  c[0].id.cf.indexB = i1;
  c[0].id.cf.typeA = Manifold.e_face;
  c[0].id.cf.typeB = Manifold.e_vertex;

  c[1].v = Transform.mulVec2(xf2, vertices2[i2]);
  c[1].id.cf.indexA = edge1;
  c[1].id.cf.indexB = i2;
  c[1].id.cf.typeA = Manifold.e_face;
  c[1].id.cf.typeB = Manifold.e_vertex;
}

/**
 * 
 * Find edge normal of max separation on A - return if separating axis is found<br>
 * Find edge normal of max separation on B - return if separation axis is found<br>
 * Choose reference edge as min(minA, minB)<br>
 * Find incident edge<br>
 * Clip
 * 
 * The normal points from 1 to 2
 */
function CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
  manifold.pointCount = 0;
  var totalRadius = polyA.m_radius + polyB.m_radius;

  FindMaxSeparation(polyA, xfA, polyB, xfB);
  var edgeA = FindMaxSeparation._bestIndex;
  var separationA = FindMaxSeparation._maxSeparation;
  if (separationA > totalRadius)
    return;

  FindMaxSeparation(polyB, xfB, polyA, xfA);
  var edgeB = FindMaxSeparation._bestIndex;
  var separationB = FindMaxSeparation._maxSeparation;
  if (separationB > totalRadius)
    return;

  var poly1; // reference polygon
  var poly2; // incident polygon
  var xf1;
  var xf2;
  var edge1; // reference edge
  var flip;
  var k_tol = 0.1 * Settings.linearSlop;

  if (separationB > separationA + k_tol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = edgeB;
    manifold.type = Manifold.e_faceB;
    flip = 1;
  } else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = edgeA;
    manifold.type = Manifold.e_faceA;
    flip = 0;
  }

  var incidentEdge = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
  FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);

  var count1 = poly1.m_count;
  var vertices1 = poly1.m_vertices;

  var iv1 = edge1;
  var iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;

  var v11 = vertices1[iv1];
  var v12 = vertices1[iv2];

  var localTangent = Vec2.sub(v12, v11);
  localTangent.normalize();

  var localNormal = Vec2.cross(localTangent, 1.0);
  var planePoint = Vec2.combine(0.5, v11, 0.5, v12);

  var tangent = Rot.mulVec2(xf1.q, localTangent);
  var normal = Vec2.cross(tangent, 1.0);

  v11 = Transform.mulVec2(xf1, v11);
  v12 = Transform.mulVec2(xf1, v12);

  // Face offset.
  var frontOffset = Vec2.dot(normal, v11);

  // Side offsets, extended by polytope skin thickness.
  var sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
  var sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;

  // Clip incident edge against extruded edge1 side edges.
  var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
  var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
  var np;

  // Clip to box side 1
  np = Manifold.clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg(tangent),
      sideOffset1, iv1);

  if (np < 2) {
    return;
  }

  // Clip to negative box side 1
  np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, tangent,
      sideOffset2, iv2);

  if (np < 2) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  manifold.localNormal = localNormal;
  manifold.localPoint = planePoint;

  var pointCount = 0;
  for (var i = 0; i < clipPoints2.length/* maxManifoldPoints */; ++i) {
    var separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;

    if (separation <= totalRadius) {
      var cp = manifold.points[pointCount]; // ManifoldPoint
      cp.localPoint.set(Transform.mulTVec2(xf2, clipPoints2[i].v));
      cp.id = clipPoints2[i].id;
      if (flip) {
        // Swap features
        var cf = cp.id.cf; // ContactFeature
        var indexA = cf.indexA;
        var indexB = cf.indexB;
        var typeA = cf.typeA;
        var typeB = cf.typeB;
        cf.indexA = indexB;
        cf.indexB = indexA;
        cf.typeA = typeB;
        cf.typeB = typeA;
      }
      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
}
