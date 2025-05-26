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
import Timer from "../util/Timer";
import { Sweep } from "../common/Sweep";
import { Transform } from "../common/Transform";
import { Distance, DistanceInput, DistanceOutput, DistanceProxy, SimplexCache } from "./Distance";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const math_abs = Math.abs;
/** @internal */ const math_max = Math.max;

/**
 * Input parameters for TimeOfImpact.
 */
export class TOIInput {
  proxyA = new DistanceProxy();
  proxyB = new DistanceProxy();
  sweepA = new Sweep();
  sweepB = new Sweep();
  /** defines sweep interval [0, tMax] */
  tMax: number;
  recycle() {
    this.proxyA.recycle();
    this.proxyB.recycle();
    this.sweepA.recycle();
    this.sweepB.recycle();
    this.tMax = -1;
  }
}

export enum TOIOutputState {
  e_unset = -1,
  e_unknown = 0,
  e_failed = 1,
  e_overlapped = 2,
  e_touching = 3,
  e_separated = 4,
}

/**
 * Output parameters for TimeOfImpact.
 */
export class TOIOutput {
  state = TOIOutputState.e_unset;
  t = -1;
  recycle() {
    this.state = TOIOutputState.e_unset;
    this.t = -1;
  }
}

stats.toiTime = 0;
stats.toiMaxTime = 0;
stats.toiCalls = 0;
stats.toiIters = 0;
stats.toiMaxIters = 0;
stats.toiRootIters = 0;
stats.toiMaxRootIters = 0;

/** @internal */ const distanceInput = new DistanceInput();
/** @internal */ const distanceOutput = new DistanceOutput();
// this is passed to Distance and SeparationFunction
/** @internal */ const cache = new SimplexCache();

/** @internal */ const xfA = matrix.transform(0, 0, 0);
/** @internal */ const xfB = matrix.transform(0, 0, 0);
/** @internal */ const temp = matrix.vec2(0, 0);
/** @internal */ const pointA = matrix.vec2(0, 0);
/** @internal */ const pointB = matrix.vec2(0, 0);
/** @internal */ const normal = matrix.vec2(0, 0);
/** @internal */ const axisA = matrix.vec2(0, 0);
/** @internal */ const axisB = matrix.vec2(0, 0);
/** @internal */ const localPointA = matrix.vec2(0, 0);
/** @internal */ const localPointB = matrix.vec2(0, 0);

/**
 * Compute the upper bound on time before two shapes penetrate. Time is
 * represented as a fraction between [0,tMax]. This uses a swept separating axis
 * and may miss some intermediate, non-tunneling collisions. If you change the
 * time interval, you should call this function again.
 *
 * Note: use Distance to compute the contact point and normal at the time of
 * impact.
 *
 * CCD via the local separating axis method. This seeks progression by computing
 * the largest time at which separation is maintained.
 */
