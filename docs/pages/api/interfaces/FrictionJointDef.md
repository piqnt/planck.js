# Interface: FrictionJointDef

Friction joint definition.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt)

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

[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt).[`collideConnected`](/api/interfaces/FrictionJointOpt#collideconnected)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum friction force in N.

#### Inherited from

[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt).[`maxForce`](/api/interfaces/FrictionJointOpt#maxforce)

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum friction torque in N-m.

#### Inherited from

[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt).[`maxTorque`](/api/interfaces/FrictionJointOpt#maxtorque)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt).[`style`](/api/interfaces/FrictionJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`FrictionJointOpt`](/api/interfaces/FrictionJointOpt).[`userData`](/api/interfaces/FrictionJointOpt#userdata)
