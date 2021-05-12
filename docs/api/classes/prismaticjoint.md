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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:156](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:158](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L158)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:125](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L125)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:403](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L403)*

Enable/disable the joint limit.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:450](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L450)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:495](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L495)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:502](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L502)*

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

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:372](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L372)*

Get the current joint translation speed, usually in meters per second.

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:359](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L359)*

Get the current joint translation, usually in meters.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:331](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L331)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:338](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L338)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:345](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L345)*

The local joint axis relative to bodyA.

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:415](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L415)*

Get the lower joint limit, usually in meters.

**Returns:** *number*

___

###  getMaxMotorForce

▸ **getMaxMotorForce**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:474](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L474)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:488](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L488)*

Get the current motor force given the inverse time step, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:481](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L481)*

Get the motor speed, usually in meters per second.

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:509](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L509)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:516](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L516)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:352](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L352)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:422](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L422)*

Get the upper joint limit, usually in meters.

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:520](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L520)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:396](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L396)*

Is the joint limit enabled?

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:443](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L443)*

Is the joint motor enabled?

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:429](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L429)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:468](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L468)*

Set the maximum motor force, usually in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:459](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L459)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:752](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L752)*

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

*Defined in [src/dynamics/joint/PrismaticJoint.ts:652](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L652)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
