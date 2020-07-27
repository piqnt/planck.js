[API Doc](../README.md) › [EdgeShape](edgeshape.md)

# Interface: EdgeShape

## Hierarchy

* [Shape](shape.md)

  ↳ **EdgeShape**

## Index

### Properties

* [m_hasVertex0](edgeshape.md#m_hasvertex0)
* [m_hasVertex3](edgeshape.md#m_hasvertex3)
* [m_radius](edgeshape.md#m_radius)
* [m_type](edgeshape.md#m_type)
* [m_vertex0](edgeshape.md#m_vertex0)
* [m_vertex1](edgeshape.md#m_vertex1)
* [m_vertex2](edgeshape.md#m_vertex2)
* [m_vertex3](edgeshape.md#m_vertex3)

### Methods

* [computeAABB](edgeshape.md#computeaabb)
* [computeDistanceProxy](edgeshape.md#computedistanceproxy)
* [computeMass](edgeshape.md#computemass)
* [getChildCount](edgeshape.md#getchildcount)
* [getRadius](edgeshape.md#getradius)
* [getType](edgeshape.md#gettype)
* [isValid](edgeshape.md#isvalid)
* [rayCast](edgeshape.md#raycast)
* [setNext](edgeshape.md#setnext)
* [setPrev](edgeshape.md#setprev)
* [testPoint](edgeshape.md#testpoint)

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

*Defined in [shape/index.d.ts:38](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L38)*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

*Defined in [shape/index.d.ts:39](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L39)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [shape/index.d.ts:10](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L10)*

___

###  m_type

• **m_type**: *"edge"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [shape/index.d.ts:32](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L32)*

___

###  m_vertex0

• **m_vertex0**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:36](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L36)*

___

###  m_vertex1

• **m_vertex1**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:34](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L34)*

___

###  m_vertex2

• **m_vertex2**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:35](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L35)*

___

###  m_vertex3

• **m_vertex3**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L37)*

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

###  setNext

▸ **setNext**(`v3?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:41](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`v3?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  setPrev

▸ **setPrev**(`v0?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:42](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`v0?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

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
