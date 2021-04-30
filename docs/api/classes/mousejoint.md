[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJoint](mousejoint.md)

# Class: MouseJoint

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.
A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

## Hierarchy

* any

* Joint

  ↳ **MouseJoint**

## Callable

▸ **MouseJoint**(`def`: [MouseJointDef](../interfaces/mousejointdef.md)): *[MouseJoint](mousejoint.md)*

*Defined in [dist/planck.d.ts:3081](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3081)*

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.
A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

▸ **MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2](vec2.md)): *[MouseJoint](mousejoint.md)*

*Defined in [dist/planck.d.ts:3082](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3082)*

A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.
A mouse joint is used to make a point on a body track a specified world
point. This a soft constraint with a maximum force. This allows the
constraint to stretch and without applying huge forces.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

NOTE: this joint is not documented in the manual because it was developed to
be used in the testbed. If you want to learn how to use the mouse joint, look
at the testbed.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2](vec2.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

## Index

### Constructors

* [constructor](mousejoint.md#constructor)

### Properties

* [TYPE](mousejoint.md#static-type)
* [TYPES](mousejoint.md#static-types)

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

*Overrides void*

*Defined in [dist/planck.d.ts:3093](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3093)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2](vec2.md)): *[MouseJoint](mousejoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3094](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3094)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2](vec2.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: MouseJointDef): *[MouseJoint](mousejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/MouseJoint.ts:106](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | MouseJointDef |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: MouseJointOpt, `bodyA`: Body, `bodyB`: Body, `target`: Vec2): *[MouseJoint](mousejoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/MouseJoint.ts:108](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | MouseJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`target` | Vec2 |

**Returns:** *[MouseJoint](mousejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"mouse-joint"* = 'mouse-joint' as 'mouse-joint'

*Defined in [dist/planck.d.ts:3093](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3093)*

*Defined in [src/dynamics/joint/MouseJoint.ts:89](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L89)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3128](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3128)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3132](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3132)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [dist/planck.d.ts:3124](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3124)*

Get the damping ratio (dimensionless).

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [dist/planck.d.ts:3116](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3116)*

Get the frequency in Hertz.

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [dist/planck.d.ts:3108](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3108)*

Get the maximum force in Newtons.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: any): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3136](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3136)*

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

*Defined in [dist/planck.d.ts:3140](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3140)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | any |

**Returns:** *number*

___

###  getTarget

▸ **getTarget**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3100](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3100)*

**Returns:** *[Vec2](vec2.md)*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3145](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3145)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: any): *void*

*Defined in [dist/planck.d.ts:3120](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3120)*

Set the damping ratio (dimensionless).

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | any |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: any): *void*

*Defined in [dist/planck.d.ts:3112](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3112)*

Set the frequency in Hertz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | any |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: any): *void*

*Defined in [dist/planck.d.ts:3104](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3104)*

Set the maximum force in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`force` | any |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: any): *void*

*Defined in [dist/planck.d.ts:3099](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3099)*

Use this to update the target point.

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: any): *void*

*Overrides [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [dist/planck.d.ts:3144](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3144)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | any |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:3150](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3150)*

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

*Defined in [dist/planck.d.ts:3146](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3146)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
