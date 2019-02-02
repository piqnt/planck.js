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
var create = require('../util/create');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Vec2 = require('../common/Vec2');
var Rot = require('../common/Rot');
var Settings = require('../Settings');
var Shape = require('../Shape');
var Contact = require('../Contact');
var Manifold = require('../Manifold');
var EdgeShape = require('./EdgeShape');
var ChainShape = require('./ChainShape');
var PolygonShape = require('./PolygonShape');

Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);

function EdgePolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
  _ASSERT && common.assert(fA.getType() == EdgeShape.TYPE);
  _ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);

  CollideEdgePolygon(manifold, fA.getShape(), xfA, fB.getShape(), xfB);
}

function ChainPolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
  _ASSERT && common.assert(fA.getType() == ChainShape.TYPE);
  _ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);

  var chain = fA.getShape();
  var edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);

  CollideEdgePolygon(manifold, edge, xfA, fB.getShape(), xfB);
}

// EPAxis Type
var e_unknown = -1;
var e_edgeA = 1;
var e_edgeB = 2;

// VertexType unused?
var e_isolated = 0;
var e_concave = 1;
var e_convex = 2;

// This structure is used to keep track of the best separating axis.
function EPAxis() {
  this.type; // Type
  this.index;
  this.separation;
};

// This holds polygon B expressed in frame A.
function TempPolygon() {
  this.vertices = []; // Vec2[Settings.maxPolygonVertices]
  this.normals = []; // Vec2[Settings.maxPolygonVertices];
  this.count = 0;
};

// Reference face used for clipping
function ReferenceFace() {
  this.i1, this.i2; // int
  this.v1, this.v2; // v
  this.normal = Vec2.zero();
  this.sideNormal1 = Vec2.zero();
  this.sideOffset1; // float
  this.sideNormal2 = Vec2.zero();
  this.sideOffset2; // float
};

// reused
var edgeAxis = new EPAxis();
var polygonAxis = new EPAxis();
var polygonBA = new TempPolygon();
var rf = new ReferenceFace();

