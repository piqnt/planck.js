# Interface: BodyDef

## Properties

### active?

> `optional` **active**: `boolean`

Does this body start out active?

***

### allowSleep?

> `optional` **allowSleep**: `boolean`

Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.

***

### angle?

> `optional` **angle**: `number`

The world angle of the body in radians.

***

### angularDamping?

> `optional` **angularDamping**: `number`

Angular damping is use to reduce the angular velocity.
The damping parameter can be larger than 1.0 but the damping effect
becomes sensitive to the time step when the damping parameter is large.
Units are 1/time

***

### angularVelocity?

> `optional` **angularVelocity**: `number`

***

### awake?

> `optional` **awake**: `boolean`

Is this body initially awake or sleeping?

***

### bullet?

> `optional` **bullet**: `boolean`

Is this a fast moving body that should be prevented from
tunneling through other moving bodies? Note that all bodies are
prevented from tunneling through kinematic and static bodies. This
setting is only considered on dynamic bodies. Warning: You should use
this flag sparingly since it increases processing time.

***

### fixedRotation?

> `optional` **fixedRotation**: `boolean`

Should this body be prevented from rotating? Useful for characters.

***

### gravityScale?

> `optional` **gravityScale**: `number`

***

### linearDamping?

> `optional` **linearDamping**: `number`

Linear damping is use to reduce the linear velocity. The
damping parameter can be larger than 1.0 but the damping effect becomes
sensitive to the time step when the damping parameter is large.
Units are 1/time

***

### linearVelocity?

> `optional` **linearVelocity**: [`Vec2Value`](/api/interfaces/Vec2Value)

The linear velocity of the body's origin in world co-ordinates.

***

### position?

> `optional` **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world position of the body. Avoid creating bodies at the
origin since this can lead to many overlapping shapes.

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

***

### type?

> `optional` **type**: [`BodyType`](/api/type-aliases/BodyType)

Body types are static, kinematic, or dynamic. Note: if a dynamic
body would have zero mass, the mass is set to one.

***

### userData?

> `optional` **userData**: `any`
