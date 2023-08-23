[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJoint](pulleyjoint.md)

# Class: PulleyJoint

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

## Hierarchy

* [Joint](joint.md)

  ↳ **PulleyJoint**

## Index

### Constructors

* [constructor](pulleyjoint.md#constructor)

### Properties

* [TYPE](pulleyjoint.md#static-type)

### Methods

* [_serialize](pulleyjoint.md#_serialize)
* [getAnchorA](pulleyjoint.md#getanchora)
* [getAnchorB](pulleyjoint.md#getanchorb)
* [getBodyA](pulleyjoint.md#getbodya)
* [getBodyB](pulleyjoint.md#getbodyb)
* [getCollideConnected](pulleyjoint.md#getcollideconnected)
* [getCurrentLengthA](pulleyjoint.md#getcurrentlengtha)
* [getCurrentLengthB](pulleyjoint.md#getcurrentlengthb)
* [getGroundAnchorA](pulleyjoint.md#getgroundanchora)
* [getGroundAnchorB](pulleyjoint.md#getgroundanchorb)
* [getLengthA](pulleyjoint.md#getlengtha)
* [getLengthB](pulleyjoint.md#getlengthb)
* [getNext](pulleyjoint.md#getnext)
* [getRatio](pulleyjoint.md#getratio)
* [getReactionForce](pulleyjoint.md#getreactionforce)
* [getReactionTorque](pulleyjoint.md#getreactiontorque)
* [getType](pulleyjoint.md#gettype)
* [getUserData](pulleyjoint.md#getuserdata)
* [initVelocityConstraints](pulleyjoint.md#initvelocityconstraints)
* [isActive](pulleyjoint.md#isactive)
* [setUserData](pulleyjoint.md#setuserdata)
* [shiftOrigin](pulleyjoint.md#shiftorigin)
* [solvePositionConstraints](pulleyjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](pulleyjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/PulleyJoint.ts:123](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [dynamics/joint/PulleyJoint.ts:125](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](../interfaces/pulleyjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`groundA` | [Vec2](vec2.md) |
`groundB` | [Vec2](vec2.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"* = 'pulley-joint' as const

*Defined in [dynamics/joint/PulleyJoint.ts:98](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L98)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Defined in [dynamics/joint/PulleyJoint.ts:167](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L167)*

**Returns:** *object*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [dynamics/joint/PulleyJoint.ts:259](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L259)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [dynamics/joint/PulleyJoint.ts:266](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L266)*

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

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [dynamics/joint/PulleyJoint.ts:231](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L231)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [dynamics/joint/PulleyJoint.ts:240](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L240)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:196](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L196)*

Get the first ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dynamics/joint/PulleyJoint.ts:203](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L203)*

Get the second ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [dynamics/joint/PulleyJoint.ts:210](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L210)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [dynamics/joint/PulleyJoint.ts:217](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L217)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [dynamics/joint/PulleyJoint.ts:224](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L224)*

Get the pulley ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [dynamics/joint/PulleyJoint.ts:273](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L273)*

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

*Defined in [dynamics/joint/PulleyJoint.ts:280](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L280)*

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

*Defined in [dynamics/joint/PulleyJoint.ts:284](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L284)*

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

*Overrides [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [dynamics/joint/PulleyJoint.ts:251](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L251)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2](vec2.md) |   |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [dynamics/joint/PulleyJoint.ts:394](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L394)*

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

*Defined in [dynamics/joint/PulleyJoint.ts:364](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/PulleyJoint.ts#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
