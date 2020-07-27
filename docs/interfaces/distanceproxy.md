[API Doc](../README.md) › [DistanceProxy](distanceproxy.md)

# Interface: DistanceProxy

## Hierarchy

* **DistanceProxy**

## Index

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

## Properties

###  m_buffer

• **m_buffer**: *[Vec2](vec2.md)[]*

*Defined in [collision/index.d.ts:18](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L18)*

___

###  m_count

• **m_count**: *number*

*Defined in [collision/index.d.ts:20](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L20)*

___

###  m_radius

• **m_radius**: *number*

*Defined in [collision/index.d.ts:21](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L21)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [collision/index.d.ts:19](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L19)*

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2](vec2.md)): *number*

*Defined in [collision/index.d.ts:25](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:26](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:24](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertexCount

▸ **getVertexCount**(): *number*

*Defined in [collision/index.d.ts:23](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L23)*

**Returns:** *number*

___

###  set

▸ **set**(`shape`: [Shape](shape.md), `index`: number): *void*

*Defined in [collision/index.d.ts:27](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`index` | number |

**Returns:** *void*
