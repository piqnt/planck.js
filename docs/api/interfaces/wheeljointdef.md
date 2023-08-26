[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJointDef](wheeljointdef.md)

# Interface: WheelJointDef

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [WheelJointOpt](wheeljointopt.md)

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

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[dampingRatio](wheeljointopt.md#optional-dampingratio)*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [WheelJointOpt](wheeljointopt.md).[enableMotor](wheeljointopt.md#optional-enablemotor)*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[frequencyHz](wheeljointopt.md#optional-frequencyhz)*

Suspension frequency, zero indicates no suspension.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](vec2value.md)*

The local anchor point relative to bodyB's origin.

___

###  localAxisA

• **localAxisA**: *[Vec2Value](vec2value.md)*

The local translation axis in bodyA.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[maxMotorTorque](wheeljointopt.md#optional-maxmotortorque)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [WheelJointOpt](wheeljointopt.md).[motorSpeed](wheeljointopt.md#optional-motorspeed)*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
