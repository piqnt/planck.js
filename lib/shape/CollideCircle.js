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
var create = require('../util/create');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Vec2 = require('../common/Vec2');
var Settings = require('../Settings');
var Shape = require('../Shape');
var Contact = require('../Contact');
var Manifold = require('../Manifold');
var CircleShape = require('./CircleShape');

Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);

function CircleCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
  _ASSERT && common.assert(fixtureA.getType() == CircleShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
  CollideCircles(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}

function CollideCircles(manifold, circleA, xfA, circleB, xfB) {
  manifold.pointCount = 0;

  var pA = Transform.mulVec2(xfA, circleA.m_p);
  var pB = Transform.mulVec2(xfB, circleB.m_p);

  var distSqr = Vec2.distanceSquared(pB, pA);
  var rA = circleA.m_radius;
  var rB = circleB.m_radius;
  var radius = rA + rB;
  if (distSqr > radius * radius) {
    return;
  }

  manifold.type = Manifold.e_circles;
  manifold.localPoint.set(circleA.m_p);
  manifold.localNormal.setZero();
  manifold.pointCount = 1;
  manifold.points[0].localPoint.set(circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.cf.indexA = 0;
  manifold.points[0].id.cf.typeA = Manifold.e_vertex;
  manifold.points[0].id.cf.indexB = 0;
  manifold.points[0].id.cf.typeB = Manifold.e_vertex;
}

exports.CollideCircles = CollideCircles;
