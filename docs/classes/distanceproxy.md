[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceProxy](distanceproxy.md)

# Class: DistanceProxy

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

*Defined in [collision/index.d.ts:19](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L19)*

**Returns:** *[DistanceProxy](distanceproxy.md)*

## Properties

###  m_buffer

• **m_buffer**: *[Vec2](vec2.md)[]*

*Defined in [collision/index.d.ts:22](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L22)*

internal

___

###  m_count

• **m_count**: *number*

*Defined in [collision/index.d.ts:24](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L24)*

internal

___

###  m_radius

• **m_radius**: *number*

*Defined in [collision/index.d.ts:25](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L25)*

internal

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [collision/index.d.ts:23](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L23)*

internal

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2](vec2.md)): *number*

*Defined in [collision/index.d.ts:29](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:30](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:28](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertexCount

▸ **getVertexCount**(): *number*

*Defined in [collision/index.d.ts:27](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L27)*

**Returns:** *number*

___

###  set

▸ **set**(`shape`: [Shape](shape.md), `index`: number): *void*

*Defined in [collision/index.d.ts:31](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`index` | number |

**Returns:** *void*
