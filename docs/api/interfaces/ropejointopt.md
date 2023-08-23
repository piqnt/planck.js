[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJointOpt](ropejointopt.md)

# Interface: RopeJointOpt

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **RopeJointOpt**

  ↳ [RopeJointDef](ropejointdef.md)

## Index

### Properties

* [collideConnected](ropejointopt.md#optional-collideconnected)
* [maxLength](ropejointopt.md#optional-maxlength)
* [userData](ropejointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Defined in [dynamics/joint/RopeJoint.ts:55](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RopeJoint.ts#L55)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
