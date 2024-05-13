
# Class: BroadPhase

The broad-phase wraps and extends a dynamic-tree to keep track of moved
objects and query them on update.

## Hierarchy

* **BroadPhase**

## Index

### Properties

* [m_callback](/api/classes/broadphase#m_callback)
* [m_moveBuffer](/api/classes/broadphase#m_movebuffer)
* [m_queryProxyId](/api/classes/broadphase#m_queryproxyid)
* [m_tree](/api/classes/broadphase#m_tree)

### Methods

* [bufferMove](/api/classes/broadphase#buffermove)
* [createProxy](/api/classes/broadphase#createproxy)
* [destroyProxy](/api/classes/broadphase#destroyproxy)
* [getFatAABB](/api/classes/broadphase#getfataabb)
* [getProxyCount](/api/classes/broadphase#getproxycount)
* [getTreeBalance](/api/classes/broadphase#gettreebalance)
* [getTreeHeight](/api/classes/broadphase#gettreeheight)
* [getTreeQuality](/api/classes/broadphase#gettreequality)
* [getUserData](/api/classes/broadphase#getuserdata)
* [moveProxy](/api/classes/broadphase#moveproxy)
* [query](/api/classes/broadphase#query)
* [queryCallback](/api/classes/broadphase#querycallback)
* [rayCast](/api/classes/broadphase#raycast)
* [shiftOrigin](/api/classes/broadphase#shiftorigin)
* [testOverlap](/api/classes/broadphase#testoverlap)
* [touchProxy](/api/classes/broadphase#touchproxy)
* [unbufferMove](/api/classes/broadphase#unbuffermove)
* [updatePairs](/api/classes/broadphase#updatepairs)

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

• **m_tree**: *[DynamicTree](/api/classes/dynamictree)‹[FixtureProxy](/api/classes/fixtureproxy)›* = new DynamicTree<FixtureProxy>()

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

▸ **createProxy**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `userData`: [FixtureProxy](/api/classes/fixtureproxy)): *number*

Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
is called.

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |
`userData` | [FixtureProxy](/api/classes/fixtureproxy) |

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

▸ **getFatAABB**(`proxyId`: number): *[AABB](/api/classes/aabb)*

Get the fat AABB for a proxy.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[AABB](/api/classes/aabb)*

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

▸ **getUserData**(`proxyId`: number): *[FixtureProxy](/api/classes/fixtureproxy)*

Get user data from a proxy. Returns null if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[FixtureProxy](/api/classes/fixtureproxy)*

___

###  moveProxy

▸ **moveProxy**(`proxyId`: number, `aabb`: [AABB](/api/classes/aabb), `displacement`: [Vec2Value](/api/interfaces/vec2value)): *void*

Call moveProxy as many times as you like, then when you are done call
UpdatePairs to finalized the proxy pairs (for your time step).

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |
`aabb` | [AABB](/api/classes/aabb) |
`displacement` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

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

###  queryCallback

▸ **queryCallback**(`proxyId`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *boolean*

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

▸ (`userDataA`: [FixtureProxy](/api/classes/fixtureproxy), `userDataB`: [FixtureProxy](/api/classes/fixtureproxy)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`userDataA` | [FixtureProxy](/api/classes/fixtureproxy) |
`userDataB` | [FixtureProxy](/api/classes/fixtureproxy) |

**Returns:** *void*
