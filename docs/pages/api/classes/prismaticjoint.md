
# Class: PrismaticJoint

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **PrismaticJoint**

## Index

### Constructors

* [constructor](/api/classes/prismaticjoint#constructor)

### Properties

* [style](/api/classes/prismaticjoint#style)
* [TYPE](/api/classes/prismaticjoint#static-type)

### Methods

* [enableLimit](/api/classes/prismaticjoint#enablelimit)
* [enableMotor](/api/classes/prismaticjoint#enablemotor)
* [getAnchorA](/api/classes/prismaticjoint#getanchora)
* [getAnchorB](/api/classes/prismaticjoint#getanchorb)
* [getBodyA](/api/classes/prismaticjoint#getbodya)
* [getBodyB](/api/classes/prismaticjoint#getbodyb)
* [getCollideConnected](/api/classes/prismaticjoint#getcollideconnected)
* [getJointSpeed](/api/classes/prismaticjoint#getjointspeed)
* [getJointTranslation](/api/classes/prismaticjoint#getjointtranslation)
* [getLocalAnchorA](/api/classes/prismaticjoint#getlocalanchora)
* [getLocalAnchorB](/api/classes/prismaticjoint#getlocalanchorb)
* [getLocalAxisA](/api/classes/prismaticjoint#getlocalaxisa)
* [getLowerLimit](/api/classes/prismaticjoint#getlowerlimit)
* [getMaxMotorForce](/api/classes/prismaticjoint#getmaxmotorforce)
* [getMotorForce](/api/classes/prismaticjoint#getmotorforce)
* [getMotorSpeed](/api/classes/prismaticjoint#getmotorspeed)
* [getNext](/api/classes/prismaticjoint#getnext)
* [getReactionForce](/api/classes/prismaticjoint#getreactionforce)
* [getReactionTorque](/api/classes/prismaticjoint#getreactiontorque)
* [getReferenceAngle](/api/classes/prismaticjoint#getreferenceangle)
* [getType](/api/classes/prismaticjoint#gettype)
* [getUpperLimit](/api/classes/prismaticjoint#getupperlimit)
* [getUserData](/api/classes/prismaticjoint#getuserdata)
* [initVelocityConstraints](/api/classes/prismaticjoint#initvelocityconstraints)
* [isActive](/api/classes/prismaticjoint#isactive)
* [isLimitEnabled](/api/classes/prismaticjoint#islimitenabled)
* [isMotorEnabled](/api/classes/prismaticjoint#ismotorenabled)
* [setLimits](/api/classes/prismaticjoint#setlimits)
* [setMaxMotorForce](/api/classes/prismaticjoint#setmaxmotorforce)
* [setMotorSpeed](/api/classes/prismaticjoint#setmotorspeed)
* [setUserData](/api/classes/prismaticjoint#setuserdata)
* [shiftOrigin](/api/classes/prismaticjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/prismaticjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/prismaticjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new PrismaticJoint**(`def`: [PrismaticJointDef](/api/interfaces/prismaticjointdef)): *[PrismaticJoint](/api/classes/prismaticjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](/api/interfaces/prismaticjointdef) |

**Returns:** *[PrismaticJoint](/api/classes/prismaticjoint)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](/api/interfaces/prismaticjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `anchor`: [Vec2Value](/api/interfaces/vec2value), `axis`: [Vec2Value](/api/interfaces/vec2value)): *[PrismaticJoint](/api/classes/prismaticjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](/api/interfaces/prismaticjointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`anchor` | [Vec2Value](/api/interfaces/vec2value) |
`axis` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[PrismaticJoint](/api/classes/prismaticjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"prismatic-joint"* = 'prismatic-joint' as const

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

▸ **getLocalAnchorA**(): *[Vec2](/api/classes/vec2)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](/api/classes/vec2)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](/api/classes/vec2)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

Get the motor speed, usually in meters per second.

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

Get the upper joint limit, usually in meters.

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

Set the joint limits, usually in meters.

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorForce

▸ **setMaxMotorForce**(`force`: number): *void*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

Set the motor speed, usually in meters per second.

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
