---
showOutline: false
---

# Interface: WheelJointDef

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [WheelJointOpt](/api/interfaces/wheeljointopt)

  ↳ **WheelJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/wheeljointdef#bodya)
* [bodyB](/api/interfaces/wheeljointdef#bodyb)
* [collideConnected](/api/interfaces/wheeljointdef#optional-collideconnected)
* [dampingRatio](/api/interfaces/wheeljointdef#optional-dampingratio)
* [enableMotor](/api/interfaces/wheeljointdef#optional-enablemotor)
* [frequencyHz](/api/interfaces/wheeljointdef#optional-frequencyhz)
* [localAnchorA](/api/interfaces/wheeljointdef#localanchora)
* [localAnchorB](/api/interfaces/wheeljointdef#localanchorb)
* [localAxisA](/api/interfaces/wheeljointdef#localaxisa)
* [maxMotorTorque](/api/interfaces/wheeljointdef#optional-maxmotortorque)
* [motorSpeed](/api/interfaces/wheeljointdef#optional-motorspeed)
* [userData](/api/interfaces/wheeljointdef#optional-userdata)

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

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [WheelJointOpt](/api/interfaces/wheeljointopt).[dampingRatio](/api/interfaces/wheeljointopt#optional-dampingratio)*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [WheelJointOpt](/api/interfaces/wheeljointopt).[enableMotor](/api/interfaces/wheeljointopt#optional-enablemotor)*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [WheelJointOpt](/api/interfaces/wheeljointopt).[frequencyHz](/api/interfaces/wheeljointopt#optional-frequencyhz)*

Suspension frequency, zero indicates no suspension.

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

The local translation axis in bodyA.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [WheelJointOpt](/api/interfaces/wheeljointopt).[maxMotorTorque](/api/interfaces/wheeljointopt#optional-maxmotortorque)*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [WheelJointOpt](/api/interfaces/wheeljointopt).[motorSpeed](/api/interfaces/wheeljointopt#optional-motorspeed)*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
