[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [SimplexCache](simplexcache.md)

# Class: SimplexCache

Used to warm start Distance. Set count to zero on first call.

## Hierarchy

* **SimplexCache**

## Index

### Properties

* [count](simplexcache.md#count)
* [indexA](simplexcache.md#indexa)
* [indexB](simplexcache.md#indexb)
* [metric](simplexcache.md#metric)

### Methods

* [recycle](simplexcache.md#recycle)

## Properties

###  count

• **count**: *number* = 0

*Defined in [collision/Distance.ts:103](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L103)*

___

###  indexA

• **indexA**: *number[]* = []

*Defined in [collision/Distance.ts:100](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L100)*

vertices on shape A

___

###  indexB

• **indexB**: *number[]* = []

*Defined in [collision/Distance.ts:102](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L102)*

vertices on shape B

___

###  metric

• **metric**: *number* = 0

*Defined in [collision/Distance.ts:98](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L98)*

length or area

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Distance.ts:104](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L104)*

**Returns:** *void*
