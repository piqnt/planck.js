[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJoint](distancejoint.md)

# Class: DistanceJoint

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

**`param`** Anchor A in global coordination.

**`param`** Anchor B in global coordination.

## Hierarchy

* [Joint](joint.md)

  ↳ **DistanceJoint**

## Index

### Constructors

* [constructor](distancejoint.md#constructor)

### Properties

* [TYPE](distancejoint.md#static-type)
* [TYPES](distancejoint.md#static-types)

### Methods

* [getAnchorA](distancejoint.md#getanchora)
* [getAnchorB](distancejoint.md#getanchorb)
* [getBodyA](distancejoint.md#getbodya)
* [getBodyB](distancejoint.md#getbodyb)
* [getCollideConnected](distancejoint.md#getcollideconnected)
* [getDampingRatio](distancejoint.md#getdampingratio)
* [getFrequency](distancejoint.md#getfrequency)
* [getLength](distancejoint.md#getlength)
* [getLocalAnchorA](distancejoint.md#getlocalanchora)
* [getLocalAnchorB](distancejoint.md#getlocalanchorb)
* [getNext](distancejoint.md#getnext)
* [getReactionForce](distancejoint.md#getreactionforce)
* [getReactionTorque](distancejoint.md#getreactiontorque)
* [getType](distancejoint.md#gettype)
* [getUserData](distancejoint.md#getuserdata)
* [initVelocityConstraints](distancejoint.md#initvelocityconstraints)
* [isActive](distancejoint.md#isactive)
* [setDampingRatio](distancejoint.md#setdampingratio)
* [setFrequency](distancejoint.md#setfrequency)
* [setLength](distancejoint.md#setlength)
* [setUserData](distancejoint.md#setuserdata)
* [shiftOrigin](distancejoint.md#shiftorigin)
* [solvePositionConstraints](distancejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](distancejoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:108](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:110](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](../interfaces/distancejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"distance-joint"* = 'distance-joint' as 'distance-joint'

*Defined in [src/dynamics/joint/DistanceJoint.ts:86](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L86)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Joint](joint.md).[TYPES](joint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:274](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L274)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:281](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L281)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [src/dynamics/joint/DistanceJoint.ts:267](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L267)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [src/dynamics/joint/DistanceJoint.ts:259](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L259)*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

*Defined in [src/dynamics/joint/DistanceJoint.ts:251](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L251)*

Get the natural length.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/DistanceJoint.ts:229](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L229)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/DistanceJoint.ts:236](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L236)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:288](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L288)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:295](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L295)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:299](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L299)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:263](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:255](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L255)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:244](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L244)*

Set the natural length. Manipulating the length can lead to non-physical
behavior when the frequency is zero.

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L214)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:417](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L417)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[solveVelocityConstraints](joint.md#abstract-solvevelocityconstraints)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:387](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/DistanceJoint.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
