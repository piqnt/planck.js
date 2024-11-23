# Function: ShapeCast()

> **ShapeCast**(`output`, `input`): `boolean`

Perform a linear shape cast of shape B moving and shape A fixed. Determines
the hit point, normal, and translation fraction.

## Parameters

• **output**: [`ShapeCastOutput`](../classes/ShapeCastOutput)

• **input**: [`ShapeCastInput`](../classes/ShapeCastInput)

## Returns

`boolean`

true if hit, false if there is no hit or an initial overlap