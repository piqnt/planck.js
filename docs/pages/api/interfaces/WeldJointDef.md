# Interface: WeldJointDef

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`WeldJointOpt`](/api/interfaces/WeldJointOpt)

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

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`collideConnected`](/api/interfaces/WeldJointOpt#collideconnected)

***

### dampingRatio?

> `optional` **dampingRatio**: `number`

The damping ratio. 0 = no damping, 1 = critical damping.

#### Inherited from

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`dampingRatio`](/api/interfaces/WeldJointOpt#dampingratio)

***

### frequencyHz?

> `optional` **frequencyHz**: `number`

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

#### Inherited from

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`frequencyHz`](/api/interfaces/WeldJointOpt#frequencyhz)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### referenceAngle?

> `optional` **referenceAngle**: `number`

The bodyB angle minus bodyA angle in the reference state (radians).

#### Inherited from

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`referenceAngle`](/api/interfaces/WeldJointOpt#referenceangle)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`style`](/api/interfaces/WeldJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`WeldJointOpt`](/api/interfaces/WeldJointOpt).[`userData`](/api/interfaces/WeldJointOpt#userdata)
