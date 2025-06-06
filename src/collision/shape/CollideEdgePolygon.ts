/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as geo from "../../common/Geo";
import { TransformValue } from "../../common/Transform";
import { Vec2Value } from "../../common/Vec2";
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
      this.vertices.push(geo.vec2(0, 0));
      this.normals.push(geo.vec2(0, 0));
    }
  }
}

/**
 * Reference face used for clipping
 */
/** @internal */ class ReferenceFace {
  i1: number;
  i2: number;
  readonly v1 = geo.vec2(0, 0);
  readonly v2 = geo.vec2(0, 0);
  readonly normal = geo.vec2(0, 0);
  readonly sideNormal1 = geo.vec2(0, 0);
  sideOffset1: number;
  readonly sideNormal2 = geo.vec2(0, 0);
  sideOffset2: number;
  recycle() {
    geo.zeroVec2(this.v1);
    geo.zeroVec2(this.v2);
    geo.zeroVec2(this.normal);
    geo.zeroVec2(this.sideNormal1);
    geo.zeroVec2(this.sideNormal2);
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
/** @internal */ const centroidB = geo.vec2(0, 0);
/** @internal */ const edge0 = geo.vec2(0, 0);
/** @internal */ const edge1 = geo.vec2(0, 0);
/** @internal */ const edge2 = geo.vec2(0, 0);
/** @internal */ const xf = geo.transform(0, 0, 0);
/** @internal */ const normal = geo.vec2(0, 0);
/** @internal */ const normal0 = geo.vec2(0, 0);
/** @internal */ const normal1 = geo.vec2(0, 0);
/** @internal */ const normal2 = geo.vec2(0, 0);
/** @internal */ const lowerLimit = geo.vec2(0, 0);
/** @internal */ const upperLimit = geo.vec2(0, 0);
/** @internal */ const perp = geo.vec2(0, 0);
/** @internal */ const n = geo.vec2(0, 0);

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

  geo.detransformTransform(xf, xfA, xfB);
  geo.transformVec2(centroidB, xf, polygonB.m_centroid);

  const v0 = edgeA.m_vertex0;
  const v1 = edgeA.m_vertex1;
  const v2 = edgeA.m_vertex2;
  const v3 = edgeA.m_vertex3;

  const hasVertex0 = edgeA.m_hasVertex0;
  const hasVertex3 = edgeA.m_hasVertex3;

  geo.subVec2(edge1, v2, v1);
  geo.normalizeVec2(edge1);
  geo.setVec2(normal1, edge1.y, -edge1.x);
  const offset1 = geo.dotVec2(normal1, centroidB) - geo.dotVec2(normal1, v1);
  let offset0 = 0.0;
  let offset2 = 0.0;
  let convex1 = false;
  let convex2 = false;

  geo.zeroVec2(normal0);
  geo.zeroVec2(normal2);

  // Is there a preceding edge?
  if (hasVertex0) {
    geo.subVec2(edge0, v1, v0);
    geo.normalizeVec2(edge0);
    geo.setVec2(normal0, edge0.y, -edge0.x);
    convex1 = geo.crossVec2Vec2(edge0, edge1) >= 0.0;
    offset0 = geo.dotVec2(normal0, centroidB) - geo.dotVec2(normal0, v0);
  }

  // Is there a following edge?
  if (hasVertex3) {
    geo.subVec2(edge2, v3, v2);
    geo.normalizeVec2(edge2);
    geo.setVec2(normal2, edge2.y, -edge2.x);
    convex2 = geo.crossVec2Vec2(edge1, edge2) > 0.0;
    offset2 = geo.dotVec2(normal2, centroidB) - geo.dotVec2(normal2, v2);
  }

  let front: boolean;
  geo.zeroVec2(normal);
  geo.zeroVec2(lowerLimit);
  geo.zeroVec2(upperLimit);

  // Determine front or back collision. Determine collision normal limits.
  if (hasVertex0 && hasVertex3) {
    if (convex1 && convex2) {
      front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal0);
        geo.copyVec2(upperLimit, normal2);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal1);
        geo.scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex1) {
      front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal0);
        geo.copyVec2(upperLimit, normal1);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal2);
        geo.scaleVec2(upperLimit, -1, normal1);
      }
    } else if (convex2) {
      front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal1);
        geo.copyVec2(upperLimit, normal2);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal1);
        geo.scaleVec2(upperLimit, -1, normal0);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal1);
        geo.copyVec2(upperLimit, normal1);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal2);
        geo.scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex0) {
    if (convex1) {
      front = offset0 >= 0.0 || offset1 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal0);
        geo.scaleVec2(upperLimit, -1, normal1);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.copyVec2(lowerLimit, normal1);
        geo.scaleVec2(upperLimit, -1, normal1);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.copyVec2(lowerLimit, normal1);
        geo.scaleVec2(upperLimit, -1, normal1);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.copyVec2(lowerLimit, normal1);
        geo.scaleVec2(upperLimit, -1, normal0);
      }
    }
  } else if (hasVertex3) {
    if (convex2) {
      front = offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.scaleVec2(lowerLimit, -1, normal1);
        geo.copyVec2(upperLimit, normal2);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal1);
        geo.copyVec2(upperLimit, normal1);
      }
    } else {
      front = offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        geo.copyVec2(normal, normal1);
        geo.scaleVec2(lowerLimit, -1, normal1);
        geo.copyVec2(upperLimit, normal1);
      } else {
        geo.scaleVec2(normal, -1, normal1);
        geo.scaleVec2(lowerLimit, -1, normal2);
        geo.copyVec2(upperLimit, normal1);
      }
    }
  } else {
    front = offset1 >= 0.0;
    if (front) {
      geo.copyVec2(normal, normal1);
      geo.scaleVec2(lowerLimit, -1, normal1);
      geo.scaleVec2(upperLimit, -1, normal1);
    } else {
      geo.scaleVec2(normal, -1, normal1);
      geo.copyVec2(lowerLimit, normal1);
      geo.copyVec2(upperLimit, normal1);
    }
  }

  // Get polygonB in frameA
  polygonBA.count = polygonB.m_count;
  for (let i = 0; i < polygonB.m_count; ++i) {
    geo.transformVec2(polygonBA.vertices[i], xf, polygonB.m_vertices[i]);
    geo.rotVec2(polygonBA.normals[i], xf.q, polygonB.m_normals[i]);
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
      const s = geo.dotVec2(normal, v) - geo.dotVec2(normal, v1);
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

    geo.setVec2(perp, -normal.y, normal.x);

    for (let i = 0; i < polygonBA.count; ++i) {
      geo.scaleVec2(n, -1, polygonBA.normals[i]);

      const s1 = geo.dotVec2(n, polygonBA.vertices[i]) - geo.dotVec2(n, v1);
      const s2 = geo.dotVec2(n, polygonBA.vertices[i]) - geo.dotVec2(n, v2);
      const s = math_min(s1, s2);

      if (s > radius) {
        // No collision
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
        break;
      }

      // Adjacency
      if (geo.dotVec2(n, perp) >= 0.0) {
        if (geo.dotVec2(n, normal) - geo.dotVec2(upperLimit, normal) < -Settings.angularSlop) {
          continue;
        }
      } else {
        if (geo.dotVec2(n, normal) - geo.dotVec2(lowerLimit, normal) < -Settings.angularSlop) {
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
    let bestValue = geo.dotVec2(normal, polygonBA.normals[0]);
    for (let i = 1; i < polygonBA.count; ++i) {
      const value = geo.dotVec2(normal, polygonBA.normals[i]);
      if (value < bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }

    const i1 = bestIndex;
    const i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;

    geo.copyVec2(ie[0].v, polygonBA.vertices[i1]);
    ie[0].id.setFeatures(0, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);

    geo.copyVec2(ie[1].v, polygonBA.vertices[i2]);
    ie[1].id.setFeatures(0, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);

    if (front) {
      rf.i1 = 0;
      rf.i2 = 1;
      geo.copyVec2(rf.v1, v1);
      geo.copyVec2(rf.v2, v2);
      geo.copyVec2(rf.normal, normal1);
    } else {
      rf.i1 = 1;
      rf.i2 = 0;
      geo.copyVec2(rf.v1, v2);
      geo.copyVec2(rf.v2, v1);
      geo.scaleVec2(rf.normal, -1, normal1);
    }
  } else {
    manifold.type = ManifoldType.e_faceB;

    geo.copyVec2(ie[0].v, v1);
    ie[0].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);

    geo.copyVec2(ie[1].v, v2);
    ie[1].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);

    rf.i1 = primaryAxis.index;
    rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
    geo.copyVec2(rf.v1, polygonBA.vertices[rf.i1]);
    geo.copyVec2(rf.v2, polygonBA.vertices[rf.i2]);
    geo.copyVec2(rf.normal, polygonBA.normals[rf.i1]);
  }

  geo.setVec2(rf.sideNormal1, rf.normal.y, -rf.normal.x);
  geo.setVec2(rf.sideNormal2, -rf.sideNormal1.x, -rf.sideNormal1.y);
  rf.sideOffset1 = geo.dotVec2(rf.sideNormal1, rf.v1);
  rf.sideOffset2 = geo.dotVec2(rf.sideNormal2, rf.v2);

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
    geo.copyVec2(manifold.localNormal, rf.normal);
    geo.copyVec2(manifold.localPoint, rf.v1);
  } else {
    geo.copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
    geo.copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
  }

  let pointCount = 0;
  for (let i = 0; i < Settings.maxManifoldPoints; ++i) {
    const separation = geo.dotVec2(rf.normal, clipPoints2[i].v) - geo.dotVec2(rf.normal, rf.v1);

    if (separation <= radius) {
      const cp = manifold.points[pointCount]; // ManifoldPoint

      if (primaryAxis.type == EPAxisType.e_edgeA) {
        geo.detransformVec2(cp.localPoint, xf, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
      } else {
        geo.copyVec2(cp.localPoint, clipPoints2[i].v);
        cp.id.set(clipPoints2[i].id);
        cp.id.swapFeatures();
      }

      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
};
