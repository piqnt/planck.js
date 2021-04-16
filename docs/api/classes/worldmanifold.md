[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WorldManifold](worldmanifold.md)

# Class: WorldManifold

This is used to compute the current state of a contact manifold.
This is used to compute the current state of a contact manifold.

## Hierarchy

* **WorldManifold**

## Index

### Properties

* [normal](worldmanifold.md#normal)
* [points](worldmanifold.md#points)
* [separations](worldmanifold.md#separations)

## Properties

###  normal

• **normal**: *Vec2*

*Defined in [dist/planck.d.ts:1158](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1158)*

*Defined in [src/collision/Manifold.ts:235](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L235)*

World vector pointing from A to B
World vector pointing from A to B

___

###  points

• **points**: *Vec2[]* = []

*Defined in [dist/planck.d.ts:1162](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1162)*

*Defined in [src/collision/Manifold.ts:239](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L239)*

World contact point (point of intersection)
World contact point (point of intersection)

___

###  separations

• **separations**: *number[]* = []

*Defined in [dist/planck.d.ts:1166](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1166)*

*Defined in [src/collision/Manifold.ts:243](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Manifold.ts#L243)*

A negative value indicates overlap, in meters
A negative value indicates overlap, in meters
