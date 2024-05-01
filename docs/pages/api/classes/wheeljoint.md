---
showOutline: false
---

# Class: WheelJoint

A wheel joint. This joint provides two degrees of freedom: translation along
an axis fixed in bodyA and rotation in the plane. In other words, it is a
point to line constraint with a rotational motor and a linear spring/damper.
This joint is designed for vehicle suspensions.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **WheelJoint**

## Index

### Constructors

* [constructor](/api/classes/wheeljoint#constructor)

### Properties

* [style](/api/classes/wheeljoint#style)
* [TYPE](/api/classes/wheeljoint#static-type)

### Methods

* [enableMotor](/api/classes/wheeljoint#enablemotor)
* [getAnchorA](/api/classes/wheeljoint#getanchora)
* [getAnchorB](/api/classes/wheeljoint#getanchorb)
* [getBodyA](/api/classes/wheeljoint#getbodya)
* [getBodyB](/api/classes/wheeljoint#getbodyb)
* [getCollideConnected](/api/classes/wheeljoint#getcollideconnected)
* [getJointSpeed](/api/classes/wheeljoint#getjointspeed)
* [getJointTranslation](/api/classes/wheeljoint#getjointtranslation)
* [getLocalAnchorA](/api/classes/wheeljoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/wheeljoint#getlocalanchorb)
* [getLocalAxisA](/api/classes/wheeljoint#getlocalaxisa)
* [getMaxMotorTorque](/api/classes/wheeljoint#getmaxmotortorque)
* [getMotorSpeed](/api/classes/wheeljoint#getmotorspeed)
* [getMotorTorque](/api/classes/wheeljoint#getmotortorque)
* [getNext](/api/classes/wheeljoint#getnext)
* [getReactionForce](/api/classes/wheeljoint#getreactionforce)
* [getReactionTorque](/api/classes/wheeljoint#getreactiontorque)
* [getSpringDampingRatio](/api/classes/wheeljoint#getspringdampingratio)
* [getSpringFrequencyHz](/api/classes/wheeljoint#getspringfrequencyhz)
* [getType](/api/classes/wheeljoint#gettype)
* [getUserData](/api/classes/wheeljoint#getuserdata)
* [initVelocityConstraints](/api/classes/wheeljoint#initvelocityconstraints)
* [isActive](/api/classes/wheeljoint#isactive)
* [isMotorEnabled](/api/classes/wheeljoint#ismotorenabled)
* [setMaxMotorTorque](/api/classes/wheeljoint#setmaxmotortorque)
* [setMotorSpeed](/api/classes/wheeljoint#setmotorspeed)
* [setSpringDampingRatio](/api/classes/wheeljoint#setspringdampingratio)
* [setSpringFrequencyHz](/api/classes/wheeljoint#setspringfrequencyhz)
* [setUserData](/api/classes/wheeljoint#setuserdata)
* [shiftOrigin](/api/classes/wheeljoint#shiftorigin)
* [solvePositionConstraints](/api/classes/wheeljoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/wheeljoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new WheelJoint**(`def`: [WheelJointDef](/api/interfaces/wheeljointdef)): *[WheelJoint](/api/classes/wheeljoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointDef](/api/interfaces/wheeljointdef) |

**Returns:** *[WheelJoint](/api/classes/wheeljoint)*

\+ **new WheelJoint**(`def`: [WheelJointOpt](/api/interfaces/wheeljointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value), `axis`: [Vec2Value](/api/interfaces/vec2value)): *[WheelJoint](/api/classes/wheeljoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointOpt](/api/interfaces/wheeljointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`anchor` | [Vec2Value](/api/interfaces/vec2value) |
`axis` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[WheelJoint](/api/classes/wheeljoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"wheel-joint"* = 'wheel-joint' as const

## Methods

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

###  getJointSpeed

▸ **getJointSpeed**(): *number*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *Vec2*

The local anchor point relative to bodyA's origin.

**Returns:** *Vec2*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *Vec2*

The local anchor point relative to bodyB's origin.

**Returns:** *Vec2*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *Vec2*

The local joint axis relative to bodyA.

**Returns:** *Vec2*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

Get the motor speed, usually in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

Get the current motor torque given the inverse time step, usually in N-m.

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

###  getSpringDampingRatio

▸ **getSpringDampingRatio**(): *number*

**Returns:** *number*

___

###  getSpringFrequencyHz

▸ **getSpringFrequencyHz**(): *number*

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

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

Set/Get the maximum motor force, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

Set the motor speed, usually in radians per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  setSpringDampingRatio

▸ **setSpringDampingRatio**(`ratio`: number): *void*

Set/Get the spring damping ratio

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setSpringFrequencyHz

▸ **setSpringFrequencyHz**(`hz`: number): *void*

Set/Get the spring frequency in hertz. Setting the frequency to zero disables
the spring.

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
