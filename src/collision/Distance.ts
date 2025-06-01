/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../common/Matrix";
import { SettingsInternal as Settings } from "../Settings";
import { stats } from "../util/stats";
import { Shape } from "./Shape";
import { EPSILON } from "../common/Math";
import { Vec2, Vec2Value } from "../common/Vec2";
import { Rot } from "../common/Rot";
import { Transform, TransformValue } from "../common/Transform";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_max = Math.max;

/** @internal */ const temp = matrix.vec2(0, 0);
/** @internal */ const normal = matrix.vec2(0, 0);
/** @internal */ const e12 = matrix.vec2(0, 0);
/** @internal */ const e13 = matrix.vec2(0, 0);
/** @internal */ const e23 = matrix.vec2(0, 0);
/** @internal */ const temp1 = matrix.vec2(0, 0);
/** @internal */ const temp2 = matrix.vec2(0, 0);

/**
 * GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.
 */

stats.gjkCalls = 0;
stats.gjkIters = 0;
stats.gjkMaxIters = 0;

/**
 * Input for Distance. You have to option to use the shape radii in the
 * computation. Even
 */
export class DistanceInput {
  readonly proxyA = new DistanceProxy();
  readonly proxyB = new DistanceProxy();
  readonly transformA = Transform.identity();
  readonly transformB = Transform.identity();
  useRadii = false;
  recycle() {
    this.proxyA.recycle();
    this.proxyB.recycle();
    this.transformA.setIdentity();
    this.transformB.setIdentity();
    this.useRadii = false;
  }
}

/**
 * Output for Distance.
 */
export class DistanceOutput {
  /** closest point on shapeA */
  pointA = matrix.vec2(0, 0);
  /** closest point on shapeB */
  pointB = matrix.vec2(0, 0);
  distance = 0;
  /** iterations number of GJK iterations used */
  iterations = 0;
  recycle() {
    matrix.zeroVec2(this.pointA);
    matrix.zeroVec2(this.pointB);
    this.distance = 0;
    this.iterations = 0;
  }
}

/**
 * Used to warm start Distance. Set count to zero on first call.
 */
export class SimplexCache {
  /** length or area */
  metric: number = 0;
  /** vertices on shape A */
  indexA: number[] = [];
  /** vertices on shape B */
  indexB: number[] = [];
  count: number = 0;
  recycle() {
    this.metric = 0;
    this.indexA.length = 0;
    this.indexB.length = 0;
    this.count = 0;
  }
}

/**
 * Compute the closest points between two shapes. Supports any combination of:
 * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
 * the first call set SimplexCache.count to zero.
 */
