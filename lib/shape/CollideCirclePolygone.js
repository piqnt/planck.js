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
var CircleShape = require('./CircleShape');
var PolygonShape = require('./PolygonShape');

Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);

function PolygonCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
  _ASSERT && common.assert(fixtureA.getType() == PolygonShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
  CollidePolygonCircle(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(),
      xfB);
}

function CollidePolygonCircle(manifold, polygonA, xfA, circleB, xfB) {
  manifold.pointCount = 0;

  // Compute circle position in the frame of the polygon.
  var c = Transform.mulVec2(xfB, circleB.m_p);
  var cLocal = Transform.mulTVec2(xfA, c);

  // Find the min separating edge.
  var normalIndex = 0;
  var separation = -Infinity;
  var radius = polygonA.m_radius + circleB.m_radius;
  var vertexCount = polygonA.m_count;
  var vertices = polygonA.m_vertices;
  var normals = polygonA.m_normals;

  for (var i = 0; i < vertexCount; ++i) {
    var s = Vec2.dot(normals[i], Vec2.sub(cLocal, vertices[i]));

    if (s > radius) {
      // Early out.
      return;
    }

    if (s > separation) {
      separation = s;
      normalIndex = i;
    }
  }

  // Vertices that subtend the incident face.
  var vertIndex1 = normalIndex;
  var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
  var v1 = vertices[vertIndex1];
  var v2 = vertices[vertIndex2];

  // If the center is inside the polygon ...
  if (separation < Math.EPSILON) {
    manifold.pointCount = 1;
    manifold.type = Manifold.e_faceA;
    manifold.localNormal.set(normals[normalIndex]);
    manifold.localPoint.setCombine(0.5, v1, 0.5, v2);
    manifold.points[0].localPoint = circleB.m_p;

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
    return;
  }

  // Compute barycentric coordinates
  var u1 = Vec2.dot(Vec2.sub(cLocal, v1), Vec2.sub(v2, v1));
  var u2 = Vec2.dot(Vec2.sub(cLocal, v2), Vec2.sub(v1, v2));
  if (u1 <= 0.0) {
    if (Vec2.distanceSquared(cLocal, v1) > radius * radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = Manifold.e_faceA;
    manifold.localNormal.setCombine(1, cLocal, -1, v1);
    manifold.localNormal.normalize();
    manifold.localPoint = v1;
    manifold.points[0].localPoint.set(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
  } else if (u2 <= 0.0) {
    if (Vec2.distanceSquared(cLocal, v2) > radius * radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = Manifold.e_faceA;
    manifold.localNormal.setCombine(1, cLocal, -1, v2);
    manifold.localNormal.normalize();
    manifold.localPoint.set(v2);
    manifold.points[0].localPoint.set(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
  } else {
    var faceCenter = Vec2.mid(v1, v2);
    var separation = Vec2.dot(cLocal, normals[vertIndex1])
        - Vec2.dot(faceCenter, normals[vertIndex1]);
    if (separation > radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = Manifold.e_faceA;
    manifold.localNormal.set(normals[vertIndex1]);
    manifold.localPoint.set(faceCenter);
    manifold.points[0].localPoint.set(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
  }
}
