
# Interface: JointDef

Joint definitions are used to construct joints.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **JointDef**

  ↳ [DistanceJointDef](/api/interfaces/distancejointdef)

  ↳ [FrictionJointDef](/api/interfaces/frictionjointdef)

  ↳ [RevoluteJointDef](/api/interfaces/revolutejointdef)

  ↳ [PrismaticJointDef](/api/interfaces/prismaticjointdef)

  ↳ [GearJointDef](/api/interfaces/gearjointdef)

  ↳ [MotorJointDef](/api/interfaces/motorjointdef)

  ↳ [MouseJointDef](/api/interfaces/mousejointdef)

  ↳ [PulleyJointDef](/api/interfaces/pulleyjointdef)

  ↳ [RopeJointDef](/api/interfaces/ropejointdef)

  ↳ [WeldJointDef](/api/interfaces/weldjointdef)

  ↳ [WheelJointDef](/api/interfaces/wheeljointdef)

## Index

### Properties

* [bodyA](/api/interfaces/jointdef#bodya)
* [bodyB](/api/interfaces/jointdef#bodyb)
* [collideConnected](/api/interfaces/jointdef#optional-collideconnected)
* [userData](/api/interfaces/jointdef#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](/api/classes/body)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](/api/classes/body)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
