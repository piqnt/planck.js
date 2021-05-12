[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJointOpt](pulleyjointopt.md)

# Interface: PulleyJointOpt

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

* [JointOpt](jointopt.md)

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

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
