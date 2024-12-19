# Interface: JointDef

Joint definitions are used to construct joints.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`DistanceJointDef`](DistanceJointDef)
- [`FrictionJointDef`](FrictionJointDef)
- [`GearJointDef`](GearJointDef)
- [`MotorJointDef`](MotorJointDef)
- [`MouseJointDef`](MouseJointDef)
- [`PrismaticJointDef`](PrismaticJointDef)
- [`PulleyJointDef`](PulleyJointDef)
- [`RevoluteJointDef`](RevoluteJointDef)
- [`RopeJointDef`](RopeJointDef)
- [`WeldJointDef`](WeldJointDef)
- [`WheelJointDef`](WheelJointDef)

## Properties

### bodyA

> **bodyA**: [`Body`](../classes/Body)

The first attached body.

***

### bodyB

> **bodyB**: [`Body`](../classes/Body)

The second attached body.

***

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

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
