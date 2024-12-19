# Interface: MotorJointOpt

Motor joint definition.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`MotorJointDef`](MotorJointDef)

## Properties

### angularOffset?

> `optional` **angularOffset**: `number`

The bodyB angle minus bodyA angle in radians.

***

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### correctionFactor?

> `optional` **correctionFactor**: `number`

Position correction factor in the range [0,1].

***

### linearOffset?

> `optional` **linearOffset**: [`Vec2Value`](Vec2Value)

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum motor force in N.

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum motor torque in N-m.

***

### style?

> `optional` **style**: [`Style`](Style)

Styling for dev-tools.

#### Inherited from

[`JointOpt`](JointOpt).[`style`](JointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](JointOpt).[`userData`](JointOpt#userdata)
