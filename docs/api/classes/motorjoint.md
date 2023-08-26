[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJoint](motorjoint.md)

# Class: MotorJoint

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

## Hierarchy

* [Joint](joint.md)

  ↳ **MotorJoint**

## Index

### Properties

* [TYPE](motorjoint.md#static-type)

### Methods

* [getAnchorA](motorjoint.md#getanchora)
* [getAnchorB](motorjoint.md#getanchorb)
* [getAngularOffset](motorjoint.md#getangularoffset)
* [getBodyA](motorjoint.md#getbodya)
* [getBodyB](motorjoint.md#getbodyb)
* [getCollideConnected](motorjoint.md#getcollideconnected)
* [getCorrectionFactor](motorjoint.md#getcorrectionfactor)
* [getLinearOffset](motorjoint.md#getlinearoffset)
* [getMaxForce](motorjoint.md#getmaxforce)
* [getMaxTorque](motorjoint.md#getmaxtorque)
* [getNext](motorjoint.md#getnext)
* [getReactionForce](motorjoint.md#getreactionforce)
* [getReactionTorque](motorjoint.md#getreactiontorque)
* [getType](motorjoint.md#gettype)
* [getUserData](motorjoint.md#getuserdata)
* [initVelocityConstraints](motorjoint.md#initvelocityconstraints)
* [isActive](motorjoint.md#isactive)
* [setAngularOffset](motorjoint.md#setangularoffset)
* [setCorrectionFactor](motorjoint.md#setcorrectionfactor)
* [setLinearOffset](motorjoint.md#setlinearoffset)
* [setMaxForce](motorjoint.md#setmaxforce)
* [setMaxTorque](motorjoint.md#setmaxtorque)
* [setUserData](motorjoint.md#setuserdata)
* [shiftOrigin](motorjoint.md#shiftorigin)
* [solvePositionConstraints](motorjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](motorjoint.md#solvevelocityconstraints)

## Properties

### `Static` TYPE

▪ **TYPE**: *"motor-joint"* = 'motor-joint' as const

*Defined in [src/dynamics/joint/MotorJoint.ts:82](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L82)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/MotorJoint.ts:257](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L257)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *Vec2*

___

###  getAnchorB

▸ **getAnchorB**(): *Vec2*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/MotorJoint.ts:264](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L264)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *Vec2*

___

###  getAngularOffset

▸ **getAngularOffset**(): *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:250](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L250)*

**Returns:** *number*

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

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:220](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L220)*

Get the position correction factor in the range [0,1].

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *Vec2*

*Defined in [src/dynamics/joint/MotorJoint.ts:235](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L235)*

**Returns:** *Vec2*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:190](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L190)*

Get the maximum friction force in N.

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:205](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L205)*

Get the maximum friction torque in N*m.

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

*Defined in [src/dynamics/joint/MotorJoint.ts:271](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L271)*

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

*Defined in [src/dynamics/joint/MotorJoint.ts:278](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L278)*

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

*Defined in [src/dynamics/joint/MotorJoint.ts:282](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L282)*

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

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: number): *void*

*Defined in [src/dynamics/joint/MotorJoint.ts:242](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L242)*

Set/get the target angular offset, in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | number |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: number): *void*

*Defined in [src/dynamics/joint/MotorJoint.ts:212](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L212)*

Set the position correction factor in the range [0,1].

**Parameters:**

Name | Type |
------ | ------ |
`factor` | number |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: [Vec2Value](../interfaces/vec2value.md)): *void*

*Defined in [src/dynamics/joint/MotorJoint.ts:227](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L227)*

Set/get the target linear offset, in frame A, in meters.

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [src/dynamics/joint/MotorJoint.ts:182](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L182)*

Set the maximum friction force in N.

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [src/dynamics/joint/MotorJoint.ts:197](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L197)*

Set the maximum friction torque in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

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

*Defined in [src/dynamics/joint/MotorJoint.ts:425](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L425)*

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

*Defined in [src/dynamics/joint/MotorJoint.ts:364](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/MotorJoint.ts#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
