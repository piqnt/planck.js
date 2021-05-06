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
* [print](simplex.md#print)
* [readCache](simplex.md#readcache)
* [solve](simplex.md#solve)
* [solve2](simplex.md#solve2)
* [solve3](simplex.md#solve3)
* [writeCache](simplex.md#writecache)

## Constructors

###  constructor

\+ **new Simplex**(): *[Simplex](simplex.md)*

*Defined in [src/collision/Distance.ts:324](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L324)*

**Returns:** *[Simplex](simplex.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [src/collision/Distance.ts:324](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L324)*

___

###  m_v

• **m_v**: *[SimplexVertex](simplexvertex.md)[]*

*Defined in [src/collision/Distance.ts:323](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L323)*

___

###  m_v1

• **m_v1**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:320](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L320)*

___

###  m_v2

• **m_v2**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:321](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L321)*

___

###  m_v3

• **m_v3**: *[SimplexVertex](simplexvertex.md)*

*Defined in [src/collision/Distance.ts:322](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L322)*

## Methods

###  getClosestPoint

▸ **getClosestPoint**(): *[Vec2](vec2.md)‹›*

*Defined in [src/collision/Distance.ts:434](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L434)*

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getMetric

▸ **getMetric**(): *number*

*Defined in [src/collision/Distance.ts:483](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L483)*

**Returns:** *number*

___

###  getSearchDirection

▸ **getSearchDirection**(): *[Vec2](vec2.md)‹›*

*Defined in [src/collision/Distance.ts:411](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L411)*

**Returns:** *[Vec2](vec2.md)‹›*

___

###  getWitnessPoints

▸ **getWitnessPoints**(`pA`: any, `pB`: any): *void*

*Defined in [src/collision/Distance.ts:455](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L455)*

**Parameters:**

Name | Type |
------ | ------ |
`pA` | any |
`pB` | any |

**Returns:** *void*

___

###  print

▸ **print**(): *string*

*Defined in [src/collision/Distance.ts:333](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L333)*

**Returns:** *string*

___

###  readCache

▸ **readCache**(`cache`: any, `proxyA`: any, `transformA`: any, `proxyB`: any, `transformB`: any): *void*

*Defined in [src/collision/Distance.ts:358](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | any |
`proxyA` | any |
`transformA` | any |
`proxyB` | any |
`transformB` | any |

**Returns:** *void*

___

###  solve

▸ **solve**(): *void*

*Defined in [src/collision/Distance.ts:505](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L505)*

**Returns:** *void*

___

###  solve2

▸ **solve2**(): *void*

*Defined in [src/collision/Distance.ts:546](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L546)*

**Returns:** *void*

___

###  solve3

▸ **solve3**(): *void*

*Defined in [src/collision/Distance.ts:582](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L582)*

**Returns:** *void*

___

###  writeCache

▸ **writeCache**(`cache`: [SimplexCache](simplexcache.md)): *void*

*Defined in [src/collision/Distance.ts:402](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Distance.ts#L402)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |

**Returns:** *void*
