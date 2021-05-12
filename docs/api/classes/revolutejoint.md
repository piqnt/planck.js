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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:156](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:158](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L158)*

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

▪ **TYPE**: *"revolute-joint"* = 'revolute-joint' as 'revolute-joint'

*Defined in [src/dynamics/joint/RevoluteJoint.ts:131](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L131)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:368](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L368)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:316](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L316)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:409](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L409)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:416](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L416)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L159)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:166](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L166)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:190](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L190)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:291](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L291)*

Get the current joint angle in radians.

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:300](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L300)*

Get the current joint angle speed in radians per second.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:270](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L270)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:277](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L277)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:380](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L380)*

Get the lower joint limit in radians.

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:354](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L354)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:341](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L341)*

Get the motor speed in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:325](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L325)*

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

*Defined in [src/dynamics/Joint.ts:173](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L173)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:423](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L423)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:431](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L431)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:284](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L284)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L152)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:387](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L387)*

Get the upper joint limit in radians.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:177](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L177)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:435](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L435)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L145)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:361](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L361)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:309](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L309)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:394](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L394)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:348](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L348)*

Set the maximum motor torque, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:332](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L332)*

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

*Defined in [src/dynamics/Joint.ts:181](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:217](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L217)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:657](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L657)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:546](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RevoluteJoint.ts#L546)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
