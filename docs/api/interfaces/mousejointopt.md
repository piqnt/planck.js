[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJointOpt](mousejointopt.md)

# Interface: MouseJointOpt

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.
Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [dist/planck.d.ts:3068](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3068)*

*Defined in [src/dynamics/joint/MouseJoint.ts:59](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L59)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.
[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [dist/planck.d.ts:3063](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3063)*

*Defined in [src/dynamics/joint/MouseJoint.ts:54](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L54)*

[frequencyHz = 5.0] The response speed.
[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [dist/planck.d.ts:3059](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3059)*

*Defined in [src/dynamics/joint/MouseJoint.ts:50](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MouseJoint.ts#L50)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).
[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
