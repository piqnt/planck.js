[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJointOpt](gearjointopt.md)

# Interface: GearJointOpt

Gear joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **GearJointOpt**

  ↳ [GearJointDef](gearjointdef.md)

## Index

### Properties

* [collideConnected](gearjointopt.md#optional-collideconnected)
* [ratio](gearjointopt.md#optional-ratio)
* [userData](gearjointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` ratio

• **ratio**? : *number*

*Defined in [src/dynamics/joint/GearJoint.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L48)*

The gear ratio. See [GearJoint](../classes/gearjoint.md) for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
