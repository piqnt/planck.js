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
import Vec2 from '../common/Vec2';
import Math from '../common/Math';
import Body from './Body';
import Contact from './Contact';
import Joint from './Joint';
import TimeOfImpact, { TOIInput, TOIOutput, TOIOutputState } from '../collision/TimeOfImpact';
import Distance, { DistanceInput, DistanceOutput, SimplexCache } from '../collision/Distance';
import World from "./World";


const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


export class TimeStep {
  /** time step */
  dt: number = 0;
  /** inverse time step (0 if dt == 0) */
  inv_dt: number = 0;
  velocityIterations: number = 0;
  positionIterations: number = 0;
  warmStarting: boolean = false;
  blockSolve: boolean = true;

  /** timestep ratio for variable timestep */
  inv_dt0: number = 0.0;
  /** dt * inv_dt0 */
  dtRatio: number = 1;

  reset(dt: number): void {
    if (this.dt > 0.0) {
      this.inv_dt0 = this.inv_dt;
    }
    this.dt = dt;
    this.inv_dt = dt == 0 ? 0 : 1 / dt;
    this.dtRatio = dt * this.inv_dt0;
  }
}

// reuse
const s_subStep = new TimeStep();

/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These match
 * up one-to-one with the contact points in Manifold.
 */
export class ContactImpulse {
  // TODO: merge with Contact class?

  private readonly contact: Contact;
  private readonly normals: number[];
  private readonly tangents: number[];

  constructor(contact: Contact) {
    this.contact = contact;
    this.normals = [];
    this.tangents = [];
  }

  get normalImpulses(): number[] {
    const contact = this.contact;
    const normals = this.normals;
    normals.length = 0;
    for (let p = 0; p < contact.v_points.length; ++p) {
      normals.push(contact.v_points[p].normalImpulse);
    }
    return normals;
  }

  get tangentImpulses(): number[] {
    const contact = this.contact;
    const tangents = this.tangents;
    tangents.length = 0;
    for (let p = 0; p < contact.v_points.length; ++p) {
      tangents.push(contact.v_points[p].tangentImpulse);
    }
    return tangents;
  }
}

/**
 * Finds and solves islands. An island is a connected subset of the world.
 */
export default class Solver {
  m_world: World;
  m_stack: Body[];
  m_bodies: Body[];
  m_contacts: Contact[];
  m_joints: Joint[];

  constructor(world: World) {
    this.m_world = world;
    this.m_stack = [];
    this.m_bodies = [];
    this.m_contacts = [];
    this.m_joints = [];
  }

  clear(): void {
    this.m_stack.length = 0;
    this.m_bodies.length = 0;
    this.m_contacts.length = 0;
    this.m_joints.length = 0;
  }

  addBody(body: Body): void {
    _ASSERT && common.assert(body instanceof Body, 'Not a Body!', body);
    this.m_bodies.push(body);
    // why?
    // body.c_position.c.setZero();
    // body.c_position.a = 0;
    // body.c_velocity.v.setZero();
    // body.c_velocity.w = 0;
  }

  addContact(contact: Contact): void {
    _ASSERT && common.assert(contact instanceof Contact, 'Not a Contact!', contact);
    this.m_contacts.push(contact);
  }

  addJoint(joint: Joint): void {
    _ASSERT && common.assert(joint instanceof Joint, 'Not a Joint!', joint);
    this.m_joints.push(joint);
  }