export const Distance = function (output: DistanceOutput, cache: SimplexCache, input: DistanceInput): void {
  ++stats.gjkCalls;

  const proxyA = input.proxyA;
  const proxyB = input.proxyB;
  const xfA = input.transformA;
  const xfB = input.transformB;

  // Initialize the simplex.
  // const simplex = new Simplex();
  simplex.recycle();
  simplex.readCache(cache, proxyA, xfA, proxyB, xfB);

  // Get simplex vertices as an array.
  const vertices = simplex.m_v;
  const k_maxIters = Settings.maxDistanceIterations;

  // These store the vertices of the last simplex so that we
  // can check for duplicates and prevent cycling.
  const saveA = [];
  const saveB = []; // int[3]
  let saveCount = 0;

  // Main iteration loop.
  let iter = 0;
  while (iter < k_maxIters) {
    // Copy simplex so we can identify duplicates.
    saveCount = simplex.m_count;
    for (let i = 0; i < saveCount; ++i) {
      saveA[i] = vertices[i].indexA;
      saveB[i] = vertices[i].indexB;
    }

    simplex.solve();

    // If we have 3 points, then the origin is in the corresponding triangle.
    if (simplex.m_count === 3) {
      break;
    }

    // Get search direction.
    const d = simplex.getSearchDirection();

    // Ensure the search direction is numerically fit.
    if (matrix.lengthSqrVec2(d) < EPSILON * EPSILON) {
      // The origin is probably contained by a line segment
      // or triangle. Thus the shapes are overlapped.

      // We can't return zero here even though there may be overlap.
      // In case the simplex is a point, segment, or triangle it is difficult
      // to determine if the origin is contained in the CSO or very close to it.
      break;
    }

    // Compute a tentative new simplex vertex using support points.
    const vertex = vertices[simplex.m_count]; // SimplexVertex

    vertex.indexA = proxyA.getSupport(matrix.derotVec2(temp, xfA.q, matrix.scaleVec2(temp, -1, d)));
    matrix.transformVec2(vertex.wA, xfA, proxyA.getVertex(vertex.indexA));

    vertex.indexB = proxyB.getSupport(matrix.derotVec2(temp, xfB.q, d));
    matrix.transformVec2(vertex.wB, xfB, proxyB.getVertex(vertex.indexB));

    matrix.subVec2(vertex.w, vertex.wB, vertex.wA);

    // Iteration count is equated to the number of support point calls.
    ++iter;
    ++stats.gjkIters;

    // Check for duplicate support points. This is the main termination
    // criteria.
    let duplicate = false;
    for (let i = 0; i < saveCount; ++i) {
      if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
        duplicate = true;
        break;
      }
    }

    // If we found a duplicate support point we must exit to avoid cycling.
    if (duplicate) {
      break;
    }

    // New vertex is ok and needed.
    ++simplex.m_count;
  }

  stats.gjkMaxIters = math_max(stats.gjkMaxIters, iter);

  // Prepare output.
  simplex.getWitnessPoints(output.pointA, output.pointB);
  output.distance = matrix.distVec2(output.pointA, output.pointB);
  output.iterations = iter;

  // Cache the simplex.
  simplex.writeCache(cache);

  // Apply radii if requested.
  if (input.useRadii) {
    const rA = proxyA.m_radius;
    const rB = proxyB.m_radius;

    if (output.distance > rA + rB && output.distance > EPSILON) {
      // Shapes are still no overlapped.
      // Move the witness points to the outer surface.
      output.distance -= rA + rB;
      matrix.subVec2(normal, output.pointB, output.pointA);
      matrix.normalizeVec2(normal);
      matrix.plusScaleVec2(output.pointA, rA, normal);
      matrix.minusScaleVec2(output.pointB, rB, normal);
    } else {
      // Shapes are overlapped when radii are considered.
      // Move the witness points to the middle.
      const p = matrix.subVec2(temp, output.pointA, output.pointB);
      matrix.copyVec2(output.pointA, p);
      matrix.copyVec2(output.pointB, p);
      output.distance = 0.0;
    }
  }
};

/**
 * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
 */
export class DistanceProxy {
  /** @internal */ m_vertices: Vec2Value[] = [];
  // todo: remove this?
  /** @internal */ m_count = 0;
  /** @internal */ m_radius = 0;

  recycle() {
    this.m_vertices.length = 0;
    this.m_count = 0;
    this.m_radius = 0;
  }

  /**
   * Get the vertex count.
   */
  getVertexCount(): number {
    return this.m_count;
  }

  /**
   * Get a vertex by index. Used by Distance.
   */
  getVertex(index: number): Vec2Value {
    if (_ASSERT) console.assert(0 <= index && index < this.m_count);
    return this.m_vertices[index];
  }

  /**
   * Get the supporting vertex index in the given direction.
   */
  getSupport(d: Vec2Value): number {
    let bestIndex = -1;
    let bestValue = -Infinity;
    for (let i = 0; i < this.m_count; ++i) {
      const value = matrix.dotVec2(this.m_vertices[i], d);
      if (value > bestValue) {
        bestIndex = i;
        bestValue = value;
      }
    }
    return bestIndex;
  }

  /**
   * Get the supporting vertex in the given direction.
   */
  getSupportVertex(d: Vec2Value): Vec2Value {
    return this.m_vertices[this.getSupport(d)];
  }

