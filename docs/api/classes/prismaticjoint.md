[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJoint](prismaticjoint.md)

# Class: PrismaticJoint

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.
A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

## Hierarchy

* any

* Joint

  ↳ **PrismaticJoint**

## Callable

▸ **PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [dist/planck.d.ts:2765](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2765)*

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.
A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

▸ **PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [dist/planck.d.ts:2766](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2766)*

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.
A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](../interfaces/prismaticjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2774](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2774)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2775](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2775)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](../interfaces/prismaticjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: PrismaticJointDef): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:156](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/PrismaticJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | PrismaticJointDef |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: PrismaticJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2, `axis`: Vec2): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:158](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/PrismaticJoint.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | PrismaticJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchor` | Vec2 |
`axis` | Vec2 |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"prismatic-joint"* = 'prismatic-joint' as 'prismatic-joint'

*Defined in [dist/planck.d.ts:2774](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2774)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:125](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/PrismaticJoint.ts#L125)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2808](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2808)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2828](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2828)*

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

*Defined in [dist/planck.d.ts:2849](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2849)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2853](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2853)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [dist/planck.d.ts:2800](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2800)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [dist/planck.d.ts:2796](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2796)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2780](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2780)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2784](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2784)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2788](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2788)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [dist/planck.d.ts:2812](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2812)*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

*Defined in [dist/planck.d.ts:2837](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2837)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: any): *number*

*Defined in [dist/planck.d.ts:2845](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2845)*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [dist/planck.d.ts:2841](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2841)*

Get the motor speed, usually in meters per second.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2857](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2857)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: any): *number*

*Overrides void*

*Defined in [dist/planck.d.ts:2861](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2861)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dist/planck.d.ts:2792](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2792)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [dist/planck.d.ts:2816](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2816)*

Get the upper joint limit, usually in meters.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2862](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2862)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:2804](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2804)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:2824](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2824)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: any, `upper`: any): *void*

*Defined in [dist/planck.d.ts:2820](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2820)*

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

*Defined in [dist/planck.d.ts:2836](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2836)*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: any): *void*

*Defined in [dist/planck.d.ts:2832](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2832)*

Set the motor speed, usually in meters per second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L214)*

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

*Defined in [dist/planck.d.ts:2867](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2867)*

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

*Defined in [dist/planck.d.ts:2863](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2863)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
