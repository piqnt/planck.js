[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJointOpt](frictionjointopt.md)

# Interface: FrictionJointOpt

Friction joint definition.
Friction joint definition.

## Hierarchy

* [JointOpt](jointopt.md)

* JointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Defined in [dist/planck.d.ts:2456](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2456)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:46](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/FrictionJoint.ts#L46)*

The maximum friction force in N.
The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Defined in [dist/planck.d.ts:2460](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2460)*

*Defined in [src/dynamics/joint/FrictionJoint.ts:50](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/FrictionJoint.ts#L50)*

The maximum friction torque in N-m.
The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
