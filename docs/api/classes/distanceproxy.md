[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceProxy](distanceproxy.md)

# Class: DistanceProxy

A distance proxy is used by the GJK algorithm. It encapsulates any shape.
A distance proxy is used by the GJK algorithm. It encapsulates any shape.

## Hierarchy

* **DistanceProxy**

## Index

### Constructors

* [constructor](distanceproxy.md#constructor)

### Properties

* [m_buffer](distanceproxy.md#m_buffer)
* [m_count](distanceproxy.md#m_count)
* [m_radius](distanceproxy.md#m_radius)
* [m_vertices](distanceproxy.md#m_vertices)

### Methods

* [getSupport](distanceproxy.md#getsupport)
* [getSupportVertex](distanceproxy.md#getsupportvertex)
* [getVertex](distanceproxy.md#getvertex)
* [getVertexCount](distanceproxy.md#getvertexcount)
* [set](distanceproxy.md#set)

## Constructors

###  constructor

\+ **new DistanceProxy**(): *[DistanceProxy](distanceproxy.md)*

*Defined in [dist/planck.d.ts:1957](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1957)*

**Returns:** *[DistanceProxy](distanceproxy.md)*

## Properties

###  m_buffer

• **m_buffer**: *Vec2[]*

*Defined in [dist/planck.d.ts:1954](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1954)*

*Defined in [src/collision/Distance.ts:232](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L232)*

internal
internal

___

###  m_count

• **m_count**: *number*

*Defined in [dist/planck.d.ts:1956](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1956)*

*Defined in [src/collision/Distance.ts:234](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L234)*

internal
internal

___

###  m_radius

• **m_radius**: *number*

*Defined in [dist/planck.d.ts:1957](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1957)*

*Defined in [src/collision/Distance.ts:235](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L235)*

internal
internal

___

###  m_vertices

• **m_vertices**: *Vec2[]*

*Defined in [dist/planck.d.ts:1955](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1955)*

*Defined in [src/collision/Distance.ts:233](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L233)*

internal
internal

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2](vec2.md)): *number*

*Defined in [dist/planck.d.ts:1970](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1970)*

Get the supporting vertex index in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *number*

▸ **getSupport**(`d`: Vec2): *number*

*Defined in [src/collision/Distance.ts:265](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L265)*

Get the supporting vertex index in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | Vec2 |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1974](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1974)*

Get the supporting vertex in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **getSupportVertex**(`d`: Vec2): *Vec2*

*Defined in [src/collision/Distance.ts:282](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L282)*

Get the supporting vertex in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | Vec2 |

**Returns:** *Vec2*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1966](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1966)*

Get a vertex by index. Used by Distance.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **getVertex**(`index`: number): *Vec2*

*Defined in [src/collision/Distance.ts:256](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L256)*

Get a vertex by index. Used by Distance.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *Vec2*

___

###  getVertexCount

▸ **getVertexCount**(): *number*

*Defined in [dist/planck.d.ts:1962](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1962)*

Get the vertex count.

**Returns:** *number*

▸ **getVertexCount**(): *number*

*Defined in [src/collision/Distance.ts:248](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L248)*

Get the vertex count.

**Returns:** *number*

___

###  set

▸ **set**(`shape`: [Shape](shape.md), `index`: number): *void*

*Defined in [dist/planck.d.ts:1979](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1979)*

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`index` | number |

**Returns:** *void*

▸ **set**(`shape`: Shape, `index`: number): *void*

*Defined in [src/collision/Distance.ts:291](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Distance.ts#L291)*

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape |
`index` | number |

**Returns:** *void*
