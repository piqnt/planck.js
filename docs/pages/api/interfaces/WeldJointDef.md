# Interface: WeldJointDef

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

## Extends

- [`JointDef`](JointDef).[`WeldJointOpt`](WeldJointOpt)

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

[`WeldJointOpt`](WeldJointOpt).[`collideConnected`](WeldJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

The damping ratio. 0 = no damping, 1 = critical damping.

#### Inherited from

[`WeldJointOpt`](WeldJointOpt).[`dampingRatio`](WeldJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

#### Inherited from

[`WeldJointOpt`](WeldJointOpt).[`frequencyHz`](WeldJointOpt#frequencyhz)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### referenceAngle?

> `optional` **referenceAngle**: `number`

The bodyB angle minus bodyA angle in the reference state (radians).

#### Inherited from

[`WeldJointOpt`](WeldJointOpt).[`referenceAngle`](WeldJointOpt#referenceangle)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`WeldJointOpt`](WeldJointOpt).[`userData`](WeldJointOpt#userdata)
