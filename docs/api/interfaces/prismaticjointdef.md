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

*Defined in [src/dynamics/Joint.ts:77](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L77)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [src/dynamics/Joint.ts:81](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L81)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [src/dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableLimit](prismaticjointopt.md#optional-enablelimit)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:65](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L65)*

Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[enableMotor](prismaticjointopt.md#optional-enablemotor)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:77](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L77)*

Enable/disable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:99](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L99)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:103](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L103)*

The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *[Vec2Value](vec2value.md)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:107](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L107)*

The local translation unit axis in bodyA.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[lowerTranslation](prismaticjointopt.md#optional-lowertranslation)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:69](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L69)*

The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[maxMotorForce](prismaticjointopt.md#optional-maxmotorforce)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:81](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L81)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[motorSpeed](prismaticjointopt.md#optional-motorspeed)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:85](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L85)*

The desired motor speed in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:112](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L112)*

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

*Inherited from [PrismaticJointOpt](prismaticjointopt.md).[upperTranslation](prismaticjointopt.md#optional-uppertranslation)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:73](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/joint/PrismaticJoint.ts#L73)*

The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [src/dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
