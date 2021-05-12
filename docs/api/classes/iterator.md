[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Iterator](iterator.md)

# Class: Iterator ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **Iterator**

## Index

### Properties

* [parents](iterator.md#parents)
* [states](iterator.md#states)

### Methods

* [close](iterator.md#close)
* [next](iterator.md#next)
* [preorder](iterator.md#preorder)

## Properties

###  parents

• **parents**: *Array‹[TreeNode](treenode.md)‹T››* = []

*Defined in [src/collision/DynamicTree.ts:889](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L889)*

___

###  states

• **states**: *number[]* = []

*Defined in [src/collision/DynamicTree.ts:890](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L890)*

## Methods

###  close

▸ **close**(): *void*

*Defined in [src/collision/DynamicTree.ts:926](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L926)*

**Returns:** *void*

___

###  next

▸ **next**(): *[TreeNode](treenode.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:898](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L898)*

**Returns:** *[TreeNode](treenode.md)‹T›*

___

###  preorder

▸ **preorder**(`root`: [TreeNode](treenode.md)‹T›): *[Iterator](iterator.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:891](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L891)*

**Parameters:**

Name | Type |
------ | ------ |
`root` | [TreeNode](treenode.md)‹T› |

**Returns:** *[Iterator](iterator.md)‹T›*
