# Interface: PrismaticJointOpt

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointOpt`](JointOpt)

## Extended by

- [`PrismaticJointDef`](PrismaticJointDef)

## Properties

### collideConnected?

> `optional` **collideConnected**: `boolean`

Set this flag to true if the attached bodies
should collide.

#### Inherited from

[`JointOpt`](JointOpt).[`collideConnected`](JointOpt#collideconnected)

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

> `optional` **style**: [`Style`](Style)

Styling for dev-tools.

#### Inherited from

[`JointOpt`](JointOpt).[`style`](JointOpt#style)

***

### upperTranslation?

> `optional` **upperTranslation**: `number`

The upper translation limit, usually in meters.

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`JointOpt`](JointOpt).[`userData`](JointOpt#userdata)
