# Function: getPointStates()

> **getPointStates**(`state1`, `state2`, `manifold1`, `manifold2`): `void`

Compute the point states given two manifolds. The states pertain to the
transition from manifold1 to manifold2. So state1 is either persist or remove
while state2 is either add or persist.

## Parameters

• **state1**: [`PointState`](/api/enumerations/PointState)[]

• **state2**: [`PointState`](/api/enumerations/PointState)[]

• **manifold1**: [`Manifold`](/api/classes/Manifold)

• **manifold2**: [`Manifold`](/api/classes/Manifold)

## Returns

`void`
