[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJointOpt](revolutejointopt.md)

# Interface: RevoluteJointOpt

Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.
Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

  ↳ **RevoluteJointOpt**

  ↳ [RevoluteJointDef](revolutejointdef.md)

## Index

### Properties

* [collideConnected](revolutejointopt.md#optional-collideconnected)
* [enableLimit](revolutejointopt.md#optional-enablelimit)
* [enableMotor](revolutejointopt.md#optional-enablemotor)
* [lowerAngle](revolutejointopt.md#optional-lowerangle)
* [maxMotorTorque](revolutejointopt.md#optional-maxmotortorque)
* [motorSpeed](revolutejointopt.md#optional-motorspeed)
* [upperAngle](revolutejointopt.md#optional-upperangle)
* [userData](revolutejointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Defined in [dist/planck.d.ts:2568](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2568)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:80](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L80)*

A flag to enable joint limits.
A flag to enable joint limits.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Defined in [dist/planck.d.ts:2572](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2572)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:84](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L84)*

A flag to enable the joint motor.
A flag to enable the joint motor.

___

### `Optional` lowerAngle

• **lowerAngle**? : *number*

*Defined in [dist/planck.d.ts:2551](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2551)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:63](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L63)*

The lower angle for the joint limit (radians).
The lower angle for the joint limit (radians).

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Defined in [dist/planck.d.ts:2560](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2560)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:72](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L72)*

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.
The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Defined in [dist/planck.d.ts:2564](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2564)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:76](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L76)*

The desired motor speed. Usually in radians per second.
The desired motor speed. Usually in radians per second.

___

### `Optional` upperAngle

• **upperAngle**? : *number*

*Defined in [dist/planck.d.ts:2555](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2555)*

*Defined in [src/dynamics/joint/RevoluteJoint.ts:67](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/RevoluteJoint.ts#L67)*

The upper angle for the joint limit (radians).
The upper angle for the joint limit (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
