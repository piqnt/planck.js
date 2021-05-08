[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJoint](wheeljoint.md)

# Class: WheelJoint

A wheel joint. This joint provides two degrees of freedom: translation along
an axis fixed in bodyA and rotation in the plane. In other words, it is a
point to line constraint with a rotational motor and a linear spring/damper.
This joint is designed for vehicle suspensions.

## Hierarchy

* [Joint](joint.md)

  ↳ **WheelJoint**

## Index

### Constructors

* [constructor](wheeljoint.md#constructor)

### Properties

* [TYPE](wheeljoint.md#static-type)

### Methods

* [enableMotor](wheeljoint.md#enablemotor)
* [getAnchorA](wheeljoint.md#getanchora)
* [getAnchorB](wheeljoint.md#getanchorb)
* [getBodyA](wheeljoint.md#getbodya)
* [getBodyB](wheeljoint.md#getbodyb)
* [getCollideConnected](wheeljoint.md#getcollideconnected)
* [getJointSpeed](wheeljoint.md#getjointspeed)
* [getJointTranslation](wheeljoint.md#getjointtranslation)
* [getLocalAnchorA](wheeljoint.md#getlocalanchora)
* [getLocalAnchorB](wheeljoint.md#getlocalanchorb)
* [getLocalAxisA](wheeljoint.md#getlocalaxisa)
* [getMaxMotorTorque](wheeljoint.md#getmaxmotortorque)
* [getMotorSpeed](wheeljoint.md#getmotorspeed)
* [getMotorTorque](wheeljoint.md#getmotortorque)
* [getNext](wheeljoint.md#getnext)
* [getReactionForce](wheeljoint.md#getreactionforce)
* [getReactionTorque](wheeljoint.md#getreactiontorque)
* [getSpringDampingRatio](wheeljoint.md#getspringdampingratio)
* [getSpringFrequencyHz](wheeljoint.md#getspringfrequencyhz)
* [getType](wheeljoint.md#gettype)
* [getUserData](wheeljoint.md#getuserdata)
* [initVelocityConstraints](wheeljoint.md#initvelocityconstraints)
* [isActive](wheeljoint.md#isactive)
* [isMotorEnabled](wheeljoint.md#ismotorenabled)
* [setMaxMotorTorque](wheeljoint.md#setmaxmotortorque)
* [setMotorSpeed](wheeljoint.md#setmotorspeed)
* [setSpringDampingRatio](wheeljoint.md#setspringdampingratio)
* [setSpringFrequencyHz](wheeljoint.md#setspringfrequencyhz)
* [setUserData](wheeljoint.md#setuserdata)
* [shiftOrigin](wheeljoint.md#shiftorigin)
* [solvePositionConstraints](wheeljoint.md#solvepositionconstraints)
* [solveVelocityConstraints](wheeljoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new WheelJoint**(`def`: [WheelJointDef](../interfaces/wheeljointdef.md)): *[WheelJoint](wheeljoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/WheelJoint.ts:141](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointDef](../interfaces/wheeljointdef.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

\+ **new WheelJoint**(`def`: [WheelJointOpt](../interfaces/wheeljointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[WheelJoint](wheeljoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/WheelJoint.ts:143](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointOpt](../interfaces/wheeljointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"wheel-joint"* = 'wheel-joint' as 'wheel-joint'

*Defined in [src/dynamics/joint/WheelJoint.ts:103](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L103)*

## Methods

###  enableMotor

▸ **enableMotor**(`flag`: any): *void*

*Defined in [src/dynamics/joint/WheelJoint.ts:321](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L321)*

Enable/disable the joint motor.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/WheelJoint.ts:389](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L389)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/WheelJoint.ts:396](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L396)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:157](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L157)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:164](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L164)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:188](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L188)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:305](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L305)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:289](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L289)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/WheelJoint.ts:268](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L268)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/WheelJoint.ts:275](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L275)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/WheelJoint.ts:282](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L282)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:352](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L352)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:339](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L339)*

Get the motor speed, usually in radians per second.

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: any): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:359](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L359)*

Get the current motor torque given the inverse time step, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:171](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L171)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/WheelJoint.ts:403](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L403)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: any): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [src/dynamics/joint/WheelJoint.ts:410](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L410)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getSpringDampingRatio

▸ **getSpringDampingRatio**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:382](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L382)*

**Returns:** *number*

___

###  getSpringFrequencyHz

▸ **getSpringFrequencyHz**(): *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:371](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L371)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:150](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L150)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:175](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L175)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/WheelJoint.ts:414](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L414)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:143](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L143)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [src/dynamics/joint/WheelJoint.ts:314](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L314)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: any): *void*

*Defined in [src/dynamics/joint/WheelJoint.ts:346](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L346)*

Set/Get the maximum motor force, usually in N-m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | any |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: any): *void*

*Defined in [src/dynamics/joint/WheelJoint.ts:330](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L330)*

Set the motor speed, usually in radians per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | any |

**Returns:** *void*

___

###  setSpringDampingRatio

▸ **setSpringDampingRatio**(`ratio`: any): *void*

*Defined in [src/dynamics/joint/WheelJoint.ts:378](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L378)*

Set/Get the spring damping ratio

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | any |

**Returns:** *void*

___

###  setSpringFrequencyHz

▸ **setSpringFrequencyHz**(`hz`: any): *void*

*Defined in [src/dynamics/joint/WheelJoint.ts:367](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L367)*

Set/Get the spring frequency in hertz. Setting the frequency to zero disables
the spring.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:179](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:215](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L215)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [src/dynamics/joint/WheelJoint.ts:616](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L616)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[solveVelocityConstraints](joint.md#abstract-solvevelocityconstraints)*

*Defined in [src/dynamics/joint/WheelJoint.ts:544](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/WheelJoint.ts#L544)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
