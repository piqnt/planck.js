
# Interface: MotorJointOpt

Motor joint definition.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **MotorJointOpt**

  ↳ [MotorJointDef](/api/interfaces/motorjointdef)

## Index

### Properties

* [angularOffset](/api/interfaces/motorjointopt#optional-angularoffset)
* [collideConnected](/api/interfaces/motorjointopt#optional-collideconnected)
* [correctionFactor](/api/interfaces/motorjointopt#optional-correctionfactor)
* [linearOffset](/api/interfaces/motorjointopt#optional-linearoffset)
* [maxForce](/api/interfaces/motorjointopt#optional-maxforce)
* [maxTorque](/api/interfaces/motorjointopt#optional-maxtorque)
* [userData](/api/interfaces/motorjointopt#optional-userdata)

## Properties

### `Optional` angularOffset

• **angularOffset**? : *number*

The bodyB angle minus bodyA angle in radians.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *[Vec2Value](/api/interfaces/vec2value)*

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

___

### `Optional` maxForce

• **maxForce**? : *number*

The maximum motor force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

The maximum motor torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
