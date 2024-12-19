# Interface: FrictionJointOpt

Friction joint definition.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`FrictionJointDef`](FrictionJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum friction force in N.

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum friction torque in N-m.

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
