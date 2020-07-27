[API Doc](../README.md) › [ChainShape](chainshape.md)

# Interface: ChainShape

## Hierarchy

* [Shape](shape.md)

  ↳ **ChainShape**

## Index

### Properties

* [m_count](chainshape.md#m_count)
* [m_hasNextVertex](chainshape.md#m_hasnextvertex)
* [m_hasPrevVertex](chainshape.md#m_hasprevvertex)
* [m_nextVertex](chainshape.md#m_nextvertex)
* [m_prevVertex](chainshape.md#m_prevvertex)
* [m_radius](chainshape.md#m_radius)
* [m_type](chainshape.md#m_type)
* [m_vertices](chainshape.md#m_vertices)

### Methods

* [computeAABB](chainshape.md#computeaabb)
* [computeDistanceProxy](chainshape.md#computedistanceproxy)
* [computeMass](chainshape.md#computemass)
* [getChildCount](chainshape.md#getchildcount)
* [getChildEdge](chainshape.md#getchildedge)
* [getRadius](chainshape.md#getradius)
* [getType](chainshape.md#gettype)
* [getVertex](chainshape.md#getvertex)
* [isValid](chainshape.md#isvalid)
* [rayCast](chainshape.md#raycast)
* [testPoint](chainshape.md#testpoint)

## Properties

###  m_count

• **m_count**: *number*

*Defined in [shape/index.d.ts:66](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L66)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [shape/index.d.ts:70](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L70)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [shape/index.d.ts:69](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L69)*

___

###  m_nextVertex

• **m_nextVertex**: *[Vec2](vec2.md) | null*

*Defined in [shape/index.d.ts:68](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L68)*

___

###  m_prevVertex

• **m_prevVertex**: *[Vec2](vec2.md) | null*

*Defined in [shape/index.d.ts:67](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L67)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [shape/index.d.ts:10](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L10)*

___

###  m_type

• **m_type**: *"chain"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [shape/index.d.ts:63](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L63)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:65](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L65)*

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

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [shape/index.d.ts:77](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

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

*Defined in [shape/index.d.ts:78](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L78)*

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
