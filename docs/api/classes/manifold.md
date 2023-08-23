[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Manifold](manifold.md)

# Class: Manifold

A manifold for two touching convex shapes. Manifolds are created in `evaluate`
method of Contact subclasses.

Supported manifold types are e_faceA or e_faceB for clip point versus plane
with radius and e_circles point versus point with radius.

We store contacts in this way so that position correction can account for
movement, which is critical for continuous physics. All contact scenarios
must be expressed in one of these types. This structure is stored across time
steps, so we keep it small.

## Hierarchy

* **Manifold**

## Index

### Properties

* [localNormal](manifold.md#localnormal)
* [localPoint](manifold.md#localpoint)
* [pointCount](manifold.md#pointcount)
* [points](manifold.md#points)
* [type](manifold.md#type)
* [ClipVertex](manifold.md#static-clipvertex)
* [PointState](manifold.md#static-pointstate)
* [clipSegmentToLine](manifold.md#static-clipsegmenttoline)
* [getPointStates](manifold.md#static-getpointstates)

### Methods

* [getWorldManifold](manifold.md#getworldmanifold)
* [recycle](manifold.md#recycle)
* [set](manifold.md#set)

## Properties

###  localNormal

• **localNormal**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Manifold.ts:107](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L107)*

Usage depends on manifold type:
- circles: not used
- faceA: the normal on polygonA
- faceB: the normal on polygonB

___

###  localPoint

• **localPoint**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Manifold.ts:115](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L115)*

Usage depends on manifold type:
- circles: the local center of circleA
- faceA: the center of faceA
- faceB: the center of faceB

___

###  pointCount

• **pointCount**: *number* = 0

*Defined in [collision/Manifold.ts:121](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L121)*

The number of manifold points

___

###  points

• **points**: *[ManifoldPoint](manifoldpoint.md)[]* = [ new ManifoldPoint(), new ManifoldPoint() ]

*Defined in [collision/Manifold.ts:118](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L118)*

The points of contact

___

###  type

• **type**: *[ManifoldType](../enums/manifoldtype.md)*

*Defined in [collision/Manifold.ts:99](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L99)*

___

### `Static` ClipVertex

▪ **ClipVertex**: *[ClipVertex](clipvertex.md)* = ClipVertex

*Defined in [collision/Manifold.ts:215](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L215)*

___

### `Static` PointState

▪ **PointState**: *[PointState](../enums/pointstate.md)* = PointState

*Defined in [collision/Manifold.ts:217](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L217)*

___

### `Static` clipSegmentToLine

▪ **clipSegmentToLine**: *[clipSegmentToLine](../globals.md#clipsegmenttoline)* = clipSegmentToLine

*Defined in [collision/Manifold.ts:214](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L214)*

___

### `Static` getPointStates

▪ **getPointStates**: *[getPointStates](../globals.md#getpointstates)* = getPointStates

*Defined in [collision/Manifold.ts:216](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L216)*

## Methods

###  getWorldManifold

▸ **getWorldManifold**(`wm`: [WorldManifold](worldmanifold.md) | null, `xfA`: [TransformValue](../globals.md#transformvalue), `radiusA`: number, `xfB`: [TransformValue](../globals.md#transformvalue), `radiusB`: number): *[WorldManifold](worldmanifold.md)*

*Defined in [collision/Manifold.ts:146](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L146)*

Evaluate the manifold with supplied transforms. This assumes modest motion
from the original state. This does not change the point count, impulses, etc.
The radii must come from the shapes that generated the manifold.

**Parameters:**

Name | Type |
------ | ------ |
`wm` | [WorldManifold](worldmanifold.md) &#124; null |
`xfA` | [TransformValue](../globals.md#transformvalue) |
`radiusA` | number |
`xfB` | [TransformValue](../globals.md#transformvalue) |
`radiusB` | number |

**Returns:** *[WorldManifold](worldmanifold.md)*

___

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Manifold.ts:132](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L132)*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [Manifold](manifold.md)): *void*

*Defined in [collision/Manifold.ts:123](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Manifold.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Manifold](manifold.md) |

**Returns:** *void*
