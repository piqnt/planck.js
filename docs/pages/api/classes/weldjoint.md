
# Class: WeldJoint

A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **WeldJoint**

## Index

### Constructors

* [constructor](/api/classes/weldjoint#constructor)

### Properties

* [style](/api/classes/weldjoint#style)
* [TYPE](/api/classes/weldjoint#static-type)

### Methods

* [getAnchorA](/api/classes/weldjoint#getanchora)
* [getAnchorB](/api/classes/weldjoint#getanchorb)
* [getBodyA](/api/classes/weldjoint#getbodya)
* [getBodyB](/api/classes/weldjoint#getbodyb)
* [getCollideConnected](/api/classes/weldjoint#getcollideconnected)
* [getDampingRatio](/api/classes/weldjoint#getdampingratio)
* [getFrequency](/api/classes/weldjoint#getfrequency)
* [getLocalAnchorA](/api/classes/weldjoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/weldjoint#getlocalanchorb)
* [getNext](/api/classes/weldjoint#getnext)
* [getReactionForce](/api/classes/weldjoint#getreactionforce)
* [getReactionTorque](/api/classes/weldjoint#getreactiontorque)
* [getReferenceAngle](/api/classes/weldjoint#getreferenceangle)
* [getType](/api/classes/weldjoint#gettype)
* [getUserData](/api/classes/weldjoint#getuserdata)
* [initVelocityConstraints](/api/classes/weldjoint#initvelocityconstraints)
* [isActive](/api/classes/weldjoint#isactive)
* [setDampingRatio](/api/classes/weldjoint#setdampingratio)
* [setFrequency](/api/classes/weldjoint#setfrequency)
* [setUserData](/api/classes/weldjoint#setuserdata)
* [shiftOrigin](/api/classes/weldjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/weldjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/weldjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new WeldJoint**(`def`: [WeldJointDef](/api/interfaces/weldjointdef)): *[WeldJoint](/api/classes/weldjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](/api/interfaces/weldjointdef) |

**Returns:** *[WeldJoint](/api/classes/weldjoint)*

\+ **new WeldJoint**(`def`: [WeldJointOpt](/api/interfaces/weldjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value)): *[WeldJoint](/api/classes/weldjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](/api/interfaces/weldjointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`anchor` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[WeldJoint](/api/classes/weldjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"weld-joint"* = "weld-joint" as const

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

###  getDampingRatio

▸ **getDampingRatio**(): *number*

Get damping ratio.

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

Get frequency in Hz.

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

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

Get the reference angle.

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

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

Set damping ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

Set frequency in Hz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

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
