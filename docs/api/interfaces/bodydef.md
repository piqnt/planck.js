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

*Defined in [dynamics/Body.ts:112](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L112)*

Does this body start out active?

___

### `Optional` allowSleep

• **allowSleep**? : *boolean*

*Defined in [dynamics/Body.ts:104](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L104)*

Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.

___

### `Optional` angle

• **angle**? : *number*

*Defined in [dynamics/Body.ts:68](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L68)*

The world angle of the body in radians.

___

### `Optional` angularDamping

• **angularDamping**? : *number*

*Defined in [dynamics/Body.ts:87](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L87)*

Angular damping is use to reduce the angular velocity.
The damping parameter can be larger than 1.0 but the damping effect
becomes sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` angularVelocity

• **angularVelocity**? : *number*

*Defined in [dynamics/Body.ts:73](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L73)*

___

### `Optional` awake

• **awake**? : *boolean*

*Defined in [dynamics/Body.ts:108](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L108)*

Is this body initially awake or sleeping?

___

### `Optional` bullet

• **bullet**? : *boolean*

*Defined in [dynamics/Body.ts:99](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L99)*

Is this a fast moving body that should be prevented from
tunneling through other moving bodies? Note that all bodies are
prevented from tunneling through kinematic and static bodies. This
setting is only considered on dynamic bodies. Warning: You should use
this flag sparingly since it increases processing time.

___

### `Optional` fixedRotation

• **fixedRotation**? : *boolean*

*Defined in [dynamics/Body.ts:91](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L91)*

Should this body be prevented from rotating? Useful for characters.

___

### `Optional` gravityScale

• **gravityScale**? : *number*

*Defined in [dynamics/Body.ts:100](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L100)*

___

### `Optional` linearDamping

• **linearDamping**? : *number*

*Defined in [dynamics/Body.ts:80](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L80)*

Linear damping is use to reduce the linear velocity. The
damping parameter can be larger than 1.0 but the damping effect becomes
sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` linearVelocity

• **linearVelocity**? : *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/Body.ts:72](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L72)*

The linear velocity of the body's origin in world co-ordinates.

___

### `Optional` position

• **position**? : *[Vec2](../classes/vec2.md)*

*Defined in [dynamics/Body.ts:64](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L64)*

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

___

### `Optional` type

• **type**? : *[BodyType](../globals.md#bodytype)*

*Defined in [dynamics/Body.ts:59](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L59)*

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

___

### `Optional` userData

• **userData**? : *any*

*Defined in [dynamics/Body.ts:113](https://github.com/shakiba/planck.js/blob/5b96d95/src/dynamics/Body.ts#L113)*
