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

###  groundAnchorA

• **groundAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L54)*

The first ground anchor in world coordinates. This point never moves.

___

###  groundAnchorB

• **groundAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:58](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L58)*

The second ground anchor in world coordinates. This point never moves.

___

###  lengthA

• **lengthA**: *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:70](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L70)*

The reference length for the segment attached to bodyA.

___

###  lengthB

• **lengthB**: *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:74](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L74)*

The reference length for the segment attached to bodyB.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:62](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L62)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:66](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L66)*

The local anchor point relative to bodyB's origin.

___

###  ratio

• **ratio**: *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L78)*

The pulley ratio, used to simulate a block-and-tackle.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
