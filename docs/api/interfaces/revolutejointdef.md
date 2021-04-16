[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJointDef](revolutejointdef.md)

# Interface: RevoluteJointDef

Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.
Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [RevoluteJointOpt](revolutejointopt.md)

* JointDef

* RevoluteJointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:969](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L969)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:973](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L973)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[enableLimit](revolutejointopt.md#optional-enablelimit)*

*Overrides void*

*Defined in [dist/planck.d.ts:2656](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2656)*

A flag to enable joint limits.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[enableMotor](revolutejointopt.md#optional-enablemotor)*

*Overrides void*

*Defined in [dist/planck.d.ts:2660](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2660)*

A flag to enable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:2678](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2678)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:102](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L102)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:2682](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2682)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:106](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L106)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

### `Optional` lowerAngle

• **lowerAngle**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[lowerAngle](revolutejointopt.md#optional-lowerangle)*

*Overrides void*

*Defined in [dist/planck.d.ts:2639](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2639)*

The lower angle for the joint limit (radians).

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[maxMotorTorque](revolutejointopt.md#optional-maxmotortorque)*

*Overrides void*

*Defined in [dist/planck.d.ts:2648](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2648)*

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[motorSpeed](revolutejointopt.md#optional-motorspeed)*

*Overrides void*

*Defined in [dist/planck.d.ts:2652](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2652)*

The desired motor speed. Usually in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

*Defined in [dist/planck.d.ts:2686](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2686)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:110](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L110)*

The bodyB angle minus bodyA angle in the reference state (radians).
The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` upperAngle

• **upperAngle**? : *number*

*Inherited from [RevoluteJointOpt](revolutejointopt.md).[upperAngle](revolutejointopt.md#optional-upperangle)*

*Overrides void*

*Defined in [dist/planck.d.ts:2643](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2643)*

The upper angle for the joint limit (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
