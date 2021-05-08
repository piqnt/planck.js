[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJoint](ropejoint.md)

# Class: RopeJoint

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

## Hierarchy

* [Joint](joint.md)

  ↳ **RopeJoint**

## Index

### Constructors

* [constructor](ropejoint.md#constructor)

### Properties

* [TYPE](ropejoint.md#static-type)

### Methods

* [getAnchorA](ropejoint.md#getanchora)
* [getAnchorB](ropejoint.md#getanchorb)
* [getBodyA](ropejoint.md#getbodya)
* [getBodyB](ropejoint.md#getbodyb)
* [getCollideConnected](ropejoint.md#getcollideconnected)
* [getLimitState](ropejoint.md#getlimitstate)
* [getLocalAnchorA](ropejoint.md#getlocalanchora)
* [getLocalAnchorB](ropejoint.md#getlocalanchorb)
* [getMaxLength](ropejoint.md#getmaxlength)
* [getNext](ropejoint.md#getnext)
* [getReactionForce](ropejoint.md#getreactionforce)
* [getReactionTorque](ropejoint.md#getreactiontorque)
* [getType](ropejoint.md#gettype)
* [getUserData](ropejoint.md#getuserdata)
* [initVelocityConstraints](ropejoint.md#initvelocityconstraints)
* [isActive](ropejoint.md#isactive)
* [setMaxLength](ropejoint.md#setmaxlength)
* [setUserData](ropejoint.md#setuserdata)
* [shiftOrigin](ropejoint.md#shiftorigin)
* [solvePositionConstraints](ropejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](ropejoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new RopeJoint**(`def`: [RopeJointDef](../interfaces/ropejointdef.md)): *[RopeJoint](ropejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/RopeJoint.ts:105](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/RopeJoint.ts:107](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](../interfaces/ropejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"rope-joint"* = 'rope-joint' as 'rope-joint'

*Defined in [src/dynamics/joint/RopeJoint.ts:83](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L83)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/RopeJoint.ts:211](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L211)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)‹›*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/RopeJoint.ts:218](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L218)*

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

###  getLimitState

▸ **getLimitState**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:203](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L203)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/RopeJoint.ts:178](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L178)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)‹›*

*Defined in [src/dynamics/joint/RopeJoint.ts:185](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L185)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:199](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L199)*

Get the maximum length of the rope.

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

*Defined in [src/dynamics/joint/RopeJoint.ts:225](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L225)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:232](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L232)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:236](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L236)*

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

###  setMaxLength

▸ **setMaxLength**(`length`: any): *void*

*Defined in [src/dynamics/joint/RopeJoint.ts:192](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L192)*

Set the maximum length of the rope.

**Parameters:**

Name | Type |
------ | ------ |
`length` | any |

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

*Defined in [src/dynamics/joint/RopeJoint.ts:348](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L348)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:311](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/joint/RopeJoint.ts#L311)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
