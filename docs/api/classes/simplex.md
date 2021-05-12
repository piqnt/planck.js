[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Simplex](simplex.md)

# Class: Simplex

## Hierarchy

* **Simplex**

## Index

### Constructors

* [constructor](simplex.md#constructor)

### Properties

* [m_count](simplex.md#m_count)
* [m_v](simplex.md#m_v)
* [m_v1](simplex.md#m_v1)
* [m_v2](simplex.md#m_v2)
* [m_v3](simplex.md#m_v3)

### Methods

* [getClosestPoint](simplex.md#getclosestpoint)
* [getMetric](simplex.md#getmetric)
* [getSearchDirection](simplex.md#getsearchdirection)
* [getWitnessPoints](simplex.md#getwitnesspoints)
* [readCache](simplex.md#readcache)
* [solve](simplex.md#solve)
* [solve2](simplex.md#solve2)
* [solve3](simplex.md#solve3)
* [writeCache](simplex.md#writecache)

## Constructors

###  constructor

\+ **new Simplex**(): *[Simplex](simplex.md)*

*Defined in [src/collision/Distance.ts:325](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L325)*

**Returns:** *[Simplex](simplex.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [src/collision/Distance.ts:325](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L325)*

___

###  m_v

• **m_v**: *[SimplexVertex](simplexvertex.md)[]*

*Defined in [src/collision/Distance.ts:324](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L324)*

___

###  m_v1

• **m_v1**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:321](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L321)*

___

###  m_v2

• **m_v2**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:322](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L322)*

___

###  m_v3

• **m_v3**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:323](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L323)*

## Methods

###  getClosestPoint

▸ **getClosestPoint**(): *[Vec2](vec2.md)*

*Defined in [src/collision/Distance.ts:436](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L436)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMetric

▸ **getMetric**(): *number*

*Defined in [src/collision/Distance.ts:485](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L485)*

**Returns:** *number*

___

###  getSearchDirection

▸ **getSearchDirection**(): *[Vec2](vec2.md)*

*Defined in [src/collision/Distance.ts:413](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L413)*

**Returns:** *[Vec2](vec2.md)*

___

###  getWitnessPoints

▸ **getWitnessPoints**(`pA`: [Vec2](vec2.md), `pB`: [Vec2](vec2.md)): *void*

*Defined in [src/collision/Distance.ts:457](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L457)*

**Parameters:**

Name | Type |
------ | ------ |
`pA` | [Vec2](vec2.md) |
`pB` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  readCache

▸ **readCache**(`cache`: [SimplexCache](simplexcache.md), `proxyA`: [DistanceProxy](distanceproxy.md), `transformA`: [Transform](transform.md), `proxyB`: [DistanceProxy](distanceproxy.md), `transformB`: [Transform](transform.md)): *void*

*Defined in [src/collision/Distance.ts:360](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L360)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |
`proxyA` | [DistanceProxy](distanceproxy.md) |
`transformA` | [Transform](transform.md) |
`proxyB` | [DistanceProxy](distanceproxy.md) |
`transformB` | [Transform](transform.md) |

**Returns:** *void*

___

###  solve

▸ **solve**(): *void*

*Defined in [src/collision/Distance.ts:507](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L507)*

**Returns:** *void*

___

###  solve2

▸ **solve2**(): *void*

*Defined in [src/collision/Distance.ts:548](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L548)*

**Returns:** *void*

___

###  solve3

▸ **solve3**(): *void*

*Defined in [src/collision/Distance.ts:584](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L584)*

**Returns:** *void*

___

###  writeCache

▸ **writeCache**(`cache`: [SimplexCache](simplexcache.md)): *void*

*Defined in [src/collision/Distance.ts:404](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L404)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |

**Returns:** *void*
