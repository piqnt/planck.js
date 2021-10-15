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


import common from '../util/common';
import options from '../util/options';
import Vec2 from '../common/Vec2';
import Rot from '../common/Rot';
import Math from '../common/Math';
import Sweep from '../common/Sweep';
import Transform from '../common/Transform';
import Velocity from './Velocity';
import Position from './Position';
import Fixture, { FixtureDef, FixtureOpt } from './Fixture';
import Shape from '../collision/Shape';
import { JointEdge } from "./Joint";
import World from "./World";
import { ContactEdge } from "./Contact";

const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

export type BodyType = 'static' | 'kinematic' | 'dynamic';

const STATIC = 'static';
const KINEMATIC = 'kinematic';
const DYNAMIC = 'dynamic';

export interface BodyDef {
  /**
   * Body types are static, kinematic, or dynamic. Note: if a dynamic
   * body would have zero mass, the mass is set to one.
   */
  type?: BodyType;
  /**
   * The world position of the body. Avoid creating bodies at the
   * origin since this can lead to many overlapping shapes.
   */
  position?: Vec2;
  /**
   * The world angle of the body in radians.
   */
  angle?: number;
  /**
   * The linear velocity of the body's origin in world co-ordinates.
   */
  linearVelocity?: Vec2;
  angularVelocity?: number;
  /**
   * Linear damping is use to reduce the linear velocity. The
   * damping parameter can be larger than 1.0 but the damping effect becomes
   * sensitive to the time step when the damping parameter is large.
   */
  linearDamping?: number;
  /**
   * Angular damping is use to reduce the angular velocity.
   * The damping parameter can be larger than 1.0 but the damping effect
   * becomes sensitive to the time step when the damping parameter is large.
   */
  angularDamping?: number;
  /**
   * Should this body be prevented from rotating? Useful for characters.
   */
  fixedRotation?: boolean;
  /**
   * Is this a fast moving body that should be prevented from
   * tunneling through other moving bodies? Note that all bodies are
   * prevented from tunneling through kinematic and static bodies. This
   * setting is only considered on dynamic bodies. Warning: You should use
   * this flag sparingly since it increases processing time.
   */
  bullet?: boolean;
  gravityScale?: number;
  /**
   * Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.
   */
  allowSleep?: boolean;
  /**
   * Is this body initially awake or sleeping?
   */
  awake?: boolean;
  /**
   * Does this body start out active?
   */
  active?: boolean;
  userData?: any;
}

const BodyDefDefault: BodyDef = {
  type : STATIC,
  position : Vec2.zero(),
  angle : 0.0,

  linearVelocity : Vec2.zero(),
  angularVelocity : 0.0,

  linearDamping : 0.0,
  angularDamping : 0.0,

  fixedRotation : false,
  bullet : false,
  gravityScale : 1.0,

  allowSleep : true,
  awake : true,
  active : true,

  userData : null
};

/**
 * MassData This holds the mass data computed for a shape.
 */
export class MassData {
  /** The mass of the shape, usually in kilograms. */
  mass: number = 0;
  /** The position of the shape's centroid relative to the shape's origin. */
  center: Vec2 = Vec2.zero();
  /** The rotational inertia of the shape about the local origin. */
  I: number = 0;
}

/**
 * A rigid body composed of one or more fixtures.
 *
 * To create a new Body use {@link World.createBody}.
 */
export default class Body {
  /**
   * A static body does not move under simulation and behaves as if it has infinite mass.
   * Internally, zero is stored for the mass and the inverse mass.
   * Static bodies can be moved manually by the user.
   * A static body has zero velocity.
   * Static bodies do not collide with other static or kinematic bodies.
   */
  static readonly STATIC: BodyType = 'static';
  /**
   * A kinematic body moves under simulation according to its velocity.
   * Kinematic bodies do not respond to forces.
   * They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
   * A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
   * Kinematic bodies do not collide with other kinematic or static bodies.
   */
  static readonly KINEMATIC: BodyType = 'kinematic';

