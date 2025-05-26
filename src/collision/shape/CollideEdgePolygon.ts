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
import { Vec2, Vec2Value } from "../../common/Vec2";
import { SettingsInternal as Settings } from "../../Settings";
import { Contact } from "../../dynamics/Contact";
import { Manifold, clipSegmentToLine, ClipVertex, ContactFeatureType, ManifoldType } from "../Manifold";
import { EdgeShape } from "./EdgeShape";
import { ChainShape } from "./ChainShape";
import { PolygonShape } from "./PolygonShape";
import { Fixture } from "../../dynamics/Fixture";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_min = Math.min;

Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);

/** @internal */ function EdgePolygonContact(
  manifold: Manifold,
  xfA: TransformValue,
  fA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fA.getType() == EdgeShape.TYPE);
  if (_ASSERT) console.assert(fB.getType() == PolygonShape.TYPE);

  CollideEdgePolygon(manifold, fA.getShape() as EdgeShape, xfA, fB.getShape() as PolygonShape, xfB);
}

// reused
/** @internal */ const edge_reuse = new EdgeShape();

/** @internal */ function ChainPolygonContact(
  manifold: Manifold,
  xfA: TransformValue,
  fA: Fixture,
  indexA: number,
  xfB: TransformValue,
  fB: Fixture,
  indexB: number,
): void {
  if (_ASSERT) console.assert(fA.getType() == ChainShape.TYPE);
  if (_ASSERT) console.assert(fB.getType() == PolygonShape.TYPE);

  const chain = fA.getShape() as ChainShape;
  chain.getChildEdge(edge_reuse, indexA);

  CollideEdgePolygon(manifold, edge_reuse, xfA, fB.getShape() as PolygonShape, xfB);
}

/** @internal */ enum EPAxisType {
  e_unknown = -1,
  e_edgeA = 1,
  e_edgeB = 2,
}

// unused?
/** @internal */ enum VertexType {
  e_isolated = 0,
  e_concave = 1,
  e_convex = 2,
}

/**
 * This structure is used to keep track of the best separating axis.
 */
/** @internal */ class EPAxis {
  type: EPAxisType;
  index: number;
  separation: number;
}

/**
 * This holds polygon B expressed in frame A.
 */
/** @internal */ class TempPolygon {
  vertices: Vec2Value[] = []; // [Settings.maxPolygonVertices]
  normals: Vec2Value[] = []; // [Settings.maxPolygonVertices];
  count: number = 0;
  constructor() {
    for (let i = 0; i < Settings.maxPolygonVertices; i++) {
      this.vertices.push(matrix.vec2(0, 0));
      this.normals.push(matrix.vec2(0, 0));
    }
  }
}

/**
 * Reference face used for clipping
 */
/** @internal */ class ReferenceFace {
  i1: number;
  i2: number;
  readonly v1 = matrix.vec2(0, 0);
  readonly v2 = matrix.vec2(0, 0);
  readonly normal = matrix.vec2(0, 0);
  readonly sideNormal1 = matrix.vec2(0, 0);
  sideOffset1: number;
  readonly sideNormal2 = matrix.vec2(0, 0);
  sideOffset2: number;
  recycle() {
    matrix.zeroVec2(this.v1);
    matrix.zeroVec2(this.v2);
    matrix.zeroVec2(this.normal);
    matrix.zeroVec2(this.sideNormal1);
    matrix.zeroVec2(this.sideNormal2);
  }
}

