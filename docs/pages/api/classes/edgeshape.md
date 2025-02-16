# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Extends

- [`Shape`](/api/classes/Shape)

## Constructors

### new EdgeShape()

> **new EdgeShape**(`v1`?, `v2`?): [`EdgeShape`](/api/classes/EdgeShape)

#### Parameters

• **v1?**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v2?**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`EdgeShape`](/api/classes/EdgeShape)

#### Overrides

[`Shape`](/api/classes/Shape).[`constructor`](/api/classes/Shape#constructors)

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`Shape`](/api/classes/Shape).[`style`](/api/classes/Shape#style)

***

### TYPE

> `static` **TYPE**: `"edge"`

## Methods

### \_set()

> **\_set**(`v1`, `v2`): [`EdgeShape`](/api/classes/EdgeShape)

Set this as an isolated edge.

#### Parameters

• **v1**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v2**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`EdgeShape`](/api/classes/EdgeShape)

***

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

> **computeMass**(`massData`, `density`?): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

#### Parameters

• **massData**: [`MassData`](/api/interfaces/MassData)

Returns the mass data for this shape.

• **density?**: `number`

The density in kilograms per meter squared.

#### Returns

`void`

#### Overrides

[`Shape`](/api/classes/Shape).[`computeMass`](/api/classes/Shape#computemass)

***

### getChildCount()

> **getChildCount**(): `1`

Get the number of child primitives.

#### Returns

`1`

#### Overrides

[`Shape`](/api/classes/Shape).[`getChildCount`](/api/classes/Shape#getchildcount)

***

### getNextVertex()

> **getNextVertex**(): [`Vec2`](/api/classes/Vec2)

Optional next vertex, used for smooth collision.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getPrevVertex()

> **getPrevVertex**(): [`Vec2`](/api/classes/Vec2)

Optional prev vertex, used for smooth collision.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Overrides

[`Shape`](/api/classes/Shape).[`getRadius`](/api/classes/Shape#getradius)

***

### getType()

> **getType**(): `"edge"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"edge"`

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

### setNextVertex()

> **setNextVertex**(`v`?): [`EdgeShape`](/api/classes/EdgeShape)

Optional next vertex, used for smooth collision.

#### Parameters

• **v?**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`EdgeShape`](/api/classes/EdgeShape)

***

### setPrevVertex()

> **setPrevVertex**(`v`?): [`EdgeShape`](/api/classes/EdgeShape)

Optional prev vertex, used for smooth collision.

#### Parameters

• **v?**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`EdgeShape`](/api/classes/EdgeShape)

***

### testPoint()

> **testPoint**(`xf`, `p`): `false`

Test a point for containment in this shape. This only works for convex
shapes.

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

The shape world transform.

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

A point in world coordinates.

#### Returns

`false`

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
