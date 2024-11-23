# Interface: PrismaticJointDef

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Extends

- [`JointDef`](JointDef).[`PrismaticJointOpt`](PrismaticJointOpt)

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

[`PrismaticJointOpt`](PrismaticJointOpt).[`collideConnected`](PrismaticJointOpt#collideconnected)

***

### enableLimit?

> `optional` **enableLimit**: `boolean`

Enable/disable the joint limit.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`enableLimit`](PrismaticJointOpt#enablelimit)

***

### enableMotor?

> `optional` **enableMotor**: `boolean`

Enable/disable the joint motor.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`enableMotor`](PrismaticJointOpt#enablemotor)

***

### localAnchorA

> **localAnchorA**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyA's origin.

***

### localAnchorB

> **localAnchorB**: [`Vec2Value`](Vec2Value)

The local anchor point relative to bodyB's origin.

***

### localAxisA

> **localAxisA**: [`Vec2Value`](Vec2Value)

The local translation unit axis in bodyA.

***

### lowerTranslation?

> `optional` **lowerTranslation**: `number`

The lower translation limit, usually in meters.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`lowerTranslation`](PrismaticJointOpt#lowertranslation)

***

### maxMotorForce?

> `optional` **maxMotorForce**: `number`

The maximum motor torque, usually in N-m.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`maxMotorForce`](PrismaticJointOpt#maxmotorforce)

***

### motorSpeed?

> `optional` **motorSpeed**: `number`

The desired motor speed in radians per second.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`motorSpeed`](PrismaticJointOpt#motorspeed)

***

### referenceAngle

> **referenceAngle**: `number`

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

***

### upperTranslation?

> `optional` **upperTranslation**: `number`

The upper translation limit, usually in meters.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`upperTranslation`](PrismaticJointOpt#uppertranslation)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`PrismaticJointOpt`](PrismaticJointOpt).[`userData`](PrismaticJointOpt#userdata)
