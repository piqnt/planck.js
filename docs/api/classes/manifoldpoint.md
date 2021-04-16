[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ManifoldPoint](manifoldpoint.md)

# Class: ManifoldPoint

A manifold point is a contact point belonging to a contact manifold. It holds
details related to the geometry and dynamics of the contact points.
A manifold point is a contact point belonging to a contact manifold. It holds
details related to the geometry and dynamics of the contact points.

This structure is stored across time steps, so we keep it small.

Note: impulses are used for internal caching and may not provide reliable
contact forces, especially for high speed collisions.

This structure is stored across time steps, so we keep it small.

Note: impulses are used for internal caching and may not provide reliable
contact forces, especially for high speed collisions.

## Hierarchy

* **ManifoldPoint**

## Index

### Properties

* [id](manifoldpoint.md#id)
* [localPoint](manifoldpoint.md#localpoint)
* [normalImpulse](manifoldpoint.md#normalimpulse)
* [tangentImpulse](manifoldpoint.md#tangentimpulse)

## Properties

###  id

• **id**: *ContactID‹›* = new ContactID()

*Defined in [dist/planck.d.ts:1116](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1116)*

*Defined in [src/collision/Manifold.ts:178](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L178)*

Uniquely identifies a contact point between two shapes to facilatate warm starting
Uniquely identifies a contact point between two shapes to facilatate warm starting

___

###  localPoint

• **localPoint**: *Vec2‹›* = Vec2.zero()

*Defined in [dist/planck.d.ts:1104](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1104)*

*Defined in [src/collision/Manifold.ts:166](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L166)*

Usage depends on manifold type.
      e_circles: the local center of circleB,
      e_faceA: the local center of cirlceB or the clip point of polygonB,
      e_faceB: the clip point of polygonA.
Usage depends on manifold type.
      e_circles: the local center of circleB,
      e_faceA: the local center of cirlceB or the clip point of polygonB,
      e_faceB: the clip point of polygonA.

___

###  normalImpulse

• **normalImpulse**: *number* = 0

*Defined in [dist/planck.d.ts:1108](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1108)*

*Defined in [src/collision/Manifold.ts:170](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L170)*

The non-penetration impulse
The non-penetration impulse

___

###  tangentImpulse

• **tangentImpulse**: *number* = 0

*Defined in [dist/planck.d.ts:1112](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1112)*

*Defined in [src/collision/Manifold.ts:174](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L174)*

The friction impulse
The friction impulse
