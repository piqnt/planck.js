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
import Rot from '../../common/Rot';
import Settings from '../../Settings';
import Contact from '../../dynamics/Contact';
import Manifold, { clipSegmentToLine, ClipVertex, ContactFeatureType, ManifoldType } from '../Manifold';
import EdgeShape from './EdgeShape';
import ChainShape from './ChainShape';
import PolygonShape from './PolygonShape';
import Fixture from "../../dynamics/Fixture";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);

function EdgePolygonContact(manifold: Manifold, xfA: Transform, fA: Fixture, indexA: number, xfB: Transform, fB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fA.getType() == EdgeShape.TYPE);
  _ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);

  CollideEdgePolygon(manifold, fA.getShape() as EdgeShape, xfA, fB.getShape() as PolygonShape, xfB);
}

function ChainPolygonContact(manifold: Manifold, xfA: Transform, fA: Fixture, indexA: number, xfB: Transform, fB: Fixture, indexB: number): void {
  _ASSERT && common.assert(fA.getType() == ChainShape.TYPE);
  _ASSERT && common.assert(fB.getType() == PolygonShape.TYPE);

  const chain = fA.getShape() as ChainShape;
  const edge = new EdgeShape();
  chain.getChildEdge(edge, indexA);

  CollideEdgePolygon(manifold, edge, xfA, fB.getShape() as PolygonShape, xfB);
}

enum EPAxisType {
  e_unknown = -1,
  e_edgeA = 1,
  e_edgeB = 2,
}

// unused?
enum VertexType {
 e_isolated = 0,
 e_concave = 1,
 e_convex = 2,
}

/**
 * This structure is used to keep track of the best separating axis.
 */
class EPAxis {
  type: EPAxisType;
  index: number;
  separation: number;
}

/**
 * This holds polygon B expressed in frame A.
 */
class TempPolygon {
  vertices: Vec2[] = []; // [Settings.maxPolygonVertices]
  normals: Vec2[] = []; // [Settings.maxPolygonVertices];
  count: number = 0;
}

/**
 * Reference face used for clipping
 */
class ReferenceFace {
  i1: number;
  i2: number;
  v1: Vec2;
  v2: Vec2;
  normal: Vec2 = Vec2.zero();
  sideNormal1: Vec2 = Vec2.zero();
  sideOffset1: number;
  sideNormal2: Vec2 = Vec2.zero();
  sideOffset2: number;
}

// reused
const edgeAxis = new EPAxis();
const polygonAxis = new EPAxis();
const polygonBA = new TempPolygon();
const rf = new ReferenceFace();

