
# Interface: PrismaticJointDef

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [PrismaticJointOpt](/api/interfaces/prismaticjointopt)

  ↳ **PrismaticJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/prismaticjointdef#bodya)
* [bodyB](/api/interfaces/prismaticjointdef#bodyb)
* [collideConnected](/api/interfaces/prismaticjointdef#optional-collideconnected)
* [enableLimit](/api/interfaces/prismaticjointdef#optional-enablelimit)
* [enableMotor](/api/interfaces/prismaticjointdef#optional-enablemotor)
* [localAnchorA](/api/interfaces/prismaticjointdef#localanchora)
* [localAnchorB](/api/interfaces/prismaticjointdef#localanchorb)
* [localAxisA](/api/interfaces/prismaticjointdef#localaxisa)
* [lowerTranslation](/api/interfaces/prismaticjointdef#optional-lowertranslation)
* [maxMotorForce](/api/interfaces/prismaticjointdef#optional-maxmotorforce)
* [motorSpeed](/api/interfaces/prismaticjointdef#optional-motorspeed)
* [referenceAngle](/api/interfaces/prismaticjointdef#referenceangle)
* [upperTranslation](/api/interfaces/prismaticjointdef#optional-uppertranslation)
* [userData](/api/interfaces/prismaticjointdef#optional-userdata)

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

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[enableLimit](/api/interfaces/prismaticjointopt#optional-enablelimit)*

Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[enableMotor](/api/interfaces/prismaticjointopt#optional-enablemotor)*

Enable/disable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *[Vec2Value](/api/interfaces/vec2value)*

The local translation unit axis in bodyA.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[lowerTranslation](/api/interfaces/prismaticjointopt#optional-lowertranslation)*

The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[maxMotorForce](/api/interfaces/prismaticjointopt#optional-maxmotorforce)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[motorSpeed](/api/interfaces/prismaticjointopt#optional-motorspeed)*

The desired motor speed in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

referenceAngle The constrained angle between the bodies:
bodyB_angle - bodyA_angle.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

*Inherited from [PrismaticJointOpt](/api/interfaces/prismaticjointopt).[upperTranslation](/api/interfaces/prismaticjointopt#optional-uppertranslation)*

The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
