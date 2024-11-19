
# Class: FrictionJoint

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **FrictionJoint**

## Index

### Constructors

* [constructor](/api/classes/frictionjoint#constructor)

### Properties

* [style](/api/classes/frictionjoint#style)
* [TYPE](/api/classes/frictionjoint#static-type)

### Methods

* [getAnchorA](/api/classes/frictionjoint#getanchora)
* [getAnchorB](/api/classes/frictionjoint#getanchorb)
* [getBodyA](/api/classes/frictionjoint#getbodya)
* [getBodyB](/api/classes/frictionjoint#getbodyb)
* [getCollideConnected](/api/classes/frictionjoint#getcollideconnected)
* [getLocalAnchorA](/api/classes/frictionjoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/frictionjoint#getlocalanchorb)
* [getMaxForce](/api/classes/frictionjoint#getmaxforce)
* [getMaxTorque](/api/classes/frictionjoint#getmaxtorque)
* [getNext](/api/classes/frictionjoint#getnext)
* [getReactionForce](/api/classes/frictionjoint#getreactionforce)
* [getReactionTorque](/api/classes/frictionjoint#getreactiontorque)
* [getType](/api/classes/frictionjoint#gettype)
* [getUserData](/api/classes/frictionjoint#getuserdata)
* [initVelocityConstraints](/api/classes/frictionjoint#initvelocityconstraints)
* [isActive](/api/classes/frictionjoint#isactive)
* [setMaxForce](/api/classes/frictionjoint#setmaxforce)
* [setMaxTorque](/api/classes/frictionjoint#setmaxtorque)
* [setUserData](/api/classes/frictionjoint#setuserdata)
* [shiftOrigin](/api/classes/frictionjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/frictionjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/frictionjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new FrictionJoint**(`def`: [FrictionJointDef](/api/interfaces/frictionjointdef)): *[FrictionJoint](/api/classes/frictionjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](/api/interfaces/frictionjointdef) |

**Returns:** *[FrictionJoint](/api/classes/frictionjoint)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](/api/interfaces/frictionjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value)): *[FrictionJoint](/api/classes/frictionjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def` | [FrictionJointOpt](/api/interfaces/frictionjointopt) | - |
`bodyA` | [Body](/api/classes/body) | - |
`bodyB` | [Body](/api/classes/body) | - |
`anchor` | [Vec2Value](/api/interfaces/vec2value) | Anchor in global coordination.  |

**Returns:** *[FrictionJoint](/api/classes/frictionjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"friction-joint"* = "friction-joint" as const

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

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](/api/classes/vec2)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](/api/classes/vec2)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

Get the maximum friction torque in N*m.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](/api/classes/joint)*

*Inherited from [Joint](/api/classes/joint).[getNext](/api/classes/joint#getnext)*

Get the next joint the world joint list.

**Returns:** *[Joint](/api/classes/joint)*

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

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

Set the maximum friction torque in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

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
