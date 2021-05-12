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

*Defined in [src/dynamics/Joint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L78)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Defined in [src/dynamics/Joint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L82)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
