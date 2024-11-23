# Class: Rot

Rotation

## Constructors

### new Rot()

> **new Rot**(`angle`?): [`Rot`](Rot)

Initialize from an angle in radians.

#### Parameters

• **angle?**: `number` \| [`RotValue`](../interfaces/RotValue)

#### Returns

[`Rot`](Rot)

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

> **getXAxis**(): [`Vec2`](Vec2)

Get the x-axis.

#### Returns

[`Vec2`](Vec2)

***

### getYAxis()

> **getYAxis**(): [`Vec2`](Vec2)

Get the y-axis.

#### Returns

[`Vec2`](Vec2)

***

### set()

> **set**(`angle`): `void`

#### Parameters

• **angle**: `number` \| [`RotValue`](../interfaces/RotValue)

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

• **angle**: [`RotValue`](../interfaces/RotValue)

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

> `static` **clone**(`rot`): [`Rot`](Rot)

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

#### Returns

[`Rot`](Rot)

***

### identity()

> `static` **identity**(): [`Rot`](Rot)

#### Returns

[`Rot`](Rot)

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

> `static` **mul**(`rot`, `m`): [`Rot`](Rot)

Multiply two rotations: q * r

##### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`RotValue`](../interfaces/RotValue)

##### Returns

[`Rot`](Rot)

#### mul(rot, m)

> `static` **mul**(`rot`, `m`): [`Vec2`](Vec2)

Rotate a vector

##### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`Vec2Value`](../interfaces/Vec2Value)

##### Returns

[`Vec2`](Vec2)

***

### mulRot()

> `static` **mulRot**(`rot`, `m`): [`Rot`](Rot)

Multiply two rotations: q * r

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`RotValue`](../interfaces/RotValue)

#### Returns

[`Rot`](Rot)

***

### mulSub()

> `static` **mulSub**(`rot`, `v`, `w`): [`Vec2`](Vec2)

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **v**: [`Vec2Value`](../interfaces/Vec2Value)

• **w**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### mulT()

#### mulT(rot, m)

> `static` **mulT**(`rot`, `m`): [`Rot`](Rot)

Transpose multiply two rotations: qT * r

##### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`RotValue`](../interfaces/RotValue)

##### Returns

[`Rot`](Rot)

#### mulT(rot, m)

> `static` **mulT**(`rot`, `m`): [`Vec2`](Vec2)

Inverse rotate a vector

##### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`Vec2Value`](../interfaces/Vec2Value)

##### Returns

[`Vec2`](Vec2)

***

### mulTRot()

> `static` **mulTRot**(`rot`, `m`): [`Rot`](Rot)

Transpose multiply two rotations: qT * r

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`RotValue`](../interfaces/RotValue)

#### Returns

[`Rot`](Rot)

***

### mulTVec2()

> `static` **mulTVec2**(`rot`, `m`): [`Vec2`](Vec2)

Inverse rotate a vector

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### mulVec2()

> `static` **mulVec2**(`rot`, `m`): [`Vec2`](Vec2)

Rotate a vector

#### Parameters

• **rot**: [`RotValue`](../interfaces/RotValue)

• **m**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)
