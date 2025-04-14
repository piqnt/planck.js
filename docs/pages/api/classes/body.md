# Class: Body

A rigid body composed of one or more fixtures.

To create a new Body use [World.createBody](/api/classes/World#createbody).

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

## Methods

### advance()

> **advance**(`alpha`): `void`

Used in TOI.

#### Parameters

• **alpha**: `number`

#### Returns

`void`

***

### applyAngularImpulse()

> **applyAngularImpulse**(`impulse`, `wake`): `void`

Apply an angular impulse.

#### Parameters

• **impulse**: `number`

The angular impulse in units of kg*m*m/s

• **wake**: `boolean` = `true`

Also wake up the body

#### Returns

`void`

***

### applyForce()

> **applyForce**(`force`, `point`, `wake`): `void`

Apply a force at a world point. If the force is not applied at the center of
mass, it will generate a torque and affect the angular velocity. This wakes
up the body.

#### Parameters

• **force**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world force vector, usually in Newtons (N).

• **point**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world position of the point of application.

• **wake**: `boolean` = `true`

Also wake up the body

#### Returns

`void`

***

### applyForceToCenter()

> **applyForceToCenter**(`force`, `wake`): `void`

Apply a force to the center of mass. This wakes up the body.

#### Parameters

• **force**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world force vector, usually in Newtons (N).

• **wake**: `boolean` = `true`

Also wake up the body

#### Returns

`void`

***

### applyLinearImpulse()

> **applyLinearImpulse**(`impulse`, `point`, `wake`): `void`

Apply an impulse at a point. This immediately modifies the velocity. It also
modifies the angular velocity if the point of application is not at the
center of mass. This wakes up the body.

#### Parameters

• **impulse**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world impulse vector, usually in N-seconds or kg-m/s.

• **point**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world position of the point of application.

• **wake**: `boolean` = `true`

Also wake up the body

#### Returns

`void`

***

### applyTorque()

> **applyTorque**(`torque`, `wake`): `void`

Apply a torque. This affects the angular velocity without affecting the
linear velocity of the center of mass. This wakes up the body.

#### Parameters

• **torque**: `number`

About the z-axis (out of the screen), usually in N-m.

• **wake**: `boolean` = `true`

Also wake up the body

#### Returns

`void`

***

### createFixture()

#### createFixture(def)

> **createFixture**(`def`): [`Fixture`](/api/classes/Fixture)

Creates a fixture and attach it to this body.

If the density is non-zero, this function automatically updates the mass of
the body.

Contacts are not created until the next time step.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

##### Parameters

• **def**: [`FixtureDef`](/api/interfaces/FixtureDef)

##### Returns

[`Fixture`](/api/classes/Fixture)

#### createFixture(shape, opt)

> **createFixture**(`shape`, `opt`?): [`Fixture`](/api/classes/Fixture)

##### Parameters

• **shape**: [`Shape`](/api/classes/Shape)

• **opt?**: [`FixtureOpt`](/api/interfaces/FixtureOpt)

##### Returns

[`Fixture`](/api/classes/Fixture)

#### createFixture(shape, density)

> **createFixture**(`shape`, `density`?): [`Fixture`](/api/classes/Fixture)

##### Parameters

• **shape**: [`Shape`](/api/classes/Shape)

• **density?**: `number`

##### Returns

[`Fixture`](/api/classes/Fixture)

***

### destroyFixture()

> **destroyFixture**(`fixture`): `void`

Destroy a fixture. This removes the fixture from the broad-phase and destroys
all contacts associated with this fixture. This will automatically adjust the
mass of the body if the body is dynamic and the fixture has positive density.
All fixtures attached to a body are implicitly destroyed when the body is
destroyed.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Parameters

• **fixture**: [`Fixture`](/api/classes/Fixture)

The fixture to be removed.

#### Returns

`void`

***

### getAngle()

> **getAngle**(): `number`

Get the current world rotation angle in radians.

#### Returns

`number`

***

### getAngularDamping()

> **getAngularDamping**(): `number`

#### Returns

`number`

***

### getAngularVelocity()

> **getAngularVelocity**(): `number`

Get the angular velocity.

#### Returns

`number`

the angular velocity in radians/second.

***

### getContactList()

> **getContactList**(): [`ContactEdge`](/api/classes/ContactEdge)

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

#### Returns

[`ContactEdge`](/api/classes/ContactEdge)

***

### getFixtureList()

> **getFixtureList**(): [`Fixture`](/api/classes/Fixture)

#### Returns

[`Fixture`](/api/classes/Fixture)

***

### getGravityScale()

> **getGravityScale**(): `number`

#### Returns

`number`

***

### getInertia()

> **getInertia**(): `number`

Get the rotational inertia of the body about the local origin.

#### Returns

`number`

the rotational inertia, usually in kg-m^2.

***

### getJointList()

> **getJointList**(): [`JointEdge`](/api/classes/JointEdge)

#### Returns

[`JointEdge`](/api/classes/JointEdge)

***

### getLinearDamping()

> **getLinearDamping**(): `number`

#### Returns

`number`

***

### getLinearVelocity()

> **getLinearVelocity**(): [`Vec2`](/api/classes/Vec2)

Get the linear velocity of the center of mass.

#### Returns

[`Vec2`](/api/classes/Vec2)

the linear velocity of the center of mass.

***

### getLinearVelocityFromLocalPoint()

> **getLinearVelocityFromLocalPoint**(`localPoint`): [`Vec2`](/api/classes/Vec2)

Get the world velocity of a local point.

#### Parameters

• **localPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

A point in local coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLinearVelocityFromWorldPoint()

> **getLinearVelocityFromWorldPoint**(`worldPoint`): [`Vec2`](/api/classes/Vec2)

Get the world linear velocity of a world point attached to this body.

#### Parameters

• **worldPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

A point in world coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLocalCenter()

> **getLocalCenter**(): [`Vec2`](/api/classes/Vec2)

Get the local position of the center of mass.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLocalPoint()

> **getLocalPoint**(`worldPoint`): [`Vec2`](/api/classes/Vec2)

Gets the corresponding local point of a world point.

#### Parameters

• **worldPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLocalVector()

> **getLocalVector**(`worldVector`): [`Vec2`](/api/classes/Vec2)

Gets the corresponding local vector of a world vector.

#### Parameters

• **worldVector**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getMass()

> **getMass**(): `number`

Get the total mass of the body.

#### Returns

`number`

The mass, usually in kilograms (kg).

***

### getMassData()

> **getMassData**(`data`): `void`

Copy the mass data of the body to data.

#### Parameters

• **data**: [`MassData`](/api/interfaces/MassData)

#### Returns

`void`

***

### getNext()

> **getNext**(): [`Body`](/api/classes/Body)

#### Returns

[`Body`](/api/classes/Body)

***

### getPosition()

> **getPosition**(): [`Vec2`](/api/classes/Vec2)

Get the world position for the body's origin.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getTransform()

> **getTransform**(): [`Transform`](/api/classes/Transform)

Get the world transform for the body's origin.

#### Returns

[`Transform`](/api/classes/Transform)

***

### getType()

> **getType**(): [`BodyType`](/api/type-aliases/BodyType)

Get the type of the body.

#### Returns

[`BodyType`](/api/type-aliases/BodyType)

***

### getUserData()

> **getUserData**(): `unknown`

#### Returns

`unknown`

***

### getWorld()

> **getWorld**(): [`World`](/api/classes/World)

#### Returns

[`World`](/api/classes/World)

***

### getWorldCenter()

> **getWorldCenter**(): [`Vec2`](/api/classes/Vec2)

Get the world position of the center of mass.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getWorldPoint()

> **getWorldPoint**(`localPoint`): [`Vec2`](/api/classes/Vec2)

Get the corresponding world point of a local point.

#### Parameters

• **localPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getWorldVector()

> **getWorldVector**(`localVector`): [`Vec2`](/api/classes/Vec2)

Get the corresponding world vector of a local vector.

#### Parameters

• **localVector**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### isActive()

> **isActive**(): `boolean`

#### Returns

`boolean`

***

### isAwake()

> **isAwake**(): `boolean`

#### Returns

`boolean`

***

### isBullet()

> **isBullet**(): `boolean`

#### Returns

`boolean`

***

### isDynamic()

> **isDynamic**(): `boolean`

#### Returns

`boolean`

***

### isFixedRotation()

> **isFixedRotation**(): `boolean`

#### Returns

`boolean`

***

### isKinematic()

> **isKinematic**(): `boolean`

#### Returns

`boolean`

***

### isSleepingAllowed()

> **isSleepingAllowed**(): `boolean`

#### Returns

`boolean`

***

### isStatic()

> **isStatic**(): `boolean`

#### Returns

`boolean`

***

### isWorldLocked()

> **isWorldLocked**(): `boolean`

#### Returns

`boolean`

***

### resetMassData()

> **resetMassData**(): `void`

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

#### Returns

`void`

***

### setActive()

> **setActive**(`flag`): `void`

Set the active state of the body. An inactive body is not simulated and
cannot be collided with or woken up. If you pass a flag of true, all fixtures
will be added to the broad-phase. If you pass a flag of false, all fixtures
will be removed from the broad-phase and all contacts will be destroyed.
Fixtures and joints are otherwise unaffected.

You may continue to create/destroy fixtures and joints on inactive bodies.
Fixtures on an inactive body are implicitly inactive and will not participate
in collisions, ray-casts, or queries. Joints connected to an inactive body
are implicitly inactive. An inactive body is still owned by a World object
and remains

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setAngle()

> **setAngle**(`angle`): `void`

#### Parameters

• **angle**: `number`

#### Returns

`void`

***

### setAngularDamping()

> **setAngularDamping**(`angularDamping`): `void`

#### Parameters

• **angularDamping**: `number`

#### Returns

`void`

***

### setAngularVelocity()

> **setAngularVelocity**(`w`): `void`

Set the angular velocity.

#### Parameters

• **w**: `number`

The new angular velocity in radians/second.

#### Returns

`void`

***

### setAwake()

> **setAwake**(`flag`): `void`

Set the sleep state of the body. A sleeping body has very low CPU cost.

#### Parameters

• **flag**: `boolean`

Set to true to wake the body, false to put it to sleep.

#### Returns

`void`

***

### setBullet()

> **setBullet**(`flag`): `void`

Should this body be treated like a bullet for continuous collision detection?

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setDynamic()

> **setDynamic**(): [`Body`](/api/classes/Body)

#### Returns

[`Body`](/api/classes/Body)

***

### setFixedRotation()

> **setFixedRotation**(`flag`): `void`

Set this body to have fixed rotation. This causes the mass to be reset.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setGravityScale()

> **setGravityScale**(`scale`): `void`

Scale the gravity applied to this body.

#### Parameters

• **scale**: `number`

#### Returns

`void`

***

### setKinematic()

> **setKinematic**(): [`Body`](/api/classes/Body)

#### Returns

[`Body`](/api/classes/Body)

***

### setLinearDamping()

> **setLinearDamping**(`linearDamping`): `void`

#### Parameters

• **linearDamping**: `number`

#### Returns

`void`

***

### setLinearVelocity()

> **setLinearVelocity**(`v`): `void`

Set the linear velocity of the center of mass.

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

The new linear velocity of the center of mass.

#### Returns

`void`

***

### setMassData()

> **setMassData**(`massData`): `void`

Set the mass properties to override the mass properties of the fixtures. Note
that this changes the center of mass position. Note that creating or
destroying fixtures can also alter the mass. This function has no effect if
the body isn't dynamic.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Parameters

• **massData**: [`MassData`](/api/interfaces/MassData)

The mass properties.

#### Returns

`void`

***

### setPosition()

> **setPosition**(`p`): `void`

#### Parameters

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

***

### setSleepingAllowed()

> **setSleepingAllowed**(`flag`): `void`

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setStatic()

> **setStatic**(): [`Body`](/api/classes/Body)

This will alter the mass and velocity.

#### Returns

[`Body`](/api/classes/Body)

***

### setTransform()

#### setTransform(position, angle)

> **setTransform**(`position`, `angle`): `void`

Set the position of the body's origin and rotation. Manipulating a body's
transform may cause non-physical behavior. Note: contacts are updated on the
next call to World.step.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

##### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

The world position of the body's local origin.

• **angle**: `number`

The world rotation in radians.

##### Returns

`void`

#### setTransform(xf)

> **setTransform**(`xf`): `void`

Set the position of the body's origin and rotation. Manipulating a body's
transform may cause non-physical behavior. Note: contacts are updated on the
next call to World.step.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

##### Parameters

• **xf**: [`Transform`](/api/classes/Transform)

##### Returns

`void`

***

### setType()

> **setType**(`type`): `void`

Set the type of the body to "static", "kinematic" or "dynamic".

#### Parameters

• **type**: [`BodyType`](/api/type-aliases/BodyType)

The type of the body.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Returns

`void`

***

### setUserData()

> **setUserData**(`data`): `void`

#### Parameters

• **data**: `any`

#### Returns

`void`

***

### shouldCollide()

> **shouldCollide**(`that`): `boolean`

This is used to test if two bodies should collide.

Bodies do not collide when:
- Neither of them is dynamic
- They are connected by a joint with collideConnected == false

#### Parameters

• **that**: [`Body`](/api/classes/Body)

#### Returns

`boolean`

***

### synchronizeFixtures()

> **synchronizeFixtures**(): `void`

Update fixtures in broad-phase.

#### Returns

`void`

***

### synchronizeTransform()

> **synchronizeTransform**(): `void`

#### Returns

`void`
