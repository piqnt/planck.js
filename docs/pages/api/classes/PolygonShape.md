# Class: PolygonShape

A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape

## Extends

- [`Shape`](Shape)

## Extended by

- [`BoxShape`](BoxShape)

## Constructors

### new PolygonShape()

> **new PolygonShape**(`vertices`?): [`PolygonShape`](PolygonShape)

#### Parameters

• **vertices?**: [`Vec2Value`](../interfaces/Vec2Value)[]

#### Returns

[`PolygonShape`](PolygonShape)

#### Overrides

[`Shape`](Shape).[`constructor`](Shape#constructors)

## Properties

### style

> **style**: [`Style`](../interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`Shape`](Shape).[`style`](Shape#style)

***

### TYPE

> `static` **TYPE**: `"polygon"`

## Methods

### computeAABB()

> **computeAABB**(`aabb`, `xf`, `childIndex`): `void`

Given a transform, compute the associated axis aligned bounding box for a
child shape.

#### Parameters

• **aabb**: [`AABBValue`](../interfaces/AABBValue)

Returns the axis aligned box.

• **xf**: [`TransformValue`](../type-aliases/TransformValue)

The world transform of the shape.

• **childIndex**: `number`

The child shape

#### Returns

`void`

#### Overrides

[`Shape`](Shape).[`computeAABB`](Shape#computeaabb)

***

### computeDistanceProxy()

> **computeDistanceProxy**(`proxy`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](DistanceProxy)

#### Returns

`void`

#### Overrides

[`Shape`](Shape).[`computeDistanceProxy`](Shape#computedistanceproxy)

***

### computeMass()

> **computeMass**(`massData`, `density`): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

#### Parameters

• **massData**: [`MassData`](../interfaces/MassData)

Returns the mass data for this shape.

• **density**: `number`

The density in kilograms per meter squared.

#### Returns

`void`

#### Overrides

[`Shape`](Shape).[`computeMass`](Shape#computemass)

***

### getChildCount()

> **getChildCount**(): `1`

Get the number of child primitives.

#### Returns

`1`

#### Overrides

[`Shape`](Shape).[`getChildCount`](Shape#getchildcount)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Overrides

[`Shape`](Shape).[`getRadius`](Shape#getradius)

***

### getType()

> **getType**(): `"polygon"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"polygon"`

the shape type.

#### Overrides

[`Shape`](Shape).[`getType`](Shape#gettype)

***

### rayCast()

> **rayCast**(`output`, `input`, `xf`, `childIndex`): `boolean`

Cast a ray against a child shape.

#### Parameters

• **output**: [`RayCastOutput`](../interfaces/RayCastOutput)

The ray-cast results.

• **input**: [`RayCastInput`](../interfaces/RayCastInput)

The ray-cast input parameters.

• **xf**: [`Transform`](Transform)

The transform to be applied to the shape.

• **childIndex**: `number`

The child shape index

#### Returns

`boolean`

#### Overrides

[`Shape`](Shape).[`rayCast`](Shape#raycast)

***

### testPoint()

> **testPoint**(`xf`, `p`): `boolean`

Test a point for containment in this shape. This only works for convex
shapes.

#### Parameters

• **xf**: [`TransformValue`](../type-aliases/TransformValue)

The shape world transform.

• **p**: [`Vec2Value`](../interfaces/Vec2Value)

A point in world coordinates.

#### Returns

`boolean`

#### Overrides

[`Shape`](Shape).[`testPoint`](Shape#testpoint)

***

### validate()

> **validate**(): `boolean`

Validate convexity. This is a very time consuming operation.

#### Returns

`boolean`

true if valid

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

#### Inherited from

[`Shape`](Shape).[`isValid`](Shape#isvalid)
