/**
 * @author Oliver Zell <https://github.com/zOadT>
 */

export as namespace planck;

import { Sweep, Velocity, Position, Vec2, Transform, Mat22 } from "./common";
import { BroadPhase, RayCastInput, RayCastOutput, AABB, DynamicTree, DistanceProxy } from "./collision";
import { JointEdge, Joint } from "./joint";
import { ShapeType, Shape } from "./shape";

export * from "./collision";
export * from "./common";
export * from "./joint";
export {
  CircleShape as Circle,
  BoxShape as Box,
  EdgeShape as Edge,
  PolygonShape as Polygon,
  ChainShape as Chain,
} from "./shape";
export * from "../testbed";

export const enum ContactFeatureType {
  Vertex = 0,
  Face = 1
}

export interface ContactFeature {
  indexA: number;
  indexB: number;
  typeA: ContactFeatureType;
  typeB: ContactFeatureType;
}

export interface ContactID {
  cf: ContactFeature;
  readonly key: number;
}

export const enum ManifoldType {
  Circles = 0,
  FaceA = 1,
  FaceB = 2
}

export interface ManifoldPoint {
  localPoint: Vec2;
  normalImpulse: number;
  tangentImpulse: number;
  id: ContactID;
}

export interface Manifold {
  type: ManifoldType;
  localNormal: Vec2;
  localPoint: Vec2;
  points: ManifoldPoint[];
  pointCount: number;

  getWorldManifold(wm: WorldManifold | undefined, xfA: Transform, radiusA: number, xfB: Transform, radiusB: number): WorldManifold | undefined;
}

export interface WorldManifold {
  normal: Vec2;
  points: Vec2[];
  separations: number[];
}

export class Solver {
  // TODO
}

export class ContactImpulse {
  // TODO
}

export interface MassData {
  mass: number;
  center: Vec2;
  I: number;
}

export interface FixtureProxy {
  aabb: AABB;
  fixture: Fixture;
  childIndex: number;
  proxyId: number;
}

export class Fixture {
  constructor(body: Body, def: FixtureDef);
  constructor(body: Body, shape: Shape, def?: FixtureOpt);
  constructor(body: Body, shape: Shape, density?: number);

  /** @internal */ m_body: Body;
  /** @internal */ m_friction: number;
  /** @internal */ m_restitution: number;
  /** @internal */ m_density: number;
  /** @internal */ m_isSensor: boolean;
  /** @internal */ m_filterGroupIndex: number;
  /** @internal */ m_filterCategoryBits: number;
  /** @internal */ m_filterMaskBits: number;
  /** @internal */ m_shape: Shape;
  /** @internal */ m_next: Fixture | null;
  /** @internal */ m_proxies: FixtureProxy[];
  /** @internal */ m_proxyCount: number;
  /** @internal */ m_userData: unknown;

  getType(): ShapeType;
  getShape(): Shape;
  isSensor(): boolean;
  setSensor(sensor: boolean): void;
  getUserData(): unknown;
  setUserData(data: any): void;
  getBody(): Body;
  getNext(): Fixture | null;
  getDensity(): number;
  setDensity(density: number): void;
  getFriction(): number;
  setFriction(friction: number): void;
  getRestitution(): number;
  setRestitution(restitution: number): void;
  testPoint(p: Vec2): boolean;
  rayCast(output: RayCastOutput, input: RayCastInput, childIndex: number): boolean; // is childIndex optional?
  getMassData(massData: MassData): void;
  getAABB(childIndex: number): AABB;
  createProxies(broadPhase: BroadPhase, xf: Transform): void; // TODO
  destroyProxies(broadPhase: BroadPhase): void;
  synchronize(broadPhase: BroadPhase, xf1: Transform, xf2: Transform): void;
  setFilterData(filter: { groupIndex: number, categoryBits: number, maskBits: number }): void;
  getFilterGroupIndex(): number;
  getFilterCategoryBits(): number;
  getFilterMaskBits(): number;
  refilter(): void;
  shouldCollide(that: Fixture): boolean;
}

