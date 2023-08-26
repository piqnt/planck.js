[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJointOpt](frictionjointopt.md)

# Interface: FrictionJointOpt

Friction joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **FrictionJointOpt**

  ↳ [FrictionJointDef](frictionjointdef.md)

## Index

### Properties

* [collideConnected](frictionjointopt.md#optional-collideconnected)
* [maxForce](frictionjointopt.md#optional-maxforce)
* [maxTorque](frictionjointopt.md#optional-maxtorque)
* [userData](frictionjointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxForce

• **maxForce**? : *number*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
