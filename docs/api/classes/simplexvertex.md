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

barycentric coordinate for closest point

___

###  indexA

• **indexA**: *number* = 0

wA index

___

###  indexB

• **indexB**: *number* = 0

wB index

___

###  w

• **w**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

wB - wA;

___

###  wA

• **wA**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

support point in proxyA

___

###  wB

• **wB**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

support point in proxyB

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`v`: [SimplexVertex](simplexvertex.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [SimplexVertex](simplexvertex.md) |

**Returns:** *void*
