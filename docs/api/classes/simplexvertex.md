[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [SimplexVertex](simplexvertex.md)

# Class: SimplexVertex

## Hierarchy

* **SimplexVertex**

## Index

### Properties

* [a](simplexvertex.md#a)
* [indexA](simplexvertex.md#indexa)
* [indexB](simplexvertex.md#indexb)
* [w](simplexvertex.md#w)
* [wA](simplexvertex.md#wa)
* [wB](simplexvertex.md#wb)

### Methods

* [recycle](simplexvertex.md#recycle)
* [set](simplexvertex.md#set)

## Properties

###  a

• **a**: *number* = 0

*Defined in [src/collision/Distance.ts:327](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L327)*

barycentric coordinate for closest point

___

###  indexA

• **indexA**: *number* = 0

*Defined in [src/collision/Distance.ts:317](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L317)*

wA index

___

###  indexB

• **indexB**: *number* = 0

*Defined in [src/collision/Distance.ts:322](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L322)*

wB index

___

###  w

• **w**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [src/collision/Distance.ts:325](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L325)*

wB - wA;

___

###  wA

• **wA**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [src/collision/Distance.ts:315](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L315)*

support point in proxyA

___

###  wB

• **wB**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [src/collision/Distance.ts:320](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L320)*

support point in proxyB

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [src/collision/Distance.ts:329](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L329)*

**Returns:** *void*

___

###  set

▸ **set**(`v`: [SimplexVertex](simplexvertex.md)): *void*

*Defined in [src/collision/Distance.ts:337](https://github.com/shakiba/planck.js/blob/ae24904/src/collision/Distance.ts#L337)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [SimplexVertex](simplexvertex.md) |

**Returns:** *void*
