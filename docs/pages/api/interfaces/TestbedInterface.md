# Interface: TestbedInterface

## Properties

### activeKeys

> **activeKeys**: [`ActiveKeys`](/api/type-aliases/ActiveKeys)

***

### background

> **background**: `string`

***

### height

> **height**: `number`

World viewbox height.

***

### hz

> **hz**: `number`

World simulation step frequency

***

### keydown()?

> `optional` **keydown**: (`keyCode`, `label`) => `void`

callback, to be implemented by user

#### Parameters

• **keyCode**: `number`

• **label**: `string`

#### Returns

`void`

***

### keyup()?

> `optional` **keyup**: (`keyCode`, `label`) => `void`

callback, to be implemented by user

#### Parameters

• **keyCode**: `number`

• **label**: `string`

#### Returns

`void`

***

### mouseForce?

> `optional` **mouseForce**: `number`

***

### speed

> **speed**: `number`

World simulation speed, default is 1

***

### step()?

> `optional` **step**: (`dt`, `t`) => `void`

callback, to be implemented by user

#### Parameters

• **dt**: `number`

• **t**: `number`

#### Returns

`void`

***

### width

> **width**: `number`

World viewbox width.

***

### x

> **x**: `number`

World viewbox center vertical offset.

***

### y

> **y**: `number`

World viewbox center horizontal offset.

## Methods

### color()

> **color**(`r`, `g`, `b`): `string`

#### Parameters

• **r**: `number`

• **g**: `number`

• **b**: `number`

#### Returns

`string`

***

### drawAABB()

> **drawAABB**(`aabb`, `color`): `void`

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **color**: `string`

#### Returns

`void`

***

### drawChain()

> **drawChain**(`points`, `color`): `void`

#### Parameters

• **points**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

• **color**: `string`

#### Returns

`void`

***

### drawCircle()

> **drawCircle**(`p`, `r`, `color`): `void`

#### Parameters

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **r**: `number`

• **color**: `string`

#### Returns

`void`

***

### drawEdge()

> **drawEdge**(`a`, `b`, `color`): `void`

#### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **color**: `string`

#### Returns

`void`

***

### drawPoint()

> **drawPoint**(`p`, `r`, `color`): `void`

#### Parameters

• **p**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **r**: `any`

• **color**: `string`

#### Returns

`void`

***

### drawPolygon()

> **drawPolygon**(`points`, `color`): `void`

#### Parameters

• **points**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

• **color**: `string`

#### Returns

`void`

***

### drawSegment()

> **drawSegment**(`a`, `b`, `color`): `void`

#### Parameters

• **a**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **b**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **color**: `string`

#### Returns

`void`

***

### findAll()

> **findAll**(`query`): ([`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint))[]

#### Parameters

• **query**: `string`

#### Returns

([`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint))[]

***

### findOne()

> **findOne**(`query`): [`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint)

#### Parameters

• **query**: `string`

#### Returns

[`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint)

***

### info()

> **info**(`text`): `void`

#### Parameters

• **text**: `string`

#### Returns

`void`

***

### start()

> **start**(`world`): `void`

#### Parameters

• **world**: [`World`](/api/classes/World)

#### Returns

`void`

***

### status()

#### status(name, value)

> **status**(`name`, `value`): `void`

##### Parameters

• **name**: `string`

• **value**: `any`

##### Returns

`void`

#### status(value)

> **status**(`value`): `void`

##### Parameters

• **value**: `string` \| `object`

##### Returns

`void`
