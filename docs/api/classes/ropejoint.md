[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJoint](ropejoint.md)

# Class: RopeJoint

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.
A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

## Hierarchy

* any

* Joint

  ↳ **RopeJoint**

## Callable

▸ **RopeJoint**(`def`: [RopeJointDef](../interfaces/ropejointdef.md)): *[RopeJoint](ropejoint.md)*

*Defined in [dist/planck.d.ts:3309](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3309)*

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.
A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

▸ **RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Defined in [dist/planck.d.ts:3310](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3310)*

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.
A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See DistanceJoint if you
want to dynamically control length.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](../interfaces/ropejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

## Index

### Constructors

* [constructor](ropejoint.md#constructor)

### Properties

* [TYPE](ropejoint.md#static-type)
* [TYPES](ropejoint.md#static-types)

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

*Overrides void*

*Defined in [dist/planck.d.ts:3323](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3323)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3325](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3325)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](../interfaces/ropejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: RopeJointDef): *[RopeJoint](ropejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/RopeJoint.ts:105](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/RopeJoint.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | RopeJointDef |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: RopeJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2): *[RopeJoint](ropejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/RopeJoint.ts:107](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/RopeJoint.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | RopeJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchor` | Vec2 |

**Returns:** *[RopeJoint](ropejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"rope-joint"* = 'rope-joint' as 'rope-joint'

*Defined in [dist/planck.d.ts:3323](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3323)*

*Defined in [src/dynamics/joint/RopeJoint.ts:83](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/RopeJoint.ts#L83)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3347](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3347)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3351](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3351)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getLimitState

▸ **getLimitState**(): *number*

*Defined in [dist/planck.d.ts:3343](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3343)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3330](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3330)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3334](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3334)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [dist/planck.d.ts:3342](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3342)*

Get the maximum length of the rope.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3355](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3355)*

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

*Defined in [dist/planck.d.ts:3359](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3359)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3360](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3360)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setMaxLength

▸ **setMaxLength**(`length`: any): *void*

*Defined in [dist/planck.d.ts:3338](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3338)*

Set the maximum length of the rope.

**Parameters:**

Name | Type |
------ | ------ |
`length` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L214)*

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

*Defined in [dist/planck.d.ts:3365](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3365)*

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

*Defined in [dist/planck.d.ts:3361](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3361)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
