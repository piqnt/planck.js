---
showOutline: false
---

# Class: Simplex

## Hierarchy

* **Simplex**

## Index

### Properties

* [m_count](/api/classes/simplex#m_count)
* [m_v](/api/classes/simplex#m_v)
* [m_v1](/api/classes/simplex#m_v1)
* [m_v2](/api/classes/simplex#m_v2)
* [m_v3](/api/classes/simplex#m_v3)

### Methods

* [getClosestPoint](/api/classes/simplex#getclosestpoint)
* [getMetric](/api/classes/simplex#getmetric)
* [getSearchDirection](/api/classes/simplex#getsearchdirection)
* [getWitnessPoints](/api/classes/simplex#getwitnesspoints)
* [readCache](/api/classes/simplex#readcache)
* [recycle](/api/classes/simplex#recycle)
* [solve](/api/classes/simplex#solve)
* [solve2](/api/classes/simplex#solve2)
* [solve3](/api/classes/simplex#solve3)
* [writeCache](/api/classes/simplex#writecache)

## Properties

###  m_count

• **m_count**: *number*

___

###  m_v

• **m_v**: *[SimplexVertex](/api/classes/simplexvertex)‹›[]* = [this.m_v1, this.m_v2, this.m_v3]

___

###  m_v1

• **m_v1**: *[SimplexVertex](/api/classes/simplexvertex)‹›* = new SimplexVertex()

___

###  m_v2

• **m_v2**: *[SimplexVertex](/api/classes/simplexvertex)‹›* = new SimplexVertex()

___

###  m_v3

• **m_v3**: *[SimplexVertex](/api/classes/simplexvertex)‹›* = new SimplexVertex()

## Methods

###  getClosestPoint

▸ **getClosestPoint**(): *[Vec2Value](/api/interfaces/vec2value)*

**Returns:** *[Vec2Value](/api/interfaces/vec2value)*

___

###  getMetric

▸ **getMetric**(): *number*

**Returns:** *number*

___

###  getSearchDirection

▸ **getSearchDirection**(): *[Vec2Value](/api/interfaces/vec2value)*

**Returns:** *[Vec2Value](/api/interfaces/vec2value)*

___

###  getWitnessPoints

▸ **getWitnessPoints**(`pA`: [Vec2Value](/api/interfaces/vec2value), `pB`: [Vec2Value](/api/interfaces/vec2value)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pA` | [Vec2Value](/api/interfaces/vec2value) |
`pB` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

###  readCache

▸ **readCache**(`cache`: [SimplexCache](/api/classes/simplexcache), `proxyA`: [DistanceProxy](/api/classes/distanceproxy), `transformA`: [TransformValue](/api/globals#transformvalue), `proxyB`: [DistanceProxy](/api/classes/distanceproxy), `transformB`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](/api/classes/simplexcache) |
`proxyA` | [DistanceProxy](/api/classes/distanceproxy) |
`transformA` | [TransformValue](/api/globals#transformvalue) |
`proxyB` | [DistanceProxy](/api/classes/distanceproxy) |
`transformB` | [TransformValue](/api/globals#transformvalue) |

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

▸ **writeCache**(`cache`: [SimplexCache](/api/classes/simplexcache)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](/api/classes/simplexcache) |

**Returns:** *void*
