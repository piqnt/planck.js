[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJointOpt](mousejointopt.md)

# Interface: MouseJointOpt

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **MouseJointOpt**

  ↳ [MouseJointDef](mousejointdef.md)

## Index

### Properties

* [collideConnected](mousejointopt.md#optional-collideconnected)
* [dampingRatio](mousejointopt.md#optional-dampingratio)
* [frequencyHz](mousejointopt.md#optional-frequencyhz)
* [maxForce](mousejointopt.md#optional-maxforce)
* [userData](mousejointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
