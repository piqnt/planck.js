# Interface: JointDef

Joint definitions are used to construct joints.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`DistanceJointDef`](/api/interfaces/DistanceJointDef)
- [`FrictionJointDef`](/api/interfaces/FrictionJointDef)
- [`GearJointDef`](/api/interfaces/GearJointDef)
- [`MotorJointDef`](/api/interfaces/MotorJointDef)
- [`MouseJointDef`](/api/interfaces/MouseJointDef)
- [`PrismaticJointDef`](/api/interfaces/PrismaticJointDef)
- [`PulleyJointDef`](/api/interfaces/PulleyJointDef)
- [`RevoluteJointDef`](/api/interfaces/RevoluteJointDef)
- [`RopeJointDef`](/api/interfaces/RopeJointDef)
- [`WeldJointDef`](/api/interfaces/WeldJointDef)
- [`WheelJointDef`](/api/interfaces/WheelJointDef)

## Properties

### bodyA

> **bodyA**: [`Body`](/api/classes/Body)

The first attached body.

***

### bodyB

> **bodyB**: [`Body`](/api/classes/Body)

The second attached body.

***

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

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
