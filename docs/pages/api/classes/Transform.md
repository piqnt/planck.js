# Class: Transform

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

## Constructors

### new Transform()

> **new Transform**(`position`?, `rotation`?): [`Transform`](/api/classes/Transform)

#### Parameters

• **position?**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **rotation?**: `number`

#### Returns

[`Transform`](/api/classes/Transform)

## Properties

### p

> **p**: [`Vec2`](/api/classes/Vec2)

position

***

### q

> **q**: [`Rot`](/api/classes/Rot)

rotation

## Methods

### set()

#### set(position, rotation)

> **set**(`position`, `rotation`): `void`

Set position and angle

##### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **rotation**: `number`

##### Returns

`void`

#### set(xf)

> **set**(`xf`): `void`

Copy from another transform

##### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

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

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **rotation**: `number`

#### Returns

`void`

***

### setTransform()

> **setTransform**(`xf`): `void`

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

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

> `static` **clone**(`xf`): [`Transform`](/api/classes/Transform)

#### Parameters

• **xf**: [`Transform`](/api/classes/Transform)

#### Returns

[`Transform`](/api/classes/Transform)

***

### identity()

> `static` **identity**(): [`Transform`](/api/classes/Transform)

#### Returns

[`Transform`](/api/classes/Transform)

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

> `static` **mul**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

#### mul(a, b)

> `static` **mul**(`a`, `b`): [`Transform`](/api/classes/Transform)

##### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`TransformValue`](/api/type-aliases/TransformValue)

##### Returns

[`Transform`](/api/classes/Transform)

***

### mulAll()

#### mulAll(a, b)

> `static` **mulAll**(`a`, `b`): [`Vec2`](/api/classes/Vec2)[]

##### Parameters

• **a**: [`Transform`](/api/classes/Transform)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

##### Returns

[`Vec2`](/api/classes/Vec2)[]

#### mulAll(a, b)

> `static` **mulAll**(`a`, `b`): [`Transform`](/api/classes/Transform)[]

##### Parameters

• **a**: [`Transform`](/api/classes/Transform)

• **b**: [`Transform`](/api/classes/Transform)[]

##### Returns

[`Transform`](/api/classes/Transform)[]

***

### mulT()

#### mulT(a, b)

> `static` **mulT**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

##### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

##### Returns

[`Vec2`](/api/classes/Vec2)

#### mulT(a, b)

> `static` **mulT**(`a`, `b`): [`Transform`](/api/classes/Transform)

##### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`TransformValue`](/api/type-aliases/TransformValue)

##### Returns

[`Transform`](/api/classes/Transform)

***

### mulTVec2()

> `static` **mulTVec2**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulTXf()

> `static` **mulTXf**(`a`, `b`): [`Transform`](/api/classes/Transform)

#### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

[`Transform`](/api/classes/Transform)

***

### mulVec2()

> `static` **mulVec2**(`a`, `b`): [`Vec2`](/api/classes/Vec2)

#### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### mulXf()

> `static` **mulXf**(`a`, `b`): [`Transform`](/api/classes/Transform)

#### Parameters

• **a**: [`TransformValue`](/api/type-aliases/TransformValue)

• **b**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

[`Transform`](/api/classes/Transform)
