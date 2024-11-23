# Interface: FrictionJointDef

Friction joint definition.

## Extends

- [`JointDef`](JointDef).[`FrictionJointOpt`](FrictionJointOpt)

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

[`FrictionJointOpt`](FrictionJointOpt).[`collideConnected`](FrictionJointOpt#collideconnected)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum friction force in N.

#### Inherited from

[`FrictionJointOpt`](FrictionJointOpt).[`maxForce`](FrictionJointOpt#maxforce)

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum friction torque in N-m.

#### Inherited from

[`FrictionJointOpt`](FrictionJointOpt).[`maxTorque`](FrictionJointOpt#maxtorque)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`FrictionJointOpt`](FrictionJointOpt).[`userData`](FrictionJointOpt#userdata)
