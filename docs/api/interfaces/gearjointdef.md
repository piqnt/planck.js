[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJointDef](gearjointdef.md)

# Interface: GearJointDef

Gear joint definition.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [GearJointOpt](gearjointopt.md)

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

*Defined in [dynamics/Joint.ts:77](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L77)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [dynamics/Joint.ts:81](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L81)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

###  joint1

• **joint1**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

*Defined in [dynamics/joint/GearJoint.ts:57](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/GearJoint.ts#L57)*

The first revolute/prismatic joint attached to the gear joint.

___

###  joint2

• **joint2**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

*Defined in [dynamics/joint/GearJoint.ts:61](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/GearJoint.ts#L61)*

The second prismatic/revolute joint attached to the gear joint.

___

### `Optional` ratio

• **ratio**? : *number*

*Inherited from [GearJointOpt](gearjointopt.md).[ratio](gearjointopt.md#optional-ratio)*

*Defined in [dynamics/joint/GearJoint.ts:48](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/joint/GearJoint.ts#L48)*

The gear ratio. See [GearJoint](../classes/gearjoint.md) for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
