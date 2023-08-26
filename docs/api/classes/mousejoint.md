[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJoint](mousejoint.md)

# Class: MouseJoint

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

You need to call setTarget(target) every time that mouse is
moved, to track the new location of the mouse.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

## Hierarchy

* [Joint](joint.md)

  ↳ **MouseJoint**

## Index

### Constructors

* [constructor](mousejoint.md#constructor)

### Properties

* [TYPE](mousejoint.md#static-type)

### Methods

* [getAnchorA](mousejoint.md#getanchora)
* [getAnchorB](mousejoint.md#getanchorb)
* [getBodyA](mousejoint.md#getbodya)
* [getBodyB](mousejoint.md#getbodyb)
* [getCollideConnected](mousejoint.md#getcollideconnected)
* [getDampingRatio](mousejoint.md#getdampingratio)
* [getFrequency](mousejoint.md#getfrequency)
* [getMaxForce](mousejoint.md#getmaxforce)
* [getNext](mousejoint.md#getnext)
* [getReactionForce](mousejoint.md#getreactionforce)
* [getReactionTorque](mousejoint.md#getreactiontorque)
* [getTarget](mousejoint.md#gettarget)
* [getType](mousejoint.md#gettype)
* [getUserData](mousejoint.md#getuserdata)
* [initVelocityConstraints](mousejoint.md#initvelocityconstraints)
* [isActive](mousejoint.md#isactive)
* [setDampingRatio](mousejoint.md#setdampingratio)
* [setFrequency](mousejoint.md#setfrequency)
* [setMaxForce](mousejoint.md#setmaxforce)
* [setTarget](mousejoint.md#settarget)
* [setUserData](mousejoint.md#setuserdata)
* [shiftOrigin](mousejoint.md#shiftorigin)
* [solvePositionConstraints](mousejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](mousejoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new MouseJoint**(`def`: [MouseJointDef](../interfaces/mousejointdef.md)): *[MouseJoint](mousejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2Value](../interfaces/vec2value.md)): *[MouseJoint](mousejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"mouse-joint"* = 'mouse-joint' as const

## Methods

###  getAnchorA

▸ **getAnchorA**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

###  getAnchorB

▸ **getAnchorB**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

Get the first body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

Get the second body attached to this joint.

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

Get the damping ratio (dimensionless).

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

Get the frequency in Hertz.

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

Get the maximum force in Newtons.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md)*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

Get the next joint the world joint list.

**Returns:** *[Joint](joint.md)*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *Vec2*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

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

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getTarget

▸ **getTarget**(): *Vec2*

**Returns:** *Vec2*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](timestep.md)): *void*

*Overrides [Joint](joint.md).[initVelocityConstraints](joint.md#abstract-initvelocityconstraints)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

Set the damping ratio (dimensionless).

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

Set the frequency in Hertz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

Set the maximum force in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: [Vec2Value](../interfaces/vec2value.md)): *void*

Use this to update the target point.

**Parameters:**

Name | Type |
------ | ------ |
`target` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](../interfaces/vec2value.md)): *void*

*Overrides [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](timestep.md)): *boolean*

*Overrides [Joint](joint.md).[solvePositionConstraints](joint.md#abstract-solvepositionconstraints)*

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

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
