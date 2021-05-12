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

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L49)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
