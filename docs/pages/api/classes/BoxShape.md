# Class: BoxShape

A rectangle polygon which extend PolygonShape.

## Extends

- [`PolygonShape`](PolygonShape)

## Constructors

### new BoxShape()

> **new BoxShape**(`halfWidth`, `halfHeight`, `center`?, `angle`?): [`BoxShape`](BoxShape)

#### Parameters

• **halfWidth**: `number`

• **halfHeight**: `number`

• **center?**: [`Vec2Value`](../interfaces/Vec2Value)

coordinate of the center of the box relative to the body

• **angle?**: `number`

angle of the box relative to the body

#### Returns

[`BoxShape`](BoxShape)

#### Overrides

[`PolygonShape`](PolygonShape).[`constructor`](PolygonShape#constructors)

## Properties

### style

> **style**: [`Style`](../interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`PolygonShape`](PolygonShape).[`style`](PolygonShape#style)

***

### TYPE

> `static` **TYPE**: `"polygon"`

#### Overrides

[`PolygonShape`](PolygonShape).[`TYPE`](PolygonShape#type)

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

#### Inherited from

[`PolygonShape`](PolygonShape).[`computeAABB`](PolygonShape#computeaabb)

***

### computeDistanceProxy()

> **computeDistanceProxy**(`proxy`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](DistanceProxy)

#### Returns

`void`

#### Inherited from

[`PolygonShape`](PolygonShape).[`computeDistanceProxy`](PolygonShape#computedistanceproxy)

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

#### Inherited from

[`PolygonShape`](PolygonShape).[`computeMass`](PolygonShape#computemass)

***

### getChildCount()

> **getChildCount**(): `1`

Get the number of child primitives.

#### Returns

`1`

#### Inherited from

[`PolygonShape`](PolygonShape).[`getChildCount`](PolygonShape#getchildcount)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Inherited from

[`PolygonShape`](PolygonShape).[`getRadius`](PolygonShape#getradius)

***

### getType()

> **getType**(): `"polygon"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"polygon"`

the shape type.

#### Inherited from

[`PolygonShape`](PolygonShape).[`getType`](PolygonShape#gettype)

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

#### Inherited from

[`PolygonShape`](PolygonShape).[`rayCast`](PolygonShape#raycast)

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

#### Inherited from

[`PolygonShape`](PolygonShape).[`testPoint`](PolygonShape#testpoint)

***

### validate()

> **validate**(): `boolean`

Validate convexity. This is a very time consuming operation.

#### Returns

`boolean`

true if valid

#### Inherited from

[`PolygonShape`](PolygonShape).[`validate`](PolygonShape#validate)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

#### Inherited from

[`PolygonShape`](PolygonShape).[`isValid`](PolygonShape#isvalid)
