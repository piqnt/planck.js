# Class: ManifoldPoint

A manifold point is a contact point belonging to a contact manifold. It holds
details related to the geometry and dynamics of the contact points.

This structure is stored across time steps, so we keep it small.

Note: impulses are used for internal caching and may not provide reliable
contact forces, especially for high speed collisions.

## Constructors

### new ManifoldPoint()

> **new ManifoldPoint**(): [`ManifoldPoint`](/api/classes/ManifoldPoint)

#### Returns

[`ManifoldPoint`](/api/classes/ManifoldPoint)

## Properties

### id

> `readonly` **id**: [`ContactID`](/api/classes/ContactID)

Uniquely identifies a contact point between two shapes to facilitate warm starting

***

### localPoint

> **localPoint**: [`Vec2Value`](/api/interfaces/Vec2Value)

Usage depends on manifold type:
- circles: the local center of circleB
- faceA: the local center of circleB or the clip point of polygonB
- faceB: the clip point of polygonA

***

### normalImpulse

> **normalImpulse**: `number` = `0`

The non-penetration impulse

***

### tangentImpulse

> **tangentImpulse**: `number` = `0`

The friction impulse

## Methods

### recycle()

> **recycle**(): `void`

#### Returns

`void`

***

### set()

> **set**(`that`): `void`

#### Parameters

• **that**: [`ManifoldPoint`](/api/classes/ManifoldPoint)

#### Returns

`void`
