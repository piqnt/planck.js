/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TransformValue } from "../../common/Transform";
import * as geo from "../../common/Geo";
import { SettingsInternal as Settings } from "../../Settings";
import { Manifold, clipSegmentToLine, ClipVertex, ContactFeatureType, ManifoldType } from "../Manifold";
import { Contact } from "../../dynamics/Contact";
import { PolygonShape } from "./PolygonShape";
import { Fixture } from "../../dynamics/Fixture";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

/** @internal */ const incidentEdge = [new ClipVertex(), new ClipVertex()];
/** @internal */ const clipPoints1 = [new ClipVertex(), new ClipVertex()];
/** @internal */ const clipPoints2 = [new ClipVertex(), new ClipVertex()];
/** @internal */ const clipSegmentToLineNormal = geo.vec2(0, 0);
/** @internal */ const v1 = geo.vec2(0, 0);
/** @internal */ const n = geo.vec2(0, 0);
/** @internal */ const xf = geo.transform(0, 0, 0);
/** @internal */ const v11 = geo.vec2(0, 0);
/** @internal */ const v12 = geo.vec2(0, 0);
/** @internal */ const localTangent = geo.vec2(0, 0);
/** @internal */ const localNormal = geo.vec2(0, 0);
/** @internal */ const planePoint = geo.vec2(0, 0);
/** @internal */ const tangent = geo.vec2(0, 0);
/** @internal */ const normal = geo.vec2(0, 0);
/** @internal */ const normal1 = geo.vec2(0, 0);

Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);

/** @internal */ function PolygonContact(
  manifold: Manifold,
  xfA: TransformValue,
  fixtureA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fixtureB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fixtureA.getType() == PolygonShape.TYPE);
  if (_ASSERT) console.assert(fixtureB.getType() == PolygonShape.TYPE);
  CollidePolygons(manifold, fixtureA.getShape() as PolygonShape, xfA, fixtureB.getShape() as PolygonShape, xfB);
}

/** @internal */ interface MaxSeparation {
  maxSeparation: number;
  bestIndex: number;
}

/**
 * Find the max separation between poly1 and poly2 using edge normals from
 * poly1.
 */
