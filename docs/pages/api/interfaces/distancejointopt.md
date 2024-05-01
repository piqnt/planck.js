---
showOutline: false
---

# Interface: DistanceJointOpt

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **DistanceJointOpt**

  ↳ [DistanceJointDef](/api/interfaces/distancejointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/distancejointopt#optional-collideconnected)
* [dampingRatio](/api/interfaces/distancejointopt#optional-dampingratio)
* [frequencyHz](/api/interfaces/distancejointopt#optional-frequencyhz)
* [length](/api/interfaces/distancejointopt#optional-length)
* [userData](/api/interfaces/distancejointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

___

### `Optional` length

• **length**? : *number*

Distance length.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
