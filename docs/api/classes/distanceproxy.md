[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceProxy](distanceproxy.md)

# Class: DistanceProxy

A distance proxy is used by the GJK algorithm. It encapsulates any shape.

## Hierarchy

* **DistanceProxy**

## Index

### Methods

* [getSupport](distanceproxy.md#getsupport)
* [getSupportVertex](distanceproxy.md#getsupportvertex)
* [getVertex](distanceproxy.md#getvertex)
* [getVertexCount](distanceproxy.md#getvertexcount)
* [recycle](distanceproxy.md#recycle)
* [set](distanceproxy.md#set)
* [setVertices](distanceproxy.md#setvertices)

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2Value](../interfaces/vec2value.md)): *number*

Get the supporting vertex index in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2Value](../interfaces/vec2value.md)*

Get the supporting vertex in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2Value](../interfaces/vec2value.md)*

Get a vertex by index. Used by Distance.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2Value](../interfaces/vec2value.md)*

___

###  getVertexCount

▸ **getVertexCount**(): *number*

Get the vertex count.

**Returns:** *number*

___

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`shape`: [Shape](shape.md), `index`: number): *void*

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`index` | number |

**Returns:** *void*

___

###  setVertices

▸ **setVertices**(`vertices`: [Vec2Value](../interfaces/vec2value.md)[], `count`: number, `radius`: number): *void*

Initialize the proxy using a vertex cloud and radius. The vertices
must remain in scope while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2Value](../interfaces/vec2value.md)[] |
`count` | number |
`radius` | number |

**Returns:** *void*
