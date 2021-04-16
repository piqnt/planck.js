[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJointDef](pulleyjointdef.md)

# Interface: PulleyJointDef

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.
Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [PulleyJointOpt](pulleyjointopt.md)

* JointDef

* PulleyJointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:969](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L969)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:973](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L973)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

###  groundAnchorA

• **groundAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:3321](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3321)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:53](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L53)*

The first ground anchor in world coordinates. This point never moves.
The first ground anchor in world coordinates. This point never moves.

___

###  groundAnchorB

• **groundAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:3325](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3325)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:57](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L57)*

The second ground anchor in world coordinates. This point never moves.
The second ground anchor in world coordinates. This point never moves.

___

###  lengthA

• **lengthA**: *number*

*Defined in [dist/planck.d.ts:3337](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3337)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:69](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L69)*

The reference length for the segment attached to bodyA.
The reference length for the segment attached to bodyA.

___

###  lengthB

• **lengthB**: *number*

*Defined in [dist/planck.d.ts:3341](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3341)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:73](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L73)*

The reference length for the segment attached to bodyB.
The reference length for the segment attached to bodyB.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:3329](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3329)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:61](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L61)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:3333](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3333)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:65](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L65)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

###  ratio

• **ratio**: *number*

*Defined in [dist/planck.d.ts:3345](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3345)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:77](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L77)*

The pulley ratio, used to simulate a block-and-tackle.
The pulley ratio, used to simulate a block-and-tackle.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
