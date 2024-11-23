# Interface: GearJointDef

Gear joint definition.

## Extends

- [`JointDef`](JointDef).[`GearJointOpt`](GearJointOpt)

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

[`GearJointOpt`](GearJointOpt).[`collideConnected`](GearJointOpt#collideconnected)

***

### joint1

> **joint1**: [`RevoluteJoint`](../classes/RevoluteJoint) \| [`PrismaticJoint`](../classes/PrismaticJoint)

The first revolute/prismatic joint attached to the gear joint.

***

### joint2

> **joint2**: [`RevoluteJoint`](../classes/RevoluteJoint) \| [`PrismaticJoint`](../classes/PrismaticJoint)

The second prismatic/revolute joint attached to the gear joint.

***

### ratio?

> `optional` **ratio**: `number`

The gear ratio. See [GearJoint](../classes/GearJoint) for explanation.

#### Inherited from

[`GearJointOpt`](GearJointOpt).[`ratio`](GearJointOpt#ratio)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`GearJointOpt`](GearJointOpt).[`userData`](GearJointOpt#userdata)
