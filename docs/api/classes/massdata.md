[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MassData](massdata.md)

# Class: MassData

MassData This holds the mass data computed for a shape.

## Hierarchy

* **MassData**

## Index

### Properties

* [I](massdata.md#i)
* [center](massdata.md#center)
* [mass](massdata.md#mass)

## Properties

###  I

• **I**: *number* = 0

*Defined in [src/dynamics/Body.ts:140](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L140)*

The rotational inertia of the shape about the local origin.

___

###  center

• **center**: *[Vec2](vec2.md)‹›* = Vec2.zero()

*Defined in [src/dynamics/Body.ts:138](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L138)*

The position of the shape's centroid relative to the shape's origin.

___

###  mass

• **mass**: *number* = 0

*Defined in [src/dynamics/Body.ts:136](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Body.ts#L136)*

The mass of the shape, usually in kilograms.
