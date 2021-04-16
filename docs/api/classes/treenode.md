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

*Defined in [dist/planck.d.ts:506](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L506)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | any |

**Returns:** *[TreeNode](treenode.md)*

## Properties

###  aabb

• **aabb**: *AABB* = new AABB()

*Defined in [dist/planck.d.ts:500](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L500)*

*Defined in [src/collision/DynamicTree.ts:42](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L42)*

Enlarged AABB
Enlarged AABB

___

###  child1

• **child1**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:503](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L503)*

*Defined in [src/collision/DynamicTree.ts:45](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L45)*

___

###  child2

• **child2**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:504](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L504)*

*Defined in [src/collision/DynamicTree.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L46)*

___

###  height

• **height**: *number* = -1

*Defined in [dist/planck.d.ts:506](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L506)*

*Defined in [src/collision/DynamicTree.ts:48](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L48)*

0: leaf, -1: free node
0: leaf, -1: free node

___

###  id

• **id**: *number*

*Defined in [dist/planck.d.ts:498](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L498)*

*Defined in [src/collision/DynamicTree.ts:40](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L40)*

___

###  parent

• **parent**: *TreeNode‹T›* = null

*Defined in [dist/planck.d.ts:502](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L502)*

*Defined in [src/collision/DynamicTree.ts:44](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L44)*

___

###  userData

• **userData**: *T* = null

*Defined in [dist/planck.d.ts:501](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L501)*

*Defined in [src/collision/DynamicTree.ts:43](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/DynamicTree.ts#L43)*

## Methods

###  isLeaf

▸ **isLeaf**(): *boolean*

*Defined in [dist/planck.d.ts:509](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L509)*

**Returns:** *boolean*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:508](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L508)*

**Returns:** *string*
