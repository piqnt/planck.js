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

* [MIN_PULLEY_LENGTH](pulleyjoint.md#static-min_pulley_length)
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

*Defined in [src/dynamics/joint/PulleyJoint.ts:121](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:123](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L123)*

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

### `Static` MIN_PULLEY_LENGTH

▪ **MIN_PULLEY_LENGTH**: *number* = 2

*Defined in [src/dynamics/joint/PulleyJoint.ts:98](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L98)*

___

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"* = 'pulley-joint' as 'pulley-joint'

*Defined in [src/dynamics/joint/PulleyJoint.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L97)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [src/dynamics/joint/PulleyJoint.ts:178](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L178)*

**Returns:** *object*

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:271](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L271)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:278](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L278)*

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

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:243](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L243)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:252](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L252)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:208](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L208)*

Get the first ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:215](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L215)*

Get the second ground anchor.

**Returns:** *[Vec2](vec2.md)*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:222](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L222)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:229](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L229)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:173](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L173)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:236](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L236)*

Get the pulley ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:285](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L285)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:292](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L292)*

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

*Defined in [src/dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L152)*

Get the type of the concrete joint.

**Returns:** *string*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:296](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L296)*

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

*Overrides [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:263](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L263)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:406](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L406)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:376](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PulleyJoint.ts#L376)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
