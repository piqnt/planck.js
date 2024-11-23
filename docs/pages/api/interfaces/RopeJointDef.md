# Interface: RopeJointDef

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Extends

- [`JointDef`](JointDef).[`RopeJointOpt`](RopeJointOpt)

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

[`RopeJointOpt`](RopeJointOpt).[`collideConnected`](RopeJointOpt#collideconnected)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### maxLength?

> `optional` **maxLength**: `number`

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

#### Inherited from

[`RopeJointOpt`](RopeJointOpt).[`maxLength`](RopeJointOpt#maxlength)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`RopeJointOpt`](RopeJointOpt).[`userData`](RopeJointOpt#userdata)
