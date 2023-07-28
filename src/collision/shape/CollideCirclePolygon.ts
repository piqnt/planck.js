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
import Math from '../../common/Math';
import Transform from '../../common/Transform';
import Vec2 from '../../common/Vec2';
import Contact from '../../dynamics/Contact';
import CircleShape from './CircleShape';
import PolygonShape from './PolygonShape';
import Manifold, { ContactFeatureType, ManifoldType } from "../Manifold";
import Fixture from "../../dynamics/Fixture";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);

function PolygonCircleContact(manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fixtureA.getType() == PolygonShape.TYPE);
  _ASSERT && common.assert(fixtureB.getType() == CircleShape.TYPE);
  CollidePolygonCircle(manifold, fixtureA.getShape() as PolygonShape, xfA, fixtureB.getShape() as CircleShape, xfB);
}

export function CollidePolygonCircle(manifold: Manifold, polygonA: PolygonShape, xfA: Transform, circleB: CircleShape, xfB: Transform): void {
  manifold.pointCount = 0;

  // Compute circle position in the frame of the polygon.
  const c = Transform.mulVec2(xfB, circleB.m_p);
  const cLocal = Transform.mulTVec2(xfA, c);

  // Find the min separating edge.
  let normalIndex = 0;
  let separation = -Infinity;
  const radius = polygonA.m_radius + circleB.m_radius;
  const vertexCount = polygonA.m_count;
  const vertices = polygonA.m_vertices;
  const normals = polygonA.m_normals;

  for (let i = 0; i < vertexCount; ++i) {
    const s = Vec2.dot(normals[i], Vec2.sub(cLocal, vertices[i]));

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
  const vertIndex1 = normalIndex;
  const vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
  const v1 = vertices[vertIndex1];
  const v2 = vertices[vertIndex2];

  // If the center is inside the polygon ...
  if (separation < Math.EPSILON) {
    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    manifold.localNormal.setVec2(normals[normalIndex]);
    manifold.localPoint.setCombine(0.5, v1, 0.5, v2);
    manifold.points[0].localPoint = circleB.m_p;

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
    return;
  }

  // Compute barycentric coordinates
  const u1 = Vec2.dot(Vec2.sub(cLocal, v1), Vec2.sub(v2, v1));
  const u2 = Vec2.dot(Vec2.sub(cLocal, v2), Vec2.sub(v1, v2));
  if (u1 <= 0.0) {
    if (Vec2.distanceSquared(cLocal, v1) > radius * radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    manifold.localNormal.setCombine(1, cLocal, -1, v1);
    manifold.localNormal.normalize();
    manifold.localPoint = v1;
    manifold.points[0].localPoint.setVec2(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
  } else if (u2 <= 0.0) {
    if (Vec2.distanceSquared(cLocal, v2) > radius * radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    manifold.localNormal.setCombine(1, cLocal, -1, v2);
    manifold.localNormal.normalize();
    manifold.localPoint.setVec2(v2);
    manifold.points[0].localPoint.setVec2(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
  } else {
    const faceCenter = Vec2.mid(v1, v2);
    const separation = Vec2.dot(cLocal, normals[vertIndex1]) - Vec2.dot(faceCenter, normals[vertIndex1]);
    if (separation > radius) {
      return;
    }

    manifold.pointCount = 1;
    manifold.type = ManifoldType.e_faceA;
    manifold.localNormal.setVec2(normals[vertIndex1]);
    manifold.localPoint.setVec2(faceCenter);
    manifold.points[0].localPoint.setVec2(circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.cf.indexA = 0;
    manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
    manifold.points[0].id.cf.indexB = 0;
    manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
  }
}
