---
showOutline: false
---

# Class: WorldManifold

This is used to compute the current state of a contact manifold.

## Hierarchy

* **WorldManifold**

## Index

### Properties

* [normal](/api/classes/worldmanifold#normal)
* [pointCount](/api/classes/worldmanifold#pointcount)
* [points](/api/classes/worldmanifold#points)
* [separations](/api/classes/worldmanifold#separations)

### Methods

* [recycle](/api/classes/worldmanifold#recycle)

## Properties

###  normal

• **normal**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

World vector pointing from A to B

___

###  pointCount

• **pointCount**: *number* = 0

The number of manifold points

___

###  points

• **points**: *[Vec2Value](/api/interfaces/vec2value)[]* = [matrix.vec2(0, 0), matrix.vec2(0, 0)]

World contact point (point of intersection)

___

###  separations

• **separations**: *number[]* = [0, 0]

A negative value indicates overlap, in meters

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*
