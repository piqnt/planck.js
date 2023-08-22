[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceOutput](distanceoutput.md)

# Class: DistanceOutput

Output for Distance.

## Hierarchy

* **DistanceOutput**

## Index

### Properties

* [distance](distanceoutput.md#distance)
* [iterations](distanceoutput.md#iterations)
* [pointA](distanceoutput.md#pointa)
* [pointB](distanceoutput.md#pointb)

### Methods

* [recycle](distanceoutput.md#recycle)

## Properties

###  distance

• **distance**: *number* = 0

*Defined in [collision/Distance.ts:82](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L82)*

___

###  iterations

• **iterations**: *number* = 0

*Defined in [collision/Distance.ts:84](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L84)*

iterations number of GJK iterations used

___

###  pointA

• **pointA**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Distance.ts:79](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L79)*

closest point on shapeA

___

###  pointB

• **pointB**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Distance.ts:81](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L81)*

closest point on shapeB

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Distance.ts:85](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L85)*

**Returns:** *void*
