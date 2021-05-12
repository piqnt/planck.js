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

*Defined in [src/dynamics/Body.ts:105](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L105)*

Does this body start out active?

___

### `Optional` allowSleep

• **allowSleep**? : *boolean*

*Defined in [src/dynamics/Body.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L97)*

Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.

___

### `Optional` angle

• **angle**? : *number*

*Defined in [src/dynamics/Body.ts:63](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L63)*

The world angle of the body in radians.

___

### `Optional` angularDamping

• **angularDamping**? : *number*

*Defined in [src/dynamics/Body.ts:80](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L80)*

Angular damping is use to reduce the angular velocity.
The damping parameter can be larger than 1.0 but the damping effect
becomes sensitive to the time step when the damping parameter is large.

___

### `Optional` angularVelocity

• **angularVelocity**? : *number*

*Defined in [src/dynamics/Body.ts:68](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L68)*

___

### `Optional` awake

• **awake**? : *boolean*

*Defined in [src/dynamics/Body.ts:101](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L101)*

Is this body initially awake or sleeping?

___

### `Optional` bullet

• **bullet**? : *boolean*

*Defined in [src/dynamics/Body.ts:92](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L92)*

Is this a fast moving body that should be prevented from
tunneling through other moving bodies? Note that all bodies are
prevented from tunneling through kinematic and static bodies. This
setting is only considered on dynamic bodies. Warning: You should use
this flag sparingly since it increases processing time.

___

### `Optional` fixedRotation

• **fixedRotation**? : *boolean*

*Defined in [src/dynamics/Body.ts:84](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L84)*

Should this body be prevented from rotating? Useful for characters.

___

### `Optional` gravityScale

• **gravityScale**? : *number*

*Defined in [src/dynamics/Body.ts:93](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L93)*

___

### `Optional` linearDamping

• **linearDamping**? : *number*

*Defined in [src/dynamics/Body.ts:74](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L74)*

Linear damping is use to reduce the linear velocity. The
damping parameter can be larger than 1.0 but the damping effect becomes
sensitive to the time step when the damping parameter is large.

___

### `Optional` linearVelocity

• **linearVelocity**? : *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/Body.ts:67](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L67)*

The linear velocity of the body's origin in world co-ordinates.

___

### `Optional` position

• **position**? : *[Vec2](../classes/vec2.md)*

*Defined in [src/dynamics/Body.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L59)*

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

___

### `Optional` type

• **type**? : *[BodyType](../globals.md#bodytype)*

*Defined in [src/dynamics/Body.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L54)*

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

___

### `Optional` userData

• **userData**? : *any*

*Defined in [src/dynamics/Body.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L106)*
