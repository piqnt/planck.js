
# Interface: WheelJointOpt

Wheel joint definition. This requires defining a line of motion using an axis
and an anchor point. The definition uses local anchor points and a local axis
so that the initial configuration can violate the constraint slightly. The
joint translation is zero when the local anchor points coincide in world
space. Using local anchors and a local axis helps when saving and loading a
game.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **WheelJointOpt**

  ↳ [WheelJointDef](/api/interfaces/wheeljointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/wheeljointopt#optional-collideconnected)
* [dampingRatio](/api/interfaces/wheeljointopt#optional-dampingratio)
* [enableMotor](/api/interfaces/wheeljointopt#optional-enablemotor)
* [frequencyHz](/api/interfaces/wheeljointopt#optional-frequencyhz)
* [maxMotorTorque](/api/interfaces/wheeljointopt#optional-maxmotortorque)
* [motorSpeed](/api/interfaces/wheeljointopt#optional-motorspeed)
* [userData](/api/interfaces/wheeljointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

Suspension damping ratio, one indicates critical damping.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

Enable/disable the joint motor.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

Suspension frequency, zero indicates no suspension.

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

The maximum motor torque, usually in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

The desired motor speed in radians per second.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
