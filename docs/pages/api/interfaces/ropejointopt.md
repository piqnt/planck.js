---
showOutline: false
---

# Interface: RopeJointOpt

Rope joint definition. This requires two body anchor points and a maximum
lengths. Note: by default the connected objects will not collide. see
collideConnected in JointDef.

## Hierarchy

* [JointOpt](/api/interfaces/jointopt)

  ↳ **RopeJointOpt**

  ↳ [RopeJointDef](/api/interfaces/ropejointdef)

## Index

### Properties

* [collideConnected](/api/interfaces/ropejointopt#optional-collideconnected)
* [maxLength](/api/interfaces/ropejointopt#optional-maxlength)
* [userData](/api/interfaces/ropejointopt#optional-userdata)

## Properties

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](/api/interfaces/jointopt).[collideConnected](/api/interfaces/jointopt#optional-collideconnected)*

Set this flag to true if the attached bodies
should collide.

___

### `Optional` maxLength

• **maxLength**? : *number*

The maximum length of the rope.
Warning: this must be larger than linearSlop or the joint will have no effect.

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](/api/interfaces/jointopt).[userData](/api/interfaces/jointopt#optional-userdata)*

Use this to attach application specific data to your joints.
