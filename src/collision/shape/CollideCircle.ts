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


import * as matrix from '../../common/Matrix';
import { Transform } from '../../common/Transform';
import { Contact } from '../../dynamics/Contact';
import { CircleShape } from './CircleShape';
import { Manifold, ContactFeatureType, ManifoldType } from "../Manifold";
import { Fixture } from "../../dynamics/Fixture";


/** @internal */ const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);

/** @internal */ function CircleCircleContact(manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number): void {
  _ASSERT && console.assert(fixtureA.getType() == CircleShape.TYPE);
  _ASSERT && console.assert(fixtureB.getType() == CircleShape.TYPE);
  CollideCircles(manifold, fixtureA.getShape() as CircleShape, xfA, fixtureB.getShape() as CircleShape, xfB);
}

/** @internal */ const pA = matrix.vec2(0, 0);
/** @internal */ const pB = matrix.vec2(0, 0);

export const CollideCircles = function (manifold: Manifold, circleA: CircleShape, xfA: Transform, circleB: CircleShape, xfB: Transform): void {
  manifold.pointCount = 0;

  matrix.transformVec2(pA, xfA, circleA.m_p);
  matrix.transformVec2(pB, xfB, circleB.m_p);

  const distSqr = matrix.distSqrVec2(pB, pA);
  const rA = circleA.m_radius;
  const rB = circleB.m_radius;
  const radius = rA + rB;
  if (distSqr > radius * radius) {
    return;
  }

  manifold.type = ManifoldType.e_circles;
  matrix.copyVec2(manifold.localPoint, circleA.m_p);
  matrix.zeroVec2(manifold.localNormal)
  manifold.pointCount = 1;
  matrix.copyVec2(manifold.points[0].localPoint, circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex)
}
