# Class: CircleShape

Circle shape.

## Extends

- [`Shape`](/api/classes/Shape)

## Constructors

### new CircleShape()

> **new CircleShape**(`position`, `radius`?): [`CircleShape`](/api/classes/CircleShape)

#### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **radius?**: `number`

#### Returns

[`CircleShape`](/api/classes/CircleShape)

#### Overrides

[`Shape`](/api/classes/Shape).[`constructor`](/api/classes/Shape#constructors)

### new CircleShape()

> **new CircleShape**(`radius`?): [`CircleShape`](/api/classes/CircleShape)

#### Parameters

• **radius?**: `number`

#### Returns

[`CircleShape`](/api/classes/CircleShape)

#### Overrides

`Shape.constructor`

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`Shape`](/api/classes/Shape).[`style`](/api/classes/Shape#style)

***

### TYPE

> `static` **TYPE**: `"circle"`

## Methods

### computeAABB()

> **computeAABB**(`aabb`, `xf`, `childIndex`): `void`

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

#### Overrides

[`Shape`](/api/classes/Shape).[`computeAABB`](/api/classes/Shape#computeaabb)

***

### computeDistanceProxy()

> **computeDistanceProxy**(`proxy`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](/api/classes/DistanceProxy)

#### Returns

`void`

#### Overrides

[`Shape`](/api/classes/Shape).[`computeDistanceProxy`](/api/classes/Shape#computedistanceproxy)

***

### computeMass()

> **computeMass**(`massData`, `density`): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

#### Parameters

• **massData**: [`MassData`](/api/interfaces/MassData)

Returns the mass data for this shape.

• **density**: `number`

The density in kilograms per meter squared.

#### Returns

`void`

#### Overrides

[`Shape`](/api/classes/Shape).[`computeMass`](/api/classes/Shape#computemass)

***

### getCenter()

> **getCenter**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getChildCount()

> **getChildCount**(): `1`

Get the number of child primitives.

#### Returns

`1`

#### Overrides

[`Shape`](/api/classes/Shape).[`getChildCount`](/api/classes/Shape#getchildcount)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Overrides

[`Shape`](/api/classes/Shape).[`getRadius`](/api/classes/Shape#getradius)

***

### getType()

> **getType**(): `"circle"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"circle"`

the shape type.

#### Overrides

[`Shape`](/api/classes/Shape).[`getType`](/api/classes/Shape#gettype)

***

### rayCast()

> **rayCast**(`output`, `input`, `xf`, `childIndex`): `boolean`

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

#### Overrides

[`Shape`](/api/classes/Shape).[`rayCast`](/api/classes/Shape#raycast)

***

### testPoint()

> **testPoint**(`xf`, `p`): `boolean`

Test a point for containment in this shape. This only works for convex
shapes.

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

The shape world transform.

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

A point in world coordinates.

#### Returns

`boolean`

#### Overrides

[`Shape`](/api/classes/Shape).[`testPoint`](/api/classes/Shape#testpoint)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

#### Inherited from

[`Shape`](/api/classes/Shape).[`isValid`](/api/classes/Shape#isvalid)
