---
showOutline: false
---

# Class: SimplexVertex

## Hierarchy

* **SimplexVertex**

## Index

### Properties

* [a](/api/classes/simplexvertex#a)
* [indexA](/api/classes/simplexvertex#indexa)
* [indexB](/api/classes/simplexvertex#indexb)
* [w](/api/classes/simplexvertex#w)
* [wA](/api/classes/simplexvertex#wa)
* [wB](/api/classes/simplexvertex#wb)

### Methods

* [recycle](/api/classes/simplexvertex#recycle)
* [set](/api/classes/simplexvertex#set)

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

• **w**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

wB - wA;

___

###  wA

• **wA**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

support point in proxyA

___

###  wB

• **wB**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

support point in proxyB

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`v`: [SimplexVertex](/api/classes/simplexvertex)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [SimplexVertex](/api/classes/simplexvertex) |

**Returns:** *void*
