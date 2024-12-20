# Interface: RopeJointOpt

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`RopeJointDef`](/api/interfaces/RopeJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

***

### maxLength?

> `optional` **maxLength**: `number`

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

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
