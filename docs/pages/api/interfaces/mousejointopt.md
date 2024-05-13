
# Interface: MouseJointOpt

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **MouseJointOpt**

  ↳ [MouseJointDef](/api/interfaces/mousejointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/mousejointopt#optional-collideconnected)
* [dampingRatio](/api/interfaces/mousejointopt#optional-dampingratio)
* [frequencyHz](/api/interfaces/mousejointopt#optional-frequencyhz)
* [maxForce](/api/interfaces/mousejointopt#optional-maxforce)
* [userData](/api/interfaces/mousejointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

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

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