export const TimeOfImpact = function (output: TOIOutput, input: TOIInput): void {
  const timer = Timer.now();

  ++stats.toiCalls;

  output.state = TOIOutputState.e_unknown;
  output.t = input.tMax;

  const proxyA = input.proxyA; // DistanceProxy
  const proxyB = input.proxyB; // DistanceProxy

  const sweepA = input.sweepA; // Sweep
  const sweepB = input.sweepB; // Sweep

  // Large rotations can make the root finder fail, so we normalize the
  // sweep angles.
  sweepA.normalize();
  sweepB.normalize();

  const tMax = input.tMax;

  const totalRadius = proxyA.m_radius + proxyB.m_radius;
  const target = math_max(Settings.linearSlop, totalRadius - 3.0 * Settings.linearSlop);
  const tolerance = 0.25 * Settings.linearSlop;
  if (_ASSERT) console.assert(target > tolerance);

  let t1 = 0.0;
  const k_maxIterations = Settings.maxTOIIterations;
  let iter = 0;

  // Prepare input for distance query.
  // const cache = new SimplexCache();
  cache.recycle();

  distanceInput.proxyA.setVertices(proxyA.m_vertices, proxyA.m_count, proxyA.m_radius);
  distanceInput.proxyB.setVertices(proxyB.m_vertices, proxyB.m_count, proxyB.m_radius);
  distanceInput.useRadii = false;

  // The outer loop progressively attempts to compute new separating axes.
  // This loop terminates when an axis is repeated (no progress is made).
  while (true) {
    sweepA.getTransform(xfA, t1);
    sweepB.getTransform(xfB, t1);

    // Get the distance between shapes. We can also use the results
    // to get a separating axis.
    matrix.copyTransform(distanceInput.transformA, xfA);
    matrix.copyTransform(distanceInput.transformB, xfB);
    Distance(distanceOutput, cache, distanceInput);

    // If the shapes are overlapped, we give up on continuous collision.
    if (distanceOutput.distance <= 0.0) {
      // Failure!
      output.state = TOIOutputState.e_overlapped;
      output.t = 0.0;
      break;
    }

    if (distanceOutput.distance < target + tolerance) {
      // Victory!
      output.state = TOIOutputState.e_touching;
      output.t = t1;
      break;
    }

    // Initialize the separating axis.
    separationFunction.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);

    // if (false) {
    //   // Dump the curve seen by the root finder
    //   const N = 100;
    //   const dx = 1.0 / N;
    //   const xs = []; // [ N + 1 ];
    //   const fs = []; // [ N + 1 ];
    //   const x = 0.0;
    //   for (const i = 0; i <= N; ++i) {
    //     sweepA.getTransform(xfA, x);
    //     sweepB.getTransform(xfB, x);
    //     const f = fcn.evaluate(xfA, xfB) - target;
    //     printf("%g %g\n", x, f);
    //     xs[i] = x;
    //     fs[i] = f;
    //     x += dx;
    //   }
    // }

    // Compute the TOI on the separating axis. We do this by successively
    // resolving the deepest point. This loop is bounded by the number of
    // vertices.
    let done = false;
    let t2 = tMax;
    let pushBackIter = 0;
    while (true) {
      // Find the deepest point at t2. Store the witness point indices.
      let s2 = separationFunction.findMinSeparation(t2);

      // Is the final configuration separated?
      if (s2 > target + tolerance) {
        // Victory!
        output.state = TOIOutputState.e_separated;
        output.t = tMax;
        done = true;
        break;
      }

      // Has the separation reached tolerance?
      if (s2 > target - tolerance) {
        // Advance the sweeps
        t1 = t2;
        break;
      }

      // Compute the initial separation of the witness points.
      let s1 = separationFunction.evaluate(t1);

      // Check for initial overlap. This might happen if the root finder
      // runs out of iterations.
      if (s1 < target - tolerance) {
        output.state = TOIOutputState.e_failed;
        output.t = t1;
        done = true;
        break;
      }

      // Check for touching
      if (s1 <= target + tolerance) {
        // Victory! t1 should hold the TOI (could be 0.0).
        output.state = TOIOutputState.e_touching;
        output.t = t1;
        done = true;
        break;
      }

      // Compute 1D root of: f(x) - target = 0
      let rootIterCount = 0;
      let a1 = t1;
      let a2 = t2;
      while (true) {
        // Use a mix of the secant rule and bisection.
        let t;
        if (rootIterCount & 1) {
          // Secant rule to improve convergence.
          t = a1 + ((target - s1) * (a2 - a1)) / (s2 - s1);
        } else {
          // Bisection to guarantee progress.
          t = 0.5 * (a1 + a2);
        }

        ++rootIterCount;
        ++stats.toiRootIters;

        const s = separationFunction.evaluate(t);

        if (math_abs(s - target) < tolerance) {
          // t2 holds a tentative value for t1
          t2 = t;
          break;
        }

        // Ensure we continue to bracket the root.
        if (s > target) {
          a1 = t;
          s1 = s;
        } else {
          a2 = t;
          s2 = s;
        }

        if (rootIterCount === 50) {
          break;
        }
      }

      stats.toiMaxRootIters = math_max(stats.toiMaxRootIters, rootIterCount);

      ++pushBackIter;

      if (pushBackIter === Settings.maxPolygonVertices) {
        break;
      }
    }

    ++iter;
    ++stats.toiIters;

    if (done) {
      break;
    }

    if (iter === k_maxIterations) {
      // Root finder got stuck. Semi-victory.
      output.state = TOIOutputState.e_failed;
      output.t = t1;
      break;
    }
  }

  stats.toiMaxIters = math_max(stats.toiMaxIters, iter);

  const time = Timer.diff(timer);
  stats.toiMaxTime = math_max(stats.toiMaxTime, time);
  stats.toiTime += time;

  separationFunction.recycle();
};

enum SeparationFunctionType {
  e_unset = -1,
  e_points = 1,
  e_faceA = 2,
  e_faceB = 3,
}

class SeparationFunction {
  // input cache
  // todo: maybe assign by copy instead of reference?
  m_proxyA: DistanceProxy = null;
  m_proxyB: DistanceProxy = null;
  m_sweepA: Sweep = null;
  m_sweepB: Sweep = null;

  // initialize cache
  m_type = SeparationFunctionType.e_unset;
  m_localPoint = matrix.vec2(0, 0);
  m_axis = matrix.vec2(0, 0);

  // compute output
  indexA = -1;
  indexB = -1;

  recycle() {
    this.m_proxyA = null;
    this.m_proxyB = null;
    this.m_sweepA = null;
    this.m_sweepB = null;

    this.m_type = SeparationFunctionType.e_unset;
    matrix.zeroVec2(this.m_localPoint);
    matrix.zeroVec2(this.m_axis);

    this.indexA = -1;
    this.indexB = -1;
  }

  // TODO_ERIN might not need to return the separation

