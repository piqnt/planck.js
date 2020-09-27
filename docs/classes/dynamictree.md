[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DynamicTree](dynamictree.md)

# Class: DynamicTree

## Hierarchy

* **DynamicTree**

## Index

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

## Methods

###  allocateNode

▸ **allocateNode**(): *[TreeNode](treenode.md)*

*Defined in [collision/index.d.ts:74](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L74)*

**Returns:** *[TreeNode](treenode.md)*

___

###  balance

▸ **balance**(`iA`: [TreeNode](treenode.md)): *[TreeNode](treenode.md)*

*Defined in [collision/index.d.ts:81](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`iA` | [TreeNode](treenode.md) |

**Returns:** *[TreeNode](treenode.md)*

___

###  computeHeight

▸ **computeHeight**(`node?`: [TreeNode](treenode.md)): *number*

*Defined in [collision/index.d.ts:84](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`node?` | [TreeNode](treenode.md) |

**Returns:** *number*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABB](aabb.md), `userData`: any): *string*

*Defined in [collision/index.d.ts:76](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`userData` | any |

**Returns:** *string*

___

###  destroyProxy

▸ **destroyProxy**(`id`: number): *void*

*Defined in [collision/index.d.ts:77](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  freeNode

▸ **freeNode**(`node`: [TreeNode](treenode.md)): *void*

*Defined in [collision/index.d.ts:75](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md) |

**Returns:** *void*

___

###  getAreaRatio

▸ **getAreaRatio**(): *number*

*Defined in [collision/index.d.ts:83](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L83)*

**Returns:** *number*

___

###  getFatAABB

▸ **getFatAABB**(`id`: number): *[AABB](aabb.md)*

*Defined in [collision/index.d.ts:73](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getHeight

▸ **getHeight**(): *number*

*Defined in [collision/index.d.ts:82](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L82)*

**Returns:** *number*

___

###  getMaxBalance

▸ **getMaxBalance**(): *number*

*Defined in [collision/index.d.ts:88](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L88)*

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`id`: number): *unknown*

*Defined in [collision/index.d.ts:72](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *unknown*

___

###  insertLeaf

▸ **insertLeaf**(`leaf`: [TreeNode](treenode.md)): *void*

*Defined in [collision/index.d.ts:79](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md) |

**Returns:** *void*

___

###  moveProxy

▸ **moveProxy**(`id`: number, `aabb`: [AABB](aabb.md), `d`: [Vec2](vec2.md)): *boolean*

*Defined in [collision/index.d.ts:78](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`aabb` | [AABB](aabb.md) |
`d` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

###  query

▸ **query**(`aabb`: [AABB](aabb.md), `queryCallback`: function): *void*

*Defined in [collision/index.d.ts:91](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L91)*

**Parameters:**

▪ **aabb**: *[AABB](aabb.md)*

▪ **queryCallback**: *function*

▸ (`id`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](../interfaces/raycastinput.md), `rayCastCallback`: function): *void*

*Defined in [collision/index.d.ts:92](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L92)*

**Parameters:**

▪ **input**: *[RayCastInput](../interfaces/raycastinput.md)*

▪ **rayCastCallback**: *function*

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

*Defined in [collision/index.d.ts:89](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L89)*

**Returns:** *void*

___

###  removeLeaf

▸ **removeLeaf**(`leaf`: [TreeNode](treenode.md)): *void*

*Defined in [collision/index.d.ts:80](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`leaf` | [TreeNode](treenode.md) |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [collision/index.d.ts:90](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

*Defined in [collision/index.d.ts:87](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L87)*

**Returns:** *void*

___

###  validateMetrics

▸ **validateMetrics**(`node`: [TreeNode](treenode.md)): *void*

*Defined in [collision/index.d.ts:86](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md) |

**Returns:** *void*

___

###  validateStructure

▸ **validateStructure**(`node`: [TreeNode](treenode.md)): *void*

*Defined in [collision/index.d.ts:85](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [TreeNode](treenode.md) |

**Returns:** *void*
