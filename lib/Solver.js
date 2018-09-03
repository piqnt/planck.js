/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports = Solver;
module.exports.TimeStep = TimeStep;

var Settings = require('./Settings');
var common = require('./util/common');

var Vec2 = require('./common/Vec2');
var Math = require('./common/Math');

var Body = require('./Body');
var Contact = require('./Contact');
var Joint = require('./Joint');

var TimeOfImpact = require('./collision/TimeOfImpact');
var TOIInput = TimeOfImpact.Input;
var TOIOutput = TimeOfImpact.Output;

var Distance = require('./collision/Distance');
var DistanceInput = Distance.Input;
var DistanceOutput = Distance.Output;
var DistanceProxy = Distance.Proxy;
var SimplexCache = Distance.Cache;

function TimeStep(dt) {
  this.dt = 0; // time step
  this.inv_dt = 0; // inverse time step (0 if dt == 0)
  this.velocityIterations = 0;
  this.positionIterations = 0;
  this.warmStarting = false;
  this.blockSolve = true;

  // timestep ratio for variable timestep
  this.inv_dt0 = 0.0;
  this.dtRatio = 1; // dt * inv_dt0
}

TimeStep.prototype.reset = function(dt) {
  if (this.dt > 0.0) {
    this.inv_dt0 = this.inv_dt;
  }
  this.dt = dt;
  this.inv_dt = dt == 0 ? 0 : 1 / dt;
  this.dtRatio = dt * this.inv_dt0;
}

/**
 * Finds and solves islands. An island is a connected subset of the world.
 * 
 * @param {World} world
 */
function Solver(world) {
  this.m_world = world;
  this.m_stack = [];
  this.m_bodies = [];
  this.m_contacts = [];
  this.m_joints = [];
}

Solver.prototype.clear = function() {
  this.m_stack.length = 0;
  this.m_bodies.length = 0;
  this.m_contacts.length = 0;
  this.m_joints.length = 0;
}

Solver.prototype.addBody = function(body) {
  _ASSERT && common.assert(body instanceof Body, 'Not a Body!', body);
  this.m_bodies.push(body);
  // why?
//  body.c_position.c.setZero();
//  body.c_position.a = 0;
//  body.c_velocity.v.setZero();
//  body.c_velocity.w = 0;
};

Solver.prototype.addContact = function(contact) {
  _ASSERT && common.assert(contact instanceof Contact, 'Not a Contact!', contact);
  this.m_contacts.push(contact);
};

Solver.prototype.addJoint = function(joint) {
  _ASSERT && common.assert(joint instanceof Joint, 'Not a Joint!', joint);
  this.m_joints.push(joint);
};

/**
 * @param {TimeStep} step
 */
Solver.prototype.solveWorld = function(step) {
  var world = this.m_world;

  // Clear all the island flags.
  for (var b = world.m_bodyList; b; b = b.m_next) {
    b.m_islandFlag = false;
  }
  for (var c = world.m_contactList; c; c = c.m_next) {
    c.m_islandFlag = false;
  }
  for (var j = world.m_jointList; j; j = j.m_next) {
    j.m_islandFlag = false;
  }

  // Build and simulate all awake islands.
  var stack = this.m_stack;
  var loop = -1;
  for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
    loop++;
    if (seed.m_islandFlag) {
      continue;
    }

    if (seed.isAwake() == false || seed.isActive() == false) {
      continue;
    }

    // The seed can be dynamic or kinematic.
    if (seed.isStatic()) {
      continue;
    }

    // Reset island and stack.
    this.clear();

    stack.push(seed);

    seed.m_islandFlag = true;

    // Perform a depth first search (DFS) on the constraint graph.
    while (stack.length > 0) {
      // Grab the next body off the stack and add it to the island.
      var b = stack.pop();
      _ASSERT && common.assert(b.isActive() == true);
      this.addBody(b);

      // Make sure the body is awake.
      b.setAwake(true);

      // To keep islands as small as possible, we don't
      // propagate islands across static bodies.
      if (b.isStatic()) {
        continue;
      }
      
      // Search all contacts connected to this body.
      for (var ce = b.m_contactList; ce; ce = ce.next) {
        var contact = ce.contact;

        // Has this contact already been added to an island?
        if (contact.m_islandFlag) {
          continue;
        }

        // Is this contact solid and touching?
        if (contact.isEnabled() == false || contact.isTouching() == false) {
          continue;
        }

        // Skip sensors.
        var sensorA = contact.m_fixtureA.m_isSensor;
        var sensorB = contact.m_fixtureB.m_isSensor;
        if (sensorA || sensorB) {
          continue;
        }

        this.addContact(contact);
        contact.m_islandFlag = true;

        var other = ce.other;

        // Was the other body already added to this island?
        if (other.m_islandFlag) {
          continue;
        }

        // _ASSERT && common.assert(stack.length < world.m_bodyCount);
        stack.push(other);
        other.m_islandFlag = true;
      }

      // Search all joints connect to this body.
      for (var je = b.m_jointList; je; je = je.next) {
        if (je.joint.m_islandFlag == true) {
          continue;
        }

        var other = je.other;

        // Don't simulate joints connected to inactive bodies.
        if (other.isActive() == false) {
          continue;
        }

        this.addJoint(je.joint);
        je.joint.m_islandFlag = true;

        if (other.m_islandFlag) {
          continue;
        }

        // _ASSERT && common.assert(stack.length < world.m_bodyCount);
        stack.push(other);
        other.m_islandFlag = true;
      }
    }

    this.solveIsland(step);

    // Post solve cleanup.
    for (var i = 0; i < this.m_bodies.length; ++i) {
      // Allow static bodies to participate in other islands.
      // TODO: are they added at all?
      var b = this.m_bodies[i];
      if (b.isStatic()) {
        b.m_islandFlag = false;
      }
    }
  }
}