  /**
   * A dynamic body is fully simulated.
   * They can be moved manually by the user, but normally they move according to forces.
   * A dynamic body can collide with all body types.
   * A dynamic body always has finite, non-zero mass.
   * If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.
   */
  static readonly DYNAMIC: BodyType = 'dynamic';

  /** @internal */ m_world: World;
  /** @internal */ m_awakeFlag: boolean;
  /** @internal */ m_autoSleepFlag: boolean;
  /** @internal */ m_bulletFlag: boolean;
  /** @internal */ m_fixedRotationFlag: boolean;
  /** @internal */ m_activeFlag: boolean;
  /** @internal */ m_islandFlag: boolean;
  /** @internal */ m_toiFlag: boolean;
  /** @internal */ m_userData: unknown;
  /** @internal */ m_type: BodyType;
  /** @internal */ m_mass: number;
  /** @internal */ m_invMass: number;
  /** @internal Rotational inertia about the center of mass. */
  m_I: number;
  /** @internal */ m_invI: number;
  /** @internal the body origin transform */
  m_xf: Transform;
  /** @internal the swept motion for CCD */
  m_sweep: Sweep;
  // position and velocity correction
  /** @internal */ c_velocity: Velocity;
  /** @internal */ c_position: Position;
  /** @internal */ m_force: Vec2;
  /** @internal */ m_torque: number;
  /** @internal */ m_linearVelocity: Vec2;
  /** @internal */ m_angularVelocity: number;
  /** @internal */ m_linearDamping: number;
  /** @internal */ m_angularDamping: number;
  /** @internal */ m_gravityScale: number;
  /** @internal */ m_sleepTime: number;
  /** @internal */ m_jointList: JointEdge | null;
  /** @internal */ m_contactList: ContactEdge | null;
  /** @internal */ m_fixtureList: Fixture | null;
  /** @internal */ m_prev: Body | null;
  /** @internal */ m_next: Body | null;
  /** @internal */ m_destroyed: boolean;

  /** @internal */
  constructor(world: World, def: BodyDef) {
    def = options(def, BodyDefDefault);

    _ASSERT && common.assert(Vec2.isValid(def.position));
    _ASSERT && common.assert(Vec2.isValid(def.linearVelocity));
    _ASSERT && common.assert(Math.isFinite(def.angle));
    _ASSERT && common.assert(Math.isFinite(def.angularVelocity));
    _ASSERT && common.assert(Math.isFinite(def.angularDamping) && def.angularDamping >= 0.0);
    _ASSERT && common.assert(Math.isFinite(def.linearDamping) && def.linearDamping >= 0.0);

    this.m_world = world;

    this.m_awakeFlag = def.awake;
    this.m_autoSleepFlag = def.allowSleep;
    this.m_bulletFlag = def.bullet;
    this.m_fixedRotationFlag = def.fixedRotation;
    this.m_activeFlag = def.active;

    this.m_islandFlag = false;
    this.m_toiFlag = false;

    this.m_userData = def.userData;
    this.m_type = def.type;

    if (this.m_type == DYNAMIC) {
      this.m_mass = 1.0;
      this.m_invMass = 1.0;
    } else {
      this.m_mass = 0.0;
      this.m_invMass = 0.0;
    }

    // Rotational inertia about the center of mass.
    this.m_I = 0.0;
    this.m_invI = 0.0;

    // the body origin transform
    this.m_xf = Transform.identity();
    this.m_xf.p = Vec2.clone(def.position);
    this.m_xf.q.setAngle(def.angle);

    // the swept motion for CCD
    this.m_sweep = new Sweep();
    this.m_sweep.setTransform(this.m_xf);

    // position and velocity correction
    this.c_velocity = new Velocity();
    this.c_position = new Position();

    this.m_force = Vec2.zero();
    this.m_torque = 0.0;

    this.m_linearVelocity = Vec2.clone(def.linearVelocity);
    this.m_angularVelocity = def.angularVelocity;

    this.m_linearDamping = def.linearDamping;
    this.m_angularDamping = def.angularDamping;
    this.m_gravityScale = def.gravityScale;

    this.m_sleepTime = 0.0;

    this.m_jointList = null;
    this.m_contactList = null;
    this.m_fixtureList = null;

    this.m_prev = null;
    this.m_next = null;

    this.m_destroyed = false;
  }

