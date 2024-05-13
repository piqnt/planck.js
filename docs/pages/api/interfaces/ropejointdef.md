
# Interface: RopeJointDef

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

  ↳ [JointDef](/api/interfaces/jointdef)

  ↳ [RopeJointOpt](/api/interfaces/ropejointopt)

  ↳ **RopeJointDef**

## Index

### Properties

* [bodyA](/api/interfaces/ropejointdef#bodya)
* [bodyB](/api/interfaces/ropejointdef#bodyb)
* [collideConnected](/api/interfaces/ropejointdef#optional-collideconnected)
* [localAnchorA](/api/interfaces/ropejointdef#localanchora)
* [localAnchorB](/api/interfaces/ropejointdef#localanchorb)
* [maxLength](/api/interfaces/ropejointdef#optional-maxlength)
* [userData](/api/interfaces/ropejointdef#optional-userdata)

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

### `Optional` maxLength

• **maxLength**? : *number*

*Inherited from [RopeJointOpt](/api/interfaces/ropejointopt).[maxLength](/api/interfaces/ropejointopt#optional-maxlength)*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

*Overrides [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
