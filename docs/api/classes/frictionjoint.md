[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJoint](frictionjoint.md)

# Class: FrictionJoint

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.
Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

## Hierarchy

* any

* Joint

  ↳ **FrictionJoint**

## Callable

▸ **FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [dist/planck.d.ts:2475](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2475)*

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.
Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

▸ **FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [dist/planck.d.ts:2476](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2476)*

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.
Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](../interfaces/frictionjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

## Index

### Constructors

* [constructor](frictionjoint.md#constructor)

### Properties

* [TYPE](frictionjoint.md#static-type)
* [TYPES](frictionjoint.md#static-types)

### Methods

* [getAnchorA](frictionjoint.md#getanchora)
* [getAnchorB](frictionjoint.md#getanchorb)
* [getBodyA](frictionjoint.md#getbodya)
* [getBodyB](frictionjoint.md#getbodyb)
* [getCollideConnected](frictionjoint.md#getcollideconnected)
* [getLocalAnchorA](frictionjoint.md#getlocalanchora)
* [getLocalAnchorB](frictionjoint.md#getlocalanchorb)
* [getMaxForce](frictionjoint.md#getmaxforce)
* [getMaxTorque](frictionjoint.md#getmaxtorque)
* [getNext](frictionjoint.md#getnext)
* [getReactionForce](frictionjoint.md#getreactionforce)
* [getReactionTorque](frictionjoint.md#getreactiontorque)
* [getType](frictionjoint.md#gettype)
* [getUserData](frictionjoint.md#getuserdata)
* [initVelocityConstraints](frictionjoint.md#initvelocityconstraints)
* [isActive](frictionjoint.md#isactive)
* [setMaxForce](frictionjoint.md#setmaxforce)
* [setMaxTorque](frictionjoint.md#setmaxtorque)
* [setUserData](frictionjoint.md#setuserdata)
* [shiftOrigin](frictionjoint.md#shiftorigin)
* [solvePositionConstraints](frictionjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](frictionjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2484](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2484)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2486](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2486)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](../interfaces/frictionjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: FrictionJointDef): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/FrictionJoint.ts:99](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/FrictionJoint.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | FrictionJointDef |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: FrictionJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/FrictionJoint.ts:101](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/FrictionJoint.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | FrictionJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchor` | Vec2 |

**Returns:** *[FrictionJoint](frictionjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"friction-joint"* = 'friction-joint' as 'friction-joint'

*Defined in [dist/planck.d.ts:2484](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2484)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:78](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/FrictionJoint.ts#L78)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2515](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2515)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2519](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2519)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2491](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2491)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2495](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2495)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [dist/planck.d.ts:2503](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2503)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [dist/planck.d.ts:2511](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2511)*

Get the maximum friction torque in N*m.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2523](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2523)*

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

*Defined in [dist/planck.d.ts:2527](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2527)*

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

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2528](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2528)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setMaxForce

▸ **setMaxForce**(`force`: any): *void*

*Defined in [dist/planck.d.ts:2499](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2499)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: any): *void*

*Defined in [dist/planck.d.ts:2507](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2507)*

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

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L214)*

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

*Defined in [dist/planck.d.ts:2533](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2533)*

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

*Defined in [dist/planck.d.ts:2529](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2529)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
