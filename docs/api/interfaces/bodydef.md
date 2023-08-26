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

Does this body start out active?

___

### `Optional` allowSleep

• **allowSleep**? : *boolean*

Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.

___

### `Optional` angle

• **angle**? : *number*

The world angle of the body in radians.

___

### `Optional` angularDamping

• **angularDamping**? : *number*

Angular damping is use to reduce the angular velocity.
The damping parameter can be larger than 1.0 but the damping effect
becomes sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` angularVelocity

• **angularVelocity**? : *number*

___

### `Optional` awake

• **awake**? : *boolean*

Is this body initially awake or sleeping?

___

### `Optional` bullet

• **bullet**? : *boolean*

Is this a fast moving body that should be prevented from
tunneling through other moving bodies? Note that all bodies are
prevented from tunneling through kinematic and static bodies. This
setting is only considered on dynamic bodies. Warning: You should use
this flag sparingly since it increases processing time.

___

### `Optional` fixedRotation

• **fixedRotation**? : *boolean*

Should this body be prevented from rotating? Useful for characters.

___

### `Optional` gravityScale

• **gravityScale**? : *number*

___

### `Optional` linearDamping

• **linearDamping**? : *number*

Linear damping is use to reduce the linear velocity. The
damping parameter can be larger than 1.0 but the damping effect becomes
sensitive to the time step when the damping parameter is large.
Units are 1/time

___

### `Optional` linearVelocity

• **linearVelocity**? : *Vec2*

The linear velocity of the body's origin in world co-ordinates.

___

### `Optional` position

• **position**? : *Vec2*

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

___

### `Optional` type

• **type**? : *[BodyType](../globals.md#bodytype)*

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

___

### `Optional` userData

• **userData**? : *any*
