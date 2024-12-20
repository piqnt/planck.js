# Interface: RevoluteJointOpt

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

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`RevoluteJointDef`](/api/interfaces/RevoluteJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

A flag to enable joint limits.

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

A flag to enable the joint motor.

***

### lowerAngle?

> `optional` **lowerAngle**: `number`

The lower angle for the joint limit (radians).

***

### maxMotorTorque?

> `optional` **maxMotorTorque**: `number`

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed. Usually in radians per second.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`style`](/api/interfaces/JointOpt#style)

***

### upperAngle?

> `optional` **upperAngle**: `number`

The upper angle for the joint limit (radians).

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`userData`](/api/interfaces/JointOpt#userdata)
