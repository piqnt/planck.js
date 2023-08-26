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

## Properties

### `Static` TYPE

▪ **TYPE**: *"rope-joint"* = 'rope-joint' as const

*Defined in [src/dynamics/joint/RopeJoint.ts:89](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L89)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/RopeJoint.ts:206](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L206)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

###  getAnchorB

▸ **getAnchorB**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/RopeJoint.ts:213](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L213)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:145](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L145)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:152](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L152)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:176](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L176)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getLimitState

▸ **getLimitState**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:198](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L198)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *Vec2*

*Defined in [src/dynamics/joint/RopeJoint.ts:173](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L173)*

The local anchor point relative to bodyA's origin.

**Returns:** *Vec2*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *Vec2*

*Defined in [src/dynamics/joint/RopeJoint.ts:180](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L180)*

The local anchor point relative to bodyB's origin.

**Returns:** *Vec2*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [src/dynamics/joint/RopeJoint.ts:194](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L194)*

Get the maximum length of the rope.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:159](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L159)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/RopeJoint.ts:220](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L220)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *Vec2*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](joint.md).[getReactionTorque](joint.md#abstract-getreactiontorque)*

*Defined in [src/dynamics/joint/RopeJoint.ts:227](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L227)*

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

*Defined in [src/dynamics/Joint.ts:138](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L138)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L163)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

*Defined in [src/dynamics/joint/RopeJoint.ts:231](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:131](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L131)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setMaxLength

▸ **setMaxLength**(`length`: number): *void*

*Defined in [src/dynamics/joint/RopeJoint.ts:187](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L187)*

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

*Defined in [src/dynamics/Joint.ts:167](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:203](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L203)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

*Defined in [src/dynamics/joint/RopeJoint.ts:342](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L342)*

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

*Defined in [src/dynamics/joint/RopeJoint.ts:305](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/RopeJoint.ts#L305)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
