[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJointOpt](pulleyjointopt.md)

# Interface: PulleyJointOpt

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.
Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

  ↳ **PulleyJointOpt**

  ↳ [PulleyJointDef](pulleyjointdef.md)

## Index

### Properties

* [collideConnected](pulleyjointopt.md#optional-collideconnected)
* [userData](pulleyjointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
