[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJointDef](pulleyjointdef.md)

# Interface: PulleyJointDef

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [PulleyJointOpt](pulleyjointopt.md)

  ↳ **PulleyJointDef**

## Index

### Properties

* [bodyA](pulleyjointdef.md#bodya)
* [bodyB](pulleyjointdef.md#bodyb)
* [collideConnected](pulleyjointdef.md#optional-collideconnected)
* [groundAnchorA](pulleyjointdef.md#groundanchora)
* [groundAnchorB](pulleyjointdef.md#groundanchorb)
* [lengthA](pulleyjointdef.md#lengtha)
* [lengthB](pulleyjointdef.md#lengthb)
* [localAnchorA](pulleyjointdef.md#localanchora)
* [localAnchorB](pulleyjointdef.md#localanchorb)
* [ratio](pulleyjointdef.md#ratio)
* [userData](pulleyjointdef.md#optional-userdata)

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

###  groundAnchorA

• **groundAnchorA**: *[Vec2Value](vec2value.md)*

The first ground anchor in world coordinates. This point never moves.

___

###  groundAnchorB

• **groundAnchorB**: *[Vec2Value](vec2value.md)*

The second ground anchor in world coordinates. This point never moves.

___

###  lengthA

• **lengthA**: *number*

The reference length for the segment attached to bodyA.

___

###  lengthB

• **lengthB**: *number*

The reference length for the segment attached to bodyB.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyB's origin.

___

###  ratio

• **ratio**: *number*

The pulley ratio, used to simulate a block-and-tackle.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
