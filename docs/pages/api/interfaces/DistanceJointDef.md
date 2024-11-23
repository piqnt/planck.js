# Interface: DistanceJointDef

Distance joint definition. This requires defining an anchor point on both
bodies and the non-zero length of the distance joint. The definition uses
local anchor points so that the initial configuration can violate the
constraint slightly. This helps when saving and loading a game. Warning: Do
not use a zero or short length.

## Extends

- [`JointDef`](JointDef).[`DistanceJointOpt`](DistanceJointOpt)

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

[`DistanceJointOpt`](DistanceJointOpt).[`collideConnected`](DistanceJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

The damping ratio. 0 = no damping, 1 = critical damping.

#### Inherited from

[`DistanceJointOpt`](DistanceJointOpt).[`dampingRatio`](DistanceJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

The mass-spring-damper frequency in Hertz. A value of 0 disables softness.

#### Inherited from

[`DistanceJointOpt`](DistanceJointOpt).[`frequencyHz`](DistanceJointOpt#frequencyhz)

***

### length?

> `optional` **length**: `number`

Distance length.

#### Inherited from

[`DistanceJointOpt`](DistanceJointOpt).[`length`](DistanceJointOpt#length)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`DistanceJointOpt`](DistanceJointOpt).[`userData`](DistanceJointOpt#userdata)
