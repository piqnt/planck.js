[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJointOpt](ropejointopt.md)

# Interface: RopeJointOpt

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.
Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Defined in [dist/planck.d.ts:3447](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3447)*

*Defined in [src/dynamics/joint/RopeJoint.ts:49](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RopeJoint.ts#L49)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.
The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