export interface FixtureOpt {
  userData: any;
  friction: number;
  restitution: number;
  density: number;
  isSensor: boolean;
  filterGroupIndex: number;
  filterCategoryBits: number;
  filterMaskBits: number;
}

export interface FixtureDef extends FixtureOpt {
  shape: Shape;
}

export type BodyType = 'static' | 'kinematic' | 'dynamic';

export function Body(world: World, def?: BodyDef): Body;
export class Body {
  constructor(world: World, def?: BodyDef);

  static STATIC: 'static';
  static KINEMATIC: 'kinematic';
  static DYNAMIC: 'dynamic';

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
  // Rotational inertia about the center of mass.
  /** @internal */ m_I: number;
  /** @internal */ m_invI: number;
  // the body origin transform
  /** @internal */ m_xf: Transform;
  // the swept motion for CCD
  /** @internal */ m_sweep: Sweep;
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

  isWorldLocked(): boolean;
  getWorld(): World;
  getNext(): Body | null;
  setUserData(data: any): void;
  getUserData(): unknown;
  getFixtureList(): Fixture | null;
  getJointList(): JointEdge | null;
  /**
   * Warning: this list changes during the time step and you may miss some
   * collisions if you don't use ContactListener.
   */
  getContactList(): ContactEdge | null;
  isStatic(): boolean;
  isDynamic(): boolean;
  isKinematic(): boolean;
  /**
   * This will alter the mass and velocity.
   */
  setStatic(): Body;
  setDynamic(): Body;
  setKinematic(): Body;
  /**
   * @private
   */
  getType(): BodyType;
  /**
   * @private
   */
  setType(type: BodyType): void;
  isBullet(): boolean;
  setBullet(flag: boolean): void;
  isSleepingAllowed(): boolean;
  setSleepingAllowed(flag: boolean): void;
  isAwake(): boolean;
  setAwake(flag: boolean): void;
  isActive(): boolean;
  setActive(flag: boolean): void;
  isFixedRotation(): boolean;
  setFixedRotation(flag: boolean): void;
  getTransform(): Transform;
  setTransform(position: Vec2, angle: number): void;
  synchronizeTransform(): void;
  synchronizeFixtures(): void;
  advance(alpha: number): void;
  getPosition(): Vec2;
  setPosition(p: Vec2): void;
  getAngle(): number;
  setAngle(angle: number): void;
  getWorldCenter(): Vec2;
  getLocalCenter(): Vec2;
  getLinearVelocity(): Vec2;
  getLinearVelocityFromWorldPoint(worldPoint: Vec2): Vec2;
  getLinearVelocityFromLocalPoint(localPoint: Vec2): Vec2;
  setLinearVelocity(v: Vec2): void;
  getAngularVelocity(): number;
  setAngularVelocity(w: number): void;
  getLinearDamping(): number;
  setLinearDamping(linearDamping: number): void;
  getAngularDamping(): number;
  setAngularDamping(angularDamping: number): void;
  getGravityScale(): number;
  setGravityScale(scale: number): void;
  getMass(): number;
  getInertia(): number;
  getMassData(data: MassData): void;
  resetMassData(): void;
  setMassData(massData: MassData): void;
  applyForce(force: Vec2, point: Vec2, wake?: boolean): void;
  applyForceToCenter(force: Vec2, wake?: boolean): void;
  applyTorque(torque: number, wake?: boolean): void;
  applyLinearImpulse(impulse: Vec2, point: Vec2, wake?: boolean): void;
  applyAngularImpulse(impulse: number, wake?: boolean): void;
  shouldCollide(that: Body): boolean;
  createFixture(def: FixtureDef): Fixture;
  createFixture(shape: Shape, opt?: FixtureOpt): Fixture;
  createFixture(shape: Shape, density?: number): Fixture;
  destroyFixture(fixture: Fixture): void;
  getWorldPoint(localPoint: Vec2): Vec2;
  getWorldVector(localVector: Vec2): Vec2;
  getLocalPoint(worldPoint: Vec2): Vec2;
  getLocalVector(worldVector: Vec2): Vec2;
}