// reused
/** @internal */ const clipPoints1 = [new ClipVertex(), new ClipVertex()];
/** @internal */ const clipPoints2 = [new ClipVertex(), new ClipVertex()];
/** @internal */ const ie = [new ClipVertex(), new ClipVertex()];
/** @internal */ const edgeAxis = new EPAxis();
/** @internal */ const polygonAxis = new EPAxis();
/** @internal */ const polygonBA = new TempPolygon();
/** @internal */ const rf = new ReferenceFace();
/** @internal */ const centroidB = matrix.vec2(0, 0);
/** @internal */ const edge0 = matrix.vec2(0, 0);
/** @internal */ const edge1 = matrix.vec2(0, 0);
/** @internal */ const edge2 = matrix.vec2(0, 0);
/** @internal */ const xf = matrix.transform(0, 0, 0);
/** @internal */ const normal = matrix.vec2(0, 0);
/** @internal */ const normal0 = matrix.vec2(0, 0);
/** @internal */ const normal1 = matrix.vec2(0, 0);
/** @internal */ const normal2 = matrix.vec2(0, 0);
/** @internal */ const lowerLimit = matrix.vec2(0, 0);
/** @internal */ const upperLimit = matrix.vec2(0, 0);
/** @internal */ const perp = matrix.vec2(0, 0);
/** @internal */ const n = matrix.vec2(0, 0);

