# Interface: MotorJointDef

Motor joint definition.

## Extends

- [`JointDef`](/api/interfaces/JointDef).[`MotorJointOpt`](/api/interfaces/MotorJointOpt)

## Properties

### angularOffset?

> `optional` **angularOffset**: `number`

The bodyB angle minus bodyA angle in radians.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`angularOffset`](/api/interfaces/MotorJointOpt#angularoffset)

***

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

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`collideConnected`](/api/interfaces/MotorJointOpt#collideconnected)

***

### correctionFactor?

> `optional` **correctionFactor**: `number`

Position correction factor in the range [0,1].

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`correctionFactor`](/api/interfaces/MotorJointOpt#correctionfactor)

***

### linearOffset?

> `optional` **linearOffset**: [`Vec2Value`](/api/interfaces/Vec2Value)

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`linearOffset`](/api/interfaces/MotorJointOpt#linearoffset)

***

### maxForce?

> `optional` **maxForce**: `number`

The maximum motor force in N.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`maxForce`](/api/interfaces/MotorJointOpt#maxforce)

***

### maxTorque?

> `optional` **maxTorque**: `number`

The maximum motor torque in N-m.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`maxTorque`](/api/interfaces/MotorJointOpt#maxtorque)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`style`](/api/interfaces/MotorJointOpt#style)

***

### userData?

> `optional` **userData**: `any`

Use this to attach application specific data to your joints.

#### Inherited from

[`MotorJointOpt`](/api/interfaces/MotorJointOpt).[`userData`](/api/interfaces/MotorJointOpt#userdata)
