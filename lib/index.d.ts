// Type definitions for planck-js 0.1.45
// Project: http://piqnt.com/planck.js/
// Definitions by: Oliver Zell <https://github.com/zOadT>
// TypeScript Version: 3.0

declare namespace planck {

    // Types

    //TODO
    type BroadPhase = any;
    type Sweep = any;
    type Manifold = any;
    type WorldManifold = any;
    namespace Manifold {
        type Type = any;
    }
    type Solver = any;
    type ContactImpulse = any;

    interface Vec2 {
        x: number;
        y: number;

        toString(): string;
        clone(depricated: any): Vec2;//TODO depricated?
        setZero(): Vec2;
        set(x: number, y: number): Vec2;
        set(value: Vec2): Vec2;
        wSet(a: number, v: Vec2, b: number, w: Vec2): Vec2;
        wSet(a: number, v: Vec2): Vec2;
        add(w: Vec2): Vec2;
        wAdd(a: number, v: Vec2, b: number, w: Vec2): Vec2;
        wAdd(a: number, v: Vec2): Vec2;
        wSub(a: number, v: Vec2, b: number, w: Vec2): Vec2;
        wSub(a: number, v: Vec2): Vec2;
        sub(w: Vec2): Vec2;
        mul(m: number): Vec2;
        length(): number;
        lengthSquared(): number;
        normalize(): number;
        neg(): Vec2;
        clamp(max: number): Vec2;
    }
    interface Vec3 {
        x: number;
        y: number;
        z: number;

        toString(): string;
        setZero(): Vec3;
        set(x: Vec3, y: Vec3, z: Vec3): Vec3;
        add(w: Vec3): Vec3;
        sub(w: Vec3): Vec3;
        mul(m: number): Vec3;
        neg(/*m*/): Vec3;
    }
    interface Transform {
        p: Vec2;
        q: Rot;

        setIdentity(): void;
        set(position: Vec2, rotation: number): void;
        set(xf: Transform): void;
    }
    interface Rot {
        s: number;
        c: number;

        setIdentity(): void;
        set(angle: number | Rot): void;
        setAngle(angle: number): void;
        getAngle(): number;
        getXAxis(): Vec2;
        getYAxis(): Vec2;
    }
    type RayCastInput = {//TODO interface?
        p1: Vec2,
        p2: Vec2,
        maxFraction: number,
    }
    type RayCastOutput = {
        normal: Vec2,
        fraction: number,
    }
    interface AABB {
        lowerBound: Vec2;
        upperBound: Vec2;

        isValid(): boolean;
        getCenter(): Vec2;
        getExtents(): Vec2;
        getPerimeter(): number;
        combine(a: Vec2, b?: Vec2): void;
        combinePoints(a: Vec2, b: Vec2): void;
        set(aabb: AABB): void;
        constains(aabb: AABB): boolean;
        extend(value: number): void;
        rayCast(output: RayCastOutput, input: RayCastInput): boolean;
        toString(): string;
    }
    interface MassData {
        mass: number;
        center: Vec2;
        I: number;
    }
    type FixtureDef = Partial<{
        userData: any,
        friction: number,
        restitution: number,
        density: number,
        isSensor: boolean,
        filterGroupIndex: number,
        filterCategoryBits: number,
        filterMaskBits: number,
    }>
    type FixtureDefWithShape = FixtureDef & { shape: Shape };//debatable
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

        getType(): "circle" | "edge" | "polygon" | "chain";
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
    type BodyDef = Partial<{
        type: 'static' | 'kinematic' | 'dynamic',
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
    }>
    interface Velocity {
        v: Vec2;
        w: number;
    }
    interface Position {
        c: Vec2;
        a: number;
        getTransform(xf: Transform, p: Vec2): Transform;
    }
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
        m_type: 'static' | 'kinematic' | 'dynamic';
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
        m_jointList: Joint | null;
        m_contactList: Contact | null;
        m_fixtureList: Fixture | null;
        m_prev: Body | null;
        m_next: Body | null;

