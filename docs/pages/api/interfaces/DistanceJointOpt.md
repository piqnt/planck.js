# Interface: DistanceJointOpt

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`DistanceJointDef`](/api/interfaces/DistanceJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

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
