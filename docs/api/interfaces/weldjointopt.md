[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WeldJointOpt](weldjointopt.md)

# Interface: WeldJointOpt

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

**`prop`** {float} frequencyHz

**`prop`** {float} dampingRatio

**`prop`** {Vec2} localAnchorA

**`prop`** {Vec2} localAnchorB

**`prop`** {float} referenceAngle

## Hierarchy

* [JointOpt](jointopt.md)

  ↳ **WeldJointOpt**

  ↳ [WeldJointDef](weldjointdef.md)

## Index

### Properties

* [collideConnected](weldjointopt.md#optional-collideconnected)
* [dampingRatio](weldjointopt.md#optional-dampingratio)
* [frequencyHz](weldjointopt.md#optional-frequencyhz)
* [referenceAngle](weldjointopt.md#optional-referenceangle)
* [userData](weldjointopt.md#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dynamics/Joint.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L68)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Defined in [dynamics/joint/WeldJoint.ts:62](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L62)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Defined in [dynamics/joint/WeldJoint.ts:58](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L58)*

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

___

### `Optional` referenceAngle

• **referenceAngle**? : *number*

*Defined in [dynamics/joint/WeldJoint.ts:66](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/joint/WeldJoint.ts#L66)*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dynamics/Joint.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Joint.ts#L63)*

Use this to attach application specific data to your joints.