        isWorldLocked(): boolean;
        getWorld(): World;
        getNext(): Body | null;
        setUserData(data: any): void
        getUserData(): unknown;
        getFixtureList(): Fixture | null;
        getJointList(): Joint | null;
        /**
         * Warning: this list changes during the time step and you may miss some
         * collisions if you don't use ContactListener.
         */
        getContactList(): Contact | null;
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
        getType(): 'static' | 'kinematic' | 'dynamic';
        /**
         * @private
         */
        setType(type: 'static' | 'kinematic' | 'dynamic'): void;
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
        createFixture(shape: Shape, def?: FixtureDef | number | null): Fixture;
        createFixture(def: FixtureDef & { shape: Shape }): Fixture;
        destroyFixture(fixture: Fixture): void;
        getWorldPoint(localPoint: Vec2): Vec2;
        getWorldVector(localVector: Vec2): Vec2;
        getLocalPoint(worldPoint: Vec2): Vec2;
        getLocalVector(worldVector: Vec2): Vec2;
    }
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
    interface Mat22 {
        ex: Vec2;
        ey: Vec2;
        toString(): string;
        set(a: Mat22): void;
        set(a: Vec2, b: Vec2): void;
        set(a: number, b: number, c: number, d: number): void;
        setIdentity(): void;
        setZero: void;
        getInverse(): Mat22;
        solve(v: Vec2): Vec2;
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
        solvePositionConstraintTOI(step: any, toiA?: Body | null, toiB?: Body | null): number
        _solvePositionConstraint(step: any, toi: boolean, toiA?: Body | null, toiB?: Body | null): number;
        initVelocityConstraint(step: {blockSolve: boolean}): void;
        warmStartConstraint(step?: any): void;
        storeConstraintImpulses(step?: any): void;
        solveVelocityConstraint(step: {blockSolve: boolean}): void;
    }
    interface JointEdge {
        //TODO
    }
    type JointDef = Partial<{
        userData: any,
        collideConnected: boolean,
    }>;
    type Joint =
        DistanceJoint |
        FrictionJoint |
        GearJoint |
        MotorJoint |
        MouseJoint |
        PrismaticJoint |
        PulleyJoint |
        RevoluteJoint |
        RopeJoint |
        WeldJoint |
        WheelJoint;
    type WorldDef = Partial<{
        gravity: Vec2,
        allowSleep: boolean,
        warmStarting: boolean,
        continuousPhysics: boolean,
        subStepping: boolean,
        blockSolve: boolean,
        velocityIterations: number,
        positionIterations: number,
    }>
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
        m_stepCount: number;
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
        createBody(def?: BodyDef | null): Body;
        createBody(position: Vec2, angle?: number): Body;
        createDynamicBody(def?: BodyDef | null): Body;
        createDynamicBody(position: Vec2, angle?: number): Body;
        createDynamicBody(): Body;
        createKinematicBody(def?: BodyDef | null): Body;
        createKinematicBody(position: Vec2, angle?: number): Body;
        createKinematicBody(): Body;
        destroyBody(b: Body): boolean;//m_destroyed not in Body but used!?
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

        _listeners: any;//TODO

        on(name: 'begin-contact', listener: (contact: Contact) => void): World;
        on(name: 'end-contact', listener: (contact: Contact) => void): World;
        on(name: 'pre-solve', listener: (contact: Contact, oldManifold: Manifold) => void): World;
        on(name: 'post-solve', listener: (contact: Contact, impulse: ContactImpulse) => void): World;
        on(name: 'remove-body', listener: (body: Body) => void): World;// never gets called?
        on(name: 'remove-joint', listener: (joint: Joint) => void): World;
        on(name: 'remove-fixture', listener: (fixture: Fixture) => void): World;
        off(name: 'begin-contact', listener: (contact: Contact) => void): World;
        off(name: 'end-contact', listener: (contact: Contact) => void): World;
        off(name: 'pre-solve', listener: (contact: Contact, oldManifold: Manifold) => void): World;
        off(name: 'post-solve', listener: (contact: Contact, impulse: ContactImpulse) => void): World;
        off(name: 'remove-body', listener: (body: Body) => void): World;// never gets called?
        off(name: 'remove-joint', listener: (joint: Joint) => void): World;
        off(name: 'remove-fixture', listener: (fixture: Fixture) => void): World;

        publish(name: string, arg1: any, arg2: any, arg3: any): number;

        beginContact(contact: Contact): void;
        endContact(contact: Contact): void;
        preSolve(contact: Contact, oldManifold: Manifold): void;
        postSolve(contact: Contact, impulse: ContactImpulse): void;
    }

    interface DistanceProxy {
        m_buffer: Vec2[];
        m_vertices: Vec2[];
        m_count: number;
        m_radius: number;

        getVertexCount(): number;
        getVertex(index: number): Vec2;
        getSupport(d: Vec2): number;
        getSupportVertex(d: Vec2): Vec2;
        set(shape: Shape, index: number): void;//TODO index is only used by Chain
    }
    type Shape = CircleShape | EdgeShape | PolygonShape | ChainShape;
    interface CircleShape {
        m_type: 'circle';
        m_radius: number;
        m_p: Vec2;

        getCenter(): Vec2;
        getSupportVertex(/*d*/): Vec2;
        getVertex(index?: number): Vec2;
        getVertexCount(index?: number): 1;

        getRadius(): number;
        getType(): 'circle';
        /**
         * @deprecated
         */
        _clone(): CircleShape;
        getChildCount(): 1;
        testPoint(xf: Transform, p: Vec2): boolean;
        rayCast(output: RayCastOutput, input: RayCastInput, transform: Transform, childIndex?: number): boolean;
        computeAABB(aabb: AABB, xf: Transform, childIndex?: number): void;
        computeMass(massData: MassData, density: number): void;
        computeDistanceProxy(proxy: DistanceProxy): void;
    }
    interface EdgeShape {
        m_type: 'edge';
        m_radius: number;
        m_vertex1: Vec2;
        m_vertex2: Vec2;
        m_vertex0: Vec2;
        m_vertex3: Vec2;
        m_hasVertex0: boolean;
        m_hasVertex3: boolean;

        setNext(v3?: Vec2): EdgeShape;
        setPrev(v0?: Vec2): EdgeShape;
        _set(v1: Vec2, v2: Vec2): EdgeShape;

        getRadius(): number;
        getType(): 'edge';
        _clone(): EdgeShape;
        getChildCount(): 1;
        testPoint(xf: Transform, p: Vec2): false;
        rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex?: number): boolean;
        computeAABB(aabb: AABB, xf: Transform, childIndex?: number): void;
        computeMass(massData: MassData, density?: number): void;
        computeDistanceProxy(proxy: DistanceProxy): void;
    }
    interface PolygonShape {
        m_type: 'polygon';
        m_radius: number;
        m_centroid: Vec2;
        m_vertices: Vec2[];
        m_normals: Vec2[];
        m_count: number;

        getVertex(index: number): Vec2;
        getRadius(): number;
        getType(): 'polygon';
        _clone(): PolygonShape;
        getChildCount(): 1;
        /**
         * @private
         */
        _set(vertices: Vec2[]): void;
        /**
         * @private
         */
        _setAsBox(hx: number, hy: number, center: Vec2, angle?: number): void;
        _setAsBox(hx: number, hy: number): void;
        testPoint(xf: Transform, p: Vec2): boolean;
        rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex?: number): boolean;
        computeAABB(aabb: AABB, xf: Transform, childIndex?: number): void;
        computeMass(massData: MassData, density: number): void;
        validate(): void;
        computeDistanceProxy(proxy: DistanceProxy): void;
    }
    interface ChainShape {
        m_type: 'chain';
        m_radius: number;
        m_vertices: Vec2[];
        m_count: number;
        m_prevVertex: Vec2 | null;
        m_nextVertex: Vec2 | null;
        m_hasPrevVertex: boolean;
        m_hasNextVertex: boolean;

        _createLoop(vertices: Vec2[]): ChainShape;
        _createChain(vertices: Vec2[]): ChainShape;
        _setPrevVertex(prevVertex: Vec2): void;
        _setNextVertex(nextVertex: Vec2): void;
        getRadius(): number;
        getType(): 'chain';
        _clone(): ChainShape;
        getChildCount(): number;
        getChildEdge(edge: EdgeShape, childIndex: number): void;
        getVertex(index: number): Vec2;
        testPoint(xf: Transform, p: Vec2): false;
        rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;
        computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
        computeMass(massData: MassData, density?: number): void;
        computeDistanceProxy(proxy: DistanceProxy, childIndex: number): void;
    }
    
    enum LIMIT_STATE {
        INACTIVE_LIMIT,
        AT_LOWER_LIMIT,
        AT_UPPER_LIMIT,
        EQUAL_LIMITS,
    }

    interface DistanceJoint {
        // from Joint:
        m_type: 'distance-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;
        // Solver shared
        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_length: Vec2;
        m_frequencyHz: number;
        m_dampingRatio: number;
        m_impulse: number;
        m_gamma: number;
        m_bias: number;
        // Solver temp//internally?
        //this.m_u; // Vec2
        //this.m_rA; // Vec2
        //this.m_rB; // Vec2
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA;
        //this.m_invMassB;
        //this.m_invIA;
        //this.m_invIB;
        //this.m_mass;
        
        // From Joint:
        isActive(): boolean;
        getType(): 'distance-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing?

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2;
        setLength(length: number): void;
        getLength(): number;
        setFrequency(hz: number): void;
        getFrequency(): number;
        setDampingRatio(ratio: number): void;
        getDampingRatio(): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): 0.0;//not implemented?
        initVelocityConstraints(step: { dt: number, warmStarting: boolean, dtRatio: number }): void;
        solveVelocityConstraints(step?: any): void;//TODO
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type DistanceJointDef = JointDef & Partial<{
        frequencyHz: number,
        dampingRatio: number,
    }>;
    interface FrictionJoint {
        // from Joint:
        m_type: 'friction-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        // Solver shared
        m_linearImpulse: Vec2;
        m_angularImpulse: number;
        m_maxForce: number;
        m_maxTorque: number;
        // Solver temp
        //m_rA; // Vec2
        //m_rB; // Vec2
        //m_localCenterA; // Vec2
        //m_localCenterB; // Vec2
        //m_invMassA; // float
        //m_invMassB; // float
        //m_invIA; // float
        //m_invIB; // float
        //m_linearMass; // Mat22
        //m_angularMass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'distance-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2
        setMaxForce(force: number): void;
        getMaxForce(): number;
        setMaxTorque(torque: number): void;
        getMaxTorque(): number;
        getAnchorA(): Vec2
        getAnchorB(): Vec2
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number}): void;
        solvePositionConstraints(step?: any): true;//TODO
    }
    type FrictionJointDef = JointDef & Partial<{
        maxForce: number,
        maxTorque: number,
    }>;
    interface GearJoint {
        // from Joint:
        m_type: 'gear-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_joint1: RevoluteJoint | PrismaticJoint;
        m_joint2: RevoluteJoint | PrismaticJoint;
        m_type1: 'revolute-joint' | 'prismatic-joint';
        m_type2: 'revolute-joint' | 'prismatic-joint';
        m_bodyC: Body;
        m_localAnchorC: Vec2;
        m_localAnchorA: Vec2;
        m_referenceAngleA: number;
        m_localAxisC: Vec2;
        m_bodyD: Body;
        m_localAnchorD: Vec2;
        m_localAnchorB: Vec2;
        m_referenceAngleB: number;
        m_localAxisD: Vec2;
        m_ratio: number;
        m_constant: number;
        m_impulse: number;
        // Solver temp
        //this.m_lcA, this.m_lcB, this.m_lcC, this.m_lcD; // Vec2
        //this.m_mA, this.m_mB, this.m_mC, this.m_mD; // float
        //this.m_iA, this.m_iB, this.m_iC, this.m_iD; // float
        //this.m_JvAC, this.m_JvBD; // Vec2
        //this.m_JwA, this.m_JwB, this.m_JwC, this.m_JwD; // float
        //this.m_mass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'gear-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getJoint1(): RevoluteJoint | PrismaticJoint;
        getJoint2(): RevoluteJoint | PrismaticJoint;
        setRatio(ratio: number): void;
        getRatio(): number;
        getAnchorA(): Vec2;
        getAnchorB (): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean}): void;
        solveVelocityConstraints(step?: any): void;//TODO
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type GearJointDef = JointDef & Partial<{
        ratio: number,
    }>;
    interface MotorJoint {
        // from Joint:
        m_type: 'motor-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_linearOffset: Vec2;
        m_angularOffset: number;
        m_linearImpulse: Vec2;
        m_angularImpulse: number;
        m_maxForce: number;
        m_maxTorque: number;
        m_correctionFactor: number;
        // Solver temp
        //m_rA; // Vec2
        //m_rB; // Vec2
        //m_localCenterA; // Vec2
        //m_localCenterB; // Vec2
        //m_linearError; // Vec2
        //m_angularError; // float
        //m_invMassA; // float
        //m_invMassB; // float
        //m_invIA; // float
        //m_invIB; // float
        //m_linearMass; // Mat22
        //m_angularMass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'motor-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        setMaxForce(force: number): void;
        getMaxForce(): number;
        setMaxTorque(torque: number): void;
        getMaxTorque(): number;
        setCorrectionFactor(factor: number): void;
        getCorrectionFactor(): number;
        setLinearOffset(linearOffset: Vec2): void;
        getLinearOffset(): Vec2;
        setAngularOffset(angularOffset: number): void;
        getAngularOffset(): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number, inv_dt: number}): void;
        solvePositionConstraints(step?: any): true;//TODO
    }
    type MotorJointDef = JointDef & Partial<{
        maxForce: number,
        maxTorque: number,
        correctionFactor: number,
    }>;
    interface MouseJoint {
        // from Joint:
        m_type: 'mouse-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_targetA: Vec2;
        m_localAnchorB: Vec2;
        m_maxForce: number;
        m_impulse: Vec2;
        m_frequencyHz: number;
        m_dampingRatio: number;
        m_beta: number;
        m_gamma: number;
        // Solver temp
        //m_rB: Vec2;
        //m_localCenterB: Vec2;
        //m_invMassB: number;
        //m_invIB: number;
        //mass: Mat22;
        //m_C: Vec2;

        // From Joint:
        isActive(): boolean;
        getType(): 'mouse-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;

        setTarget(target: Vec2): void;
        getTarget(): Vec2
        setMaxForce(force: number): void;
        getMaxForce(): number;
        setFrequency(hz: number): void;
        getFrequency(): number;
        setDampingRatio(ratio: number): void;
        getDampingRatio(): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): 0.0;//BUG?
        shiftOrigin(newOrigin: Vec2): void;
        initVelocityConstraints(step: {dt: number, warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number}): void;
        solvePositionConstraints(step?: any): true;//TODO
    }
    type MouseJointDef = JointDef & Partial<{
        maxForce: number,
        frequencyHz: number,
        dampingRatio: number,
    }>;
    interface PrismaticJoint {
        // from Joint:
        m_type: 'prismatic-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_localXAxisA: Vec2;
        m_localYAxisA: Vec2;
        m_referenceAngle: number;
        m_impulse: Vec3;
        m_motorMass: number;
        m_motorImpulse: number;
        m_lowerTranslation: number;
        m_upperTranslation: number;
        m_maxMotorForce: number;
        m_motorSpeed: number;
        m_enableLimit: boolean;
        m_enableMotor: boolean;
        m_limitState: LIMIT_STATE;
        m_axis: Vec2;
        m_perp: Vec2;
        // Solver temp
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA; // float
        //this.m_invMassB; // float
        //this.m_invIA; // float
        //this.m_invIB; // float
        //this.m_axis, this.m_perp; // Vec2
        //this.m_s1, this.m_s2; // float
        //this.m_a1, this.m_a2; // float
        //this.m_K = new Mat33();
        //this.m_motorMass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'prismatic-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2
        getLocalAxisA(): Vec2;
        getReferenceAngle(): number;
        getJointTranslation(): number;
        getJointSpeed(): number;
        isLimitEnabled(): boolean;
        enableLimit(flag: boolean): void;
        getLowerLimit(): number;
        getUpperLimit(): number;
        setLimits(lower: number, upper: number): void;
        isMotorEnabled(): boolean;
        enableMotor(flag: boolean): void;
        setMotorSpeed(speed: number): void;
        setMaxMotorForce(force: number): void;
        getMotorSpeed(): number;
        getMotorForce(inv_dt: number): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number}): void;
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type PrismaticJointDef = JointDef & Partial<{
        enableLimit: boolean,
        lowerTranslation: number,
        upperTranslation: number,
        enableMotor: boolean,
        maxMotorForce: number,
        motorSpeed: number,
    }>;
    interface PulleyJoint {
        // from Joint:
        m_type: 'pulley-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_groundAnchorA: Vec2;
        m_groundAnchorB: Vec2;
        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_lengthA: Vec2;
        m_lengthB: Vec2;
        m_ratio: number;
        m_constant: number;
        m_impulse: number;
        // Solver temp
        //this.m_uA; // Vec2
        //this.m_uB; // Vec2
        //this.m_rA; // Vec2
        //this.m_rB; // Vec2
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA; // float
        //this.m_invMassB; // float
        //this.m_invIA; // float
        //this.m_invIB; // float
        //this.m_mass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'pulley-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;

        getGroundAnchorA(): Vec2
        getGroundAnchorB(): Vec2
        getLengthA(): number;
        getLengthB(): number;
        getRatio(): number;
        getCurrentLengthA(): number;
        getCurrentLengthB(): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): 0.0;//not implemented or intended?
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step?: any): void;//TODO
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type PulleyJointDef = JointDef & Partial<{
        collideConnected: boolean,
    }>;
    interface RevoluteJoint {
        // from Joint:
        m_type: 'revolute-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_referenceAngle: number;
        m_impulse: Vec3;
        m_motorImpulse: number;
        m_lowerAngle: number;
        m_upperAngle: number;
        m_maxMotorTorque: number;
        m_motorSpeed: number;
        m_enableLimit: boolean;
        m_enableMotor: boolean;
        // Solver temp
        //this.m_rA; // Vec2
        //this.m_rB; // Vec2
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA; // float
        //this.m_invMassB; // float
        //this.m_invIA; // float
        //this.m_invIB; // float
        //// effective mass for point-to-point constraint.
        //this.m_mass = new Mat33();
        //// effective mass for motor/limit angular constraint.
        //this.m_motorMass; // float
        //this.m_limitState = inactiveLimit;//enum

        // From Joint:
        isActive(): boolean;
        getType(): 'revolute-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2
        getReferenceAngle(): number
        getJointAngle(): number;
        getJointSpeed (): number;
        isMotorEnabled(): boolean;
        enableMotor(flag: boolean): void;
        getMotorTorque(inv_dt: number): number
        setMotorSpeed(speed: number): void;
        getMotorSpeed(): number;
        setMaxMotorTorque(torque: number): void;
        isLimitEnabled(): boolean;
        enableLimit(flag: boolean): void;
        getLowerLimit(): number;
        getUpperLimit(): number;
        setLimits(lower: number, upper: number): void;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number}): void;
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type RevoluteJointDef = JointDef & Partial<{
        lowerAngle: number,
        upperAngle: number,
        maxMotorTorque: number,
        motorSpeed: number,
        enableLimit: boolean,
        enableMotor: boolean,
    }>;
    interface RopeJoint {
        // from Joint:
        m_type: 'rope-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_maxLength: number;
        m_mass: number;
        m_impulse: number;
        m_length: number;
        m_state: LIMIT_STATE;

        // Solver temp
        //m_u; // Vec2
        //m_rA; // Vec2
        //m_rB; // Vec2
        //m_localCenterA; // Vec2
        //m_localCenterB; // Vec2
        //m_invMassA; // float
        //m_invMassB; // float
        //m_invIA; // float
        //m_invIB; // float
        //m_mass; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'rope-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA (): Vec2;
        getLocalAnchorB(): Vec2;
        setMaxLength(length: number): void;
        getMaxLength(): number;
        getLimitState(): LIMIT_STATE;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): 0.0;//not implemented or intended?
        initVelocityConstraints(step: {warmStarting: boolean, dtRatio: number}): void;
        solveVelocityConstraints(step: {inv_dt: number}): void;
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type RopeJointDef = JointDef & Partial<{
        maxLength: number,
    }>;
    interface WeldJoint {
        // from Joint:
        m_type: 'weld-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_referenceAngle: number;
        m_frequencyHz: number;
        m_dampingRatio: number;
        m_impulse: Vec3;
        m_bias: number;
        m_gamma: number;
        // Solver temp
        //this.m_rA; // Vec2
        //this.m_rB; // Vec2
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA; // float
        //this.m_invMassB; // float
        //this.m_invIA; // float
        //this.m_invIB; // float
        //this.m_mass = new Mat33();

        // From Joint:
        isActive(): boolean;
        getType(): 'weld-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2;
        getReferenceAngle(): number;
        setFrequency(hz: number): void;
        getFrequency(): number;
        setDampingRatio(ratio: number): void;
        getDampingRatio(): number;
        getAnchorA(): Vec2
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dt: number, dtRatio: number}): void;
        solveVelocityConstraints(step?: any): void;//TODO
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type WeldJointDef = JointDef & Partial<{
        frequencyHz: number,
        dampingRatio: number,
    }>;
    interface WheelJoint {
        // from Joint:
        m_type: 'wheel-joint';
        m_bodyA: Body;
        m_bodyB: Body;
        m_index: number;
        m_collideConnected: boolean;
        m_prev: Joint | null;
        m_next: Joint | null;
        m_edgeA: JointEdge;
        m_edgeB: JointEdge;
        m_islandFlag: boolean;
        m_userData: unknown;

        m_localAnchorA: Vec2;
        m_localAnchorB: Vec2;
        m_localXAxisA: Vec2;
        m_localYAxisA: Vec2;
        m_mass: number;
        m_impulse: number;
        m_motorMass: number;
        m_motorImpulse: number;
        m_springMass: number;
        m_springImpulse: number;
        m_maxMotorTorque: number;
        m_motorSpeed: number;
        m_enableMotor: boolean;
        m_frequencyHz: number;
        m_dampingRatio: number;
        m_bias: number;
        m_gamma: number;
        // Solver temp
        //this.m_localCenterA; // Vec2
        //this.m_localCenterB; // Vec2
        //this.m_invMassA; // float
        //this.m_invMassB; // float
        //this.m_invIA; // float
        //this.m_invIB; // float
        //this.m_ax = Vec2.zero();
        //this.m_ay = Vec2.zero(); // Vec2
        //this.m_sAx;
        //this.m_sBx; // float
        //this.m_sAy;
        //this.m_sBy; // float

        // From Joint:
        isActive(): boolean;
        getType(): 'wheel-joint';
        getBodyA(): Body;
        getBodyB(): Body;
        getNext(): Joint | null;
        getUserData(): unknown;
        setUserData(data: any): void;
        getCollideConnected(): boolean;
        shiftOrigin(newOrigin: Vec2): void;//does nothing

        getLocalAnchorA(): Vec2;
        getLocalAnchorB(): Vec2;
        getLocalAxisA(): Vec2;
        getJointTranslation(): number;
        getJointSpeed(): number;
        isMotorEnabled(): boolean;
        enableMotor(flag: boolean): void;
        setMotorSpeed(speed: number): void;
        getMotorSpeed(): number;
        setMaxMotorTorque(torque: number): void;
        getMaxMotorTorque(): number;
        getMotorTorque(inv_dt: number): number;
        setSpringFrequencyHz(hz: number): void;
        getSpringFrequencyHz(): number;
        setSpringDampingRatio(ratio: number): void;
        getSpringDampingRatio(): number;
        getAnchorA(): Vec2;
        getAnchorB(): Vec2;
        getReactionForce(inv_dt: number): Vec2;
        getReactionTorque(inv_dt: number): number;
        initVelocityConstraints(step: {warmStarting: boolean, dt: number, dtRatio: number}): void;
        solveVelocityConstraints(step: {dt: number}): void;
        solvePositionConstraints(step?: any): boolean;//TODO
    }
    type WheelJointDef = JointDef & Partial<{
        enableMotor: boolean,
        maxMotorTorque: number,
        motorSpeed: number,
        frequencyHz: number,
        dampingRatio: number,
    }>;
    
    // API

    let Math: Math & {
        EPSILON: number;//readonly?
        /**
         * This function is used to ensure that a floating point number is not a NaN or
         * infinity.
         */
        isFinite(x: any): boolean;
        //assert(x: any): void;
        invSqrt(x: number): number;
        nextPowerOfTwo(x: number): number;
        isPowerOfTwo(x: number): boolean;
        mod(num: number, min: number, max: number): number;
        mod(num: number, max?: number): number;
        clamp(num: number, min: number, max: number): number;
        random(min: number, max: number): number;
        random(max?: number): number;
    }
    
    let Vec2: {
        new(x: number, y: number): Vec2;
        new(obj: { x: number, y: number }): Vec2;
        new(): Vec2;
        (x: number, y: number): Vec2;
        (obj: { x: number, y: number }): Vec2;
        (): Vec2;

        zero(): Vec2;
        neo(x: number, y: number): Vec2;
        clone(v: Vec2/*, depricated*/): Vec2;//depricated?
        isValid(v: any): v is { x: number, y: number };
        //asssert(o: Vec2): void;
        lengthOf(v: Vec2): number;
        lengthSquared(v: Vec2): number;
        distance(v: Vec2, w: Vec2): number;
        distanceSquared(v: Vec2, w: Vec2): number;
        areEqual(v: Vec2, w: Vec2 | null): boolean;
        skew(v: Vec2): Vec2;
        dot(v: Vec2, w: Vec2): number;
        cross(v: Vec2, w: Vec2): number;
        cross(v: Vec2, w: number): Vec2;
        cross(v: number, w: Vec2): Vec2;
        addCross(a: Vec2, v: Vec2, w: number): Vec2;
        addCross(a: Vec2, v: number, w: Vec2): Vec2;
        add(v: Vec2, w: Vec2): Vec2;
        wAdd(a: number, v: Vec2, b: number, w: Vec2): Vec2;
        wAdd(a: number, v: Vec2): Vec2;
        sub(v: Vec2, w: Vec2): Vec2;
        mul(a: Vec2, b: number): Vec2;
        mul(a: number, b: Vec2): Vec2;
        neg(v: Vec2): Vec2;
        abs(v: Vec2): Vec2;
        mid(v: Vec2, w: Vec2): Vec2;
        upper(v: Vec2, w: Vec2): Vec2;
        lower(v: Vec2, w: Vec2): Vec2;
        clamp(v: Vec2, max: number): Vec2;
    }
    let Transform: {
        new(position: Vec2, rotation: number): Transform;
        (position: Vec2, rotation: number): Transform;

        clone(xf: Transform): Transform;
        neo(position: Vec2, rotation: number): Transform;
        identity(): Transform;
        isValid(o: any): o is { p: { x: number, y: number }, q: { s: number, c: number } };
        //assert(o: Transform): void;
        mul(a: Transform, b: Vec2): Vec2;
        mul(a: Transform, b: Transform): Transform;
        mul(a: Transform, b: Vec2[]): Vec2[];
        mul(a: Transform, b: Transform[]): Transform[];
        mulT(a: Transform, b: Vec2): Vec2;
        mulT(a: Transform, b: Transform): Transform;
    }
    let Rot: {
        new(angle?: number | Rot): Rot;
        (angle?: number | Rot): Rot;

        neo(angle: number): Rot;
        clone(rot: Rot): Rot;
        identity(/*rot*/): Rot;
        isValid(o: any): o is { s: number, c: number };
        //assert(o: Rot): void;
        mul(rot: Rot, m: Rot): Rot;
        mul(rot: Rot, m: Vec2): Vec2;
        mulSub(rot: Rot, v: Vec2, w: Vec2): Vec2;
        mulT(rot: Rot, m: Rot): Rot;
        mulT(rot: Rot, m: Vec2): Vec2;
    }
    let AABB: {
        new(lower?: Vec2, upper?: Vec2): AABB;
        (lower?: Vec2, upper?: Vec2): AABB;

        isValid(aabb: AABB): boolean;
        extend(aabb: AABB, value: number): void;
        testOverlap(a: AABB, b: AABB): boolean;
        areEqual(a: AABB, b: AABB): boolean;
        diff(a: AABB, b: AABB): number;
    }
    let Shape: {
        isValid(shape: Shape | null | undefined): shape is Shape;
    }
    let Fixture: {
        new(body: Body, shape: Shape, def?: FixtureDef | number | null): Fixture;
        new(body: Body, def: FixtureDefWithShape): Fixture;
    }
    let Body: {
        new(world: World, def?: BodyDef | null): Body;

        STATIC: 'static';
        KINEMATIC: 'kinematic';
        DYNAMIC: 'dynamic';
    }
    let Contact: {
        new(fA: Fixture, indexA: number, fB: Fixture, indexB: number,
            evaluateFcn: (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void): Contact;
        
        addType(type1: "circle" | "edge" | "polygon" | "chain", type2: "circle" | "edge" | "polygon" | "chain",
            callback: (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void &
                { destroyFcn?: (contact: Contact) => void }): void;
        create(fixtureA: Fixture, indexA: number, fixtureB: Fixture, indexB: number): Contact | null;
        destroy(contact: Contact, listener: { endContact: (contact: Contact) => void }): void;
    }

    let Joint: {}
    let World: {
        new(def?: WorldDef | Vec2 | null): World;
        (def?: WorldDef | Vec2| null): World;
    }

    let Circle: {
        new(position: Vec2, radius?: number): CircleShape;
        new(radius?: number): CircleShape;
        (position: Vec2, radius?: number): CircleShape;
        (radius?: number): CircleShape;

        TYPE: 'circle';
    }
    let Edge: {
        new(v1?: Vec2, v2?: Vec2): EdgeShape;
        (v1?: Vec2, v2?: Vec2): EdgeShape;

        TYPE: 'edge';
    }
    let Polygon: {
        new(vertices: Vec2[]): PolygonShape;
        (vertices: Vec2[]): PolygonShape;

        TYPE: 'polygon';
    }
    let Chain: {
        new(vertices: Vec2[], loop?: boolean): ChainShape;
        new(): ChainShape;
        (vertices: Vec2[], loop?: boolean): ChainShape;
        (): ChainShape;

        TYPE: 'chain';
    }
    let Box: {
        new(hx: number, hy: number, center: Vec2, angle?: number): PolygonShape;
        new(hx: number, hy: number): PolygonShape;
        (hx: number, hy: number, center: Vec2, angle?: number): PolygonShape;
        (hx: number, hy: number): PolygonShape;

        TYPE: 'polygon';
    }

    let DistanceJoint: {
        new(def: DistanceJointDef & {
            bodyA: Body,
            bodyB: Body,
            localAnchorA: Vec2,
            localAnchorB: Vec2,
        }): DistanceJoint;
        new(def: DistanceJointDef | null | undefined, bodyA: Body, anchorA: Vec2,
            bodyB: Body, anchorB: Vec2): DistanceJoint;
        (def: DistanceJointDef & {
            bodyA: Body,
            bodyB: Body,
            localAnchorA: Vec2,
            localAnchorB: Vec2,
        }): DistanceJoint;
        (def: DistanceJointDef | null | undefined, bodyA: Body, anchorA: Vec2,
            bodyB: Body, anchorB: Vec2): DistanceJoint;

        TYPE: 'distance-joint';
    }
    let FrictionJoint: {
        new(def: FrictionJointDef & {
            bodyA: Body,
            bodyB: Body,
        }): FrictionJoint;
        new(def: FrictionJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor?: Vec2): FrictionJoint;
        (def: FrictionJointDef & {
            bodyA: Body,
            bodyB: Body,
        }): FrictionJoint;
        (def: FrictionJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor?: Vec2): FrictionJoint;

        TYPE: 'friction-joint';
    }
    let GearJoint: {
        new(def: GearJointDef | null | undefined, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;
        new(def: {} | null | undefined, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio: number): GearJoint;
        (def: GearJointDef | null | undefined, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;
        (def: {} | null | undefined, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio: number): GearJoint;

        TYPE: 'gear-joint';
    }
    let MotorJoint: {
        new(def: MotorJointDef | null | undefined, bodyA: Body, bodyB: Body): MotorJoint;
        (def: MotorJointDef | null | undefined, bodyA: Body, bodyB: Body): MotorJoint;

        TYPE: 'motor-joint';
    }
    let MouseJoint: {
        new(def: MouseJointDef | null | undefined, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;
        (def: MouseJointDef | null | undefined, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;

        TYPE: 'mouse-joint';
    }
    let PrismaticJoint: {
        new(def: PrismaticJointDef & {localAnchorA: Vec2, localAnchorB: Vec2, localAxisA: Vec2}, bodyA: Body, bodyB: Body): PrismaticJoint;
        new(def: PrismaticJointDef & {localAxisA: Vec2}, bodyA: Body, bodyB: Body, anchor: Vec2): PrismaticJoint;
        new(def: PrismaticJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;
        (def: PrismaticJointDef & {localAnchorA: Vec2, localAnchorB: Vec2, localAxisA: Vec2}, bodyA: Body, bodyB: Body): PrismaticJoint;
        (def: PrismaticJointDef & {localAxisA: Vec2}, bodyA: Body, bodyB: Body, anchor: Vec2): PrismaticJoint;
        (def: PrismaticJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;

        TYPE: 'prismatic-joint';
    }
    let PulleyJoint: {
        new(def: PulleyJointDef & {ratio: number}, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2): PulleyJoint;
        new(def: PulleyJointDef | null | undefined, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;
        (def: PulleyJointDef & {ratio: number}, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2): PulleyJoint;
        (def: PulleyJointDef | null | undefined, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;

        TYPE: 'pulley-joint';
        MIN_PULLEY_LENGTH: number;
    }
    let RevoluteJoint: {
        new(def: RevoluteJointDef & {localAnchorA: Vec2, localAnchorB: Vec2}, bodyA: Body, bodyB: Body): RevoluteJoint;
        new(def: RevoluteJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;
        (def: RevoluteJointDef & {localAnchorA: Vec2, localAnchorB: Vec2}, bodyA: Body, bodyB: Body): RevoluteJoint;
        (def: RevoluteJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;

        TYPE: 'revolute-joint';
    }
    let RopeJoint: {
        new(def: RopeJointDef & {localAnchorA: Vec2, localAnchorB: Vec2, bodyA: Body, bodyB: Body}): RopeJoint;
        new(def: RopeJointDef & {localAnchorA: Vec2, localAnchorB: Vec2}, bodyA: Body, bodyB: Body): RopeJoint;
        new(def: RopeJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;
        (def: RopeJointDef & {localAnchorA: Vec2, localAnchorB: Vec2, bodyA: Body, bodyB: Body}): RopeJoint;
        (def: RopeJointDef & {localAnchorA: Vec2, localAnchorB: Vec2}, bodyA: Body, bodyB: Body): RopeJoint;
        (def: RopeJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;

        TYPE: 'rope-joint';
    }
    let WeldJoint: {
        new(def: WeldJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;
        (def: WeldJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;

        TYPE: 'weld-joint';
    }
    let WheelJoint: {
        new(def: WheelJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2, axis?: Vec2): WheelJoint;
        (def: WheelJointDef | null | undefined, bodyA: Body, bodyB: Body, anchor: Vec2, axis?: Vec2): WheelJoint;

        TYPE: 'wheel-joint';
    }

    let internal: any;//TODO (should this be private?)

    // Testbed
    
    interface Testbed {
        isPaused(): boolean;
        togglePause(): void;
        pause(): void;
        resume(): void;
        focus(): void;
        debug: boolean;
        width: number;
        height: number;
        x: number;
        y: number;
        ratio: number;
        hz: number;
        speed: number;
        activeKeys: {
            0?: boolean;
            1?: boolean;
            2?: boolean;
            3?: boolean;
            4?: boolean;
            5?: boolean;
            6?: boolean;
            7?: boolean;
            8?: boolean;
            9?: boolean;
            A?: boolean;
            B?: boolean;
            C?: boolean;
            D?: boolean;
            E?: boolean;
            F?: boolean;
            G?: boolean;
            H?: boolean;
            I?: boolean;
            J?: boolean;
            K?: boolean;
            L?: boolean;
            M?: boolean;
            N?: boolean;
            O?: boolean;
            P?: boolean;
            Q?: boolean;
            R?: boolean;
            S?: boolean;
            T?: boolean;
            U?: boolean;
            V?: boolean;
            W?: boolean;
            X?: boolean;
            Y?: boolean;
            Z?: boolean;
            right?: boolean;
            left?: boolean;
            up?: boolean;
            down?: boolean;
            fire?: boolean;
        };
        background: string;
        
        mouseForce?: number;
        
        status(name: string | number, value: boolean | number | string | Symbol): void;
        status(a: object): void;
        status(a: string): void;
        info(text: string): void;
        
        drawPoint(p: {x: number, y: number}, r: any, color: string): void;
        drawCircle(p: {x: number, y: number}, r: number, color: string): void;
        drawSegment(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
        drawPolygon(points: {x: number, y: number}[], color: string): void;
        drawAABB(aabb: AABB, color: string): void;
        color(r: number, g: number, b: number): string;
        //callbacks
        _resume?: () => void;
        _pause?: () => void;
        _info?: (text: string) => void;
        step?: (dt: number, t: number) => void;
        keydown?: (keyCode: number, label: string) => void;
        keyup?: (keyCode: number, label: string) => void;
    }
    
    function testbed(opts: any, callback: (testbed: Testbed) => World): Testbed;//opts is never used, bug?
    function testbed(callback: (testbed: Testbed) => World): Testbed;
    
}