[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJointDef](motorjointdef.md)

# Interface: MotorJointDef

Motor joint definition.
Motor joint definition.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [MotorJointOpt](motorjointopt.md)

* JointDef

* MotorJointOpt

  ↳ **MotorJointDef**

## Index

### Properties

* [angularOffset](motorjointdef.md#optional-angularoffset)
* [bodyA](motorjointdef.md#bodya)
* [bodyB](motorjointdef.md#bodyb)
* [collideConnected](motorjointdef.md#optional-collideconnected)
* [correctionFactor](motorjointdef.md#optional-correctionfactor)
* [linearOffset](motorjointdef.md#optional-linearoffset)
* [maxForce](motorjointdef.md#optional-maxforce)
* [maxTorque](motorjointdef.md#optional-maxtorque)
* [userData](motorjointdef.md#optional-userdata)

## Properties

### `Optional` angularOffset

• **angularOffset**? : *number*

*Inherited from [MotorJointOpt](motorjointopt.md).[angularOffset](motorjointopt.md#optional-angularoffset)*

*Overrides void*

*Defined in [dist/planck.d.ts:2957](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2957)*

The bodyB angle minus bodyA angle in radians.

___

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` correctionFactor

• **correctionFactor**? : *number*

*Inherited from [MotorJointOpt](motorjointopt.md).[correctionFactor](motorjointopt.md#optional-correctionfactor)*

*Overrides void*

*Defined in [dist/planck.d.ts:2969](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2969)*

Position correction factor in the range [0,1].

___

### `Optional` linearOffset

• **linearOffset**? : *[Vec2](../classes/vec2.md)*

*Inherited from [MotorJointOpt](motorjointopt.md).[linearOffset](motorjointopt.md#optional-linearoffset)*

*Overrides void*

*Defined in [dist/planck.d.ts:2973](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2973)*

Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [MotorJointOpt](motorjointopt.md).[maxForce](motorjointopt.md#optional-maxforce)*

*Overrides void*

*Defined in [dist/planck.d.ts:2961](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2961)*

The maximum motor force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [MotorJointOpt](motorjointopt.md).[maxTorque](motorjointopt.md#optional-maxtorque)*

*Overrides void*

*Defined in [dist/planck.d.ts:2965](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2965)*

The maximum motor torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
