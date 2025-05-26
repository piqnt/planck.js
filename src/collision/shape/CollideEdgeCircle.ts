/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TransformValue } from "../../common/Transform";
import * as matrix from "../../common/Matrix";
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
  const edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);

  const shapeA = edge;
  const shapeB = fixtureB.getShape() as CircleShape;

  CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}

/** @internal */ const e = matrix.vec2(0, 0);
/** @internal */ const temp = matrix.vec2(0, 0);
/** @internal */ const e1 = matrix.vec2(0, 0);
/** @internal */ const e2 = matrix.vec2(0, 0);
/** @internal */ const Q = matrix.vec2(0, 0);
/** @internal */ const P = matrix.vec2(0, 0);
/** @internal */ const n = matrix.vec2(0, 0);

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
  matrix.retransformVec2(Q, xfB, xfA, circleB.m_p);

  const A = edgeA.m_vertex1;
  const B = edgeA.m_vertex2;
  matrix.subVec2(e, B, A);

  // Barycentric coordinates
  const u = matrix.dotVec2(e, B) - matrix.dotVec2(e, Q);
  const v = matrix.dotVec2(e, Q) - matrix.dotVec2(e, A);

  const radius = edgeA.m_radius + circleB.m_radius;

  // Region A
  if (v <= 0.0) {
    matrix.copyVec2(P, A);
    const dd = matrix.distSqrVec2(Q, A);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to A?
    if (edgeA.m_hasVertex0) {
      const A1 = edgeA.m_vertex0;
      const B1 = A;
      matrix.subVec2(e1, B1, A1);
      const u1 = matrix.dotVec2(e1, B1) - matrix.dotVec2(e1, Q);

      // Is the circle in Region AB of the previous edge?
      if (u1 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    matrix.zeroVec2(manifold.localNormal);
    matrix.copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    matrix.copyVec2(manifold.points[0].localPoint, circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    return;
  }

  // Region B
  if (u <= 0.0) {
    matrix.copyVec2(P, B);
    const dd = matrix.distSqrVec2(Q, P);
    if (dd > radius * radius) {
      return;
    }

    // Is there an edge connected to B?
    if (edgeA.m_hasVertex3) {
      const B2 = edgeA.m_vertex3;
      const A2 = B;
      matrix.subVec2(e2, B2, A2);
      const v2 = matrix.dotVec2(e2, Q) - matrix.dotVec2(e2, A2);

      // Is the circle in Region AB of the next edge?
      if (v2 > 0.0) {
        return;
      }
    }

    manifold.type = ManifoldType.e_circles;
    matrix.zeroVec2(manifold.localNormal);
    matrix.copyVec2(manifold.localPoint, P);
    manifold.pointCount = 1;
    matrix.copyVec2(manifold.points[0].localPoint, circleB.m_p);

    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(1, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);

    return;
  }

  // Region AB
  const den = matrix.lengthSqrVec2(e);
  if (_ASSERT) console.assert(den > 0.0);
  matrix.combine2Vec2(P, u / den, A, v / den, B);
  const dd = matrix.distSqrVec2(Q, P);
  if (dd > radius * radius) {
    return;
  }

  matrix.crossNumVec2(n, 1, e);
  if (matrix.dotVec2(n, Q) - matrix.dotVec2(n, A) < 0.0) {
    matrix.negVec2(n);
  }
  matrix.normalizeVec2(n);

  manifold.type = ManifoldType.e_faceA;
  matrix.copyVec2(manifold.localNormal, n);
  matrix.copyVec2(manifold.localPoint, A);
  manifold.pointCount = 1;
  matrix.copyVec2(manifold.points[0].localPoint, circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_face, 0, ContactFeatureType.e_vertex);
};
