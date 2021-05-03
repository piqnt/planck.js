[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Joint](joint.md)

# Class: Joint

The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.

## Hierarchy

* **Joint**

  ↳ [DistanceJoint](distancejoint.md)

  ↳ [FrictionJoint](frictionjoint.md)

  ↳ [RevoluteJoint](revolutejoint.md)

  ↳ [PrismaticJoint](prismaticjoint.md)

  ↳ [GearJoint](gearjoint.md)

  ↳ [MotorJoint](motorjoint.md)

  ↳ [MouseJoint](mousejoint.md)

  ↳ [PulleyJoint](pulleyjoint.md)

  ↳ [RopeJoint](ropejoint.md)

  ↳ [WeldJoint](weldjoint.md)

  ↳ [WheelJoint](wheeljoint.md)

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

*Defined in [dynamics/Joint.ts:109](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointDef](../interfaces/jointdef.md) |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: [JointOpt](../interfaces/jointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[Joint](joint.md)*

*Defined in [dynamics/Joint.ts:111](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointOpt](../interfaces/jointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[Joint](joint.md)*

## Properties

### `Static` TYPES

▪ **TYPES**: *object*

*Defined in [dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

### `Abstract` getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Joint.ts:194](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L194)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

### `Abstract` getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Joint.ts:199](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L199)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)‹›*

*Defined in [dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)‹›*

*Defined in [dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Defined in [dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Defined in [dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

### `Abstract` getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Defined in [dynamics/Joint.ts:204](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L204)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

### `Abstract` getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [dynamics/Joint.ts:209](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L209)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Defined in [dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

### `Abstract` initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Defined in [dynamics/Joint.ts:216](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L216)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L214)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

### `Abstract` solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Defined in [dynamics/Joint.ts:223](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L223)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

### `Abstract` solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Defined in [dynamics/Joint.ts:218](https://github.com/shakiba/planck.js/blob/8127f05/src/dynamics/Joint.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
