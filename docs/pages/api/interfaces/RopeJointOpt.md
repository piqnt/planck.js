# Interface: RopeJointOpt

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`RopeJointDef`](RopeJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### maxLength?

> `optional` **maxLength**: `number`

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

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
