[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJointDef](distancejointdef.md)

# Interface: DistanceJointDef

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [DistanceJointOpt](distancejointopt.md)

  ↳ **DistanceJointDef**

## Index

### Properties

* [bodyA](distancejointdef.md#bodya)
* [bodyB](distancejointdef.md#bodyb)
* [collideConnected](distancejointdef.md#optional-collideconnected)
* [dampingRatio](distancejointdef.md#optional-dampingratio)
* [frequencyHz](distancejointdef.md#optional-frequencyhz)
* [length](distancejointdef.md#optional-length)
* [localAnchorA](distancejointdef.md#localanchora)
* [localAnchorB](distancejointdef.md#localanchorb)
* [userData](distancejointdef.md#optional-userdata)

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

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[dampingRatio](distancejointopt.md#optional-dampingratio)*

*Defined in [dynamics/joint/DistanceJoint.ts:55](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/DistanceJoint.ts#L55)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[frequencyHz](distancejointopt.md#optional-frequencyhz)*

*Defined in [dynamics/joint/DistanceJoint.ts:51](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/DistanceJoint.ts#L51)*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[length](distancejointopt.md#optional-length)*

*Defined in [dynamics/joint/DistanceJoint.ts:59](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/DistanceJoint.ts#L59)*

Distance length.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/DistanceJoint.ts:72](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/DistanceJoint.ts#L72)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/DistanceJoint.ts:76](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/DistanceJoint.ts#L76)*

The local anchor point relative to bodyB's origin.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
