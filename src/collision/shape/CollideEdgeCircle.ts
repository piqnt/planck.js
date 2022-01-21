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
import EdgeShape from './EdgeShape';
import ChainShape from './ChainShape';
import CircleShape from './CircleShape';
import Manifold, { ContactFeatureType, ManifoldType } from "../Manifold";
import Fixture from "../../dynamics/Fixture";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);

function EdgeCircleContact(manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fixtureA.getType() == EdgeShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);

  const shapeA = fixtureA.getShape() as EdgeShape;
  const shapeB = fixtureB.getShape() as CircleShape;

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

function ChainCircleContact(manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fixtureA.getType() == ChainShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);

  const chain = fixtureA.getShape() as ChainShape;
  const edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);

  const shapeA = edge;
  const shapeB = fixtureB.getShape() as CircleShape;

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
export function CollideEdgeCircle(manifold: Manifold, edgeA: EdgeShape, xfA: Transform, circleB: CircleShape, xfB: Transform): void {
  manifold.pointCount = 0;

  // Compute circle in frame of edge
  const Q = Transform.mulTVec2(xfA, Transform.mulVec2(xfB, circleB.m_p));

  const A = edgeA.m_vertex1;
  const B = edgeA.m_vertex2;
  const e = Vec2.sub(B, A);

  // Barycentric coordinates
  const u = Vec2.dot(e, Vec2.sub(B, Q));
  const v = Vec2.dot(e, Vec2.sub(Q, A));

  const radius = edgeA.m_radius + circleB.m_radius;

  // Region A
  if (v <= 0.0) {
    const P = Vec2.clone(A);
    const d = Vec2.sub(Q, P);
    const dd = Vec2.dot(d, d);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to A?
    if (edgeA.m_hasVertex0) {
      const A1 = edgeA.m_vertex0;
      const B1 = A;
      const e1 = Vec2.sub(B1, A1);
      const u1 = Vec2.dot(e1, Vec2.sub(B1, Q));

      // Is the circle in Region AB of the previous edge?
      if (u1 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    manifold.localNormal.setZero();
    manifold.localPoint.setVec2(P);
    manifold.pointCount = 1;
    manifold.points[0].localPoint.setVec2(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
    return;
  }

  // Region B
  if (u <= 0.0) {
    const P = Vec2.clone(B);
    const d = Vec2.sub(Q, P);
    const dd = Vec2.dot(d, d);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to B?
    if (edgeA.m_hasVertex3) {
      const B2 = edgeA.m_vertex3;
      const A2 = B;
      const e2 = Vec2.sub(B2, A2);
      const v2 = Vec2.dot(e2, Vec2.sub(Q, A2));

      // Is the circle in Region AB of the next edge?
      if (v2 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    manifold.localNormal.setZero();
    manifold.localPoint.setVec2(P);
    manifold.pointCount = 1;
    manifold.points[0].localPoint.setVec2(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 1;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
    return;
  }

  // Region AB
  const den = Vec2.dot(e, e);
  _ASSERT && common.assert(den > 0.0);
  const P = Vec2.combine(u / den, A, v / den, B);
  const d = Vec2.sub(Q, P);
  const dd = Vec2.dot(d, d);
  if (dd > radius * radius) {
    return;
  }

  const n = Vec2.neo(-e.y, e.x);
  if (Vec2.dot(n, Vec2.sub(Q, A)) < 0.0) {
    n.setNum(-n.x, -n.y);
  }
  n.normalize();

  manifold.type = ManifoldType.e_faceA;
  manifold.localNormal = n;
  manifold.localPoint.setVec2(A);
  manifold.pointCount = 1;
  manifold.points[0].localPoint.setVec2(circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.cf.indexA = 0;
  manifold.points[0].id.cf.typeA = ContactFeatureType.e_face;
  manifold.points[0].id.cf.indexB = 0;
  manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
}
