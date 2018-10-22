declare namespace planck {
  // Types

  enum LIMIT_STATE {
    INACTIVE_LIMIT,
    AT_LOWER_LIMIT,
    AT_UPPER_LIMIT,
    EQUAL_LIMITS,
  }

  interface JointEdge {
    other: Body;  // < provides quick access to the other body attached.
    joint: Joint;  // < the joint
    prev: JointEdge | null;  // < the previous joint edge in the body's joint list
    next: JointEdge | null;  // < the next joint edge in the body's joint list
  }

  interface Joint {
    m_type: string;
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

    isActive(): boolean;
    getType(): string;
    getBodyA(): Body;
    getBodyB(): Body;
    getNext(): Joint | null;
    getUserData(): unknown;
    setUserData(data: any): void;
    getCollideConnected(): boolean;
    getAnchorA(): Vec2;
    getAnchorB(): Vec2;
    getReactionForce(inv_dt: number): Vec2;
    getReactionTorque(inv_dt: number): number;
    shiftOrigin(newOrigin: Vec2): void;
    initVelocityConstraints(step): void;
    solveVelocityConstraints(step): void;
    solvePositionConstraints(step): boolean;
  }
  type JointOpt = Partial<{
    userData: any,
    collideConnected: boolean,
  }>;
  type JointDef = JointOpt & {
    bodyA: Body,
    bodyB: Body,
  };

  interface DistanceJoint extends Joint {
    m_type: 'distance-joint';

    // Solver shared
    m_localAnchorA: Vec2;
    m_localAnchorB: Vec2;
    m_length: Vec2;
    m_frequencyHz: number;
    m_dampingRatio: number;
    m_impulse: number;
    m_gamma: number;
    m_bias: number;
    // Solver temp
    // this.m_u; // Vec2
    // this.m_rA; // Vec2
    // this.m_rB; // Vec2
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA;
    // this.m_invMassB;
    // this.m_invIA;
    // this.m_invIB;
    // this.m_mass;

    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
    setLength(length: number): void;
    getLength(): number;
    setFrequency(hz: number): void;
    getFrequency(): number;
    setDampingRatio(ratio: number): void;
    getDampingRatio(): number;
  }
  type DistanceJointOpt = JointOpt & Partial<{
    frequencyHz: number,
    dampingRatio: number,
    length: number,
  }>;
  type DistanceJointDef = JointDef & DistanceJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
  };

  interface FrictionJoint extends Joint {
    m_type: 'friction-joint';

    m_localAnchorA: Vec2;
    m_localAnchorB: Vec2;
    // Solver shared
    m_linearImpulse: Vec2;
    m_angularImpulse: number;
    m_maxForce: number;
    m_maxTorque: number;
    // Solver temp
    // m_rA; // Vec2
    // m_rB; // Vec2
    // m_localCenterA; // Vec2
    // m_localCenterB; // Vec2
    // m_invMassA; // float
    // m_invMassB; // float
    // m_invIA; // float
    // m_invIB; // float
    // m_linearMass; // Mat22
    // m_angularMass; // float

    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
    setMaxForce(force: number): void;
    getMaxForce(): number;
    setMaxTorque(torque: number): void;
    getMaxTorque(): number;
  }
  type FrictionJointOpt = JointOpt & Partial<{
    maxForce: number,
    maxTorque: number,
  }>;
  type FrictionJointDef = JointDef & FrictionJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
  };

  interface GearJoint extends Joint {
    m_type: 'gear-joint';

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
    // this.m_lcA, this.m_lcB, this.m_lcC, this.m_lcD; // Vec2
    // this.m_mA, this.m_mB, this.m_mC, this.m_mD; // float
    // this.m_iA, this.m_iB, this.m_iC, this.m_iD; // float
    // this.m_JvAC, this.m_JvBD; // Vec2
    // this.m_JwA, this.m_JwB, this.m_JwC, this.m_JwD; // float
    // this.m_mass; // float

    getJoint1(): RevoluteJoint | PrismaticJoint;
    getJoint2(): RevoluteJoint | PrismaticJoint;
    setRatio(ratio: number): void;
    getRatio(): number;
  }
  type GearJointOpt = JointOpt & Partial<{
    ratio: number,
  }>;
  type GearJointDef = JointDef & GearJointOpt & {
    joint1: RevoluteJoint | PrismaticJoint,
    joint2: RevoluteJoint | PrismaticJoint,
  };

  interface MotorJoint extends Joint {
    m_type: 'motor-joint';

    m_linearOffset: Vec2;
    m_angularOffset: number;
    m_linearImpulse: Vec2;
    m_angularImpulse: number;
    m_maxForce: number;
    m_maxTorque: number;
    m_correctionFactor: number;
    // Solver temp
    // m_rA; // Vec2
    // m_rB; // Vec2
    // m_localCenterA; // Vec2
    // m_localCenterB; // Vec2
    // m_linearError; // Vec2
    // m_angularError; // float
    // m_invMassA; // float
    // m_invMassB; // float
    // m_invIA; // float
    // m_invIB; // float
    // m_linearMass; // Mat22
    // m_angularMass; // float

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
  }
  type MotorJointOpt = JointOpt & Partial<{
    maxForce: number,
    maxTorque: number,
    correctionFactor: number,
    linearOffset: Vec2,
  }>;
  type MotorJointDef = JointDef & MotorJointOpt & {
  };

  interface MouseJoint extends Joint {
    m_type: 'mouse-joint';

    m_targetA: Vec2;
    m_localAnchorB: Vec2;
    m_maxForce: number;
    m_impulse: Vec2;
    m_frequencyHz: number;
    m_dampingRatio: number;
    m_beta: number;
    m_gamma: number;
    // Solver temp
    // m_rB: Vec2;
    // m_localCenterB: Vec2;
    // m_invMassB: number;
    // m_invIB: number;
    // mass: Mat22;
    // m_C: Vec2;

    setTarget(target: Vec2): void;
    getTarget(): Vec2;
    setMaxForce(force: number): void;
    getMaxForce(): number;
    setFrequency(hz: number): void;
    getFrequency(): number;
    setDampingRatio(ratio: number): void;
    getDampingRatio(): number;
  }
  type MouseJointOpt = JointOpt & Partial<{
    maxForce: number,
    frequencyHz: number,
    dampingRatio: number,
  }>;
  type MouseJointDef = JointDef & MouseJointOpt & {
    target: Vec2,
  };

  interface PrismaticJoint extends Joint {
    m_type: 'prismatic-joint';

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
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA; // float
    // this.m_invMassB; // float
    // this.m_invIA; // float
    // this.m_invIB; // float
    // this.m_axis, this.m_perp; // Vec2
    // this.m_s1, this.m_s2; // float
    // this.m_a1, this.m_a2; // float
    // this.m_K = new Mat33();
    // this.m_motorMass; // float

    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
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
  }
  type PrismaticJointOpt = JointOpt & Partial<{
    enableLimit: boolean,
    lowerTranslation: number,
    upperTranslation: number,
    enableMotor: boolean,
    maxMotorForce: number,
    motorSpeed: number,
  }>;
  type PrismaticJointDef = JointDef & PrismaticJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
    localAxisA: Vec2,
    referenceAngle: number,
  };

  interface PulleyJoint extends Joint {
    m_type: 'pulley-joint';

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
    // this.m_uA; // Vec2
    // this.m_uB; // Vec2
    // this.m_rA; // Vec2
    // this.m_rB; // Vec2
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA; // float
    // this.m_invMassB; // float
    // this.m_invIA; // float
    // this.m_invIB; // float
    // this.m_mass; // float

    getGroundAnchorA(): Vec2;
    getGroundAnchorB(): Vec2;
    getLengthA(): number;
    getLengthB(): number;
    getRatio(): number;
    getCurrentLengthA(): number;
    getCurrentLengthB(): number;
  }
  type PulleyJointOpt = JointOpt & Partial<{
  }>;
  type PulleyJointDef = JointDef & PulleyJointOpt & {
    groundAnchorA: Vec2,
    groundAnchorB: Vec2,
    localAnchorA: Vec2,
    localAnchorB: Vec2,
    lengthA: number,
    lengthB: number,
    ratio: number,
  };

  interface RevoluteJoint extends Joint {
    m_type: 'revolute-joint';

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
    // this.m_rA; // Vec2
    // this.m_rB; // Vec2
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA; // float
    // this.m_invMassB; // float
    // this.m_invIA; // float
    // this.m_invIB; // float
    // // effective mass for point-to-point constraint.
    // this.m_mass = new Mat33();
    // // effective mass for motor/limit angular constraint.
    // this.m_motorMass; // float
    // this.m_limitState = inactiveLimit;//enum

    // From Joint:
    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
    getReferenceAngle(): number;
    getJointAngle(): number;
    getJointSpeed(): number;
    isMotorEnabled(): boolean;
    enableMotor(flag: boolean): void;
    getMotorTorque(inv_dt: number): number;
    setMotorSpeed(speed: number): void;
    getMotorSpeed(): number;
    setMaxMotorTorque(torque: number): void;
    isLimitEnabled(): boolean;
    enableLimit(flag: boolean): void;
    getLowerLimit(): number;
    getUpperLimit(): number;
    setLimits(lower: number, upper: number): void;
  }
  type RevoluteJointOpt = JointOpt & Partial<{
    lowerAngle: number,
    upperAngle: number,
    maxMotorTorque: number,
    motorSpeed: number,
    enableLimit: boolean,
    enableMotor: boolean,
  }>;
  type RevoluteJointDef = JointDef & RevoluteJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
    referenceAngle: number,
  };

  interface RopeJoint extends Joint {
    m_type: 'rope-joint';

    m_localAnchorA: Vec2;
    m_localAnchorB: Vec2;
    m_maxLength: number;
    m_mass: number;
    m_impulse: number;
    m_length: number;
    m_state: LIMIT_STATE;

    // Solver temp
    // m_u; // Vec2
    // m_rA; // Vec2
    // m_rB; // Vec2
    // m_localCenterA; // Vec2
    // m_localCenterB; // Vec2
    // m_invMassA; // float
    // m_invMassB; // float
    // m_invIA; // float
    // m_invIB; // float
    // m_mass; // float

    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
    setMaxLength(length: number): void;
    getMaxLength(): number;
    getLimitState(): LIMIT_STATE;
  }
  type RopeJointOpt = JointOpt & Partial<{
    maxLength: number,
  }>;
  type RopeJointDef = JointDef & RopeJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
  };

  interface WeldJoint extends Joint {
    m_type: 'weld-joint';

    m_localAnchorA: Vec2;
    m_localAnchorB: Vec2;
    m_referenceAngle: number;
    m_frequencyHz: number;
    m_dampingRatio: number;
    m_impulse: Vec3;
    m_bias: number;
    m_gamma: number;
    // Solver temp
    // this.m_rA; // Vec2
    // this.m_rB; // Vec2
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA; // float
    // this.m_invMassB; // float
    // this.m_invIA; // float
    // this.m_invIB; // float
    // this.m_mass = new Mat33();

    getLocalAnchorA(): Vec2;
    getLocalAnchorB(): Vec2;
    getReferenceAngle(): number;
    setFrequency(hz: number): void;
    getFrequency(): number;
    setDampingRatio(ratio: number): void;
    getDampingRatio(): number;
  }
  type WeldJointOpt = JointOpt & Partial<{
    frequencyHz: number,
    dampingRatio: number,
    referenceAngle: number,
  }>;
  type WeldJointDef = JointDef & WeldJointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
  };

  interface WheelJoint extends Joint {
    m_type: 'wheel-joint';

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
    // this.m_localCenterA; // Vec2
    // this.m_localCenterB; // Vec2
    // this.m_invMassA; // float
    // this.m_invMassB; // float
    // this.m_invIA; // float
    // this.m_invIB; // float
    // this.m_ax = Vec2.zero();
    // this.m_ay = Vec2.zero(); // Vec2
    // this.m_sAx;
    // this.m_sBx; // float
    // this.m_sAy;
    // this.m_sBy; // float

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
  }
  type WheelJointOpt = JointOpt & Partial<{
    enableMotor: boolean,
    maxMotorTorque: number,
    motorSpeed: number,
    frequencyHz: number,
    dampingRatio: number,
  }>;
  type WheelJointDef = JointDef & JointOpt & {
    localAnchorA: Vec2,
    localAnchorB: Vec2,
    localAxisA: Vec2,
  };

  // API
  let DistanceJoint: {
    new(def: DistanceJointDef): DistanceJoint;
       (def: DistanceJointDef): DistanceJoint;

    new(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2): DistanceJoint;
       (def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2): DistanceJoint;

    TYPE: 'distance-joint';
  };
  let FrictionJoint: {
    new(def: FrictionJointDef): FrictionJoint;
       (def: FrictionJointDef): FrictionJoint;

    new(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): FrictionJoint;
       (def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): FrictionJoint;

    TYPE: 'friction-joint';
  };
  let GearJoint: {
    new(def: GearJointDef): GearJoint;
       (def: GearJointDef): GearJoint;

    new(def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;
       (def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;

    TYPE: 'gear-joint';
  };
  let MotorJoint: {
    new(def: MotorJointDef): MotorJoint;
       (def: MotorJointDef): MotorJoint;

    new(def: MotorJointOpt, bodyA: Body, bodyB: Body): MotorJoint;
       (def: MotorJointOpt, bodyA: Body, bodyB: Body): MotorJoint;

    TYPE: 'motor-joint';
  };
  let MouseJoint: {
    new(def: MouseJointDef): MouseJoint;
       (def: MouseJointDef): MouseJoint;

    new(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;
       (def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;

    TYPE: 'mouse-joint';
  };
  let PrismaticJoint: {
    new(def: PrismaticJointDef): PrismaticJoint;
       (def: PrismaticJointDef): PrismaticJoint;

    new(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;
       (def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;

    TYPE: 'prismatic-joint';
  };
  let PulleyJoint: {
    new(def: PulleyJointDef): PulleyJoint;
       (def: PulleyJointDef): PulleyJoint;

    new(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;
       (def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;

    TYPE: 'pulley-joint';
    MIN_PULLEY_LENGTH: number;
  };
  let RevoluteJoint: {
    new(def: RevoluteJointDef): RevoluteJoint;
       (def: RevoluteJointDef): RevoluteJoint;

    new(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;
       (def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;

    TYPE: 'revolute-joint';
  };
  let RopeJoint: {
    new(def: RopeJointDef): RopeJoint;
       (def: RopeJointDef): RopeJoint;

    new(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;
       (def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;

    TYPE: 'rope-joint';
  };
  let WeldJoint: {
    new(def: WeldJointDef): WeldJoint;
       (def: WeldJointDef): WeldJoint;

    new(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;
       (def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;

    TYPE: 'weld-joint';
  };
  let WheelJoint: {
    new(def: WheelJointDef): WheelJoint;
       (def: WheelJointDef): WheelJoint;

    new(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): WheelJoint;
       (def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): WheelJoint;

    TYPE: 'wheel-joint';
  };
}
