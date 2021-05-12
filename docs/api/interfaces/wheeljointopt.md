[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJointOpt](wheeljointopt.md)

# Interface: WheelJointOpt

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

* [JointOpt](jointopt.md)

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

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:63](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/WheelJoint.ts#L63)*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Defined in [src/dynamics/joint/WheelJoint.ts:47](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/WheelJoint.ts#L47)*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/WheelJoint.ts#L59)*

Suspension frequency, zero indicates no suspension.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:51](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/WheelJoint.ts#L51)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Defined in [src/dynamics/joint/WheelJoint.ts:55](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/WheelJoint.ts#L55)*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
