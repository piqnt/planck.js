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


import common from '../../util/common';
import Transform from '../../common/Transform';
import Vec2 from '../../common/Vec2';
import Contact from '../../dynamics/Contact';
import CircleShape from './CircleShape';
import Manifold, { ContactFeatureType, ManifoldType } from "../Manifold";
import Fixture from "../../dynamics/Fixture";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);

function CircleCircleContact(manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fixtureA.getType() == CircleShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
  CollideCircles(manifold, fixtureA.getShape() as CircleShape, xfA, fixtureB.getShape() as CircleShape, xfB);
}

export function CollideCircles(manifold: Manifold, circleA: CircleShape, xfA: Transform, circleB: CircleShape, xfB: Transform): void {
  manifold.pointCount = 0;

  const pA = Transform.mulVec2(xfA, circleA.m_p);
  const pB = Transform.mulVec2(xfB, circleB.m_p);

  const distSqr = Vec2.distanceSquared(pB, pA);
  const rA = circleA.m_radius;
  const rB = circleB.m_radius;
  const radius = rA + rB;
  if (distSqr > radius * radius) {
    return;
  }

  manifold.type = ManifoldType.e_circles;
  manifold.localPoint.setVec2(circleA.m_p);
  manifold.localNormal.setZero();
  manifold.pointCount = 1;
  manifold.points[0].localPoint.setVec2(circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.cf.indexA = 0;
  manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
  manifold.points[0].id.cf.indexB = 0;
  manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
}
