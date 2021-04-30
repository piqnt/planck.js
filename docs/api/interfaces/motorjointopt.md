[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJointOpt](motorjointopt.md)

# Interface: MotorJointOpt

Motor joint definition.
Motor joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

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

*Defined in [dist/planck.d.ts:2957](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2957)*

*Defined in [src/dynamics/joint/MotorJoint.ts:46](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L46)*

The bodyB angle minus bodyA angle in radians.
The bodyB angle minus bodyA angle in radians.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

*Defined in [dist/planck.d.ts:2969](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2969)*

*Defined in [src/dynamics/joint/MotorJoint.ts:58](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L58)*

Position correction factor in the range [0,1].
Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *Vec2*

*Defined in [dist/planck.d.ts:2973](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2973)*

*Defined in [src/dynamics/joint/MotorJoint.ts:62](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L62)*

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.
Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [dist/planck.d.ts:2961](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2961)*

*Defined in [src/dynamics/joint/MotorJoint.ts:50](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L50)*

The maximum motor force in N.
The maximum motor force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Defined in [dist/planck.d.ts:2965](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2965)*

*Defined in [src/dynamics/joint/MotorJoint.ts:54](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/MotorJoint.ts#L54)*

The maximum motor torque in N-m.
The maximum motor torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
