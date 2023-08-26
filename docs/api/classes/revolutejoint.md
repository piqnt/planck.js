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

## Properties

### `Static` TYPE

▪ **TYPE**: *"revolute-joint"* = 'revolute-joint' as const

*Defined in [src/dynamics/joint/RevoluteJoint.ts:135](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L135)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:384](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L384)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:329](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L329)*

Enable/disable the joint motor.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getAnchorA

▸ **getAnchorA**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:425](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L425)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

###  getAnchorB

▸ **getAnchorB**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:432](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L432)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:304](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L304)*

Get the current joint angle in radians.

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:313](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L313)*

Get the current joint angle speed in radians per second.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *Vec2*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:283](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L283)*

The local anchor point relative to bodyA's origin.

**Returns:** *Vec2*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *Vec2*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:290](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L290)*

The local anchor point relative to bodyB's origin.

**Returns:** *Vec2*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:396](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L396)*

Get the lower joint limit in radians.

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:370](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L370)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:356](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L356)*

Get the motor speed in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:339](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L339)*

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

*Defined in [src/dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:439](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L439)*

Get the reaction force given the inverse time step. Unit is N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:447](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L447)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:297](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L297)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:403](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L403)*

Get the upper joint limit in radians.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:451](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L451)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:377](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L377)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:322](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L322)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:410](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L410)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:363](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L363)*

Set the maximum motor torque, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:346](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L346)*

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

*Defined in [src/dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L203)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:667](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L667)*

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

*Defined in [src/dynamics/joint/RevoluteJoint.ts:559](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RevoluteJoint.ts#L559)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
