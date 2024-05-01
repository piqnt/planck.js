---
showOutline: false
---

# Interface: RevoluteJointOpt

Revolute joint definition. This requires defining an anchor point where the
bodies are joined. The definition uses local anchor points so that the
initial configuration can violate the constraint slightly. You also need to
specify the initial relative angle for joint limits. This helps when saving
and loading a game.

The local anchor points are measured from the body's origin rather than the
center of mass because: 1. you might not know where the center of mass will
be. 2. if you add/remove shapes from a body and recompute the mass, the
joints will be broken.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **RevoluteJointOpt**

  ↳ [RevoluteJointDef](/api/interfaces/revolutejointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/revolutejointopt#optional-collideconnected)
* [enableLimit](/api/interfaces/revolutejointopt#optional-enablelimit)
* [enableMotor](/api/interfaces/revolutejointopt#optional-enablemotor)
* [lowerAngle](/api/interfaces/revolutejointopt#optional-lowerangle)
* [maxMotorTorque](/api/interfaces/revolutejointopt#optional-maxmotortorque)
* [motorSpeed](/api/interfaces/revolutejointopt#optional-motorspeed)
* [upperAngle](/api/interfaces/revolutejointopt#optional-upperangle)
* [userData](/api/interfaces/revolutejointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` enableLimit

• **enableLimit**? : *boolean*

A flag to enable joint limits.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

A flag to enable the joint motor.

___

### `Optional` lowerAngle

• **lowerAngle**? : *number*

The lower angle for the joint limit (radians).

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

The desired motor speed. Usually in radians per second.

___

### `Optional` upperAngle

• **upperAngle**? : *number*

The upper angle for the joint limit (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
