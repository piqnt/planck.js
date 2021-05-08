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
* [_deserialize](pulleyjoint.md#static-_deserialize)

## Constructors

###  constructor

\+ **new PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:120](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:122](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L122)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:97](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L97)*

___

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"* = 'pulley-joint' as 'pulley-joint'

*Defined in [src/dynamics/joint/PulleyJoint.ts:96](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L96)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [src/dynamics/joint/PulleyJoint.ts:177](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L177)*

**Returns:** *object*

* **bodyA**: *[Body](body.md)‹›* = this.m_bodyA

* **bodyB**: *[Body](body.md)‹›* = this.m_bodyB

* **collideConnected**: *boolean* = this.m_collideConnected

* **groundAnchorA**: *[Vec2](vec2.md)‹›* = this.m_groundAnchorA

* **groundAnchorB**: *[Vec2](vec2.md)‹›* = this.m_groundAnchorB

* **lengthA**: *number* = this.m_lengthA

* **lengthB**: *number* = this.m_lengthB

* **localAnchorA**: *[Vec2](vec2.md)‹›* = this.m_localAnchorA

* **localAnchorB**: *[Vec2](vec2.md)‹›* = this.m_localAnchorB

* **ratio**: *number* = this.m_ratio

* **type**: *"pulley-joint"* = this.m_type

___

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:268](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L268)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:275](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L275)*

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

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:240](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L240)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:249](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L249)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/PulleyJoint.ts:205](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L205)*

Get the first ground anchor.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/PulleyJoint.ts:212](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L212)*

Get the second ground anchor.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:219](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L219)*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:226](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L226)*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)‹›*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:171](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Joint.ts#L171)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)‹›*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [src/dynamics/joint/PulleyJoint.ts:233](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L233)*

Get the pulley ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:282](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L282)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:289](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L289)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:293](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L293)*

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

▸ **shiftOrigin**(`newOrigin`: any): *void*

*Overrides [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:260](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L260)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | any |   |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [src/dynamics/joint/PulleyJoint.ts:403](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L403)*

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

*Defined in [src/dynamics/joint/PulleyJoint.ts:373](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L373)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[PulleyJoint](pulleyjoint.md)‹›*

*Overrides void*

*Defined in [src/dynamics/joint/PulleyJoint.ts:194](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/PulleyJoint.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[PulleyJoint](pulleyjoint.md)‹›*
