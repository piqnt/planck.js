---
showOutline: false
---

# Interface: WeldJointDef

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [WeldJointOpt](/api/interfaces/weldjointopt)

  ↳ **WeldJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/weldjointdef#bodya)
* [bodyB](/api/interfaces/weldjointdef#bodyb)
* [collideConnected](/api/interfaces/weldjointdef#optional-collideconnected)
* [dampingRatio](/api/interfaces/weldjointdef#optional-dampingratio)
* [frequencyHz](/api/interfaces/weldjointdef#optional-frequencyhz)
* [localAnchorA](/api/interfaces/weldjointdef#localanchora)
* [localAnchorB](/api/interfaces/weldjointdef#localanchorb)
* [referenceAngle](/api/interfaces/weldjointdef#optional-referenceangle)
* [userData](/api/interfaces/weldjointdef#optional-userdata)

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

*Inherited from [WeldJointOpt](/api/interfaces/weldjointopt).[dampingRatio](/api/interfaces/weldjointopt#optional-dampingratio)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [WeldJointOpt](/api/interfaces/weldjointopt).[frequencyHz](/api/interfaces/weldjointopt#optional-frequencyhz)*

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

___

###  localAnchorA

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

### `Optional` referenceAngle

• **referenceAngle**? : *number*

*Inherited from [WeldJointOpt](/api/interfaces/weldjointopt).[referenceAngle](/api/interfaces/weldjointopt#optional-referenceangle)*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
