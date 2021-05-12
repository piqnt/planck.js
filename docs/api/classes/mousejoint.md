[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJoint](mousejoint.md)

# Class: MouseJoint

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

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

*Defined in [src/dynamics/joint/MouseJoint.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2](vec2.md)): *[MouseJoint](mousejoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/MouseJoint.ts:108](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2](vec2.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"mouse-joint"* = 'mouse-joint' as 'mouse-joint'

*Defined in [src/dynamics/joint/MouseJoint.ts:89](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L89)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/MouseJoint.ts:246](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L246)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/MouseJoint.ts:253](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L253)*

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

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:239](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L239)*

Get the damping ratio (dimensionless).

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:225](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L225)*

Get the frequency in Hertz.

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:211](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L211)*

Get the maximum force in Newtons.

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

*Defined in [src/dynamics/joint/MouseJoint.ts:260](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L260)*

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

*Defined in [src/dynamics/joint/MouseJoint.ts:267](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L267)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getTarget

▸ **getTarget**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/joint/MouseJoint.ts:197](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L197)*

**Returns:** *[Vec2](vec2.md)*

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

*Defined in [src/dynamics/joint/MouseJoint.ts:278](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L278)*

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

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [src/dynamics/joint/MouseJoint.ts:232](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L232)*

Set the damping ratio (dimensionless).

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [src/dynamics/joint/MouseJoint.ts:218](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L218)*

Set the frequency in Hertz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [src/dynamics/joint/MouseJoint.ts:204](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L204)*

Set the maximum force in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: [Vec2](vec2.md)): *void*

*Defined in [src/dynamics/joint/MouseJoint.ts:190](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L190)*

Use this to update the target point.

**Parameters:**

Name | Type |
------ | ------ |
`target` | [Vec2](vec2.md) |

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

*Overrides [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [src/dynamics/joint/MouseJoint.ts:274](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L274)*

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

*Defined in [src/dynamics/joint/MouseJoint.ts:384](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L384)*

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

*Defined in [src/dynamics/joint/MouseJoint.ts:353](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L353)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
