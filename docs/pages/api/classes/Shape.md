# Class: `abstract` Shape

A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.

## Extended by

- [`CircleShape`](/api/classes/CircleShape)
- [`EdgeShape`](/api/classes/EdgeShape)
- [`PolygonShape`](/api/classes/PolygonShape)
- [`ChainShape`](/api/classes/ChainShape)

## Constructors

### new Shape()

> **new Shape**(): [`Shape`](/api/classes/Shape)

#### Returns

[`Shape`](/api/classes/Shape)

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

## Methods

### computeAABB()

> `abstract` **computeAABB**(`aabb`, `xf`, `childIndex`): `void`

Given a transform, compute the associated axis aligned bounding box for a
child shape.

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

Returns the axis aligned box.

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

The world transform of the shape.

• **childIndex**: `number`

The child shape

#### Returns

`void`

***

### computeDistanceProxy()

> `abstract` **computeDistanceProxy**(`proxy`, `childIndex`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](/api/classes/DistanceProxy)

• **childIndex**: `number`

#### Returns

`void`

***

### computeMass()

> `abstract` **computeMass**(`massData`, `density`?): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

#### Parameters

• **massData**: [`MassData`](/api/interfaces/MassData)

Returns the mass data for this shape.

• **density?**: `number`

The density in kilograms per meter squared.

#### Returns

`void`

***

### getChildCount()

> `abstract` **getChildCount**(): `number`

Get the number of child primitives.

#### Returns

`number`

***

### getRadius()

> `abstract` **getRadius**(): `number`

#### Returns

`number`

***

### getType()

> `abstract` **getType**(): [`ShapeType`](/api/type-aliases/ShapeType)

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

[`ShapeType`](/api/type-aliases/ShapeType)

the shape type.

***

### rayCast()

> `abstract` **rayCast**(`output`, `input`, `xf`, `childIndex`): `boolean`

Cast a ray against a child shape.

#### Parameters

• **output**: [`RayCastOutput`](/api/interfaces/RayCastOutput)

The ray-cast results.

• **input**: [`RayCastInput`](/api/interfaces/RayCastInput)

The ray-cast input parameters.

• **xf**: [`Transform`](/api/classes/Transform)

The transform to be applied to the shape.

• **childIndex**: `number`

The child shape index

#### Returns

`boolean`

***

### testPoint()

> `abstract` **testPoint**(`xf`, `p`): `boolean`

Test a point for containment in this shape. This only works for convex
shapes.

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

The shape world transform.

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

A point in world coordinates.

#### Returns

`boolean`

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`