export interface BodyDef {
  type?: BodyType;
  position?: Vec2;
  angle?: number;
  linearVelocity?: Vec2;
  angularVelocity?: number;
  linearDamping?: number;
  angularDamping?: number;
  fixedRotation?: boolean;
  bullet?: boolean;
  gravityScale?: number;
  allowSleep?: boolean;
  awake?: boolean;
  active?: boolean;
  userData?: any;
}

export class ContactEdge {
  contact: Contact;
  prev: ContactEdge | undefined;
  next: ContactEdge | undefined;
  other: Body | undefined;
}

export class VelocityConstraintPoint {
  rA: Vec2;
  rB: Vec2;
  normalImpulse: number;
  tangentImpulse: number;
  normalMass: number;
  tangentMass: number;
  velocityBias: number;
}

type ContactCallack = (
  manifold: Manifold,
  xfA: Transform,
  fixtureA: Fixture,
  indexA: number,
  xfB: Transform,
  fixtureB: Fixture,
  indexB: number
) => void & { destroyFcn?: (contact: Contact) => void };

type EvaluateFunction = (
  manifold: Manifold,
  xfA: Transform,
  fixtureA: Fixture,
  indexA: number,
  xfB: Transform,
  fixtureB: Fixture,
  indexB: number
) => void;

export class Contact {
  constructor(
    fA: Fixture,
    indexA: number,
    fB: Fixture,
    indexB: number,
    evaluateFcn: EvaluateFunction
  );

  /** @internal */ static addType(type1: ShapeType, type2: ShapeType, callback: ContactCallack): void;
  /** @internal */ static create(fixtureA: Fixture, indexA: number, fixtureB: Fixture, indexB: number): Contact | null;
  /** @internal */ static destroy(contact: Contact, listener: { endContact: (contact: Contact) => void }): void;

  /** @internal */ m_nodeA: ContactEdge;
  /** @internal */ m_nodeB: ContactEdge;
  /** @internal */ m_fixtureA: Fixture;
  /** @internal */ m_fixtureB: Fixture;
  /** @internal */ m_indexA: number;
  /** @internal */ m_indexB: number;
  /** @internal */ m_evaluateFcn: EvaluateFunction;
  /** @internal */ m_manifold: Manifold;
  /** @internal */ m_prev: Contact | null;
  /** @internal */ m_next: Contact | null;
  /** @internal */ m_toi: number;
  /** @internal */ m_toiCount: number;
  /** @internal */ m_toiFlag: boolean;
  /** @internal */ m_friction: number;
  /** @internal */ m_restitution: number;
  /** @internal */ m_tangentSpeed: number;
  /** @internal */ m_enabledFlag: boolean;
  /** @internal */ m_islandFlag: boolean;
  /** @internal */ m_touchingFlag: boolean;
  /** @internal */ m_filterFlag: boolean;
  /** @internal */ m_bulletHitFlag: boolean;
  /** @internal */ v_points: VelocityConstraintPoint[];
  /** @internal */ v_normal: Vec2;
  /** @internal */ v_normalMass: Mat22;
  /** @internal */ v_K: Mat22;
  /** @internal */ v_pointCount: number;
  /** @internal */ v_tangentSpeed: number | undefined;
  /** @internal */ v_friction: number | undefined;
  /** @internal */ v_restitution: number | undefined;
  /** @internal */ v_invMassA: number | undefined;
  /** @internal */ v_invMassB: number | undefined;
  /** @internal */ v_invIA: number | undefined;
  /** @internal */ v_invIB: number | undefined;
  /** @internal */ p_localPoints: Vec2[];
  /** @internal */ p_localNormal: Vec2;
  /** @internal */ p_localPoint: Vec2;
  /** @internal */ p_localCenterA: Vec2;
  /** @internal */ p_localCenterB: Vec2;
  /** @internal */ p_type: ManifoldType | undefined;
  /** @internal */ p_radiusA: number | undefined;
  /** @internal */ p_radiusB: number | undefined;
  /** @internal */ p_pointCount: number | undefined;
  /** @internal */ p_invMassA: number | undefined;
  /** @internal */ p_invMassB: number | undefined;
  /** @internal */ p_invIA: number | undefined;
  /** @internal */ p_invIB: number | undefined;

