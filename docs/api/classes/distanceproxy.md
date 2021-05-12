[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceProxy](distanceproxy.md)

# Class: DistanceProxy

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

*Defined in [src/collision/Distance.ts:235](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L235)*

**Returns:** *[DistanceProxy](distanceproxy.md)*

## Properties

###  m_buffer

• **m_buffer**: *[Vec2](vec2.md)[]*

*Defined in [src/collision/Distance.ts:232](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L232)*

internal

___

###  m_count

• **m_count**: *number*

*Defined in [src/collision/Distance.ts:234](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L234)*

internal

___

###  m_radius

• **m_radius**: *number*

*Defined in [src/collision/Distance.ts:235](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L235)*

internal

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [src/collision/Distance.ts:233](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L233)*

internal

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2](vec2.md)): *number*

*Defined in [src/collision/Distance.ts:263](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L263)*

Get the supporting vertex index in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/collision/Distance.ts:279](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L279)*

Get the supporting vertex in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [src/collision/Distance.ts:255](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L255)*

Get a vertex by index. Used by Distance.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertexCount

▸ **getVertexCount**(): *number*

*Defined in [src/collision/Distance.ts:248](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L248)*

Get the vertex count.

**Returns:** *number*

___

###  set

▸ **set**(`shape`: [Shape](shape.md), `index`: number): *void*

*Defined in [src/collision/Distance.ts:287](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Distance.ts#L287)*

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`index` | number |

**Returns:** *void*
