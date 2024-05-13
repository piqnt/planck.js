
# Interface: PulleyJointOpt

Pulley joint definition. This requires two ground anchors, two dynamic body
anchor points, and a pulley ratio.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **PulleyJointOpt**

  ↳ [PulleyJointDef](/api/interfaces/pulleyjointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/pulleyjointopt#optional-collideconnected)
* [userData](/api/interfaces/pulleyjointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
