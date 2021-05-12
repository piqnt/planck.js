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

*Defined in [src/dynamics/Joint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L78)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [src/dynamics/Joint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L82)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[dampingRatio](mousejointopt.md#optional-dampingratio)*

*Defined in [src/dynamics/joint/MouseJoint.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L59)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[frequencyHz](mousejointopt.md#optional-frequencyhz)*

*Defined in [src/dynamics/joint/MouseJoint.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L54)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[maxForce](mousejointopt.md#optional-maxforce)*

*Defined in [src/dynamics/joint/MouseJoint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L50)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

###  target

• **target**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/MouseJoint.ts:70](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L70)*

The initial world target point. This is assumed to coincide with the body
anchor initially.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
