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
* [TYPES](prismaticjoint.md#static-types)

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:156](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:158](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L158)*

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

▪ **TYPE**: *"prismatic-joint"* = 'prismatic-joint' as 'prismatic-joint'

*Defined in [src/dynamics/joint/PrismaticJoint.ts:125](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L125)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Joint](joint.md).[TYPES](joint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: any): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:409](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L409)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: any): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:456](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L456)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:501](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L501)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:508](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L508)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)‹›*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:378](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L378)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:365](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L365)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:337](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L337)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:344](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L344)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:351](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L351)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:421](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L421)*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:480](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L480)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: any): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:494](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L494)*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:487](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L487)*

Get the motor speed, usually in meters per second.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:515](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L515)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:522](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L522)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:358](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L358)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:428](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L428)*

Get the upper joint limit, usually in meters.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:526](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L526)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:402](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L402)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:449](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L449)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: any, `upper`: any): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:435](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L435)*

Set the joint limits, usually in meters.

**Parameters:**

Name | Type |
------ | ------ |
`lower` | any |
`upper` | any |

**Returns:** *void*

___

###  setMaxMotorForce

▸ **setMaxMotorForce**(`force`: any): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:474](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L474)*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: any): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:465](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L465)*

Set the motor speed, usually in meters per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L214)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:756](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L756)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:656](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/joint/PrismaticJoint.ts#L656)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
