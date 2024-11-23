# Interface: WheelJointOpt

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`WheelJointDef`](WheelJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

Suspension damping ratio, one indicates critical damping.

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

Suspension frequency, zero indicates no suspension.

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque, usually in N-m.

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](JointOpt).[`userData`](JointOpt#userdata)