  /** @internal */
  _serialize(): object {
    const fixtures = [];
    for (let f = this.m_fixtureList; f; f = f.m_next) {
      fixtures.push(f);
    }
    return {
      type: this.m_type,
      bullet: this.m_bulletFlag,
      position: this.m_xf.p,
      angle: this.m_xf.q.getAngle(),
      linearVelocity: this.m_linearVelocity,
      angularVelocity: this.m_angularVelocity,
      fixtures,
    };
  }

  /** @internal */
  static _deserialize(data: any, world: any, restore: any): Body {
    const body = new Body(world, data);

    if (data.fixtures) {
      for (let i = data.fixtures.length - 1; i >= 0; i--) {
        const fixture = restore(Fixture, data.fixtures[i], body);
        body._addFixture(fixture);
      }
    }
    return body;
  }

  isWorldLocked(): boolean {
    return this.m_world && this.m_world.isLocked() ? true : false;
  }

  getWorld(): World {
    return this.m_world;
  }

  getNext(): Body | null {
    return this.m_next;
  }

  setUserData(data: any): void {
    this.m_userData = data;
  }

  getUserData(): unknown {
    return this.m_userData;
  }

  getFixtureList(): Fixture | null {
    return this.m_fixtureList;
  }

  getJointList(): JointEdge | null {
    return this.m_jointList;
  }

  /**
   * Warning: this list changes during the time step and you may miss some
   * collisions if you don't use ContactListener.
   */
  getContactList(): ContactEdge | null {
    return this.m_contactList;
  }

  isStatic(): boolean {
    return this.m_type == STATIC;
  }

  isDynamic(): boolean {
    return this.m_type == DYNAMIC;
  }

  isKinematic(): boolean {
    return this.m_type == KINEMATIC;
  }

  /**
   * This will alter the mass and velocity.
   */
  setStatic(): Body {
    this.setType(STATIC);
    return this;
  }

  setDynamic(): Body {
    this.setType(DYNAMIC);
    return this;
  }

  setKinematic(): Body {
    this.setType(KINEMATIC);
    return this;
  }

  /**
   * @internal
   */
  getType(): BodyType {
    return this.m_type;
  }

  /**
   * @internal
   */
  setType(type: BodyType): void {
    _ASSERT && common.assert(type === STATIC || type === KINEMATIC || type === DYNAMIC);
    _ASSERT && common.assert(this.isWorldLocked() == false);

    if (this.isWorldLocked() == true) {
      return;
    }

    if (this.m_type == type) {
      return;
    }

    this.m_type = type;

    this.resetMassData();

    if (this.m_type == STATIC) {
      this.m_linearVelocity.setZero();
      this.m_angularVelocity = 0.0;
      this.m_sweep.forward();
      this.synchronizeFixtures();
    }

    this.setAwake(true);

    this.m_force.setZero();
    this.m_torque = 0.0;

    // Delete the attached contacts.
    let ce = this.m_contactList;
    while (ce) {
      const ce0 = ce;
      ce = ce.next;
      this.m_world.destroyContact(ce0.contact);
    }
    this.m_contactList = null;

    // Touch the proxies so that new contacts will be created (when appropriate)
    const broadPhase = this.m_world.m_broadPhase;
    for (let f = this.m_fixtureList; f; f = f.m_next) {
      const proxyCount = f.m_proxyCount;
      for (let i = 0; i < proxyCount; ++i) {
        broadPhase.touchProxy(f.m_proxies[i].proxyId);
      }
    }
  }

  isBullet(): boolean {
    return this.m_bulletFlag;
  }