/**
 * @param {TimeStep} step
 */
Solver.prototype.solveIsland = function(step) {
  // B2: Island Solve
  var world = this.m_world;
  var gravity = world.m_gravity;
  var allowSleep = world.m_allowSleep;

  var h = step.dt;

  // Integrate velocities and apply damping. Initialize the body state.
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var body = this.m_bodies[i];

    var c = Vec2.clone(body.m_sweep.c);
    var a = body.m_sweep.a;
    var v = Vec2.clone(body.m_linearVelocity);
    var w = body.m_angularVelocity;

    // Store positions for continuous collision.
    body.m_sweep.c0.set(body.m_sweep.c);
    body.m_sweep.a0 = body.m_sweep.a;

    if (body.isDynamic()) {
      // Integrate velocities.
      v.addMul(h * body.m_gravityScale, gravity);
      v.addMul(h * body.m_invMass, body.m_force);
      w += h * body.m_invI * body.m_torque;
      /**
       * <pre>
       * Apply damping.
       * ODE: dv/dt + c * v = 0
       * Solution: v(t) = v0 * exp(-c * t)
       * Time step: v(t + dt) = v0 * exp(-c * (t + dt)) = v0 * exp(-c * t) * exp(-c * dt) = v * exp(-c * dt)
       * v2 = exp(-c * dt) * v1
       * Pade approximation:
       * v2 = v1 * 1 / (1 + c * dt)
       * </pre>
       */
      v.mul(1.0 / (1.0 + h * body.m_linearDamping));
      w *= 1.0 / (1.0 + h * body.m_angularDamping);
    }

    body.c_position.c = c;
    body.c_position.a = a;
    body.c_velocity.v = v;
    body.c_velocity.w = w;
  }

  for (var i = 0; i < this.m_contacts.length; ++i) {
    var contact = this.m_contacts[i];
    contact.initConstraint(step);
  }

  _DEBUG && this.printBodies('M: ');

  for (var i = 0; i < this.m_contacts.length; ++i) {
    var contact = this.m_contacts[i];
    contact.initVelocityConstraint(step);
  }

  _DEBUG && this.printBodies('R: ');

  if (step.warmStarting) {
    // Warm start.
    for (var i = 0; i < this.m_contacts.length; ++i) {
      var contact = this.m_contacts[i];
      contact.warmStartConstraint(step);
    }
  }

  _DEBUG && this.printBodies('Q: ');
  
  for (var i = 0; i < this.m_joints.length; ++i) {
    var joint = this.m_joints[i];
    joint.initVelocityConstraints(step);
  }

  _DEBUG && this.printBodies('E: ');

  // Solve velocity constraints
  for (var i = 0; i < step.velocityIterations; ++i) {
    for (var j = 0; j < this.m_joints.length; ++j) {
      var joint = this.m_joints[j];
      joint.solveVelocityConstraints(step);
    }

    for (var j = 0; j < this.m_contacts.length; ++j) {
      var contact = this.m_contacts[j];
      contact.solveVelocityConstraint(step);
    }
  }

  _DEBUG && this.printBodies('D: ');

  // Store impulses for warm starting
  for (var i = 0; i < this.m_contacts.length; ++i) {
    var contact = this.m_contacts[i];
    contact.storeConstraintImpulses(step);
  }

  _DEBUG && this.printBodies('C: ');

  // Integrate positions
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var body = this.m_bodies[i];

    var c = Vec2.clone(body.c_position.c);
    var a = body.c_position.a;
    var v = Vec2.clone(body.c_velocity.v);
    var w = body.c_velocity.w;

    // Check for large velocities
    var translation = Vec2.mul(h, v);
    if (Vec2.lengthSquared(translation) > Settings.maxTranslationSquared) {
      var ratio = Settings.maxTranslation / translation.length();
      v.mul(ratio);
    }

    var rotation = h * w;
    if (rotation * rotation > Settings.maxRotationSquared) {
      var ratio = Settings.maxRotation / Math.abs(rotation);
      w *= ratio;
    }

    // Integrate
    c.addMul(h, v);
    a += h * w;

    body.c_position.c.set(c);
    body.c_position.a = a;
    body.c_velocity.v.set(v);
    body.c_velocity.w = w;
  }

  _DEBUG && this.printBodies('B: ');

  // Solve position constraints
  var positionSolved = false;
  for (var i = 0; i < step.positionIterations; ++i) {
    var minSeparation = 0.0;
    for (var j = 0; j < this.m_contacts.length; ++j) {
      var contact = this.m_contacts[j];
      var separation = contact.solvePositionConstraint(step);
      minSeparation = Math.min(minSeparation, separation);
    }
    // We can't expect minSpeparation >= -Settings.linearSlop because we don't
    // push the separation above -Settings.linearSlop.
    var contactsOkay = minSeparation >= -3.0 * Settings.linearSlop;

    var jointsOkay = true;
    for (var j = 0; j < this.m_joints.length; ++j) {
      var joint = this.m_joints[j];
      var jointOkay = joint.solvePositionConstraints(step);
      jointsOkay = jointsOkay && jointOkay;
    }

    if (contactsOkay && jointsOkay) {
      // Exit early if the position errors are small.
      positionSolved = true;
      break;
    }
  }

  _DEBUG && this.printBodies('L: ');

  // Copy state buffers back to the bodies
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var body = this.m_bodies[i];

    body.m_sweep.c.set(body.c_position.c);
    body.m_sweep.a = body.c_position.a;
    body.m_linearVelocity.set(body.c_velocity.v);
    body.m_angularVelocity = body.c_velocity.w;
    body.synchronizeTransform();
  }

  this.postSolveIsland();

  if (allowSleep) {
    var minSleepTime = Infinity;

    var linTolSqr = Settings.linearSleepToleranceSqr;
    var angTolSqr = Settings.angularSleepToleranceSqr;

    for (var i = 0; i < this.m_bodies.length; ++i) {
      var body = this.m_bodies[i];
      if (body.isStatic()) {
        continue;
      }

      if ((body.m_autoSleepFlag == false)
          || (body.m_angularVelocity * body.m_angularVelocity > angTolSqr)
          || (Vec2.lengthSquared(body.m_linearVelocity) > linTolSqr)) {
        body.m_sleepTime = 0.0;
        minSleepTime = 0.0;
      } else {
        body.m_sleepTime += h;
        minSleepTime = Math.min(minSleepTime, body.m_sleepTime);
      }
    }

    if (minSleepTime >= Settings.timeToSleep && positionSolved) {
      for (var i = 0; i < this.m_bodies.length; ++i) {
        var body = this.m_bodies[i];
        body.setAwake(false);
      }
    }
  }
};

