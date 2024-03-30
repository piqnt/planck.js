[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJointDef](mousejointdef.md)

# Interface: MouseJointDef

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [MouseJointOpt](mousejointopt.md)

  ↳ **MouseJointDef**

## Index

### Properties

* [bodyA](mousejointdef.md#bodya)
* [bodyB](mousejointdef.md#bodyb)
* [collideConnected](mousejointdef.md#optional-collideconnected)
* [dampingRatio](mousejointdef.md#optional-dampingratio)
* [frequencyHz](mousejointdef.md#optional-frequencyhz)
* [maxForce](mousejointdef.md#optional-maxforce)
* [target](mousejointdef.md#target)
* [userData](mousejointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[dampingRatio](mousejointopt.md#optional-dampingratio)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[frequencyHz](mousejointopt.md#optional-frequencyhz)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[maxForce](mousejointopt.md#optional-maxforce)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

###  target

• **target**: *[Vec2Value](vec2value.md)*

The initial world target point. This is assumed to coincide with the body
anchor initially.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