  /**
   * Should this body be treated like a bullet for continuous collision detection?
   */
  setBullet(flag: boolean): void {
    this.m_bulletFlag = !!flag;
  }

  isSleepingAllowed(): boolean {
    return this.m_autoSleepFlag;
  }

  setSleepingAllowed(flag: boolean): void {
    this.m_autoSleepFlag = !!flag;
    if (this.m_autoSleepFlag == false) {
      this.setAwake(true);
    }
  }

  isAwake(): boolean {
    return this.m_awakeFlag;
  }

  /**
   * Set the sleep state of the body. A sleeping body has very low CPU cost.
   *
   * @param flag Set to true to wake the body, false to put it to sleep.
   */
  setAwake(flag: boolean): void {
    if (flag) {
      if (this.m_awakeFlag == false) {
        this.m_awakeFlag = true;
        this.m_sleepTime = 0.0;
      }
    } else {
      this.m_awakeFlag = false;
      this.m_sleepTime = 0.0;
      this.m_linearVelocity.setZero();
      this.m_angularVelocity = 0.0;
      this.m_force.setZero();
      this.m_torque = 0.0;
    }
  }

  isActive(): boolean {
    return this.m_activeFlag;
  }

  /**
   * Set the active state of the body. An inactive body is not simulated and
   * cannot be collided with or woken up. If you pass a flag of true, all fixtures
   * will be added to the broad-phase. If you pass a flag of false, all fixtures
   * will be removed from the broad-phase and all contacts will be destroyed.
   * Fixtures and joints are otherwise unaffected.
   *
   * You may continue to create/destroy fixtures and joints on inactive bodies.
   * Fixtures on an inactive body are implicitly inactive and will not participate
   * in collisions, ray-casts, or queries. Joints connected to an inactive body
   * are implicitly inactive. An inactive body is still owned by a World object
   * and remains
   */
  setActive(flag: boolean): void {
    _ASSERT && common.assert(this.isWorldLocked() == false);

    if (flag == this.m_activeFlag) {
      return;
    }

    this.m_activeFlag = !!flag;

    if (this.m_activeFlag) {
      // Create all proxies.
      const broadPhase = this.m_world.m_broadPhase;
      for (let f = this.m_fixtureList; f; f = f.m_next) {
        f.createProxies(broadPhase, this.m_xf);
      }
      // Contacts are created the next time step.

    } else {
      // Destroy all proxies.
      const broadPhase = this.m_world.m_broadPhase;
      for (let f = this.m_fixtureList; f; f = f.m_next) {
        f.destroyProxies(broadPhase);
      }

      // Destroy the attached contacts.
      let ce = this.m_contactList;
      while (ce) {
        const ce0 = ce;
        ce = ce.next;
        this.m_world.destroyContact(ce0.contact);
      }
      this.m_contactList = null;
    }
  }

  isFixedRotation(): boolean {
    return this.m_fixedRotationFlag;
  }

  /**
   * Set this body to have fixed rotation. This causes the mass to be reset.
   */
  setFixedRotation(flag: boolean): void {
    if (this.m_fixedRotationFlag == flag) {
      return;
    }

    this.m_fixedRotationFlag = !!flag;

    this.m_angularVelocity = 0.0;

    this.resetMassData();
  }

  /**
   * Get the world transform for the body's origin.
   */
  getTransform(): Transform {
    return this.m_xf;
  }

  /**
   * Set the position of the body's origin and rotation. Manipulating a body's
   * transform may cause non-physical behavior. Note: contacts are updated on the
   * next call to World.step.
   *
   * @param position The world position of the body's local origin.
   * @param angle The world rotation in radians.
   */
  setTransform(position: Vec2, angle: number): void {
    _ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
      return;
    }

    this.m_xf.set(position, angle);
    this.m_sweep.setTransform(this.m_xf);

