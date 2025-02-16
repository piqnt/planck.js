# Class: Sweep

This describes the motion of a body/shape for TOI computation. Shapes are
defined with respect to the body origin, which may not coincide with the
center of mass. However, to support dynamics we must interpolate the center
of mass position.

## Constructors

### new Sweep()

> **new Sweep**(): [`Sweep`](/api/classes/Sweep)

#### Returns

[`Sweep`](/api/classes/Sweep)

## Properties

### a

> **a**: `number` = `0`

World angle

***

### a0

> **a0**: `number` = `0`

***

### alpha0

> **alpha0**: `number` = `0`

Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0.

***

### c

> **c**: [`Vec2`](/api/classes/Vec2)

World center position

***

### c0

> **c0**: [`Vec2`](/api/classes/Vec2)

***

### localCenter

> **localCenter**: [`Vec2`](/api/classes/Vec2)

Local center of mass position

## Methods

### advance()

> **advance**(`alpha`): `void`

Advance the sweep forward, yielding a new initial state.

#### Parameters

• **alpha**: `number`

The new initial time

#### Returns

`void`

***

### forward()

> **forward**(): `void`

#### Returns

`void`

***

### getTransform()

> **getTransform**(`xf`, `beta`): `void`

Get the interpolated transform at a specific time.

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

• **beta**: `number` = `0`

A factor in [0,1], where 0 indicates alpha0

#### Returns

`void`

***

### normalize()

> **normalize**(): `void`

normalize the angles in radians to be between -pi and pi.

#### Returns

`void`

***

### set()

> **set**(`that`): `void`

#### Parameters

• **that**: [`Sweep`](/api/classes/Sweep)

#### Returns

`void`

***

### setLocalCenter()

> **setLocalCenter**(`localCenter`, `xf`): `void`

#### Parameters

• **localCenter**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

`void`

***

### setTransform()

> **setTransform**(`xf`): `void`

#### Parameters

• **xf**: [`TransformValue`](/api/type-aliases/TransformValue)

#### Returns

`void`
