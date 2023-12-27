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

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyB's origin.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxForce](frictionjointopt.md#optional-maxforce)*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [FrictionJointOpt](frictionjointopt.md).[maxTorque](frictionjointopt.md#optional-maxtorque)*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