    const broadPhase = this.m_world.m_broadPhase;
    for (let f = this.m_fixtureList; f; f = f.m_next) {
      f.synchronize(broadPhase, this.m_xf, this.m_xf);
    }
  }

  synchronizeTransform(): void {
    this.m_sweep.getTransform(this.m_xf, 1);
  }

  /**
   * Update fixtures in broad-phase.
   */
  synchronizeFixtures(): void {
    const xf = Transform.identity();

    this.m_sweep.getTransform(xf, 0);

    const broadPhase = this.m_world.m_broadPhase;
    for (let f = this.m_fixtureList; f; f = f.m_next) {
      f.synchronize(broadPhase, xf, this.m_xf);
    }
  }

  /**
   * Used in TOI.
   */
  advance(alpha: number): void {
    // Advance to the new safe time. This doesn't sync the broad-phase.
    this.m_sweep.advance(alpha);
    this.m_sweep.c.set(this.m_sweep.c0);
    this.m_sweep.a = this.m_sweep.a0;
    this.m_sweep.getTransform(this.m_xf, 1);
  }

  /**
   * Get the world position for the body's origin.
   */
  getPosition(): Vec2 {
    return this.m_xf.p;
  }

  setPosition(p: Vec2): void {
    this.setTransform(p, this.m_sweep.a);
  }

  /**
   * Get the current world rotation angle in radians.
   */
  getAngle(): number {
    return this.m_sweep.a;
  }

  setAngle(angle: number): void {
    this.setTransform(this.m_xf.p, angle);
  }

  /**
   * Get the world position of the center of mass.
   */
  getWorldCenter(): Vec2 {
    return this.m_sweep.c;
  }

  /**
   * Get the local position of the center of mass.
   */
  getLocalCenter(): Vec2 {
    return this.m_sweep.localCenter;
  }

  /**
   * Get the linear velocity of the center of mass.
   *
   * @return the linear velocity of the center of mass.
   */
  getLinearVelocity(): Vec2 {
    return this.m_linearVelocity;
  }

  /**
   * Get the world linear velocity of a world point attached to this body.
   *
   * @param worldPoint A point in world coordinates.
   */
  getLinearVelocityFromWorldPoint(worldPoint: Vec2): Vec2 {
    const localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
    return Vec2.add(this.m_linearVelocity, Vec2.cross(this.m_angularVelocity,
      localCenter));
  }

  /**
   * Get the world velocity of a local point.
   *
   * @param localPoint A point in local coordinates.
   */
  getLinearVelocityFromLocalPoint(localPoint: Vec2): Vec2 {
    return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
  }

  /**
   * Set the linear velocity of the center of mass.
   *
   * @param v The new linear velocity of the center of mass.
   */
  setLinearVelocity(v: Vec2): void {
    if (this.m_type == STATIC) {
      return;
    }
    if (Vec2.dot(v, v) > 0.0) {
      this.setAwake(true);
    }
    this.m_linearVelocity.set(v);
  }

  /**
   * Get the angular velocity.
   *
   * @returns the angular velocity in radians/second.
   */
  getAngularVelocity(): number {
    return this.m_angularVelocity;
  }

  /**
   * Set the angular velocity.
   *
   * @param omega The new angular velocity in radians/second.
   */
  setAngularVelocity(w: number): void {
    if (this.m_type == STATIC) {
      return;
    }
    if (w * w > 0.0) {
      this.setAwake(true);
    }
    this.m_angularVelocity = w;
  }

  getLinearDamping(): number {
    return this.m_linearDamping;
  }

  setLinearDamping(linearDamping: number): void {
    this.m_linearDamping = linearDamping;
  }

  getAngularDamping(): number {
    return this.m_angularDamping;
  }

  setAngularDamping(angularDamping: number): void {
    this.m_angularDamping = angularDamping;
  }

  getGravityScale(): number {
    return this.m_gravityScale;
  }

  /**
   * Scale the gravity applied to this body.
   */
  setGravityScale(scale: number): void {
    this.m_gravityScale = scale;
  }

  /**
   * Get the total mass of the body.
   *
   * @returns The mass, usually in kilograms (kg).
   */
  getMass(): number {
    return this.m_mass;
  }

  /**
   * Get the rotational inertia of the body about the local origin.
   *
   * @return the rotational inertia, usually in kg-m^2.
   */
  getInertia(): number {
    return this.m_I + this.m_mass
      * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
  }

  /**
   * Copy the mass data of the body to data.
   */
  getMassData(data: MassData): void {
    data.mass = this.m_mass;
    data.I = this.getInertia();
    data.center.set(this.m_sweep.localCenter);
  }

  /**
   * This resets the mass properties to the sum of the mass properties of the
   * fixtures. This normally does not need to be called unless you called
   * SetMassData to override the mass and you later want to reset the mass.
   */
  resetMassData(): void {
    // Compute mass data from shapes. Each shape has its own density.
    this.m_mass = 0.0;
    this.m_invMass = 0.0;
    this.m_I = 0.0;
    this.m_invI = 0.0;
    this.m_sweep.localCenter.setZero();

    // Static and kinematic bodies have zero mass.
    if (this.isStatic() || this.isKinematic()) {
      this.m_sweep.c0.set(this.m_xf.p);
      this.m_sweep.c.set(this.m_xf.p);
      this.m_sweep.a0 = this.m_sweep.a;
      return;
    }

    _ASSERT && common.assert(this.isDynamic());

    // Accumulate mass over all fixtures.
    const localCenter = Vec2.zero();
    for (let f = this.m_fixtureList; f; f = f.m_next) {
      if (f.m_density == 0.0) {
        continue;
      }

      const massData = new MassData();
      f.getMassData(massData);
      this.m_mass += massData.mass;
      localCenter.addMul(massData.mass, massData.center);
      this.m_I += massData.I;
    }

    // Compute center of mass.
    if (this.m_mass > 0.0) {
      this.m_invMass = 1.0 / this.m_mass;
      localCenter.mul(this.m_invMass);

    } else {
      // Force all dynamic bodies to have a positive mass.
      this.m_mass = 1.0;
      this.m_invMass = 1.0;
    }

    if (this.m_I > 0.0 && this.m_fixedRotationFlag == false) {
      // Center the inertia about the center of mass.
      this.m_I -= this.m_mass * Vec2.dot(localCenter, localCenter);
      _ASSERT && common.assert(this.m_I > 0.0);
      this.m_invI = 1.0 / this.m_I;

    } else {
      this.m_I = 0.0;
      this.m_invI = 0.0;
    }

    // Move center of mass.
    const oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(localCenter, this.m_xf);

    // Update center of mass velocity.
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(
      this.m_sweep.c, oldCenter)));
  }

  /**
   * Set the mass properties to override the mass properties of the fixtures. Note
   * that this changes the center of mass position. Note that creating or
   * destroying fixtures can also alter the mass. This function has no effect if
   * the body isn't dynamic.
   *
   * @param massData The mass properties.
   */
  setMassData(massData: MassData): void {
    _ASSERT && common.assert(this.isWorldLocked() == false);
    if (this.isWorldLocked() == true) {
      return;
    }

    if (this.m_type != DYNAMIC) {
      return;
    }

    this.m_invMass = 0.0;
    this.m_I = 0.0;
    this.m_invI = 0.0;

    this.m_mass = massData.mass;
    if (this.m_mass <= 0.0) {
      this.m_mass = 1.0;
    }

    this.m_invMass = 1.0 / this.m_mass;

    if (massData.I > 0.0 && this.m_fixedRotationFlag == false) {
      this.m_I = massData.I - this.m_mass
        * Vec2.dot(massData.center, massData.center);
      _ASSERT && common.assert(this.m_I > 0.0);
      this.m_invI = 1.0 / this.m_I;
    }

    // Move center of mass.
    const oldCenter = Vec2.clone(this.m_sweep.c);
    this.m_sweep.setLocalCenter(massData.center, this.m_xf);

    // Update center of mass velocity.
    this.m_linearVelocity.add(Vec2.cross(this.m_angularVelocity, Vec2.sub(
      this.m_sweep.c, oldCenter)));
  }

  /**
   * Apply a force at a world point. If the force is not applied at the center of
   * mass, it will generate a torque and affect the angular velocity. This wakes
   * up the body.
   *
   * @param force The world force vector, usually in Newtons (N).
   * @param point The world position of the point of application.
   * @param wake Also wake up the body
   */
  applyForce(force: Vec2, point: Vec2, wake: boolean = true): void {
    if (this.m_type != DYNAMIC) {
      return;
    }
    if (wake && this.m_awakeFlag == false) {
      this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping.
    if (this.m_awakeFlag) {
      this.m_force.add(force);
      this.m_torque += Vec2.cross(Vec2.sub(point, this.m_sweep.c), force);
    }
  }

  /**
   * Apply a force to the center of mass. This wakes up the body.
   *
   * @param force The world force vector, usually in Newtons (N).
   * @param wake Also wake up the body
   */
  applyForceToCenter(force: Vec2, wake: boolean = true): void {
    if (this.m_type != DYNAMIC) {
      return;
    }
    if (wake && this.m_awakeFlag == false) {
      this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping
    if (this.m_awakeFlag) {
      this.m_force.add(force);
    }
  }

  /**
   * Apply a torque. This affects the angular velocity without affecting the
   * linear velocity of the center of mass. This wakes up the body.
   *
   * @param torque About the z-axis (out of the screen), usually in N-m.
   * @param wake Also wake up the body
   */
  applyTorque(torque: number, wake: boolean = true): void {
    if (this.m_type != DYNAMIC) {
      return;
    }
    if (wake && this.m_awakeFlag == false) {
      this.setAwake(true);
    }
    // Don't accumulate a force if the body is sleeping
    if (this.m_awakeFlag) {
      this.m_torque += torque;
    }
  }

  /**
   * Apply an impulse at a point. This immediately modifies the velocity. It also
   * modifies the angular velocity if the point of application is not at the
   * center of mass. This wakes up the body.
   *
   * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
   * @param point The world position of the point of application.
   * @param wake Also wake up the body
   */
  applyLinearImpulse(impulse: Vec2, point: Vec2, wake: boolean = true): void {
    if (this.m_type != DYNAMIC) {
      return;
    }
    if (wake && this.m_awakeFlag == false) {
      this.setAwake(true);
    }

    // Don't accumulate velocity if the body is sleeping
    if (this.m_awakeFlag) {
      this.m_linearVelocity.addMul(this.m_invMass, impulse);
      this.m_angularVelocity += this.m_invI * Vec2.cross(Vec2.sub(point, this.m_sweep.c), impulse);
    }
  }

  /**
   * Apply an angular impulse.
   *
   * @param impulse The angular impulse in units of kg*m*m/s
   * @param wake Also wake up the body
   */
  applyAngularImpulse(impulse: number, wake: boolean = true): void {
    if (this.m_type != DYNAMIC) {
      return;
    }

    if (wake && this.m_awakeFlag == false) {
      this.setAwake(true);
    }
    // Don't accumulate velocity if the body is sleeping
    if (this.m_awakeFlag) {
      this.m_angularVelocity += this.m_invI * impulse;
    }
  }

  /**
   * This is used to prevent connected bodies (by joints) from colliding,
   * depending on the joint's collideConnected flag.
   */
  shouldCollide(that: Body): boolean {
    // At least one body should be dynamic.
    if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
      return false;
    }
    // Does a joint prevent collision?
    for (let jn = this.m_jointList; jn; jn = jn.next) {
      if (jn.other == that) {
        if (jn.joint.m_collideConnected == false) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * @internal Used for deserialize.
   */
  _addFixture(fixture: Fixture): Fixture {
    _ASSERT && common.assert(this.isWorldLocked() == false);

    if (this.isWorldLocked() == true) {
      return null;
    }

    if (this.m_activeFlag) {
      const broadPhase = this.m_world.m_broadPhase;
      fixture.createProxies(broadPhase, this.m_xf);
    }

    fixture.m_next = this.m_fixtureList;
    this.m_fixtureList = fixture;

    // Adjust mass properties if needed.
    if (fixture.m_density > 0.0) {
      this.resetMassData();
    }

    // Let the world know we have a new fixture. This will cause new contacts
    // to be created at the beginning of the next time step.
    this.m_world.m_newFixture = true;

    return fixture;
  }

  /**
   * Creates a fixture and attach it to this body.
   *
   * If the density is non-zero, this function automatically updates the mass of
   * the body.
   *
   * Contacts are not created until the next time step.
   *
   * Warning: This function is locked during callbacks.
   */
  createFixture(def: FixtureDef): Fixture;
  createFixture(shape: Shape, opt?: FixtureOpt): Fixture;
  createFixture(shape: Shape, density?: number): Fixture;
  // tslint:disable-next-line:typedef
  createFixture(shape, fixdef?) {
    _ASSERT && common.assert(this.isWorldLocked() == false);

    if (this.isWorldLocked() == true) {
      return null;
    }

    const fixture = new Fixture(this, shape, fixdef);
    this._addFixture(fixture);
    return fixture;
  }

  /**
   * Destroy a fixture. This removes the fixture from the broad-phase and destroys
   * all contacts associated with this fixture. This will automatically adjust the
   * mass of the body if the body is dynamic and the fixture has positive density.
   * All fixtures attached to a body are implicitly destroyed when the body is
   * destroyed.
   *
   * Warning: This function is locked during callbacks.
   *
   * @param fixture The fixture to be removed.
   */
  destroyFixture(fixture: Fixture): void {
    _ASSERT && common.assert(this.isWorldLocked() == false);

    if (this.isWorldLocked() == true) {
      return;
    }

    _ASSERT && common.assert(fixture.m_body == this);

    // Remove the fixture from this body's singly linked list.
    let found = false;
    if (this.m_fixtureList === fixture) {
      this.m_fixtureList = fixture.m_next;
      found = true;

    } else {
      let node = this.m_fixtureList;
      while (node != null) {
        if (node.m_next === fixture) {
          node.m_next = fixture.m_next;
          found = true;
          break;
        }
        node = node.m_next;
      }
    }

    // You tried to remove a shape that is not attached to this body.
    _ASSERT && common.assert(found);

    // Destroy any contacts associated with the fixture.
    let edge = this.m_contactList;
    while (edge) {
      const c = edge.contact;
      edge = edge.next;

      const fixtureA = c.getFixtureA();
      const fixtureB = c.getFixtureB();

      if (fixture == fixtureA || fixture == fixtureB) {
        // This destroys the contact and removes it from
        // this body's contact list.
        this.m_world.destroyContact(c);
      }
    }

    if (this.m_activeFlag) {
      const broadPhase = this.m_world.m_broadPhase;
      fixture.destroyProxies(broadPhase);
    }

    fixture.m_body = null;
    fixture.m_next = null;

    this.m_world.publish('remove-fixture', fixture);

    // Reset the mass data.
    this.resetMassData();
  }

  /**
   * Get the corresponding world point of a local point.
   */
  getWorldPoint(localPoint: Vec2): Vec2 {
    return Transform.mulVec2(this.m_xf, localPoint);
  }

  /**
   * Get the corresponding world vector of a local vector.
   */
  getWorldVector(localVector: Vec2): Vec2 {
    return Rot.mulVec2(this.m_xf.q, localVector);
  }

  /**
   * Gets the corresponding local point of a world point.
   */
  getLocalPoint(worldPoint: Vec2): Vec2 {
    return Transform.mulTVec2(this.m_xf, worldPoint);
  }

  /**
   * Gets the corresponding local vector of a world vector.
   */
  getLocalVector(worldVector: Vec2): Vec2 {
    return Rot.mulTVec2(this.m_xf.q, worldVector);
  }
}
