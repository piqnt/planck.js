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

import Settings from '../Settings';

import common from '../util/common';
import stats from '../util/stats';
import Timer from '../util/Timer';

import Math from '../common/Math';
import Vec2 from '../common/Vec2';
import Rot from '../common/Rot';
import Sweep from '../common/Sweep';
import Transform from '../common/Transform';

import Distance, { DistanceInput, DistanceOutput, DistanceProxy, SimplexCache } from './Distance';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * Input parameters for TimeOfImpact.
 */
export class TOIInput {
  proxyA: DistanceProxy = new DistanceProxy();
  proxyB: DistanceProxy = new DistanceProxy();
  sweepA: Sweep = new Sweep();
  sweepB: Sweep = new Sweep();
  /** defines sweep interval [0, tMax] */
  tMax: number | undefined;
}

export enum TOIOutputState {
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
  state: TOIOutputState | undefined;
  t: number | undefined;
}

stats.toiTime = 0;
stats.toiMaxTime = 0;
stats.toiCalls = 0;
stats.toiIters = 0;
stats.toiMaxIters = 0;
stats.toiRootIters = 0;
stats.toiMaxRootIters = 0;

/**
 * Compute the upper bound on time before two shapes penetrate. Time is
 * represented as a fraction between [0,tMax]. This uses a swept separating axis
 * and may miss some intermediate, non-tunneling collision. If you change the
 * time interval, you should call this function again.
 *
 * Note: use Distance to compute the contact point and normal at the time of
 * impact.
 *
 * CCD via the local separating axis method. This seeks progression by computing
 * the largest time at which separation is maintained.
 */
export default function TimeOfImpact(output: TOIOutput, input: TOIInput): void {
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
  const target = Math.max(Settings.linearSlop, totalRadius - 3.0 * Settings.linearSlop);
  const tolerance = 0.25 * Settings.linearSlop;
  _ASSERT && common.assert(target > tolerance);

  let t1 = 0.0;
  const k_maxIterations = Settings.maxTOIIterations;
  let iter = 0;

  // Prepare input for distance query.
  const cache = new SimplexCache();

  const distanceInput = new DistanceInput();
  distanceInput.proxyA = input.proxyA;
  distanceInput.proxyB = input.proxyB;
  distanceInput.useRadii = false;

  // The outer loop progressively attempts to compute new separating axes.
  // This loop terminates when an axis is repeated (no progress is made).
  while (true) {
    const xfA = Transform.identity();
    const xfB = Transform.identity();
    sweepA.getTransform(xfA, t1);
    sweepB.getTransform(xfB, t1);

    // Get the distance between shapes. We can also use the results
    // to get a separating axis.
    distanceInput.transformA = xfA;
    distanceInput.transformB = xfB;
    const distanceOutput = new DistanceOutput();
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
    const fcn = new SeparationFunction();
    fcn.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);

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
      let s2 = fcn.findMinSeparation(t2);
      // const indexA = fcn.indexA;
      // const indexB = fcn.indexB;

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
      let s1 = fcn.evaluate(t1);
      // const indexA = fcn.indexA;
      // const indexB = fcn.indexB;

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
          t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
        } else {
          // Bisection to guarantee progress.
          t = 0.5 * (a1 + a2);
        }

        ++rootIterCount;
        ++stats.toiRootIters;

        const s = fcn.evaluate(t);
        const indexA = fcn.indexA;
        const indexB = fcn.indexB;

        if (Math.abs(s - target) < tolerance) {
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

      stats.toiMaxRootIters = Math.max(stats.toiMaxRootIters, rootIterCount);

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

  stats.toiMaxIters = Math.max(stats.toiMaxIters, iter);

  const time = Timer.diff(timer);
  stats.toiMaxTime = Math.max(stats.toiMaxTime, time);
  stats.toiTime += time;
}

enum SeparationFunctionType {
  e_points = 1,
  e_faceA = 2,
  e_faceB = 3,
}

class SeparationFunction {
  m_proxyA: DistanceProxy = new DistanceProxy();
  m_proxyB: DistanceProxy = new DistanceProxy();
  m_sweepA: Sweep;
  m_sweepB: Sweep;
  indexA: number;
  indexB: number;
  m_type: SeparationFunctionType;
  m_localPoint: Vec2 = Vec2.zero();
  m_axis: Vec2 = Vec2.zero();

  // TODO_ERIN might not need to return the separation

