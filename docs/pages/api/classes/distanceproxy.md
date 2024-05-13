
# Class: DistanceProxy

A distance proxy is used by the GJK algorithm. It encapsulates any shape.

## Hierarchy

* **DistanceProxy**

## Index

### Methods

* [getSupport](/api/classes/distanceproxy#getsupport)
* [getSupportVertex](/api/classes/distanceproxy#getsupportvertex)
* [getVertex](/api/classes/distanceproxy#getvertex)
* [getVertexCount](/api/classes/distanceproxy#getvertexcount)
* [recycle](/api/classes/distanceproxy#recycle)
* [set](/api/classes/distanceproxy#set)
* [setVertices](/api/classes/distanceproxy#setvertices)

## Methods

###  getSupport

▸ **getSupport**(`d`: [Vec2Value](/api/interfaces/vec2value)): *number*

Get the supporting vertex index in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

###  getSupportVertex

▸ **getSupportVertex**(`d`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2Value](/api/interfaces/vec2value)*

Get the supporting vertex in the given direction.

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[Vec2Value](/api/interfaces/vec2value)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2Value](/api/interfaces/vec2value)*

Get a vertex by index. Used by Distance.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2Value](/api/interfaces/vec2value)*

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

▸ **set**(`shape`: [Shape](/api/classes/shape), `index`: number): *void*

Initialize the proxy using the given shape. The shape must remain in scope
while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](/api/classes/shape) |
`index` | number |

**Returns:** *void*

___

###  setVertices

▸ **setVertices**(`vertices`: [Vec2Value](/api/interfaces/vec2value)[], `count`: number, `radius`: number): *void*

Initialize the proxy using a vertex cloud and radius. The vertices
must remain in scope while the proxy is in use.

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2Value](/api/interfaces/vec2value)[] |
`count` | number |
`radius` | number |

**Returns:** *void*
