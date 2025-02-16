# Type Alias: WorldRayCastCallback()

> **WorldRayCastCallback**: (`fixture`, `point`, `normal`, `fraction`) => `number`

Callback function for ray casts, see [World.rayCast](/api/classes/World#raycast).

Called for each fixture found in the query.
The returned value replaces the ray-cast input maxFraction.
You control how the ray cast proceeds by returning a numeric/float value.

- `0` to terminate the ray cast
- `fraction` to clip the ray cast at current point
- `1` don't clip the ray and continue
- `-1` (or anything else) to continue

## Parameters

• **fixture**: [`Fixture`](/api/classes/Fixture)

The fixture hit by the ray

• **point**: [`Vec2`](/api/classes/Vec2)

The point of initial intersection

• **normal**: [`Vec2`](/api/classes/Vec2)

The normal vector at the point of intersection

• **fraction**: `number`

The fraction along the ray at the point of intersection

## Returns

`number`

A number to update the maxFraction
