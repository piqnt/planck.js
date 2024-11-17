
# Class: DistanceJoint

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **DistanceJoint**

## Index

### Constructors

* [constructor](/api/classes/distancejoint#constructor)

### Properties

* [style](/api/classes/distancejoint#style)
* [TYPE](/api/classes/distancejoint#static-type)

### Methods

* [getAnchorA](/api/classes/distancejoint#getanchora)
* [getAnchorB](/api/classes/distancejoint#getanchorb)
* [getBodyA](/api/classes/distancejoint#getbodya)
* [getBodyB](/api/classes/distancejoint#getbodyb)
* [getCollideConnected](/api/classes/distancejoint#getcollideconnected)
* [getDampingRatio](/api/classes/distancejoint#getdampingratio)
* [getFrequency](/api/classes/distancejoint#getfrequency)
* [getLength](/api/classes/distancejoint#getlength)
* [getLocalAnchorA](/api/classes/distancejoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/distancejoint#getlocalanchorb)
* [getNext](/api/classes/distancejoint#getnext)
* [getReactionForce](/api/classes/distancejoint#getreactionforce)
* [getReactionTorque](/api/classes/distancejoint#getreactiontorque)
* [getType](/api/classes/distancejoint#gettype)
* [getUserData](/api/classes/distancejoint#getuserdata)
* [initVelocityConstraints](/api/classes/distancejoint#initvelocityconstraints)
* [isActive](/api/classes/distancejoint#isactive)
* [setDampingRatio](/api/classes/distancejoint#setdampingratio)
* [setFrequency](/api/classes/distancejoint#setfrequency)
* [setLength](/api/classes/distancejoint#setlength)
* [setUserData](/api/classes/distancejoint#setuserdata)
* [shiftOrigin](/api/classes/distancejoint#shiftorigin)
* [solvePositionConstraints](/api/classes/distancejoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/distancejoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new DistanceJoint**(`def`: [DistanceJointDef](/api/interfaces/distancejointdef)): *[DistanceJoint](/api/classes/distancejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def` | [DistanceJointDef](/api/interfaces/distancejointdef) | DistanceJoint definition.  |

**Returns:** *[DistanceJoint](/api/classes/distancejoint)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](/api/interfaces/distancejointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchorA`: [Vec2Value](/api/interfaces/vec2value), `anchorB`: [Vec2Value](/api/interfaces/vec2value)): *[DistanceJoint](/api/classes/distancejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def` | [DistanceJointOpt](/api/interfaces/distancejointopt) | DistanceJoint definition.  |
`bodyA` | [Body](/api/classes/body) | - |
`bodyB` | [Body](/api/classes/body) | - |
`anchorA` | [Vec2Value](/api/interfaces/vec2value) | Anchor A in global coordination. |
`anchorB` | [Vec2Value](/api/interfaces/vec2value) | Anchor B in global coordination.  |

**Returns:** *[DistanceJoint](/api/classes/distancejoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"distance-joint"* = 'distance-joint' as const

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

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

Get the natural length.

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

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

Set the natural length. Manipulating the length can lead to non-physical
behavior when the frequency is zero.

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
