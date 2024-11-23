# Class: Transform

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

## Constructors

### new Transform()

> **new Transform**(`position`?, `rotation`?): [`Transform`](Transform)

#### Parameters

• **position?**: [`Vec2Value`](../interfaces/Vec2Value)

• **rotation?**: `number`

#### Returns

[`Transform`](Transform)

## Properties

### p

> **p**: [`Vec2`](Vec2)

position

***

### q

> **q**: [`Rot`](Rot)

rotation

## Methods

### set()

#### set(position, rotation)

> **set**(`position`, `rotation`): `void`

Set position and angle

##### Parameters

• **position**: [`Vec2Value`](../interfaces/Vec2Value)

• **rotation**: `number`

##### Returns

`void`

#### set(xf)

> **set**(`xf`): `void`

Copy from another transform

##### Parameters

• **xf**: [`TransformValue`](../type-aliases/TransformValue)

##### Returns

`void`

***

### setIdentity()

> **setIdentity**(): `void`

Set this to the identity transform

#### Returns

`void`

***

### setNum()

> **setNum**(`position`, `rotation`): `void`

Set position and angle

#### Parameters

• **position**: [`Vec2Value`](../interfaces/Vec2Value)

• **rotation**: `number`

#### Returns

`void`

***

### setTransform()

> **setTransform**(`xf`): `void`

#### Parameters

• **xf**: [`TransformValue`](../type-aliases/TransformValue)

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

> `static` **clone**(`xf`): [`Transform`](Transform)

#### Parameters

• **xf**: [`Transform`](Transform)

#### Returns

[`Transform`](Transform)

***

### identity()

> `static` **identity**(): [`Transform`](Transform)

#### Returns

[`Transform`](Transform)

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

##### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

##### Returns

[`Vec2`](Vec2)

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Transform`](Transform)

##### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`TransformValue`](../type-aliases/TransformValue)

##### Returns

[`Transform`](Transform)

***

### mulAll()

#### mulAll(a, b)

> `static` **mulAll**(`a`, `b`): [`Vec2`](Vec2)[]

##### Parameters

• **a**: [`Transform`](Transform)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)[]

##### Returns

[`Vec2`](Vec2)[]

#### mulAll(a, b)

> `static` **mulAll**(`a`, `b`): [`Transform`](Transform)[]

##### Parameters

• **a**: [`Transform`](Transform)

• **b**: [`Transform`](Transform)[]

##### Returns

[`Transform`](Transform)[]

***

### mulT()

#### mulT(a, b)

> `static` **mulT**(`a`, `b`): [`Vec2`](Vec2)

##### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

##### Returns

[`Vec2`](Vec2)

#### mulT(a, b)

> `static` **mulT**(`a`, `b`): [`Transform`](Transform)

##### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`TransformValue`](../type-aliases/TransformValue)

##### Returns

[`Transform`](Transform)

***

### mulTVec2()

> `static` **mulTVec2**(`a`, `b`): [`Vec2`](Vec2)

#### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### mulTXf()

> `static` **mulTXf**(`a`, `b`): [`Transform`](Transform)

#### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`TransformValue`](../type-aliases/TransformValue)

#### Returns

[`Transform`](Transform)

***

### mulVec2()

> `static` **mulVec2**(`a`, `b`): [`Vec2`](Vec2)

#### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`Vec2`](Vec2)

***

### mulXf()

> `static` **mulXf**(`a`, `b`): [`Transform`](Transform)

#### Parameters

• **a**: [`TransformValue`](../type-aliases/TransformValue)

• **b**: [`TransformValue`](../type-aliases/TransformValue)

#### Returns

[`Transform`](Transform)
