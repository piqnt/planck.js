[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [TreeNode](treenode.md)

# Class: TreeNode ‹**T**›

A node in the dynamic tree. The client does not interact with this directly.

## Type parameters

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

\+ **new TreeNode**(`id?`: number): *[TreeNode](treenode.md)*

*Defined in [src/collision/DynamicTree.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *[TreeNode](treenode.md)*

## Properties

###  aabb

• **aabb**: *[AABB](aabb.md)* = new AABB()

*Defined in [src/collision/DynamicTree.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L44)*

Enlarged AABB

___

###  child1

• **child1**: *[TreeNode](treenode.md)‹T›* = null

*Defined in [src/collision/DynamicTree.ts:47](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L47)*

___

###  child2

• **child2**: *[TreeNode](treenode.md)‹T›* = null

*Defined in [src/collision/DynamicTree.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L48)*

___

###  height

• **height**: *number* = -1

*Defined in [src/collision/DynamicTree.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L50)*

0: leaf, -1: free node

___

###  id

• **id**: *number*

*Defined in [src/collision/DynamicTree.ts:42](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L42)*

___

###  parent

• **parent**: *[TreeNode](treenode.md)‹T›* = null

*Defined in [src/collision/DynamicTree.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L46)*

___

###  userData

• **userData**: *T* = null

*Defined in [src/collision/DynamicTree.ts:45](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L45)*

## Methods

###  isLeaf

▸ **isLeaf**(): *boolean*

*Defined in [src/collision/DynamicTree.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L60)*

**Returns:** *boolean*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/collision/DynamicTree.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L56)*

**Returns:** *string*
