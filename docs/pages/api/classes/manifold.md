---
showOutline: false
---

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

* [localNormal](/api/classes/manifold#localnormal)
* [localPoint](/api/classes/manifold#localpoint)
* [pointCount](/api/classes/manifold#pointcount)
* [points](/api/classes/manifold#points)
* [type](/api/classes/manifold#type)
* [ClipVertex](/api/classes/manifold#static-clipvertex)
* [PointState](/api/classes/manifold#static-pointstate)
* [clipSegmentToLine](/api/classes/manifold#static-clipsegmenttoline)
* [getPointStates](/api/classes/manifold#static-getpointstates)

### Methods

* [getWorldManifold](/api/classes/manifold#getworldmanifold)
* [recycle](/api/classes/manifold#recycle)
* [set](/api/classes/manifold#set)

## Properties

###  localNormal

• **localNormal**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

Usage depends on manifold type:
- circles: not used
- faceA: the normal on polygonA
- faceB: the normal on polygonB

___

###  localPoint

• **localPoint**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

Usage depends on manifold type:
- circles: the local center of circleA
- faceA: the center of faceA
- faceB: the center of faceB

___

###  pointCount

• **pointCount**: *number* = 0

The number of manifold points

___

###  points

• **points**: *[ManifoldPoint](/api/classes/manifoldpoint)[]* = [ new ManifoldPoint(), new ManifoldPoint() ]

The points of contact

___

###  type

• **type**: *[ManifoldType](/api/enums/manifoldtype)*

___

### `Static` ClipVertex

▪ **ClipVertex**: *[ClipVertex](/api/classes/clipvertex)* = ClipVertex

___

### `Static` PointState

▪ **PointState**: *[PointState](/api/enums/pointstate)* = PointState

___

### `Static` clipSegmentToLine

▪ **clipSegmentToLine**: *[clipSegmentToLine](/api/globals#clipsegmenttoline)* = clipSegmentToLine

___

### `Static` getPointStates

▪ **getPointStates**: *[getPointStates](/api/globals#getpointstates)* = getPointStates

## Methods

###  getWorldManifold

▸ **getWorldManifold**(`wm`: [WorldManifold](/api/classes/worldmanifold) | null, `xfA`: [TransformValue](/api/globals#transformvalue), `radiusA`: number, `xfB`: [TransformValue](/api/globals#transformvalue), `radiusB`: number): *[WorldManifold](/api/classes/worldmanifold)*

Evaluate the manifold with supplied transforms. This assumes modest motion
from the original state. This does not change the point count, impulses, etc.
The radii must come from the shapes that generated the manifold.

**Parameters:**

Name | Type |
------ | ------ |
`wm` | [WorldManifold](/api/classes/worldmanifold) &#124; null |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`radiusA` | number |
`xfB` | [TransformValue](/api/globals#transformvalue) |
`radiusB` | number |

**Returns:** *[WorldManifold](/api/classes/worldmanifold)*

___

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [Manifold](/api/classes/manifold)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Manifold](/api/classes/manifold) |

**Returns:** *void*
