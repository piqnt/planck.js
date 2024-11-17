
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

* [Joint](/api/classes/joint)

  ↳ **GearJoint**

## Index

### Constructors

* [constructor](/api/classes/gearjoint#constructor)

### Properties

* [style](/api/classes/gearjoint#style)
* [TYPE](/api/classes/gearjoint#static-type)

### Methods

* [getAnchorA](/api/classes/gearjoint#getanchora)
* [getAnchorB](/api/classes/gearjoint#getanchorb)
* [getBodyA](/api/classes/gearjoint#getbodya)
* [getBodyB](/api/classes/gearjoint#getbodyb)
* [getCollideConnected](/api/classes/gearjoint#getcollideconnected)
* [getJoint1](/api/classes/gearjoint#getjoint1)
* [getJoint2](/api/classes/gearjoint#getjoint2)
* [getNext](/api/classes/gearjoint#getnext)
* [getRatio](/api/classes/gearjoint#getratio)
* [getReactionForce](/api/classes/gearjoint#getreactionforce)
* [getReactionTorque](/api/classes/gearjoint#getreactiontorque)
* [getType](/api/classes/gearjoint#gettype)
* [getUserData](/api/classes/gearjoint#getuserdata)
* [initVelocityConstraints](/api/classes/gearjoint#initvelocityconstraints)
* [isActive](/api/classes/gearjoint#isactive)
* [setRatio](/api/classes/gearjoint#setratio)
* [setUserData](/api/classes/gearjoint#setuserdata)
* [shiftOrigin](/api/classes/gearjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/gearjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/gearjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new GearJoint**(`def`: [GearJointDef](/api/interfaces/gearjointdef)): *[GearJoint](/api/classes/gearjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](/api/interfaces/gearjointdef) |

**Returns:** *[GearJoint](/api/classes/gearjoint)*

\+ **new GearJoint**(`def`: [GearJointOpt](/api/interfaces/gearjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `joint1`: [RevoluteJoint](/api/classes/revolutejoint) | [PrismaticJoint](/api/classes/prismaticjoint), `joint2`: [RevoluteJoint](/api/classes/revolutejoint) | [PrismaticJoint](/api/classes/prismaticjoint), `ratio?`: number): *[GearJoint](/api/classes/gearjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](/api/interfaces/gearjointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`joint1` | [RevoluteJoint](/api/classes/revolutejoint) &#124; [PrismaticJoint](/api/classes/prismaticjoint) |
`joint2` | [RevoluteJoint](/api/classes/revolutejoint) &#124; [PrismaticJoint](/api/classes/prismaticjoint) |
`ratio?` | number |

**Returns:** *[GearJoint](/api/classes/gearjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"gear-joint"* = 'gear-joint' as const

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getAnchorA](/api/classes/joint#abstract-getanchora)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getAnchorB](/api/classes/joint#abstract-getanchorb)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](/api/classes/body)*

*Inherited from [Joint](/api/classes/joint).[getBodyA](/api/classes/joint#getbodya)*

Get the first body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](/api/classes/body)*

*Inherited from [Joint](/api/classes/joint).[getBodyB](/api/classes/joint#getbodyb)*

Get the second body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](/api/classes/joint).[getCollideConnected](/api/classes/joint#getcollideconnected)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJoint1

▸ **getJoint1**(): *[Joint](/api/classes/joint)*

Get the first joint.

**Returns:** *[Joint](/api/classes/joint)*

___

###  getJoint2

▸ **getJoint2**(): *[Joint](/api/classes/joint)*

Get the second joint.

**Returns:** *[Joint](/api/classes/joint)*

___

###  getNext

▸ **getNext**(): *[Joint](/api/classes/joint)*

*Inherited from [Joint](/api/classes/joint).[getNext](/api/classes/joint#getnext)*

Get the next joint the world joint list.

**Returns:** *[Joint](/api/classes/joint)*

___

###  getRatio

▸ **getRatio**(): *number*

Get the gear ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getReactionForce](/api/classes/joint#abstract-getreactionforce)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](/api/classes/joint).[getReactionTorque](/api/classes/joint#abstract-getreactiontorque)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](/api/classes/joint).[getType](/api/classes/joint#gettype)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](/api/classes/joint).[getUserData](/api/classes/joint#getuserdata)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

*Overrides [Joint](/api/classes/joint).[initVelocityConstraints](/api/classes/joint#abstract-initvelocityconstraints)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](/api/classes/joint).[isActive](/api/classes/joint#isactive)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setRatio

▸ **setRatio**(`ratio`: number): *void*

Set the gear ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](/api/classes/joint).[setUserData](/api/classes/joint#setuserdata)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](/api/interfaces/vec2value)): *void*

*Inherited from [Joint](/api/classes/joint).[shiftOrigin](/api/classes/joint#shiftorigin)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](/api/classes/timestep)): *boolean*

*Overrides [Joint](/api/classes/joint).[solvePositionConstraints](/api/classes/joint#abstract-solvepositionconstraints)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

*Overrides [Joint](/api/classes/joint).[solveVelocityConstraints](/api/classes/joint#abstract-solvevelocityconstraints)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*
