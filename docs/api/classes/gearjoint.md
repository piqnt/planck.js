[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJoint](gearjoint.md)

# Class: GearJoint

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

## Hierarchy

* [Joint](joint.md)

  ↳ **GearJoint**

## Index

### Constructors

* [constructor](gearjoint.md#constructor)

### Properties

* [TYPE](gearjoint.md#static-type)

### Methods

* [getAnchorA](gearjoint.md#getanchora)
* [getAnchorB](gearjoint.md#getanchorb)
* [getBodyA](gearjoint.md#getbodya)
* [getBodyB](gearjoint.md#getbodyb)
* [getCollideConnected](gearjoint.md#getcollideconnected)
* [getJoint1](gearjoint.md#getjoint1)
* [getJoint2](gearjoint.md#getjoint2)
* [getNext](gearjoint.md#getnext)
* [getRatio](gearjoint.md#getratio)
* [getReactionForce](gearjoint.md#getreactionforce)
* [getReactionTorque](gearjoint.md#getreactiontorque)
* [getType](gearjoint.md#gettype)
* [getUserData](gearjoint.md#getuserdata)
* [initVelocityConstraints](gearjoint.md#initvelocityconstraints)
* [isActive](gearjoint.md#isactive)
* [setRatio](gearjoint.md#setratio)
* [setUserData](gearjoint.md#setuserdata)
* [shiftOrigin](gearjoint.md#shiftorigin)
* [solvePositionConstraints](gearjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](gearjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/GearJoint.ts:122](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Overrides [Joint](joint.md).[constructor](joint.md#constructor)*

*Defined in [src/dynamics/joint/GearJoint.ts:124](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](../interfaces/gearjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`joint1` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`joint2` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`ratio?` | number |

**Returns:** *[GearJoint](gearjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"gear-joint"* = 'gear-joint' as 'gear-joint'

*Defined in [src/dynamics/joint/GearJoint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L82)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorA](joint.md#abstract-getanchora)*

*Defined in [src/dynamics/joint/GearJoint.ts:302](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L302)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getAnchorB](joint.md#abstract-getanchorb)*

*Defined in [src/dynamics/joint/GearJoint.ts:309](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L309)*

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

###  getJoint1

▸ **getJoint1**(): *[Joint](joint.md)*

*Defined in [src/dynamics/joint/GearJoint.ts:273](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L273)*

Get the first joint.

**Returns:** *[Joint](joint.md)*

___

###  getJoint2

▸ **getJoint2**(): *[Joint](joint.md)*

*Defined in [src/dynamics/joint/GearJoint.ts:280](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L280)*

Get the second joint.

**Returns:** *[Joint](joint.md)*

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

*Defined in [src/dynamics/joint/GearJoint.ts:295](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L295)*

Get the gear ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides [Joint](joint.md).[getReactionForce](joint.md#abstract-getreactionforce)*

*Defined in [src/dynamics/joint/GearJoint.ts:316](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L316)*

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

*Defined in [src/dynamics/joint/GearJoint.ts:323](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L323)*

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

*Defined in [src/dynamics/joint/GearJoint.ts:328](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L328)*

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

###  setRatio

▸ **setRatio**(`ratio`: number): *void*

*Defined in [src/dynamics/joint/GearJoint.ts:287](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L287)*

Set the gear ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

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

*Defined in [src/dynamics/joint/GearJoint.ts:465](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L465)*

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

*Defined in [src/dynamics/joint/GearJoint.ts:425](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/GearJoint.ts#L425)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
