# Class: Solver

Finds and solves islands. An island is a connected subset of the world.

## Constructors

### new Solver()

> **new Solver**(`world`): [`Solver`](/api/classes/Solver)

#### Parameters

• **world**: [`World`](/api/classes/World)

#### Returns

[`Solver`](/api/classes/Solver)

## Properties

### m\_bodies

> **m\_bodies**: [`Body`](/api/classes/Body)[]

***

### m\_contacts

> **m\_contacts**: [`Contact`](/api/classes/Contact)[]

***

### m\_joints

> **m\_joints**: [`Joint`](/api/classes/Joint)[]

***

### m\_stack

> **m\_stack**: [`Body`](/api/classes/Body)[]

***

### m\_world

> **m\_world**: [`World`](/api/classes/World)

## Methods

### addBody()

> **addBody**(`body`): `void`

#### Parameters

• **body**: [`Body`](/api/classes/Body)

#### Returns

`void`

***

### addContact()

> **addContact**(`contact`): `void`

#### Parameters

• **contact**: [`Contact`](/api/classes/Contact)

#### Returns

`void`

***

### addJoint()

> **addJoint**(`joint`): `void`

#### Parameters

• **joint**: [`Joint`](/api/classes/Joint)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### solveIsland()

> **solveIsland**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`

***

### solveIslandTOI()

> **solveIslandTOI**(`subStep`, `toiA`, `toiB`): `void`

#### Parameters

• **subStep**: [`TimeStep`](/api/classes/TimeStep)

• **toiA**: [`Body`](/api/classes/Body)

• **toiB**: [`Body`](/api/classes/Body)

#### Returns

`void`

***

### solveWorld()

> **solveWorld**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`

***

### solveWorldTOI()

> **solveWorldTOI**(`step`): `void`

Find TOI contacts and solve them.

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`
