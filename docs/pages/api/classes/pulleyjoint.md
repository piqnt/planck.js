
# Class: PulleyJoint

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

## Hierarchy

* [Joint](/api/classes/joint)

  ↳ **PulleyJoint**

## Index

### Constructors

* [constructor](/api/classes/pulleyjoint#constructor)

### Properties

* [style](/api/classes/pulleyjoint#style)
* [TYPE](/api/classes/pulleyjoint#static-type)

### Methods

* [getAnchorA](/api/classes/pulleyjoint#getanchora)
* [getAnchorB](/api/classes/pulleyjoint#getanchorb)
* [getBodyA](/api/classes/pulleyjoint#getbodya)
* [getBodyB](/api/classes/pulleyjoint#getbodyb)
* [getCollideConnected](/api/classes/pulleyjoint#getcollideconnected)
* [getCurrentLengthA](/api/classes/pulleyjoint#getcurrentlengtha)
* [getCurrentLengthB](/api/classes/pulleyjoint#getcurrentlengthb)
* [getGroundAnchorA](/api/classes/pulleyjoint#getgroundanchora)
* [getGroundAnchorB](/api/classes/pulleyjoint#getgroundanchorb)
* [getLengthA](/api/classes/pulleyjoint#getlengtha)
* [getLengthB](/api/classes/pulleyjoint#getlengthb)
* [getNext](/api/classes/pulleyjoint#getnext)
* [getRatio](/api/classes/pulleyjoint#getratio)
* [getReactionForce](/api/classes/pulleyjoint#getreactionforce)
* [getReactionTorque](/api/classes/pulleyjoint#getreactiontorque)
* [getType](/api/classes/pulleyjoint#gettype)
* [getUserData](/api/classes/pulleyjoint#getuserdata)
* [initVelocityConstraints](/api/classes/pulleyjoint#initvelocityconstraints)
* [isActive](/api/classes/pulleyjoint#isactive)
* [setUserData](/api/classes/pulleyjoint#setuserdata)
* [shiftOrigin](/api/classes/pulleyjoint#shiftorigin)
* [solvePositionConstraints](/api/classes/pulleyjoint#solvepositionconstraints)
* [solveVelocityConstraints](/api/classes/pulleyjoint#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new PulleyJoint**(`def`: [PulleyJointDef](/api/interfaces/pulleyjointdef)): *[PulleyJoint](/api/classes/pulleyjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](/api/interfaces/pulleyjointdef) |

**Returns:** *[PulleyJoint](/api/classes/pulleyjoint)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](/api/interfaces/pulleyjointopt), `bodyA`: [Body](/api/classes/body), `bodyB`: [Body](/api/classes/body), `groundA`: [Vec2Value](/api/interfaces/vec2value), `groundB`: [Vec2Value](/api/interfaces/vec2value), `anchorA`: [Vec2Value](/api/interfaces/vec2value), `anchorB`: [Vec2Value](/api/interfaces/vec2value), `ratio`: number): *[PulleyJoint](/api/classes/pulleyjoint)*

*Overrides [Joint](/api/classes/joint).[constructor](/api/classes/joint#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](/api/interfaces/pulleyjointopt) |
`bodyA` | [Body](/api/classes/body) |
`bodyB` | [Body](/api/classes/body) |
`groundA` | [Vec2Value](/api/interfaces/vec2value) |
`groundB` | [Vec2Value](/api/interfaces/vec2value) |
`anchorA` | [Vec2Value](/api/interfaces/vec2value) |
`anchorB` | [Vec2Value](/api/interfaces/vec2value) |
`ratio` | number |

**Returns:** *[PulleyJoint](/api/classes/pulleyjoint)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Joint](/api/classes/joint).[style](/api/classes/joint#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"* = 'pulley-joint' as const

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getAnchorA](/api/classes/joint#abstract-getanchora)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getAnchorB](/api/classes/joint#abstract-getanchorb)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](/api/classes/body)*

*Inherited from [Joint](/api/classes/joint).[getBodyA](/api/classes/joint#getbodya)*

Get the first body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](/api/classes/body)*

*Inherited from [Joint](/api/classes/joint).[getBodyB](/api/classes/joint#getbodyb)*

Get the second body attached to this joint.

**Returns:** *[Body](/api/classes/body)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](/api/classes/joint).[getCollideConnected](/api/classes/joint#getcollideconnected)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](/api/classes/vec2)*

Get the first ground anchor.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](/api/classes/vec2)*

Get the second ground anchor.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLengthA

▸ **getLengthA**(): *number*

Get the current length of the segment attached to bodyA.

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

Get the current length of the segment attached to bodyB.

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](/api/classes/joint)*

*Inherited from [Joint](/api/classes/joint).[getNext](/api/classes/joint#getnext)*

Get the next joint the world joint list.

**Returns:** *[Joint](/api/classes/joint)*

___

###  getRatio

▸ **getRatio**(): *number*

Get the pulley ratio.

**Returns:** *number*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](/api/classes/vec2)*

*Overrides [Joint](/api/classes/joint).[getReactionForce](/api/classes/joint#abstract-getreactionforce)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides [Joint](/api/classes/joint).[getReactionTorque](/api/classes/joint#abstract-getreactiontorque)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](/api/classes/joint).[getType](/api/classes/joint#gettype)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](/api/classes/joint).[getUserData](/api/classes/joint#getuserdata)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

*Overrides [Joint](/api/classes/joint).[initVelocityConstraints](/api/classes/joint#abstract-initvelocityconstraints)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](/api/classes/joint).[isActive](/api/classes/joint#isactive)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [Joint](/api/classes/joint).[setUserData](/api/classes/joint#setuserdata)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](/api/interfaces/vec2value)): *void*

*Overrides [Joint](/api/classes/joint).[shiftOrigin](/api/classes/joint#shiftorigin)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2Value](/api/interfaces/vec2value) |   |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: [TimeStep](/api/classes/timestep)): *boolean*

*Overrides [Joint](/api/classes/joint).[solvePositionConstraints](/api/classes/joint#abstract-solvepositionconstraints)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: [TimeStep](/api/classes/timestep)): *void*

*Overrides [Joint](/api/classes/joint).[solveVelocityConstraints](/api/classes/joint#abstract-solvevelocityconstraints)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*
