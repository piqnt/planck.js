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

World vector pointing from A to B

___

###  pointCount

• **pointCount**: *number* = 0

The number of manifold points

___

###  points

• **points**: *[Vec2Value](../interfaces/vec2value.md)[]* = [matrix.vec2(0, 0), matrix.vec2(0, 0)]

World contact point (point of intersection)

___

###  separations

• **separations**: *number[]* = [0, 0]

A negative value indicates overlap, in meters

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*
