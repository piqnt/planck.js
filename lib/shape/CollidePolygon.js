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

var fms_v1 = Vec2.zero();
var fms_n = Vec2.zero();
var fms_xf = Transform.identity();
var fms_maxSeparation;
var fms_bestIndex;
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
  var xf = Transform.mulTXf_(xf2, xf1, fms_xf);

  var bestIndex = 0;
  var maxSeparation = -Infinity;
  for (var i = 0; i < count1; ++i) {
    // Get poly1 normal in frame2.
    var n = Rot.mulVec2_(xf.q, n1s[i], fms_n);
    var v1 = Transform.mulVec2_(xf, v1s[i], fms_v1);

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
  fms_maxSeparation = maxSeparation;
  fms_bestIndex = bestIndex;
}


var fie_t1 = Vec2.zero();
var fie_normal1 = Vec2.zero();

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
  var normal1 = Rot.mulTVec2_(xf2.q, Rot.mulVec2_(xf1.q, normals1[edge1], fie_t1), fie_normal1);

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

var cpg_planePoint = Vec2.zero();
var cpg_tangent = Vec2.zero();
var cpg_normal = Vec2.zero();
var cpg_localTangent = Vec2.zero();
var cpg_localNormal = Vec2.zero();
var cpg_v11 = Vec2.zero();
var cpg_v12 = Vec2.zero();
var cpg_t1 = Vec2.zero();
var cpg_clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
var cpg_clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
var cpg_incidentEdge = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
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
  var edgeA = fms_bestIndex;
  var separationA = fms_maxSeparation;
  if (separationA > totalRadius)
    return;

  FindMaxSeparation(polyB, xfB, polyA, xfA);
  var edgeB = fms_bestIndex;
  var separationB = fms_maxSeparation;
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

  var incidentEdge = cpg_incidentEdge;
  cpg_incidentEdge[0].init();
  cpg_incidentEdge[1].init();
  FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);

  var count1 = poly1.m_count;
  var vertices1 = poly1.m_vertices;

  var iv1 = edge1;
  var iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;

  var v11 = cpg_v11.set(vertices1[iv1]);
  var v12 = cpg_v12.set(vertices1[iv2]);

  var localTangent = Vec2.sub_(v12, v11, cpg_localTangent);
  localTangent.normalize();

  var localNormal = Vec2.crossVec2Num_(localTangent, 1.0, cpg_localNormal);
  var planePoint = Vec2.combine_(0.5, v11, 0.5, v12, cpg_planePoint);

  var tangent = Rot.mulVec2_(xf1.q, localTangent, cpg_tangent);
  var normal = Vec2.crossVec2Num_(tangent, 1.0, cpg_normal);

  v11 = Transform.mulVec2_(xf1, v11, v11);
  v12 = Transform.mulVec2_(xf1, v12, v12);

  // Face offset.
  var frontOffset = Vec2.dot(normal, v11);

  // Side offsets, extended by polytope skin thickness.
  var sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
  var sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;

  // Clip incident edge against extruded edge1 side edges.
  cpg_clipPoints1[0].init();
  cpg_clipPoints1[1].init();
  cpg_clipPoints2[0].init();
  cpg_clipPoints2[1].init();
  var clipPoints1 = cpg_clipPoints1;
  var clipPoints2 = cpg_clipPoints2;
  var np;

  // Clip to box side 1
  np = Manifold.clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg_(tangent, cpg_t1), sideOffset1, iv1);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Clip to negative box side 1
  np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  manifold.localNormal.set(localNormal);
  manifold.localPoint.set(planePoint);

  var pointCount = 0;
  for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
    var separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;

    if (separation <= totalRadius) {
      var cp = manifold.points[i]; // ManifoldPoint
      cp.init();
      cp.localPoint.set(Transform.mulTVec2(xf2, clipPoints2[i].v, cpg_t1));
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
