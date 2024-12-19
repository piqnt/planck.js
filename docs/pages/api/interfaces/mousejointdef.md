# Interface: MouseJointDef

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Extends

- [`JointDef`](JointDef).[`MouseJointOpt`](MouseJointOpt)

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

[`MouseJointOpt`](MouseJointOpt).[`collideConnected`](MouseJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

#### Inherited from

[`MouseJointOpt`](MouseJointOpt).[`dampingRatio`](MouseJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

[frequencyHz = 5.0] The response speed.

#### Inherited from

[`MouseJointOpt`](MouseJointOpt).[`frequencyHz`](MouseJointOpt#frequencyhz)

***

### maxForce?

> `optional` **maxForce**: `number`

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

#### Inherited from

[`MouseJointOpt`](MouseJointOpt).[`maxForce`](MouseJointOpt#maxforce)

***

### style?

> `optional` **style**: [`Style`](Style)

Styling for dev-tools.

#### Inherited from

[`MouseJointOpt`](MouseJointOpt).[`style`](MouseJointOpt#style)

***

### target

> **target**: [`Vec2Value`](Vec2Value)

The initial world target point. This is assumed to coincide with the body
anchor initially.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`MouseJointOpt`](MouseJointOpt).[`userData`](MouseJointOpt#userdata)
