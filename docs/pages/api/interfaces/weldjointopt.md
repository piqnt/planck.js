---
showOutline: false
---

# Interface: WeldJointOpt

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **WeldJointOpt**

  ↳ [WeldJointDef](/api/interfaces/weldjointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/weldjointopt#optional-collideconnected)
* [dampingRatio](/api/interfaces/weldjointopt#optional-dampingratio)
* [frequencyHz](/api/interfaces/weldjointopt#optional-frequencyhz)
* [referenceAngle](/api/interfaces/weldjointopt#optional-referenceangle)
* [userData](/api/interfaces/weldjointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

___

### `Optional` referenceAngle

• **referenceAngle**? : *number*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
