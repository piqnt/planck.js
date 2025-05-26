/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../../common/Matrix";
import { TransformValue } from "../../common/Transform";
import { Contact } from "../../dynamics/Contact";
import { CircleShape } from "./CircleShape";
import { Manifold, ContactFeatureType, ManifoldType } from "../Manifold";
import { Fixture } from "../../dynamics/Fixture";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);

/** @internal */ function CircleCircleContact(
  manifold: Manifold,
  xfA: TransformValue,
  fixtureA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fixtureB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fixtureA.getType() == CircleShape.TYPE);
  if (_ASSERT) console.assert(fixtureB.getType() == CircleShape.TYPE);
  CollideCircles(manifold, fixtureA.getShape() as CircleShape, xfA, fixtureB.getShape() as CircleShape, xfB);
}

/** @internal */ const pA = matrix.vec2(0, 0);
/** @internal */ const pB = matrix.vec2(0, 0);

export const CollideCircles = function (
  manifold: Manifold,
  circleA: CircleShape,
  xfA: TransformValue,
  circleB: CircleShape,
  xfB: TransformValue,
): void {
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
  matrix.zeroVec2(manifold.localNormal);
  manifold.pointCount = 1;
  matrix.copyVec2(manifold.points[0].localPoint, circleB.m_p);

  // manifold.points[0].id.key = 0;
  manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
};
