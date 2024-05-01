---
showOutline: false
---

# Interface: BodyDef

## Hierarchy

* **BodyDef**

## Index

### Properties

* [active](/api/interfaces/bodydef#optional-active)
* [allowSleep](/api/interfaces/bodydef#optional-allowsleep)
* [angle](/api/interfaces/bodydef#optional-angle)
* [angularDamping](/api/interfaces/bodydef#optional-angulardamping)
* [angularVelocity](/api/interfaces/bodydef#optional-angularvelocity)
* [awake](/api/interfaces/bodydef#optional-awake)
* [bullet](/api/interfaces/bodydef#optional-bullet)
* [fixedRotation](/api/interfaces/bodydef#optional-fixedrotation)
* [gravityScale](/api/interfaces/bodydef#optional-gravityscale)
* [linearDamping](/api/interfaces/bodydef#optional-lineardamping)
* [linearVelocity](/api/interfaces/bodydef#optional-linearvelocity)
* [position](/api/interfaces/bodydef#optional-position)
* [type](/api/interfaces/bodydef#optional-type)
* [userData](/api/interfaces/bodydef#optional-userdata)

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

• **linearVelocity**? : *[Vec2Value](/api/interfaces/vec2value)*

The linear velocity of the body's origin in world co-ordinates.

___

### `Optional` position

• **position**? : *[Vec2Value](/api/interfaces/vec2value)*

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

___

### `Optional` type

• **type**? : *[BodyType](/api/globals#bodytype)*

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

___

### `Optional` userData

• **userData**? : *any*
