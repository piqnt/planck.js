# Class: Vec3

3D vector

## Constructors

### new Vec3()

> **new Vec3**(`x`, `y`, `z`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **x**: `number`

• **y**: `number`

• **z**: `number`

#### Returns

[`Vec3`](/api/classes/Vec3)

### new Vec3()

> **new Vec3**(`obj`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **obj**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

### new Vec3()

> **new Vec3**(): [`Vec3`](/api/classes/Vec3)

#### Returns

[`Vec3`](/api/classes/Vec3)

## Properties

### x

> **x**: `number`

***

### y

> **y**: `number`

***

### z

> **z**: `number`

## Methods

### add()

> **add**(`w`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### mul()

> **mul**(`m`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **m**: `number`

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### neg()

> **neg**(): [`Vec3`](/api/classes/Vec3)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### set()

> **set**(`x`, `y`, `z`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **x**: `number`

• **y**: `number`

• **z**: `number`

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### setZero()

> **setZero**(): [`Vec3`](/api/classes/Vec3)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### sub()

> **sub**(`w`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### add()

> `static` **add**(`v`, `w`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### areEqual()

> `static` **areEqual**(`v`, `w`): `boolean`

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

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

### clone()

> `static` **clone**(`v`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### cross()

> `static` **cross**(`v`, `w`): [`Vec3`](/api/classes/Vec3)

Cross product on two vectors

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### dot()

> `static` **dot**(`v`, `w`): `number`

Dot product on two vectors

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

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

### mul()

> `static` **mul**(`v`, `m`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **m**: `number`

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### neg()

> `static` **neg**(`v`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### sub()

> `static` **sub**(`v`, `w`): [`Vec3`](/api/classes/Vec3)

#### Parameters

• **v**: [`Vec3Value`](/api/interfaces/Vec3Value)

• **w**: [`Vec3Value`](/api/interfaces/Vec3Value)

#### Returns

[`Vec3`](/api/classes/Vec3)

***

### zero()

> `static` **zero**(): [`Vec3`](/api/classes/Vec3)

#### Returns

[`Vec3`](/api/classes/Vec3)
