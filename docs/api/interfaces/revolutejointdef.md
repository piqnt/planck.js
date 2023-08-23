[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJointDef](revolutejointdef.md)

# Interface: RevoluteJointDef

Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [RevoluteJointOpt](revolutejointopt.md)

  ↳ **RevoluteJointDef**

## Index

### Properties

* [bodyA](revolutejointdef.md#bodya)
* [bodyB](revolutejointdef.md#bodyb)
* [collideConnected](revolutejointdef.md#optional-collideconnected)
* [enableLimit](revolutejointdef.md#optional-enablelimit)
* [enableMotor](revolutejointdef.md#optional-enablemotor)
* [localAnchorA](revolutejointdef.md#localanchora)
* [localAnchorB](revolutejointdef.md#localanchorb)
* [lowerAngle](revolutejointdef.md#optional-lowerangle)
* [maxMotorTorque](revolutejointdef.md#optional-maxmotortorque)
* [motorSpeed](revolutejointdef.md#optional-motorspeed)
* [referenceAngle](revolutejointdef.md#referenceangle)
* [upperAngle](revolutejointdef.md#optional-upperangle)
* [userData](revolutejointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Defined in [dynamics/Joint.ts:77](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L77)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [dynamics/Joint.ts:81](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L81)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[enableLimit](revolutejointopt.md#optional-enablelimit)*

*Defined in [dynamics/joint/RevoluteJoint.ts:83](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L83)*

A flag to enable joint limits.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[enableMotor](revolutejointopt.md#optional-enablemotor)*

*Defined in [dynamics/joint/RevoluteJoint.ts:87](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L87)*

A flag to enable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/RevoluteJoint.ts:106](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L106)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/RevoluteJoint.ts:110](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L110)*

The local anchor point relative to bodyB's origin.

___

### `Optional` lowerAngle

• **lowerAngle**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[lowerAngle](revolutejointopt.md#optional-lowerangle)*

*Defined in [dynamics/joint/RevoluteJoint.ts:66](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L66)*

The lower angle for the joint limit (radians).

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[maxMotorTorque](revolutejointopt.md#optional-maxmotortorque)*

*Defined in [dynamics/joint/RevoluteJoint.ts:75](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L75)*

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[motorSpeed](revolutejointopt.md#optional-motorspeed)*

*Defined in [dynamics/joint/RevoluteJoint.ts:79](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L79)*

The desired motor speed. Usually in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:114](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L114)*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` upperAngle

• **upperAngle**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[upperAngle](revolutejointopt.md#optional-upperangle)*

*Defined in [dynamics/joint/RevoluteJoint.ts:70](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L70)*

The upper angle for the joint limit (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
