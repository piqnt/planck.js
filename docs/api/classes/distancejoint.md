[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJoint](distancejoint.md)

# Class: DistanceJoint

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.
A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

## Hierarchy

* any

* Joint

  ↳ **DistanceJoint**

## Callable

▸ **DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [dist/planck.d.ts:2392](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2392)*

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.
A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

▸ **DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [dist/planck.d.ts:2393](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2393)*

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.
A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](../interfaces/distancejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2402](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2402)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2403](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2403)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](../interfaces/distancejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: DistanceJointDef): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:108](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | DistanceJointDef |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: DistanceJointOpt, `bodyA`: Body, `bodyB`: Body, `anchorA`: Vec2, `anchorB`: Vec2): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:110](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | DistanceJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchorA` | Vec2 |
`anchorB` | Vec2 |

**Returns:** *[DistanceJoint](distancejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"distance-joint"* = 'distance-joint' as 'distance-joint'

*Defined in [dist/planck.d.ts:2402](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2402)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:86](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/DistanceJoint.ts#L86)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2429](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2429)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2433](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2433)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [dist/planck.d.ts:2425](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2425)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [dist/planck.d.ts:2423](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2423)*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

*Defined in [dist/planck.d.ts:2421](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2421)*

Get the natural length.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2408](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2408)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2412](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2412)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2437](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2437)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides void*

*Defined in [dist/planck.d.ts:2441](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2441)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2442](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2442)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [dist/planck.d.ts:2424](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2424)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [dist/planck.d.ts:2422](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2422)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

*Defined in [dist/planck.d.ts:2417](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2417)*

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

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L214)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2447](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2447)*

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

*Defined in [dist/planck.d.ts:2443](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2443)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
