[API Doc](../README.md) › [CircleShape](circleshape.md)

# Interface: CircleShape

## Hierarchy

* [Shape](shape.md)

  ↳ **CircleShape**

## Index

### Properties

* [m_p](circleshape.md#m_p)
* [m_radius](circleshape.md#m_radius)
* [m_type](circleshape.md#m_type)

### Methods

* [computeAABB](circleshape.md#computeaabb)
* [computeDistanceProxy](circleshape.md#computedistanceproxy)
* [computeMass](circleshape.md#computemass)
* [getCenter](circleshape.md#getcenter)
* [getChildCount](circleshape.md#getchildcount)
* [getRadius](circleshape.md#getradius)
* [getType](circleshape.md#gettype)
* [getVertex](circleshape.md#getvertex)
* [getVertexCount](circleshape.md#getvertexcount)
* [isValid](circleshape.md#isvalid)
* [rayCast](circleshape.md#raycast)
* [testPoint](circleshape.md#testpoint)

## Properties

###  m_p

• **m_p**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:25](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L25)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [shape/index.d.ts:10](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L10)*

___

###  m_type

• **m_type**: *"circle"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [shape/index.d.ts:23](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L23)*

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

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:27](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L27)*

**Returns:** *[Vec2](vec2.md)*

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

▸ **getVertex**(`index?`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:28](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`index?` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertexCount

▸ **getVertexCount**(`index?`: number): *1*

*Defined in [shape/index.d.ts:29](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`index?` | number |

**Returns:** *1*

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
