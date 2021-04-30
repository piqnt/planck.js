[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WeldJointDef](weldjointdef.md)

# Interface: WeldJointDef

Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.
Weld joint definition. You need to specify local anchor points where they are
attached and the relative body angle. The position of the anchor points is
important for computing the reaction torque.

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [WeldJointOpt](weldjointopt.md)

* JointDef

* WeldJointOpt

  ↳ **WeldJointDef**

## Index

### Properties

* [bodyA](weldjointdef.md#bodya)
* [bodyB](weldjointdef.md#bodyb)
* [collideConnected](weldjointdef.md#optional-collideconnected)
* [dampingRatio](weldjointdef.md#optional-dampingratio)
* [frequencyHz](weldjointdef.md#optional-frequencyhz)
* [localAnchorA](weldjointdef.md#localanchora)
* [localAnchorB](weldjointdef.md#localanchorb)
* [referenceAngle](weldjointdef.md#optional-referenceangle)
* [userData](weldjointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Overrides void*

*Defined in [dist/planck.d.ts:947](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L947)*

The first attached body.

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Overrides void*

*Defined in [dist/planck.d.ts:951](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L951)*

The second attached body.

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [dist/planck.d.ts:938](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L938)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` dampingRatio

• **dampingRatio**? : *number*

*Inherited from [WeldJointOpt](weldjointopt.md).[dampingRatio](weldjointopt.md#optional-dampingratio)*

*Overrides void*

*Defined in [dist/planck.d.ts:3388](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3388)*

The damping ratio. 0 = no damping, 1 = critical damping.

___

### `Optional` frequencyHz

• **frequencyHz**? : *number*

*Inherited from [WeldJointOpt](weldjointopt.md).[frequencyHz](weldjointopt.md#optional-frequencyhz)*

*Overrides void*

*Defined in [dist/planck.d.ts:3384](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3384)*

The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
with a value of 0.

___

###  localAnchorA

• **localAnchorA**: *Vec2*

*Defined in [dist/planck.d.ts:3403](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3403)*

*Defined in [src/dynamics/joint/WeldJoint.ts:73](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/WeldJoint.ts#L73)*

The local anchor point relative to bodyA's origin.
The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *Vec2*

*Defined in [dist/planck.d.ts:3407](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3407)*

*Defined in [src/dynamics/joint/WeldJoint.ts:77](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/joint/WeldJoint.ts#L77)*

The local anchor point relative to bodyB's origin.
The local anchor point relative to bodyB's origin.

___

### `Optional` referenceAngle

• **referenceAngle**? : *number*

*Inherited from [WeldJointOpt](weldjointopt.md).[referenceAngle](weldjointopt.md#optional-referenceangle)*

*Overrides void*

*Defined in [dist/planck.d.ts:3392](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L3392)*

The bodyB angle minus bodyA angle in the reference state (radians).

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [dist/planck.d.ts:933](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L933)*

Use this to attach application specific data to your joints.
