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

*Defined in [dist/planck.d.ts:2454](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2454)*

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

*Defined in [dist/planck.d.ts:2455](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2455)*

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

* [_serialize](distancejoint.md#_serialize)
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
* [_deserialize](distancejoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2464](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2464)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2465](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2465)*

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

*Defined in [src/dynamics/joint/DistanceJoint.ts:108](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/DistanceJoint.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | DistanceJointDef |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: DistanceJointOpt, `bodyA`: Body, `bodyB`: Body, `anchorA`: Vec2, `anchorB`: Vec2): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/DistanceJoint.ts:110](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/DistanceJoint.ts#L110)*

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

*Defined in [dist/planck.d.ts:2464](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2464)*

*Defined in [src/dynamics/joint/DistanceJoint.ts:86](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/DistanceJoint.ts#L86)*

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

*Defined in [dist/planck.d.ts:2467](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2467)*

**Returns:** *object*

* **bias**: *number*

* **bodyA**: *[Body](body.md)*

* **bodyB**: *[Body](body.md)*

* **collideConnected**: *boolean*

* **dampingRatio**: *number*

* **frequencyHz**: *number*

* **gamma**: *number*

* **impulse**: *number*

* **length**: *number*

* **localAnchorA**: *[Vec2](vec2.md)*

* **localAnchorB**: *[Vec2](vec2.md)*

* **type**: *string*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2506](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2506)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2510](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2510)*

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

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [dist/planck.d.ts:2502](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2502)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [dist/planck.d.ts:2500](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2500)*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

*Defined in [dist/planck.d.ts:2498](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2498)*

Get the natural length.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2485](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2485)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2489](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2489)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:168](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L168)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2514](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2514)*

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

*Defined in [dist/planck.d.ts:2518](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2518)*

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

*Defined in [dist/planck.d.ts:2519](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2519)*

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

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [dist/planck.d.ts:2501](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2501)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [dist/planck.d.ts:2499](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2499)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

*Defined in [dist/planck.d.ts:2494](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2494)*

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

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:212](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L212)*

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

*Defined in [dist/planck.d.ts:2524](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2524)*

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

*Defined in [dist/planck.d.ts:2520](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2520)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[DistanceJoint](distancejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2481](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2481)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[DistanceJoint](distancejoint.md)*
