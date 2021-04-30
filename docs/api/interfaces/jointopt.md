[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [JointOpt](jointopt.md)

# Interface: JointOpt

Joint definitions are used to construct joints.
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

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

*Defined in [src/dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.
Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

*Defined in [src/dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
Use this to attach application specific data to your joints.
