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

*Defined in [src/collision/DynamicTree.ts:886](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/DynamicTree.ts#L886)*

___

###  states

• **states**: *number[]* = []

*Defined in [src/collision/DynamicTree.ts:887](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/DynamicTree.ts#L887)*

## Methods

###  close

▸ **close**(): *void*

*Defined in [src/collision/DynamicTree.ts:923](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/DynamicTree.ts#L923)*

**Returns:** *void*

___

###  next

▸ **next**(): *[TreeNode](treenode.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:895](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/DynamicTree.ts#L895)*

**Returns:** *[TreeNode](treenode.md)‹T›*

___

###  preorder

▸ **preorder**(`root`: any): *this*

*Defined in [src/collision/DynamicTree.ts:888](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/DynamicTree.ts#L888)*

**Parameters:**

Name | Type |
------ | ------ |
`root` | any |

**Returns:** *this*
