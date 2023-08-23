[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WeldJoint](weldjoint.md)

# Class: WeldJoint

A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.

## Hierarchy

* [Joint](joint.md)

  ↳ **WeldJoint**

## Index

### Constructors

* [constructor](weldjoint.md#constructor)

### Properties

* [TYPE](weldjoint.md#static-type)

### Methods

* [getAnchorA](weldjoint.md#getanchora)
* [getAnchorB](weldjoint.md#getanchorb)
* [getBodyA](weldjoint.md#getbodya)
* [getBodyB](weldjoint.md#getbodyb)
* [getCollideConnected](weldjoint.md#getcollideconnected)
* [getDampingRatio](weldjoint.md#getdampingratio)
* [getFrequency](weldjoint.md#getfrequency)
* [getLocalAnchorA](weldjoint.md#getlocalanchora)
* [getLocalAnchorB](weldjoint.md#getlocalanchorb)
* [getNext](weldjoint.md#getnext)
* [getReactionForce](weldjoint.md#getreactionforce)
* [getReactionTorque](weldjoint.md#getreactiontorque)
* [getReferenceAngle](weldjoint.md#getreferenceangle)
* [getType](weldjoint.md#gettype)
* [getUserData](weldjoint.md#getuserdata)
* [initVelocityConstraints](weldjoint.md#initvelocityconstraints)
* [isActive](weldjoint.md#isactive)
* [setDampingRatio](weldjoint.md#setdampingratio)
* [setFrequency](weldjoint.md#setfrequency)
* [setUserData](weldjoint.md#setuserdata)
* [shiftOrigin](weldjoint.md#shiftorigin)
* [solvePositionConstraints](weldjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](weldjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new WeldJoint**(`def`: [WeldJointDef](../interfaces/weldjointdef.md)): *[WeldJoint](weldjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/WeldJoint.ts:118](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](../interfaces/weldjointdef.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

\+ **new WeldJoint**(`def`: [WeldJointOpt](../interfaces/weldjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[WeldJoint](weldjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/WeldJoint.ts:120](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](../interfaces/weldjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"weld-joint"* = 'weld-joint' as const

*Defined in [dynamics/joint/WeldJoint.ts:94](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L94)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [dynamics/joint/WeldJoint.ts:271](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L271)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/WeldJoint.ts:278](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L278)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [dynamics/joint/WeldJoint.ts:264](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L264)*

Get damping ratio.

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [dynamics/joint/WeldJoint.ts:250](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L250)*

Get frequency in Hz.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/WeldJoint.ts:222](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L222)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/WeldJoint.ts:229](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L229)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [dynamics/joint/WeldJoint.ts:285](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L285)*

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

*Defined in [dynamics/joint/WeldJoint.ts:292](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L292)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dynamics/joint/WeldJoint.ts:236](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L236)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [dynamics/joint/WeldJoint.ts:296](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [dynamics/joint/WeldJoint.ts:257](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L257)*

Set damping ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [dynamics/joint/WeldJoint.ts:243](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L243)*

Set frequency in Hz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L203)*

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

*Defined in [dynamics/joint/WeldJoint.ts:466](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L466)*

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

*Defined in [dynamics/joint/WeldJoint.ts:402](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L402)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
