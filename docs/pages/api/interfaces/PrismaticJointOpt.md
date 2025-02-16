# Interface: PrismaticJointOpt

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointOpt`](/api/interfaces/JointOpt)

## Extended by

- [`PrismaticJointDef`](/api/interfaces/PrismaticJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`collideConnected`](/api/interfaces/JointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

Enable/disable the joint limit.

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

***

### lowerTranslation?

> `optional` **lowerTranslation**: `number`

The lower translation limit, usually in meters.

***

### maxMotorForce?

> `optional` **maxMotorForce**: `number`

The maximum motor torque, usually in N-m.

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`style`](/api/interfaces/JointOpt#style)

***

### upperTranslation?

> `optional` **upperTranslation**: `number`

The upper translation limit, usually in meters.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](/api/interfaces/JointOpt).[`userData`](/api/interfaces/JointOpt#userdata)