  solveWorld(step: TimeStep): void {
    const world = this.m_world;

    // Clear all the island flags.
    for (let b = world.m_bodyList; b; b = b.m_next) {
      b.m_islandFlag = false;
    }
    for (let c = world.m_contactList; c; c = c.m_next) {
      c.m_islandFlag = false;
    }
    for (let j = world.m_jointList; j; j = j.m_next) {
      j.m_islandFlag = false;
    }

    // Build and simulate all awake islands.
    const stack = this.m_stack;
    let loop = -1;
    for (let seed = world.m_bodyList; seed; seed = seed.m_next) {
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
        const b = stack.pop();
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
        for (let ce = b.m_contactList; ce; ce = ce.next) {
          const contact = ce.contact;

          // Has this contact already been added to an island?
          if (contact.m_islandFlag) {
            continue;
          }

          // Is this contact solid and touching?
          if (contact.isEnabled() == false || contact.isTouching() == false) {
            continue;
          }

          // Skip sensors.
          const sensorA = contact.m_fixtureA.m_isSensor;
          const sensorB = contact.m_fixtureB.m_isSensor;
          if (sensorA || sensorB) {
            continue;
          }

          this.addContact(contact);
          contact.m_islandFlag = true;

          const other = ce.other;

          // Was the other body already added to this island?
          if (other.m_islandFlag) {
            continue;
          }

          // _ASSERT && common.assert(stack.length < world.m_bodyCount);
          stack.push(other);
          other.m_islandFlag = true;
        }

        // Search all joints connect to this body.
        for (let je = b.m_jointList; je; je = je.next) {
          if (je.joint.m_islandFlag == true) {
            continue;
          }

          const other = je.other;

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
      for (let i = 0; i < this.m_bodies.length; ++i) {
        // Allow static bodies to participate in other islands.
        // TODO: are they added at all?
        const b = this.m_bodies[i];
        if (b.isStatic()) {
          b.m_islandFlag = false;
        }
      }
    }
  }

  solveIsland(step: TimeStep): void {
    // B2: Island Solve
    const world = this.m_world;
    const gravity = world.m_gravity;
    const allowSleep = world.m_allowSleep;

    const h = step.dt;

    // Integrate velocities and apply damping. Initialize the body state.
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const body = this.m_bodies[i];

      const c = Vec2.clone(body.m_sweep.c);
      const a = body.m_sweep.a;
      const v = Vec2.clone(body.m_linearVelocity);
      let w = body.m_angularVelocity;

      // Store positions for continuous collision.
      body.m_sweep.c0.setVec2(body.m_sweep.c);
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

    for (let i = 0; i < this.m_contacts.length; ++i) {
      const contact = this.m_contacts[i];
      contact.initConstraint(step);
    }

    _DEBUG && this.printBodies('M: ');

    for (let i = 0; i < this.m_contacts.length; ++i) {
      const contact = this.m_contacts[i];
      contact.initVelocityConstraint(step);
    }

    _DEBUG && this.printBodies('R: ');

    if (step.warmStarting) {
      // Warm start.
      for (let i = 0; i < this.m_contacts.length; ++i) {
        const contact = this.m_contacts[i];
        contact.warmStartConstraint(step);
      }
    }

    _DEBUG && this.printBodies('Q: ');

    for (let i = 0; i < this.m_joints.length; ++i) {
      const joint = this.m_joints[i];
      joint.initVelocityConstraints(step);
    }

    _DEBUG && this.printBodies('E: ');

    // Solve velocity constraints
    for (let i = 0; i < step.velocityIterations; ++i) {
      for (let j = 0; j < this.m_joints.length; ++j) {
        const joint = this.m_joints[j];
        joint.solveVelocityConstraints(step);
      }

      for (let j = 0; j < this.m_contacts.length; ++j) {
        const contact = this.m_contacts[j];
        contact.solveVelocityConstraint(step);
      }
    }

    _DEBUG && this.printBodies('D: ');

    // Store impulses for warm starting
    for (let i = 0; i < this.m_contacts.length; ++i) {
      const contact = this.m_contacts[i];
      contact.storeConstraintImpulses(step);
    }

    _DEBUG && this.printBodies('C: ');

    // Integrate positions
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const body = this.m_bodies[i];

      const c = Vec2.clone(body.c_position.c);
      let a = body.c_position.a;
      const v = Vec2.clone(body.c_velocity.v);
      let w = body.c_velocity.w;

      // Check for large velocities
      const translation = Vec2.mulNumVec2(h, v);
      if (Vec2.lengthSquared(translation) > Settings.maxTranslationSquared) {
        const ratio = Settings.maxTranslation / translation.length();
        v.mul(ratio);
      }

      const rotation = h * w;
      if (rotation * rotation > Settings.maxRotationSquared) {
        const ratio = Settings.maxRotation / Math.abs(rotation);
        w *= ratio;
      }

      // Integrate
      c.addMul(h, v);
      a += h * w;

      body.c_position.c.setVec2(c);
      body.c_position.a = a;
      body.c_velocity.v.setVec2(v);
      body.c_velocity.w = w;
    }

    _DEBUG && this.printBodies('B: ');

    // Solve position constraints
    let positionSolved = false;
    for (let i = 0; i < step.positionIterations; ++i) {
      let minSeparation = 0.0;
      for (let j = 0; j < this.m_contacts.length; ++j) {
        const contact = this.m_contacts[j];
        const separation = contact.solvePositionConstraint(step);
        minSeparation = Math.min(minSeparation, separation);
      }
      // We can't expect minSpeparation >= -Settings.linearSlop because we don't
      // push the separation above -Settings.linearSlop.
      const contactsOkay = minSeparation >= -3.0 * Settings.linearSlop;

      let jointsOkay = true;
      for (let j = 0; j < this.m_joints.length; ++j) {
        const joint = this.m_joints[j];
        const jointOkay = joint.solvePositionConstraints(step);
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
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const body = this.m_bodies[i];

      body.m_sweep.c.setVec2(body.c_position.c);
      body.m_sweep.a = body.c_position.a;
      body.m_linearVelocity.setVec2(body.c_velocity.v);
      body.m_angularVelocity = body.c_velocity.w;
      body.synchronizeTransform();
    }

    this.postSolveIsland();

    if (allowSleep) {
      let minSleepTime = Infinity;

      const linTolSqr = Settings.linearSleepToleranceSqr;
      const angTolSqr = Settings.angularSleepToleranceSqr;

      for (let i = 0; i < this.m_bodies.length; ++i) {
        const body = this.m_bodies[i];
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
        for (let i = 0; i < this.m_bodies.length; ++i) {
          const body = this.m_bodies[i];
          body.setAwake(false);
        }
      }
    }
  }

  /** @internal */
  printBodies(tag: string): void {
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const b = this.m_bodies[i];
      common.debug(tag, b.c_position.a, b.c_position.c.x, b.c_position.c.y, b.c_velocity.w, b.c_velocity.v.x, b.c_velocity.v.y);
    }
  }