  /**
   * Initialize the proxy using the given shape. The shape must remain in scope
   * while the proxy is in use.
   */
  set(shape: Shape, index: number): void {
    // TODO remove, use shape instead
    if (_ASSERT) console.assert(typeof shape.computeDistanceProxy === "function");
    shape.computeDistanceProxy(this, index);
  }

  /**
   * Initialize the proxy using a vertex cloud and radius. The vertices
   * must remain in scope while the proxy is in use.
   */
  setVertices(vertices: Vec2Value[], count: number, radius: number) {
    this.m_vertices = vertices;
    this.m_count = count;
    this.m_radius = radius;
  }
}

class SimplexVertex {
  /** support point in proxyA */
  wA = matrix.vec2(0, 0);
  /** wA index */
  indexA = 0;

  /** support point in proxyB */
  wB = matrix.vec2(0, 0);
  /** wB index */
  indexB = 0;

  /** wB - wA; */
  w = matrix.vec2(0, 0);
  /** barycentric coordinate for closest point */
  a = 0;

  recycle() {
    this.indexA = 0;
    this.indexB = 0;
    matrix.zeroVec2(this.wA);
    matrix.zeroVec2(this.wB);
    matrix.zeroVec2(this.w);
    this.a = 0;
  }
  set(v: SimplexVertex): void {
    this.indexA = v.indexA;
    this.indexB = v.indexB;
    matrix.copyVec2(this.wA, v.wA);
    matrix.copyVec2(this.wB, v.wB);
    matrix.copyVec2(this.w, v.w);
    this.a = v.a;
  }
}

/** @internal */ const searchDirection_reuse = matrix.vec2(0, 0);
/** @internal */ const closestPoint_reuse = matrix.vec2(0, 0);

class Simplex {
  m_v1 = new SimplexVertex();
  m_v2 = new SimplexVertex();
  m_v3 = new SimplexVertex();
  m_v = [this.m_v1, this.m_v2, this.m_v3];
  m_count: number;
  recycle() {
    this.m_v1.recycle();
    this.m_v2.recycle();
    this.m_v3.recycle();
    this.m_count = 0;
  }

  /** @internal */ toString(): string {
    if (this.m_count === 3) {
      return [
        "+" + this.m_count,
        this.m_v1.a,
        this.m_v1.wA.x,
        this.m_v1.wA.y,
        this.m_v1.wB.x,
        this.m_v1.wB.y,
        this.m_v2.a,
        this.m_v2.wA.x,
        this.m_v2.wA.y,
        this.m_v2.wB.x,
        this.m_v2.wB.y,
        this.m_v3.a,
        this.m_v3.wA.x,
        this.m_v3.wA.y,
        this.m_v3.wB.x,
        this.m_v3.wB.y,
      ].toString();
    } else if (this.m_count === 2) {
      return [
        "+" + this.m_count,
        this.m_v1.a,
        this.m_v1.wA.x,
        this.m_v1.wA.y,
        this.m_v1.wB.x,
        this.m_v1.wB.y,
        this.m_v2.a,
        this.m_v2.wA.x,
        this.m_v2.wA.y,
        this.m_v2.wB.x,
        this.m_v2.wB.y,
      ].toString();
    } else if (this.m_count === 1) {
      return [
        "+" + this.m_count,
        this.m_v1.a,
        this.m_v1.wA.x,
        this.m_v1.wA.y,
        this.m_v1.wB.x,
        this.m_v1.wB.y,
      ].toString();
    } else {
      return "+" + this.m_count;
    }
  }

