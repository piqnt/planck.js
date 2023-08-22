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

*Defined in [collision/Distance.ts:355](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L355)*

___

###  m_v

• **m_v**: *[SimplexVertex](simplexvertex.md)‹›[]* = [this.m_v1, this.m_v2, this.m_v3]

*Defined in [collision/Distance.ts:354](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L354)*

___

###  m_v1

• **m_v1**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

*Defined in [collision/Distance.ts:351](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L351)*

___

###  m_v2

• **m_v2**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

*Defined in [collision/Distance.ts:352](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L352)*

___

###  m_v3

• **m_v3**: *[SimplexVertex](simplexvertex.md)‹›* = new SimplexVertex()

*Defined in [collision/Distance.ts:353](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L353)*

## Methods

###  getClosestPoint

▸ **getClosestPoint**(): *[Vec2Value](../interfaces/vec2value.md)*

*Defined in [collision/Distance.ts:465](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L465)*

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getMetric

▸ **getMetric**(): *number*

*Defined in [collision/Distance.ts:519](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L519)*

**Returns:** *number*

___

###  getSearchDirection

▸ **getSearchDirection**(): *[Vec2Value](../interfaces/vec2value.md)*

*Defined in [collision/Distance.ts:439](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L439)*

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getWitnessPoints

▸ **getWitnessPoints**(`pA`: [Vec2Value](../interfaces/vec2value.md), `pB`: [Vec2Value](../interfaces/vec2value.md)): *void*

*Defined in [collision/Distance.ts:489](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L489)*

**Parameters:**

Name | Type |
------ | ------ |
`pA` | [Vec2Value](../interfaces/vec2value.md) |
`pB` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  readCache

▸ **readCache**(`cache`: [SimplexCache](simplexcache.md), `proxyA`: [DistanceProxy](distanceproxy.md), `transformA`: [TransformValue](../globals.md#transformvalue), `proxyB`: [DistanceProxy](distanceproxy.md), `transformB`: [TransformValue](../globals.md#transformvalue)): *void*

*Defined in [collision/Distance.ts:387](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L387)*

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

*Defined in [collision/Distance.ts:356](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L356)*

**Returns:** *void*

___

###  solve

▸ **solve**(): *void*

*Defined in [collision/Distance.ts:543](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L543)*

**Returns:** *void*

___

###  solve2

▸ **solve2**(): *void*

*Defined in [collision/Distance.ts:584](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L584)*

**Returns:** *void*

___

###  solve3

▸ **solve3**(): *void*

*Defined in [collision/Distance.ts:620](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L620)*

**Returns:** *void*

___

###  writeCache

▸ **writeCache**(`cache`: [SimplexCache](simplexcache.md)): *void*

*Defined in [collision/Distance.ts:430](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Distance.ts#L430)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |

**Returns:** *void*
