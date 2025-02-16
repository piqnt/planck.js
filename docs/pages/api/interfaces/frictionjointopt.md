# Interface: FrictionJointOpt

Friction joint definition.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`FrictionJointDef`](/api/interfaces/FrictionJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

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
