[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BroadPhase](broadphase.md)

# Class: BroadPhase

The broad-phase wraps and extends a dynamic-tree to keep track of moved
objects and query them on update.

## Hierarchy

* **BroadPhase**

## Index

### Properties

* [m_callback](broadphase.md#m_callback)
* [m_moveBuffer](broadphase.md#m_movebuffer)
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

#### Type declaration:

▸ (`userDataA`: any, `userDataB`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`userDataA` | any |
`userDataB` | any |

___

###  m_moveBuffer

• **m_moveBuffer**: *number[]* = []

___

###  m_queryProxyId

• **m_queryProxyId**: *number*

___

###  m_tree

• **m_tree**: *[DynamicTree](dynamictree.md)‹[FixtureProxy](fixtureproxy.md)›* = new DynamicTree<FixtureProxy>()

## Methods

###  bufferMove

▸ **bufferMove**(`proxyId`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `userData`: [FixtureProxy](fixtureproxy.md)): *number*

Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
is called.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) |
`userData` | [FixtureProxy](fixtureproxy.md) |

**Returns:** *number*

___

###  destroyProxy

▸ **destroyProxy**(`proxyId`: number): *void*

Destroy a proxy. It is up to the client to remove any pairs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  getFatAABB

▸ **getFatAABB**(`proxyId`: number): *[AABB](aabb.md)*

Get the fat AABB for a proxy.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getProxyCount

▸ **getProxyCount**(): *number*

Get the number of proxies.

**Returns:** *number*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

Get the balance (integer) of the embedded tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

Get the height of the embedded tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

Get the quality metric of the embedded tree.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`proxyId`: number): *[FixtureProxy](fixtureproxy.md)*

Get user data from a proxy. Returns null if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[FixtureProxy](fixtureproxy.md)*

___

###  moveProxy

▸ **moveProxy**(`proxyId`: number, `aabb`: [AABB](aabb.md), `displacement`: [Vec2Value](../interfaces/vec2value.md)): *void*

Call moveProxy as many times as you like, then when you are done call
UpdatePairs to finalized the proxy pairs (for your time step).

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |
`aabb` | [AABB](aabb.md) |
`displacement` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  query

▸ **query**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `queryCallback`: [DynamicTreeQueryCallback](../globals.md#dynamictreequerycallback)): *void*

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) |
`queryCallback` | [DynamicTreeQueryCallback](../globals.md#dynamictreequerycallback) |

**Returns:** *void*

___

###  queryCallback

▸ **queryCallback**(`proxyId`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](../interfaces/raycastinput.md), `rayCastCallback`: [RayCastCallback](../globals.md#raycastcallback)): *void*

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

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](../interfaces/vec2value.md)): *void*

Shift the world origin. Useful for large worlds. The shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2Value](../interfaces/vec2value.md) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  testOverlap

▸ **testOverlap**(`proxyIdA`: number, `proxyIdB`: number): *boolean*

Test overlap of fat AABBs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyIdA` | number |
`proxyIdB` | number |

**Returns:** *boolean*

___

###  touchProxy

▸ **touchProxy**(`proxyId`: number): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  updatePairs

▸ **updatePairs**(`addPairCallback`: function): *void*

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
