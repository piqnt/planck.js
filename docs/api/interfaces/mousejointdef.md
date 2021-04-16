[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJointDef](mousejointdef.md)

# Interface: MouseJointDef

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.
Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [MouseJointOpt](mousejointopt.md)

* JointDef

* MouseJointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:969](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L969)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:973](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L973)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[dampingRatio](mousejointopt.md#optional-dampingratio)*

*Overrides void*

*Defined in [dist/planck.d.ts:3211](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3211)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[frequencyHz](mousejointopt.md#optional-frequencyhz)*

*Overrides void*

*Defined in [dist/planck.d.ts:3206](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3206)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[maxForce](mousejointopt.md#optional-maxforce)*

*Overrides void*

*Defined in [dist/planck.d.ts:3202](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3202)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

###  target

• **target**: *Vec2*

*Defined in [dist/planck.d.ts:3222](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3222)*

*Defined in [src/dynamics/joint/MouseJoint.ts:70](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/MouseJoint.ts#L70)*

The initial world target point. This is assumed to coincide with the body
anchor initially.
The initial world target point. This is assumed to coincide with the body
anchor initially.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
