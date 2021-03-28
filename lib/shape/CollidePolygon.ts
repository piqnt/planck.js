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

import common from '../util/common';
import Transform from '../common/Transform';
import Rot from '../common/Rot';
import Vec2 from '../common/Vec2';
import Settings from '../Settings';
import { clipSegmentToLine, ClipVertex, ContactFeatureType, ManifoldType } from '../Manifold';
import Contact from '../Contact';
import PolygonShape from './PolygonShape';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


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
  let count1 = poly1.m_count;
  let count2 = poly2.m_count;
  let n1s = poly1.m_normals;
  let v1s = poly1.m_vertices;
  let v2s = poly2.m_vertices;
  let xf = Transform.mulTXf(xf2, xf1);

  let bestIndex = 0;
  let maxSeparation = -Infinity;
  for (let i = 0; i < count1; ++i) {
    // Get poly1 normal in frame2.
    let n = Rot.mulVec2(xf.q, n1s[i]);
    let v1 = Transform.mulVec2(xf, v1s[i]);

    // Find deepest point for normal i.
    let si = Infinity;
    for (let j = 0; j < count2; ++j) {
      let sij = Vec2.dot(n, v2s[j]) - Vec2.dot(n, v1);
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

function FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
  let normals1 = poly1.m_normals;

  let count2 = poly2.m_count;
  let vertices2 = poly2.m_vertices;
  let normals2 = poly2.m_normals;

  _ASSERT && common.assert(0 <= edge1 && edge1 < poly1.m_count);

  // Get the normal of the reference edge in poly2's frame.
  let normal1 = Rot.mulT(xf2.q, Rot.mulVec2(xf1.q, normals1[edge1]));

  // Find the incident edge on poly2.
  let index = 0;
  let minDot = Infinity;
  for (let i = 0; i < count2; ++i) {
    let dot = Vec2.dot(normal1, normals2[i]);
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }

  // Build the clip vertices for the incident edge.
  let i1 = index;
  let i2 = i1 + 1 < count2 ? i1 + 1 : 0;

  c[0].v = Transform.mulVec2(xf2, vertices2[i1]);
  c[0].id.cf.indexA = edge1;
  c[0].id.cf.indexB = i1;
  c[0].id.cf.typeA = ContactFeatureType.e_face;
  c[0].id.cf.typeB = ContactFeatureType.e_vertex;

  c[1].v = Transform.mulVec2(xf2, vertices2[i2]);
  c[1].id.cf.indexA = edge1;
  c[1].id.cf.indexB = i2;
  c[1].id.cf.typeA = ContactFeatureType.e_face;
  c[1].id.cf.typeB = ContactFeatureType.e_vertex;
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
export function CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
  manifold.pointCount = 0;
  let totalRadius = polyA.m_radius + polyB.m_radius;

  FindMaxSeparation(polyA, xfA, polyB, xfB);
  let edgeA = FindMaxSeparation._bestIndex;
  let separationA = FindMaxSeparation._maxSeparation;
  if (separationA > totalRadius)
    return;

  FindMaxSeparation(polyB, xfB, polyA, xfA);
  let edgeB = FindMaxSeparation._bestIndex;
  let separationB = FindMaxSeparation._maxSeparation;
  if (separationB > totalRadius)
    return;

  let poly1; // reference polygon
  let poly2; // incident polygon
  let xf1;
  let xf2;
  let edge1; // reference edge
  let flip;
  let k_tol = 0.1 * Settings.linearSlop;

  if (separationB > separationA + k_tol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = edgeB;
    manifold.type = ManifoldType.e_faceB;
    flip = 1;
  } else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = edgeA;
    manifold.type = ManifoldType.e_faceA;
    flip = 0;
  }

  let incidentEdge = [ new ClipVertex(), new ClipVertex() ];
  FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);

  let count1 = poly1.m_count;
  let vertices1 = poly1.m_vertices;

  let iv1 = edge1;
  let iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;

  let v11 = vertices1[iv1];
  let v12 = vertices1[iv2];

  let localTangent = Vec2.sub(v12, v11);
  localTangent.normalize();

  let localNormal = Vec2.cross(localTangent, 1.0);
  let planePoint = Vec2.combine(0.5, v11, 0.5, v12);

  let tangent = Rot.mulVec2(xf1.q, localTangent);
  let normal = Vec2.cross(tangent, 1.0);

  v11 = Transform.mulVec2(xf1, v11);
  v12 = Transform.mulVec2(xf1, v12);

  // Face offset.
  let frontOffset = Vec2.dot(normal, v11);

  // Side offsets, extended by polytope skin thickness.
  let sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
  let sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;

  // Clip incident edge against extruded edge1 side edges.
  let clipPoints1 = [ new ClipVertex(), new ClipVertex() ];
  let clipPoints2 = [ new ClipVertex(), new ClipVertex() ];
  let np;

  // Clip to box side 1
  np = clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg(tangent),
      sideOffset1, iv1);

  if (np < 2) {
    return;
  }

  // Clip to negative box side 1
  np = clipSegmentToLine(clipPoints2, clipPoints1, tangent,
      sideOffset2, iv2);

  if (np < 2) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  manifold.localNormal = localNormal;
  manifold.localPoint = planePoint;

  let pointCount = 0;
  for (let i = 0; i < clipPoints2.length/* maxManifoldPoints */; ++i) {
    let separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;

    if (separation <= totalRadius) {
      let cp = manifold.points[pointCount]; // ManifoldPoint
      cp.localPoint.set(Transform.mulTVec2(xf2, clipPoints2[i].v));
      cp.id = clipPoints2[i].id;
      if (flip) {
        // Swap features
        let cf = cp.id.cf; // ContactFeature
        let indexA = cf.indexA;
        let indexB = cf.indexB;
        let typeA = cf.typeA;
        let typeB = cf.typeB;
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