  initialize(
    cache: SimplexCache,
    proxyA: DistanceProxy,
    sweepA: Sweep,
    proxyB: DistanceProxy,
    sweepB: Sweep,
    t1: number,
  ): number {
    const count = cache.count;
    if (_ASSERT) console.assert(0 < count && count < 3);

    this.m_proxyA = proxyA;
    this.m_proxyB = proxyB;
    this.m_sweepA = sweepA;
    this.m_sweepB = sweepB;

    this.m_sweepA.getTransform(xfA, t1);
    this.m_sweepB.getTransform(xfB, t1);

    if (count === 1) {
      this.m_type = SeparationFunctionType.e_points;
      const localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
      const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
      matrix.transformVec2(pointA, xfA, localPointA);
      matrix.transformVec2(pointB, xfB, localPointB);
      matrix.subVec2(this.m_axis, pointB, pointA);
      const s = matrix.normalizeVec2Length(this.m_axis);
      return s;
    } else if (cache.indexA[0] === cache.indexA[1]) {
      // Two points on B and one on A.
      this.m_type = SeparationFunctionType.e_faceB;
      const localPointB1 = proxyB.getVertex(cache.indexB[0]);
      const localPointB2 = proxyB.getVertex(cache.indexB[1]);

      matrix.crossVec2Num(this.m_axis, matrix.subVec2(temp, localPointB2, localPointB1), 1.0);
      matrix.normalizeVec2(this.m_axis);
      matrix.rotVec2(normal, xfB.q, this.m_axis);

      matrix.combine2Vec2(this.m_localPoint, 0.5, localPointB1, 0.5, localPointB2);
      matrix.transformVec2(pointB, xfB, this.m_localPoint);

      const localPointA = proxyA.getVertex(cache.indexA[0]);
      const pointA = Transform.mulVec2(xfA, localPointA);

      let s = matrix.dotVec2(pointA, normal) - matrix.dotVec2(pointB, normal);
      if (s < 0.0) {
        matrix.negVec2(this.m_axis);
        s = -s;
      }
      return s;
    } else {
      // Two points on A and one or two points on B.
      this.m_type = SeparationFunctionType.e_faceA;
      const localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
      const localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);

      matrix.crossVec2Num(this.m_axis, matrix.subVec2(temp, localPointA2, localPointA1), 1.0);
      matrix.normalizeVec2(this.m_axis);
      matrix.rotVec2(normal, xfA.q, this.m_axis);

      matrix.combine2Vec2(this.m_localPoint, 0.5, localPointA1, 0.5, localPointA2);
      matrix.transformVec2(pointA, xfA, this.m_localPoint);

      const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
      matrix.transformVec2(pointB, xfB, localPointB);

      let s = matrix.dotVec2(pointB, normal) - matrix.dotVec2(pointA, normal);
      if (s < 0.0) {
        matrix.negVec2(this.m_axis);
        s = -s;
      }
      return s;
    }
  }

  compute(find: boolean, t: number): number {
    // It was findMinSeparation and evaluate
    this.m_sweepA.getTransform(xfA, t);
    this.m_sweepB.getTransform(xfB, t);

    switch (this.m_type) {
      case SeparationFunctionType.e_points: {
        if (find) {
          matrix.derotVec2(axisA, xfA.q, this.m_axis);
          matrix.derotVec2(axisB, xfB.q, matrix.scaleVec2(temp, -1, this.m_axis));

          this.indexA = this.m_proxyA.getSupport(axisA);
          this.indexB = this.m_proxyB.getSupport(axisB);
        }

        matrix.copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
        matrix.copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));

        matrix.transformVec2(pointA, xfA, localPointA);
        matrix.transformVec2(pointB, xfB, localPointB);

        const sep = matrix.dotVec2(pointB, this.m_axis) - matrix.dotVec2(pointA, this.m_axis);
        return sep;
      }

      case SeparationFunctionType.e_faceA: {
        matrix.rotVec2(normal, xfA.q, this.m_axis);
        matrix.transformVec2(pointA, xfA, this.m_localPoint);

        if (find) {
          matrix.derotVec2(axisB, xfB.q, matrix.scaleVec2(temp, -1, normal));

          this.indexA = -1;
          this.indexB = this.m_proxyB.getSupport(axisB);
        }

        matrix.copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
        matrix.transformVec2(pointB, xfB, localPointB);

        const sep = matrix.dotVec2(pointB, normal) - matrix.dotVec2(pointA, normal);
        return sep;
      }

      case SeparationFunctionType.e_faceB: {
        matrix.rotVec2(normal, xfB.q, this.m_axis);
        matrix.transformVec2(pointB, xfB, this.m_localPoint);

        if (find) {
          matrix.derotVec2(axisA, xfA.q, matrix.scaleVec2(temp, -1, normal));

          this.indexB = -1;
          this.indexA = this.m_proxyA.getSupport(axisA);
        }

        matrix.copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
        matrix.transformVec2(pointA, xfA, localPointA);

        const sep = matrix.dotVec2(pointA, normal) - matrix.dotVec2(pointB, normal);
        return sep;
      }

      default:
        if (_ASSERT) console.assert(false);
        if (find) {
          this.indexA = -1;
          this.indexB = -1;
        }
        return 0.0;
    }
  }

  findMinSeparation(t: number): number {
    return this.compute(true, t);
  }

  evaluate(t: number): number {
    return this.compute(false, t);
  }
}

/** @internal */ const separationFunction = new SeparationFunction();

// legacy exports
TimeOfImpact.Input = TOIInput;
TimeOfImpact.Output = TOIOutput;
