# Interface: PrismaticJointDef

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt)

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

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`collideConnected`](/api/interfaces/PrismaticJointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

Enable/disable the joint limit.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`enableLimit`](/api/interfaces/PrismaticJointOpt#enablelimit)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`enableMotor`](/api/interfaces/PrismaticJointOpt#enablemotor)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local anchor point relative to bodyB's origin.

***

### localAxisA

> **localAxisA**: [`Vec2Value`](/api/interfaces/Vec2Value)

The local translation unit axis in bodyA.

***

### lowerTranslation?

> `optional` **lowerTranslation**: `number`

The lower translation limit, usually in meters.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`lowerTranslation`](/api/interfaces/PrismaticJointOpt#lowertranslation)

***

### maxMotorForce?

> `optional` **maxMotorForce**: `number`

The maximum motor torque, usually in N-m.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`maxMotorForce`](/api/interfaces/PrismaticJointOpt#maxmotorforce)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`motorSpeed`](/api/interfaces/PrismaticJointOpt#motorspeed)

***

### referenceAngle?

> `optional` **referenceAngle**: `number`

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`style`](/api/interfaces/PrismaticJointOpt#style)

***

### upperTranslation?

> `optional` **upperTranslation**: `number`

The upper translation limit, usually in meters.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`upperTranslation`](/api/interfaces/PrismaticJointOpt#uppertranslation)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`PrismaticJointOpt`](/api/interfaces/PrismaticJointOpt).[`userData`](/api/interfaces/PrismaticJointOpt#userdata)
