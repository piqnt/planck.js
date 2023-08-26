[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BodyDef](bodydef.md)

# Interface: BodyDef

## Hierarchy

* **BodyDef**

## Index

### Properties

* [active](bodydef.md#optional-active)
* [allowSleep](bodydef.md#optional-allowsleep)
* [angle](bodydef.md#optional-angle)
* [angularDamping](bodydef.md#optional-angulardamping)
* [angularVelocity](bodydef.md#optional-angularvelocity)
* [awake](bodydef.md#optional-awake)
* [bullet](bodydef.md#optional-bullet)
* [fixedRotation](bodydef.md#optional-fixedrotation)
* [gravityScale](bodydef.md#optional-gravityscale)
* [linearDamping](bodydef.md#optional-lineardamping)
* [linearVelocity](bodydef.md#optional-linearvelocity)
* [position](bodydef.md#optional-position)
* [type](bodydef.md#optional-type)
* [userData](bodydef.md#optional-userdata)

## Properties

### `Optional` active

• **active**? : *boolean*

*Defined in [src/dynamics/Body.ts:113](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L113)*

Does this body start out active?

___

### `Optional` allowSleep

• **allowSleep**? : *boolean*

*Defined in [src/dynamics/Body.ts:105](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L105)*

Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.

___

### `Optional` angle

• **angle**? : *number*

*Defined in [src/dynamics/Body.ts:69](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L69)*

The world angle of the body in radians.

___

### `Optional` angularDamping

• **angularDamping**? : *number*

*Defined in [src/dynamics/Body.ts:88](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L88)*

Angular damping is use to reduce the angular velocity.
The damping parameter can be larger than 1.0 but the damping effect
becomes sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` angularVelocity

• **angularVelocity**? : *number*

*Defined in [src/dynamics/Body.ts:74](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L74)*

___

### `Optional` awake

• **awake**? : *boolean*

*Defined in [src/dynamics/Body.ts:109](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L109)*

Is this body initially awake or sleeping?

___

### `Optional` bullet

• **bullet**? : *boolean*

*Defined in [src/dynamics/Body.ts:100](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L100)*

Is this a fast moving body that should be prevented from
tunneling through other moving bodies? Note that all bodies are
prevented from tunneling through kinematic and static bodies. This
setting is only considered on dynamic bodies. Warning: You should use
this flag sparingly since it increases processing time.

___

### `Optional` fixedRotation

• **fixedRotation**? : *boolean*

*Defined in [src/dynamics/Body.ts:92](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L92)*

Should this body be prevented from rotating? Useful for characters.

___

### `Optional` gravityScale

• **gravityScale**? : *number*

*Defined in [src/dynamics/Body.ts:101](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L101)*

___

### `Optional` linearDamping

• **linearDamping**? : *number*

*Defined in [src/dynamics/Body.ts:81](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L81)*

Linear damping is use to reduce the linear velocity. The
damping parameter can be larger than 1.0 but the damping effect becomes
sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` linearVelocity

• **linearVelocity**? : *Vec2*

*Defined in [src/dynamics/Body.ts:73](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L73)*

The linear velocity of the body's origin in world co-ordinates.

___

### `Optional` position

• **position**? : *Vec2*

*Defined in [src/dynamics/Body.ts:65](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L65)*

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

___

### `Optional` type

• **type**? : *[BodyType](../globals.md#bodytype)*

*Defined in [src/dynamics/Body.ts:60](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L60)*

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

___

### `Optional` userData

• **userData**? : *any*

*Defined in [src/dynamics/Body.ts:114](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Body.ts#L114)*
