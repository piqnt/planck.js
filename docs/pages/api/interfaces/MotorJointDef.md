# Interface: MotorJointDef

Motor joint definition.

## Extends

- [`JointDef`](JointDef).[`MotorJointOpt`](MotorJointOpt)

## Properties

### angularOffset?

> `optional` **angularOffset**: `number`

The bodyB angle minus bodyA angle in radians.

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`angularOffset`](MotorJointOpt#angularoffset)

***

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

[`MotorJointOpt`](MotorJointOpt).[`collideConnected`](MotorJointOpt#collideconnected)

***

### correctionFactor?

> `optional` **correctionFactor**: `number`

Position correction factor in the range [0,1].

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`correctionFactor`](MotorJointOpt#correctionfactor)

***

### linearOffset?

> `optional` **linearOffset**: [`Vec2Value`](Vec2Value)

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`linearOffset`](MotorJointOpt#linearoffset)

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum motor force in N.

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`maxForce`](MotorJointOpt#maxforce)

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum motor torque in N-m.

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`maxTorque`](MotorJointOpt#maxtorque)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`MotorJointOpt`](MotorJointOpt).[`userData`](MotorJointOpt#userdata)