/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
export const CollideEdgePolygon = function (
  manifold: Manifold,
  edgeA: EdgeShape,
  xfA: TransformValue,
  polygonB: PolygonShape,
  xfB: TransformValue,
): void {
  // Algorithm:
  // 1. Classify v1 and v2
  // 2. Classify polygon centroid as front or back
  // 3. Flip normal if necessary
  // 4. Initialize normal range to [-pi, pi] about face normal
  // 5. Adjust normal range according to adjacent edges
  // 6. Visit each separating axes, only accept axes within the range
  // 7. Return if _any_ axis indicates separation
  // 8. Clip

  // let m_type1: VertexType;
  // let m_type2: VertexType;

  matrix.detransformTransform(xf, xfA, xfB);
  matrix.transformVec2(centroidB, xf, polygonB.m_centroid);

  const v0 = edgeA.m_vertex0;
  const v1 = edgeA.m_vertex1;
  const v2 = edgeA.m_vertex2;
  const v3 = edgeA.m_vertex3;

  const hasVertex0 = edgeA.m_hasVertex0;
  const hasVertex3 = edgeA.m_hasVertex3;

  matrix.subVec2(edge1, v2, v1);
  matrix.normalizeVec2(edge1);
  matrix.setVec2(normal1, edge1.y, -edge1.x);
  const offset1 = matrix.dotVec2(normal1, centroidB) - matrix.dotVec2(normal1, v1);
  let offset0 = 0.0;
  let offset2 = 0.0;
  let convex1 = false;
  let convex2 = false;

  matrix.zeroVec2(normal0);
  matrix.zeroVec2(normal2);

  // Is there a preceding edge?
  if (hasVertex0) {
    matrix.subVec2(edge0, v1, v0);
    matrix.normalizeVec2(edge0);
    matrix.setVec2(normal0, edge0.y, -edge0.x);
    convex1 = matrix.crossVec2Vec2(edge0, edge1) >= 0.0;
    offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
  }

  // Is there a following edge?
  if (hasVertex3) {
    matrix.subVec2(edge2, v3, v2);
    matrix.normalizeVec2(edge2);
    matrix.setVec2(normal2, edge2.y, -edge2.x);
    convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0.0;
    offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
  }

  let front: boolean;
  matrix.zeroVec2(normal);
  matrix.zeroVec2(lowerLimit);
  matrix.zeroVec2(upperLimit);

  // Determine front or back collision. Determine collision normal limits.
  if (hasVertex0 && hasVertex3) {
    if (convex1 && convex2) {
      front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal0);
        matrix.copyVec2(upperLimit, normal2);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal1);
        matrix.scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex1) {
      front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal0);
        matrix.copyVec2(upperLimit, normal1);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal2);
        matrix.scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex2) {
      front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal1);
        matrix.copyVec2(upperLimit, normal2);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal1);
        matrix.scaleVec2(upperLimit, -1, normal0);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal1);
        matrix.copyVec2(upperLimit, normal1);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal2);
        matrix.scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex0) {
    if (convex1) {
      front = offset0 >= 0.0 || offset1 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal0);
        matrix.scaleVec2(upperLimit, -1, normal1);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.copyVec2(lowerLimit, normal1);
        matrix.scaleVec2(upperLimit, -1, normal1);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.copyVec2(lowerLimit, normal1);
        matrix.scaleVec2(upperLimit, -1, normal1);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.copyVec2(lowerLimit, normal1);
        matrix.scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex3) {
    if (convex2) {
      front = offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal1);
        matrix.copyVec2(upperLimit, normal2);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal1);
        matrix.copyVec2(upperLimit, normal1);
      }
    } else {
      front = offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        matrix.copyVec2(normal, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal1);
        matrix.copyVec2(upperLimit, normal1);
      } else {
        matrix.scaleVec2(normal, -1, normal1);
        matrix.scaleVec2(lowerLimit, -1, normal2);
        matrix.copyVec2(upperLimit, normal1);
      }
    }
  } else {
    front = offset1 >= 0.0;
    if (front) {
      matrix.copyVec2(normal, normal1);
      matrix.scaleVec2(lowerLimit, -1, normal1);
      matrix.scaleVec2(upperLimit, -1, normal1);
    } else {
      matrix.scaleVec2(normal, -1, normal1);
      matrix.copyVec2(lowerLimit, normal1);
      matrix.copyVec2(upperLimit, normal1);
    }
  }

  // Get polygonB in frameA
  polygonBA.count = polygonB.m_count;
  for (let i = 0; i < polygonB.m_count; ++i) {
    matrix.transformVec2(polygonBA.vertices[i], xf, polygonB.m_vertices[i]);
    matrix.rotVec2(polygonBA.normals[i], xf.q, polygonB.m_normals[i]);
  }

  const radius = polygonB.m_radius + edgeA.m_radius;

  manifold.pointCount = 0;

  {
    // ComputeEdgeSeparation
    edgeAxis.type = EPAxisType.e_edgeA;
    edgeAxis.index = front ? 0 : 1;
    edgeAxis.separation = Infinity;

    for (let i = 0; i < polygonBA.count; ++i) {
      const v = polygonBA.vertices[i];
      const s = matrix.dotVec2(normal, v) - matrix.dotVec2(normal, v1);
      if (s < edgeAxis.separation) {
        edgeAxis.separation = s;
      }
    }
  }

  // If no valid normal can be found than this edge should not collide.
  // @ts-ignore todo: why we need this if here?
  if (edgeAxis.type == EPAxisType.e_unknown) {
    return;
  }

  if (edgeAxis.separation > radius) {
    return;
  }

  {
    // ComputePolygonSeparation
    polygonAxis.type = EPAxisType.e_unknown;
    polygonAxis.index = -1;
    polygonAxis.separation = -Infinity;

    matrix.setVec2(perp, -normal.y, normal.x);

    for (let i = 0; i < polygonBA.count; ++i) {
      matrix.scaleVec2(n, -1, polygonBA.normals[i]);

      const s1 = matrix.dotVec2(n, polygonBA.vertices[i]) - matrix.dotVec2(n, v1);
      const s2 = matrix.dotVec2(n, polygonBA.vertices[i]) - matrix.dotVec2(n, v2);
      const s = math_min(s1, s2);

      if (s > radius) {
        // No collision
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
        break;
      }

      // Adjacency
      if (matrix.dotVec2(n, perp) >= 0.0) {
        if (matrix.dotVec2(n, normal) - matrix.dotVec2(upperLimit, normal) < -Settings.angularSlop) {
          continue;
        }
      } else {
        if (matrix.dotVec2(n, normal) - matrix.dotVec2(lowerLimit, normal) < -Settings.angularSlop) {
          continue;
        }
      }

      if (s > polygonAxis.separation) {
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
      }
    }
  }

  if (polygonAxis.type != EPAxisType.e_unknown && polygonAxis.separation > radius) {
    return;
  }

  // Use hysteresis for jitter reduction.
  const k_relativeTol = 0.98;
  const k_absoluteTol = 0.001;

  let primaryAxis: EPAxis;
  if (polygonAxis.type == EPAxisType.e_unknown) {
    primaryAxis = edgeAxis;
  } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
    primaryAxis = polygonAxis;
  } else {
    primaryAxis = edgeAxis;
  }

  ie[0].recycle();
  ie[1].recycle();

  if (primaryAxis.type == EPAxisType.e_edgeA) {
    manifold.type = ManifoldType.e_faceA;

    // Search for the polygon normal that is most anti-parallel to the edge
    // normal.
    let bestIndex = 0;
    let bestValue = matrix.dotVec2(normal, polygonBA.normals[0]);
    for (let i = 1; i < polygonBA.count; ++i) {
      const value = matrix.dotVec2(normal, polygonBA.normals[i]);
      if (value < bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }

    const i1 = bestIndex;
    const i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;

    matrix.copyVec2(ie[0].v, polygonBA.vertices[i1]);
    ie[0].id.setFeatures(0, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);

    matrix.copyVec2(ie[1].v, polygonBA.vertices[i2]);
    ie[1].id.setFeatures(0, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);

    if (front) {
      rf.i1 = 0;
      rf.i2 = 1;
      matrix.copyVec2(rf.v1, v1);
      matrix.copyVec2(rf.v2, v2);
      matrix.copyVec2(rf.normal, normal1);
    } else {
      rf.i1 = 1;
      rf.i2 = 0;
      matrix.copyVec2(rf.v1, v2);
      matrix.copyVec2(rf.v2, v1);
      matrix.scaleVec2(rf.normal, -1, normal1);
    }
  } else {
    manifold.type = ManifoldType.e_faceB;

    matrix.copyVec2(ie[0].v, v1);
    ie[0].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);

    matrix.copyVec2(ie[1].v, v2);
    ie[1].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);

    rf.i1 = primaryAxis.index;
    rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
    matrix.copyVec2(rf.v1, polygonBA.vertices[rf.i1]);
    matrix.copyVec2(rf.v2, polygonBA.vertices[rf.i2]);
    matrix.copyVec2(rf.normal, polygonBA.normals[rf.i1]);
  }

  matrix.setVec2(rf.sideNormal1, rf.normal.y, -rf.normal.x);
  matrix.setVec2(rf.sideNormal2, -rf.sideNormal1.x, -rf.sideNormal1.y);
  rf.sideOffset1 = matrix.dotVec2(rf.sideNormal1, rf.v1);
  rf.sideOffset2 = matrix.dotVec2(rf.sideNormal2, rf.v2);

  // Clip incident edge against extruded edge1 side edges.
  clipPoints1[0].recycle();
  clipPoints1[1].recycle();
  clipPoints2[0].recycle();
  clipPoints2[1].recycle();

  // Clip to box side 1
  const np1 = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);

  if (np1 < Settings.maxManifoldPoints) {
    return;
  }

  // Clip to negative box side 1
  const np2 = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);

  if (np2 < Settings.maxManifoldPoints) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  if (primaryAxis.type == EPAxisType.e_edgeA) {
    matrix.copyVec2(manifold.localNormal, rf.normal);
    matrix.copyVec2(manifold.localPoint, rf.v1);
  } else {
    matrix.copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
    matrix.copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
  }

  let pointCount = 0;
  for (let i = 0; i < Settings.maxManifoldPoints; ++i) {
    const separation = matrix.dotVec2(rf.normal, clipPoints2[i].v) - matrix.dotVec2(rf.normal, rf.v1);

    if (separation <= radius) {
      const cp = manifold.points[pointCount]; // ManifoldPoint

      if (primaryAxis.type == EPAxisType.e_edgeA) {
        matrix.detransformVec2(cp.localPoint, xf, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
      } else {
        matrix.copyVec2(cp.localPoint, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
        cp.id.swapFeatures();
      }

      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
};
