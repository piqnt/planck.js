[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJointDef](distancejointdef.md)

# Interface: DistanceJointDef

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.
Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [DistanceJointOpt](distancejointopt.md)

* JointDef

* DistanceJointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[dampingRatio](distancejointopt.md#optional-dampingratio)*

*Overrides void*

*Defined in [dist/planck.d.ts:2369](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2369)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[frequencyHz](distancejointopt.md#optional-frequencyhz)*

*Overrides void*

*Defined in [dist/planck.d.ts:2365](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2365)*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

*Inherited from [DistanceJointOpt](distancejointopt.md).[length](distancejointopt.md#optional-length)*

*Overrides void*

*Defined in [dist/planck.d.ts:2373](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2373)*

Distance length.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:2386](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2386)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:66](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/DistanceJoint.ts#L66)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:2390](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2390)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:70](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/DistanceJoint.ts#L70)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
