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

- [`JointDef`](JointDef).[`RevoluteJointOpt`](RevoluteJointOpt)

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

[`RevoluteJointOpt`](RevoluteJointOpt).[`collideConnected`](RevoluteJointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

A flag to enable joint limits.

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`enableLimit`](RevoluteJointOpt#enablelimit)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

A flag to enable the joint motor.

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`enableMotor`](RevoluteJointOpt#enablemotor)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### lowerAngle?

> `optional` **lowerAngle**: `number`

The lower angle for the joint limit (radians).

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`lowerAngle`](RevoluteJointOpt#lowerangle)

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`maxMotorTorque`](RevoluteJointOpt#maxmotortorque)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed. Usually in radians per second.

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`motorSpeed`](RevoluteJointOpt#motorspeed)

***

### referenceAngle

> **referenceAngle**: `number`

The bodyB angle minus bodyA angle in the reference state (radians).

***

### upperAngle?

> `optional` **upperAngle**: `number`

The upper angle for the joint limit (radians).

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`upperAngle`](RevoluteJointOpt#upperangle)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`RevoluteJointOpt`](RevoluteJointOpt).[`userData`](RevoluteJointOpt#userdata)
