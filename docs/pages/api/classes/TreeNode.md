# Class: TreeNode\<T\>

A node in the dynamic tree. The client does not interact with this directly.

## Type Parameters

• **T**

## Constructors

### new TreeNode()

> **new TreeNode**\<`T`\>(`id`?): [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Parameters

• **id?**: `number`

#### Returns

[`TreeNode`](/api/classes/TreeNode)\<`T`\>

## Properties

### aabb

> **aabb**: [`AABB`](/api/classes/AABB)

Enlarged AABB

***

### child1

> **child1**: [`TreeNode`](/api/classes/TreeNode)\<`T`\> = `null`

***

### child2

> **child2**: [`TreeNode`](/api/classes/TreeNode)\<`T`\> = `null`

***

### height

> **height**: `number` = `-1`

0: leaf, -1: free node

***

### id

> **id**: `number`

***

### parent

> **parent**: [`TreeNode`](/api/classes/TreeNode)\<`T`\> = `null`

***

### userData

> **userData**: `T` = `null`

## Methods

### isLeaf()

> **isLeaf**(): `boolean`

#### Returns

`boolean`
