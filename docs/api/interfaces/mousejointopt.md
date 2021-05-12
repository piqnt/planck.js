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

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L59)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L54)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [src/dynamics/joint/MouseJoint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MouseJoint.ts#L50)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
