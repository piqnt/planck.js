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
var CircleShape = require('./CircleShape');

Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);

function EdgeCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB,
    indexB) {
  _ASSERT && common.assert(fixtureA.getType() == EdgeShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);

  var shapeA = fixtureA.getShape();
  var shapeB = fixtureB.getShape();

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

function ChainCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB,
    indexB) {
  _ASSERT && common.assert(fixtureA.getType() == ChainShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);

  var chain = fixtureA.getShape();
  var edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);

  var shapeA = edge;
  var shapeB = fixtureB.getShape();

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
function CollideEdgeCircle(manifold, edgeA, xfA, circleB, xfB) {
  manifold.pointCount = 0;

  // Compute circle in frame of edge
  var Q = Transform.mulTVec2(xfA, Transform.mulVec2(xfB, circleB.m_p));

  var A = edgeA.m_vertex1;
  var B = edgeA.m_vertex2;
  var e = Vec2.sub(B, A);

  // Barycentric coordinates
  var u = Vec2.dot(e, Vec2.sub(B, Q));
  var v = Vec2.dot(e, Vec2.sub(Q, A));

  var radius = edgeA.m_radius + circleB.m_radius;

  // Region A
  if (v <= 0.0) {
    var P = Vec2.clone(A);
    var d = Vec2.sub(Q, P);
    var dd = Vec2.dot(d, d);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to A?
    if (edgeA.m_hasVertex0) {
      var A1 = edgeA.m_vertex0;
      var B1 = A;
      var e1 = Vec2.sub(B1, A1);
      var u1 = Vec2.dot(e1, Vec2.sub(B1, Q));

      // Is the circle in Region AB of the previous edge?
      if (u1 > 0.0) {
        return;
      }
    }

    manifold.type = Manifold.e_circles;
    manifold.localNormal.setZero();
    manifold.localPoint.set(P);
    manifold.pointCount = 1;
    manifold.points[0].localPoint.set(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
    return;
  }

  // Region B
  if (u <= 0.0) {
    var P = Vec2.clone(B);
    var d = Vec2.sub(Q, P);
    var dd = Vec2.dot(d, d);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to B?
    if (edgeA.m_hasVertex3) {
      var B2 = edgeA.m_vertex3;
      var A2 = B;
      var e2 = Vec2.sub(B2, A2);
      var v2 = Vec2.dot(e2, Vec2.sub(Q, A2));

      // Is the circle in Region AB of the next edge?
      if (v2 > 0.0) {
        return;
      }
    }

    manifold.type = Manifold.e_circles;
    manifold.localNormal.setZero();
    manifold.localPoint.set(P);
    manifold.pointCount = 1;
    manifold.points[0].localPoint.set(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 1;
    manifold.points[0].id.cf.typeA = Manifold.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = Manifold.e_vertex;
    return;
  }

  // Region AB
  var den = Vec2.dot(e, e);
  _ASSERT && common.assert(den > 0.0);
  var P = Vec2.combine(u / den, A, v / den, B);
  var d = Vec2.sub(Q, P);
  var dd = Vec2.dot(d, d);
  if (dd > radius * radius) {
    return;
  }

  var n = Vec2.neo(-e.y, e.x);
  if (Vec2.dot(n, Vec2.sub(Q, A)) < 0.0) {
    n.set(-n.x, -n.y);
  }
  n.normalize();

  manifold.type = Manifold.e_faceA;
  manifold.localNormal = n;
  manifold.localPoint.set(A);
  manifold.pointCount = 1;
  manifold.points[0].localPoint.set(circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.cf.indexA = 0;
  manifold.points[0].id.cf.typeA = Manifold.e_face;
  manifold.points[0].id.cf.indexB = 0;
  manifold.points[0].id.cf.typeB = Manifold.e_vertex;
}
