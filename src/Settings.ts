/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @internal */ const math_PI = Math.PI;


/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 * 
 * Some tolerances are absolute and some are relative. Absolute tolerances use MKS units.
 */
export class Settings {
  /**
   * You can use this to change the length scale used by your game.
   * 
   * For example for inches you could use 39.4.
   */
  static lengthUnitsPerMeter = 1.0;
  
  // Collision
  /**
   * The maximum number of contact points between two convex shapes. Do not change
   * this value.
   */
  static maxManifoldPoints: number = 2;

  /**
   * The maximum number of vertices on a convex polygon. You cannot increase this
   * too much because BlockAllocator has a maximum object size.
   */
  static maxPolygonVertices: number = 12;

  /**
   * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
   * by a small amount without triggering a tree adjustment. This is in meters.
   */
  static aabbExtension: number = 0.1;

  /**
   * This is used to fatten AABBs in the dynamic tree. This is used to predict the
   * future position based on the current displacement. This is a dimensionless
   * multiplier.
   */
  static aabbMultiplier: number = 2.0;

  /**
   * A small length used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  static linearSlop: number = 0.005;

  /**
   * A small angle used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  static angularSlop: number = (2.0 / 180.0 * math_PI);

  /**
   * The radius of the polygon/edge shape skin. This should not be modified.
   * Making this smaller means polygons will have an insufficient buffer for
   * continuous collision. Making it larger may create artifacts for vertex
   * collision.
   */
  static get polygonRadius(): number { return 2.0 * Settings.linearSlop; }

  /**
   * Maximum number of sub-steps per contact in continuous physics simulation.
   */
  static maxSubSteps: number = 8;

  // Dynamics

  /**
   * Maximum number of contacts to be handled to solve a TOI impact.
   */
  static maxTOIContacts: number = 32;

  /**
   * Maximum iterations to solve a TOI.
   */
  static maxTOIIterations: number = 20;

  /**
   * Maximum iterations to find Distance.
   */
  static maxDistanceIterations: number = 20;

  /**
   * A velocity threshold for elastic collisions. Any collision with a relative
   * linear velocity below this threshold will be treated as inelastic.
   */
  static velocityThreshold: number = 1.0;

  /**
   * The maximum linear position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  static maxLinearCorrection: number = 0.2;

  /**
   * The maximum angular position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  static maxAngularCorrection: number = (8.0 / 180.0 * math_PI);

  /**
   * The maximum linear velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust Settings.
   */
  static maxTranslation: number = 2.0;

  /**
   * The maximum angular velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust Settings.
   */
  static maxRotation: number = (0.5 * math_PI);

  /**
   * This scale factor controls how fast overlap is resolved. Ideally this would
   * be 1 so that overlap is removed in one time step. However using values close
   * to 1 often lead to overshoot.
   */
  static baumgarte: number = 0.2;
  static toiBaugarte: number = 0.75;

  // Particle

  /** A symbolic constant that stands for particle allocation error. */
  static b2_invalidParticleIndex = -1;

  static b2_maxParticleIndex = 0x7FFFFFFF;

  /** The default distance between particles, multiplied by the particle diameter. */
  static b2_particleStride = 0.75;

  /** The minimum particle weight that produces pressure. */
  static b2_minParticleWeight = 1.0;

  /** The upper limit for particle pressure. */
  static b2_maxParticlePressure = 0.25;

  /** The upper limit for force between particles. */
  static b2_maxParticleForce = 0.5;

  /**
   * The maximum distance between particles in a triad, multiplied by the
   * particle diameter.
   */
  static b2_maxTriadDistance = 2;
  static b2_maxTriadDistanceSquared = (Settings.b2_maxTriadDistance * Settings.b2_maxTriadDistance)

  /** The initial size of particle data buffers. */
  static b2_minParticleSystemBufferCapacity = 256;

  /** The time into the future that collisions against barrier particles will be detected. */
  static b2_barrierCollisionTime = 2.5;

  // Sleep

