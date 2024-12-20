# Class: `abstract` Testbed

## Constructors

### new Testbed()

> **new Testbed**(): [`Testbed`](/api/classes/Testbed)

#### Returns

[`Testbed`](/api/classes/Testbed)

## Properties

### activeKeys

> **activeKeys**: [`ActiveKeys`](/api/type-aliases/ActiveKeys) = `{}`

***

### background

> **background**: `string` = `"#222222"`

***

### height

> **height**: `number` = `60`

World viewbox height.

***

### hz

> **hz**: `number` = `60`

World simulation step frequency

***

### mouseForce?

> `optional` **mouseForce**: `number`

***

### speed

> **speed**: `number` = `1`

World simulation speed, default is 1

***

### width

> **width**: `number` = `80`

World viewbox width.

***

### x

> **x**: `number` = `0`

World viewbox center vertical offset.

***

### y

> **y**: `number` = `-10`

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

> `abstract` **drawAABB**(`aabb`, `color`): `void`

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **color**: `string`

#### Returns

`void`

***

### drawCircle()

> `abstract` **drawCircle**(`p`, `r`, `color`): `void`

#### Parameters

• **p**

• **p.x**: `number`

• **p.y**: `number`

• **r**: `number`

• **color**: `string`

#### Returns

`void`

***

### drawEdge()

> `abstract` **drawEdge**(`a`, `b`, `color`): `void`

#### Parameters

• **a**

• **a.x**: `number`

• **a.y**: `number`

• **b**

• **b.x**: `number`

• **b.y**: `number`

• **color**: `string`

#### Returns

`void`

***

### drawPoint()

> `abstract` **drawPoint**(`p`, `r`, `color`): `void`

#### Parameters

• **p**

• **p.x**: `number`

• **p.y**: `number`

• **r**: `any`

• **color**: `string`

#### Returns

`void`

***

### drawPolygon()

> `abstract` **drawPolygon**(`points`, `color`): `void`

#### Parameters

• **points**: `object`[]

• **color**: `string`

#### Returns

`void`

***

### drawSegment()

> `abstract` **drawSegment**(`a`, `b`, `color`): `void`

#### Parameters

• **a**

• **a.x**: `number`

• **a.y**: `number`

• **b**

• **b.x**: `number`

• **b.y**: `number`

• **color**: `string`

#### Returns

`void`

***

### findAll()

> `abstract` **findAll**(`query`): ([`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint))[]

#### Parameters

• **query**: `string`

#### Returns

([`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint))[]

***

### findOne()

> `abstract` **findOne**(`query`): [`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint)

#### Parameters

• **query**: `string`

#### Returns

[`Body`](/api/classes/Body) \| [`Fixture`](/api/classes/Fixture) \| [`Joint`](/api/classes/Joint)

***

### info()

> `abstract` **info**(`text`): `void`

#### Parameters

• **text**: `string`

#### Returns

`void`

***

### keydown()

> **keydown**(`keyCode`, `label`): `void`

callback, to be implemented by user

#### Parameters

• **keyCode**: `number`

• **label**: `string`

#### Returns

`void`

***

### keyup()

> **keyup**(`keyCode`, `label`): `void`

callback, to be implemented by user

#### Parameters

• **keyCode**: `number`

• **label**: `string`

#### Returns

`void`

***

### start()

> `abstract` **start**(`world`): `void`

#### Parameters

• **world**: [`World`](/api/classes/World)

#### Returns

`void`

***

### status()

#### status(name, value)

> `abstract` **status**(`name`, `value`): `void`

##### Parameters

• **name**: `string`

• **value**: `any`

##### Returns

`void`

#### status(value)

> `abstract` **status**(`value`): `void`

##### Parameters

• **value**: `string` \| `object`

##### Returns

`void`

***

### step()

> **step**(`dt`, `t`): `void`

callback, to be implemented by user

#### Parameters

• **dt**: `number`

• **t**: `number`

#### Returns

`void`

***

### mount()

> `static` **mount**(`options`?): [`Testbed`](/api/classes/Testbed)

Mounts testbed. Call start with a world to start simulation and rendering.

#### Parameters

• **options?**: `TestbedMountOptions`

#### Returns

[`Testbed`](/api/classes/Testbed)

***

### start()

> `static` **start**(`world`): [`Testbed`](/api/classes/Testbed)

Mounts testbed if needed, then starts simulation and rendering.

If you need to customize testbed before starting, first run `const testbed = Testbed.mount()` and then `testbed.start()`.

#### Parameters

• **world**: [`World`](/api/classes/World)

#### Returns

[`Testbed`](/api/classes/Testbed)