Solver.prototype.printBodies = function(tag) {
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var b = this.m_bodies[i];
    common.debug(tag, b.c_position.a, b.c_position.c.x, b.c_position.c.y, b.c_velocity.w, b.c_velocity.v.x, b.c_velocity.v.y);
  }
};

var s_subStep = new TimeStep(); // reuse

/**
 * Find TOI contacts and solve them.
 *
 * @param {TimeStep} step
 */
Solver.prototype.solveWorldTOI = function(step) {
  var world = this.m_world;

  if (world.m_stepComplete) {
    for (var b = world.m_bodyList; b; b = b.m_next) {
      b.m_islandFlag = false;
      b.m_sweep.alpha0 = 0.0;
    }

    for (var c = world.m_contactList; c; c = c.m_next) {
      // Invalidate TOI
      c.m_toiFlag = false;
      c.m_islandFlag = false;
      c.m_toiCount = 0;
      c.m_toi = 1.0;
    }
  }

  // Find TOI events and solve them.
  for (;;) {
    // Find the first TOI.
    var minContact = null; // Contact
    var minAlpha = 1.0;

    for (var c = world.m_contactList; c; c = c.m_next) {
      // Is this contact disabled?
      if (c.isEnabled() == false) {
        continue;
      }

      // Prevent excessive sub-stepping.
      if (c.m_toiCount > Settings.maxSubSteps) {
        continue;
      }

      var alpha = 1.0;
      if (c.m_toiFlag) {
        // This contact has a valid cached TOI.
        alpha = c.m_toi;
      } else {
        var fA = c.getFixtureA();
        var fB = c.getFixtureB();

        // Is there a sensor?
        if (fA.isSensor() || fB.isSensor()) {
          continue;
        }

        var bA = fA.getBody();
        var bB = fB.getBody();

        _ASSERT && common.assert(bA.isDynamic() || bB.isDynamic());

        var activeA = bA.isAwake() && !bA.isStatic();
        var activeB = bB.isAwake() && !bB.isStatic();

        // Is at least one body active (awake and dynamic or kinematic)?
        if (activeA == false && activeB == false) {
          continue;
        }

        var collideA = bA.isBullet() || !bA.isDynamic();
        var collideB = bB.isBullet() || !bB.isDynamic();

        // Are these two non-bullet dynamic bodies?
        if (collideA == false && collideB == false) {
          continue;
        }

        // Compute the TOI for this contact.
        // Put the sweeps onto the same time interval.
        var alpha0 = bA.m_sweep.alpha0;

        if (bA.m_sweep.alpha0 < bB.m_sweep.alpha0) {
          alpha0 = bB.m_sweep.alpha0;
          bA.m_sweep.advance(alpha0);
        } else if (bB.m_sweep.alpha0 < bA.m_sweep.alpha0) {
          alpha0 = bA.m_sweep.alpha0;
          bB.m_sweep.advance(alpha0);
        }

        _ASSERT && common.assert(alpha0 < 1.0);

        var indexA = c.getChildIndexA();
        var indexB = c.getChildIndexB();

        var sweepA = bA.m_sweep;
        var sweepB = bB.m_sweep;

        // Compute the time of impact in interval [0, minTOI]
        var input = new TOIInput(); // TODO: reuse
        input.proxyA.set(fA.getShape(), indexA);
        input.proxyB.set(fB.getShape(), indexB);
        input.sweepA.set(bA.m_sweep);
        input.sweepB.set(bB.m_sweep);
        input.tMax = 1.0;

        var output = new TOIOutput(); // TODO: reuse
        TimeOfImpact(output, input);

        // Beta is the fraction of the remaining portion of the [time?].
        var beta = output.t;
        if (output.state == TOIOutput.e_touching) {
          alpha = Math.min(alpha0 + (1.0 - alpha0) * beta, 1.0);
        } else {
          alpha = 1.0;
        }

        c.m_toi = alpha;
        c.m_toiFlag = true;
      }

      if (alpha < minAlpha) {
        // This is the minimum TOI found so far.
        minContact = c;
        minAlpha = alpha;
      }
    }

    if (minContact == null || 1.0 - 10.0 * Math.EPSILON < minAlpha) {
      // No more TOI events. Done!
      world.m_stepComplete = true;
      break;
    }

    // Advance the bodies to the TOI.
    var fA = minContact.getFixtureA();
    var fB = minContact.getFixtureB();
    var bA = fA.getBody();
    var bB = fB.getBody();

    var backup1 = bA.m_sweep.clone();
    var backup2 = bB.m_sweep.clone();

    bA.advance(minAlpha);
    bB.advance(minAlpha);

    // The TOI contact likely has some new contact points.
    minContact.update(world);
    minContact.m_toiFlag = false;
    ++minContact.m_toiCount;

    // Is the contact solid?
    if (minContact.isEnabled() == false || minContact.isTouching() == false) {
      // Restore the sweeps.
      minContact.setEnabled(false);
      bA.m_sweep.set(backup1);
      bB.m_sweep.set(backup2);
      bA.synchronizeTransform();
      bB.synchronizeTransform();
      continue;
    }

    bA.setAwake(true);
    bB.setAwake(true);

    // Build the island
    this.clear();
    this.addBody(bA);
    this.addBody(bB);
    this.addContact(minContact);

    bA.m_islandFlag = true;
    bB.m_islandFlag = true;
    minContact.m_islandFlag = true;

    // Get contacts on bodyA and bodyB.
    var bodies = [ bA, bB ];
    for (var i = 0; i < bodies.length; ++i) {
      var body = bodies[i];
      if (body.isDynamic()) {
        for (var ce = body.m_contactList; ce; ce = ce.next) {
          // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
          // if (this.m_contactCount == this.m_contactCapacity) { break; }

          var contact = ce.contact;

          // Has this contact already been added to the island?
          if (contact.m_islandFlag) {
            continue;
          }

          // Only add if either is static, kinematic or bullet.
          var other = ce.other;
          if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
            continue;
          }

          // Skip sensors.
          var sensorA = contact.m_fixtureA.m_isSensor;
          var sensorB = contact.m_fixtureB.m_isSensor;
          if (sensorA || sensorB) {
            continue;
          }

          // Tentatively advance the body to the TOI.
          var backup = other.m_sweep.clone();
          if (other.m_islandFlag == false) {
            other.advance(minAlpha);
          }

          // Update the contact points
          contact.update(world);

          // Was the contact disabled by the user?
          // Are there contact points?
          if (contact.isEnabled() == false || contact.isTouching() == false) {
            other.m_sweep.set(backup);
            other.synchronizeTransform();
            continue;
          }

          // Add the contact to the island
          contact.m_islandFlag = true;
          this.addContact(contact);

          // Has the other body already been added to the island?
          if (other.m_islandFlag) {
            continue;
          }

          // Add the other body to the island.
          other.m_islandFlag = true;

          if (!other.isStatic()) {
            other.setAwake(true);
          }

          this.addBody(other);
        }
      }
    }

    s_subStep.reset((1.0 - minAlpha) * step.dt);
    s_subStep.dtRatio = 1.0;
    s_subStep.positionIterations = 20;
    s_subStep.velocityIterations = step.velocityIterations;
    s_subStep.warmStarting = false;

    this.solveIslandTOI(s_subStep, bA, bB);

    // Reset island flags and synchronize broad-phase proxies.
    for (var i = 0; i < this.m_bodies.length; ++i) {
      var body = this.m_bodies[i];
      body.m_islandFlag = false;

      if (!body.isDynamic()) {
        continue;
      }

      body.synchronizeFixtures();

      // Invalidate all contact TOIs on this displaced body.
      for (var ce = body.m_contactList; ce; ce = ce.next) {
        ce.contact.m_toiFlag = false;
        ce.contact.m_islandFlag = false;
      }
    }

    // Commit fixture proxy movements to the broad-phase so that new contacts
    // are created.
    // Also, some contacts can be destroyed.
    world.findNewContacts();

    if (world.m_subStepping) {
      world.m_stepComplete = false;
      break;
    }
  }

  if (_DEBUG) for (var b = world.m_bodyList; b; b = b.m_next) {
    var c = b.m_sweep.c;
    var a = b.m_sweep.a;
    var v = b.m_linearVelocity;
    var w = b.m_angularVelocity;
  }
}

