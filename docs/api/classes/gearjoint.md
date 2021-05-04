[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJoint](gearjoint.md)

# Class: GearJoint

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

## Hierarchy

* [Joint](joint.md)

  ↳ **GearJoint**

## Index

### Constructors

* [constructor](gearjoint.md#constructor)

### Properties

* [TYPE](gearjoint.md#static-type)
* [TYPES](gearjoint.md#static-types)

### Methods

* [getAnchorA](gearjoint.md#getanchora)
* [getAnchorB](gearjoint.md#getanchorb)
* [getBodyA](gearjoint.md#getbodya)
* [getBodyB](gearjoint.md#getbodyb)
* [getCollideConnected](gearjoint.md#getcollideconnected)
* [getJoint1](gearjoint.md#getjoint1)
* [getJoint2](gearjoint.md#getjoint2)
* [getNext](gearjoint.md#getnext)
* [getRatio](gearjoint.md#getratio)
* [getReactionForce](gearjoint.md#getreactionforce)
* [getReactionTorque](gearjoint.md#getreactiontorque)
* [getType](gearjoint.md#gettype)
* [getUserData](gearjoint.md#getuserdata)
* [initVelocityConstraints](gearjoint.md#initvelocityconstraints)
* [isActive](gearjoint.md#isactive)
* [setRatio](gearjoint.md#setratio)
* [setUserData](gearjoint.md#setuserdata)
* [shiftOrigin](gearjoint.md#shiftorigin)
* [solvePositionConstraints](gearjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](gearjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/GearJoint.ts:121](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/GearJoint.ts:123](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](../interfaces/gearjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`joint1` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`joint2` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`ratio?` | number |

**Returns:** *[GearJoint](gearjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"gear-joint"* = 'gear-joint' as 'gear-joint'

*Defined in [dynamics/joint/GearJoint.ts:82](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L82)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Joint](joint.md).[TYPES](joint.md#static-types)*

*Defined in [dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [dynamics/joint/GearJoint.ts:307](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L307)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/GearJoint.ts:314](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L314)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJoint1

▸ **getJoint1**(): *[RevoluteJoint](revolutejoint.md)‹› | [PrismaticJoint](prismaticjoint.md)‹›*

*Defined in [dynamics/joint/GearJoint.ts:278](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L278)*

Get the first joint.

**Returns:** *[RevoluteJoint](revolutejoint.md)‹› | [PrismaticJoint](prismaticjoint.md)‹›*

___

###  getJoint2

▸ **getJoint2**(): *[RevoluteJoint](revolutejoint.md)‹› | [PrismaticJoint](prismaticjoint.md)‹›*

*Defined in [dynamics/joint/GearJoint.ts:285](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L285)*

Get the second joint.

**Returns:** *[RevoluteJoint](revolutejoint.md)‹› | [PrismaticJoint](prismaticjoint.md)‹›*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [dynamics/joint/GearJoint.ts:300](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L300)*

Get the gear ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [dynamics/joint/GearJoint.ts:321](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L321)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: any): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [dynamics/joint/GearJoint.ts:328](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L328)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [dynamics/joint/GearJoint.ts:333](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L333)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setRatio

▸ **setRatio**(`ratio`: any): *void*

*Defined in [dynamics/joint/GearJoint.ts:292](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L292)*

Set the gear ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L214)*

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

*Defined in [dynamics/joint/GearJoint.ts:470](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L470)*

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

*Defined in [dynamics/joint/GearJoint.ts:430](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/joint/GearJoint.ts#L430)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
