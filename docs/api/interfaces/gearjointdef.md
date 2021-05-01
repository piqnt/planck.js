[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJointDef](gearjointdef.md)

# Interface: GearJointDef

Gear joint definition.
Gear joint definition.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [GearJointOpt](gearjointopt.md)

* JointDef

* GearJointOpt

  ↳ **GearJointDef**

## Index

### Properties

* [bodyA](gearjointdef.md#bodya)
* [bodyB](gearjointdef.md#bodyb)
* [collideConnected](gearjointdef.md#optional-collideconnected)
* [joint1](gearjointdef.md#joint1)
* [joint2](gearjointdef.md#joint2)
* [ratio](gearjointdef.md#optional-ratio)
* [userData](gearjointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

###  joint1

• **joint1**: *RevoluteJoint | PrismaticJoint*

*Defined in [dist/planck.d.ts:2885](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2885)*

*Defined in [src/dynamics/joint/GearJoint.ts:57](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/GearJoint.ts#L57)*

The first revolute/prismatic joint attached to the gear joint.
The first revolute/prismatic joint attached to the gear joint.

___

###  joint2

• **joint2**: *RevoluteJoint | PrismaticJoint*

*Defined in [dist/planck.d.ts:2889](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2889)*

*Defined in [src/dynamics/joint/GearJoint.ts:61](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/GearJoint.ts#L61)*

The second prismatic/revolute joint attached to the gear joint.
The second prismatic/revolute joint attached to the gear joint.

___

### `Optional` ratio

• **ratio**? : *number*

*Inherited from [GearJointOpt](gearjointopt.md).[ratio](gearjointopt.md#optional-ratio)*

*Overrides void*

*Defined in [dist/planck.d.ts:2876](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2876)*

The gear ratio. See GearJoint for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
