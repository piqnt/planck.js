[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJointDef](prismaticjointdef.md)

# Interface: PrismaticJointDef

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [PrismaticJointOpt](prismaticjointopt.md)

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

*Defined in [src/dynamics/Joint.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L78)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [src/dynamics/Joint.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L82)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L69)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableLimit](prismaticjointopt.md#optional-enablelimit)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L59)*

Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableMotor](prismaticjointopt.md#optional-enablemotor)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:71](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L71)*

Enable/disable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:93](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L93)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L97)*

The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:101](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L101)*

The local translation unit axis in bodyA.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[lowerTranslation](prismaticjointopt.md#optional-lowertranslation)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:63](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L63)*

The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[maxMotorForce](prismaticjointopt.md#optional-maxmotorforce)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L75)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[motorSpeed](prismaticjointopt.md#optional-motorspeed)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:79](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L79)*

The desired motor speed in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L106)*

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[upperTranslation](prismaticjointopt.md#optional-uppertranslation)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:67](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/joint/PrismaticJoint.ts#L67)*

The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L64)*

Use this to attach application specific data to your joints.
