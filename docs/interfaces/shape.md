[API Doc](../README.md) › [Shape](shape.md)

# Interface: Shape

## Hierarchy

* **Shape**

  ↳ [CircleShape](circleshape.md)

  ↳ [EdgeShape](edgeshape.md)

  ↳ [PolygonShape](polygonshape.md)

  ↳ [ChainShape](chainshape.md)

## Index

### Properties

* [m_radius](shape.md#m_radius)
* [m_type](shape.md#m_type)

### Methods

* [computeAABB](shape.md#computeaabb)
* [computeDistanceProxy](shape.md#computedistanceproxy)
* [computeMass](shape.md#computemass)
* [getChildCount](shape.md#getchildcount)
* [getRadius](shape.md#getradius)
* [getType](shape.md#gettype)
* [isValid](shape.md#isvalid)
* [rayCast](shape.md#raycast)
* [testPoint](shape.md#testpoint)

## Properties

###  m_radius

• **m_radius**: *number*

*Defined in [shape/index.d.ts:10](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L10)*

___

###  m_type

• **m_type**: *[ShapeType](../README.md#shapetype)*

*Defined in [shape/index.d.ts:9](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L9)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex?`: number): *void*

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

*Defined in [shape/index.d.ts:20](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

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

*Defined in [shape/index.d.ts:15](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L15)*

**Returns:** *number*

___

###  getRadius

▸ **getRadius**(): *number*

*Defined in [shape/index.d.ts:13](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L13)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../README.md#shapetype)*

*Defined in [shape/index.d.ts:14](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L14)*

**Returns:** *[ShapeType](../README.md#shapetype)*

___

###  isValid

▸ **isValid**(`shape`: any): *boolean*

*Defined in [shape/index.d.ts:12](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | any |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../README.md#raycastoutput), `input`: [RayCastInput](../README.md#raycastinput), `xf`: [Transform](transform.md), `childIndex?`: number): *boolean*

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

*Defined in [shape/index.d.ts:16](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |
`p` | [Vec2](vec2.md) |

**Returns:** *false*
