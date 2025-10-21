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
import { Contact } from "../../dynamics/Contact";
import { EdgeShape } from "./EdgeShape";
import { ChainShape } from "./ChainShape";
import { CircleShape } from "./CircleShape";
import { Manifold, ContactFeatureType, ManifoldType } from "../Manifold";
import { Fixture } from "../../dynamics/Fixture";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);

/** @internal */ function EdgeCircleContact(
  manifold: Manifold,
  xfA: TransformValue,
  fixtureA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fixtureB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fixtureA.getType() == EdgeShape.TYPE);
  if (_ASSERT) console.assert(fixtureB.getType() == CircleShape.TYPE);

  const shapeA = fixtureA.getShape() as EdgeShape;
  const shapeB = fixtureB.getShape() as CircleShape;

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

/** @internal */ const edge_reuse = new EdgeShape();

function ChainCircleContact(
  manifold: Manifold,
  xfA: TransformValue,
  fixtureA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fixtureB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fixtureA.getType() == ChainShape.TYPE);
  if (_ASSERT) console.assert(fixtureB.getType() == CircleShape.TYPE);

  const chain = fixtureA.getShape() as ChainShape;
  chain.getChildEdge(edge_reuse, indexA);

  const shapeA = edge_reuse;
  const shapeB = fixtureB.getShape() as CircleShape;

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

/** @internal */ const e = geo.vec2(0, 0);
/** @internal */ const temp = geo.vec2(0, 0);
/** @internal */ const e1 = geo.vec2(0, 0);
/** @internal */ const e2 = geo.vec2(0, 0);
/** @internal */ const Q = geo.vec2(0, 0);
/** @internal */ const P = geo.vec2(0, 0);
/** @internal */ const n = geo.vec2(0, 0);

// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
export const CollideEdgeCircle = function (
  manifold: Manifold,
  edgeA: EdgeShape,
  xfA: TransformValue,
  circleB: CircleShape,
  xfB: TransformValue,
): void {
  manifold.pointCount = 0;

  // Compute circle in frame of edge
  geo.retransformVec2(Q, xfB, xfA, circleB.m_p);

  const A = edgeA.m_vertex1;
  const B = edgeA.m_vertex2;
  geo.subVec2(e, B, A);

  // Barycentric coordinates
  const u = geo.dotVec2(e, B) - geo.dotVec2(e, Q);
  const v = geo.dotVec2(e, Q) - geo.dotVec2(e, A);

  const radius = edgeA.m_radius + circleB.m_radius;

  // Region A
  if (v <= 0.0) {
    geo.copyVec2(P, A);
    const dd = geo.distSqrVec2(Q, A);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to A?
    if (edgeA.m_hasVertex0) {
      const A1 = edgeA.m_vertex0;
      const B1 = A;
      geo.subVec2(e1, B1, A1);
      const u1 = geo.dotVec2(e1, B1) - geo.dotVec2(e1, Q);

      // Is the circle in Region AB of the previous edge?
      if (u1 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    geo.zeroVec2(manifold.localNormal);
    geo.copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    geo.copyVec2(manifold.points[0].localPoint, circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    return;
  }

  // Region B
  if (u <= 0.0) {
    geo.copyVec2(P, B);
    const dd = geo.distSqrVec2(Q, P);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to B?
    if (edgeA.m_hasVertex3) {
      const B2 = edgeA.m_vertex3;
      const A2 = B;
      geo.subVec2(e2, B2, A2);
      const v2 = geo.dotVec2(e2, Q) - geo.dotVec2(e2, A2);

      // Is the circle in Region AB of the next edge?
      if (v2 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    geo.zeroVec2(manifold.localNormal);
    geo.copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    geo.copyVec2(manifold.points[0].localPoint, circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(1, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);

    return;
  }

  // Region AB
  const den = geo.lengthSqrVec2(e);
  if (_ASSERT) console.assert(den > 0.0);
  geo.combine2Vec2(P, u / den, A, v / den, B);
  const dd = geo.distSqrVec2(Q, P);
  if (dd > radius * radius) {
    return;
  }

  geo.crossNumVec2(n, 1, e);
  if (geo.dotVec2(n, Q) - geo.dotVec2(n, A) < 0.0) {
    geo.negVec2(n);
  }
  geo.normalizeVec2(n);

  manifold.type = ManifoldType.e_faceA;
  geo.copyVec2(manifold.localNormal, n);
  geo.copyVec2(manifold.localPoint, A);
  manifold.pointCount = 1;
  geo.copyVec2(manifold.points[0].localPoint, circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_face, 0, ContactFeatureType.e_vertex);
};
