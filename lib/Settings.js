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

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

// TODO merge with World options?

var Settings = exports;

/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */

// Collision
/**
 * The maximum number of contact points between two convex shapes. Do not change
 * this value.
 */
Settings.maxManifoldPoints = 2;

/**
 * The maximum number of vertices on a convex polygon. You cannot increase this
 * too much because BlockAllocator has a maximum object size.
 */
Settings.maxPolygonVertices = 12;

/**
 * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
 * by a small amount without triggering a tree adjustment. This is in meters.
 */
Settings.aabbExtension = 0.1;

/**
 * This is used to fatten AABBs in the dynamic tree. This is used to predict the
 * future position based on the current displacement. This is a dimensionless
 * multiplier.
 */
Settings.aabbMultiplier = 2.0;

/**
 * A small length used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant.
 */
Settings.linearSlop = 0.005;
Settings.linearSlopSquared = Settings.linearSlop * Settings.linearSlop;

/**
 * A small angle used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant.
 */
Settings.angularSlop = (2.0 / 180.0 * Math.PI);

/**
 * The radius of the polygon/edge shape skin. This should not be modified.
 * Making this smaller means polygons will have an insufficient buffer for
 * continuous collision. Making it larger may create artifacts for vertex
 * collision.
 */
Settings.polygonRadius = (2.0 * Settings.linearSlop);

/**
 * Maximum number of sub-steps per contact in continuous physics simulation.
 */
Settings.maxSubSteps = 8;

// Dynamics

/**
 * Maximum number of contacts to be handled to solve a TOI impact.
 */
Settings.maxTOIContacts = 32;

/**
 * Maximum iterations to solve a TOI.
 */
Settings.maxTOIIterations = 20;

/**
 * Maximum iterations to find Distance.
 */
Settings.maxDistnceIterations = 20;

/**
 * A velocity threshold for elastic collisions. Any collision with a relative
 * linear velocity below this threshold will be treated as inelastic.
 */
Settings.velocityThreshold = 1.0;

/**
 * The maximum linear position correction used when solving constraints. This
 * helps to prevent overshoot.
 */
Settings.maxLinearCorrection = 0.2;

/**
 * The maximum angular position correction used when solving constraints. This
 * helps to prevent overshoot.
 */
Settings.maxAngularCorrection = (8.0 / 180.0 * Math.PI);

/**
 * The maximum linear velocity of a body. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this.
 */
Settings.maxTranslation = 2.0;
Settings.maxTranslationSquared = (Settings.maxTranslation * Settings.maxTranslation);

/**
 * The maximum angular velocity of a body. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this.
 */
Settings.maxRotation = (0.5 * Math.PI)
Settings.maxRotationSquared = (Settings.maxRotation * Settings.maxRotation)

/**
 * This scale factor controls how fast overlap is resolved. Ideally this would
 * be 1 so that overlap is removed in one time step. However using values close
 * to 1 often lead to overshoot.
 */
Settings.baumgarte = 0.2;
Settings.toiBaugarte = 0.75;

// Sleep

/**
 * The time that a body must be still before it will go to sleep.
 */
Settings.timeToSleep = 0.5;

/**
 * A body cannot sleep if its linear velocity is above this tolerance.
 */
Settings.linearSleepTolerance = 0.01;

Settings.linearSleepToleranceSqr = Math.pow(Settings.linearSleepTolerance, 2);

/**
 * A body cannot sleep if its angular velocity is above this tolerance.
 */
Settings.angularSleepTolerance = (2.0 / 180.0 * Math.PI);

Settings.angularSleepToleranceSqr = Math.pow(Settings.angularSleepTolerance, 2);

