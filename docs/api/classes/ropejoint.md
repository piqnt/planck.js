[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJoint](ropejoint.md)

# Class: RopeJoint

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See [DistanceJoint](distancejoint.md) if you
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

*Defined in [src/dynamics/joint/RopeJoint.ts:105](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/RopeJoint.ts:107](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L107)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:83](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L83)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/RopeJoint.ts:212](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L212)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/RopeJoint.ts:219](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L219)*

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

###  getLimitState

▸ **getLimitState**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:204](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L204)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/RopeJoint.ts:179](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L179)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/RopeJoint.ts:186](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L186)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:200](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L200)*

Get the maximum length of the rope.

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

*Defined in [src/dynamics/joint/RopeJoint.ts:226](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L226)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:233](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L233)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:237](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L237)*

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

###  setMaxLength

▸ **setMaxLength**(`length`: number): *void*

*Defined in [src/dynamics/joint/RopeJoint.ts:193](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L193)*

Set the maximum length of the rope.

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

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

*Defined in [src/dynamics/joint/RopeJoint.ts:349](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L349)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:312](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/RopeJoint.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
