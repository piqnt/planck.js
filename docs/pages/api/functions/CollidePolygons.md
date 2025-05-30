# Function: CollidePolygons()

> **CollidePolygons**(`manifold`, `polyA`, `xfA`, `polyB`, `xfB`): `void`

Find edge normal of max separation on A - return if separating axis is found
Find edge normal of max separation on B - return if separation axis is found
Choose reference edge as min(minA, minB)
Find incident edge
Clip

The normal points from 1 to 2

## Parameters

• **manifold**: [`Manifold`](/api/classes/Manifold)

• **polyA**: [`PolygonShape`](/api/classes/PolygonShape)

• **xfA**: [`TransformValue`](/api/type-aliases/TransformValue)

• **polyB**: [`PolygonShape`](/api/classes/PolygonShape)

• **xfB**: [`TransformValue`](/api/type-aliases/TransformValue)

## Returns

`void`
