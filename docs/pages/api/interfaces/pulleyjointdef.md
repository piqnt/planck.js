---
showOutline: false
---

# Interface: PulleyJointDef

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [PulleyJointOpt](/api/interfaces/pulleyjointopt)

  ↳ **PulleyJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/pulleyjointdef#bodya)
* [bodyB](/api/interfaces/pulleyjointdef#bodyb)
* [collideConnected](/api/interfaces/pulleyjointdef#optional-collideconnected)
* [groundAnchorA](/api/interfaces/pulleyjointdef#groundanchora)
* [groundAnchorB](/api/interfaces/pulleyjointdef#groundanchorb)
* [lengthA](/api/interfaces/pulleyjointdef#lengtha)
* [lengthB](/api/interfaces/pulleyjointdef#lengthb)
* [localAnchorA](/api/interfaces/pulleyjointdef#localanchora)
* [localAnchorB](/api/interfaces/pulleyjointdef#localanchorb)
* [ratio](/api/interfaces/pulleyjointdef#ratio)
* [userData](/api/interfaces/pulleyjointdef#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyA](/api/interfaces/jointdef#bodya)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyB](/api/interfaces/jointdef#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

*Overrides [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

###  groundAnchorA

• **groundAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The first ground anchor in world coordinates. This point never moves.

___

###  groundAnchorB

• **groundAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

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

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

###  ratio

• **ratio**: *number*

The pulley ratio, used to simulate a block-and-tackle.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
