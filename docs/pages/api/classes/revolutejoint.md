
# Class: RevoluteJoint

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **RevoluteJoint**

## Index

### Constructors

* [constructor](/api/classes/revolutejoint#constructor)

### Properties

* [style](/api/classes/revolutejoint#style)
* [TYPE](/api/classes/revolutejoint#static-type)

### Methods

* [enableLimit](/api/classes/revolutejoint#enablelimit)
* [enableMotor](/api/classes/revolutejoint#enablemotor)
* [getAnchorA](/api/classes/revolutejoint#getanchora)
* [getAnchorB](/api/classes/revolutejoint#getanchorb)
* [getBodyA](/api/classes/revolutejoint#getbodya)
* [getBodyB](/api/classes/revolutejoint#getbodyb)
* [getCollideConnected](/api/classes/revolutejoint#getcollideconnected)
* [getJointAngle](/api/classes/revolutejoint#getjointangle)
* [getJointSpeed](/api/classes/revolutejoint#getjointspeed)
* [getLocalAnchorA](/api/classes/revolutejoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/revolutejoint#getlocalanchorb)
* [getLowerLimit](/api/classes/revolutejoint#getlowerlimit)
* [getMaxMotorTorque](/api/classes/revolutejoint#getmaxmotortorque)
* [getMotorSpeed](/api/classes/revolutejoint#getmotorspeed)
* [getMotorTorque](/api/classes/revolutejoint#getmotortorque)
* [getNext](/api/classes/revolutejoint#getnext)
* [getReactionForce](/api/classes/revolutejoint#getreactionforce)
* [getReactionTorque](/api/classes/revolutejoint#getreactiontorque)
* [getReferenceAngle](/api/classes/revolutejoint#getreferenceangle)
* [getType](/api/classes/revolutejoint#gettype)
* [getUpperLimit](/api/classes/revolutejoint#getupperlimit)
* [getUserData](/api/classes/revolutejoint#getuserdata)
* [initVelocityConstraints](/api/classes/revolutejoint#initvelocityconstraints)
* [isActive](/api/classes/revolutejoint#isactive)
* [isLimitEnabled](/api/classes/revolutejoint#islimitenabled)
* [isMotorEnabled](/api/classes/revolutejoint#ismotorenabled)
* [setLimits](/api/classes/revolutejoint#setlimits)
* [setMaxMotorTorque](/api/classes/revolutejoint#setmaxmotortorque)
* [setMotorSpeed](/api/classes/revolutejoint#setmotorspeed)
* [setUserData](/api/classes/revolutejoint#setuserdata)
* [shiftOrigin](/api/classes/revolutejoint#shiftorigin)
* [solvePositionConstraints](/api/classes/revolutejoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/revolutejoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new RevoluteJoint**(`def`: [RevoluteJointDef](/api/interfaces/revolutejointdef)): *[RevoluteJoint](/api/classes/revolutejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](/api/interfaces/revolutejointdef) |

**Returns:** *[RevoluteJoint](/api/classes/revolutejoint)*

\+ **new RevoluteJoint**(`def`: [RevoluteJointOpt](/api/interfaces/revolutejointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value)): *[RevoluteJoint](/api/classes/revolutejoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](/api/interfaces/revolutejointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`anchor` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[RevoluteJoint](/api/classes/revolutejoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"revolute-joint"* = "revolute-joint" as const

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

Enable/disable the joint motor.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

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

###  getJointAngle

▸ **getJointAngle**(): *number*

Get the current joint angle in radians.

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

Get the current joint angle speed in radians per second.

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

###  getLowerLimit

▸ **getLowerLimit**(): *number*

Get the lower joint limit in radians.

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

Get the motor speed in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

Get the current motor torque given the inverse time step. Unit is N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

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

Get the reaction force given the inverse time step. Unit is N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](/api/classes/joint).[getReactionTorque](/api/classes/joint#abstract-getreactiontorque)*

Get the reaction torque due to the joint limit given the inverse time step.
Unit is N*m.

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

###  getUpperLimit

▸ **getUpperLimit**(): *number*

Get the upper joint limit in radians.

**Returns:** *number*

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

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

Set the joint limits in radians.

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

Set the maximum motor torque, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

Set the motor speed in radians per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

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
