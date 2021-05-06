[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [EdgeShape](edgeshape.md)

# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Hierarchy

* [Shape](shape.md)

  ↳ **EdgeShape**

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

*Defined in [src/collision/shape/EdgeShape.ts:51](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2](vec2.md) |
`v2?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

*Defined in [src/collision/shape/EdgeShape.ts:50](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L50)*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

*Defined in [src/collision/shape/EdgeShape.ts:51](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L38)*

___

###  m_vertex0

• **m_vertex0**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/EdgeShape.ts:48](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L48)*

___

###  m_vertex1

• **m_vertex1**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/EdgeShape.ts:43](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L43)*

___

###  m_vertex2

• **m_vertex2**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/EdgeShape.ts:44](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L44)*

___

###  m_vertex3

• **m_vertex3**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/EdgeShape.ts:49](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L49)*

___

### `Static` TYPE

▪ **TYPE**: *"edge"* = 'edge' as 'edge'

*Defined in [src/collision/shape/EdgeShape.ts:40](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L40)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Shape](shape.md).[TYPES](shape.md#static-types)*

*Defined in [src/collision/Shape.ts:47](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L47)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[EdgeShape](edgeshape.md)‹›*

*Overrides [Shape](shape.md).[_clone](shape.md#abstract-_clone)*

*Defined in [src/collision/shape/EdgeShape.ts:139](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L139)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[EdgeShape](edgeshape.md)‹›*

___

###  _reset

▸ **_reset**(): *void*

*Inherited from [Shape](shape.md).[_reset](shape.md#_reset)*

*Defined in [src/collision/Shape.ts:41](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L41)*

**Returns:** *void*

___

###  _set

▸ **_set**(`v1`: [Vec2](vec2.md), `v2`: [Vec2](vec2.md)): *this*

*Defined in [src/collision/shape/EdgeShape.ts:126](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L126)*

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

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [src/collision/shape/EdgeShape.ts:243](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L243)*

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

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

*Defined in [src/collision/shape/EdgeShape.ts:264](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L264)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [src/collision/shape/EdgeShape.ts:258](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L258)*

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

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [src/collision/shape/EdgeShape.ts:155](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L155)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [Shape](shape.md).[getRadius](shape.md#getradius)*

*Defined in [src/collision/Shape.ts:59](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L59)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[getType](shape.md#gettype)*

*Defined in [src/collision/Shape.ts:69](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L69)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [src/collision/shape/EdgeShape.ts:182](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L182)*

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

*Defined in [src/collision/shape/EdgeShape.ts:101](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`v3?` | [Vec2](vec2.md) |

**Returns:** *this*

___

###  setPrev

▸ **setPrev**(`v0?`: [Vec2](vec2.md)): *this*

*Defined in [src/collision/shape/EdgeShape.ts:112](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`v0?` | [Vec2](vec2.md) |

**Returns:** *this*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *false*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [src/collision/shape/EdgeShape.ts:166](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/shape/EdgeShape.ts#L166)*

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

▸ **isValid**(`shape`: [Shape](shape.md) | null | undefined): *shape is Shape*

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:55](https://github.com/shakiba/planck.js/blob/b8c946c/src/collision/Shape.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
