[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJoint](prismaticjoint.md)

# Class: PrismaticJoint

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

## Hierarchy

* [Joint](joint.md)

  ↳ **PrismaticJoint**

## Index

### Constructors

* [constructor](prismaticjoint.md#constructor)

### Properties

* [TYPE](prismaticjoint.md#static-type)

### Methods

* [enableLimit](prismaticjoint.md#enablelimit)
* [enableMotor](prismaticjoint.md#enablemotor)
* [getAnchorA](prismaticjoint.md#getanchora)
* [getAnchorB](prismaticjoint.md#getanchorb)
* [getBodyA](prismaticjoint.md#getbodya)
* [getBodyB](prismaticjoint.md#getbodyb)
* [getCollideConnected](prismaticjoint.md#getcollideconnected)
* [getJointSpeed](prismaticjoint.md#getjointspeed)
* [getJointTranslation](prismaticjoint.md#getjointtranslation)
* [getLocalAnchorA](prismaticjoint.md#getlocalanchora)
* [getLocalAnchorB](prismaticjoint.md#getlocalanchorb)
* [getLocalAxisA](prismaticjoint.md#getlocalaxisa)
* [getLowerLimit](prismaticjoint.md#getlowerlimit)
* [getMaxMotorForce](prismaticjoint.md#getmaxmotorforce)
* [getMotorForce](prismaticjoint.md#getmotorforce)
* [getMotorSpeed](prismaticjoint.md#getmotorspeed)
* [getNext](prismaticjoint.md#getnext)
* [getReactionForce](prismaticjoint.md#getreactionforce)
* [getReactionTorque](prismaticjoint.md#getreactiontorque)
* [getReferenceAngle](prismaticjoint.md#getreferenceangle)
* [getType](prismaticjoint.md#gettype)
* [getUpperLimit](prismaticjoint.md#getupperlimit)
* [getUserData](prismaticjoint.md#getuserdata)
* [initVelocityConstraints](prismaticjoint.md#initvelocityconstraints)
* [isActive](prismaticjoint.md#isactive)
* [isLimitEnabled](prismaticjoint.md#islimitenabled)
* [isMotorEnabled](prismaticjoint.md#ismotorenabled)
* [setLimits](prismaticjoint.md#setlimits)
* [setMaxMotorForce](prismaticjoint.md#setmaxmotorforce)
* [setMotorSpeed](prismaticjoint.md#setmotorspeed)
* [setUserData](prismaticjoint.md#setuserdata)
* [shiftOrigin](prismaticjoint.md#shiftorigin)
* [solvePositionConstraints](prismaticjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](prismaticjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/PrismaticJoint.ts:162](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/PrismaticJoint.ts:164](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](../interfaces/prismaticjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"prismatic-joint"* = 'prismatic-joint' as const

*Defined in [dynamics/joint/PrismaticJoint.ts:131](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L131)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [dynamics/joint/PrismaticJoint.ts:410](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L410)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [dynamics/joint/PrismaticJoint.ts:457](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L457)*

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

*Defined in [dynamics/joint/PrismaticJoint.ts:505](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L505)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/PrismaticJoint.ts:512](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L512)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:379](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L379)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:366](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L366)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/PrismaticJoint.ts:338](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L338)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/PrismaticJoint.ts:345](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L345)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/PrismaticJoint.ts:352](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L352)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:422](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L422)*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:484](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L484)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:498](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L498)*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:491](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L491)*

Get the motor speed, usually in meters per second.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [dynamics/joint/PrismaticJoint.ts:519](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L519)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [dynamics/joint/PrismaticJoint.ts:526](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L526)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:359](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L359)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [dynamics/joint/PrismaticJoint.ts:429](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L429)*

Get the upper joint limit, usually in meters.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [dynamics/joint/PrismaticJoint.ts:530](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L530)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [dynamics/joint/PrismaticJoint.ts:403](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L403)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [dynamics/joint/PrismaticJoint.ts:450](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L450)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [dynamics/joint/PrismaticJoint.ts:436](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L436)*

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

*Defined in [dynamics/joint/PrismaticJoint.ts:477](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L477)*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [dynamics/joint/PrismaticJoint.ts:467](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L467)*

Set the motor speed, usually in meters per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L203)*

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

*Defined in [dynamics/joint/PrismaticJoint.ts:762](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L762)*

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

*Defined in [dynamics/joint/PrismaticJoint.ts:662](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/PrismaticJoint.ts#L662)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
