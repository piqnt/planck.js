/**
 * @author Oliver Zell <https://github.com/zOadT>
 */

/// <reference path="collision/index.d.ts" />
/// <reference path="common/index.d.ts" />
/// <reference path="joint/index.d.ts" />
/// <reference path="shape/index.d.ts" />
/// <reference path="../testbed/index.d.ts" />

declare namespace planck {

  type Manifold = any; // TODO

  type WorldManifold = any; // TODO

  namespace Manifold {
    type Type = any;
  }

  type Solver = any; // TODO

  type ContactImpulse = any; // TODO

  interface MassData {
    mass: number;
    center: Vec2;
    I: number;
  }

  interface FixtureProxy {
    aabb: AABB;
    fixture: Fixture;
    childIndex: number;
    proxyId: number;
  }

  interface Fixture {
    m_body: Body;
    m_friction: number;
    m_restitution: number;
    m_density: number;
    m_isSensor: boolean;
    m_filterGroupIndex: number;
    m_filterCategoryBits: number;
    m_filterMaskBits: number;
    m_shape: Shape;
    m_next: Fixture | null;
    m_proxies: FixtureProxy[];
    m_proxyCount: number;
    m_userData: unknown;

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
    rayCast(output: RayCastOutput, input: RayCastInput, childIndex: number): boolean;// is childIndex optional?
    getMassData(massData: MassData): void;
    getAABB(childIndex: number): AABB;
    createProxies(broadPhase: BroadPhase, xf: Transform): void;//TODO
    destroyProxies(broadPhase: BroadPhase): void;
    synchronize(broadPhase: BroadPhase, xf1: Transform, xf2: Transform): void;
    setFilterData(filter: { groupIndex: number, categoryBits: number, maskBits: number }): void;
    getFilterGroupIndex(): number;
    getFilterCategoryBits(): number;
    getFilterMaskBits(): number;
    refilter(): void;
    shouldCollide(that: Fixture): boolean;
  }

  type FixtureOpt = Partial<{
    userData: any,
    friction: number,
    restitution: number,
    density: number,
    isSensor: boolean,
    filterGroupIndex: number,
    filterCategoryBits: number,
    filterMaskBits: number,
  }>;

  type FixtureDef = FixtureOpt & {
    shape: Shape
  };

  let Fixture: {
    new(body: Body, def: FixtureDef): Fixture;
    new(body: Body, shape: Shape, def?: FixtureOpt): Fixture;
    new(body: Body, shape: Shape, density?: number): Fixture;
  };

  type BodyType = 'static' | 'kinematic' | 'dynamic';

  interface Body {
    m_world: World;
    m_awakeFlag: boolean;
    m_autoSleepFlag: boolean;
    m_bulletFlag: boolean;
    m_fixedRotationFlag: boolean;
    m_activeFlag: boolean;
    m_islandFlag: boolean;
    m_toiFlag: boolean;
    m_userData: unknown;
    m_type: BodyType;
    m_mass: number;
    m_invMass: number;
    // Rotational inertia about the center of mass.
    m_I: number;
    m_invI: number;
    // the body origin transform
    m_xf: Transform;
    // the swept motion for CCD
    m_sweep: Sweep;
    // position and velocity correction
    c_velocity: Velocity;
    c_position: Position;
    m_force: Vec2;
    m_torque: number;
    m_linearVelocity: Vec2;
    m_angularVelocity: number;
    m_linearDamping: number;
    m_angularDamping: number;
    m_gravityScale: number;
    m_sleepTime: number;
    m_jointList: JointEdge | null;
    m_contactList: ContactEdge | null;
    m_fixtureList: Fixture | null;
    m_prev: Body | null;
    m_next: Body | null;

    isWorldLocked(): boolean;
    getWorld(): World;
    getNext(): Body | null;
    setUserData(data: any): void
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

  type BodyDef = Partial<{
    type: BodyType,
    position: Vec2,
    angle: number,
    linearVelocity: Vec2,
    angularVelocity: number,
    linearDamping: number,
    angularDamping: number,
    fixedRotation: boolean,
    bullet: boolean,
    gravityScale: number,
    allowSleep: boolean,
    awake: boolean,
    active: boolean,
    userData: any,
  }>;

  let Body: {
    new(world: World, def?: BodyDef): Body;

    STATIC: 'static';
    KINEMATIC: 'kinematic';
    DYNAMIC: 'dynamic';
  };

