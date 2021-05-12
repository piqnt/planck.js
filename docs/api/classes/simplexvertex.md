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

* [set](simplexvertex.md#set)

## Properties

###  a

• **a**: *number*

*Defined in [src/collision/Distance.ts:308](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L308)*

barycentric coordinate for closest point

___

###  indexA

• **indexA**: *number*

*Defined in [src/collision/Distance.ts:298](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L298)*

wA index

___

###  indexB

• **indexB**: *number*

*Defined in [src/collision/Distance.ts:303](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L303)*

wB index

___

###  w

• **w**: *[Vec2](vec2.md)* = Vec2.zero()

*Defined in [src/collision/Distance.ts:306](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L306)*

wB - wA;

___

###  wA

• **wA**: *[Vec2](vec2.md)* = Vec2.zero()

*Defined in [src/collision/Distance.ts:296](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L296)*

support point in proxyA

___

###  wB

• **wB**: *[Vec2](vec2.md)* = Vec2.zero()

*Defined in [src/collision/Distance.ts:301](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L301)*

support point in proxyB

## Methods

###  set

▸ **set**(`v`: [SimplexVertex](simplexvertex.md)): *void*

*Defined in [src/collision/Distance.ts:310](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L310)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [SimplexVertex](simplexvertex.md) |

**Returns:** *void*
