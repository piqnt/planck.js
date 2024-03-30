[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJointOpt](motorjointopt.md)

# Interface: MotorJointOpt

Motor joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **MotorJointOpt**

  ↳ [MotorJointDef](motorjointdef.md)

## Index

### Properties

* [angularOffset](motorjointopt.md#optional-angularoffset)
* [collideConnected](motorjointopt.md#optional-collideconnected)
* [correctionFactor](motorjointopt.md#optional-correctionfactor)
* [linearOffset](motorjointopt.md#optional-linearoffset)
* [maxForce](motorjointopt.md#optional-maxforce)
* [maxTorque](motorjointopt.md#optional-maxtorque)
* [userData](motorjointopt.md#optional-userdata)

## Properties

### `Optional` angularOffset

• **angularOffset**? : *number*

The bodyB angle minus bodyA angle in radians.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *[Vec2Value](vec2value.md)*

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

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
