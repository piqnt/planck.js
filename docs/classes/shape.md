[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Shape](shape.md)

# Class: Shape

## Hierarchy

* **Shape**

## Index

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

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex?`: number): *void*

*Defined in [shape/index.d.ts:18](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L18)*

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

*Defined in [shape/index.d.ts:20](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](../interfaces/massdata.md), `density?`: number): *void*

*Defined in [shape/index.d.ts:19](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) |
`density?` | number |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *number*

*Defined in [shape/index.d.ts:15](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L15)*

**Returns:** *number*

___

###  getRadius

▸ **getRadius**(): *number*

*Defined in [shape/index.d.ts:13](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L13)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [shape/index.d.ts:14](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L14)*

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  isValid

▸ **isValid**(`shape`: any): *boolean*

*Defined in [shape/index.d.ts:12](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | any |

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex?`: number): *boolean*

*Defined in [shape/index.d.ts:17](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |
`xf` | [Transform](transform.md) |
`childIndex?` | number |

**Returns:** *boolean*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *false*

*Defined in [shape/index.d.ts:16](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |
`p` | [Vec2](vec2.md) |

**Returns:** *false*
