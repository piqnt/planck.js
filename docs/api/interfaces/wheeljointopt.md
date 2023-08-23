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

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [dynamics/joint/WheelJoint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WheelJoint.ts#L68)*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Defined in [dynamics/joint/WheelJoint.ts:52](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WheelJoint.ts#L52)*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [dynamics/joint/WheelJoint.ts:64](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WheelJoint.ts#L64)*

Suspension frequency, zero indicates no suspension.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Defined in [dynamics/joint/WheelJoint.ts:56](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WheelJoint.ts#L56)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Defined in [dynamics/joint/WheelJoint.ts:60](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WheelJoint.ts#L60)*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
