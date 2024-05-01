---
showOutline: false
---

# Class: Joint

The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.

## Hierarchy

* **Joint**

  ↳ [DistanceJoint](/api/classes/distancejoint)

  ↳ [FrictionJoint](/api/classes/frictionjoint)

  ↳ [RevoluteJoint](/api/classes/revolutejoint)

  ↳ [PrismaticJoint](/api/classes/prismaticjoint)

  ↳ [GearJoint](/api/classes/gearjoint)

  ↳ [MotorJoint](/api/classes/motorjoint)

  ↳ [MouseJoint](/api/classes/mousejoint)

  ↳ [PulleyJoint](/api/classes/pulleyjoint)

  ↳ [RopeJoint](/api/classes/ropejoint)

  ↳ [WeldJoint](/api/classes/weldjoint)

  ↳ [WheelJoint](/api/classes/wheeljoint)

## Index

### Constructors

* [constructor](/api/classes/joint#constructor)

### Properties

* [style](/api/classes/joint#style)

### Methods

* [getAnchorA](/api/classes/joint#abstract-getanchora)
* [getAnchorB](/api/classes/joint#abstract-getanchorb)
* [getBodyA](/api/classes/joint#getbodya)
* [getBodyB](/api/classes/joint#getbodyb)
* [getCollideConnected](/api/classes/joint#getcollideconnected)
* [getNext](/api/classes/joint#getnext)
* [getReactionForce](/api/classes/joint#abstract-getreactionforce)
* [getReactionTorque](/api/classes/joint#abstract-getreactiontorque)
* [getType](/api/classes/joint#gettype)
* [getUserData](/api/classes/joint#getuserdata)
* [initVelocityConstraints](/api/classes/joint#abstract-initvelocityconstraints)
* [isActive](/api/classes/joint#isactive)
* [setUserData](/api/classes/joint#setuserdata)
* [shiftOrigin](/api/classes/joint#shiftorigin)
* [solvePositionConstraints](/api/classes/joint#abstract-solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/joint#abstract-solvevelocityconstraints)

## Constructors

###  constructor

\+ **new Joint**(`def`: [JointDef](/api/interfaces/jointdef)): *[Joint](/api/classes/joint)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointDef](/api/interfaces/jointdef) |

**Returns:** *[Joint](/api/classes/joint)*

\+ **new Joint**(`def`: [JointOpt](/api/interfaces/jointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body)): *[Joint](/api/classes/joint)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [JointOpt](/api/interfaces/jointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |

**Returns:** *[Joint](/api/classes/joint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

Styling for dev-tools.

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

▸ **getBodyA**(): *[Body](/api/classes/body)*

Get the first body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](/api/classes/body)*

Get the second body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](/api/classes/joint)*

Get the next joint the world joint list.

**Returns:** *[Joint](/api/classes/joint)*

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

▸ **initVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

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

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](/api/interfaces/vec2value)): *void*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

### `Abstract` solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](/api/classes/timestep)): *boolean*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *boolean*

___

### `Abstract` solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*
