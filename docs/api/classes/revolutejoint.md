[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJoint](revolutejoint.md)

# Class: RevoluteJoint

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

## Hierarchy

* [Joint](joint.md)

  ↳ **RevoluteJoint**

## Index

### Constructors

* [constructor](revolutejoint.md#constructor)

### Properties

* [TYPE](revolutejoint.md#static-type)

### Methods

* [enableLimit](revolutejoint.md#enablelimit)
* [enableMotor](revolutejoint.md#enablemotor)
* [getAnchorA](revolutejoint.md#getanchora)
* [getAnchorB](revolutejoint.md#getanchorb)
* [getBodyA](revolutejoint.md#getbodya)
* [getBodyB](revolutejoint.md#getbodyb)
* [getCollideConnected](revolutejoint.md#getcollideconnected)
* [getJointAngle](revolutejoint.md#getjointangle)
* [getJointSpeed](revolutejoint.md#getjointspeed)
* [getLocalAnchorA](revolutejoint.md#getlocalanchora)
* [getLocalAnchorB](revolutejoint.md#getlocalanchorb)
* [getLowerLimit](revolutejoint.md#getlowerlimit)
* [getMaxMotorTorque](revolutejoint.md#getmaxmotortorque)
* [getMotorSpeed](revolutejoint.md#getmotorspeed)
* [getMotorTorque](revolutejoint.md#getmotortorque)
* [getNext](revolutejoint.md#getnext)
* [getReactionForce](revolutejoint.md#getreactionforce)
* [getReactionTorque](revolutejoint.md#getreactiontorque)
* [getReferenceAngle](revolutejoint.md#getreferenceangle)
* [getType](revolutejoint.md#gettype)
* [getUpperLimit](revolutejoint.md#getupperlimit)
* [getUserData](revolutejoint.md#getuserdata)
* [initVelocityConstraints](revolutejoint.md#initvelocityconstraints)
* [isActive](revolutejoint.md#isactive)
* [isLimitEnabled](revolutejoint.md#islimitenabled)
* [isMotorEnabled](revolutejoint.md#ismotorenabled)
* [setLimits](revolutejoint.md#setlimits)
* [setMaxMotorTorque](revolutejoint.md#setmaxmotortorque)
* [setMotorSpeed](revolutejoint.md#setmotorspeed)
* [setUserData](revolutejoint.md#setuserdata)
* [shiftOrigin](revolutejoint.md#shiftorigin)
* [solvePositionConstraints](revolutejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](revolutejoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new RevoluteJoint**(`def`: [RevoluteJointDef](../interfaces/revolutejointdef.md)): *[RevoluteJoint](revolutejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/RevoluteJoint.ts:163](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/RevoluteJoint.ts:165](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](../interfaces/revolutejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"revolute-joint"* = 'revolute-joint' as const

*Defined in [dynamics/joint/RevoluteJoint.ts:135](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L135)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [dynamics/joint/RevoluteJoint.ts:381](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L381)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [dynamics/joint/RevoluteJoint.ts:326](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L326)*

Enable/disable the joint motor.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [dynamics/joint/RevoluteJoint.ts:422](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L422)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/RevoluteJoint.ts:429](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L429)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:301](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L301)*

Get the current joint angle in radians.

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:310](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L310)*

Get the current joint angle speed in radians per second.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/RevoluteJoint.ts:280](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L280)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/RevoluteJoint.ts:287](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L287)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:393](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L393)*

Get the lower joint limit in radians.

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:367](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L367)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:353](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L353)*

Get the motor speed in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:336](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L336)*

Get the current motor torque given the inverse time step. Unit is N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [dynamics/joint/RevoluteJoint.ts:436](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L436)*

Get the reaction force given the inverse time step. Unit is N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [dynamics/joint/RevoluteJoint.ts:444](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L444)*

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

*Defined in [dynamics/joint/RevoluteJoint.ts:294](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L294)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [dynamics/joint/RevoluteJoint.ts:400](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L400)*

Get the upper joint limit in radians.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [dynamics/joint/RevoluteJoint.ts:448](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L448)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [dynamics/joint/RevoluteJoint.ts:374](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L374)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [dynamics/joint/RevoluteJoint.ts:319](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L319)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [dynamics/joint/RevoluteJoint.ts:407](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L407)*

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

*Defined in [dynamics/joint/RevoluteJoint.ts:360](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L360)*

Set the maximum motor torque, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [dynamics/joint/RevoluteJoint.ts:343](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L343)*

Set the motor speed in radians per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L203)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [dynamics/joint/RevoluteJoint.ts:664](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L664)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[solveVelocityConstraints](joint.md#abstract-solvevelocityconstraints)*

*Defined in [dynamics/joint/RevoluteJoint.ts:556](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/RevoluteJoint.ts#L556)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
