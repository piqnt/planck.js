# Class: WorldManifold

This is used to compute the current state of a contact manifold.

## Constructors

### new WorldManifold()

> **new WorldManifold**(): [`WorldManifold`](/api/classes/WorldManifold)

#### Returns

[`WorldManifold`](/api/classes/WorldManifold)

## Properties

### normal

> **normal**: [`Vec2Value`](/api/interfaces/Vec2Value)

World vector pointing from A to B

***

### pointCount

> **pointCount**: `number` = `0`

The number of manifold points

***

### points

> **points**: [`Vec2Value`](/api/interfaces/Vec2Value)[]

World contact point (point of intersection)

***

### separations

> **separations**: `number`[]

A negative value indicates overlap, in meters

## Methods

### recycle()

> **recycle**(): `void`

#### Returns

`void`
