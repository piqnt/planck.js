[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJointOpt](prismaticjointopt.md)

# Interface: PrismaticJointOpt

Prismatic joint definition. This requires defining a line of motion using an
axis and an anchor point. The definition uses local anchor points and a local
axis so that the initial configuration can violate the constraint slightly.
The joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **PrismaticJointOpt**

  ↳ [PrismaticJointDef](prismaticjointdef.md)

## Index

### Properties

* [collideConnected](prismaticjointopt.md#optional-collideconnected)
* [enableLimit](prismaticjointopt.md#optional-enablelimit)
* [enableMotor](prismaticjointopt.md#optional-enablemotor)
* [lowerTranslation](prismaticjointopt.md#optional-lowertranslation)
* [maxMotorForce](prismaticjointopt.md#optional-maxmotorforce)
* [motorSpeed](prismaticjointopt.md#optional-motorspeed)
* [upperTranslation](prismaticjointopt.md#optional-uppertranslation)
* [userData](prismaticjointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

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

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
