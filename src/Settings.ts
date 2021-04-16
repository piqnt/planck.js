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

// TODO merge with World options?

/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
export default {
  // Collision
  /**
   * The maximum number of contact points between two convex shapes. Do not change
   * this value.
   */
  maxManifoldPoints: 2,

  /**
   * The maximum number of vertices on a convex polygon. You cannot increase this
   * too much because BlockAllocator has a maximum object size.
   */
  maxPolygonVertices: 12,

  /**
   * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
   * by a small amount without triggering a tree adjustment. This is in meters.
   */
  aabbExtension: 0.1,

  /**
   * This is used to fatten AABBs in the dynamic tree. This is used to predict the
   * future position based on the current displacement. This is a dimensionless
   * multiplier.
   */
  aabbMultiplier: 2.0,

  /**
   * A small length used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  linearSlop: 0.005,
  get linearSlopSquared(): number { return this.linearSlop * this.linearSlop; },

  /**
   * A small angle used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  angularSlop: (2.0 / 180.0 * Math.PI),

  /**
   * The radius of the polygon/edge shape skin. This should not be modified.
   * Making this smaller means polygons will have an insufficient buffer for
   * continuous collision. Making it larger may create artifacts for vertex
   * collision.
   */
  get polygonRadius(): number { return 2.0 *   this.linearSlop; },

  /**
   * Maximum number of sub-steps per contact in continuous physics simulation.
   */
  maxSubSteps: 8,

// Dynamics

  /**
   * Maximum number of contacts to be handled to solve a TOI impact.
   */
  maxTOIContacts: 32,

  /**
   * Maximum iterations to solve a TOI.
   */
  maxTOIIterations: 20,

  /**
   * Maximum iterations to find Distance.
   */
  maxDistnceIterations: 20,

  /**
   * A velocity threshold for elastic collisions. Any collision with a relative
   * linear velocity below this threshold will be treated as inelastic.
   */
  velocityThreshold: 1.0,

  /**
   * The maximum linear position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxLinearCorrection: 0.2,

  /**
   * The maximum angular position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxAngularCorrection: (8.0 / 180.0 * Math.PI),

  /**
   * The maximum linear velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxTranslation: 2.0,
  get maxTranslationSquared(): number { return this.maxTranslation * this.maxTranslation; },

  /**
   * The maximum angular velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxRotation: (0.5 * Math.PI),
  get maxRotationSquared(): number { return this.maxRotation * this.maxRotation; },

  /**
   * This scale factor controls how fast overlap is resolved. Ideally this would
   * be 1 so that overlap is removed in one time step. However using values close
   * to 1 often lead to overshoot.
   */
  baumgarte: 0.2,
  toiBaugarte: 0.75,

  // Sleep

  /**
   * The time that a body must be still before it will go to sleep.
   */
  timeToSleep: 0.5,

  /**
   * A body cannot sleep if its linear velocity is above this tolerance.
   */
  linearSleepTolerance: 0.01,
  get linearSleepToleranceSqr(): number { return Math.pow(this.linearSleepTolerance, 2); },

  /**
   * A body cannot sleep if its angular velocity is above this tolerance.
   */
  angularSleepTolerance: (2.0 / 180.0 * Math.PI),
  get angularSleepToleranceSqr(): number { return Math.pow(this.angularSleepTolerance, 2); },

};
