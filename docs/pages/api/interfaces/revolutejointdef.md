---
showOutline: false
---

# Interface: RevoluteJointDef

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

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [RevoluteJointOpt](/api/interfaces/revolutejointopt)

  ↳ **RevoluteJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/revolutejointdef#bodya)
* [bodyB](/api/interfaces/revolutejointdef#bodyb)
* [collideConnected](/api/interfaces/revolutejointdef#optional-collideconnected)
* [enableLimit](/api/interfaces/revolutejointdef#optional-enablelimit)
* [enableMotor](/api/interfaces/revolutejointdef#optional-enablemotor)
* [localAnchorA](/api/interfaces/revolutejointdef#localanchora)
* [localAnchorB](/api/interfaces/revolutejointdef#localanchorb)
* [lowerAngle](/api/interfaces/revolutejointdef#optional-lowerangle)
* [maxMotorTorque](/api/interfaces/revolutejointdef#optional-maxmotortorque)
* [motorSpeed](/api/interfaces/revolutejointdef#optional-motorspeed)
* [referenceAngle](/api/interfaces/revolutejointdef#referenceangle)
* [upperAngle](/api/interfaces/revolutejointdef#optional-upperangle)
* [userData](/api/interfaces/revolutejointdef#optional-userdata)

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

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[enableLimit](/api/interfaces/revolutejointopt#optional-enablelimit)*

A flag to enable joint limits.

___

### `Optional` enableMotor

• **enableMotor**? : *boolean*

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[enableMotor](/api/interfaces/revolutejointopt#optional-enablemotor)*

A flag to enable the joint motor.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

### `Optional` lowerAngle

• **lowerAngle**? : *number*

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[lowerAngle](/api/interfaces/revolutejointopt#optional-lowerangle)*

The lower angle for the joint limit (radians).

___

### `Optional` maxMotorTorque

• **maxMotorTorque**? : *number*

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[maxMotorTorque](/api/interfaces/revolutejointopt#optional-maxmotortorque)*

The maximum motor torque used to achieve the desired motor speed. Usually
in N-m.

___

### `Optional` motorSpeed

• **motorSpeed**? : *number*

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[motorSpeed](/api/interfaces/revolutejointopt#optional-motorspeed)*

The desired motor speed. Usually in radians per second.

___

###  referenceAngle

• **referenceAngle**: *number*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` upperAngle

• **upperAngle**? : *number*

*Inherited from [RevoluteJointOpt](/api/interfaces/revolutejointopt).[upperAngle](/api/interfaces/revolutejointopt#optional-upperangle)*

The upper angle for the joint limit (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
