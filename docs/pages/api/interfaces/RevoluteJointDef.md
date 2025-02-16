# Interface: RevoluteJointDef

Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt)

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

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`collideConnected`](/api/interfaces/RevoluteJointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

A flag to enable joint limits.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`enableLimit`](/api/interfaces/RevoluteJointOpt#enablelimit)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

A flag to enable the joint motor.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`enableMotor`](/api/interfaces/RevoluteJointOpt#enablemotor)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### lowerAngle?

> `optional` **lowerAngle**: `number`

The lower angle for the joint limit (radians).

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`lowerAngle`](/api/interfaces/RevoluteJointOpt#lowerangle)

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`maxMotorTorque`](/api/interfaces/RevoluteJointOpt#maxmotortorque)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed. Usually in radians per second.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`motorSpeed`](/api/interfaces/RevoluteJointOpt#motorspeed)

***

### referenceAngle?

> `optional` **referenceAngle**: `number`

The bodyB angle minus bodyA angle in the reference state (radians).

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`style`](/api/interfaces/RevoluteJointOpt#style)

***

### upperAngle?

> `optional` **upperAngle**: `number`

The upper angle for the joint limit (radians).

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`upperAngle`](/api/interfaces/RevoluteJointOpt#upperangle)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt).[`userData`](/api/interfaces/RevoluteJointOpt#userdata)
