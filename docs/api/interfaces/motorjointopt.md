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

*Defined in [src/dynamics/joint/MotorJoint.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MotorJoint.ts#L46)*

The bodyB angle minus bodyA angle in radians.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:58](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MotorJoint.ts#L58)*

Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/MotorJoint.ts:62](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MotorJoint.ts#L62)*

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MotorJoint.ts#L50)*

The maximum motor force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Defined in [src/dynamics/joint/MotorJoint.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/MotorJoint.ts#L54)*

The maximum motor torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
