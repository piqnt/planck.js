# Class: Vec2

2D vector

## Constructors

### new Vec2()

> **new Vec2**(`x`, `y`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **x**: `number`

• **y**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

### new Vec2()

> **new Vec2**(`obj`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **obj**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

### new Vec2()

> **new Vec2**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

## Properties

### x

> **x**: `number`

***

### y

> **y**: `number`

## Methods

### add()

> **add**(`w`): [`Vec2`](/api/classes/Vec2)

Add a vector to this vector.

#### Parameters

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### addCombine()

> **addCombine**(`a`, `v`, `b`, `w`): [`Vec2`](/api/classes/Vec2)

Add linear combination of v and w: `a * v + b * w`

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### addMul()

> **addMul**(`a`, `v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### clamp()

> **clamp**(`max`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **max**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### clone()

> **clone**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### length()

> **length**(): `number`

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

#### Returns

`number`

***

### lengthSquared()

> **lengthSquared**(): `number`

Get the length squared.

#### Returns

`number`

***

### mul()

> **mul**(`m`): [`Vec2`](/api/classes/Vec2)

Multiply this vector by a scalar.

#### Parameters

• **m**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### neg()

> **neg**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### normalize()

> **normalize**(): `number`

Convert this vector into a unit vector.

#### Returns

`number`

old length

***

### set()

Set this vector to some specified coordinates.

#### set(x, y)

> **set**(`x`, `y`): [`Vec2`](/api/classes/Vec2)

Set this vector to some specified coordinates.

##### Parameters

• **x**: `number`

• **y**: `number`

##### Returns

[`Vec2`](/api/classes/Vec2)

#### set(value)

> **set**(`value`): [`Vec2`](/api/classes/Vec2)

Set this vector to some specified coordinates.

##### Parameters

• **value**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### setCombine()

> **setCombine**(`a`, `v`, `b`, `w`): [`Vec2`](/api/classes/Vec2)

Set linear combination of v and w: `a * v + b * w`

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### setMul()

> **setMul**(`a`, `v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### setNum()

> **setNum**(`x`, `y`): [`Vec2`](/api/classes/Vec2)

Set this vector to some specified coordinates.

#### Parameters

• **x**: `number`

• **y**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### setVec2()

> **setVec2**(`value`): [`Vec2`](/api/classes/Vec2)

Set this vector to some specified coordinates.

#### Parameters

• **value**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### setZero()

> **setZero**(): [`Vec2`](/api/classes/Vec2)

Set this vector to all zeros.

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### sub()

> **sub**(`w`): [`Vec2`](/api/classes/Vec2)

Subtract a vector from this vector

#### Parameters

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

this

***

### subCombine()

> **subCombine**(`a`, `v`, `b`, `w`): [`Vec2`](/api/classes/Vec2)

Subtract linear combination of v and w: `a * v + b * w`

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### subMul()

> **subMul**(`a`, `v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### ~~wSub()~~

> **wSub**(`a`, `v`, `b`?, `w`?): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b?**: `number`

• **w?**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

#### Deprecated

Use subCombine or subMul

***

### abs()

> `static` **abs**(`v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### add()

> `static` **add**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### addCross()

#### addCross(a, v, w)

> `static` **addCross**(`a`, `v`, `w`): [`Vec2`](/api/classes/Vec2)

Returns `a + (v x w)`

##### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: `number`

##### Returns

[`Vec2`](/api/classes/Vec2)

#### addCross(a, v, w)

> `static` **addCross**(`a`, `v`, `w`): [`Vec2`](/api/classes/Vec2)

Returns `a + (v x w)`

##### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### addCrossNumVec2()

> `static` **addCrossNumVec2**(`a`, `v`, `w`): [`Vec2`](/api/classes/Vec2)

Returns `a + (v x w)`

#### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### addCrossVec2Num()

> `static` **addCrossVec2Num**(`a`, `v`, `w`): [`Vec2`](/api/classes/Vec2)

Returns `a + (v x w)`

#### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### areEqual()

> `static` **areEqual**(`v`, `w`): `boolean`

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`boolean`

***

### assert()

> `static` **assert**(`o`): `void`

#### Parameters

• **o**: `any`

#### Returns

`void`

***

### clamp()

> `static` **clamp**(`v`, `max`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **max**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### clone()

> `static` **clone**(`v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### combine()

> `static` **combine**(`a`, `v`, `b`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### cross()

#### cross(v, w)

> `static` **cross**(`v`, `w`): `number`

Cross product between two vectors

##### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

`number`

#### cross(v, w)

> `static` **cross**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

Cross product between a vector and a scalar

##### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: `number`

##### Returns

[`Vec2`](/api/classes/Vec2)

#### cross(v, w)

> `static` **cross**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

Cross product between a scalar and a vector

##### Parameters

• **v**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### crossNumVec2()

> `static` **crossNumVec2**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

Cross product on a vector and a scalar

#### Parameters

• **v**: `number`

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### crossVec2Num()

> `static` **crossVec2Num**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

Cross product on a vector and a scalar

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### crossVec2Vec2()

> `static` **crossVec2Vec2**(`v`, `w`): `number`

Cross product on two vectors

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### distance()

> `static` **distance**(`v`, `w`): `number`

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### distanceSquared()

> `static` **distanceSquared**(`v`, `w`): `number`

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### dot()

> `static` **dot**(`v`, `w`): `number`

Dot product on two vectors

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

Does this vector contain finite coordinates?

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

***

### lengthOf()

> `static` **lengthOf**(`v`): `number`

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### lengthSquared()

> `static` **lengthSquared**(`v`): `number`

Get the length squared.

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`number`

***

### lower()

> `static` **lower**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mid()

> `static` **mid**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mul()

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

##### Returns

[`Vec2`](/api/classes/Vec2)

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **a**: `number`

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulNumVec2()

> `static` **mulNumVec2**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: `number`

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulVec2Num()

> `static` **mulVec2Num**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### neg()

> `static` **neg**(`v`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### normalize()

> `static` **normalize**(`v`): [`Vec2`](/api/classes/Vec2)

Returns a new unit vector from the provided vector.

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

new unit vector

***

### skew()

> `static` **skew**(`v`): [`Vec2`](/api/classes/Vec2)

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### sub()

> `static` **sub**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### upper()

> `static` **upper**(`v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### zero()

> `static` **zero**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)
