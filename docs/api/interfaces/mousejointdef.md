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

*Defined in [dynamics/Joint.ts:77](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L77)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [dynamics/Joint.ts:81](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L81)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[dampingRatio](mousejointopt.md#optional-dampingratio)*

*Defined in [dynamics/joint/MouseJoint.ts:60](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/MouseJoint.ts#L60)*

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[frequencyHz](mousejointopt.md#optional-frequencyhz)*

*Defined in [dynamics/joint/MouseJoint.ts:55](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/MouseJoint.ts#L55)*

[frequencyHz = 5.0] The response speed.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MouseJointOpt](mousejointopt.md).[maxForce](mousejointopt.md#optional-maxforce)*

*Defined in [dynamics/joint/MouseJoint.ts:51](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/MouseJoint.ts#L51)*

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

___

###  target

• **target**: *[Vec2Value](vec2value.md)*

*Defined in [dynamics/joint/MouseJoint.ts:71](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/MouseJoint.ts#L71)*

The initial world target point. This is assumed to coincide with the body
anchor initially.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
