# Class: ChainShape

A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.

WARNING: The chain will not collide properly if there are self-intersections.

## Extends

- [`Shape`](/api/classes/Shape)

## Constructors

### new ChainShape()

> **new ChainShape**(`vertices`?, `loop`?): [`ChainShape`](/api/classes/ChainShape)

#### Parameters

• **vertices?**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

• **loop?**: `boolean`

#### Returns

[`ChainShape`](/api/classes/ChainShape)

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

> `static` **TYPE**: `"chain"`

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

> **computeDistanceProxy**(`proxy`, `childIndex`): `void`

#### Parameters

• **proxy**: [`DistanceProxy`](/api/classes/DistanceProxy)

• **childIndex**: `number`

#### Returns

`void`

#### Overrides

[`Shape`](/api/classes/Shape).[`computeDistanceProxy`](/api/classes/Shape#computedistanceproxy)

***

### computeMass()

> **computeMass**(`massData`, `density`?): `void`

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

Chains have zero mass.

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

> **getChildCount**(): `number`

Get the number of child primitives.

#### Returns

`number`

#### Overrides

[`Shape`](/api/classes/Shape).[`getChildCount`](/api/classes/Shape#getchildcount)

***

### getChildEdge()

> **getChildEdge**(`edge`, `childIndex`): `void`

#### Parameters

• **edge**: [`EdgeShape`](/api/classes/EdgeShape)

• **childIndex**: `number`

#### Returns

`void`

***

### getNextVertex()

> **getNextVertex**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getPrevVertex()

> **getPrevVertex**(): [`Vec2`](/api/classes/Vec2)

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

> **getType**(): `"chain"`

Get the type of this shape. You can use this to down cast to the concrete
shape.

#### Returns

`"chain"`

the shape type.

#### Overrides

[`Shape`](/api/classes/Shape).[`getType`](/api/classes/Shape#gettype)

***

### getVertex()

> **getVertex**(`index`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **index**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### isLoop()

> **isLoop**(): `boolean`

#### Returns

`boolean`

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

> **setNextVertex**(`nextVertex`): `void`

Establish connectivity to a vertex that follows the last vertex. Don't call
this for loops.

#### Parameters

• **nextVertex**: [`Vec2`](/api/classes/Vec2)

#### Returns

`void`

***

### setPrevVertex()

> **setPrevVertex**(`prevVertex`): `void`

Establish connectivity to a vertex that precedes the first vertex. Don't call
this for loops.

#### Parameters

• **prevVertex**: [`Vec2`](/api/classes/Vec2)

#### Returns

`void`

***

### testPoint()

> **testPoint**(`xf`, `p`): `false`

Test a point for containment in this shape. This only works for convex
shapes.

This always return false.

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