/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
export function CollideEdgePolygon(manifold: Manifold, edgeA: EdgeShape, xfA: Transform, polygonB: PolygonShape, xfB: Transform): void {
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

  const xf = Transform.mulTXf(xfA, xfB);

  const centroidB = Transform.mulVec2(xf, polygonB.m_centroid);

  const v0 = edgeA.m_vertex0;
  const v1 = edgeA.m_vertex1;
  const v2 = edgeA.m_vertex2;
  const v3 = edgeA.m_vertex3;

  const hasVertex0 = edgeA.m_hasVertex0;
  const hasVertex3 = edgeA.m_hasVertex3;

  const edge1 = Vec2.sub(v2, v1);
  edge1.normalize();
  const normal1 = Vec2.neo(edge1.y, -edge1.x);
  const offset1 = Vec2.dot(normal1, Vec2.sub(centroidB, v1));
  let offset0 = 0.0;
  let offset2 = 0.0;
  let convex1 = false;
  let convex2 = false;

  let normal0;
  let normal2;

  // Is there a preceding edge?
  if (hasVertex0) {
    const edge0 = Vec2.sub(v1, v0);
    edge0.normalize();
    normal0 = Vec2.neo(edge0.y, -edge0.x);
    convex1 = Vec2.crossVec2Vec2(edge0, edge1) >= 0.0;
    offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
  }

  // Is there a following edge?
  if (hasVertex3) {
    const edge2 = Vec2.sub(v3, v2);
    edge2.normalize();
    normal2 = Vec2.neo(edge2.y, -edge2.x);
    convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0.0;
    offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
  }

  let front;
  const normal = Vec2.zero();
  const lowerLimit = Vec2.zero();
  const upperLimit = Vec2.zero();

  // Determine front or back collision. Determine collision normal limits.
  if (hasVertex0 && hasVertex3) {
    if (convex1 && convex2) {
      front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal0);
        upperLimit.setVec2(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setMul(-1, normal1);
      }
    } else if (convex1) {
      front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal0);
        upperLimit.setVec2(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.setMul(-1, normal1);
      }
    } else if (convex2) {
      front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal1);
        upperLimit.setVec2(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setMul(-1, normal0);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal1);
        upperLimit.setVec2(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.setMul(-1, normal0);
      }
    }
  } else if (hasVertex0) {
    if (convex1) {
      front = offset0 >= 0.0 || offset1 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal0);
        upperLimit.setMul(-1, normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setVec2(normal1);
        upperLimit.setMul(-1, normal1);
      }
    } else {
      front = offset0 >= 0.0 && offset1 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setVec2(normal1);
        upperLimit.setMul(-1, normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setVec2(normal1);
        upperLimit.setMul(-1, normal0);
      }
    }
  } else if (hasVertex3) {
    if (convex2) {
      front = offset1 >= 0.0 || offset2 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setVec2(normal2);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setVec2(normal1);
      }
    } else {
      front = offset1 >= 0.0 && offset2 >= 0.0;
      if (front) {
        normal.setVec2(normal1);
        lowerLimit.setMul(-1, normal1);
        upperLimit.setVec2(normal1);
      } else {
        normal.setMul(-1, normal1);
        lowerLimit.setMul(-1, normal2);
        upperLimit.setVec2(normal1);
      }
    }
  } else {
    front = offset1 >= 0.0;
    if (front) {
      normal.setVec2(normal1);
      lowerLimit.setMul(-1, normal1);
      upperLimit.setMul(-1, normal1);
    } else {
      normal.setMul(-1, normal1);
      lowerLimit.setVec2(normal1);
      upperLimit.setVec2(normal1);
    }
  }

  // Get polygonB in frameA
  polygonBA.count = polygonB.m_count;
  for (let i = 0; i < polygonB.m_count; ++i) {
    polygonBA.vertices[i] = Transform.mulVec2(xf, polygonB.m_vertices[i]);
    polygonBA.normals[i] = Rot.mulVec2(xf.q, polygonB.m_normals[i]);
  }

  const radius = 2.0 * Settings.polygonRadius;

  manifold.pointCount = 0;

  { // ComputeEdgeSeparation
    edgeAxis.type = EPAxisType.e_edgeA;
    edgeAxis.index = front ? 0 : 1;
    edgeAxis.separation = Infinity;

    for (let i = 0; i < polygonBA.count; ++i) {
      const s = Vec2.dot(normal, Vec2.sub(polygonBA.vertices[i], v1));
      if (s < edgeAxis.separation) {
        edgeAxis.separation = s;
      }
    }
  }

  // If no valid normal can be found than this edge should not collide.
  // @ts-ignore
  if (edgeAxis.type == EPAxisType.e_unknown) {
    return;
  }

  if (edgeAxis.separation > radius) {
    return;
  }

  { // ComputePolygonSeparation
    polygonAxis.type = EPAxisType.e_unknown;
    polygonAxis.index = -1;
    polygonAxis.separation = -Infinity;

    const perp = Vec2.neo(-normal.y, normal.x);

    for (let i = 0; i < polygonBA.count; ++i) {
      const n = Vec2.neg(polygonBA.normals[i]);

      const s1 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v1));
      const s2 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v2));
      const s = Math.min(s1, s2);

      if (s > radius) {
        // No collision
        polygonAxis.type = EPAxisType.e_edgeB;
        polygonAxis.index = i;
        polygonAxis.separation = s;
        break;
      }

      // Adjacency
      if (Vec2.dot(n, perp) >= 0.0) {
        if (Vec2.dot(Vec2.sub(n, upperLimit), normal) < -Settings.angularSlop) {
          continue;
        }
      } else {
        if (Vec2.dot(Vec2.sub(n, lowerLimit), normal) < -Settings.angularSlop) {
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

  let primaryAxis;
  if (polygonAxis.type == EPAxisType.e_unknown) {
    primaryAxis = edgeAxis;
  } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
    primaryAxis = polygonAxis;
  } else {
    primaryAxis = edgeAxis;
  }

  const ie = [ new ClipVertex(), new ClipVertex() ];

  if (primaryAxis.type == EPAxisType.e_edgeA) {
    manifold.type = ManifoldType.e_faceA;

    // Search for the polygon normal that is most anti-parallel to the edge
    // normal.
    let bestIndex = 0;
    let bestValue = Vec2.dot(normal, polygonBA.normals[0]);
    for (let i = 1; i < polygonBA.count; ++i) {
      const value = Vec2.dot(normal, polygonBA.normals[i]);
      if (value < bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }

    const i1 = bestIndex;
    const i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;

    ie[0].v = polygonBA.vertices[i1];
    ie[0].id.cf.indexA = 0;
    ie[0].id.cf.indexB = i1;
    ie[0].id.cf.typeA = ContactFeatureType.e_face;
    ie[0].id.cf.typeB = ContactFeatureType.e_vertex;

    ie[1].v = polygonBA.vertices[i2];
    ie[1].id.cf.indexA = 0;
    ie[1].id.cf.indexB = i2;
    ie[1].id.cf.typeA = ContactFeatureType.e_face;
    ie[1].id.cf.typeB = ContactFeatureType.e_vertex;

    if (front) {
      rf.i1 = 0;
      rf.i2 = 1;
      rf.v1 = v1;
      rf.v2 = v2;
      rf.normal.setVec2(normal1);
    } else {
      rf.i1 = 1;
      rf.i2 = 0;
      rf.v1 = v2;
      rf.v2 = v1;
      rf.normal.setMul(-1, normal1);
    }
  } else {
    manifold.type = ManifoldType.e_faceB;

    ie[0].v = v1;
    ie[0].id.cf.indexA = 0;
    ie[0].id.cf.indexB = primaryAxis.index;
    ie[0].id.cf.typeA = ContactFeatureType.e_vertex;
    ie[0].id.cf.typeB = ContactFeatureType.e_face;

    ie[1].v = v2;
    ie[1].id.cf.indexA = 0;
    ie[1].id.cf.indexB = primaryAxis.index;
    ie[1].id.cf.typeA = ContactFeatureType.e_vertex;
    ie[1].id.cf.typeB = ContactFeatureType.e_face;

    rf.i1 = primaryAxis.index;
    rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
    rf.v1 = polygonBA.vertices[rf.i1];
    rf.v2 = polygonBA.vertices[rf.i2];
    rf.normal.setVec2(polygonBA.normals[rf.i1]);
  }

  rf.sideNormal1.setNum(rf.normal.y, -rf.normal.x);
  rf.sideNormal2.setMul(-1, rf.sideNormal1);
  rf.sideOffset1 = Vec2.dot(rf.sideNormal1, rf.v1);
  rf.sideOffset2 = Vec2.dot(rf.sideNormal2, rf.v2);

  // Clip incident edge against extruded edge1 side edges.
  const clipPoints1 = [ new ClipVertex(), new ClipVertex() ];
  const clipPoints2 = [ new ClipVertex(), new ClipVertex() ];

  let np;

  // Clip to box side 1
  np = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Clip to negative box side 1
  np = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);

  if (np < Settings.maxManifoldPoints) {
    return;
  }

  // Now clipPoints2 contains the clipped points.
  if (primaryAxis.type == EPAxisType.e_edgeA) {
    manifold.localNormal = Vec2.clone(rf.normal);
    manifold.localPoint = Vec2.clone(rf.v1);
  } else {
    manifold.localNormal = Vec2.clone(polygonB.m_normals[rf.i1]);
    manifold.localPoint = Vec2.clone(polygonB.m_vertices[rf.i1]);
  }

  let pointCount = 0;
  for (let i = 0; i < Settings.maxManifoldPoints; ++i) {
    const separation = Vec2.dot(rf.normal, Vec2.sub(clipPoints2[i].v, rf.v1));

    if (separation <= radius) {
      const cp = manifold.points[pointCount]; // ManifoldPoint

      if (primaryAxis.type == EPAxisType.e_edgeA) {
        cp.localPoint = Transform.mulTVec2(xf, clipPoints2[i].v);
        cp.id = clipPoints2[i].id;
      } else {
        cp.localPoint = clipPoints2[i].v;
        cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
        cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
        cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
        cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
      }

      ++pointCount;
    }
  }

  manifold.pointCount = pointCount;
}
