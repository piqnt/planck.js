[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BroadPhase](broadphase.md)

# Class: BroadPhase

The broad-phase wraps and extends a dynamic-tree to keep track of moved
objects and query them on update.
The broad-phase wraps and extends a dynamic-tree to keep track of moved
objects and query them on update.

## Hierarchy

* **BroadPhase**

## Index

### Properties

* [m_callback](broadphase.md#m_callback)
* [m_moveBuffer](broadphase.md#m_movebuffer)
* [m_proxyCount](broadphase.md#m_proxycount)
* [m_queryProxyId](broadphase.md#m_queryproxyid)
* [m_tree](broadphase.md#m_tree)

### Methods

* [bufferMove](broadphase.md#buffermove)
* [createProxy](broadphase.md#createproxy)
* [destroyProxy](broadphase.md#destroyproxy)
* [getFatAABB](broadphase.md#getfataabb)
* [getProxyCount](broadphase.md#getproxycount)
* [getTreeBalance](broadphase.md#gettreebalance)
* [getTreeHeight](broadphase.md#gettreeheight)
* [getTreeQuality](broadphase.md#gettreequality)
* [getUserData](broadphase.md#getuserdata)
* [moveProxy](broadphase.md#moveproxy)
* [query](broadphase.md#query)
* [queryCallback](broadphase.md#querycallback)
* [rayCast](broadphase.md#raycast)
* [shiftOrigin](broadphase.md#shiftorigin)
* [testOverlap](broadphase.md#testoverlap)
* [touchProxy](broadphase.md#touchproxy)
* [unbufferMove](broadphase.md#unbuffermove)
* [updatePairs](broadphase.md#updatepairs)

## Properties

###  m_callback

• **m_callback**: *function*

*Defined in [dist/planck.d.ts:624](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L624)*

*Defined in [src/collision/BroadPhase.ts:45](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L45)*

#### Type declaration:

▸ (`userDataA`: any, `userDataB`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`userDataA` | any |
`userDataB` | any |

___

###  m_moveBuffer

• **m_moveBuffer**: *any[]* = []

*Defined in [dist/planck.d.ts:623](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L623)*

*Defined in [src/collision/BroadPhase.ts:43](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L43)*

___

###  m_proxyCount

• **m_proxyCount**: *number* = 0

*Defined in [dist/planck.d.ts:622](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L622)*

*Defined in [src/collision/BroadPhase.ts:42](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L42)*

___

###  m_queryProxyId

• **m_queryProxyId**: *number*

*Defined in [dist/planck.d.ts:625](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L625)*

*Defined in [src/collision/BroadPhase.ts:46](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L46)*

___

###  m_tree

• **m_tree**: *DynamicTree‹FixtureProxy‹››* = new DynamicTree<FixtureProxy>()

*Defined in [dist/planck.d.ts:621](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L621)*

*Defined in [src/collision/BroadPhase.ts:41](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L41)*

## Methods

###  bufferMove

▸ **bufferMove**(`proxyId`: number): *void*

*Defined in [dist/planck.d.ts:696](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L696)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABB](aabb.md), `userData`: [FixtureProxy](fixtureproxy.md)): *number*

*Defined in [dist/planck.d.ts:681](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L681)*

Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
is called.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`userData` | [FixtureProxy](fixtureproxy.md) |

**Returns:** *number*

___

###  destroyProxy

▸ **destroyProxy**(`proxyId`: number): *void*

*Defined in [dist/planck.d.ts:685](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L685)*

Destroy a proxy. It is up to the client to remove any pairs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  getFatAABB

▸ **getFatAABB**(`proxyId`: any): *[AABB](aabb.md)*

*Defined in [dist/planck.d.ts:637](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L637)*

Get the fat AABB for a proxy.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | any |

**Returns:** *[AABB](aabb.md)*

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [dist/planck.d.ts:641](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L641)*

Get the number of proxies.

**Returns:** *number*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [dist/planck.d.ts:649](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L649)*

Get the balance (integer) of the embedded tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [dist/planck.d.ts:645](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L645)*

Get the height of the embedded tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [dist/planck.d.ts:653](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L653)*

Get the quality metric of the embedded tree.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`proxyId`: any): *[FixtureProxy](fixtureproxy.md)*

*Defined in [dist/planck.d.ts:629](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L629)*

Get user data from a proxy. Returns null if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | any |

**Returns:** *[FixtureProxy](fixtureproxy.md)*

___

###  moveProxy

▸ **moveProxy**(`proxyId`: number, `aabb`: [AABB](aabb.md), `displacement`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:690](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L690)*

Call moveProxy as many times as you like, then when you are done call
UpdatePairs to finalized the proxy pairs (for your time step).

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |
`aabb` | [AABB](aabb.md) |
`displacement` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  query

▸ **query**(`aabb`: any, `queryCallback`: any): *void*

*Defined in [src/collision/BroadPhase.ts:103](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L103)*

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.
Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | any |
`queryCallback` | any |

**Returns:** *void*

___

###  queryCallback

▸ **queryCallback**(`proxyId`: number): *boolean*

*Defined in [src/collision/BroadPhase.ts:210](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/BroadPhase.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`input`: any, `rayCastCallback`: any): *void*

*Defined in [dist/planck.d.ts:669](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L669)*

Ray-cast against the proxies in the tree. This relies on the callback to
perform a exact ray-cast in the case were the proxy contains a shape. The
callback also performs the any collision filtering. This has performance
roughly equal to k * log(n), where k is the number of collisions and n is the
number of proxies in the tree.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | any | The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`. |
`rayCastCallback` | any | A function that is called for each proxy that is hit by the ray.  |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:676](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L676)*

Shift the world origin. Useful for large worlds. The shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2](vec2.md) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  testOverlap

▸ **testOverlap**(`proxyIdA`: any, `proxyIdB`: any): *boolean*

*Defined in [dist/planck.d.ts:633](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L633)*

Test overlap of fat AABBs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyIdA` | any |
`proxyIdB` | any |

**Returns:** *boolean*

___

###  touchProxy

▸ **touchProxy**(`proxyId`: number): *void*

*Defined in [dist/planck.d.ts:695](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L695)*

Call to trigger a re-processing of it's pairs on the next call to
UpdatePairs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  unbufferMove

▸ **unbufferMove**(`proxyId`: number): *void*

*Defined in [dist/planck.d.ts:697](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L697)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  updatePairs

▸ **updatePairs**(`addPairCallback`: function): *void*

*Defined in [dist/planck.d.ts:701](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L701)*

Update the pairs. This results in pair callbacks. This can only add pairs.

**Parameters:**

▪ **addPairCallback**: *function*

▸ (`userDataA`: [FixtureProxy](fixtureproxy.md), `userDataB`: [FixtureProxy](fixtureproxy.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`userDataA` | [FixtureProxy](fixtureproxy.md) |
`userDataB` | [FixtureProxy](fixtureproxy.md) |

**Returns:** *void*
