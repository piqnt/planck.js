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

*Defined in [dynamics/joint/FrictionJoint.ts:101](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/FrictionJoint.ts:103](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L103)*

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

▪ **TYPE**: *"friction-joint"* = 'friction-joint' as const

*Defined in [dynamics/joint/FrictionJoint.ts:78](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L78)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [dynamics/joint/FrictionJoint.ts:233](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L233)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/FrictionJoint.ts:240](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L240)*

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

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/FrictionJoint.ts:189](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L189)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/FrictionJoint.ts:196](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L196)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [dynamics/joint/FrictionJoint.ts:211](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L211)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [dynamics/joint/FrictionJoint.ts:226](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L226)*

Get the maximum friction torque in N*m.

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

*Defined in [dynamics/joint/FrictionJoint.ts:247](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L247)*

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

*Defined in [dynamics/joint/FrictionJoint.ts:254](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L254)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

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

*Defined in [dynamics/joint/FrictionJoint.ts:258](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L258)*

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

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [dynamics/joint/FrictionJoint.ts:203](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L203)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [dynamics/joint/FrictionJoint.ts:218](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L218)*

Set the maximum friction torque in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

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

*Defined in [dynamics/joint/FrictionJoint.ts:395](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L395)*

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

*Defined in [dynamics/joint/FrictionJoint.ts:334](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/FrictionJoint.ts#L334)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
