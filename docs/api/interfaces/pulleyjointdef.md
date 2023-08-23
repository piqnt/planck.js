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

*Defined in [dynamics/Joint.ts:77](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L77)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [dynamics/Joint.ts:81](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L81)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

###  groundAnchorA

• **groundAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:55](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L55)*

The first ground anchor in world coordinates. This point never moves.

___

###  groundAnchorB

• **groundAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:59](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L59)*

The second ground anchor in world coordinates. This point never moves.

___

###  lengthA

• **lengthA**: *number*

*Defined in [dynamics/joint/PulleyJoint.ts:71](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L71)*

The reference length for the segment attached to bodyA.

___

###  lengthB

• **lengthB**: *number*

*Defined in [dynamics/joint/PulleyJoint.ts:75](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L75)*

The reference length for the segment attached to bodyB.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L63)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:67](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L67)*

The local anchor point relative to bodyB's origin.

___

###  ratio

• **ratio**: *number*

*Defined in [dynamics/joint/PulleyJoint.ts:79](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L79)*

The pulley ratio, used to simulate a block-and-tackle.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
