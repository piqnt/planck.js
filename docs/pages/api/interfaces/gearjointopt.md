
# Interface: GearJointOpt

Gear joint definition.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **GearJointOpt**

  ↳ [GearJointDef](/api/interfaces/gearjointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/gearjointopt#optional-collideconnected)
* [ratio](/api/interfaces/gearjointopt#optional-ratio)
* [userData](/api/interfaces/gearjointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` ratio

• **ratio**? : *number*

The gear ratio. See [GearJoint](../classes/gearjoint) for explanation.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
