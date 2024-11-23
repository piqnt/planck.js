# Interface: PulleyJointOpt

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`PulleyJointDef`](PulleyJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](JointOpt).[`userData`](JointOpt#userdata)
