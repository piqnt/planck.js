[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DynamicTree](dynamictree.md)

# Class: DynamicTree ‹**T**›

A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
dynamic tree arranges data in a binary tree to accelerate queries such as
volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
than the client object. This allows the client object to move by small
amounts without triggering a tree update.

Nodes are pooled and relocatable, so we use node indices rather than
pointers.

## Type parameters

▪ **T**

## Hierarchy

* **DynamicTree**

## Index

### Constructors

* [constructor](dynamictree.md#constructor)

### Properties

* [m_lastProxyId](dynamictree.md#m_lastproxyid)
* [m_nodes](dynamictree.md#m_nodes)
* [m_pool](dynamictree.md#m_pool)
* [m_root](dynamictree.md#m_root)

### Methods

* [allocateNode](dynamictree.md#allocatenode)
* [balance](dynamictree.md#balance)
* [computeHeight](dynamictree.md#computeheight)
* [createProxy](dynamictree.md#createproxy)
* [destroyProxy](dynamictree.md#destroyproxy)
* [freeNode](dynamictree.md#freenode)
* [getAreaRatio](dynamictree.md#getarearatio)
* [getFatAABB](dynamictree.md#getfataabb)
* [getHeight](dynamictree.md#getheight)
* [getMaxBalance](dynamictree.md#getmaxbalance)
* [getUserData](dynamictree.md#getuserdata)
* [insertLeaf](dynamictree.md#insertleaf)
* [moveProxy](dynamictree.md#moveproxy)
* [query](dynamictree.md#query)
* [rayCast](dynamictree.md#raycast)
* [rebuildBottomUp](dynamictree.md#rebuildbottomup)
* [removeLeaf](dynamictree.md#removeleaf)
* [shiftOrigin](dynamictree.md#shiftorigin)
* [validate](dynamictree.md#validate)
* [validateMetrics](dynamictree.md#validatemetrics)
* [validateStructure](dynamictree.md#validatestructure)

## Constructors

###  constructor

\+ **new DynamicTree**(): *[DynamicTree](dynamictree.md)*

*Defined in [collision/DynamicTree.ts:80](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L80)*

**Returns:** *[DynamicTree](dynamictree.md)*

## Properties

###  m_lastProxyId

• **m_lastProxyId**: *number*

*Defined in [collision/DynamicTree.ts:76](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L76)*

___

###  m_nodes

• **m_nodes**: *object*

*Defined in [collision/DynamicTree.ts:77](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L77)*

#### Type declaration:

* \[ **id**: *number*\]: [TreeNode](treenode.md)‹T›

___

###  m_pool

• **m_pool**: *[Pool](pool.md)‹[TreeNode](treenode.md)‹T››*

*Defined in [collision/DynamicTree.ts:80](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L80)*

___

###  m_root

• **m_root**: *[TreeNode](treenode.md)‹T›*

*Defined in [collision/DynamicTree.ts:75](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L75)*

## Methods

###  allocateNode

▸ **allocateNode**(): *[TreeNode](treenode.md)‹T›*

*Defined in [collision/DynamicTree.ts:116](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L116)*

**Returns:** *[TreeNode](treenode.md)‹T›*

___

###  balance

▸ **balance**(`iA`: [TreeNode](treenode.md)‹T›): *[TreeNode](treenode.md)‹T›*

*Defined in [collision/DynamicTree.ts:393](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L393)*

Perform a left or right rotation if node A is imbalanced. Returns the new
root index.

**Parameters:**

Name | Type |
------ | ------ |
`iA` | [TreeNode](treenode.md)‹T› |

**Returns:** *[TreeNode](treenode.md)‹T›*

___

###  computeHeight

▸ **computeHeight**(`id?`: number): *number*

*Defined in [collision/DynamicTree.ts:542](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L542)*

Compute the height of a sub-tree.

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *number*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABB](aabb.md), `userData`: T): *number*

*Defined in [collision/DynamicTree.ts:141](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L141)*

Create a proxy in the tree as a leaf node. We return the index of the node
instead of a pointer so that we can grow the node pool.

Create a proxy. Provide a tight fitting AABB and a userData pointer.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`userData` | T |

**Returns:** *number*

___

###  destroyProxy

▸ **destroyProxy**(`id`: number): *void*

*Defined in [collision/DynamicTree.ts:162](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L162)*

Destroy a proxy. This asserts if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  freeNode

▸ **freeNode**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [collision/DynamicTree.ts:128](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  getAreaRatio

▸ **getAreaRatio**(): *number*

*Defined in [collision/DynamicTree.ts:514](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L514)*

Get the ratio of the sum of the node areas to the root area.

**Returns:** *number*

___

###  getFatAABB

▸ **getFatAABB**(`id`: number): *[AABB](aabb.md)*

*Defined in [collision/DynamicTree.ts:110](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L110)*

Get the fat AABB for a node id.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *[AABB](aabb.md)*

the proxy user data or 0 if the id is invalid.

___

###  getHeight

▸ **getHeight**(): *number*

*Defined in [collision/DynamicTree.ts:503](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L503)*

Compute the height of the binary tree in O(N) time. Should not be called
often.

**Returns:** *number*

___

###  getMaxBalance

▸ **getMaxBalance**(): *number*

*Defined in [collision/DynamicTree.ts:636](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L636)*

Get the maximum balance of an node in the tree. The balance is the difference
in height of the two children of a node.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`id`: number): *T*

*Defined in [collision/DynamicTree.ts:99](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L99)*

Get proxy user data.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *T*

the proxy user data or 0 if the id is invalid.

___

###  insertLeaf

▸ **insertLeaf**(`leaf`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [collision/DynamicTree.ts:222](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L222)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  moveProxy

▸ **moveProxy**(`id`: number, `aabb`: [AABB](aabb.md), `d`: [Vec2](vec2.md)): *boolean*

*Defined in [collision/DynamicTree.ts:181](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L181)*

Move a proxy with a swepted AABB. If the proxy has moved outside of its
fattened AABB, then the proxy is removed from the tree and re-inserted.
Otherwise the function returns immediately.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | - |
`aabb` | [AABB](aabb.md) | - |
`d` | [Vec2](vec2.md) | Displacement  |

**Returns:** *boolean*

true if the proxy was re-inserted.

___

###  query

▸ **query**(`aabb`: [AABB](aabb.md), `queryCallback`: function): *void*

*Defined in [collision/DynamicTree.ts:747](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L747)*

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

**Parameters:**

▪ **aabb**: *[AABB](aabb.md)*

▪ **queryCallback**: *function*

▸ (`nodeId`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`nodeId` | number |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](../interfaces/raycastinput.md), `rayCastCallback`: function): *void*

*Defined in [collision/DynamicTree.ts:784](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L784)*

Ray-cast against the proxies in the tree. This relies on the callback to
perform a exact ray-cast in the case were the proxy contains a shape. The
callback also performs the any collision filtering. This has performance
roughly equal to k * log(n), where k is the number of collisions and n is the
number of proxies in the tree.

**Parameters:**

▪ **input**: *[RayCastInput](../interfaces/raycastinput.md)*

The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.

▪ **rayCastCallback**: *function*

A function that is called for each proxy that is hit by the ray.

▸ (`subInput`: [RayCastInput](../interfaces/raycastinput.md), `id`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`subInput` | [RayCastInput](../interfaces/raycastinput.md) |
`id` | number |

**Returns:** *void*

___

###  rebuildBottomUp

▸ **rebuildBottomUp**(): *void*

*Defined in [collision/DynamicTree.ts:658](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L658)*

Build an optimal tree. Very expensive. For testing.

**Returns:** *void*

___

###  removeLeaf

▸ **removeLeaf**(`leaf`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [collision/DynamicTree.ts:342](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L342)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [collision/DynamicTree.ts:729](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L729)*

Shift the world origin. Useful for large worlds. The shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2](vec2.md) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

*Defined in [collision/DynamicTree.ts:625](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L625)*

Validate this tree. For testing.

**Returns:** *void*

___

###  validateMetrics

▸ **validateMetrics**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [collision/DynamicTree.ts:590](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L590)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  validateStructure

▸ **validateStructure**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [collision/DynamicTree.ts:561](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/DynamicTree.ts#L561)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*
