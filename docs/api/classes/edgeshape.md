[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [EdgeShape](edgeshape.md)

# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.
A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Hierarchy

* any

* Shape

  ↳ **EdgeShape**

## Callable

▸ **EdgeShape**(`v1?`: [Vec2](vec2.md), `v2?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [dist/planck.d.ts:2081](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2081)*

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.
A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2](vec2.md) |
`v2?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Index

### Constructors

* [constructor](edgeshape.md#constructor)

### Properties

* [m_hasVertex0](edgeshape.md#m_hasvertex0)
* [m_hasVertex3](edgeshape.md#m_hasvertex3)
* [m_radius](edgeshape.md#m_radius)
* [m_type](edgeshape.md#m_type)
* [m_vertex0](edgeshape.md#m_vertex0)
* [m_vertex1](edgeshape.md#m_vertex1)
* [m_vertex2](edgeshape.md#m_vertex2)
* [m_vertex3](edgeshape.md#m_vertex3)
* [TYPE](edgeshape.md#static-type)
* [TYPES](edgeshape.md#static-types)

### Methods

* [_clone](edgeshape.md#_clone)
* [_reset](edgeshape.md#_reset)
* [_set](edgeshape.md#_set)
* [computeAABB](edgeshape.md#computeaabb)
* [computeDistanceProxy](edgeshape.md#computedistanceproxy)
* [computeMass](edgeshape.md#computemass)
* [getChildCount](edgeshape.md#getchildcount)
* [getRadius](edgeshape.md#getradius)
* [getType](edgeshape.md#gettype)
* [rayCast](edgeshape.md#raycast)
* [setNext](edgeshape.md#setnext)
* [setPrev](edgeshape.md#setprev)
* [testPoint](edgeshape.md#testpoint)
* [isValid](edgeshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new EdgeShape**(`v1?`: [Vec2](vec2.md), `v2?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [dist/planck.d.ts:2097](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2097)*

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2](vec2.md) |
`v2?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

*Defined in [dist/planck.d.ts:2096](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2096)*

*Defined in [src/collision/shape/EdgeShape.ts:50](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L50)*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

*Defined in [dist/planck.d.ts:2097](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2097)*

*Defined in [src/collision/shape/EdgeShape.ts:51](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [CircleShape](circleshape.md).[m_radius](circleshape.md#m_radius)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[m_type](circleshape.md#m_type)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L38)*

___

###  m_vertex0

• **m_vertex0**: *Vec2*

*Defined in [dist/planck.d.ts:2094](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2094)*

*Defined in [src/collision/shape/EdgeShape.ts:48](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L48)*

___

###  m_vertex1

• **m_vertex1**: *Vec2*

*Defined in [dist/planck.d.ts:2090](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2090)*

*Defined in [src/collision/shape/EdgeShape.ts:43](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L43)*

___

###  m_vertex2

• **m_vertex2**: *Vec2*

*Defined in [dist/planck.d.ts:2091](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2091)*

*Defined in [src/collision/shape/EdgeShape.ts:44](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L44)*

___

###  m_vertex3

• **m_vertex3**: *Vec2*

*Defined in [dist/planck.d.ts:2095](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2095)*

*Defined in [src/collision/shape/EdgeShape.ts:49](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L49)*

___

### `Static` TYPE

▪ **TYPE**: *"edge"* = 'edge' as 'edge'

*Defined in [dist/planck.d.ts:2088](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2088)*

*Defined in [src/collision/shape/EdgeShape.ts:40](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/shape/EdgeShape.ts#L40)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [CircleShape](circleshape.md).[TYPES](circleshape.md#static-types)*

*Defined in [src/collision/Shape.ts:47](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L47)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[EdgeShape](edgeshape.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2110](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2110)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  _reset

▸ **_reset**(): *void*

*Inherited from [CircleShape](circleshape.md).[_reset](circleshape.md#_reset)*

*Defined in [src/collision/Shape.ts:41](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L41)*

**Returns:** *void*

___

###  _set

▸ **_set**(`v1`: [Vec2](vec2.md), `v2`: [Vec2](vec2.md)): *this*

*Defined in [dist/planck.d.ts:2104](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2104)*

Set this as an isolated edge.

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2](vec2.md) |
`v2` | [Vec2](vec2.md) |

**Returns:** *this*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2144](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2144)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABB](aabb.md) | Returns the axis aligned box. |
`xf` | [Transform](transform.md) | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md)): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2153](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2153)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2152](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2152)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides void*

*Defined in [dist/planck.d.ts:2114](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2114)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [EdgeShape](edgeshape.md).[getRadius](edgeshape.md#getradius)*

*Defined in [src/collision/Shape.ts:59](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L59)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[getType](circleshape.md#gettype)*

*Defined in [src/collision/Shape.ts:69](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L69)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2135](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2135)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) | The ray-cast results. |
`input` | [RayCastInput](../interfaces/raycastinput.md) | The ray-cast input parameters. |
`xf` | [Transform](transform.md) | - |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

###  setNext

▸ **setNext**(`v3?`: [Vec2](vec2.md)): *this*

*Defined in [dist/planck.d.ts:2099](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2099)*

**Parameters:**

Name | Type |
------ | ------ |
`v3?` | [Vec2](vec2.md) |

**Returns:** *this*

___

###  setPrev

▸ **setPrev**(`v0?`: [Vec2](vec2.md)): *this*

*Defined in [dist/planck.d.ts:2100](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2100)*

**Parameters:**

Name | Type |
------ | ------ |
`v0?` | [Vec2](vec2.md) |

**Returns:** *this*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *false*

*Overrides void*

*Defined in [dist/planck.d.ts:2122](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L2122)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *false*

___

### `Static` isValid

▸ **isValid**(`shape`: Shape | null | undefined): *shape is Shape*

*Inherited from [CircleShape](circleshape.md).[isValid](circleshape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:55](https://github.com/shakiba/planck.js/blob/6a5d3be/src/collision/Shape.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape &#124; null &#124; undefined |

**Returns:** *shape is Shape*
