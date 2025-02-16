# Class: Mat22

A 2-by-2 matrix. Stored in column-major order.

## Constructors

### new Mat22()

> **new Mat22**(`a`, `b`, `c`, `d`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **a**: `number`

• **b**: `number`

• **c**: `number`

• **d**: `number`

#### Returns

[`Mat22`](/api/classes/Mat22)

### new Mat22()

> **new Mat22**(`a`, `b`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **a**

• **a.x**: `number`

• **a.y**: `number`

• **b**

• **b.x**: `number`

• **b.y**: `number`

#### Returns

[`Mat22`](/api/classes/Mat22)

### new Mat22()

> **new Mat22**(): [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

## Properties

### ex

> **ex**: [`Vec2`](/api/classes/Vec2)

***

### ey

> **ey**: [`Vec2`](/api/classes/Vec2)

## Methods

### getInverse()

> **getInverse**(): [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

***

### set()

#### set(a)

> **set**(`a`): `void`

##### Parameters

• **a**: [`Mat22`](/api/classes/Mat22)

##### Returns

`void`

#### set(a, b)

> **set**(`a`, `b`): `void`

##### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

`void`

#### set(a, b, c, d)

> **set**(`a`, `b`, `c`, `d`): `void`

##### Parameters

• **a**: `number`

• **b**: `number`

• **c**: `number`

• **d**: `number`

##### Returns

`void`

***

### setIdentity()

> **setIdentity**(): `void`

#### Returns

`void`

***

### setZero()

> **setZero**(): `void`

#### Returns

`void`

***

### solve()

> **solve**(`v`): [`Vec2`](/api/classes/Vec2)

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### abs()

> `static` **abs**(`mx`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

***

### add()

> `static` **add**(`mx1`, `mx2`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **mx1**: [`Mat22`](/api/classes/Mat22)

• **mx2**: [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

***

### assert()

> `static` **assert**(`o`): `void`

#### Parameters

• **o**: `any`

#### Returns

`void`

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

***

### mul()

#### mul(mx, my)

> `static` **mul**(`mx`, `my`): [`Mat22`](/api/classes/Mat22)

Multiply a matrix times a vector. If a rotation matrix is provided, then this
transforms the vector from one frame to another.

##### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **my**: [`Mat22`](/api/classes/Mat22)

##### Returns

[`Mat22`](/api/classes/Mat22)

#### mul(mx, v)

> `static` **mul**(`mx`, `v`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulMat22()

> `static` **mulMat22**(`mx`, `v`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

***

### mulT()

#### mulT(mx, my)

> `static` **mulT**(`mx`, `my`): [`Mat22`](/api/classes/Mat22)

Multiply a matrix transpose times a vector. If a rotation matrix is provided,
then this transforms the vector from one frame to another (inverse
transform).

##### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **my**: [`Mat22`](/api/classes/Mat22)

##### Returns

[`Mat22`](/api/classes/Mat22)

#### mulT(mx, v)

> `static` **mulT**(`mx`, `v`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulTMat22()

> `static` **mulTMat22**(`mx`, `v`): [`Mat22`](/api/classes/Mat22)

#### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Mat22`](/api/classes/Mat22)

#### Returns

[`Mat22`](/api/classes/Mat22)

***

### mulTVec2()

> `static` **mulTVec2**(`mx`, `v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulVec2()

> `static` **mulVec2**(`mx`, `v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **mx**: [`Mat22`](/api/classes/Mat22)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)
