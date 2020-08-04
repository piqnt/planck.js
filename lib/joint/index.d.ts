import { Vec2, Vec3 } from "../common";
import { Body } from "../";

// Types

export enum LIMIT_STATE {
  INACTIVE_LIMIT,
  AT_LOWER_LIMIT,
  AT_UPPER_LIMIT,
  EQUAL_LIMITS,
}

export interface JointEdge {
  other: Body;  // < provides quick access to the other body attached.
  joint: Joint;  // < the joint
  prev: JointEdge | null;  // < the previous joint edge in the body's joint list
  next: JointEdge | null;  // < the next joint edge in the body's joint list
}

export class Joint {
  /** @internal */ m_type: string;
  /** @internal */ m_bodyA: Body;
  /** @internal */ m_bodyB: Body;
  /** @internal */ m_index: number;
  /** @internal */ m_collideConnected: boolean;
  /** @internal */ m_prev: Joint | null;
  /** @internal */ m_next: Joint | null;
  /** @internal */ m_edgeA: JointEdge;
  /** @internal */ m_edgeB: JointEdge;
  /** @internal */ m_islandFlag: boolean;
  /** @internal */ m_userData: unknown;

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
  initVelocityConstraints(step: any): void;
  solveVelocityConstraints(step: any): void;
  solvePositionConstraints(step: any): boolean;
}
export interface JointOpt {
  userData?: any;
  collideConnected?: boolean;
}

export interface JointDef extends JointOpt {
  bodyA: Body;
  bodyB: Body;
}

export function DistanceJoint(def: DistanceJointDef): DistanceJoint;
export function DistanceJoint(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2): DistanceJoint;
export class DistanceJoint extends Joint {
  static TYPE: 'distance-joint';

  constructor(def: DistanceJointDef);
  constructor(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2);

  /** @internal */ m_type: 'distance-joint';
  // Solver shared
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_length: Vec2;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_gamma: number;
  /** @internal */ m_bias: number;
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

export interface DistanceJointOpt extends JointOpt {
  frequencyHz: number;
  dampingRatio: number;
  length: number;
}

export interface DistanceJointDef extends JointDef, DistanceJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
}

export function FrictionJoint(def: FrictionJointDef): FrictionJoint;
export function FrictionJoint(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): FrictionJoint;
export class FrictionJoint extends Joint {
  static TYPE: 'friction-joint';
  constructor(def: FrictionJointDef);
  constructor(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);

  /** @internal */ m_type: 'friction-joint';

  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  // Solver shared
  /** @internal */ m_linearImpulse: Vec2;
  /** @internal */ m_angularImpulse: number;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_maxTorque: number;
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

export interface FrictionJointOpt extends JointOpt {
  maxForce: number;
  maxTorque: number;
}

export interface FrictionJointDef extends JointDef, FrictionJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
}

