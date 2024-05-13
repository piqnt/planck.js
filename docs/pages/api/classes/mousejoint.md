
# Class: MouseJoint

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

You need to call setTarget(target) every time that mouse is
moved, to track the new location of the mouse.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **MouseJoint**

## Index

### Constructors

* [constructor](/api/classes/mousejoint#constructor)

### Properties

* [style](/api/classes/mousejoint#style)
* [TYPE](/api/classes/mousejoint#static-type)

### Methods

* [getAnchorA](/api/classes/mousejoint#getanchora)
* [getAnchorB](/api/classes/mousejoint#getanchorb)
* [getBodyA](/api/classes/mousejoint#getbodya)
* [getBodyB](/api/classes/mousejoint#getbodyb)
* [getCollideConnected](/api/classes/mousejoint#getcollideconnected)
* [getDampingRatio](/api/classes/mousejoint#getdampingratio)
* [getFrequency](/api/classes/mousejoint#getfrequency)
* [getMaxForce](/api/classes/mousejoint#getmaxforce)
* [getNext](/api/classes/mousejoint#getnext)
* [getReactionForce](/api/classes/mousejoint#getreactionforce)
* [getReactionTorque](/api/classes/mousejoint#getreactiontorque)
* [getTarget](/api/classes/mousejoint#gettarget)
* [getType](/api/classes/mousejoint#gettype)
* [getUserData](/api/classes/mousejoint#getuserdata)
* [initVelocityConstraints](/api/classes/mousejoint#initvelocityconstraints)
* [isActive](/api/classes/mousejoint#isactive)
* [setDampingRatio](/api/classes/mousejoint#setdampingratio)
* [setFrequency](/api/classes/mousejoint#setfrequency)
* [setMaxForce](/api/classes/mousejoint#setmaxforce)
* [setTarget](/api/classes/mousejoint#settarget)
* [setUserData](/api/classes/mousejoint#setuserdata)
* [shiftOrigin](/api/classes/mousejoint#shiftorigin)
* [solvePositionConstraints](/api/classes/mousejoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/mousejoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new MouseJoint**(`def`: [MouseJointDef](/api/interfaces/mousejointdef)): *[MouseJoint](/api/classes/mousejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](/api/interfaces/mousejointdef) |

**Returns:** *[MouseJoint](/api/classes/mousejoint)*

\+ **new MouseJoint**(`def`: [MouseJointOpt](/api/interfaces/mousejointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `target`: [Vec2Value](/api/interfaces/vec2value)): *[MouseJoint](/api/classes/mousejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](/api/interfaces/mousejointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`target` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[MouseJoint](/api/classes/mousejoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"mouse-joint"* = 'mouse-joint' as const

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

Get the damping ratio (dimensionless).

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

Get the frequency in Hertz.

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

Get the maximum force in Newtons.

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

###  getTarget

▸ **getTarget**(): *Vec2*

**Returns:** *Vec2*

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

Set the damping ratio (dimensionless).

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

Set the frequency in Hertz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

Set the maximum force in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: [Vec2Value](/api/interfaces/vec2value)): *void*

Use this to update the target point.

**Parameters:**

Name | Type |
------ | ------ |
`target` | [Vec2Value](/api/interfaces/vec2value) |

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

*Overrides [Joint](/api/classes/joint).[shiftOrigin](/api/classes/joint#shiftorigin)*

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
