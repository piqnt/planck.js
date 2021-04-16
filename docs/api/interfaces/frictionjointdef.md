[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJointDef](frictionjointdef.md)

# Interface: FrictionJointDef

Friction joint definition.
Friction joint definition.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [FrictionJointOpt](frictionjointopt.md)

* JointDef

* FrictionJointOpt

  ↳ **FrictionJointDef**

## Index

### Properties

* [bodyA](frictionjointdef.md#bodya)
* [bodyB](frictionjointdef.md#bodyb)
* [collideConnected](frictionjointdef.md#optional-collideconnected)
* [localAnchorA](frictionjointdef.md#localanchora)
* [localAnchorB](frictionjointdef.md#localanchorb)
* [maxForce](frictionjointdef.md#optional-maxforce)
* [maxTorque](frictionjointdef.md#optional-maxtorque)
* [userData](frictionjointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:969](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L969)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:973](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L973)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:2546](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2546)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:59](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/FrictionJoint.ts#L59)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:2550](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2550)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:63](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/FrictionJoint.ts#L63)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxForce](frictionjointopt.md#optional-maxforce)*

*Overrides void*

*Defined in [dist/planck.d.ts:2533](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2533)*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxTorque](frictionjointopt.md#optional-maxtorque)*

*Overrides void*

*Defined in [dist/planck.d.ts:2537](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2537)*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
