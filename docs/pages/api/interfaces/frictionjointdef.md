
# Interface: FrictionJointDef

Friction joint definition.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [FrictionJointOpt](/api/interfaces/frictionjointopt)

  ↳ **FrictionJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/frictionjointdef#bodya)
* [bodyB](/api/interfaces/frictionjointdef#bodyb)
* [collideConnected](/api/interfaces/frictionjointdef#optional-collideconnected)
* [localAnchorA](/api/interfaces/frictionjointdef#localanchora)
* [localAnchorB](/api/interfaces/frictionjointdef#localanchorb)
* [maxForce](/api/interfaces/frictionjointdef#optional-maxforce)
* [maxTorque](/api/interfaces/frictionjointdef#optional-maxtorque)
* [userData](/api/interfaces/frictionjointdef#optional-userdata)

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

###  localAnchorA

• **localAnchorA**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyA's origin.

___

###  localAnchorB

• **localAnchorB**: *[Vec2Value](/api/interfaces/vec2value)*

The local anchor point relative to bodyB's origin.

___

### `Optional` maxForce

• **maxForce**? : *number*

*Inherited from [FrictionJointOpt](/api/interfaces/frictionjointopt).[maxForce](/api/interfaces/frictionjointopt#optional-maxforce)*

The maximum friction force in N.

___

### `Optional` maxTorque

• **maxTorque**? : *number*

*Inherited from [FrictionJointOpt](/api/interfaces/frictionjointopt).[maxTorque](/api/interfaces/frictionjointopt#optional-maxtorque)*

The maximum friction torque in N-m.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
