[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJointOpt](revolutejointopt.md)

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

* [JointOpt](jointopt.md)

  ↳ **RevoluteJointOpt**

  ↳ [RevoluteJointDef](revolutejointdef.md)

## Index

### Properties

* [collideConnected](revolutejointopt.md#optional-collideconnected)
* [enableLimit](revolutejointopt.md#optional-enablelimit)
* [enableMotor](revolutejointopt.md#optional-enablemotor)
* [lowerAngle](revolutejointopt.md#optional-lowerangle)
* [maxMotorTorque](revolutejointopt.md#optional-maxmotortorque)
* [motorSpeed](revolutejointopt.md#optional-motorspeed)
* [upperAngle](revolutejointopt.md#optional-upperangle)
* [userData](revolutejointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

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

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

Use this to attach application specific data to your joints.
