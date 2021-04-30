[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJointOpt](distancejointopt.md)

# Interface: DistanceJointOpt

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

* [JointOpt](jointopt.md)

* JointOpt

  ↳ **DistanceJointOpt**

  ↳ [DistanceJointDef](distancejointdef.md)

## Index

### Properties

* [collideConnected](distancejointopt.md#optional-collideconnected)
* [dampingRatio](distancejointopt.md#optional-dampingratio)
* [frequencyHz](distancejointopt.md#optional-frequencyhz)
* [length](distancejointopt.md#optional-length)
* [userData](distancejointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [dist/planck.d.ts:2369](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2369)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:49](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L49)*

The damping ratio. 0 = no damping, 1 = critical damping.
The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [dist/planck.d.ts:2365](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2365)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:45](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L45)*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.
The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

*Defined in [dist/planck.d.ts:2373](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2373)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:53](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L53)*

Distance length.
Distance length.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
