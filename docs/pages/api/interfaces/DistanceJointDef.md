# Interface: DistanceJointDef

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt)

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

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`collideConnected`](/api/interfaces/DistanceJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

The damping ratio. 0 = no damping, 1 = critical damping.

#### Inherited from

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`dampingRatio`](/api/interfaces/DistanceJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

#### Inherited from

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`frequencyHz`](/api/interfaces/DistanceJointOpt#frequencyhz)

***

### length?

> `optional` **length**: `number`

Distance length.

#### Inherited from

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`length`](/api/interfaces/DistanceJointOpt#length)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`style`](/api/interfaces/DistanceJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`DistanceJointOpt`](/api/interfaces/DistanceJointOpt).[`userData`](/api/interfaces/DistanceJointOpt#userdata)
