
# Class: RopeJoint

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See [DistanceJoint](distancejoint) if you
want to dynamically control length.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **RopeJoint**

## Index

### Constructors

* [constructor](/api/classes/ropejoint#constructor)

### Properties

* [style](/api/classes/ropejoint#style)
* [TYPE](/api/classes/ropejoint#static-type)

### Methods

* [getAnchorA](/api/classes/ropejoint#getanchora)
* [getAnchorB](/api/classes/ropejoint#getanchorb)
* [getBodyA](/api/classes/ropejoint#getbodya)
* [getBodyB](/api/classes/ropejoint#getbodyb)
* [getCollideConnected](/api/classes/ropejoint#getcollideconnected)
* [getLimitState](/api/classes/ropejoint#getlimitstate)
* [getLocalAnchorA](/api/classes/ropejoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/ropejoint#getlocalanchorb)
* [getMaxLength](/api/classes/ropejoint#getmaxlength)
* [getNext](/api/classes/ropejoint#getnext)
* [getReactionForce](/api/classes/ropejoint#getreactionforce)
* [getReactionTorque](/api/classes/ropejoint#getreactiontorque)
* [getType](/api/classes/ropejoint#gettype)
* [getUserData](/api/classes/ropejoint#getuserdata)
* [initVelocityConstraints](/api/classes/ropejoint#initvelocityconstraints)
* [isActive](/api/classes/ropejoint#isactive)
* [setMaxLength](/api/classes/ropejoint#setmaxlength)
* [setUserData](/api/classes/ropejoint#setuserdata)
* [shiftOrigin](/api/classes/ropejoint#shiftorigin)
* [solvePositionConstraints](/api/classes/ropejoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/ropejoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new RopeJoint**(`def`: [RopeJointDef](/api/interfaces/ropejointdef)): *[RopeJoint](/api/classes/ropejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](/api/interfaces/ropejointdef) |

**Returns:** *[RopeJoint](/api/classes/ropejoint)*

\+ **new RopeJoint**(`def`: [RopeJointOpt](/api/interfaces/ropejointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value)): *[RopeJoint](/api/classes/ropejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](/api/interfaces/ropejointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`anchor` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[RopeJoint](/api/classes/ropejoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"rope-joint"* = "rope-joint" as const

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

###  getLimitState

▸ **getLimitState**(): *number*

**Returns:** *number*

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

###  getMaxLength

▸ **getMaxLength**(): *number*

Get the maximum length of the rope.

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

###  setMaxLength

▸ **setMaxLength**(`length`: number): *void*

Set the maximum length of the rope.

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

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
