# Class: TimeStep

## Constructors

### new TimeStep()

> **new TimeStep**(): [`TimeStep`](/api/classes/TimeStep)

#### Returns

[`TimeStep`](/api/classes/TimeStep)

## Properties

### blockSolve

> **blockSolve**: `boolean` = `true`

***

### dt

> **dt**: `number` = `0`

time step

***

### dtRatio

> **dtRatio**: `number` = `1`

dt * inv_dt0

***

### inv\_dt

> **inv\_dt**: `number` = `0`

inverse time step (0 if dt == 0)

***

### inv\_dt0

> **inv\_dt0**: `number` = `0.0`

timestep ratio for variable timestep

***

### positionIterations

> **positionIterations**: `number` = `0`

***

### velocityIterations

> **velocityIterations**: `number` = `0`

***

### warmStarting

> **warmStarting**: `boolean` = `false`

## Methods

### reset()

> **reset**(`dt`): `void`

#### Parameters

• **dt**: `number`

#### Returns

`void`
