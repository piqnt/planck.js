[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJointOpt](wheeljointopt.md)

# Interface: WheelJointOpt

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.
Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

  ↳ **WheelJointOpt**

  ↳ [WheelJointDef](wheeljointdef.md)

## Index

### Properties

* [collideConnected](wheeljointopt.md#optional-collideconnected)
* [dampingRatio](wheeljointopt.md#optional-dampingratio)
* [enableMotor](wheeljointopt.md#optional-enablemotor)
* [frequencyHz](wheeljointopt.md#optional-frequencyhz)
* [maxMotorTorque](wheeljointopt.md#optional-maxmotortorque)
* [motorSpeed](wheeljointopt.md#optional-motorspeed)
* [userData](wheeljointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides void*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [dist/planck.d.ts:3675](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3675)*

*Defined in [src/dynamics/joint/WheelJoint.ts:63](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/WheelJoint.ts#L63)*

Suspension damping ratio, one indicates critical damping.
Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Defined in [dist/planck.d.ts:3659](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3659)*

*Defined in [src/dynamics/joint/WheelJoint.ts:47](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/WheelJoint.ts#L47)*

Enable/disable the joint motor.
Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [dist/planck.d.ts:3671](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3671)*

*Defined in [src/dynamics/joint/WheelJoint.ts:59](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/WheelJoint.ts#L59)*

Suspension frequency, zero indicates no suspension.
Suspension frequency, zero indicates no suspension.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Defined in [dist/planck.d.ts:3663](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3663)*

*Defined in [src/dynamics/joint/WheelJoint.ts:51](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/WheelJoint.ts#L51)*

The maximum motor torque, usually in N-m.
The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Defined in [dist/planck.d.ts:3667](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3667)*

*Defined in [src/dynamics/joint/WheelJoint.ts:55](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/WheelJoint.ts#L55)*

The desired motor speed in radians per second.
The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
