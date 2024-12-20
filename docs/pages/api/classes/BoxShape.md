# Class: BoxShape

A rectangle polygon which extend PolygonShape.

## Extends

- [`PolygonShape`](/api/classes/PolygonShape)

## Constructors

### new BoxShape()

> **new BoxShape**(`halfWidth`, `halfHeight`, `center`?, `angle`?): [`BoxShape`](/api/classes/BoxShape)

#### Parameters

• **halfWidth**: `number`

• **halfHeight**: `number`

• **center?**: [`Vec2Value`](/api/interfaces/Vec2Value)

coordinate of the center of the box relative to the body

• **angle?**: `number`

angle of the box relative to the body

#### Returns

[`BoxShape`](/api/classes/BoxShape)

#### Overrides

[`PolygonShape`](/api/classes/PolygonShape).[`constructor`](/api/classes/PolygonShape#constructors)

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`style`](/api/classes/PolygonShape#style)

***

### TYPE

> `static` **TYPE**: `"polygon"`

#### Overrides

[`PolygonShape`](/api/classes/PolygonShape).[`TYPE`](/api/classes/PolygonShape#type)

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

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`computeAABB`](/api/classes/PolygonShape#computeaabb)

***

### computeDistanceProxy()

> **computeDistanceProxy**(`proxy`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](/api/classes/DistanceProxy)

#### Returns

`void`

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`computeDistanceProxy`](/api/classes/PolygonShape#computedistanceproxy)

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

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`computeMass`](/api/classes/PolygonShape#computemass)

***

### getChildCount()

> **getChildCount**(): `1`

Get the number of child primitives.

#### Returns

`1`

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`getChildCount`](/api/classes/PolygonShape#getchildcount)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`getRadius`](/api/classes/PolygonShape#getradius)

***

### getType()

> **getType**(): `"polygon"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"polygon"`

the shape type.

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`getType`](/api/classes/PolygonShape#gettype)

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

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`rayCast`](/api/classes/PolygonShape#raycast)

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

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`testPoint`](/api/classes/PolygonShape#testpoint)

***

### validate()

> **validate**(): `boolean`

Validate convexity. This is a very time consuming operation.

#### Returns

`boolean`

true if valid

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`validate`](/api/classes/PolygonShape#validate)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

#### Inherited from

[`PolygonShape`](/api/classes/PolygonShape).[`isValid`](/api/classes/PolygonShape#isvalid)
