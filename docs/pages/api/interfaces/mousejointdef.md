
# Interface: MouseJointDef

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [MouseJointOpt](/api/interfaces/mousejointopt)

  ↳ **MouseJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/mousejointdef#bodya)
* [bodyB](/api/interfaces/mousejointdef#bodyb)
* [collideConnected](/api/interfaces/mousejointdef#optional-collideconnected)
* [dampingRatio](/api/interfaces/mousejointdef#optional-dampingratio)
* [frequencyHz](/api/interfaces/mousejointdef#optional-frequencyhz)
* [maxForce](/api/interfaces/mousejointdef#optional-maxforce)
* [target](/api/interfaces/mousejointdef#target)
* [userData](/api/interfaces/mousejointdef#optional-userdata)

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

*Inherited from [MouseJointOpt](/api/interfaces/mousejointopt).[dampingRatio](/api/interfaces/mousejointopt#optional-dampingratio)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [MouseJointOpt](/api/interfaces/mousejointopt).[frequencyHz](/api/interfaces/mousejointopt#optional-frequencyhz)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MouseJointOpt](/api/interfaces/mousejointopt).[maxForce](/api/interfaces/mousejointopt#optional-maxforce)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

###  target

• **target**: *[Vec2Value](/api/interfaces/vec2value)*

The initial world target point. This is assumed to coincide with the body
anchor initially.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
