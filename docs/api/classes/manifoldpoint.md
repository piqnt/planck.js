[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ManifoldPoint](manifoldpoint.md)

# Class: ManifoldPoint

A manifold point is a contact point belonging to a contact manifold. It holds
details related to the geometry and dynamics of the contact points.

This structure is stored across time steps, so we keep it small.

Note: impulses are used for internal caching and may not provide reliable
contact forces, especially for high speed collisions.

## Hierarchy

* **ManifoldPoint**

## Index

### Properties

* [id](manifoldpoint.md#readonly-id)
* [localPoint](manifoldpoint.md#localpoint)
* [normalImpulse](manifoldpoint.md#normalimpulse)
* [tangentImpulse](manifoldpoint.md#tangentimpulse)

### Methods

* [recycle](manifoldpoint.md#recycle)
* [set](manifoldpoint.md#set)

## Properties

### `Readonly` id

• **id**: *[ContactID](contactid.md)‹›* = new ContactID()

Uniquely identifies a contact point between two shapes to facilitate warm starting

___

###  localPoint

• **localPoint**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

Usage depends on manifold type:
- circles: the local center of circleB
- faceA: the local center of circleB or the clip point of polygonB
- faceB: the clip point of polygonA

___

###  normalImpulse

• **normalImpulse**: *number* = 0

The non-penetration impulse

___

###  tangentImpulse

• **tangentImpulse**: *number* = 0

The friction impulse

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [ManifoldPoint](manifoldpoint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [ManifoldPoint](manifoldpoint.md) |

**Returns:** *void*
