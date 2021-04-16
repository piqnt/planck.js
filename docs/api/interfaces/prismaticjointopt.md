[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJointOpt](prismaticjointopt.md)

# Interface: PrismaticJointOpt

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

* [JointOpt](jointopt.md)

* JointOpt

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

*Overrides void*

*Defined in [dist/planck.d.ts:960](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L960)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

*Defined in [dist/planck.d.ts:2820](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2820)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:59](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L59)*

Enable/disable the joint limit.
Enable/disable the joint limit.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Defined in [dist/planck.d.ts:2832](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2832)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:71](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L71)*

Enable/disable the joint motor.
Enable/disable the joint motor.

___

### `Optional` lowerTranslation

• **lowerTranslation**? : *number*

*Defined in [dist/planck.d.ts:2824](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2824)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:63](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L63)*

The lower translation limit, usually in meters.
The lower translation limit, usually in meters.

___

### `Optional` maxMotorForce

• **maxMotorForce**? : *number*

*Defined in [dist/planck.d.ts:2836](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2836)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:75](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L75)*

The maximum motor torque, usually in N-m.
The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Defined in [dist/planck.d.ts:2840](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2840)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:79](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L79)*

The desired motor speed in radians per second.
The desired motor speed in radians per second.

___

### `Optional` upperTranslation

• **upperTranslation**? : *number*

*Defined in [dist/planck.d.ts:2828](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2828)*

*Defined in [src/dynamics/joint/PrismaticJoint.ts:67](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/joint/PrismaticJoint.ts#L67)*

The upper translation limit, usually in meters.
The upper translation limit, usually in meters.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L955)*

Use this to attach application specific data to your joints.
