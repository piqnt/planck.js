[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJoint](revolutejoint.md)

# Class: RevoluteJoint

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.
A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

## Hierarchy

* any

* Joint

  ↳ **RevoluteJoint**

## Callable

▸ **RevoluteJoint**(`def`: [RevoluteJointDef](../interfaces/revolutejointdef.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [dist/planck.d.ts:2688](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2688)*

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.
A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

▸ **RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [dist/planck.d.ts:2689](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2689)*

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.
A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](../interfaces/revolutejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

## Index

### Constructors

* [constructor](revolutejoint.md#constructor)

### Properties

* [TYPE](revolutejoint.md#static-type)
* [TYPES](revolutejoint.md#static-types)

### Methods

* [_serialize](revolutejoint.md#_serialize)
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
* [_deserialize](revolutejoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new RevoluteJoint**(`def`: [RevoluteJointDef](../interfaces/revolutejointdef.md)): *[RevoluteJoint](revolutejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2699](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2699)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2701](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2701)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](../interfaces/revolutejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: RevoluteJointDef): *[RevoluteJoint](revolutejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:156](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | RevoluteJointDef |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: RevoluteJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2): *[RevoluteJoint](revolutejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:158](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | RevoluteJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchor` | Vec2 |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"revolute-joint"* = 'revolute-joint' as 'revolute-joint'

*Defined in [dist/planck.d.ts:2699](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2699)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:131](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/RevoluteJoint.ts#L131)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [dist/planck.d.ts:2703](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2703)*

**Returns:** *object*

* **bodyA**: *[Body](body.md)*

* **bodyB**: *[Body](body.md)*

* **collideConnected**: *boolean*

* **enableLimit**: *boolean*

* **enableMotor**: *boolean*

* **localAnchorA**: *[Vec2](vec2.md)*

* **localAnchorB**: *[Vec2](vec2.md)*

* **lowerAngle**: *number*

* **maxMotorTorque**: *number*

* **motorSpeed**: *number*

* **referenceAngle**: *number*

* **type**: *"revolute-joint"*

* **upperAngle**: *number*

___

###  enableLimit

▸ **enableLimit**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2771](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2771)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2746](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2746)*

Enable/disable the joint motor.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2787](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2787)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2791](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2791)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:154](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L154)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:161](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L161)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:185](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L185)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [dist/planck.d.ts:2734](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2734)*

Get the current joint angle in radians.

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [dist/planck.d.ts:2738](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2738)*

Get the current joint angle speed in radians per second.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2722](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2722)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2726](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2726)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [dist/planck.d.ts:2775](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2775)*

Get the lower joint limit in radians.

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [dist/planck.d.ts:2763](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2763)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [dist/planck.d.ts:2758](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2758)*

Get the motor speed in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: any): *number*

*Defined in [dist/planck.d.ts:2750](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2750)*

Get the current motor torque given the inverse time step. Unit is N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:168](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L168)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2795](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2795)*

Get the reaction force given the inverse time step. Unit is N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: any): *number*

*Overrides void*

*Defined in [dist/planck.d.ts:2800](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2800)*

Get the reaction torque due to the joint limit given the inverse time step.
Unit is N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dist/planck.d.ts:2730](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2730)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:147](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L147)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [dist/planck.d.ts:2779](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2779)*

Get the upper joint limit in radians.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:172](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L172)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2801](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2801)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:140](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L140)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:2767](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2767)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:2742](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2742)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: any, `upper`: any): *void*

*Defined in [dist/planck.d.ts:2783](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2783)*

Set the joint limits in radians.

**Parameters:**

Name | Type |
------ | ------ |
`lower` | any |
`upper` | any |

**Returns:** *void*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: any): *void*

*Defined in [dist/planck.d.ts:2762](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2762)*

Set the maximum motor torque, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | any |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: any): *void*

*Defined in [dist/planck.d.ts:2754](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2754)*

Set the motor speed in radians per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:212](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Joint.ts#L212)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2806](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2806)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2802](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2802)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[RevoluteJoint](revolutejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2718](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2718)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[RevoluteJoint](revolutejoint.md)*
