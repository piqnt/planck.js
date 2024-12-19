# Interface: JointOpt

Joint definitions are used to construct joints.

## Extended by

- [`JointDef`](JointDef)
- [`DistanceJointOpt`](DistanceJointOpt)
- [`FrictionJointOpt`](FrictionJointOpt)
- [`GearJointOpt`](GearJointOpt)
- [`MotorJointOpt`](MotorJointOpt)
- [`MouseJointOpt`](MouseJointOpt)
- [`PrismaticJointOpt`](PrismaticJointOpt)
- [`PulleyJointOpt`](PulleyJointOpt)
- [`RevoluteJointOpt`](RevoluteJointOpt)
- [`RopeJointOpt`](RopeJointOpt)
- [`WeldJointOpt`](WeldJointOpt)
- [`WheelJointOpt`](WheelJointOpt)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

***

### style?

> `optional` **style**: [`Style`](Style)

Styling for dev-tools.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.
