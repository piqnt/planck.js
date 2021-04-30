[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJoint](gearjoint.md)

# Class: GearJoint

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant
A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

## Hierarchy

* any

* Joint

  ↳ **GearJoint**

## Callable

▸ **GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Defined in [dist/planck.d.ts:2891](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2891)*

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant
A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

▸ **GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Defined in [dist/planck.d.ts:2892](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2892)*

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant
A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

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

*Overrides void*

*Defined in [dist/planck.d.ts:2907](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2907)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2909](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2909)*

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

\+ **new GearJoint**(`def`: GearJointDef): *[GearJoint](gearjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/GearJoint.ts:121](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/GearJoint.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | GearJointDef |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: GearJointOpt, `bodyA`: Body, `bodyB`: Body, `joint1`: RevoluteJoint | PrismaticJoint, `joint2`: RevoluteJoint | PrismaticJoint, `ratio?`: number): *[GearJoint](gearjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/GearJoint.ts:123](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/GearJoint.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | GearJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`joint1` | RevoluteJoint &#124; PrismaticJoint |
`joint2` | RevoluteJoint &#124; PrismaticJoint |
`ratio?` | number |

**Returns:** *[GearJoint](gearjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"gear-joint"* = 'gear-joint' as 'gear-joint'

*Defined in [dist/planck.d.ts:2907](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2907)*

*Defined in [src/dynamics/joint/GearJoint.ts:82](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/GearJoint.ts#L82)*

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

*Defined in [dist/planck.d.ts:2930](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2930)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2934](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2934)*

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

###  getJoint1

▸ **getJoint1**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [dist/planck.d.ts:2914](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2914)*

Get the first joint.

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getJoint2

▸ **getJoint2**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [dist/planck.d.ts:2918](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2918)*

Get the second joint.

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [dist/planck.d.ts:2926](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2926)*

Get the gear ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2938)*

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

*Defined in [dist/planck.d.ts:2942](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2942)*

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

*Defined in [dist/planck.d.ts:2943](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2943)*

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

###  setRatio

▸ **setRatio**(`ratio`: any): *void*

*Defined in [dist/planck.d.ts:2922](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2922)*

Set the gear ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | any |

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

*Defined in [dist/planck.d.ts:2948](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2948)*

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

*Defined in [dist/planck.d.ts:2944](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2944)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
