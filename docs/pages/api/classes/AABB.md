# Class: AABB

Axis-aligned bounding box

## Constructors

### new AABB()

> **new AABB**(`lower`?, `upper`?): [`AABB`](AABB)

#### Parameters

• **lower?**: [`Vec2Value`](../interfaces/Vec2Value)

• **upper?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`AABB`](AABB)

## Properties

### lowerBound

> **lowerBound**: [`Vec2`](Vec2)

***

### upperBound

> **upperBound**: [`Vec2`](Vec2)

## Methods

### combine()

> **combine**(`a`, `b`?): `void`

Combine one or two AABB into this one.

#### Parameters

• **a**: [`AABBValue`](../interfaces/AABBValue)

• **b?**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`void`

***

### combinePoints()

> **combinePoints**(`a`, `b`): `void`

#### Parameters

• **a**: [`Vec2Value`](../interfaces/Vec2Value)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

`void`

***

### contains()

> **contains**(`aabb`): `boolean`

#### Parameters

• **aabb**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`boolean`

***

### extend()

> **extend**(`value`): [`AABB`](AABB)

#### Parameters

• **value**: `number`

#### Returns

[`AABB`](AABB)

***

### getCenter()

> **getCenter**(): [`Vec2`](Vec2)

Get the center of the AABB.

#### Returns

[`Vec2`](Vec2)

***

### getExtents()

> **getExtents**(): [`Vec2`](Vec2)

Get the extents of the AABB (half-widths).

#### Returns

[`Vec2`](Vec2)

***

### getPerimeter()

> **getPerimeter**(): `number`

Get the perimeter length.

#### Returns

`number`

***

### isValid()

> **isValid**(): `boolean`

Verify that the bounds are sorted.

#### Returns

`boolean`

***

### rayCast()

> **rayCast**(`output`, `input`): `boolean`

#### Parameters

• **output**: [`RayCastOutput`](../interfaces/RayCastOutput)

• **input**: [`RayCastInput`](../interfaces/RayCastInput)

#### Returns

`boolean`

***

### set()

> **set**(`aabb`): `void`

#### Parameters

• **aabb**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`void`

***

### areEqual()

> `static` **areEqual**(`a`, `b`): `boolean`

#### Parameters

• **a**: [`AABBValue`](../interfaces/AABBValue)

• **b**: [`AABBValue`](../interfaces/AABBValue)

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

### combinedPerimeter()

> `static` **combinedPerimeter**(`a`, `b`): `number`

#### Parameters

• **a**: [`AABBValue`](../interfaces/AABBValue)

• **b**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`number`

***

### combinePoints()

> `static` **combinePoints**(`out`, `a`, `b`): [`AABBValue`](../interfaces/AABBValue)

#### Parameters

• **out**: [`AABBValue`](../interfaces/AABBValue)

• **a**: [`Vec2Value`](../interfaces/Vec2Value)

• **b**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`AABBValue`](../interfaces/AABBValue)

***

### diff()

> `static` **diff**(`a`, `b`): `number`

#### Parameters

• **a**: [`AABBValue`](../interfaces/AABBValue)

• **b**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`number`

***

### extend()

> `static` **extend**(`out`, `value`): [`AABBValue`](../interfaces/AABBValue)

#### Parameters

• **out**: [`AABBValue`](../interfaces/AABBValue)

• **value**: `number`

#### Returns

[`AABBValue`](../interfaces/AABBValue)

***

### isValid()

> `static` **isValid**(`obj`): `boolean`

#### Parameters

• **obj**: `any`

#### Returns

`boolean`

***

### testOverlap()

> `static` **testOverlap**(`a`, `b`): `boolean`

#### Parameters

• **a**: [`AABBValue`](../interfaces/AABBValue)

• **b**: [`AABBValue`](../interfaces/AABBValue)

#### Returns

`boolean`