  readCache(
    cache: SimplexCache,
    proxyA: DistanceProxy,
    transformA: TransformValue,
    proxyB: DistanceProxy,
    transformB: TransformValue,
  ): void {
    if (_ASSERT) console.assert(cache.count <= 3);

    // Copy data from cache.
    this.m_count = cache.count;
    for (let i = 0; i < this.m_count; ++i) {
      const v = this.m_v[i];
      v.indexA = cache.indexA[i];
      v.indexB = cache.indexB[i];
      const wALocal = proxyA.getVertex(v.indexA);
      const wBLocal = proxyB.getVertex(v.indexB);
      matrix.transformVec2(v.wA, transformA, wALocal);
      matrix.transformVec2(v.wB, transformB, wBLocal);
      matrix.subVec2(v.w, v.wB, v.wA);
      v.a = 0.0;
    }

    // Compute the new simplex metric, if it is substantially different than
    // old metric then flush the simplex.
    if (this.m_count > 1) {
      const metric1 = cache.metric;
      const metric2 = this.getMetric();
      if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < EPSILON) {
        // Reset the simplex.
        this.m_count = 0;
      }
    }

    // If the cache is empty or invalid...
    if (this.m_count === 0) {
      const v = this.m_v[0];
      v.indexA = 0;
      v.indexB = 0;
      const wALocal = proxyA.getVertex(0);
      const wBLocal = proxyB.getVertex(0);
      matrix.transformVec2(v.wA, transformA, wALocal);
      matrix.transformVec2(v.wB, transformB, wBLocal);
      matrix.subVec2(v.w, v.wB, v.wA);
      v.a = 1.0;
      this.m_count = 1;
    }
  }

  writeCache(cache: SimplexCache): void {
    cache.metric = this.getMetric();
    cache.count = this.m_count;
    for (let i = 0; i < this.m_count; ++i) {
      cache.indexA[i] = this.m_v[i].indexA;
      cache.indexB[i] = this.m_v[i].indexB;
    }
  }

  getSearchDirection(): Vec2Value {
    const v1 = this.m_v1;
    const v2 = this.m_v2;
    // const v3 = this.m_v3;
    switch (this.m_count) {
      case 1:
        return matrix.setVec2(searchDirection_reuse, -v1.w.x, -v1.w.y);

      case 2: {
        matrix.subVec2(e12, v2.w, v1.w);
        const sgn = -matrix.crossVec2Vec2(e12, v1.w);
        if (sgn > 0.0) {
          // Origin is left of e12.
          return matrix.setVec2(searchDirection_reuse, -e12.y, e12.x);
        } else {
          // Origin is right of e12.
          return matrix.setVec2(searchDirection_reuse, e12.y, -e12.x);
        }
      }

      default:
        if (_ASSERT) console.assert(false);
        return matrix.zeroVec2(searchDirection_reuse);
    }
  }

  getClosestPoint(): Vec2Value {
    const v1 = this.m_v1;
    const v2 = this.m_v2;
    // const v3 = this.m_v3;
    switch (this.m_count) {
      case 0:
        if (_ASSERT) console.assert(false);
        return matrix.zeroVec2(closestPoint_reuse);

      case 1:
        return matrix.copyVec2(closestPoint_reuse, v1.w);

      case 2:
        return matrix.combine2Vec2(closestPoint_reuse, v1.a, v1.w, v2.a, v2.w);

      case 3:
        return matrix.zeroVec2(closestPoint_reuse);

      default:
        if (_ASSERT) console.assert(false);
        return matrix.zeroVec2(closestPoint_reuse);
    }
  }

  getWitnessPoints(pA: Vec2Value, pB: Vec2Value): void {
    const v1 = this.m_v1;
    const v2 = this.m_v2;
    const v3 = this.m_v3;
    switch (this.m_count) {
      case 0:
        if (_ASSERT) console.assert(false);
        break;

      case 1:
        matrix.copyVec2(pA, v1.wA);
        matrix.copyVec2(pB, v1.wB);
        break;

      case 2:
        matrix.combine2Vec2(pA, v1.a, v1.wA, v2.a, v2.wA);
        matrix.combine2Vec2(pB, v1.a, v1.wB, v2.a, v2.wB);
        break;

      case 3:
        matrix.combine3Vec2(pA, v1.a, v1.wA, v2.a, v2.wA, v3.a, v3.wA);
        matrix.copyVec2(pB, pA);
        break;

      default:
        if (_ASSERT) console.assert(false);
        break;
    }
  }

  getMetric(): number {
    switch (this.m_count) {
      case 0:
        if (_ASSERT) console.assert(false);
        return 0.0;

      case 1:
        return 0.0;

      case 2:
        return matrix.distVec2(this.m_v1.w, this.m_v2.w);

      case 3:
        return matrix.crossVec2Vec2(
          matrix.subVec2(temp1, this.m_v2.w, this.m_v1.w),
          matrix.subVec2(temp2, this.m_v3.w, this.m_v1.w),
        );

      default:
        if (_ASSERT) console.assert(false);
        return 0.0;
    }
  }

  solve(): void {
    switch (this.m_count) {
      case 1:
        break;

      case 2:
        this.solve2();
        break;

      case 3:
        this.solve3();
        break;

      default:
        if (_ASSERT) console.assert(false);
    }
  }

  // Solve a line segment using barycentric coordinates.
  //
  // p = a1 * w1 + a2 * w2
  // a1 + a2 = 1
  //
  // The vector from the origin to the closest point on the line is
  // perpendicular to the line.
  // e12 = w2 - w1
  // dot(p, e) = 0
  // a1 * dot(w1, e) + a2 * dot(w2, e) = 0
  //
  // 2-by-2 linear system
  // [1 1 ][a1] = [1]
  // [w1.e12 w2.e12][a2] = [0]
  //
  // Define
  // d12_1 = dot(w2, e12)
  // d12_2 = -dot(w1, e12)
  // d12 = d12_1 + d12_2
  //
  // Solution
  // a1 = d12_1 / d12
  // a2 = d12_2 / d12
  solve2(): void {
    const w1 = this.m_v1.w;
    const w2 = this.m_v2.w;
    matrix.subVec2(e12, w2, w1);

    // w1 region
    const d12_2 = -matrix.dotVec2(w1, e12);
    if (d12_2 <= 0.0) {
      // a2 <= 0, so we clamp it to 0
      this.m_v1.a = 1.0;
      this.m_count = 1;
      return;
    }

    // w2 region
    const d12_1 = matrix.dotVec2(w2, e12);
    if (d12_1 <= 0.0) {
      // a1 <= 0, so we clamp it to 0
      this.m_v2.a = 1.0;
      this.m_count = 1;
      this.m_v1.set(this.m_v2);
      return;
    }

    // Must be in e12 region.
    const inv_d12 = 1.0 / (d12_1 + d12_2);
    this.m_v1.a = d12_1 * inv_d12;
    this.m_v2.a = d12_2 * inv_d12;
    this.m_count = 2;
  }

  // Possible regions:
  // - points[2]
  // - edge points[0]-points[2]
  // - edge points[1]-points[2]
  // - inside the triangle
  solve3(): void {
    const w1 = this.m_v1.w;
    const w2 = this.m_v2.w;
    const w3 = this.m_v3.w;

    // Edge12
    // [1 1 ][a1] = [1]
    // [w1.e12 w2.e12][a2] = [0]
    // a3 = 0
    matrix.subVec2(e12, w2, w1);
    const w1e12 = matrix.dotVec2(w1, e12);
    const w2e12 = matrix.dotVec2(w2, e12);
    const d12_1 = w2e12;
    const d12_2 = -w1e12;

    // Edge13
    // [1 1 ][a1] = [1]
    // [w1.e13 w3.e13][a3] = [0]
    // a2 = 0
    matrix.subVec2(e13, w3, w1);
    const w1e13 = matrix.dotVec2(w1, e13);
    const w3e13 = matrix.dotVec2(w3, e13);
    const d13_1 = w3e13;
    const d13_2 = -w1e13;

    // Edge23
    // [1 1 ][a2] = [1]
    // [w2.e23 w3.e23][a3] = [0]
    // a1 = 0
    matrix.subVec2(e23, w3, w2);
    const w2e23 = matrix.dotVec2(w2, e23);
    const w3e23 = matrix.dotVec2(w3, e23);
    const d23_1 = w3e23;
    const d23_2 = -w2e23;

    // Triangle123
    const n123 = matrix.crossVec2Vec2(e12, e13);

    const d123_1 = n123 * matrix.crossVec2Vec2(w2, w3);
    const d123_2 = n123 * matrix.crossVec2Vec2(w3, w1);
    const d123_3 = n123 * matrix.crossVec2Vec2(w1, w2);

    // w1 region
    if (d12_2 <= 0.0 && d13_2 <= 0.0) {
      this.m_v1.a = 1.0;
      this.m_count = 1;
      return;
    }

    // e12
    if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
      const inv_d12 = 1.0 / (d12_1 + d12_2);
      this.m_v1.a = d12_1 * inv_d12;
      this.m_v2.a = d12_2 * inv_d12;
      this.m_count = 2;
      return;
    }

    // e13
    if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
      const inv_d13 = 1.0 / (d13_1 + d13_2);
      this.m_v1.a = d13_1 * inv_d13;
      this.m_v3.a = d13_2 * inv_d13;
      this.m_count = 2;
      this.m_v2.set(this.m_v3);
      return;
    }

    // w2 region
    if (d12_1 <= 0.0 && d23_2 <= 0.0) {
      this.m_v2.a = 1.0;
      this.m_count = 1;
      this.m_v1.set(this.m_v2);
      return;
    }

    // w3 region
    if (d13_1 <= 0.0 && d23_1 <= 0.0) {
      this.m_v3.a = 1.0;
      this.m_count = 1;
      this.m_v1.set(this.m_v3);
      return;
    }

    // e23
    if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
      const inv_d23 = 1.0 / (d23_1 + d23_2);
      this.m_v2.a = d23_1 * inv_d23;
      this.m_v3.a = d23_2 * inv_d23;
      this.m_count = 2;
      this.m_v1.set(this.m_v3);
      return;
    }

    // Must be in triangle123
    const inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
    this.m_v1.a = d123_1 * inv_d123;
    this.m_v2.a = d123_2 * inv_d123;
    this.m_v3.a = d123_3 * inv_d123;
    this.m_count = 3;
  }
}

