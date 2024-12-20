# Interface: JointOpt

Joint definitions are used to construct joints.

## Extended by

- [`JointDef`](/api/interfaces/JointDef)
- [`DistanceJointOpt`](/api/interfaces/DistanceJointOpt)
- [`FrictionJointOpt`](/api/interfaces/FrictionJointOpt)
- [`GearJointOpt`](/api/interfaces/GearJointOpt)
- [`MotorJointOpt`](/api/interfaces/MotorJointOpt)
- [`MouseJointOpt`](/api/interfaces/MouseJointOpt)
- [`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt)
- [`PulleyJointOpt`](/api/interfaces/PulleyJointOpt)
- [`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt)
- [`RopeJointOpt`](/api/interfaces/RopeJointOpt)
- [`WeldJointOpt`](/api/interfaces/WeldJointOpt)
- [`WheelJointOpt`](/api/interfaces/WheelJointOpt)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.
