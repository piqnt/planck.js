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

*Defined in [dynamics/Body.ts:147](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L147)*

The rotational inertia of the shape about the local origin.

___

###  center

• **center**: *[Vec2](vec2.md)‹›* = Vec2.zero()

*Defined in [dynamics/Body.ts:145](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L145)*

The position of the shape's centroid relative to the shape's origin.

___

###  mass

• **mass**: *number* = 0

*Defined in [dynamics/Body.ts:143](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L143)*

The mass of the shape, usually in kilograms.
