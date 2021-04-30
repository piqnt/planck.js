[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [TreeNode](treenode.md)

# Class: TreeNode ‹**T, T**›

A node in the dynamic tree. The client does not interact with this directly.
A node in the dynamic tree. The client does not interact with this directly.

## Type parameters

▪ **T**

▪ **T**

## Hierarchy

* **TreeNode**

## Index

### Constructors

* [constructor](treenode.md#constructor)

### Properties

* [aabb](treenode.md#aabb)
* [child1](treenode.md#child1)
* [child2](treenode.md#child2)
* [height](treenode.md#height)
* [id](treenode.md#id)
* [parent](treenode.md#parent)
* [userData](treenode.md#userdata)

### Methods

* [isLeaf](treenode.md#isleaf)
* [toString](treenode.md#tostring)

## Constructors

###  constructor

\+ **new TreeNode**(`id?`: any): *[TreeNode](treenode.md)*

*Defined in [dist/planck.d.ts:495](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L495)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | any |

**Returns:** *[TreeNode](treenode.md)*

## Properties

###  aabb

• **aabb**: *AABB* = new AABB()

*Defined in [dist/planck.d.ts:489](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L489)*

*Defined in [src/collision/DynamicTree.ts:42](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L42)*

Enlarged AABB
Enlarged AABB

___

###  child1

• **child1**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:492](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L492)*

*Defined in [src/collision/DynamicTree.ts:45](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L45)*

___

###  child2

• **child2**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:493](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L493)*

*Defined in [src/collision/DynamicTree.ts:46](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L46)*

___

###  height

• **height**: *number* = -1

*Defined in [dist/planck.d.ts:495](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L495)*

*Defined in [src/collision/DynamicTree.ts:48](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L48)*

0: leaf, -1: free node
0: leaf, -1: free node

___

###  id

• **id**: *number*

*Defined in [dist/planck.d.ts:487](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L487)*

*Defined in [src/collision/DynamicTree.ts:40](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L40)*

___

###  parent

• **parent**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:491](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L491)*

*Defined in [src/collision/DynamicTree.ts:44](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L44)*

___

###  userData

• **userData**: *T* = null

*Defined in [dist/planck.d.ts:490](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L490)*

*Defined in [src/collision/DynamicTree.ts:43](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/DynamicTree.ts#L43)*

## Methods

###  isLeaf

▸ **isLeaf**(): *boolean*

*Defined in [dist/planck.d.ts:498](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L498)*

**Returns:** *boolean*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:497](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L497)*

**Returns:** *string*
