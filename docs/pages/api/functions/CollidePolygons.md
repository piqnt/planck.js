# Function: CollidePolygons()

> **CollidePolygons**(`manifold`, `polyA`, `xfA`, `polyB`, `xfB`): `void`

Find edge normal of max separation on A - return if separating axis is found<br>
Find edge normal of max separation on B - return if separation axis is found<br>
Choose reference edge as min(minA, minB)<br>
Find incident edge<br>
Clip

The normal points from 1 to 2

## Parameters

• **manifold**: [`Manifold`](../classes/Manifold)

• **polyA**: [`PolygonShape`](../classes/PolygonShape)

• **xfA**: [`TransformValue`](../type-aliases/TransformValue)

• **polyB**: [`PolygonShape`](../classes/PolygonShape)

• **xfB**: [`TransformValue`](../type-aliases/TransformValue)

## Returns

`void`
