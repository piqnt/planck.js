# Interface: WheelJointDef

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointDef`](JointDef).[`WheelJointOpt`](WheelJointOpt)

## Properties

### bodyA

> **bodyA**: [`Body`](../classes/Body)

The first attached body.

#### Inherited from

[`JointDef`](JointDef).[`bodyA`](JointDef#bodya)

***

### bodyB

> **bodyB**: [`Body`](../classes/Body)

The second attached body.

#### Inherited from

[`JointDef`](JointDef).[`bodyB`](JointDef#bodyb)

***

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`collideConnected`](WheelJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

Suspension damping ratio, one indicates critical damping.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`dampingRatio`](WheelJointOpt#dampingratio)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`enableMotor`](WheelJointOpt#enablemotor)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

Suspension frequency, zero indicates no suspension.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`frequencyHz`](WheelJointOpt#frequencyhz)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### localAxisA

> **localAxisA**: [`Vec2Value`](Vec2Value)

The local translation axis in bodyA.

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque, usually in N-m.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`maxMotorTorque`](WheelJointOpt#maxmotortorque)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`motorSpeed`](WheelJointOpt#motorspeed)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`WheelJointOpt`](WheelJointOpt).[`userData`](WheelJointOpt#userdata)