  initConstraint(step: {warmStarting: boolean, dtRatio: number}): void;
  getManifold(): Manifold;
  getWorldManifold(worldManifold: WorldManifold | null | undefined): WorldManifold | undefined;
  setEnabled(flag: boolean): void;
  isEnabled(): boolean;
  isTouching(): boolean;
  getNext(): Contact | null;
  getFixtureA(): Fixture;
  getFixtureB(): Fixture;
  getChildIndexA(): number;
  getChildIndexB(): number;
  flagForFiltering(): void;
  setFriction(friction: number): void;
  getFriction(): number;
  resetFriction(): void;
  setRestitution(restitution: number): void;
  getRestitution(): number;
  resetRestitution(): void;
  setTangentSpeed(speed: number): void;
  getTangentSpeed(): number;
  evaluate(manifold: Manifold, xfA: Transform, xfB: Transform): void;
  update(listener?: {beginContact(contact: Contact): void, endContact(contact: Contact): void, oreSolve(contact: Contact, oldManifold: Manifold): void}): void;
  solvePositionConstraint(step: any): number;
  solvePositionConstraintTOI(step: any, toiA?: Body | null, toiB?: Body | null): number;
  _solvePositionConstraint(step: any, toi: boolean, toiA?: Body | null, toiB?: Body | null): number;
  initVelocityConstraint(step: {blockSolve: boolean}): void;
  warmStartConstraint(step?: any): void;
  storeConstraintImpulses(step?: any): void;
  solveVelocityConstraint(step: {blockSolve: boolean}): void;
}

export interface WorldDef {
  gravity?: Vec2;
  allowSleep?: boolean;
  warmStarting?: boolean;
  continuousPhysics?: boolean;
  subStepping?: boolean;
  blockSolve?: boolean;
  velocityIterations?: number;
  positionIterations?: number;
}

export function World(def?: WorldDef): World;
export class World {
  constructor(def?: WorldDef);

  /** @internal */ m_solver: Solver;
  /** @internal */ m_broadPhase: BroadPhase;
  /** @internal */ m_contactList: Contact | null;
  /** @internal */ m_contactCount: number;
  /** @internal */ m_bodyList: Body | null;
  /** @internal */ m_bodyCount: number;
  /** @internal */ m_jointList: Joint | null;
  /** @internal */ m_jointCount: number;
  /** @internal */ m_stepComplete: boolean;
  /** @internal */ m_allowSleep: boolean;
  /** @internal */ m_gravity: Vec2;
  /** @internal */ m_clearForces: boolean;
  /** @internal */ m_newFixture: boolean;
  /** @internal */ m_locked: boolean;
  /** @internal */ m_warmStarting: boolean;
  /** @internal */ m_continuousPhysics: boolean;
  /** @internal */ m_subStepping: boolean;
  /** @internal */ m_blockSolve: boolean;
  /** @internal */ m_velocityIterations: number;
  /** @internal */ m_positionIterations: number;
  /** @internal */ m_t: number;

  /** @internal */ addPair: (proxyA: FixtureProxy, proxyB: FixtureProxy) => void;

