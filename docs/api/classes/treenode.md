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

## Constructors

###  constructor

\+ **new TreeNode**(`id?`: number): *[TreeNode](treenode.md)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *[TreeNode](treenode.md)*

## Properties

###  aabb

• **aabb**: *[AABB](aabb.md)* = new AABB()

Enlarged AABB

___

###  child1

• **child1**: *[TreeNode](treenode.md)‹T›* = null

___

###  child2

• **child2**: *[TreeNode](treenode.md)‹T›* = null

___

###  height

• **height**: *number* = -1

0: leaf, -1: free node

___

###  id

• **id**: *number*

___

###  parent

• **parent**: *[TreeNode](treenode.md)‹T›* = null

___

###  userData

• **userData**: *T* = null

## Methods

###  isLeaf

▸ **isLeaf**(): *boolean*

**Returns:** *boolean*
