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

*Defined in [src/dynamics/Joint.ts:109](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointDef](../interfaces/jointdef.md) |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: [JointOpt](../interfaces/jointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[Joint](joint.md)*

*Defined in [src/dynamics/Joint.ts:111](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointOpt](../interfaces/jointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[Joint](joint.md)*

## Methods

### `Abstract` getAnchorA

▸ **getAnchorA**(): *Vec2*

*Defined in [src/dynamics/Joint.ts:183](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L183)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

### `Abstract` getAnchorB

▸ **getAnchorB**(): *Vec2*

*Defined in [src/dynamics/Joint.ts:188](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L188)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Defined in [src/dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Defined in [src/dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Defined in [src/dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

### `Abstract` getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Defined in [src/dynamics/Joint.ts:193](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L193)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

___

### `Abstract` getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [src/dynamics/Joint.ts:198](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L198)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Defined in [src/dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

### `Abstract` initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Joint.ts:205](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [src/dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [src/dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Defined in [src/dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L203)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

### `Abstract` solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Defined in [src/dynamics/Joint.ts:212](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L212)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *boolean*

___

### `Abstract` solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Joint.ts:207](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
