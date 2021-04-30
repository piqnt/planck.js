[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJointDef](wheeljointdef.md)

# Interface: WheelJointDef

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.
Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [WheelJointOpt](wheeljointopt.md)

* JointDef

* WheelJointOpt

  ↳ **WheelJointDef**

## Index

### Properties

* [bodyA](wheeljointdef.md#bodya)
* [bodyB](wheeljointdef.md#bodyb)
* [collideConnected](wheeljointdef.md#optional-collideconnected)
* [dampingRatio](wheeljointdef.md#optional-dampingratio)
* [enableMotor](wheeljointdef.md#optional-enablemotor)
* [frequencyHz](wheeljointdef.md#optional-frequencyhz)
* [localAnchorA](wheeljointdef.md#localanchora)
* [localAnchorB](wheeljointdef.md#localanchorb)
* [localAxisA](wheeljointdef.md#localaxisa)
* [maxMotorTorque](wheeljointdef.md#optional-maxmotortorque)
* [motorSpeed](wheeljointdef.md#optional-motorspeed)
* [userData](wheeljointdef.md#optional-userdata)

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

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[dampingRatio](wheeljointopt.md#optional-dampingratio)*

*Overrides void*

*Defined in [dist/planck.d.ts:3498](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3498)*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [WheelJointOpt](wheeljointopt.md).[enableMotor](wheeljointopt.md#optional-enablemotor)*

*Overrides void*

*Defined in [dist/planck.d.ts:3482](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3482)*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[frequencyHz](wheeljointopt.md#optional-frequencyhz)*

*Overrides void*

*Defined in [dist/planck.d.ts:3494](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3494)*

Suspension frequency, zero indicates no suspension.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:3512](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3512)*

*Defined in [src/dynamics/joint/WheelJoint.ts:77](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WheelJoint.ts#L77)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:3516](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3516)*

*Defined in [src/dynamics/joint/WheelJoint.ts:81](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WheelJoint.ts#L81)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *Vec2*

*Defined in [dist/planck.d.ts:3520](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3520)*

*Defined in [src/dynamics/joint/WheelJoint.ts:85](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WheelJoint.ts#L85)*

The local translation axis in bodyA.
The local translation axis in bodyA.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[maxMotorTorque](wheeljointopt.md#optional-maxmotortorque)*

*Overrides void*

*Defined in [dist/planck.d.ts:3486](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3486)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[motorSpeed](wheeljointopt.md#optional-motorspeed)*

*Overrides void*

*Defined in [dist/planck.d.ts:3490](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3490)*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
