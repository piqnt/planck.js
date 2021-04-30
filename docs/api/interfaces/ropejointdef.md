[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJointDef](ropejointdef.md)

# Interface: RopeJointDef

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.
Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [RopeJointOpt](ropejointopt.md)

* JointDef

* RopeJointOpt

  ↳ **RopeJointDef**

## Index

### Properties

* [bodyA](ropejointdef.md#bodya)
* [bodyB](ropejointdef.md#bodyb)
* [collideConnected](ropejointdef.md#optional-collideconnected)
* [localAnchorA](ropejointdef.md#localanchora)
* [localAnchorB](ropejointdef.md#localanchorb)
* [maxLength](ropejointdef.md#optional-maxlength)
* [userData](ropejointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:3303](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3303)*

*Defined in [src/dynamics/joint/RopeJoint.ts:60](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RopeJoint.ts#L60)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:3307](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3307)*

*Defined in [src/dynamics/joint/RopeJoint.ts:64](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RopeJoint.ts#L64)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Inherited from [RopeJointOpt](ropejointopt.md).[maxLength](ropejointopt.md#optional-maxlength)*

*Overrides void*

*Defined in [dist/planck.d.ts:3292](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3292)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
