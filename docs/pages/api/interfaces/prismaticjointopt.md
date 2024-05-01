---
showOutline: false
---

# Interface: PrismaticJointOpt

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **PrismaticJointOpt**

  ↳ [PrismaticJointDef](/api/interfaces/prismaticjointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/prismaticjointopt#optional-collideconnected)
* [enableLimit](/api/interfaces/prismaticjointopt#optional-enablelimit)
* [enableMotor](/api/interfaces/prismaticjointopt#optional-enablemotor)
* [lowerTranslation](/api/interfaces/prismaticjointopt#optional-lowertranslation)
* [maxMotorForce](/api/interfaces/prismaticjointopt#optional-maxmotorforce)
* [motorSpeed](/api/interfaces/prismaticjointopt#optional-motorspeed)
* [upperTranslation](/api/interfaces/prismaticjointopt#optional-uppertranslation)
* [userData](/api/interfaces/prismaticjointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

Enable/disable the joint motor.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

The desired motor speed in radians per second.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
