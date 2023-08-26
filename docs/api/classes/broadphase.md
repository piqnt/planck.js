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

*Defined in [src/collision/BroadPhase.ts:44](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L44)*

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

*Defined in [src/collision/BroadPhase.ts:42](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L42)*

___

###  m_queryProxyId

• **m_queryProxyId**: *number*

*Defined in [src/collision/BroadPhase.ts:45](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L45)*

___

###  m_tree

• **m_tree**: *[DynamicTree](dynamictree.md)‹[FixtureProxy](fixtureproxy.md)›* = new DynamicTree<FixtureProxy>()

*Defined in [src/collision/BroadPhase.ts:41](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L41)*

## Methods

###  bufferMove

▸ **bufferMove**(`proxyId`: number): *void*

*Defined in [src/collision/BroadPhase.ts:169](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  createProxy

▸ **createProxy**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `userData`: [FixtureProxy](fixtureproxy.md)): *number*

*Defined in [src/collision/BroadPhase.ts:134](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L134)*

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

*Defined in [src/collision/BroadPhase.ts:144](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L144)*

Destroy a proxy. It is up to the client to remove any pairs.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  getFatAABB

▸ **getFatAABB**(`proxyId`: number): *[AABB](aabb.md)*

*Defined in [src/collision/BroadPhase.ts:66](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L66)*

Get the fat AABB for a proxy.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [src/collision/BroadPhase.ts:73](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L73)*

Get the number of proxies.

**Returns:** *number*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [src/collision/BroadPhase.ts:87](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L87)*

Get the balance (integer) of the embedded tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [src/collision/BroadPhase.ts:80](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L80)*

Get the height of the embedded tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [src/collision/BroadPhase.ts:94](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L94)*

Get the quality metric of the embedded tree.

**Returns:** *number*

___

###  getUserData

▸ **getUserData**(`proxyId`: number): *[FixtureProxy](fixtureproxy.md)*

*Defined in [src/collision/BroadPhase.ts:50](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L50)*

Get user data from a proxy. Returns null if the id is invalid.

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *[FixtureProxy](fixtureproxy.md)*

___

###  moveProxy

▸ **moveProxy**(`proxyId`: number, `aabb`: [AABB](aabb.md), `displacement`: [Vec2Value](../interfaces/vec2value.md)): *void*

*Defined in [src/collision/BroadPhase.ts:153](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L153)*

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

*Defined in [src/collision/BroadPhase.ts:102](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L102)*

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

*Defined in [src/collision/BroadPhase.ts:207](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`input`: [RayCastInput](../interfaces/raycastinput.md), `rayCastCallback`: [RayCastCallback](../globals.md#raycastcallback)): *void*

*Defined in [src/collision/BroadPhase.ts:116](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L116)*

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

*Defined in [src/collision/BroadPhase.ts:126](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L126)*

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

*Defined in [src/collision/BroadPhase.ts:57](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L57)*

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

*Defined in [src/collision/BroadPhase.ts:165](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L165)*

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

*Defined in [src/collision/BroadPhase.ts:173](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyId` | number |

**Returns:** *void*

___

###  updatePairs

▸ **updatePairs**(`addPairCallback`: function): *void*

*Defined in [src/collision/BroadPhase.ts:184](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/BroadPhase.ts#L184)*

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
