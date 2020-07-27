[API Doc](../README.md) › [PolygonShape](polygonshape.md)

# Interface: PolygonShape

## Hierarchy

* [Shape](shape.md)

  ↳ **PolygonShape**

## Index

### Properties

* [m_centroid](polygonshape.md#m_centroid)
* [m_count](polygonshape.md#m_count)
* [m_normals](polygonshape.md#m_normals)
* [m_radius](polygonshape.md#m_radius)
* [m_type](polygonshape.md#m_type)
* [m_vertices](polygonshape.md#m_vertices)

### Methods

* [computeAABB](polygonshape.md#computeaabb)
* [computeDistanceProxy](polygonshape.md#computedistanceproxy)
* [computeMass](polygonshape.md#computemass)
* [getChildCount](polygonshape.md#getchildcount)
* [getRadius](polygonshape.md#getradius)
* [getType](polygonshape.md#gettype)
* [getVertex](polygonshape.md#getvertex)
* [isValid](polygonshape.md#isvalid)
* [rayCast](polygonshape.md#raycast)
* [testPoint](polygonshape.md#testpoint)
* [validate](polygonshape.md#validate)

## Properties

###  m_centroid

• **m_centroid**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:49](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Defined in [shape/index.d.ts:52](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L52)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:51](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [shape/index.d.ts:10](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L10)*

___

###  m_type

• **m_type**: *"polygon"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [shape/index.d.ts:47](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L47)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:50](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L50)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex?`: number): *void*

*Inherited from [Shape](shape.md).[computeAABB](shape.md#computeaabb)*

*Defined in [shape/index.d.ts:18](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`xf` | [Transform](transform.md) |
`childIndex?` | number |

**Returns:** *void*

___

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md)): *void*

*Inherited from [Shape](shape.md).[computeDistanceProxy](shape.md#computedistanceproxy)*

*Defined in [shape/index.d.ts:20](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Inherited from [Shape](shape.md).[computeMass](shape.md#computemass)*

*Defined in [shape/index.d.ts:19](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](massdata.md) |
`density?` | number |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *number*

*Inherited from [Shape](shape.md).[getChildCount](shape.md#getchildcount)*

*Defined in [shape/index.d.ts:15](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L15)*

**Returns:** *number*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [Shape](shape.md).[getRadius](shape.md#getradius)*

*Defined in [shape/index.d.ts:13](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L13)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../README.md#shapetype)*

*Inherited from [Shape](shape.md).[getType](shape.md#gettype)*

*Defined in [shape/index.d.ts:14](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L14)*

**Returns:** *[ShapeType](../README.md#shapetype)*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:54](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  isValid

▸ **isValid**(`shape`: any): *boolean*

*Inherited from [Shape](shape.md).[isValid](shape.md#isvalid)*

*Defined in [shape/index.d.ts:12](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | any |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../README.md#raycastoutput), `input`: [RayCastInput](../README.md#raycastinput), `xf`: [Transform](transform.md), `childIndex?`: number): *boolean*

*Inherited from [Shape](shape.md).[rayCast](shape.md#raycast)*

*Defined in [shape/index.d.ts:17](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../README.md#raycastoutput) |
`input` | [RayCastInput](../README.md#raycastinput) |
`xf` | [Transform](transform.md) |
`childIndex?` | number |

**Returns:** *boolean*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *false*

*Inherited from [Shape](shape.md).[testPoint](shape.md#testpoint)*

*Defined in [shape/index.d.ts:16](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |
`p` | [Vec2](vec2.md) |

**Returns:** *false*

___

###  validate

▸ **validate**(): *void*

*Defined in [shape/index.d.ts:55](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L55)*

**Returns:** *void*
