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

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointDef](../interfaces/jointdef.md) |

**Returns:** *[Joint](joint.md)*

\+ **new Joint**(`def`: [JointOpt](../interfaces/jointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[Joint](joint.md)*

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

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

### `Abstract` getAnchorB

▸ **getAnchorB**(): *Vec2*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

### `Abstract` getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

___

### `Abstract` getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

**Returns:** *unknown*

___

### `Abstract` initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

### `Abstract` solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *boolean*

___

### `Abstract` solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
