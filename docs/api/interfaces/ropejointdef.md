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

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyB's origin.

___

### `Optional` maxLength

• **maxLength**? : *number*

*Inherited from [RopeJointOpt](ropejointopt.md).[maxLength](ropejointopt.md#optional-maxlength)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
