[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJointDef](frictionjointdef.md)

# Interface: FrictionJointDef

Friction joint definition.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [FrictionJointOpt](frictionjointopt.md)

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

*Defined in [src/dynamics/Joint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L78)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [src/dynamics/Joint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L82)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L59)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:63](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L63)*

The local anchor point relative to bodyB's origin.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxForce](frictionjointopt.md#optional-maxforce)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L46)*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxTorque](frictionjointopt.md#optional-maxtorque)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L50)*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
