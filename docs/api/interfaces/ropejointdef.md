[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJointDef](ropejointdef.md)

# Interface: RopeJointDef

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [RopeJointOpt](ropejointopt.md)

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

*Defined in [src/dynamics/Joint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L78)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [src/dynamics/Joint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L82)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/RopeJoint.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L60)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/RopeJoint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L64)*

The local anchor point relative to bodyB's origin.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Inherited from [RopeJointOpt](ropejointopt.md).[maxLength](ropejointopt.md#optional-maxlength)*

*Defined in [src/dynamics/joint/RopeJoint.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L49)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