/** @internal */ const simplex = new Simplex();

/** @internal */ const input = new DistanceInput();
/** @internal */ const cache = new SimplexCache();
/** @internal */ const output = new DistanceOutput();

/**
 * Determine if two generic shapes overlap.
 */
export const testOverlap = function (
  shapeA: Shape,
  indexA: number,
  shapeB: Shape,
  indexB: number,
  xfA: TransformValue,
  xfB: TransformValue,
): boolean {
  input.recycle();
  input.proxyA.set(shapeA, indexA);
  input.proxyB.set(shapeB, indexB);
  matrix.copyTransform(input.transformA, xfA);
  matrix.copyTransform(input.transformB, xfB);
  input.useRadii = true;

  output.recycle();
  cache.recycle();

  Distance(output, cache, input);

  return output.distance < 10.0 * EPSILON;
};

// legacy exports
Distance.testOverlap = testOverlap;
Distance.Input = DistanceInput;
Distance.Output = DistanceOutput;
Distance.Proxy = DistanceProxy;
Distance.Cache = SimplexCache;

/**
 * Input parameters for ShapeCast
 */
export class ShapeCastInput {
  readonly proxyA = new DistanceProxy();
  readonly proxyB = new DistanceProxy();
  readonly transformA = Transform.identity();
  readonly transformB = Transform.identity();
  readonly translationB = Vec2.zero();
  recycle() {
    this.proxyA.recycle();
    this.proxyB.recycle();
    this.transformA.setIdentity();
    this.transformB.setIdentity();
    matrix.zeroVec2(this.translationB);
  }
}