  initialize(cache: SimplexCache, proxyA: DistanceProxy, sweepA: Sweep, proxyB: DistanceProxy, sweepB: Sweep, t1: number): number {
    this.m_proxyA = proxyA;
    this.m_proxyB = proxyB;
    const count = cache.count;
    _ASSERT && common.assert(0 < count && count < 3);

    this.m_sweepA = sweepA;
    this.m_sweepB = sweepB;

    const xfA = Transform.identity();
    const xfB = Transform.identity();
    this.m_sweepA.getTransform(xfA, t1);
    this.m_sweepB.getTransform(xfB, t1);

    if (count === 1) {
      this.m_type = SeparationFunctionType.e_points;
      const localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
      const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
      const pointA = Transform.mulVec2(xfA, localPointA);
      const pointB = Transform.mulVec2(xfB, localPointB);
      this.m_axis.setCombine(1, pointB, -1, pointA);
      const s = this.m_axis.normalize();
      return s;

    } else if (cache.indexA[0] === cache.indexA[1]) {
      // Two points on B and one on A.
      this.m_type = SeparationFunctionType.e_faceB;
      const localPointB1 = proxyB.getVertex(cache.indexB[0]);
      const localPointB2 = proxyB.getVertex(cache.indexB[1]);

      this.m_axis = Vec2.crossVec2Num(Vec2.sub(localPointB2, localPointB1), 1.0);
      this.m_axis.normalize();
      const normal = Rot.mulVec2(xfB.q, this.m_axis);

      this.m_localPoint = Vec2.mid(localPointB1, localPointB2);
      const pointB = Transform.mulVec2(xfB, this.m_localPoint);

      const localPointA = proxyA.getVertex(cache.indexA[0]);
      const pointA = Transform.mulVec2(xfA, localPointA);

      let s = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
      if (s < 0.0) {
        this.m_axis = Vec2.neg(this.m_axis);
        s = -s;
      }
      return s;

    } else {
      // Two points on A and one or two points on B.
      this.m_type = SeparationFunctionType.e_faceA;
      const localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
      const localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);

      this.m_axis = Vec2.crossVec2Num(Vec2.sub(localPointA2, localPointA1), 1.0);
      this.m_axis.normalize();
      const normal = Rot.mulVec2(xfA.q, this.m_axis);

      this.m_localPoint = Vec2.mid(localPointA1, localPointA2);
      const pointA = Transform.mulVec2(xfA, this.m_localPoint);

      const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
      const pointB = Transform.mulVec2(xfB, localPointB);

      let s = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
      if (s < 0.0) {
        this.m_axis = Vec2.neg(this.m_axis);
        s = -s;
      }
      return s;
    }
  }

  compute(find: boolean, t: number): number {
    // It was findMinSeparation and evaluate
    const xfA = Transform.identity();
    const xfB = Transform.identity();
    this.m_sweepA.getTransform(xfA, t);
    this.m_sweepB.getTransform(xfB, t);

    switch (this.m_type) {
      case SeparationFunctionType.e_points: {
        if (find) {
          const axisA = Rot.mulTVec2(xfA.q, this.m_axis);
          const axisB = Rot.mulTVec2(xfB.q, Vec2.neg(this.m_axis));

          this.indexA = this.m_proxyA.getSupport(axisA);
          this.indexB = this.m_proxyB.getSupport(axisB);
        }

        const localPointA = this.m_proxyA.getVertex(this.indexA);
        const localPointB = this.m_proxyB.getVertex(this.indexB);

        const pointA = Transform.mulVec2(xfA, localPointA);
        const pointB = Transform.mulVec2(xfB, localPointB);

        const sep = Vec2.dot(pointB, this.m_axis) - Vec2.dot(pointA, this.m_axis);
        return sep;
      }

      case SeparationFunctionType.e_faceA: {
        const normal = Rot.mulVec2(xfA.q, this.m_axis);
        const pointA = Transform.mulVec2(xfA, this.m_localPoint);

        if (find) {
          const axisB = Rot.mulTVec2(xfB.q, Vec2.neg(normal));

          this.indexA = -1;
          this.indexB = this.m_proxyB.getSupport(axisB);
        }

        const localPointB = this.m_proxyB.getVertex(this.indexB);
        const pointB = Transform.mulVec2(xfB, localPointB);

        const sep = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
        return sep;
      }

      case SeparationFunctionType.e_faceB: {
        const normal = Rot.mulVec2(xfB.q, this.m_axis);
        const pointB = Transform.mulVec2(xfB, this.m_localPoint);

        if (find) {
          const axisA = Rot.mulTVec2(xfA.q, Vec2.neg(normal));

          this.indexB = -1;
          this.indexA = this.m_proxyA.getSupport(axisA);
        }

        const localPointA = this.m_proxyA.getVertex(this.indexA);
        const pointA = Transform.mulVec2(xfA, localPointA);

        const sep = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
        return sep;
      }

      default:
        _ASSERT && common.assert(false);
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
