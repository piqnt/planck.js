
# Interface: GearJointDef

Gear joint definition.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [GearJointOpt](/api/interfaces/gearjointopt)

  ↳ **GearJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/gearjointdef#bodya)
* [bodyB](/api/interfaces/gearjointdef#bodyb)
* [collideConnected](/api/interfaces/gearjointdef#optional-collideconnected)
* [joint1](/api/interfaces/gearjointdef#joint1)
* [joint2](/api/interfaces/gearjointdef#joint2)
* [ratio](/api/interfaces/gearjointdef#optional-ratio)
* [userData](/api/interfaces/gearjointdef#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyA](/api/interfaces/jointdef#bodya)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](/api/classes/body)*

*Inherited from [JointDef](/api/interfaces/jointdef).[bodyB](/api/interfaces/jointdef#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

*Overrides [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

###  joint1

• **joint1**: *[RevoluteJoint](/api/classes/revolutejoint) | [PrismaticJoint](/api/classes/prismaticjoint)*

The first revolute/prismatic joint attached to the gear joint.

___

###  joint2

• **joint2**: *[RevoluteJoint](/api/classes/revolutejoint) | [PrismaticJoint](/api/classes/prismaticjoint)*

The second prismatic/revolute joint attached to the gear joint.

___

### `Optional` ratio

• **ratio**? : *number*

*Inherited from [GearJointOpt](/api/interfaces/gearjointopt).[ratio](/api/interfaces/gearjointopt#optional-ratio)*

The gear ratio. See [GearJoint](../classes/gearjoint) for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
