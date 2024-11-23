# Class: Mat33

A 3-by-3 matrix. Stored in column-major order.

## Constructors

### new Mat33()

> **new Mat33**(`a`, `b`, `c`): [`Mat33`](Mat33)

#### Parameters

• **a**: [`Vec3Value`](../interfaces/Vec3Value)

• **b**: [`Vec3Value`](../interfaces/Vec3Value)

• **c**: [`Vec3Value`](../interfaces/Vec3Value)

#### Returns

[`Mat33`](Mat33)

### new Mat33()

> **new Mat33**(): [`Mat33`](Mat33)

#### Returns

[`Mat33`](Mat33)

## Properties

### ex

> **ex**: [`Vec3`](Vec3)

***

### ey

> **ey**: [`Vec3`](Vec3)

***

### ez

> **ez**: [`Vec3`](Vec3)

## Methods

### getInverse22()

> **getInverse22**(`M`): `void`

Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
singular.

#### Parameters

• **M**: [`Mat33`](Mat33)

#### Returns

`void`

***

### getSymInverse33()

> **getSymInverse33**(`M`): `void`

Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
if singular.

#### Parameters

• **M**: [`Mat33`](Mat33)

#### Returns

`void`

***

### setZero()

> **setZero**(): [`Mat33`](Mat33)

Set this matrix to all zeros.

#### Returns

[`Mat33`](Mat33)

***

### solve22()

> **solve22**(`v`): [`Vec2`](Vec2)

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
equation.

#### Parameters

• **v**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### solve33()

> **solve33**(`v`): [`Vec3`](Vec3)

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

#### Parameters

• **v**: [`Vec3Value`](../interfaces/Vec3Value)

#### Returns

[`Vec3`](Vec3)

***

### add()

> `static` **add**(`a`, `b`): [`Mat33`](Mat33)

#### Parameters

• **a**: [`Mat33`](Mat33)

• **b**: [`Mat33`](Mat33)

#### Returns

[`Mat33`](Mat33)

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

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Vec2`](Vec2)

Multiply a matrix times a vector.

##### Parameters

• **a**: [`Mat33`](Mat33)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

##### Returns

[`Vec2`](Vec2)

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Vec3`](Vec3)

##### Parameters

• **a**: [`Mat33`](Mat33)

• **b**: [`Vec3Value`](../interfaces/Vec3Value)

##### Returns

[`Vec3`](Vec3)

***

### mulVec2()

> `static` **mulVec2**(`a`, `b`): [`Vec2`](Vec2)

#### Parameters

• **a**: [`Mat33`](Mat33)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### mulVec3()

> `static` **mulVec3**(`a`, `b`): [`Vec3`](Vec3)

#### Parameters

• **a**: [`Mat33`](Mat33)

• **b**: [`Vec3Value`](../interfaces/Vec3Value)

#### Returns

[`Vec3`](Vec3)
