# Class: DistanceProxy

A distance proxy is used by the GJK algorithm. It encapsulates any shape.

## Constructors

### new DistanceProxy()

> **new DistanceProxy**(): [`DistanceProxy`](/api/classes/DistanceProxy)

#### Returns

[`DistanceProxy`](/api/classes/DistanceProxy)

## Methods

### getSupport()

> **getSupport**(`d`): `number`

Get the supporting vertex index in the given direction.

#### Parameters

• **d**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### getSupportVertex()

> **getSupportVertex**(`d`): [`Vec2Value`](/api/interfaces/Vec2Value)

Get the supporting vertex in the given direction.

#### Parameters

• **d**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2Value`](/api/interfaces/Vec2Value)

***

### getVertex()

> **getVertex**(`index`): [`Vec2Value`](/api/interfaces/Vec2Value)

Get a vertex by index. Used by Distance.

#### Parameters

• **index**: `number`

#### Returns

[`Vec2Value`](/api/interfaces/Vec2Value)

***

### getVertexCount()

> **getVertexCount**(): `number`

Get the vertex count.

#### Returns

`number`

***

### recycle()

> **recycle**(): `void`

#### Returns

`void`

***

### set()

> **set**(`shape`, `index`): `void`

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

#### Parameters

• **shape**: [`Shape`](/api/classes/Shape)

• **index**: `number`

#### Returns

`void`

***

### setVertices()

> **setVertices**(`vertices`, `count`, `radius`): `void`

Initialize the proxy using a vertex cloud and radius. The vertices
must remain in scope while the proxy is in use.

#### Parameters

• **vertices**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

• **count**: `number`

• **radius**: `number`

#### Returns

`void`
