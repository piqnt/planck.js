---
showOutline: false
---

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

* [constructor](/api/classes/dynamictree#constructor)

### Properties

* [m_lastProxyId](/api/classes/dynamictree#m_lastproxyid)
* [m_nodes](/api/classes/dynamictree#m_nodes)
* [m_root](/api/classes/dynamictree#m_root)

### Methods

* [allocateNode](/api/classes/dynamictree#allocatenode)
* [balance](/api/classes/dynamictree#balance)
* [computeHeight](/api/classes/dynamictree#computeheight)
* [createProxy](/api/classes/dynamictree#createproxy)
* [destroyProxy](/api/classes/dynamictree#destroyproxy)
* [freeNode](/api/classes/dynamictree#freenode)
* [getAreaRatio](/api/classes/dynamictree#getarearatio)
* [getFatAABB](/api/classes/dynamictree#getfataabb)
* [getHeight](/api/classes/dynamictree#getheight)
* [getMaxBalance](/api/classes/dynamictree#getmaxbalance)
* [getUserData](/api/classes/dynamictree#getuserdata)
* [insertLeaf](/api/classes/dynamictree#insertleaf)
* [moveProxy](/api/classes/dynamictree#moveproxy)
* [query](/api/classes/dynamictree#query)
* [rayCast](/api/classes/dynamictree#raycast)
* [rebuildBottomUp](/api/classes/dynamictree#rebuildbottomup)
* [removeLeaf](/api/classes/dynamictree#removeleaf)
* [shiftOrigin](/api/classes/dynamictree#shiftorigin)
* [validate](/api/classes/dynamictree#validate)
* [validateMetrics](/api/classes/dynamictree#validatemetrics)
* [validateStructure](/api/classes/dynamictree#validatestructure)

## Constructors

###  constructor

\+ **new DynamicTree**(): *[DynamicTree](/api/classes/dynamictree)*

**Returns:** *[DynamicTree](/api/classes/dynamictree)*

## Properties

###  m_lastProxyId

• **m_lastProxyId**: *number*

___

###  m_nodes

• **m_nodes**: *object*

#### Type declaration:

* \[ **id**: *number*\]: [TreeNode](/api/classes/treenode)‹T›

___

###  m_root

• **m_root**: *[TreeNode](/api/classes/treenode)‹T›*

## Methods

###  allocateNode

▸ **allocateNode**(): *[TreeNode](/api/classes/treenode)‹T›*

**Returns:** *[TreeNode](/api/classes/treenode)‹T›*

___

###  balance

▸ **balance**(`iA`: [TreeNode](/api/classes/treenode)‹T›): *[TreeNode](/api/classes/treenode)‹T›*

Perform a left or right rotation if node A is imbalanced. Returns the new
root index.

**Parameters:**

Name | Type |
------ | ------ |
`iA` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *[TreeNode](/api/classes/treenode)‹T›*

___

###  computeHeight

▸ **computeHeight**(`id?`: number): *number*

Compute the height of a sub-tree.

**Parameters:**

Name | Type |
------ | ------ |
`id?` | number |

**Returns:** *number*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `userData`: T): *number*

Create a proxy in the tree as a leaf node. We return the index of the node
instead of a pointer so that we can grow the node pool.

Create a proxy. Provide a tight fitting AABB and a userData pointer.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |
`userData` | T |

**Returns:** *number*

___

###  destroyProxy

▸ **destroyProxy**(`id`: number): *void*

Destroy a proxy. This asserts if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  freeNode

▸ **freeNode**(`node`: [TreeNode](/api/classes/treenode)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *void*

___

###  getAreaRatio

▸ **getAreaRatio**(): *number*

Get the ratio of the sum of the node areas to the root area.

**Returns:** *number*

___

###  getFatAABB

▸ **getFatAABB**(`id`: number): *[AABB](/api/classes/aabb)*

Get the fat AABB for a node id.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *[AABB](/api/classes/aabb)*

the proxy user data or 0 if the id is invalid.

___

###  getHeight

▸ **getHeight**(): *number*

Compute the height of the binary tree in O(N) time. Should not be called
often.

**Returns:** *number*

___

###  getMaxBalance

▸ **getMaxBalance**(): *number*

Get the maximum balance of an node in the tree. The balance is the difference
in height of the two children of a node.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`id`: number): *T*

Get proxy user data.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *T*

the proxy user data or 0 if the id is invalid.

___

###  insertLeaf

▸ **insertLeaf**(`leaf`: [TreeNode](/api/classes/treenode)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *void*

___

###  moveProxy

▸ **moveProxy**(`id`: number, `aabb`: [AABBValue](/api/interfaces/aabbvalue), `d`: [Vec2Value](/api/interfaces/vec2value)): *boolean*

Move a proxy with a swepted AABB. If the proxy has moved outside of its
fattened AABB, then the proxy is removed from the tree and re-inserted.
Otherwise the function returns immediately.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | - |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) | - |
`d` | [Vec2Value](/api/interfaces/vec2value) | Displacement  |

**Returns:** *boolean*

true if the proxy was re-inserted.

___

###  query

▸ **query**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `queryCallback`: [DynamicTreeQueryCallback](/api/globals#dynamictreequerycallback)): *void*

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |
`queryCallback` | [DynamicTreeQueryCallback](/api/globals#dynamictreequerycallback) |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](/api/interfaces/raycastinput), `rayCastCallback`: [RayCastCallback](/api/globals#raycastcallback)): *void*

Ray-cast against the proxies in the tree. This relies on the callback to
perform a exact ray-cast in the case were the proxy contains a shape. The
callback also performs the any collision filtering. This has performance
roughly equal to k * log(n), where k is the number of collisions and n is the
number of proxies in the tree.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | [RayCastInput](/api/interfaces/raycastinput) | The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`. |
`rayCastCallback` | [RayCastCallback](/api/globals#raycastcallback) | A function that is called for each proxy that is hit by the ray. If the return value is a positive number it will update the maxFraction of the ray cast input, and if it is zero it will terminate they ray cast.  |

**Returns:** *void*

___

###  rebuildBottomUp

▸ **rebuildBottomUp**(): *void*

Build an optimal tree. Very expensive. For testing.

**Returns:** *void*

___

###  removeLeaf

▸ **removeLeaf**(`leaf`: [TreeNode](/api/classes/treenode)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](/api/interfaces/vec2value)): *void*

Shift the world origin. Useful for large worlds. The shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2Value](/api/interfaces/vec2value) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

Validate this tree. For testing.

**Returns:** *void*

___

###  validateMetrics

▸ **validateMetrics**(`node`: [TreeNode](/api/classes/treenode)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *void*

___

###  validateStructure

▸ **validateStructure**(`node`: [TreeNode](/api/classes/treenode)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](/api/classes/treenode)‹T› |

**Returns:** *void*
