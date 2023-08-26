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

###  joint1

• **joint1**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

The first revolute/prismatic joint attached to the gear joint.

___

###  joint2

• **joint2**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

The second prismatic/revolute joint attached to the gear joint.

___

### `Optional` ratio

• **ratio**? : *number*

*Inherited from [GearJointOpt](gearjointopt.md).[ratio](gearjointopt.md#optional-ratio)*

The gear ratio. See [GearJoint](../classes/gearjoint.md) for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
