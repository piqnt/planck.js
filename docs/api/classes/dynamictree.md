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

*Defined in [src/collision/DynamicTree.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L82)*

**Returns:** *[DynamicTree](dynamictree.md)*

## Properties

###  m_lastProxyId

• **m_lastProxyId**: *number*

*Defined in [src/collision/DynamicTree.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L78)*

___

###  m_nodes

• **m_nodes**: *object*

*Defined in [src/collision/DynamicTree.ts:79](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L79)*

#### Type declaration:

* \[ **id**: *number*\]: [TreeNode](treenode.md)‹T›

___

###  m_pool

• **m_pool**: *[Pool](pool.md)‹[TreeNode](treenode.md)‹T››*

*Defined in [src/collision/DynamicTree.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L82)*

___

###  m_root

• **m_root**: *[TreeNode](treenode.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:77](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L77)*

## Methods

###  allocateNode

▸ **allocateNode**(): *[TreeNode](treenode.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:118](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L118)*

**Returns:** *[TreeNode](treenode.md)‹T›*

___

###  balance

▸ **balance**(`iA`: [TreeNode](treenode.md)‹T›): *[TreeNode](treenode.md)‹T›*

*Defined in [src/collision/DynamicTree.ts:395](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L395)*

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

*Defined in [src/collision/DynamicTree.ts:544](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L544)*

Compute the height of a sub-tree.

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *number*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABB](aabb.md), `userData`: T): *number*

*Defined in [src/collision/DynamicTree.ts:143](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L143)*

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

*Defined in [src/collision/DynamicTree.ts:164](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L164)*

Destroy a proxy. This asserts if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  freeNode

▸ **freeNode**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [src/collision/DynamicTree.ts:130](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  getAreaRatio

▸ **getAreaRatio**(): *number*

*Defined in [src/collision/DynamicTree.ts:516](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L516)*

Get the ratio of the sum of the node areas to the root area.

**Returns:** *number*

___

###  getFatAABB

▸ **getFatAABB**(`id`: number): *[AABB](aabb.md)*

*Defined in [src/collision/DynamicTree.ts:112](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L112)*

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

*Defined in [src/collision/DynamicTree.ts:505](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L505)*

Compute the height of the binary tree in O(N) time. Should not be called
often.

**Returns:** *number*

___

###  getMaxBalance

▸ **getMaxBalance**(): *number*

*Defined in [src/collision/DynamicTree.ts:638](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L638)*

Get the maximum balance of an node in the tree. The balance is the difference
in height of the two children of a node.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`id`: number): *T*

*Defined in [src/collision/DynamicTree.ts:101](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L101)*

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

*Defined in [src/collision/DynamicTree.ts:224](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  moveProxy

▸ **moveProxy**(`id`: number, `aabb`: [AABB](aabb.md), `d`: [Vec2](vec2.md)): *boolean*

*Defined in [src/collision/DynamicTree.ts:183](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L183)*

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

▸ **query**(`aabb`: [AABB](aabb.md), `queryCallback`: [DynamicTreeQueryCallback](../globals.md#dynamictreequerycallback)): *void*

*Defined in [src/collision/DynamicTree.ts:749](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L749)*

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`queryCallback` | [DynamicTreeQueryCallback](../globals.md#dynamictreequerycallback) |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](../interfaces/raycastinput.md), `rayCastCallback`: [RayCastCallback](../globals.md#raycastcallback)): *void*

*Defined in [src/collision/DynamicTree.ts:786](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L786)*

Ray-cast against the proxies in the tree. This relies on the callback to
perform a exact ray-cast in the case were the proxy contains a shape. The
callback also performs the any collision filtering. This has performance
roughly equal to k * log(n), where k is the number of collisions and n is the
number of proxies in the tree.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | [RayCastInput](../interfaces/raycastinput.md) | The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`. |
`rayCastCallback` | [RayCastCallback](../globals.md#raycastcallback) | A function that is called for each proxy that is hit by the ray.  |

**Returns:** *void*

___

###  rebuildBottomUp

▸ **rebuildBottomUp**(): *void*

*Defined in [src/collision/DynamicTree.ts:660](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L660)*

Build an optimal tree. Very expensive. For testing.

**Returns:** *void*

___

###  removeLeaf

▸ **removeLeaf**(`leaf`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [src/collision/DynamicTree.ts:344](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [src/collision/DynamicTree.ts:731](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L731)*

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

*Defined in [src/collision/DynamicTree.ts:627](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L627)*

Validate this tree. For testing.

**Returns:** *void*

___

###  validateMetrics

▸ **validateMetrics**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [src/collision/DynamicTree.ts:592](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L592)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*

___

###  validateStructure

▸ **validateStructure**(`node`: [TreeNode](treenode.md)‹T›): *void*

*Defined in [src/collision/DynamicTree.ts:563](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/DynamicTree.ts#L563)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md)‹T› |

**Returns:** *void*
