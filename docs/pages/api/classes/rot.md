# Class: Rot

Rotation

## Constructors

### new Rot()

> **new Rot**(`angle`?): [`Rot`](/api/classes/Rot)

Initialize from an angle in radians.

#### Parameters

• **angle?**: `number` \| [`RotValue`](/api/interfaces/RotValue)

#### Returns

[`Rot`](/api/classes/Rot)

## Properties

### c

> **c**: `number`

cos(angle)

***

### s

> **s**: `number`

sin(angle)

## Methods

### getAngle()

> **getAngle**(): `number`

Get the angle in radians.

#### Returns

`number`

***

### getXAxis()

> **getXAxis**(): [`Vec2`](/api/classes/Vec2)

Get the x-axis.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getYAxis()

> **getYAxis**(): [`Vec2`](/api/classes/Vec2)

Get the y-axis.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### set()

> **set**(`angle`): `void`

#### Parameters

• **angle**: `number` \| [`RotValue`](/api/interfaces/RotValue)

#### Returns

`void`

***

### setAngle()

> **setAngle**(`angle`): `void`

Set using an angle in radians.

#### Parameters

• **angle**: `number`

#### Returns

`void`

***

### setIdentity()

> **setIdentity**(): `void`

Set to the identity rotation.

#### Returns

`void`

***

### setRot()

> **setRot**(`angle`): `void`

#### Parameters

• **angle**: [`RotValue`](/api/interfaces/RotValue)

#### Returns

`void`

***

### assert()

> `static` **assert**(`o`): `void`

#### Parameters

• **o**: `any`

#### Returns

`void`

***

### clone()

> `static` **clone**(`rot`): [`Rot`](/api/classes/Rot)

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

#### Returns

[`Rot`](/api/classes/Rot)

***

### identity()

> `static` **identity**(): [`Rot`](/api/classes/Rot)

#### Returns

[`Rot`](/api/classes/Rot)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

***

### mul()

#### mul(rot, m)

> `static` **mul**(`rot`, `m`): [`Rot`](/api/classes/Rot)

Multiply two rotations: q * r

##### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`RotValue`](/api/interfaces/RotValue)

##### Returns

[`Rot`](/api/classes/Rot)

#### mul(rot, m)

> `static` **mul**(`rot`, `m`): [`Vec2`](/api/classes/Vec2)

Rotate a vector

##### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulRot()

> `static` **mulRot**(`rot`, `m`): [`Rot`](/api/classes/Rot)

Multiply two rotations: q * r

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`RotValue`](/api/interfaces/RotValue)

#### Returns

[`Rot`](/api/classes/Rot)

***

### mulSub()

> `static` **mulSub**(`rot`, `v`, `w`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **v**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **w**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulT()

#### mulT(rot, m)

> `static` **mulT**(`rot`, `m`): [`Rot`](/api/classes/Rot)

Transpose multiply two rotations: qT * r

##### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`RotValue`](/api/interfaces/RotValue)

##### Returns

[`Rot`](/api/classes/Rot)

#### mulT(rot, m)

> `static` **mulT**(`rot`, `m`): [`Vec2`](/api/classes/Vec2)

Inverse rotate a vector

##### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulTRot()

> `static` **mulTRot**(`rot`, `m`): [`Rot`](/api/classes/Rot)

Transpose multiply two rotations: qT * r

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`RotValue`](/api/interfaces/RotValue)

#### Returns

[`Rot`](/api/classes/Rot)

***

### mulTVec2()

> `static` **mulTVec2**(`rot`, `m`): [`Vec2`](/api/classes/Vec2)

Inverse rotate a vector

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulVec2()

> `static` **mulVec2**(`rot`, `m`): [`Vec2`](/api/classes/Vec2)

Rotate a vector

#### Parameters

• **rot**: [`RotValue`](/api/interfaces/RotValue)

• **m**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)