  /**
   * The time that a body must be still before it will go to sleep.
   */
  static timeToSleep: number = 0.5;

  /**
   * A body cannot sleep if its linear velocity is above this tolerance.
   */
  static linearSleepTolerance: number = 0.01;

  /**
   * A body cannot sleep if its angular velocity is above this tolerance.
   */
  static angularSleepTolerance: number = (2.0 / 180.0 * math_PI);
}

/** @internal */
export class SettingsInternal {
  static get maxManifoldPoints() {
    return Settings.maxManifoldPoints;
  }
  static get maxPolygonVertices() {
    return Settings.maxPolygonVertices;
  }
  static get aabbExtension() {
    return Settings.aabbExtension * Settings.lengthUnitsPerMeter;
  }
  static get aabbMultiplier() {
    return Settings.aabbMultiplier;
  }
  static get linearSlop() {
    return Settings.linearSlop * Settings.lengthUnitsPerMeter;
  }
  static get linearSlopSquared() {
    return Settings.linearSlop * Settings.lengthUnitsPerMeter * Settings.linearSlop * Settings.lengthUnitsPerMeter;
  }
  static get angularSlop() {
    return Settings.angularSlop;
  }
  static get polygonRadius() {
    return 2.0 * Settings.linearSlop;
  }
  static get maxSubSteps() {
    return Settings.maxSubSteps;
  }
  static get maxTOIContacts() {
    return Settings.maxTOIContacts;
  }
  static get maxTOIIterations() {
    return Settings.maxTOIIterations;
  }
  static get maxDistanceIterations() {
    return Settings.maxDistanceIterations;
  }
  static get velocityThreshold() {
    return Settings.velocityThreshold * Settings.lengthUnitsPerMeter;
  }
  static get maxLinearCorrection() {
    return Settings.maxLinearCorrection * Settings.lengthUnitsPerMeter;
  }
  static get maxAngularCorrection() {
    return Settings.maxAngularCorrection;
  }
  static get maxTranslation() {
    return Settings.maxTranslation * Settings.lengthUnitsPerMeter;
  }
  static get maxTranslationSquared() {
    return Settings.maxTranslation * Settings.lengthUnitsPerMeter * Settings.maxTranslation * Settings.lengthUnitsPerMeter;
  }
  static get maxRotation() {
    return Settings.maxRotation;
  }
  static get maxRotationSquared() {
    return Settings.maxRotation * Settings.maxRotation;
  }
  static get baumgarte() {
    return Settings.baumgarte;
  }
  static get toiBaugarte() {
    return Settings.toiBaugarte;
  }
  static get b2_invalidParticleIndex() {
    return Settings.b2_invalidParticleIndex;
  }
  static get b2_maxParticleIndex() {
    return Settings.b2_maxParticleIndex;
  }
  static get b2_particleStride() {
    return Settings.b2_particleStride;
  }
  static get b2_minParticleWeight() {
    return Settings.b2_minParticleWeight;
  }
  static get b2_maxParticlePressure() {
    return Settings.b2_maxParticlePressure;
  }
  static get b2_maxParticleForce() {
    return Settings.b2_maxParticleForce;
  }
  static get b2_maxTriadDistance() {
    return Settings.b2_maxTriadDistance;
  }
  static get b2_maxTriadDistanceSquared() {
    return Settings.b2_maxTriadDistanceSquared;
  }
  static get b2_minParticleSystemBufferCapacity() {
    return Settings.b2_minParticleSystemBufferCapacity;
  }
  static get b2_barrierCollisionTime() {
    return Settings.b2_barrierCollisionTime;
  }
  static get timeToSleep() {
    return Settings.timeToSleep;
  }
  static get linearSleepTolerance() {
    return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
  }
  static get linearSleepToleranceSqr() {
    return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter * Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
  }
  static get angularSleepTolerance() {
    return Settings.angularSleepTolerance;
  }
  static get angularSleepToleranceSqr() {
    return Settings.angularSleepTolerance * Settings.angularSleepTolerance;
  }
}
