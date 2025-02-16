# Interface: MouseJointDef

Mouse joint definition. This requires a world target point, tuning
parameters, and the time step.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`MouseJointOpt`](/api/interfaces/MouseJointOpt)

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

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`collideConnected`](/api/interfaces/MouseJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

[dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
damping.

#### Inherited from

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`dampingRatio`](/api/interfaces/MouseJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

[frequencyHz = 5.0] The response speed.

#### Inherited from

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`frequencyHz`](/api/interfaces/MouseJointOpt#frequencyhz)

***

### maxForce?

> `optional` **maxForce**: `number`

[maxForce = 0.0] The maximum constraint force that can be exerted to move
the candidate body. Usually you will express as some multiple of the
weight (multiplier * mass * gravity).

#### Inherited from

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`maxForce`](/api/interfaces/MouseJointOpt#maxforce)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`style`](/api/interfaces/MouseJointOpt#style)

***

### target

> **target**: [`Vec2Value`](/api/interfaces/Vec2Value)

The initial world target point. This is assumed to coincide with the body
anchor initially.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`MouseJointOpt`](/api/interfaces/MouseJointOpt).[`userData`](/api/interfaces/MouseJointOpt#userdata)
