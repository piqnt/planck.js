[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJoint](motorjoint.md)

# Class: MotorJoint

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.
A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

## Hierarchy

* any

* Joint

  ↳ **MotorJoint**

## Callable

▸ **MotorJoint**(`def`: [MotorJointDef](../interfaces/motorjointdef.md)): *[MotorJoint](motorjoint.md)*

*Defined in [dist/planck.d.ts:2980](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2980)*

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.
A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

▸ **MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Defined in [dist/planck.d.ts:2981](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2981)*

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.
A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](../interfaces/motorjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

## Index

### Constructors

* [constructor](motorjoint.md#constructor)

### Properties

* [TYPE](motorjoint.md#static-type)
* [TYPES](motorjoint.md#static-types)

### Methods

* [getAnchorA](motorjoint.md#getanchora)
* [getAnchorB](motorjoint.md#getanchorb)
* [getAngularOffset](motorjoint.md#getangularoffset)
* [getBodyA](motorjoint.md#getbodya)
* [getBodyB](motorjoint.md#getbodyb)
* [getCollideConnected](motorjoint.md#getcollideconnected)
* [getCorrectionFactor](motorjoint.md#getcorrectionfactor)
* [getLinearOffset](motorjoint.md#getlinearoffset)
* [getMaxForce](motorjoint.md#getmaxforce)
* [getMaxTorque](motorjoint.md#getmaxtorque)
* [getNext](motorjoint.md#getnext)
* [getReactionForce](motorjoint.md#getreactionforce)
* [getReactionTorque](motorjoint.md#getreactiontorque)
* [getType](motorjoint.md#gettype)
* [getUserData](motorjoint.md#getuserdata)
* [initVelocityConstraints](motorjoint.md#initvelocityconstraints)
* [isActive](motorjoint.md#isactive)
* [setAngularOffset](motorjoint.md#setangularoffset)
* [setCorrectionFactor](motorjoint.md#setcorrectionfactor)
* [setLinearOffset](motorjoint.md#setlinearoffset)
* [setMaxForce](motorjoint.md#setmaxforce)
* [setMaxTorque](motorjoint.md#setmaxtorque)
* [setUserData](motorjoint.md#setuserdata)
* [shiftOrigin](motorjoint.md#shiftorigin)
* [solvePositionConstraints](motorjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](motorjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new MotorJoint**(`def`: [MotorJointDef](../interfaces/motorjointdef.md)): *[MotorJoint](motorjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2988](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2988)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

\+ **new MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2990](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2990)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](../interfaces/motorjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

\+ **new MotorJoint**(`def`: MotorJointDef): *[MotorJoint](motorjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/MotorJoint.ts:104](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | MotorJointDef |

**Returns:** *[MotorJoint](motorjoint.md)*

\+ **new MotorJoint**(`def`: MotorJointOpt, `bodyA`: Body, `bodyB`: Body): *[MotorJoint](motorjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/MotorJoint.ts:106](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | MotorJointOpt |
`bodyA` | Body |
`bodyB` | Body |

**Returns:** *[MotorJoint](motorjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"motor-joint"* = 'motor-joint' as 'motor-joint'

*Defined in [dist/planck.d.ts:2988](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2988)*

*Defined in [src/dynamics/joint/MotorJoint.ts:82](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L82)*

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

*Defined in [dist/planck.d.ts:3029](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3029)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3033](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3033)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAngularOffset

▸ **getAngularOffset**(): *number*

*Defined in [dist/planck.d.ts:3025](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3025)*

**Returns:** *number*

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

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

*Defined in [dist/planck.d.ts:3015](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3015)*

Get the position correction factor in the range [0,1].

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3020](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3020)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [dist/planck.d.ts:2999](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2999)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [dist/planck.d.ts:3007](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3007)*

Get the maximum friction torque in N*m.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3037](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3037)*

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

*Defined in [dist/planck.d.ts:3041](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3041)*

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

*Defined in [dist/planck.d.ts:3042](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3042)*

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

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: any): *void*

*Defined in [dist/planck.d.ts:3024](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3024)*

Set/get the target angular offset, in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | any |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: any): *void*

*Defined in [dist/planck.d.ts:3011](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3011)*

Set the position correction factor in the range [0,1].

**Parameters:**

Name | Type |
------ | ------ |
`factor` | any |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: any): *void*

*Defined in [dist/planck.d.ts:3019](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3019)*

Set/get the target linear offset, in frame A, in meters.

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | any |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: any): *void*

*Defined in [dist/planck.d.ts:2995](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2995)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: any): *void*

*Defined in [dist/planck.d.ts:3003](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3003)*

Set the maximum friction torque in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | any |

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

*Defined in [dist/planck.d.ts:3047](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3047)*

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

*Defined in [dist/planck.d.ts:3043](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3043)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
