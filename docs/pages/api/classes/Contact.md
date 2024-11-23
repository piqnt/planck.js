# Class: Contact

The class manages contact between two shapes. A contact exists for each
overlapping AABB in the broad-phase (except if filtered). Therefore a contact
object may exist that has no contact points.

## Constructors

### new Contact()

> **new Contact**(): [`Contact`](Contact)

#### Returns

[`Contact`](Contact)

## Methods

### evaluate()

> **evaluate**(`manifold`, `xfA`, `xfB`): `void`

Called by Update method, and implemented by subclasses.

#### Parameters

• **manifold**: [`Manifold`](Manifold)

• **xfA**: [`TransformValue`](../type-aliases/TransformValue)

• **xfB**: [`TransformValue`](../type-aliases/TransformValue)

#### Returns

`void`

***

### flagForFiltering()

> **flagForFiltering**(): `void`

Flag this contact for filtering. Filtering will occur the next time step.

#### Returns

`void`

***

### getChildIndexA()

> **getChildIndexA**(): `number`

Get the child primitive index for fixture A.

#### Returns

`number`

***

### getChildIndexB()

> **getChildIndexB**(): `number`

Get the child primitive index for fixture B.

#### Returns

`number`

***

### getFixtureA()

> **getFixtureA**(): [`Fixture`](Fixture)

Get fixture A in this contact.

#### Returns

[`Fixture`](Fixture)

***

### getFixtureB()

> **getFixtureB**(): [`Fixture`](Fixture)

Get fixture B in this contact.

#### Returns

[`Fixture`](Fixture)

***

### getFriction()

> **getFriction**(): `number`

Get the friction.

#### Returns

`number`

***

### getManifold()

> **getManifold**(): [`Manifold`](Manifold)

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

#### Returns

[`Manifold`](Manifold)

***

### getNext()

> **getNext**(): [`Contact`](Contact)

Get the next contact in the world's contact list.

#### Returns

[`Contact`](Contact)

***

### getRestitution()

> **getRestitution**(): `number`

Get the restitution.

#### Returns

`number`

***

### getTangentSpeed()

> **getTangentSpeed**(): `number`

Get the desired tangent speed. In meters per second.

#### Returns

`number`

***

### getWorldManifold()

> **getWorldManifold**(`worldManifold`): [`WorldManifold`](WorldManifold)

Get the world manifold.

#### Parameters

• **worldManifold**: [`WorldManifold`](WorldManifold)

#### Returns

[`WorldManifold`](WorldManifold)

***

### initConstraint()

> **initConstraint**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### initVelocityConstraint()

> **initVelocityConstraint**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### isEnabled()

> **isEnabled**(): `boolean`

Has this contact been disabled?

#### Returns

`boolean`

***

### isTouching()

> **isTouching**(): `boolean`

Is this contact touching?

#### Returns

`boolean`

***

### resetFriction()

> **resetFriction**(): `void`

Reset the friction mixture to the default value.

#### Returns

`void`

***

### resetRestitution()

> **resetRestitution**(): `void`

Reset the restitution to the default value.

#### Returns

`void`

***

### setEnabled()

> **setEnabled**(`flag`): `void`

Enable/disable this contact. This can be used inside the pre-solve contact
listener. The contact is only disabled for the current time step (or sub-step
in continuous collisions).

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setFriction()

> **setFriction**(`friction`): `void`

Override the default friction mixture. You can call this in
"pre-solve" callback. This value persists until set or reset.

#### Parameters

• **friction**: `number`

#### Returns

`void`

***

### setRestitution()

> **setRestitution**(`restitution`): `void`

Override the default restitution mixture. You can call this in
"pre-solve" callback. The value persists until you set or reset.

#### Parameters

• **restitution**: `number`

#### Returns

`void`

***

### setTangentSpeed()

> **setTangentSpeed**(`speed`): `void`

Set the desired tangent speed for a conveyor belt behavior. In meters per
second.

#### Parameters

• **speed**: `number`

#### Returns

`void`

***

### solvePositionConstraint()

> **solvePositionConstraint**(`step`): `number`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`number`

***

### solvePositionConstraintTOI()

> **solvePositionConstraintTOI**(`step`, `toiA`, `toiB`): `number`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

• **toiA**: [`Body`](Body)

• **toiB**: [`Body`](Body)

#### Returns

`number`

***

### solveVelocityConstraint()

> **solveVelocityConstraint**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### storeConstraintImpulses()

> **storeConstraintImpulses**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### update()

> **update**(`listener`?): `void`

Updates the contact manifold and touching status.

Note: do not assume the fixture AABBs are overlapping or are valid.

#### Parameters

• **listener?**

• **listener.beginContact?**

• **listener.endContact?**

• **listener.preSolve?**

#### Returns

`void`

***

### warmStartConstraint()

> **warmStartConstraint**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`
