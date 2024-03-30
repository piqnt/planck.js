[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [JointDef](jointdef.md)

# Interface: JointDef

Joint definitions are used to construct joints.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **JointDef**

  ↳ [DistanceJointDef](distancejointdef.md)

  ↳ [FrictionJointDef](frictionjointdef.md)

  ↳ [RevoluteJointDef](revolutejointdef.md)

  ↳ [PrismaticJointDef](prismaticjointdef.md)

  ↳ [GearJointDef](gearjointdef.md)

  ↳ [MotorJointDef](motorjointdef.md)

  ↳ [MouseJointDef](mousejointdef.md)

  ↳ [PulleyJointDef](pulleyjointdef.md)

  ↳ [RopeJointDef](ropejointdef.md)

  ↳ [WeldJointDef](weldjointdef.md)

  ↳ [WheelJointDef](wheeljointdef.md)

## Index

### Properties

* [bodyA](jointdef.md#bodya)
* [bodyB](jointdef.md#bodyb)
* [collideConnected](jointdef.md#optional-collideconnected)
* [userData](jointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
