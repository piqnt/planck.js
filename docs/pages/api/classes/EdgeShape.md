# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Extends

- [`Shape`](Shape)

## Constructors

### new EdgeShape()

> **new EdgeShape**(`v1`?, `v2`?): [`EdgeShape`](EdgeShape)

#### Parameters

• **v1?**: [`Vec2Value`](../interfaces/Vec2Value)

• **v2?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`EdgeShape`](EdgeShape)

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

> `static` **TYPE**: `"edge"`

## Methods

### \_set()

> **\_set**(`v1`, `v2`): [`EdgeShape`](EdgeShape)

Set this as an isolated edge.

#### Parameters

• **v1**: [`Vec2Value`](../interfaces/Vec2Value)

• **v2**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`EdgeShape`](EdgeShape)

***

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

> **computeMass**(`massData`, `density`?): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

#### Parameters

• **massData**: [`MassData`](../interfaces/MassData)

Returns the mass data for this shape.

• **density?**: `number`

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

### getNextVertex()

> **getNextVertex**(): [`Vec2`](Vec2)

Optional next vertex, used for smooth collision.

#### Returns

[`Vec2`](Vec2)

***

### getPrevVertex()

> **getPrevVertex**(): [`Vec2`](Vec2)

Optional prev vertex, used for smooth collision.

#### Returns

[`Vec2`](Vec2)

***

### getRadius()

> **getRadius**(): `number`

#### Returns

`number`

#### Overrides

[`Shape`](Shape).[`getRadius`](Shape#getradius)

***

### getType()

> **getType**(): `"edge"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"edge"`

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

### setNextVertex()

> **setNextVertex**(`v`?): [`EdgeShape`](EdgeShape)

Optional next vertex, used for smooth collision.

#### Parameters

• **v?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`EdgeShape`](EdgeShape)

***

### setPrevVertex()

> **setPrevVertex**(`v`?): [`EdgeShape`](EdgeShape)

Optional prev vertex, used for smooth collision.

#### Parameters

• **v?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`EdgeShape`](EdgeShape)

***

### testPoint()

> **testPoint**(`xf`, `p`): `false`

Test a point for containment in this shape. This only works for convex
shapes.

#### Parameters

• **xf**: [`TransformValue`](../type-aliases/TransformValue)

The shape world transform.

• **p**: [`Vec2Value`](../interfaces/Vec2Value)

A point in world coordinates.

#### Returns

`false`

#### Overrides

[`Shape`](Shape).[`testPoint`](Shape#testpoint)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

#### Inherited from

[`Shape`](Shape).[`isValid`](Shape#isvalid)
