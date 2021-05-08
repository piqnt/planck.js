[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJoint](frictionjoint.md)

# Class: FrictionJoint

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

**`param`** Anchor in global coordination.

## Hierarchy

* [Joint](joint.md)

  ↳ **FrictionJoint**

## Index

### Constructors

* [constructor](frictionjoint.md#constructor)

### Properties

* [TYPE](frictionjoint.md#static-type)

### Methods

* [getAnchorA](frictionjoint.md#getanchora)
* [getAnchorB](frictionjoint.md#getanchorb)
* [getBodyA](frictionjoint.md#getbodya)
* [getBodyB](frictionjoint.md#getbodyb)
* [getCollideConnected](frictionjoint.md#getcollideconnected)
* [getLocalAnchorA](frictionjoint.md#getlocalanchora)
* [getLocalAnchorB](frictionjoint.md#getlocalanchorb)
* [getMaxForce](frictionjoint.md#getmaxforce)
* [getMaxTorque](frictionjoint.md#getmaxtorque)
* [getNext](frictionjoint.md#getnext)
* [getReactionForce](frictionjoint.md#getreactionforce)
* [getReactionTorque](frictionjoint.md#getreactiontorque)
* [getType](frictionjoint.md#gettype)
* [getUserData](frictionjoint.md#getuserdata)
* [initVelocityConstraints](frictionjoint.md#initvelocityconstraints)
* [isActive](frictionjoint.md#isactive)
* [setMaxForce](frictionjoint.md#setmaxforce)
* [setMaxTorque](frictionjoint.md#setmaxtorque)
* [setUserData](frictionjoint.md#setuserdata)
* [shiftOrigin](frictionjoint.md#shiftorigin)
* [solvePositionConstraints](frictionjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](frictionjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:99](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:101](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](../interfaces/frictionjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"friction-joint"* = 'friction-joint' as 'friction-joint'

*Defined in [src/dynamics/joint/FrictionJoint.ts:78](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L78)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:238](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L238)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:245](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L245)*

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

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/FrictionJoint.ts:194](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L194)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/FrictionJoint.ts:201](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L201)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [src/dynamics/joint/FrictionJoint.ts:216](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L216)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [src/dynamics/joint/FrictionJoint.ts:231](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L231)*

Get the maximum friction torque in N*m.

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:252](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L252)*

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:259](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L259)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:263](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L263)*

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

###  setMaxForce

▸ **setMaxForce**(`force`: any): *void*

*Defined in [src/dynamics/joint/FrictionJoint.ts:208](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L208)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: any): *void*

*Defined in [src/dynamics/joint/FrictionJoint.ts:223](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L223)*

Set the maximum friction torque in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | any |

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:396](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L396)*

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

*Defined in [src/dynamics/joint/FrictionJoint.ts:336](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/FrictionJoint.ts#L336)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
