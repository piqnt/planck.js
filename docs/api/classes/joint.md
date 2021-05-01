[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Joint](joint.md)

# Class: Joint

The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.
The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.

## Hierarchy

* **Joint**

## Index

### Constructors

* [constructor](joint.md#constructor)

### Properties

* [TYPES](joint.md#static-types)

### Methods

* [getAnchorA](joint.md#abstract-getanchora)
* [getAnchorB](joint.md#abstract-getanchorb)
* [getBodyA](joint.md#getbodya)
* [getBodyB](joint.md#getbodyb)
* [getCollideConnected](joint.md#getcollideconnected)
* [getNext](joint.md#getnext)
* [getReactionForce](joint.md#abstract-getreactionforce)
* [getReactionTorque](joint.md#abstract-getreactiontorque)
* [getType](joint.md#gettype)
* [getUserData](joint.md#getuserdata)
* [initVelocityConstraints](joint.md#abstract-initvelocityconstraints)
* [isActive](joint.md#isactive)
* [setUserData](joint.md#setuserdata)
* [shiftOrigin](joint.md#shiftorigin)
* [solvePositionConstraints](joint.md#abstract-solvepositionconstraints)
* [solveVelocityConstraints](joint.md#abstract-solvevelocityconstraints)

## Constructors

###  constructor

\+ **new Joint**(`def`: [JointDef](../interfaces/jointdef.md)): *[Joint](joint.md)*

*Defined in [dist/planck.d.ts:957](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L957)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointDef](../interfaces/jointdef.md) |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: [JointOpt](../interfaces/jointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[Joint](joint.md)*

*Defined in [dist/planck.d.ts:958](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L958)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointOpt](../interfaces/jointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: JointDef): *[Joint](joint.md)*

*Defined in [src/dynamics/Joint.ts:109](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | JointDef |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: JointOpt, `bodyA`: Body, `bodyB`: Body): *[Joint](joint.md)*

*Defined in [src/dynamics/Joint.ts:111](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | JointOpt |
`bodyA` | Body |
`bodyB` | Body |

**Returns:** *[Joint](joint.md)*

## Properties

### `Static` TYPES

▪ **TYPES**: *object*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L960)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

### `Abstract` getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:994](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L994)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

▸ **getAnchorA**(): *Vec2*

*Defined in [src/dynamics/Joint.ts:194](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L194)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

### `Abstract` getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:998](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L998)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

▸ **getAnchorB**(): *Vec2*

*Defined in [src/dynamics/Joint.ts:199](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L199)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:974](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L974)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:978](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L978)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Defined in [dist/planck.d.ts:990](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L990)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Defined in [dist/planck.d.ts:982](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L982)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

### `Abstract` getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1002](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1002)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Defined in [src/dynamics/Joint.ts:204](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L204)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

___

### `Abstract` getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [dist/planck.d.ts:1006](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1006)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [src/dynamics/Joint.ts:209](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L209)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Defined in [dist/planck.d.ts:970](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L970)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dist/planck.d.ts:983](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L983)*

**Returns:** *unknown*

___

### `Abstract` initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Defined in [dist/planck.d.ts:1011](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1011)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

▸ **initVelocityConstraints**(`step`: any): *void*

*Defined in [src/dynamics/Joint.ts:216](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [dist/planck.d.ts:966](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L966)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [dist/planck.d.ts:984](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L984)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1010](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1010)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

### `Abstract` solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Defined in [dist/planck.d.ts:1016](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1016)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Defined in [src/dynamics/Joint.ts:223](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L223)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

### `Abstract` solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Defined in [dist/planck.d.ts:1012](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1012)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

▸ **solveVelocityConstraints**(`step`: any): *void*

*Defined in [src/dynamics/Joint.ts:218](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