  getBodyList(): Body | null;
  getJointList(): Joint | null;
  getContactList(): Contact | null;
  getBodyCount(): number;
  getJointCount(): number;
  getContactCount(): number;
  setGravity(gravity: Vec2): void;
  getGravity(): Vec2;
  isLocked(): boolean;
  setAllowSleeping(flag: boolean): void;
  getAllowSleeping(): boolean;
  setWarmStarting(flag: boolean): void;
  getWarmStarting(): boolean;
  setContinuousPhysics(flag: boolean): void;
  getContinuousPhysics(): boolean;
  setSubStepping(flag: boolean): void;
  getSubStepping(): boolean;
  setAutoClearForces(flag: boolean): void;
  getAutoClearForces(): boolean;
  clearForces(): void;
  queryAABB(aabb: AABB, queryCallback: (fixture: Fixture) => boolean): void;
  rayCast(point1: Vec2, point2: Vec2, reportFixtureCallback: (fixture: Fixture, point: Vec2, normal: Vec2, fraction: number) => number): void;
  getProxyCount(): number;
  getTreeHeight(): number;
  getTreeBalance(): number;
  getTreeQuality(): number;
  shiftOrigin(newOrigin: Vec2): void;
  createBody(def: BodyDef): Body;
  createBody(position: Vec2, angle?: number): Body;
  createBody(): Body;
  createDynamicBody(def: BodyDef): Body;
  createDynamicBody(position: Vec2, angle?: number): Body;
  createDynamicBody(): Body;
  createKinematicBody(def: BodyDef): Body;
  createKinematicBody(position: Vec2, angle?: number): Body;
  createKinematicBody(): Body;
  destroyBody(b: Body): boolean;
  createJoint<T extends Joint>(joint: T): T | null;
  destroyJoint(joint: Joint): void;
  step(timeStep: number, velocityIterations?: number, positionIterations?: number): void;

  /** @internal */ findNewContacts(): void;
  /** @internal */ createContact(proxyA: FixtureProxy, proxyB: FixtureProxy): void;
  /** @internal */ updateContacts(): void;
  /** @internal */ destroyContact(contact: Contact): void;

  /** @internal */ _listeners: any; // TODO

  on(name: 'begin-contact', listener: (contact: Contact) => void): World;
  on(name: 'end-contact', listener: (contact: Contact) => void): World;
  on(name: 'pre-solve', listener: (contact: Contact, oldManifold: Manifold) => void): World;
  on(name: 'post-solve', listener: (contact: Contact, impulse: ContactImpulse) => void): World;
  on(name: 'remove-body', listener: (body: Body) => void): World;
  on(name: 'remove-joint', listener: (joint: Joint) => void): World;
  on(name: 'remove-fixture', listener: (fixture: Fixture) => void): World;
  off(name: 'begin-contact', listener: (contact: Contact) => void): World;
  off(name: 'end-contact', listener: (contact: Contact) => void): World;
  off(name: 'pre-solve', listener: (contact: Contact, oldManifold: Manifold) => void): World;
  off(name: 'post-solve', listener: (contact: Contact, impulse: ContactImpulse) => void): World;
  off(name: 'remove-body', listener: (body: Body) => void): World;
  off(name: 'remove-joint', listener: (joint: Joint) => void): World;
  off(name: 'remove-fixture', listener: (fixture: Fixture) => void): World;

  publish(name: string, arg1: any, arg2: any, arg3: any): number;

  /** @internal */ beginContact(contact: Contact): void;
  /** @internal */ endContact(contact: Contact): void;
  /** @internal */ preSolve(contact: Contact, oldManifold: Manifold): void;
  /** @internal */ postSolve(contact: Contact, impulse: ContactImpulse): void;
}

/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
export class Settings {
  // Collision
  /**
   * The maximum number of contact points between two convex shapes. Do not change
   * this value.
   */
  maxManifoldPoints: number;

  /**
   * The maximum number of vertices on a convex polygon. You cannot increase this
   * too much because BlockAllocator has a maximum object size.
   */
  maxPolygonVertices: number;

