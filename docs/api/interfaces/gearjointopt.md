[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJointOpt](gearjointopt.md)

# Interface: GearJointOpt

Gear joint definition.
Gear joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` ratio

• **ratio**? : *number*

*Defined in [dist/planck.d.ts:2997](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2997)*

*Defined in [src/dynamics/joint/GearJoint.ts:48](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/GearJoint.ts#L48)*

The gear ratio. See GearJoint for explanation.
The gear ratio. See GearJoint for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
