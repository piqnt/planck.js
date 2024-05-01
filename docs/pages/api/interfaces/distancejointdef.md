---
showOutline: false
---

# Interface: DistanceJointDef

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [DistanceJointOpt](/api/interfaces/distancejointopt)

  ↳ **DistanceJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/distancejointdef#bodya)
* [bodyB](/api/interfaces/distancejointdef#bodyb)
* [collideConnected](/api/interfaces/distancejointdef#optional-collideconnected)
* [dampingRatio](/api/interfaces/distancejointdef#optional-dampingratio)
* [frequencyHz](/api/interfaces/distancejointdef#optional-frequencyhz)
* [length](/api/interfaces/distancejointdef#optional-length)
* [localAnchorA](/api/interfaces/distancejointdef#localanchora)
* [localAnchorB](/api/interfaces/distancejointdef#localanchorb)
* [userData](/api/interfaces/distancejointdef#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyA](/api/interfaces/jointdef#bodya)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyB](/api/interfaces/jointdef#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

*Overrides [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [DistanceJointOpt](/api/interfaces/distancejointopt).[dampingRatio](/api/interfaces/distancejointopt#optional-dampingratio)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [DistanceJointOpt](/api/interfaces/distancejointopt).[frequencyHz](/api/interfaces/distancejointopt#optional-frequencyhz)*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

*Inherited from [DistanceJointOpt](/api/interfaces/distancejointopt).[length](/api/interfaces/distancejointopt#optional-length)*

Distance length.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
