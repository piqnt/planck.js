[API Doc](../README.md) › [Fixture](fixture.md)

# Interface: Fixture

## Hierarchy

* **Fixture**

## Index

### Properties

* [m_body](fixture.md#m_body)
* [m_density](fixture.md#m_density)
* [m_filterCategoryBits](fixture.md#m_filtercategorybits)
* [m_filterGroupIndex](fixture.md#m_filtergroupindex)
* [m_filterMaskBits](fixture.md#m_filtermaskbits)
* [m_friction](fixture.md#m_friction)
* [m_isSensor](fixture.md#m_issensor)
* [m_next](fixture.md#m_next)
* [m_proxies](fixture.md#m_proxies)
* [m_proxyCount](fixture.md#m_proxycount)
* [m_restitution](fixture.md#m_restitution)
* [m_shape](fixture.md#m_shape)
* [m_userData](fixture.md#m_userdata)

### Methods

* [createProxies](fixture.md#createproxies)
* [destroyProxies](fixture.md#destroyproxies)
* [getAABB](fixture.md#getaabb)
* [getBody](fixture.md#getbody)
* [getDensity](fixture.md#getdensity)
* [getFilterCategoryBits](fixture.md#getfiltercategorybits)
* [getFilterGroupIndex](fixture.md#getfiltergroupindex)
* [getFilterMaskBits](fixture.md#getfiltermaskbits)
* [getFriction](fixture.md#getfriction)
* [getMassData](fixture.md#getmassdata)
* [getNext](fixture.md#getnext)
* [getRestitution](fixture.md#getrestitution)
* [getShape](fixture.md#getshape)
* [getType](fixture.md#gettype)
* [getUserData](fixture.md#getuserdata)
* [isSensor](fixture.md#issensor)
* [rayCast](fixture.md#raycast)
* [refilter](fixture.md#refilter)
* [setDensity](fixture.md#setdensity)
* [setFilterData](fixture.md#setfilterdata)
* [setFriction](fixture.md#setfriction)
* [setRestitution](fixture.md#setrestitution)
* [setSensor](fixture.md#setsensor)
* [setUserData](fixture.md#setuserdata)
* [shouldCollide](fixture.md#shouldcollide)
* [synchronize](fixture.md#synchronize)
* [testPoint](fixture.md#testpoint)

## Properties

###  m_body

• **m_body**: *[Body](body.md)*

*Defined in [index.d.ts:82](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L82)*

___

###  m_density

• **m_density**: *number*

*Defined in [index.d.ts:85](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L85)*

___

###  m_filterCategoryBits

• **m_filterCategoryBits**: *number*

*Defined in [index.d.ts:88](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L88)*

___

###  m_filterGroupIndex

• **m_filterGroupIndex**: *number*

*Defined in [index.d.ts:87](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L87)*

___

###  m_filterMaskBits

• **m_filterMaskBits**: *number*

*Defined in [index.d.ts:89](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L89)*

___

###  m_friction

• **m_friction**: *number*

*Defined in [index.d.ts:83](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L83)*

___

###  m_isSensor

• **m_isSensor**: *boolean*

*Defined in [index.d.ts:86](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L86)*

___

###  m_next

• **m_next**: *[Fixture](fixture.md) | null*

*Defined in [index.d.ts:91](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L91)*

___

###  m_proxies

• **m_proxies**: *[FixtureProxy](fixtureproxy.md)[]*

*Defined in [index.d.ts:92](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L92)*

___

###  m_proxyCount

• **m_proxyCount**: *number*

*Defined in [index.d.ts:93](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L93)*

___

###  m_restitution

• **m_restitution**: *number*

*Defined in [index.d.ts:84](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L84)*

___

###  m_shape

• **m_shape**: *[Shape](shape.md)*

*Defined in [index.d.ts:90](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L90)*

___

###  m_userData

• **m_userData**: *unknown*

*Defined in [index.d.ts:94](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L94)*

## Methods

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](../README.md#broadphase), `xf`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:114](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](../README.md#broadphase) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  destroyProxies

▸ **destroyProxies**(`broadPhase`: [BroadPhase](../README.md#broadphase)): *void*

*Defined in [index.d.ts:115](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](../README.md#broadphase) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

*Defined in [index.d.ts:113](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`childIndex` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getBody

▸ **getBody**(): *[Body](body.md)*

*Defined in [index.d.ts:102](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L102)*

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

*Defined in [index.d.ts:104](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L104)*

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

*Defined in [index.d.ts:119](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L119)*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

*Defined in [index.d.ts:118](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L118)*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

*Defined in [index.d.ts:120](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L120)*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [index.d.ts:106](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L106)*

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [index.d.ts:112](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Fixture](fixture.md) | null*

*Defined in [index.d.ts:103](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L103)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [index.d.ts:108](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L108)*

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

*Defined in [index.d.ts:97](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L97)*

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../README.md#shapetype)*

*Defined in [index.d.ts:96](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L96)*

**Returns:** *[ShapeType](../README.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [index.d.ts:100](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L100)*

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

*Defined in [index.d.ts:98](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L98)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../README.md#raycastoutput), `input`: [RayCastInput](../README.md#raycastinput), `childIndex`: number): *boolean*

*Defined in [index.d.ts:111](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../README.md#raycastoutput) |
`input` | [RayCastInput](../README.md#raycastinput) |
`childIndex` | number |

**Returns:** *boolean*

___

###  refilter

▸ **refilter**(): *void*

*Defined in [index.d.ts:121](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L121)*

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

*Defined in [index.d.ts:105](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`density` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

*Defined in [index.d.ts:117](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L117)*

**Parameters:**

▪ **filter**: *object*

Name | Type |
------ | ------ |
`categoryBits` | number |
`groupIndex` | number |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [index.d.ts:107](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

*Defined in [index.d.ts:109](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setSensor

▸ **setSensor**(`sensor`: boolean): *void*

*Defined in [index.d.ts:99](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [index.d.ts:101](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

*Defined in [index.d.ts:122](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Fixture](fixture.md) |

**Returns:** *boolean*

___

###  synchronize

▸ **synchronize**(`broadPhase`: [BroadPhase](../README.md#broadphase), `xf1`: [Transform](transform.md), `xf2`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:116](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](../README.md#broadphase) |
`xf1` | [Transform](transform.md) |
`xf2` | [Transform](transform.md) |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`p`: [Vec2](vec2.md)): *boolean*

*Defined in [index.d.ts:110](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *boolean*