/**
 * @param {TimeStep} subStep
 * @param toiA
 * @param toiB
 */
Solver.prototype.solveIslandTOI = function(subStep, toiA, toiB) {
  var world = this.m_world;

  // Initialize the body state.
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var body = this.m_bodies[i];
    body.c_position.c.set(body.m_sweep.c);
    body.c_position.a = body.m_sweep.a;
    body.c_velocity.v.set(body.m_linearVelocity);
    body.c_velocity.w = body.m_angularVelocity;
  }

  for (var i = 0; i < this.m_contacts.length; ++i) {
    var contact = this.m_contacts[i];
    contact.initConstraint(subStep);
  }

  // Solve position constraints.
  for (var i = 0; i < subStep.positionIterations; ++i) {
    var minSeparation = 0.0;
    for (var j = 0; j < this.m_contacts.length; ++j) {
      var contact = this.m_contacts[j];
      var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
      minSeparation = Math.min(minSeparation, separation);
    }
    // We can't expect minSpeparation >= -Settings.linearSlop because we don't
    // push the separation above -Settings.linearSlop.
    var contactsOkay = minSeparation >= -1.5 * Settings.linearSlop;
    if (contactsOkay) {
      break;
    }
  }

  if (false) {
    // Is the new position really safe?
    for (var i = 0; i < this.m_contacts.length; ++i) {
      var c = this.m_contacts[i];
      var fA = c.getFixtureA();
      var fB = c.getFixtureB();

      var bA = fA.getBody();
      var bB = fB.getBody();

      var indexA = c.getChildIndexA();
      var indexB = c.getChildIndexB();

      var input = new DistanceInput();
      input.proxyA.set(fA.getShape(), indexA);
      input.proxyB.set(fB.getShape(), indexB);
      input.transformA = bA.getTransform();
      input.transformB = bB.getTransform();
      input.useRadii = false;

      var output = new DistanceOutput();
      var cache = new SimplexCache();
      Distance(output, cache, input);

      if (output.distance == 0 || cache.count == 3) {
        cache.count += 0;
      }
    }
  }

  // Leap of faith to new safe state.
  toiA.m_sweep.c0.set(toiA.c_position.c);
  toiA.m_sweep.a0 = toiA.c_position.a;
  toiB.m_sweep.c0.set(toiB.c_position.c);
  toiB.m_sweep.a0 = toiB.c_position.a;

  // No warm starting is needed for TOI events because warm
  // starting impulses were applied in the discrete solver.
  for (var i = 0; i < this.m_contacts.length; ++i) {
    var contact = this.m_contacts[i];
    contact.initVelocityConstraint(subStep);
  }

  // Solve velocity constraints.
  for (var i = 0; i < subStep.velocityIterations; ++i) {
    for (var j = 0; j < this.m_contacts.length; ++j) {
      var contact = this.m_contacts[j];
      contact.solveVelocityConstraint(subStep);
    }
  }

  // Don't store the TOI contact forces for warm starting
  // because they can be quite large.

  var h = subStep.dt;

  // Integrate positions
  for (var i = 0; i < this.m_bodies.length; ++i) {
    var body = this.m_bodies[i];

    var c = Vec2.clone(body.c_position.c);
    var a = body.c_position.a;
    var v = Vec2.clone(body.c_velocity.v);
    var w = body.c_velocity.w;

    // Check for large velocities
    var translation = Vec2.mul(h, v);
    if (Vec2.dot(translation, translation) > Settings.maxTranslationSquared) {
      var ratio = Settings.maxTranslation / translation.length();
      v.mul(ratio);
    }

    var rotation = h * w;
    if (rotation * rotation > Settings.maxRotationSquared) {
      var ratio = Settings.maxRotation / Math.abs(rotation);
      w *= ratio;
    }

    // Integrate
    c.addMul(h, v);
    a += h * w;

    body.c_position.c = c;
    body.c_position.a = a;
    body.c_velocity.v = v;
    body.c_velocity.w = w;

    // Sync bodies
    body.m_sweep.c = c;
    body.m_sweep.a = a;
    body.m_linearVelocity = v;
    body.m_angularVelocity = w;
    body.synchronizeTransform();
  }

  this.postSolveIsland();
};

/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These match
 * up one-to-one with the contact points in Manifold.
 */
function ContactImpulse() {
  this.normalImpulses = [];
  this.tangentImpulses = [];
};

Solver.prototype.postSolveIsland = function() {
  // TODO: report contact.v_points instead of new object?
  var impulse = new ContactImpulse();
  for (var c = 0; c < this.m_contacts.length; ++c) {
    var contact = this.m_contacts[c];
    for (var p = 0; p < contact.v_points.length; ++p) {
      impulse.normalImpulses.push(contact.v_points[p].normalImpulse);
      impulse.tangentImpulses.push(contact.v_points[p].tangentImpulse);
    }
    this.m_world.postSolve(contact, impulse);
  }
};
