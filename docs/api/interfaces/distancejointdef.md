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

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[dampingRatio](distancejointopt.md#optional-dampingratio)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[frequencyHz](distancejointopt.md#optional-frequencyhz)*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[length](distancejointopt.md#optional-length)*

Distance length.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyB's origin.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
