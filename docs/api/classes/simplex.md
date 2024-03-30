[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Simplex](simplex.md)

# Class: Simplex

## Hierarchy

* **Simplex**

## Index

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
* [recycle](simplex.md#recycle)
* [solve](simplex.md#solve)
* [solve2](simplex.md#solve2)
* [solve3](simplex.md#solve3)
* [writeCache](simplex.md#writecache)

## Properties

###  m_count

• **m_count**: *number*

___

###  m_v

• **m_v**: *[SimplexVertex](simplexvertex.md)‹›[]* = [this.m_v1, this.m_v2, this.m_v3]

___

###  m_v1

• **m_v1**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

___

###  m_v2

• **m_v2**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

___

###  m_v3

• **m_v3**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

## Methods

###  getClosestPoint

▸ **getClosestPoint**(): *[Vec2Value](../interfaces/vec2value.md)*

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getMetric

▸ **getMetric**(): *number*

**Returns:** *number*

___

###  getSearchDirection

▸ **getSearchDirection**(): *[Vec2Value](../interfaces/vec2value.md)*

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getWitnessPoints

▸ **getWitnessPoints**(`pA`: [Vec2Value](../interfaces/vec2value.md), `pB`: [Vec2Value](../interfaces/vec2value.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pA` | [Vec2Value](../interfaces/vec2value.md) |
`pB` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  readCache

▸ **readCache**(`cache`: [SimplexCache](simplexcache.md), `proxyA`: [DistanceProxy](distanceproxy.md), `transformA`: [TransformValue](../globals.md#transformvalue), `proxyB`: [DistanceProxy](distanceproxy.md), `transformB`: [TransformValue](../globals.md#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |
`proxyA` | [DistanceProxy](distanceproxy.md) |
`transformA` | [TransformValue](../globals.md#transformvalue) |
`proxyB` | [DistanceProxy](distanceproxy.md) |
`transformB` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  solve

▸ **solve**(): *void*

**Returns:** *void*

___

###  solve2

▸ **solve2**(): *void*

**Returns:** *void*

___

###  solve3

▸ **solve3**(): *void*

**Returns:** *void*

___

###  writeCache

▸ **writeCache**(`cache`: [SimplexCache](simplexcache.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |

**Returns:** *void*
