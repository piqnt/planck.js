---
showOutline: false
---

# Class: TreeNode ‹**T**›

A node in the dynamic tree. The client does not interact with this directly.

## Type parameters

▪ **T**

## Hierarchy

* **TreeNode**

## Index

### Constructors

* [constructor](/api/classes/treenode#constructor)

### Properties

* [aabb](/api/classes/treenode#aabb)
* [child1](/api/classes/treenode#child1)
* [child2](/api/classes/treenode#child2)
* [height](/api/classes/treenode#height)
* [id](/api/classes/treenode#id)
* [parent](/api/classes/treenode#parent)
* [userData](/api/classes/treenode#userdata)

### Methods

* [isLeaf](/api/classes/treenode#isleaf)

## Constructors

###  constructor

\+ **new TreeNode**(`id?`: number): *[TreeNode](/api/classes/treenode)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *[TreeNode](/api/classes/treenode)*

## Properties

###  aabb

• **aabb**: *[AABB](/api/classes/aabb)* = new AABB()

Enlarged AABB

___

###  child1

• **child1**: *[TreeNode](/api/classes/treenode)‹T›* = null

___

###  child2

• **child2**: *[TreeNode](/api/classes/treenode)‹T›* = null

___

###  height

• **height**: *number* = -1

0: leaf, -1: free node

___

###  id

• **id**: *number*

___

###  parent

• **parent**: *[TreeNode](/api/classes/treenode)‹T›* = null

___

###  userData

• **userData**: *T* = null

## Methods

###  isLeaf

▸ **isLeaf**(): *boolean*

**Returns:** *boolean*
