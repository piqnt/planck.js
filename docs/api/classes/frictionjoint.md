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

*Defined in [dist/planck.d.ts:2552](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2552)*

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

*Defined in [dist/planck.d.ts:2553](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2553)*

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

* [_serialize](frictionjoint.md#_serialize)
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
* [_deserialize](frictionjoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2561](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2561)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2563](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2563)*

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:99](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/FrictionJoint.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | FrictionJointDef |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: FrictionJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/FrictionJoint.ts:101](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/FrictionJoint.ts#L101)*

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

*Defined in [dist/planck.d.ts:2561](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2561)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:78](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/FrictionJoint.ts#L78)*

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

*Defined in [dist/planck.d.ts:2565](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2565)*

**Returns:** *object*

* **bodyA**: *[Body](body.md)*

* **bodyB**: *[Body](body.md)*

* **collideConnected**: *boolean*

* **localAnchorA**: *[Vec2](vec2.md)*

* **localAnchorB**: *[Vec2](vec2.md)*

* **maxForce**: *number*

* **maxTorque**: *number*

* **type**: *"friction-joint"*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2603](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2603)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2607](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2607)*

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

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2579](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2579)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2583](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2583)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [dist/planck.d.ts:2591](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2591)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [dist/planck.d.ts:2599](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2599)*

Get the maximum friction torque in N*m.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:168](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L168)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2611](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2611)*

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

*Defined in [dist/planck.d.ts:2615](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2615)*

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

*Defined in [dist/planck.d.ts:2616](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2616)*

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

###  setMaxForce

▸ **setMaxForce**(`force`: any): *void*

*Defined in [dist/planck.d.ts:2587](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2587)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: any): *void*

*Defined in [dist/planck.d.ts:2595](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2595)*

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

*Defined in [dist/planck.d.ts:2621](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2621)*

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

*Defined in [dist/planck.d.ts:2617](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2617)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[FrictionJoint](frictionjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2575](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2575)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[FrictionJoint](frictionjoint.md)*
