# Interface: MotorJointOpt

Motor joint definition.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`MotorJointDef`](/api/interfaces/MotorJointDef)

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

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

***

### correctionFactor?

> `optional` **correctionFactor**: `number`

Position correction factor in the range [0,1].

***

### linearOffset?

> `optional` **linearOffset**: [`Vec2Value`](/api/interfaces/Vec2Value)

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

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`style`](/api/interfaces/JointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`userData`](/api/interfaces/JointOpt#userdata)
