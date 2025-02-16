# Interface: RopeJointDef

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`RopeJointOpt`](/api/interfaces/RopeJointOpt)

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

[`RopeJointOpt`](/api/interfaces/RopeJointOpt).[`collideConnected`](/api/interfaces/RopeJointOpt#collideconnected)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### maxLength?

> `optional` **maxLength**: `number`

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

#### Inherited from

[`RopeJointOpt`](/api/interfaces/RopeJointOpt).[`maxLength`](/api/interfaces/RopeJointOpt#maxlength)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`RopeJointOpt`](/api/interfaces/RopeJointOpt).[`style`](/api/interfaces/RopeJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`RopeJointOpt`](/api/interfaces/RopeJointOpt).[`userData`](/api/interfaces/RopeJointOpt#userdata)
