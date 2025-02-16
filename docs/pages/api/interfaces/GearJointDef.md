# Interface: GearJointDef

Gear joint definition.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`GearJointOpt`](/api/interfaces/GearJointOpt)

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

[`GearJointOpt`](/api/interfaces/GearJointOpt).[`collideConnected`](/api/interfaces/GearJointOpt#collideconnected)

***

### joint1

> **joint1**: [`RevoluteJoint`](/api/classes/RevoluteJoint) \| [`PrismaticJoint`](/api/classes/PrismaticJoint)

The first revolute/prismatic joint attached to the gear joint.

***

### joint2

> **joint2**: [`RevoluteJoint`](/api/classes/RevoluteJoint) \| [`PrismaticJoint`](/api/classes/PrismaticJoint)

The second prismatic/revolute joint attached to the gear joint.

***

### ratio?

> `optional` **ratio**: `number`

The gear ratio. See [GearJoint](/api/classes/GearJoint) for explanation.

#### Inherited from

[`GearJointOpt`](/api/interfaces/GearJointOpt).[`ratio`](/api/interfaces/GearJointOpt#ratio)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`GearJointOpt`](/api/interfaces/GearJointOpt).[`style`](/api/interfaces/GearJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`GearJointOpt`](/api/interfaces/GearJointOpt).[`userData`](/api/interfaces/GearJointOpt#userdata)
