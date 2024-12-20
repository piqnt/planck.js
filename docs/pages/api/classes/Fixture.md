# Class: Fixture

A fixture is used to attach a shape to a body for collision detection. A
fixture inherits its transform from its parent. Fixtures hold additional
non-geometric data such as friction, collision filters, etc.

To create a new Fixture use [Body.createFixture](/api/classes/Body#createfixture).

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

## Methods

### createProxies()

> **createProxies**(`broadPhase`, `xf`): `void`

These support body activation/deactivation.

#### Parameters

• **broadPhase**: [`BroadPhase`](/api/classes/BroadPhase)

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

`void`

***

### destroyProxies()

> **destroyProxies**(`broadPhase`): `void`

#### Parameters

• **broadPhase**: [`BroadPhase`](/api/classes/BroadPhase)

#### Returns

`void`

***

### getAABB()

> **getAABB**(`childIndex`): [`AABB`](/api/classes/AABB)

Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
more accurate AABB, compute it using the shape and the body transform.

#### Parameters

• **childIndex**: `number`

#### Returns

[`AABB`](/api/classes/AABB)

***

### getBody()

> **getBody**(): [`Body`](/api/classes/Body)

Get the parent body of this fixture. This is null if the fixture is not
attached.

#### Returns

[`Body`](/api/classes/Body)

***

### getDensity()

> **getDensity**(): `number`

Get the density of this fixture.

#### Returns

`number`

***

### getFilterCategoryBits()

> **getFilterCategoryBits**(): `number`

#### Returns

`number`

***

### getFilterGroupIndex()

> **getFilterGroupIndex**(): `number`

#### Returns

`number`

***

### getFilterMaskBits()

> **getFilterMaskBits**(): `number`

#### Returns

`number`

***

### getFriction()

> **getFriction**(): `number`

Get the coefficient of friction, usually in the range [0,1].

#### Returns

`number`

***

### getMassData()

> **getMassData**(`massData`): `void`

Get the mass data for this fixture. The mass data is based on the density and
the shape. The rotational inertia is about the shape's origin. This operation
may be expensive.

#### Parameters

• **massData**: [`MassData`](/api/interfaces/MassData)

#### Returns

`void`

***

### getNext()

> **getNext**(): [`Fixture`](/api/classes/Fixture)

Get the next fixture in the parent body's fixture list.

#### Returns

[`Fixture`](/api/classes/Fixture)

***

### getRestitution()

> **getRestitution**(): `number`

Get the coefficient of restitution.

#### Returns

`number`

***

### getShape()

> **getShape**(): [`Shape`](/api/classes/Shape)

Get the child shape. You can modify the child shape, however you should not
change the number of vertices because this will crash some collision caching
mechanisms. Manipulating the shape may lead to non-physical behavior.

#### Returns

[`Shape`](/api/classes/Shape)

***

### getType()

> **getType**(): [`ShapeType`](/api/type-aliases/ShapeType)

Get the type of the child shape. You can use this to down cast to the
concrete shape.

#### Returns

[`ShapeType`](/api/type-aliases/ShapeType)

***

### getUserData()

> **getUserData**(): `unknown`

Get the user data that was assigned in the fixture definition. Use this to
store your application specific data.

#### Returns

`unknown`

***

### isSensor()

> **isSensor**(): `boolean`

A sensor shape collects contact information but never generates a collision
response.

#### Returns

`boolean`

***

### rayCast()

> **rayCast**(`output`, `input`, `childIndex`): `boolean`

Cast a ray against this shape.

#### Parameters

• **output**: [`RayCastOutput`](/api/interfaces/RayCastOutput)

• **input**: [`RayCastInput`](/api/interfaces/RayCastInput)

• **childIndex**: `number`

#### Returns

`boolean`

***

### refilter()

> **refilter**(): `void`

Call this if you want to establish collision that was previously disabled by
ContactFilter.

#### Returns

`void`

***

### setDensity()

> **setDensity**(`density`): `void`

Set the density of this fixture. This will _not_ automatically adjust the
mass of the body. You must call Body.resetMassData to update the body's mass.

#### Parameters

• **density**: `number`

#### Returns

`void`

***

### setFilterCategoryBits()

> **setFilterCategoryBits**(`categoryBits`): `void`

#### Parameters

• **categoryBits**: `number`

#### Returns

`void`

***

### setFilterData()

> **setFilterData**(`filter`): `void`

Set the contact filtering data. This will not update contacts until the next
time step when either parent body is active and awake. This automatically
calls refilter.

#### Parameters

• **filter**

• **filter.categoryBits**: `number`

• **filter.groupIndex**: `number`

• **filter.maskBits**: `number`

#### Returns

`void`

***

### setFilterGroupIndex()

> **setFilterGroupIndex**(`groupIndex`): `void`

#### Parameters

• **groupIndex**: `number`

#### Returns

`void`

***

### setFilterMaskBits()

> **setFilterMaskBits**(`maskBits`): `void`

#### Parameters

• **maskBits**: `number`

#### Returns

`void`

***

### setFriction()

> **setFriction**(`friction`): `void`

Set the coefficient of friction. This will not change the friction of
existing contacts.

#### Parameters

• **friction**: `number`

#### Returns

`void`

***

### setRestitution()

> **setRestitution**(`restitution`): `void`

Set the coefficient of restitution. This will not change the restitution of
existing contacts.

#### Parameters

• **restitution**: `number`

#### Returns

`void`

***

### setSensor()

> **setSensor**(`sensor`): `void`

Set if this fixture is a sensor.

#### Parameters

• **sensor**: `boolean`

#### Returns

`void`

***

### setUserData()

> **setUserData**(`data`): `void`

Set the user data. Use this to store your application specific data.

#### Parameters

• **data**: `unknown`

#### Returns

`void`

***

### shouldCollide()

> **shouldCollide**(`that`): `boolean`

Implement this method to provide collision filtering, if you want finer
control over contact creation.

Return true if contact calculations should be performed between these two
fixtures.

Warning: for performance reasons this is only called when the AABBs begin to
overlap.

#### Parameters

• **that**: [`Fixture`](/api/classes/Fixture)

#### Returns

`boolean`

***

### synchronize()

> **synchronize**(`broadPhase`, `xf1`, `xf2`): `void`

Updates this fixture proxy in broad-phase (with combined AABB of current and
next transformation).

#### Parameters

• **broadPhase**: [`BroadPhase`](/api/classes/BroadPhase)

• **xf1**: [`TransformValue`](/api/type-aliases/TransformValue)

• **xf2**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

`void`

***

### testPoint()

> **testPoint**(`p`): `boolean`

Test a point in world coordinates for containment in this fixture.

#### Parameters

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`boolean`
