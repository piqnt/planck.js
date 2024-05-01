---
showOutline: false
---

# Class: MotorJoint

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **MotorJoint**

## Index

### Constructors

* [constructor](/api/classes/motorjoint#constructor)

### Properties

* [style](/api/classes/motorjoint#style)
* [TYPE](/api/classes/motorjoint#static-type)

### Methods

* [getAnchorA](/api/classes/motorjoint#getanchora)
* [getAnchorB](/api/classes/motorjoint#getanchorb)
* [getAngularOffset](/api/classes/motorjoint#getangularoffset)
* [getBodyA](/api/classes/motorjoint#getbodya)
* [getBodyB](/api/classes/motorjoint#getbodyb)
* [getCollideConnected](/api/classes/motorjoint#getcollideconnected)
* [getCorrectionFactor](/api/classes/motorjoint#getcorrectionfactor)
* [getLinearOffset](/api/classes/motorjoint#getlinearoffset)
* [getMaxForce](/api/classes/motorjoint#getmaxforce)
* [getMaxTorque](/api/classes/motorjoint#getmaxtorque)
* [getNext](/api/classes/motorjoint#getnext)
* [getReactionForce](/api/classes/motorjoint#getreactionforce)
* [getReactionTorque](/api/classes/motorjoint#getreactiontorque)
* [getType](/api/classes/motorjoint#gettype)
* [getUserData](/api/classes/motorjoint#getuserdata)
* [initVelocityConstraints](/api/classes/motorjoint#initvelocityconstraints)
* [isActive](/api/classes/motorjoint#isactive)
* [setAngularOffset](/api/classes/motorjoint#setangularoffset)
* [setCorrectionFactor](/api/classes/motorjoint#setcorrectionfactor)
* [setLinearOffset](/api/classes/motorjoint#setlinearoffset)
* [setMaxForce](/api/classes/motorjoint#setmaxforce)
* [setMaxTorque](/api/classes/motorjoint#setmaxtorque)
* [setUserData](/api/classes/motorjoint#setuserdata)
* [shiftOrigin](/api/classes/motorjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/motorjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/motorjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new MotorJoint**(`def`: [MotorJointDef](/api/interfaces/motorjointdef)): *[MotorJoint](/api/classes/motorjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](/api/interfaces/motorjointdef) |

**Returns:** *[MotorJoint](/api/classes/motorjoint)*

\+ **new MotorJoint**(`def`: [MotorJointOpt](/api/interfaces/motorjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body)): *[MotorJoint](/api/classes/motorjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](/api/interfaces/motorjointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |

**Returns:** *[MotorJoint](/api/classes/motorjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"motor-joint"* = 'motor-joint' as const

## Methods

###  getAnchorA

▸ **getAnchorA**(): *Vec2*

*Overrides [Joint](/api/classes/joint).[getAnchorA](/api/classes/joint#abstract-getanchora)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

###  getAnchorB

▸ **getAnchorB**(): *Vec2*

*Overrides [Joint](/api/classes/joint).[getAnchorB](/api/classes/joint#abstract-getanchorb)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getAngularOffset

▸ **getAngularOffset**(): *number*

**Returns:** *number*

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

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

Get the position correction factor in the range [0,1].

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *Vec2*

**Returns:** *Vec2*

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

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Overrides [Joint](/api/classes/joint).[getReactionForce](/api/classes/joint#abstract-getreactionforce)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

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

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: number): *void*

Set/get the target angular offset, in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | number |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: number): *void*

Set the position correction factor in the range [0,1].

**Parameters:**

Name | Type |
------ | ------ |
`factor` | number |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: [Vec2Value](/api/interfaces/vec2value)): *void*

Set/get the target linear offset, in frame A, in meters.

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

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