  /**
   * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
   * by a small amount without triggering a tree adjustment. This is in meters.
   */
  aabbExtension: number;

  /**
   * This is used to fatten AABBs in the dynamic tree. This is used to predict the
   * future position based on the current displacement. This is a dimensionless
   * multiplier.
   */
  aabbMultiplier: number;

  /**
   * A small length used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  linearSlop: number;
  linearSlopSquared: number;

  /**
   * A small angle used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  angularSlop: number;

  /**
   * The radius of the polygon/edge shape skin. This should not be modified.
   * Making this smaller means polygons will have an insufficient buffer for
   * continuous collision. Making it larger may create artifacts for vertex
   * collision.
   */
  polygonRadius: number;

  /**
   * Maximum number of sub-steps per contact in continuous physics simulation.
   */
  maxSubSteps: number;

  // Dynamics

  /**
   * Maximum number of contacts to be handled to solve a TOI impact.
   */
  maxTOIContacts: number;

  /**
   * Maximum iterations to solve a TOI.
   */
  maxTOIIterations: number;

  /**
   * Maximum iterations to find Distance.
   */
  maxDistnceIterations: number;

  /**
   * A velocity threshold for elastic collisions. Any collision with a relative
   * linear velocity below this threshold will be treated as inelastic.
   */
  velocityThreshold: number;

  /**
   * The maximum linear position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxLinearCorrection: number;

  /**
   * The maximum angular position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxAngularCorrection: number;

  /**
   * The maximum linear velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxTranslation: number;
  maxTranslationSquared: number;

  /**
   * The maximum angular velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxRotation: number;
  maxRotationSquared: number;

  /**
   * This scale factor controls how fast overlap is resolved. Ideally this would
   * be 1 so that overlap is removed in one time step. However using values close
   * to 1 often lead to overshoot.
   */
  baumgarte: number;
  toiBaugarte: number;

  // Sleep

  /**
   * The time that a body must be still before it will go to sleep.
   */
  timeToSleep: number;

  /**
   * A body cannot sleep if its linear velocity is above this tolerance.
   */
  linearSleepTolerance: number;
  linearSleepToleranceSqr: number;

  /**
   * A body cannot sleep if its angular velocity is above this tolerance.
   */
  angularSleepTolerance: number;
  angularSleepToleranceSqr: number;
}

declare enum TOIOutputState { }

export namespace internal {
  let Settings: Settings;
  let Sweep: {
    new(): Sweep;
  };
  let Manifold: {
    new(): Manifold;
    // TODO
  };
  function Distance(output: Distance.Input, cache: Distance.Cache, input: Distance.Input): void;
  namespace Distance {
    class Input {
      proxyA: DistanceProxy;
      proxyB: DistanceProxy;
      transformA: Transform | null;
      transformB: Transform | null;
      useRadii: boolean;
    }
    class Output {
      pointA: Vec2;
      pointB: Vec2;
      distance: number;
      iterations: number;
    }
    class Cache {
      metric: number;
      indexA: number[];
      indexB: number[];
      count: number;
    }
    function testOverlap(shapeA: Shape, indexA: number, shapeB: Shape, indexB: number, xfA: Transform, xfB: Transform): boolean;
  }
  function TimeOfImpact(output: TimeOfImpact.Output, input: TimeOfImpact.Input): void;
  namespace TimeOfImpact {
    class Input {
      proxyA: DistanceProxy;
      proxyB: DistanceProxy;
      sweepA: Sweep;
      sweepB: Sweep;
      tMax: number | undefined;
    }
    class Output {
      state: TOIOutputState | undefined;
      t: number | undefined;

      static e_unknown: TOIOutputState;
      static e_failed: TOIOutputState;
      static e_overlapped: TOIOutputState;
      static e_touching: TOIOutputState;
      static e_separated: TOIOutputState;
    }
  }
  let DynamicTree: {
    new(): DynamicTree;
  };
}
