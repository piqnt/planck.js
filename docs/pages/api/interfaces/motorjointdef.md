
# Interface: MotorJointDef

Motor joint definition.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [MotorJointOpt](/api/interfaces/motorjointopt)

  ↳ **MotorJointDef**

## Index

### Properties

* [angularOffset](/api/interfaces/motorjointdef#optional-angularoffset)
* [bodyA](/api/interfaces/motorjointdef#bodya)
* [bodyB](/api/interfaces/motorjointdef#bodyb)
* [collideConnected](/api/interfaces/motorjointdef#optional-collideconnected)
* [correctionFactor](/api/interfaces/motorjointdef#optional-correctionfactor)
* [linearOffset](/api/interfaces/motorjointdef#optional-linearoffset)
* [maxForce](/api/interfaces/motorjointdef#optional-maxforce)
* [maxTorque](/api/interfaces/motorjointdef#optional-maxtorque)
* [userData](/api/interfaces/motorjointdef#optional-userdata)

## Properties

### `Optional` angularOffset

• **angularOffset**? : *number*

*Inherited from [MotorJointOpt](/api/interfaces/motorjointopt).[angularOffset](/api/interfaces/motorjointopt#optional-angularoffset)*

The bodyB angle minus bodyA angle in radians.

___

###  bodyA

• **bodyA**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyA](/api/interfaces/jointdef#bodya)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyB](/api/interfaces/jointdef#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

*Overrides [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

*Inherited from [MotorJointOpt](/api/interfaces/motorjointopt).[correctionFactor](/api/interfaces/motorjointopt#optional-correctionfactor)*

Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *[Vec2Value](/api/interfaces/vec2value)*

*Inherited from [MotorJointOpt](/api/interfaces/motorjointopt).[linearOffset](/api/interfaces/motorjointopt#optional-linearoffset)*

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MotorJointOpt](/api/interfaces/motorjointopt).[maxForce](/api/interfaces/motorjointopt#optional-maxforce)*

The maximum motor force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [MotorJointOpt](/api/interfaces/motorjointopt).[maxTorque](/api/interfaces/motorjointopt#optional-maxtorque)*

The maximum motor torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