  interface ContactEdge {
    contact: Contact;
    prev: Contact | undefined;
    next: Contact | undefined;
    other: Body | undefined;
  }

  interface VelocityConstraintPoint {
    rA: Vec2;
    rB: Vec2;
    normalImpulse: number;
    tangentImpulse: number;
    normalMass: number;
    tangentMass: number;
    velocityBias: number;
  }

  interface Contact {
    m_nodeA: ContactEdge;
    m_nodeB: ContactEdge;
    m_fixtureA: Fixture;
    m_fixtureB: Fixture;
    m_indexA: number;
    m_indexB: number;
    m_evaluateFcn: (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void;
    m_manifold: Manifold;
    m_prev: Contact | null;
    m_next: Contact | null;
    m_toi: number;
    m_toiCount: number;
    m_toiFlag: boolean;
    m_friction: number;
    m_restitution: number;
    m_tangentSpeed: number;
    m_enabledFlag: boolean;
    m_islandFlag: boolean;
    m_touchingFlag: boolean;
    m_filterFlag: boolean;
    m_bulletHitFlag: boolean;
    v_points: VelocityConstraintPoint[];
    v_normal: Vec2;
    v_normalMass: Mat22;
    v_K: Mat22;
    v_pointCount: number;
    v_tangentSpeed: number | undefined;
    v_friction: number | undefined;
    v_restitution: number | undefined;
    v_invMassA: number | undefined;
    v_invMassB: number | undefined;
    v_invIA: number | undefined;
    v_invIB: number | undefined;
    p_localPoints: Vec2[];
    p_localNormal: Vec2;
    p_localPoint: Vec2;
    p_localCenterA: Vec2;
    p_localCenterB: Vec2;
    p_type: Manifold.Type;
    p_radiusA: number | undefined;
    p_radiusB: number | undefined;
    p_pointCount: number | undefined;
    p_invMassA: number | undefined;
    p_invMassB: number | undefined;
    p_invIA: number | undefined;
    p_invIB: number | undefined;

    initConstraint(step: {warmStarting: boolean, dtRatio: number}): void;
    getManifold(): Manifold;
    getWorldManifold(worldManifold: WorldManifold | null | undefined): WorldManifold;
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

  let Contact: {
    new(fA: Fixture, indexA: number, fB: Fixture, indexB: number,
      evaluateFcn: (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void): Contact;

    addType(type1: ShapeType, type2: ShapeType,
        callback: (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void &
          { destroyFcn?: (contact: Contact) => void }): void;
    create(fixtureA: Fixture, indexA: number, fixtureB: Fixture, indexB: number): Contact | null;
    destroy(contact: Contact, listener: { endContact: (contact: Contact) => void }): void;
  };

  type WorldDef = Partial<{
    gravity: Vec2,
    allowSleep: boolean,
    warmStarting: boolean,
    continuousPhysics: boolean,
    subStepping: boolean,
    blockSolve: boolean,
    velocityIterations: number,
    positionIterations: number,
  }>;

  interface World {
    m_solver: Solver;
    m_broadPhase: BroadPhase;
    m_contactList: Contact | null;
    m_contactCount: number;
    m_bodyList: Body | null;
    m_bodyCount: number;
    m_jointList: Joint | null;
    m_jointCount: number;
    m_stepComplete: boolean;
    m_allowSleep: boolean;
    m_gravity: Vec2;
    m_clearForces: boolean;
    m_newFixture: boolean;
    m_locked: boolean;
    m_warmStarting: boolean;
    m_continuousPhysics: boolean;
    m_subStepping: boolean;
    m_blockSolve: boolean;
    m_velocityIterations: number;
    m_positionIterations: number;
    m_t: number;
    addPair: (proxyA: FixtureProxy, proxyB: FixtureProxy) => void;

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
    findNewContacts(): void;
    /**
     * @private
     */
    createContact(proxyA: FixtureProxy, proxyB: FixtureProxy): void;
    updateContacts(): void;
    destroyContact(contact: Contact): void;

    _listeners: any; // TODO

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

    beginContact(contact: Contact): void;
    endContact(contact: Contact): void;
    preSolve(contact: Contact, oldManifold: Manifold): void;
    postSolve(contact: Contact, impulse: ContactImpulse): void;
  }

  let World: {
    new(def: WorldDef): World;
    (def: WorldDef): World;

    new(gravity: Vec2): World;
    (gravity: Vec2): World;

    new(): World;
    (): World;
  };
}