/**
 * Output results for b2ShapeCast
 */
export class ShapeCastOutput {
  point: Vec2 = Vec2.zero();
  normal: Vec2 = Vec2.zero();
  lambda = 1.0;
  iterations = 0;
}

/**
 * Perform a linear shape cast of shape B moving and shape A fixed. Determines
 * the hit point, normal, and translation fraction.
 *
 * @returns true if hit, false if there is no hit or an initial overlap
 */
//
// GJK-raycast
// Algorithm by Gino van den Bergen.
// "Smooth Mesh Contacts with GJK" in Game Physics Pearls. 2010
export const ShapeCast = function (output: ShapeCastOutput, input: ShapeCastInput): boolean {
  output.iterations = 0;
  output.lambda = 1.0;
  output.normal.setZero();
  output.point.setZero();

  const proxyA = input.proxyA;
  const proxyB = input.proxyB;

  const radiusA = math_max(proxyA.m_radius, Settings.polygonRadius);
  const radiusB = math_max(proxyB.m_radius, Settings.polygonRadius);
  const radius = radiusA + radiusB;

  const xfA = input.transformA;
  const xfB = input.transformB;

  const r = input.translationB;
  const n = Vec2.zero();
  let lambda = 0.0;

  // Initial simplex
  const simplex = new Simplex();
  simplex.m_count = 0;

  // Get simplex vertices as an array.
  const vertices = simplex.m_v;

  // Get support point in -r direction
  let indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(r)));
  let wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
  let indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, r));
  let wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
  const v = Vec2.sub(wA, wB);

  // Sigma is the target distance between polygons
  const sigma = math_max(Settings.polygonRadius, radius - Settings.polygonRadius);
  const tolerance = 0.5 * Settings.linearSlop;

  // Main iteration loop.
  const k_maxIters = 20;
  let iter = 0;
  while (iter < k_maxIters && v.length() - sigma > tolerance) {
    if (_ASSERT) console.assert(simplex.m_count < 3);

    output.iterations += 1;

    // Support in direction -v (A - B)
    indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(v)));
    wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
    indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, v));
    wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
    const p = Vec2.sub(wA, wB);

    // -v is a normal at p
    v.normalize();

    // Intersect ray with plane
    const vp = Vec2.dot(v, p);
    const vr = Vec2.dot(v, r);
    if (vp - sigma > lambda * vr) {
      if (vr <= 0.0) {
        return false;
      }

      lambda = (vp - sigma) / vr;
      if (lambda > 1.0) {
        return false;
      }

      n.setMul(-1, v);
      simplex.m_count = 0;
    }

    // Reverse simplex since it works with B - A.
    // Shift by lambda * r because we want the closest point to the current clip point.
    // Note that the support point p is not shifted because we want the plane equation
    // to be formed in unshifted space.
    const vertex = vertices[simplex.m_count];
    vertex.indexA = indexB;
    vertex.wA = Vec2.combine(1, wB, lambda, r);
    vertex.indexB = indexA;
    vertex.wB = wA;
    vertex.w = Vec2.sub(vertex.wB, vertex.wA);
    vertex.a = 1.0;
    simplex.m_count += 1;

    switch (simplex.m_count) {
      case 1:
        break;

      case 2:
        simplex.solve2();
        break;

      case 3:
        simplex.solve3();
        break;

      default:
        if (_ASSERT) console.assert(false);
    }

    // If we have 3 points, then the origin is in the corresponding triangle.
    if (simplex.m_count == 3) {
      // Overlap
      return false;
    }

    // Get search direction.
    v.setVec2(simplex.getClosestPoint());

    // Iteration count is equated to the number of support point calls.
    ++iter;
  }

  if (iter == 0) {
    // Initial overlap
    return false;
  }

  // Prepare output.
  const pointA = Vec2.zero();
  const pointB = Vec2.zero();
  simplex.getWitnessPoints(pointB, pointA);

  if (v.lengthSquared() > 0.0) {
    n.setMul(-1, v);
    n.normalize();
  }

  output.point = Vec2.combine(1, pointA, radiusA, n);
  output.normal = n;
  output.lambda = lambda;
  output.iterations = iter;
  return true;
};
