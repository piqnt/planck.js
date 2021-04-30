[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJointDef](prismaticjointdef.md)

# Interface: PrismaticJointDef

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.
Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [PrismaticJointOpt](prismaticjointopt.md)

* JointDef

* PrismaticJointOpt

  ↳ **PrismaticJointDef**

## Index

### Properties

* [bodyA](prismaticjointdef.md#bodya)
* [bodyB](prismaticjointdef.md#bodyb)
* [collideConnected](prismaticjointdef.md#optional-collideconnected)
* [enableLimit](prismaticjointdef.md#optional-enablelimit)
* [enableMotor](prismaticjointdef.md#optional-enablemotor)
* [localAnchorA](prismaticjointdef.md#localanchora)
* [localAnchorB](prismaticjointdef.md#localanchorb)
* [localAxisA](prismaticjointdef.md#localaxisa)
* [lowerTranslation](prismaticjointdef.md#optional-lowertranslation)
* [maxMotorForce](prismaticjointdef.md#optional-maxmotorforce)
* [motorSpeed](prismaticjointdef.md#optional-motorspeed)
* [referenceAngle](prismaticjointdef.md#referenceangle)
* [upperTranslation](prismaticjointdef.md#optional-uppertranslation)
* [userData](prismaticjointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableLimit](prismaticjointopt.md#optional-enablelimit)*

*Overrides void*

*Defined in [dist/planck.d.ts:2716](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2716)*

Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableMotor](prismaticjointopt.md#optional-enablemotor)*

*Overrides void*

*Defined in [dist/planck.d.ts:2728](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2728)*

Enable/disable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:2750](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2750)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:93](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/PrismaticJoint.ts#L93)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:2754](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2754)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:97](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/PrismaticJoint.ts#L97)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *Vec2*

*Defined in [dist/planck.d.ts:2758](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2758)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:101](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/PrismaticJoint.ts#L101)*

The local translation unit axis in bodyA.
The local translation unit axis in bodyA.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[lowerTranslation](prismaticjointopt.md#optional-lowertranslation)*

*Overrides void*

*Defined in [dist/planck.d.ts:2720](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2720)*

The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[maxMotorForce](prismaticjointopt.md#optional-maxmotorforce)*

*Overrides void*

*Defined in [dist/planck.d.ts:2732](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2732)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[motorSpeed](prismaticjointopt.md#optional-motorspeed)*

*Overrides void*

*Defined in [dist/planck.d.ts:2736](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2736)*

The desired motor speed in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

*Defined in [dist/planck.d.ts:2763](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2763)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:106](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/PrismaticJoint.ts#L106)*

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.
referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[upperTranslation](prismaticjointopt.md#optional-uppertranslation)*

*Overrides void*

*Defined in [dist/planck.d.ts:2724](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2724)*

The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
