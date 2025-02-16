# Interface: WheelJointDef

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`WheelJointOpt`](/api/interfaces/WheelJointOpt)

## Properties

### bodyA

> **bodyA**: [`Body`](/api/classes/Body)

The first attached body.

#### Inherited from

[`JointDef`](/api/interfaces/JointDef).[`bodyA`](/api/interfaces/JointDef#bodya)

***

### bodyB

> **bodyB**: [`Body`](/api/classes/Body)

The second attached body.

#### Inherited from

[`JointDef`](/api/interfaces/JointDef).[`bodyB`](/api/interfaces/JointDef#bodyb)

***

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`collideConnected`](/api/interfaces/WheelJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

Suspension damping ratio, one indicates critical damping.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`dampingRatio`](/api/interfaces/WheelJointOpt#dampingratio)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`enableMotor`](/api/interfaces/WheelJointOpt#enablemotor)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

Suspension frequency, zero indicates no suspension.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`frequencyHz`](/api/interfaces/WheelJointOpt#frequencyhz)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### localAxisA

> **localAxisA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local translation axis in bodyA.

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque, usually in N-m.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`maxMotorTorque`](/api/interfaces/WheelJointOpt#maxmotortorque)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`motorSpeed`](/api/interfaces/WheelJointOpt#motorspeed)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`style`](/api/interfaces/WheelJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`WheelJointOpt`](/api/interfaces/WheelJointOpt).[`userData`](/api/interfaces/WheelJointOpt#userdata)
