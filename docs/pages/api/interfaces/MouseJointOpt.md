# Interface: MouseJointOpt

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`MouseJointDef`](/api/interfaces/MouseJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

[frequencyHz = 5.0] The response speed.

***

### maxForce?

> `optional` **maxForce**: `number`

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

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
