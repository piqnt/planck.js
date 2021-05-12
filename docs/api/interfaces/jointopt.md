[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [JointOpt](jointopt.md)

# Interface: JointOpt

Joint definitions are used to construct joints.

## Hierarchy

* **JointOpt**

  ↳ [JointDef](jointdef.md)

  ↳ [DistanceJointOpt](distancejointopt.md)

  ↳ [FrictionJointOpt](frictionjointopt.md)

  ↳ [RevoluteJointOpt](revolutejointopt.md)

  ↳ [PrismaticJointOpt](prismaticjointopt.md)

  ↳ [GearJointOpt](gearjointopt.md)

  ↳ [MotorJointOpt](motorjointopt.md)

  ↳ [MouseJointOpt](mousejointopt.md)

  ↳ [PulleyJointOpt](pulleyjointopt.md)

  ↳ [RopeJointOpt](ropejointopt.md)

  ↳ [WeldJointOpt](weldjointopt.md)

  ↳ [WheelJointOpt](wheeljointopt.md)

## Index

### Properties

* [collideConnected](jointopt.md#optional-collideconnected)
* [userData](jointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