  /**
   * Find TOI contacts and solve them.
   */
  solveWorldTOI(step: TimeStep): void {
    const world = this.m_world;

    if (world.m_stepComplete) {
      for (let b = world.m_bodyList; b; b = b.m_next) {
        b.m_islandFlag = false;
        b.m_sweep.alpha0 = 0.0;
      }

      for (let c = world.m_contactList; c; c = c.m_next) {
        // Invalidate TOI
        c.m_toiFlag = false;
        c.m_islandFlag = false;
        c.m_toiCount = 0;
        c.m_toi = 1.0;
      }
    }

    // Find TOI events and solve them.
    while (true) {
      // Find the first TOI.
      let minContact = null; // Contact
      let minAlpha = 1.0;

      for (let c = world.m_contactList; c; c = c.m_next) {
        // Is this contact disabled?
        if (c.isEnabled() == false) {
          continue;
        }

        // Prevent excessive sub-stepping.
        if (c.m_toiCount > Settings.maxSubSteps) {
          continue;
        }

        let alpha = 1.0;
        if (c.m_toiFlag) {
          // This contact has a valid cached TOI.
          alpha = c.m_toi;
        } else {
          const fA = c.getFixtureA();
          const fB = c.getFixtureB();

          // Is there a sensor?
          if (fA.isSensor() || fB.isSensor()) {
            continue;
          }

          const bA = fA.getBody();
          const bB = fB.getBody();

          _ASSERT && common.assert(bA.isDynamic() || bB.isDynamic());

          const activeA = bA.isAwake() && !bA.isStatic();
          const activeB = bB.isAwake() && !bB.isStatic();

          // Is at least one body active (awake and dynamic or kinematic)?
          if (activeA == false && activeB == false) {
            continue;
          }

          const collideA = bA.isBullet() || !bA.isDynamic();
          const collideB = bB.isBullet() || !bB.isDynamic();

          // Are these two non-bullet dynamic bodies?
          if (collideA == false && collideB == false) {
            continue;
          }

          // Compute the TOI for this contact.
          // Put the sweeps onto the same time interval.
          let alpha0 = bA.m_sweep.alpha0;

          if (bA.m_sweep.alpha0 < bB.m_sweep.alpha0) {
            alpha0 = bB.m_sweep.alpha0;
            bA.m_sweep.advance(alpha0);
          } else if (bB.m_sweep.alpha0 < bA.m_sweep.alpha0) {
            alpha0 = bA.m_sweep.alpha0;
            bB.m_sweep.advance(alpha0);
          }

          _ASSERT && common.assert(alpha0 < 1.0);

          const indexA = c.getChildIndexA();
          const indexB = c.getChildIndexB();

          const sweepA = bA.m_sweep;
          const sweepB = bB.m_sweep;

          // Compute the time of impact in interval [0, minTOI]
          const input = new TOIInput(); // TODO: reuse
          input.proxyA.set(fA.getShape(), indexA);
          input.proxyB.set(fB.getShape(), indexB);
          input.sweepA.set(bA.m_sweep);
          input.sweepB.set(bB.m_sweep);
          input.tMax = 1.0;

          const output = new TOIOutput(); // TODO: reuse
          TimeOfImpact(output, input);

          // Beta is the fraction of the remaining portion of the [time?].
          const beta = output.t;
          if (output.state == TOIOutputState.e_touching) {
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
      const fA = minContact.getFixtureA();
      const fB = minContact.getFixtureB();
      const bA = fA.getBody();
      const bB = fB.getBody();

      const backup1 = bA.m_sweep.clone();
      const backup2 = bB.m_sweep.clone();

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
      const bodies = [ bA, bB ];
      for (let i = 0; i < bodies.length; ++i) {
        const body = bodies[i];
        if (body.isDynamic()) {
          for (let ce = body.m_contactList; ce; ce = ce.next) {
            // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
            // if (this.m_contactCount == this.m_contactCapacity) { break; }

            const contact = ce.contact;

            // Has this contact already been added to the island?
            if (contact.m_islandFlag) {
              continue;
            }

            // Only add if either is static, kinematic or bullet.
            const other = ce.other;
            if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
              continue;
            }

            // Skip sensors.
            const sensorA = contact.m_fixtureA.m_isSensor;
            const sensorB = contact.m_fixtureB.m_isSensor;
            if (sensorA || sensorB) {
              continue;
            }

            // Tentatively advance the body to the TOI.
            const backup = other.m_sweep.clone();
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
      for (let i = 0; i < this.m_bodies.length; ++i) {
        const body = this.m_bodies[i];
        body.m_islandFlag = false;

        if (!body.isDynamic()) {
          continue;
        }

        body.synchronizeFixtures();

        // Invalidate all contact TOIs on this displaced body.
        for (let ce = body.m_contactList; ce; ce = ce.next) {
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

    if (_DEBUG) for (let b = world.m_bodyList; b; b = b.m_next) {
      const c = b.m_sweep.c;
      const a = b.m_sweep.a;
      const v = b.m_linearVelocity;
      const w = b.m_angularVelocity;
    }
  }

  solveIslandTOI(subStep: TimeStep, toiA: Body, toiB: Body): void {
    const world = this.m_world;

    // Initialize the body state.
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const body = this.m_bodies[i];
      body.c_position.c.setVec2(body.m_sweep.c);
      body.c_position.a = body.m_sweep.a;
      body.c_velocity.v.setVec2(body.m_linearVelocity);
      body.c_velocity.w = body.m_angularVelocity;
    }

    for (let i = 0; i < this.m_contacts.length; ++i) {
      const contact = this.m_contacts[i];
      contact.initConstraint(subStep);
    }

    // Solve position constraints.
    for (let i = 0; i < subStep.positionIterations; ++i) {
      let minSeparation = 0.0;
      for (let j = 0; j < this.m_contacts.length; ++j) {
        const contact = this.m_contacts[j];
        const separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
        minSeparation = Math.min(minSeparation, separation);
      }
      // We can't expect minSpeparation >= -Settings.linearSlop because we don't
      // push the separation above -Settings.linearSlop.
      const contactsOkay = minSeparation >= -1.5 * Settings.linearSlop;
      if (contactsOkay) {
        break;
      }
    }

    if (false) {
      // Is the new position really safe?
      for (let i = 0; i < this.m_contacts.length; ++i) {
        const c = this.m_contacts[i];
        const fA = c.getFixtureA();
        const fB = c.getFixtureB();

        const bA = fA.getBody();
        const bB = fB.getBody();

        const indexA = c.getChildIndexA();
        const indexB = c.getChildIndexB();

        const input = new DistanceInput();
        input.proxyA.set(fA.getShape(), indexA);
        input.proxyB.set(fB.getShape(), indexB);
        input.transformA = bA.getTransform();
        input.transformB = bB.getTransform();
        input.useRadii = false;

        const output = new DistanceOutput();
        const cache = new SimplexCache();
        Distance(output, cache, input);

        if (output.distance == 0 || cache.count == 3) {
          cache.count += 0;
        }
      }
    }

    // Leap of faith to new safe state.
    toiA.m_sweep.c0.setVec2(toiA.c_position.c);
    toiA.m_sweep.a0 = toiA.c_position.a;
    toiB.m_sweep.c0.setVec2(toiB.c_position.c);
    toiB.m_sweep.a0 = toiB.c_position.a;

    // No warm starting is needed for TOI events because warm
    // starting impulses were applied in the discrete solver.
    for (let i = 0; i < this.m_contacts.length; ++i) {
      const contact = this.m_contacts[i];
      contact.initVelocityConstraint(subStep);
    }

    // Solve velocity constraints.
    for (let i = 0; i < subStep.velocityIterations; ++i) {
      for (let j = 0; j < this.m_contacts.length; ++j) {
        const contact = this.m_contacts[j];
        contact.solveVelocityConstraint(subStep);
      }
    }

    // Don't store the TOI contact forces for warm starting
    // because they can be quite large.

    const h = subStep.dt;

    // Integrate positions
    for (let i = 0; i < this.m_bodies.length; ++i) {
      const body = this.m_bodies[i];

      const c = Vec2.clone(body.c_position.c);
      let a = body.c_position.a;
      const v = Vec2.clone(body.c_velocity.v);
      let w = body.c_velocity.w;

      // Check for large velocities
      const translation = Vec2.mulNumVec2(h, v);
      if (Vec2.dot(translation, translation) > Settings.maxTranslationSquared) {
        const ratio = Settings.maxTranslation / translation.length();
        v.mul(ratio);
      }

      const rotation = h * w;
      if (rotation * rotation > Settings.maxRotationSquared) {
        const ratio = Settings.maxRotation / Math.abs(rotation);
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
  }

  /** @internal */
  postSolveIsland(): void {
    for (let c = 0; c < this.m_contacts.length; ++c) {
      const contact = this.m_contacts[c];
      this.m_world.postSolve(contact, contact.m_impulse);
    }
  }
}