/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
function CollideEdgePolygon(manifold, edgeA, xfA, polygonB, xfB) {
  // Algorithm:
  // 1. Classify v1 and v2
  // 2. Classify polygon centroid as front or back
  // 3. Flip normal if necessary
  // 4. Initialize normal range to [-pi, pi] about face normal
  // 5. Adjust normal range according to adjacent edges
  // 6. Visit each separating axes, only accept axes within the range
  // 7. Return if _any_ axis indicates separation
  // 8. Clip

  var m_type1, m_type2; // VertexType unused?

  var xf = Transform.mulTXf(xfA, xfB);

  var centroidB = Transform.mulVec2(xf, polygonB.m_centroid);

  var v0 = edgeA.m_vertex0;
  var v1 = edgeA.m_vertex1;
  var v2 = edgeA.m_vertex2;
  var v3 = edgeA.m_vertex3;

  var hasVertex0 = edgeA.m_hasVertex0;
  var hasVertex3 = edgeA.m_hasVertex3;

  var edge1 = Vec2.sub(v2, v1);
  edge1.normalize();
  var normal1 = Vec2.neo(edge1.y, -edge1.x);
  var offset1 = Vec2.dot(normal1, Vec2.sub(centroidB, v1));
  var offset0 = 0.0;
  var offset2 = 0.0;
  var convex1 = false;
  var convex2 = false;

  // Is there a preceding edge?
  if (hasVertex0) {
    var edge0 = Vec2.sub(v1, v0);
    edge0.normalize();
    var normal0 = Vec2.neo(edge0.y, -edge0.x);
    convex1 = Vec2.cross(edge0, edge1) >= 0.0;
    offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
  }

  // Is there a following edge?
  if (hasVertex3) {
    var edge2 = Vec2.sub(v3, v2);
    edge2.normalize();
    var normal2 = Vec2.neo(edge2.y, -edge2.x);
    convex2 = Vec2.cross(edge1, edge2) > 0.0;
    offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
  }

  var front;
  var normal = Vec2.zero();
  var lowerLimit = Vec2.zero();
  var upperLimit = Vec2.zero();

  // Determine front or back collision. Determine collision normal limits.
  if (hasVertex0 && hasVertex3) {
    if (convex1 && convex2) {
      front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal0);
        upperLimit.set(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setMul(-1, normal1);
      }
    } else if (convex1) {
      front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal0);
        upperLimit.set(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.setMul(-1, normal1);
      }
    } else if (convex2) {
      front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal1);
        upperLimit.set(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setMul(-1, normal0);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal1);
        upperLimit.set(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.setMul(-1, normal0);
      }
    }
  } else if (hasVertex0) {
    if (convex1) {
      front = offset0 >= 0.0 || offset1 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal0);
        upperLimit.setMul(-1, normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.set(normal1);
        upperLimit.setMul(-1, normal1);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.set(normal1);
        upperLimit.setMul(-1, normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.set(normal1);
        upperLimit.setMul(-1, normal0);
      }
    }
  } else if (hasVertex3) {
    if (convex2) {
      front = offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.set(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.set(normal1);
      }
    } else {
      front = offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        normal.set(normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.set(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.set(normal1);
      }
    }
  } else {
    front = offset1 >= 0.0;
    if (front) {
      normal.set(normal1);
      lowerLimit.setMul(-1, normal1);
      upperLimit.setMul(-1, normal1);
    } else {
      normal.setMul(-1, normal1);
      lowerLimit.set(normal1);
      upperLimit.set(normal1);
    }
  }

  // Get polygonB in frameA
  polygonBA.count = polygonB.m_count;
  for (var i = 0; i < polygonB.m_count; ++i) {
    polygonBA.vertices[i] = Transform.mulVec2(xf, polygonB.m_vertices[i]);
    polygonBA.normals[i] = Rot.mulVec2(xf.q, polygonB.m_normals[i]);
  }

  var radius = 2.0 * Settings.polygonRadius;

  manifold.pointCount = 0;

  { // ComputeEdgeSeparation
    edgeAxis.type = e_edgeA;
    edgeAxis.index = front ? 0 : 1;
    edgeAxis.separation = Infinity;

    for (var i = 0; i < polygonBA.count; ++i) {
      var s = Vec2.dot(normal, Vec2.sub(polygonBA.vertices[i], v1));
      if (s < edgeAxis.separation) {
        edgeAxis.separation = s;
      }
    }
  }

  // If no valid normal can be found than this edge should not collide.
  if (edgeAxis.type == e_unknown) {
    return;
  }

  if (edgeAxis.separation > radius) {
    return;
  }

  { // ComputePolygonSeparation
    polygonAxis.type = e_unknown;
    polygonAxis.index = -1;
    polygonAxis.separation = -Infinity;

    var perp = Vec2.neo(-normal.y, normal.x);

    for (var i = 0; i < polygonBA.count; ++i) {
      var n = Vec2.neg(polygonBA.normals[i]);

      var s1 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v1));
      var s2 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v2));
      var s = Math.min(s1, s2);

      if (s > radius) {
        // No collision
        polygonAxis.type = e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
        break;
      }

      // Adjacency
      if (Vec2.dot(n, perp) >= 0.0) {
        if (Vec2.dot(Vec2.sub(n, upperLimit), normal) < -Settings.angularSlop) {
          continue;
        }
      } else {
        if (Vec2.dot(Vec2.sub(n, lowerLimit), normal) < -Settings.angularSlop) {
          continue;
        }
      }

      if (s > polygonAxis.separation) {
        polygonAxis.type = e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
      }
    }
  }

  if (polygonAxis.type != e_unknown && polygonAxis.separation > radius) {
    return;
  }

  // Use hysteresis for jitter reduction.
  var k_relativeTol = 0.98;
  var k_absoluteTol = 0.001;

  var primaryAxis;
  if (polygonAxis.type == e_unknown) {
    primaryAxis = edgeAxis;
  } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
    primaryAxis = polygonAxis;
  } else {
    primaryAxis = edgeAxis;
  }

  var ie = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];

  if (primaryAxis.type == e_edgeA) {
    manifold.type = Manifold.e_faceA;

    // Search for the polygon normal that is most anti-parallel to the edge
    // normal.
    var bestIndex = 0;
    var bestValue = Vec2.dot(normal, polygonBA.normals[0]);
    for (var i = 1; i < polygonBA.count; ++i) {
      var value = Vec2.dot(normal, polygonBA.normals[i]);
      if (value < bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }

    var i1 = bestIndex;
    var i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;

    ie[0].v = polygonBA.vertices[i1];
    ie[0].id.cf.indexA = 0;
    ie[0].id.cf.indexB = i1;
    ie[0].id.cf.typeA = Manifold.e_face;
    ie[0].id.cf.typeB = Manifold.e_vertex;

    ie[1].v = polygonBA.vertices[i2];
    ie[1].id.cf.indexA = 0;
    ie[1].id.cf.indexB = i2;
    ie[1].id.cf.typeA = Manifold.e_face;
    ie[1].id.cf.typeB = Manifold.e_vertex;

    if (front) {
      rf.i1 = 0;
      rf.i2 = 1;
      rf.v1 = v1;
      rf.v2 = v2;
      rf.normal.set(normal1);
    } else {
      rf.i1 = 1;
      rf.i2 = 0;
      rf.v1 = v2;
      rf.v2 = v1;
      rf.normal.setMul(-1, normal1);
    }
  } else {
    manifold.type = Manifold.e_faceB;

    ie[0].v = v1;
    ie[0].id.cf.indexA = 0;
    ie[0].id.cf.indexB = primaryAxis.index;
    ie[0].id.cf.typeA = Manifold.e_vertex;
    ie[0].id.cf.typeB = Manifold.e_face;

    ie[1].v = v2;
    ie[1].id.cf.indexA = 0;
    ie[1].id.cf.indexB = primaryAxis.index;
    ie[1].id.cf.typeA = Manifold.e_vertex;
    ie[1].id.cf.typeB = Manifold.e_face;

    rf.i1 = primaryAxis.index;
    rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
    rf.v1 = polygonBA.vertices[rf.i1];
    rf.v2 = polygonBA.vertices[rf.i2];
    rf.normal.set(polygonBA.normals[rf.i1]);
  }

  rf.sideNormal1.set(rf.normal.y, -rf.normal.x);
  rf.sideNormal2.setMul(-1, rf.sideNormal1);
  rf.sideOffset1 = Vec2.dot(rf.sideNormal1, rf.v1);
  rf.sideOffset2 = Vec2.dot(rf.sideNormal2, rf.v2);

  // Clip incident edge against extruded edge1 side edges.
  var clipPoints1 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];
  var clipPoints2 = [ new Manifold.clipVertex(), new Manifold.clipVertex() ];

  var np;

  // Clip to box side 1
  np = Manifold.clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Clip to negative box side 1
  np = Manifold.clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  if (primaryAxis.type == e_edgeA) {
    manifold.localNormal = Vec2.clone(rf.normal);
    manifold.localPoint = Vec2.clone(rf.v1);
  } else {
    manifold.localNormal = Vec2.clone(polygonB.m_normals[rf.i1]);
    manifold.localPoint = Vec2.clone(polygonB.m_vertices[rf.i1]);
  }

  var pointCount = 0;
  for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
    var separation = Vec2.dot(rf.normal, Vec2.sub(clipPoints2[i].v, rf.v1));

    if (separation <= radius) {
      var cp = manifold.points[pointCount]; // ManifoldPoint

      if (primaryAxis.type == e_edgeA) {
        cp.localPoint = Transform.mulT(xf, clipPoints2[i].v);
        cp.id = clipPoints2[i].id;
      } else {
        cp.localPoint = clipPoints2[i].v;
        cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
        cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
        cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
        cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
      }

      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
}
