[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WorldManifold](worldmanifold.md)

# Class: WorldManifold

This is used to compute the current state of a contact manifold.

## Hierarchy

* **WorldManifold**

## Index

### Properties

* [normal](worldmanifold.md#normal)
* [pointCount](worldmanifold.md#pointcount)
* [points](worldmanifold.md#points)
* [separations](worldmanifold.md#separations)

### Methods

* [recycle](worldmanifold.md#recycle)

## Properties

###  normal

• **normal**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Manifold.ts:331](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L331)*

World vector pointing from A to B

___

###  pointCount

• **pointCount**: *number* = 0

*Defined in [collision/Manifold.ts:340](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L340)*

The number of manifold points

___

###  points

• **points**: *[Vec2Value](../interfaces/vec2value.md)[]* = [matrix.vec2(0, 0), matrix.vec2(0, 0)]

*Defined in [collision/Manifold.ts:334](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L334)*

World contact point (point of intersection)

___

###  separations

• **separations**: *number[]* = [0, 0]

*Defined in [collision/Manifold.ts:337](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L337)*

A negative value indicates overlap, in meters

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Manifold.ts:342](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L342)*

**Returns:** *void*
