[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJoint](pulleyjoint.md)

# Class: PulleyJoint

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant
The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

## Hierarchy

* any

* Joint

  ↳ **PulleyJoint**

## Callable

▸ **PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Defined in [dist/planck.d.ts:3347](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3347)*

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant
The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

▸ **PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Defined in [dist/planck.d.ts:3348](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3348)*

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant
The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](../interfaces/pulleyjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`groundA` | [Vec2](vec2.md) |
`groundB` | [Vec2](vec2.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

## Index

### Constructors

* [constructor](pulleyjoint.md#constructor)

### Properties

* [MIN_PULLEY_LENGTH](pulleyjoint.md#static-min_pulley_length)
* [TYPE](pulleyjoint.md#static-type)
* [TYPES](pulleyjoint.md#static-types)

### Methods

* [_serialize](pulleyjoint.md#_serialize)
* [getAnchorA](pulleyjoint.md#getanchora)
* [getAnchorB](pulleyjoint.md#getanchorb)
* [getBodyA](pulleyjoint.md#getbodya)
* [getBodyB](pulleyjoint.md#getbodyb)
* [getCollideConnected](pulleyjoint.md#getcollideconnected)
* [getCurrentLengthA](pulleyjoint.md#getcurrentlengtha)
* [getCurrentLengthB](pulleyjoint.md#getcurrentlengthb)
* [getGroundAnchorA](pulleyjoint.md#getgroundanchora)
* [getGroundAnchorB](pulleyjoint.md#getgroundanchorb)
* [getLengthA](pulleyjoint.md#getlengtha)
* [getLengthB](pulleyjoint.md#getlengthb)
* [getNext](pulleyjoint.md#getnext)
* [getRatio](pulleyjoint.md#getratio)
* [getReactionForce](pulleyjoint.md#getreactionforce)
* [getReactionTorque](pulleyjoint.md#getreactiontorque)
* [getType](pulleyjoint.md#gettype)
* [getUserData](pulleyjoint.md#getuserdata)
* [initVelocityConstraints](pulleyjoint.md#initvelocityconstraints)
* [isActive](pulleyjoint.md#isactive)
* [setUserData](pulleyjoint.md#setuserdata)
* [shiftOrigin](pulleyjoint.md#shiftorigin)
* [solvePositionConstraints](pulleyjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](pulleyjoint.md#solvevelocityconstraints)
* [_deserialize](pulleyjoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3362](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3362)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3364](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3364)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](../interfaces/pulleyjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`groundA` | [Vec2](vec2.md) |
`groundB` | [Vec2](vec2.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: PulleyJointDef): *[PulleyJoint](pulleyjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/PulleyJoint.ts:120](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | PulleyJointDef |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: PulleyJointOpt, `bodyA`: Body, `bodyB`: Body, `groundA`: Vec2, `groundB`: Vec2, `anchorA`: Vec2, `anchorB`: Vec2, `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/PulleyJoint.ts:122](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | PulleyJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`groundA` | Vec2 |
`groundB` | Vec2 |
`anchorA` | Vec2 |
`anchorB` | Vec2 |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

## Properties

### `Static` MIN_PULLEY_LENGTH

▪ **MIN_PULLEY_LENGTH**: *number* = 2

*Defined in [dist/planck.d.ts:3362](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3362)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:97](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L97)*

___

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"* = 'pulley-joint' as 'pulley-joint'

*Defined in [dist/planck.d.ts:3361](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3361)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:96](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PulleyJoint.ts#L96)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [dist/planck.d.ts:3366](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3366)*

**Returns:** *object*

* **bodyA**: *[Body](body.md)*

* **bodyB**: *[Body](body.md)*

* **collideConnected**: *boolean*

* **groundAnchorA**: *[Vec2](vec2.md)*

* **groundAnchorB**: *[Vec2](vec2.md)*

* **lengthA**: *number*

* **lengthB**: *number*

* **localAnchorA**: *[Vec2](vec2.md)*

* **localAnchorB**: *[Vec2](vec2.md)*

* **ratio**: *number*

* **type**: *"pulley-joint"*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3417](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3417)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3421](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3421)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:154](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L154)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:161](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L161)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:185](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L185)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [dist/planck.d.ts:3403](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3403)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [dist/planck.d.ts:3407](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3407)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3383](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3383)*

Get the first ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3387](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3387)*

Get the second ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [dist/planck.d.ts:3391](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3391)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [dist/planck.d.ts:3395](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3395)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:168](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L168)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [dist/planck.d.ts:3399](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3399)*

Get the pulley ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3425](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3425)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: any): *number*

*Overrides void*

*Defined in [dist/planck.d.ts:3429](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3429)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:147](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L147)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:172](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L172)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3430](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3430)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:140](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L140)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: any): *void*

*Overrides [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [dist/planck.d.ts:3413](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3413)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | any |   |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:3435](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3435)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3431](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3431)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[PulleyJoint](pulleyjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3379](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3379)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[PulleyJoint](pulleyjoint.md)*
