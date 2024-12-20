# Class: Manifold

A manifold for two touching convex shapes. Manifolds are created in `evaluate`
method of Contact subclasses.

Supported manifold types are e_faceA or e_faceB for clip point versus plane
with radius and e_circles point versus point with radius.

We store contacts in this way so that position correction can account for
movement, which is critical for continuous physics. All contact scenarios
must be expressed in one of these types. This structure is stored across time
steps, so we keep it small.

## Constructors

### new Manifold()

> **new Manifold**(): [`Manifold`](/api/classes/Manifold)

#### Returns

[`Manifold`](/api/classes/Manifold)

## Properties

### localNormal

> **localNormal**: [`Vec2Value`](/api/interfaces/Vec2Value)

Usage depends on manifold type:
- circles: not used
- faceA: the normal on polygonA
- faceB: the normal on polygonB

***

### localPoint

> **localPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

Usage depends on manifold type:
- circles: the local center of circleA
- faceA: the center of faceA
- faceB: the center of faceB

***

### pointCount

> **pointCount**: `number` = `0`

The number of manifold points

***

### points

> **points**: [`ManifoldPoint`](/api/classes/ManifoldPoint)[]

The points of contact

***

### type

> **type**: [`ManifoldType`](/api/enumerations/ManifoldType)

***

### clipSegmentToLine()

> `static` **clipSegmentToLine**: (`vOut`, `vIn`, `normal`, `offset`, `vertexIndexA`) => `number`

Clipping for contact manifolds. Sutherland-Hodgman clipping.

#### Parameters

• **vOut**: [`ClipVertex`](/api/classes/ClipVertex)[]

• **vIn**: [`ClipVertex`](/api/classes/ClipVertex)[]

• **normal**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **offset**: `number`

• **vertexIndexA**: `number`

#### Returns

`number`

***

### ClipVertex

> `static` **ClipVertex**: *typeof* [`ClipVertex`](/api/classes/ClipVertex)

***

### getPointStates()

> `static` **getPointStates**: (`state1`, `state2`, `manifold1`, `manifold2`) => `void`

Compute the point states given two manifolds. The states pertain to the
transition from manifold1 to manifold2. So state1 is either persist or remove
while state2 is either add or persist.

#### Parameters

• **state1**: [`PointState`](/api/enumerations/PointState)[]

• **state2**: [`PointState`](/api/enumerations/PointState)[]

• **manifold1**: [`Manifold`](/api/classes/Manifold)

• **manifold2**: [`Manifold`](/api/classes/Manifold)

#### Returns

`void`

***

### PointState

> `static` **PointState**: *typeof* [`PointState`](/api/enumerations/PointState)

## Methods

### getWorldManifold()

> **getWorldManifold**(`wm`, `xfA`, `radiusA`, `xfB`, `radiusB`): [`WorldManifold`](/api/classes/WorldManifold)

Evaluate the manifold with supplied transforms. This assumes modest motion
from the original state. This does not change the point count, impulses, etc.
The radii must come from the shapes that generated the manifold.

#### Parameters

• **wm**: [`WorldManifold`](/api/classes/WorldManifold)

• **xfA**: [`TransformValue`](/api/type-aliases/TransformValue)

• **radiusA**: `number`

• **xfB**: [`TransformValue`](/api/type-aliases/TransformValue)

• **radiusB**: `number`

#### Returns

[`WorldManifold`](/api/classes/WorldManifold)

***

### recycle()

> **recycle**(): `void`

#### Returns

`void`

***

### set()

> **set**(`that`): `void`

#### Parameters

• **that**: [`Manifold`](/api/classes/Manifold)

#### Returns

`void`
