# Interface: DistanceJointOpt

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`DistanceJointDef`](DistanceJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

The damping ratio. 0 = no damping, 1 = critical damping.

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

***

### length?

> `optional` **length**: `number`

Distance length.

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
