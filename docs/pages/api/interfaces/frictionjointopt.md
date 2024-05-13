
# Interface: FrictionJointOpt

Friction joint definition.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **FrictionJointOpt**

  ↳ [FrictionJointDef](/api/interfaces/frictionjointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/frictionjointopt#optional-collideconnected)
* [maxForce](/api/interfaces/frictionjointopt#optional-maxforce)
* [maxTorque](/api/interfaces/frictionjointopt#optional-maxtorque)
* [userData](/api/interfaces/frictionjointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxForce

• **maxForce**? : *number*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
