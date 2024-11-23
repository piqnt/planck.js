# Class: Solver

Finds and solves islands. An island is a connected subset of the world.

## Constructors

### new Solver()

> **new Solver**(`world`): [`Solver`](Solver)

#### Parameters

• **world**: [`World`](World)

#### Returns

[`Solver`](Solver)

## Properties

### m\_bodies

> **m\_bodies**: [`Body`](Body)[]

***

### m\_contacts

> **m\_contacts**: [`Contact`](Contact)[]

***

### m\_joints

> **m\_joints**: [`Joint`](Joint)[]

***

### m\_stack

> **m\_stack**: [`Body`](Body)[]

***

### m\_world

> **m\_world**: [`World`](World)

## Methods

### addBody()

> **addBody**(`body`): `void`

#### Parameters

• **body**: [`Body`](Body)

#### Returns

`void`

***

### addContact()

> **addContact**(`contact`): `void`

#### Parameters

• **contact**: [`Contact`](Contact)

#### Returns

`void`

***

### addJoint()

> **addJoint**(`joint`): `void`

#### Parameters

• **joint**: [`Joint`](Joint)

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

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### solveIslandTOI()

> **solveIslandTOI**(`subStep`, `toiA`, `toiB`): `void`

#### Parameters

• **subStep**: [`TimeStep`](TimeStep)

• **toiA**: [`Body`](Body)

• **toiB**: [`Body`](Body)

#### Returns

`void`

***

### solveWorld()

> **solveWorld**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### solveWorldTOI()

> **solveWorldTOI**(`step`): `void`

Find TOI contacts and solve them.

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`
