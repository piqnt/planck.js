# Interface: PulleyJointDef

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`PulleyJointOpt`](/api/interfaces/PulleyJointOpt)

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

[`PulleyJointOpt`](/api/interfaces/PulleyJointOpt).[`collideConnected`](/api/interfaces/PulleyJointOpt#collideconnected)

***

### groundAnchorA

> **groundAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The first ground anchor in world coordinates. This point never moves.

***

### groundAnchorB

> **groundAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The second ground anchor in world coordinates. This point never moves.

***

### lengthA

> **lengthA**: `number`

The reference length for the segment attached to bodyA.

***

### lengthB

> **lengthB**: `number`

The reference length for the segment attached to bodyB.

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### ratio

> **ratio**: `number`

The pulley ratio, used to simulate a block-and-tackle.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`PulleyJointOpt`](/api/interfaces/PulleyJointOpt).[`style`](/api/interfaces/PulleyJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`PulleyJointOpt`](/api/interfaces/PulleyJointOpt).[`userData`](/api/interfaces/PulleyJointOpt#userdata)
