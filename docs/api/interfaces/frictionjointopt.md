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

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [src/dynamics/joint/FrictionJoint.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L46)*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Defined in [src/dynamics/joint/FrictionJoint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/FrictionJoint.ts#L50)*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
