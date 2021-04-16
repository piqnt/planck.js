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

*Defined in [dist/planck.d.ts:2869](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2869)*

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

*Defined in [dist/planck.d.ts:2870](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2870)*

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

* [_serialize](prismaticjoint.md#_serialize)
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
* [_deserialize](prismaticjoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2878](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2878)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2879](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2879)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:156](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | PrismaticJointDef |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: PrismaticJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2, `axis`: Vec2): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:158](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L158)*

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

*Defined in [dist/planck.d.ts:2878](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2878)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:125](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L125)*

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

*Defined in [dist/planck.d.ts:2881](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2881)*

**Returns:** *object*

* **bodyA**: *[Body](body.md)*

* **bodyB**: *[Body](body.md)*

* **collideConnected**: *boolean*

* **enableLimit**: *boolean*

* **enableMotor**: *boolean*

* **localAnchorA**: *[Vec2](vec2.md)*

* **localAnchorB**: *[Vec2](vec2.md)*

* **localAxisA**: *[Vec2](vec2.md)*

* **lowerTranslation**: *number*

* **maxMotorForce**: *number*

* **motorSpeed**: *number*

* **referenceAngle**: *number*

* **type**: *"prismatic-joint"*

* **upperTranslation**: *number*

___

###  enableLimit

▸ **enableLimit**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2929](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2929)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | any |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: any): *void*

*Defined in [dist/planck.d.ts:2949](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2949)*

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

*Defined in [dist/planck.d.ts:2970](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2970)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2974](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2974)*

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

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [dist/planck.d.ts:2921](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2921)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [dist/planck.d.ts:2917](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2917)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2901](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2901)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2905](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2905)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2909](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2909)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [dist/planck.d.ts:2933](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2933)*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

*Defined in [dist/planck.d.ts:2958](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2958)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: any): *number*

*Defined in [dist/planck.d.ts:2966](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2966)*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [dist/planck.d.ts:2962](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2962)*

Get the motor speed, usually in meters per second.

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

*Defined in [dist/planck.d.ts:2978](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2978)*

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

*Defined in [dist/planck.d.ts:2982](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2982)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dist/planck.d.ts:2913](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2913)*

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

*Defined in [dist/planck.d.ts:2937](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2937)*

Get the upper joint limit, usually in meters.

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

*Defined in [dist/planck.d.ts:2983](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2983)*

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

*Defined in [dist/planck.d.ts:2925](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2925)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:2945](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2945)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: any, `upper`: any): *void*

*Defined in [dist/planck.d.ts:2941](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2941)*

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

*Defined in [dist/planck.d.ts:2957](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2957)*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: any): *void*

*Defined in [dist/planck.d.ts:2953](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2953)*

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

*Defined in [dist/planck.d.ts:2988](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2988)*

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

*Defined in [dist/planck.d.ts:2984](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2984)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[PrismaticJoint](prismaticjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2897](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2897)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*