export function GearJoint(def: GearJointDef): GearJoint;
export function GearJoint(def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;
export class GearJoint extends Joint {
  static TYPE: 'gear-joint';

  constructor(def: GearJointDef);
  constructor(def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number);

  /** @internal */ m_type: 'gear-joint';
  /** @internal */ m_joint1: RevoluteJoint | PrismaticJoint;
  /** @internal */ m_joint2: RevoluteJoint | PrismaticJoint;
  /** @internal */ m_type1: 'revolute-joint' | 'prismatic-joint';
  /** @internal */ m_type2: 'revolute-joint' | 'prismatic-joint';
  /** @internal */ m_bodyC: Body;
  /** @internal */ m_localAnchorC: Vec2;
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_referenceAngleA: number;
  /** @internal */ m_localAxisC: Vec2;
  /** @internal */ m_bodyD: Body;
  /** @internal */ m_localAnchorD: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngleB: number;
  /** @internal */ m_localAxisD: Vec2;
  /** @internal */ m_ratio: number;
  /** @internal */ m_constant: number;
  /** @internal */ m_impulse: number;
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

export interface GearJointOpt extends JointOpt {
  ratio: number;
}

export interface GearJointDef extends JointDef, GearJointOpt {
  joint1: RevoluteJoint | PrismaticJoint;
  joint2: RevoluteJoint | PrismaticJoint;
}

export function MotorJoint(def: MotorJointDef): MotorJoint;
export function MotorJoint(def: MotorJointOpt, bodyA: Body, bodyB: Body): MotorJoint;
export class MotorJoint extends Joint {
  static TYPE: 'motor-joint';

  constructor(def: MotorJointDef);
  constructor(def: MotorJointOpt, bodyA: Body, bodyB: Body);

  /** @internal */ m_type: 'motor-joint';
  /** @internal */ m_linearOffset: Vec2;
  /** @internal */ m_angularOffset: number;
  /** @internal */ m_linearImpulse: Vec2;
  /** @internal */ m_angularImpulse: number;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_maxTorque: number;
  /** @internal */ m_correctionFactor: number;
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

export interface MotorJointOpt extends JointOpt {
  maxForce: number;
  maxTorque: number;
  correctionFactor: number;
  linearOffset: Vec2;
}

export interface MotorJointDef extends JointDef, MotorJointOpt {
}

export function MouseJoint(def: MouseJointDef): MouseJoint;
export function MouseJoint(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;
export class MouseJoint extends Joint {
  static TYPE: 'mouse-joint';

  constructor(def: MouseJointDef);
  constructor(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2);

  /** @internal */ m_type: 'mouse-joint';
  /** @internal */ m_targetA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_maxForce: number;
  /** @internal */ m_impulse: Vec2;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_beta: number;
  /** @internal */ m_gamma: number;
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

export interface MouseJointOpt extends JointOpt {
  maxForce: number;
  frequencyHz: number;
  dampingRatio: number;
}

export interface MouseJointDef extends JointDef, MouseJointOpt {
  target: Vec2;
}

export function PrismaticJoint(def: PrismaticJointDef): PrismaticJoint;
export function PrismaticJoint(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;
export class PrismaticJoint extends Joint {
  static TYPE: 'prismatic-joint';

  constructor(def: PrismaticJointDef);
  constructor(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);

  /** @internal */ m_type: 'prismatic-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_localXAxisA: Vec2;
  /** @internal */ m_localYAxisA: Vec2;
  /** @internal */ m_referenceAngle: number;
  /** @internal */ m_impulse: Vec3;
  /** @internal */ m_motorMass: number;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_lowerTranslation: number;
  /** @internal */ m_upperTranslation: number;
  /** @internal */ m_maxMotorForce: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableLimit: boolean;
  /** @internal */ m_enableMotor: boolean;
  /** @internal */ m_limitState: LIMIT_STATE;
  /** @internal */ m_axis: Vec2;
  /** @internal */ m_perp: Vec2;
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

export interface PrismaticJointOpt extends JointOpt {
  enableLimit: boolean;
  lowerTranslation: number;
  upperTranslation: number;
  enableMotor: boolean;
  maxMotorForce: number;
  motorSpeed: number;
}

export interface PrismaticJointDef extends JointDef, PrismaticJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
  localAxisA: Vec2;
  referenceAngle: number;
}

export function PulleyJoint(def: PulleyJointDef): PulleyJoint;
export function PulleyJoint(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;
export class PulleyJoint extends Joint {
  static TYPE: 'pulley-joint';
  static MIN_PULLEY_LENGTH: number;

  constructor(def: PulleyJointDef);
  constructor(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number);

  /** @internal */ m_type: 'pulley-joint';
  /** @internal */ m_groundAnchorA: Vec2;
  /** @internal */ m_groundAnchorB: Vec2;
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_lengthA: Vec2;
  /** @internal */ m_lengthB: Vec2;
  /** @internal */ m_ratio: number;
  /** @internal */ m_constant: number;
  /** @internal */ m_impulse: number;
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

// tslint:disable-next-line:no-empty-interface
export interface PulleyJointOpt extends JointOpt {
}

export interface PulleyJointDef extends JointDef, PulleyJointOpt {
  groundAnchorA: Vec2;
  groundAnchorB: Vec2;
  localAnchorA: Vec2;
  localAnchorB: Vec2;
  lengthA: number;
  lengthB: number;
  ratio: number;
}

export function RevoluteJoint(def: RevoluteJointDef): RevoluteJoint;
export function RevoluteJoint(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;
export class RevoluteJoint extends Joint {
  static TYPE: 'revolute-joint';

  constructor(def: RevoluteJointDef);
  constructor(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);

  /** @internal */ m_type: 'revolute-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngle: number;
  /** @internal */ m_impulse: Vec3;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_lowerAngle: number;
  /** @internal */ m_upperAngle: number;
  /** @internal */ m_maxMotorTorque: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableLimit: boolean;
  /** @internal */ m_enableMotor: boolean;
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
  getMaxMotorTorque(): number;
  isLimitEnabled(): boolean;
  enableLimit(flag: boolean): void;
  getLowerLimit(): number;
  getUpperLimit(): number;
  setLimits(lower: number, upper: number): void;
}

export interface RevoluteJointOpt extends JointOpt {
  lowerAngle: number;
  upperAngle: number;
  maxMotorTorque: number;
  motorSpeed: number;
  enableLimit: boolean;
  enableMotor: boolean;
}

export interface RevoluteJointDef extends JointDef, RevoluteJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
  referenceAngle: number;
}

export function RopeJoint(def: RopeJointDef): RopeJoint;
export function RopeJoint(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;
export class RopeJoint extends Joint {
  static TYPE: 'rope-joint';

  constructor(def: RopeJointDef);
  constructor(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);

  /** @internal */ m_type: 'rope-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_maxLength: number;
  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_length: number;
  /** @internal */ m_state: LIMIT_STATE;

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

export interface RopeJointOpt extends JointOpt {
  maxLength: number;
}

export interface RopeJointDef extends JointDef, RopeJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
}

export function WeldJoint(def: WeldJointDef): WeldJoint;
export function WeldJoint(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;
export class WeldJoint extends Joint {
  static TYPE: 'weld-joint';

  constructor(def: WeldJointDef);
  constructor(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);

  /** @internal */ m_type: 'weld-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngle: number;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_impulse: Vec3;
  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;
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

export interface WeldJointOpt extends JointOpt {
  frequencyHz: number;
  dampingRatio: number;
  referenceAngle: number;
}

export interface WeldJointDef extends JointDef, WeldJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
  localAxisA: Vec2;
}

export function WheelJoint(def: WheelJointDef): WheelJoint;
export function WheelJoint(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): WheelJoint;
export class WheelJoint extends Joint {
  static TYPE: 'wheel-joint';

  constructor(def: WheelJointDef);
  constructor(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);

  /** @internal */ m_type: 'wheel-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_localXAxisA: Vec2;
  /** @internal */ m_localYAxisA: Vec2;
  /** @internal */ m_mass: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_motorMass: number;
  /** @internal */ m_motorImpulse: number;
  /** @internal */ m_springMass: number;
  /** @internal */ m_springImpulse: number;
  /** @internal */ m_maxMotorTorque: number;
  /** @internal */ m_motorSpeed: number;
  /** @internal */ m_enableMotor: boolean;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;
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

export interface WheelJointOpt extends JointOpt {
  enableMotor: boolean;
  maxMotorTorque: number;
  motorSpeed: number;
  frequencyHz: number;
  dampingRatio: number;
}

export interface WheelJointDef extends JointDef, WheelJointOpt {
  localAnchorA: Vec2;
  localAnchorB: Vec2;
  localAxisA: Vec2;
}