/** @internal */ function findMaxSeparation(
  poly1: PolygonShape,
  xf1: TransformValue,
  poly2: PolygonShape,
  xf2: TransformValue,
  output: MaxSeparation,
): void {
  const count1 = poly1.m_count;
  const count2 = poly2.m_count;
  const n1s = poly1.m_normals;
  const v1s = poly1.m_vertices;
  const v2s = poly2.m_vertices;

  geo.detransformTransform(xf, xf2, xf1);

  let bestIndex = 0;
  let maxSeparation = -Infinity;
  for (let i = 0; i < count1; ++i) {
    // Get poly1 normal in frame2.
    geo.rotVec2(n, xf.q, n1s[i]);
    geo.transformVec2(v1, xf, v1s[i]);

    // Find deepest point for normal i.
    let si = Infinity;
    for (let j = 0; j < count2; ++j) {
      const sij = geo.dotVec2(n, v2s[j]) - geo.dotVec2(n, v1);
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
  output.maxSeparation = maxSeparation;
  output.bestIndex = bestIndex;
}

/** @internal */ function findIncidentEdge(
  clipVertex: ClipVertex[],
  poly1: PolygonShape,
  xf1: TransformValue,
  edge1: number,
  poly2: PolygonShape,
  xf2: TransformValue,
): void {
  const normals1 = poly1.m_normals;

  const count2 = poly2.m_count;
  const vertices2 = poly2.m_vertices;
  const normals2 = poly2.m_normals;

  if (_ASSERT) console.assert(0 <= edge1 && edge1 < poly1.m_count);

  // Get the normal of the reference edge in poly2's frame.
  geo.rerotVec2(normal1, xf2.q, xf1.q, normals1[edge1]);

  // Find the incident edge on poly2.
  let index = 0;
  let minDot = Infinity;
  for (let i = 0; i < count2; ++i) {
    const dot = geo.dotVec2(normal1, normals2[i]);
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }

  // Build the clip vertices for the incident edge.
  const i1 = index;
  const i2 = i1 + 1 < count2 ? i1 + 1 : 0;

  geo.transformVec2(clipVertex[0].v, xf2, vertices2[i1]);
  clipVertex[0].id.setFeatures(edge1, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);

  geo.transformVec2(clipVertex[1].v, xf2, vertices2[i2]);
  clipVertex[1].id.setFeatures(edge1, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);
}

/** @internal */ const maxSeparation = {
  maxSeparation: 0,
  bestIndex: 0,
};

/**
 *
 * Find edge normal of max separation on A - return if separating axis is found
 * Find edge normal of max separation on B - return if separation axis is found
 * Choose reference edge as min(minA, minB)
 * Find incident edge
 * Clip
 *
 * The normal points from 1 to 2
 */
export const CollidePolygons = function (
  manifold: Manifold,
  polyA: PolygonShape,
  xfA: TransformValue,
  polyB: PolygonShape,
  xfB: TransformValue,
): void {
  manifold.pointCount = 0;
  const totalRadius = polyA.m_radius + polyB.m_radius;

  findMaxSeparation(polyA, xfA, polyB, xfB, maxSeparation);
  const edgeA = maxSeparation.bestIndex;
  const separationA = maxSeparation.maxSeparation;
  if (separationA > totalRadius) return;

  findMaxSeparation(polyB, xfB, polyA, xfA, maxSeparation);
  const edgeB = maxSeparation.bestIndex;
  const separationB = maxSeparation.maxSeparation;
  if (separationB > totalRadius) return;

  let poly1: PolygonShape; // reference polygon
  let poly2: PolygonShape; // incident polygon
  let xf1: TransformValue;
  let xf2: TransformValue;
  let edge1: number; // reference edge
  let flip: boolean;
  const k_tol = 0.1 * Settings.linearSlop;

  if (separationB > separationA + k_tol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = edgeB;
    manifold.type = ManifoldType.e_faceB;
    flip = true;
  } else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = edgeA;
    manifold.type = ManifoldType.e_faceA;
    flip = false;
  }

  incidentEdge[0].recycle();
  incidentEdge[1].recycle();
  findIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);

  const count1 = poly1.m_count;
  const vertices1 = poly1.m_vertices;

  const iv1 = edge1;
  const iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;

  geo.copyVec2(v11, vertices1[iv1]);
  geo.copyVec2(v12, vertices1[iv2]);

  geo.subVec2(localTangent, v12, v11);
  geo.normalizeVec2(localTangent);

  geo.crossVec2Num(localNormal, localTangent, 1.0);
  geo.combine2Vec2(planePoint, 0.5, v11, 0.5, v12);

  geo.rotVec2(tangent, xf1.q, localTangent);
  geo.crossVec2Num(normal, tangent, 1.0);

  geo.transformVec2(v11, xf1, v11);
  geo.transformVec2(v12, xf1, v12);

  // Face offset.
  const frontOffset = geo.dotVec2(normal, v11);

  // Side offsets, extended by polytope skin thickness.
  const sideOffset1 = -geo.dotVec2(tangent, v11) + totalRadius;
  const sideOffset2 = geo.dotVec2(tangent, v12) + totalRadius;

  // Clip incident edge against extruded edge1 side edges.
  clipPoints1[0].recycle();
  clipPoints1[1].recycle();
  clipPoints2[0].recycle();
  clipPoints2[1].recycle();

  // Clip to box side 1
  geo.setVec2(clipSegmentToLineNormal, -tangent.x, -tangent.y);
  const np1 = clipSegmentToLine(clipPoints1, incidentEdge, clipSegmentToLineNormal, sideOffset1, iv1);

  if (np1 < 2) {
    return;
  }

  // Clip to negative box side 1
  geo.setVec2(clipSegmentToLineNormal, tangent.x, tangent.y);
  const np2 = clipSegmentToLine(clipPoints2, clipPoints1, clipSegmentToLineNormal, sideOffset2, iv2);

  if (np2 < 2) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  geo.copyVec2(manifold.localNormal, localNormal);
  geo.copyVec2(manifold.localPoint, planePoint);

  let pointCount = 0;
  for (let i = 0; i < clipPoints2.length /* maxManifoldPoints */; ++i) {
    const separation = geo.dotVec2(normal, clipPoints2[i].v) - frontOffset;

    if (separation <= totalRadius) {
      const cp = manifold.points[pointCount];
      geo.detransformVec2(cp.localPoint, xf2, clipPoints2[i].v);
      cp.id.set(clipPoints2[i].id);
      if (flip) {
        // Swap features
        cp.id.swapFeatures();
      }
      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
};
