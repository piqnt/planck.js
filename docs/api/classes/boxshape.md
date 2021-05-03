[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BoxShape](boxshape.md)

# Class: BoxShape

A rectangle polygon which extend PolygonShape.

## Hierarchy

  ↳ [PolygonShape](polygonshape.md)

  ↳ **BoxShape**

## Index

### Constructors

* [constructor](boxshape.md#constructor)

### Properties

* [m_centroid](boxshape.md#m_centroid)
* [m_count](boxshape.md#m_count)
* [m_normals](boxshape.md#m_normals)
* [m_radius](boxshape.md#m_radius)
* [m_type](boxshape.md#m_type)
* [m_vertices](boxshape.md#m_vertices)
* [TYPE](boxshape.md#static-type)
* [TYPES](boxshape.md#static-types)

### Methods

* [_clone](boxshape.md#_clone)
* [_reset](boxshape.md#_reset)
* [_setAsBox](boxshape.md#_setasbox)
* [computeAABB](boxshape.md#computeaabb)
* [computeDistanceProxy](boxshape.md#computedistanceproxy)
* [computeMass](boxshape.md#computemass)
* [getChildCount](boxshape.md#getchildcount)
* [getRadius](boxshape.md#getradius)
* [getType](boxshape.md#gettype)
* [getVertex](boxshape.md#getvertex)
* [rayCast](boxshape.md#raycast)
* [testPoint](boxshape.md#testpoint)
* [validate](boxshape.md#validate)
* [isValid](boxshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new BoxShape**(`hx`: number, `hy`: number, `center?`: [Vec2](vec2.md), `angle?`: number): *[BoxShape](boxshape.md)*

*Overrides [PolygonShape](polygonshape.md).[constructor](polygonshape.md#constructor)*

*Defined in [collision/shape/BoxShape.ts:32](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/BoxShape.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |
`center?` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[BoxShape](boxshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *[Vec2](vec2.md)*

*Inherited from [PolygonShape](polygonshape.md).[m_centroid](polygonshape.md#m_centroid)*

*Defined in [collision/shape/PolygonShape.ts:49](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Inherited from [PolygonShape](polygonshape.md).[m_count](polygonshape.md#m_count)*

*Defined in [collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L52)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Inherited from [PolygonShape](polygonshape.md).[m_normals](polygonshape.md#m_normals)*

*Defined in [collision/shape/PolygonShape.ts:51](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L38)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Inherited from [PolygonShape](polygonshape.md).[m_vertices](polygonshape.md#m_vertices)*

*Defined in [collision/shape/PolygonShape.ts:50](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as 'polygon'

*Overrides [PolygonShape](polygonshape.md).[TYPE](polygonshape.md#static-type)*

*Defined in [collision/shape/BoxShape.ts:32](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/BoxShape.ts#L32)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Shape](shape.md).[TYPES](shape.md#static-types)*

*Defined in [collision/Shape.ts:47](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L47)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[PolygonShape](polygonshape.md)‹›*

*Inherited from [PolygonShape](polygonshape.md).[_clone](polygonshape.md#_clone)*

*Overrides [Shape](shape.md).[_clone](shape.md#abstract-_clone)*

*Defined in [collision/shape/PolygonShape.ts:107](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L107)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[PolygonShape](polygonshape.md)‹›*

___

###  _reset

▸ **_reset**(): *void*

*Inherited from [PolygonShape](polygonshape.md).[_reset](polygonshape.md#_reset)*

*Overrides [Shape](shape.md).[_reset](shape.md#_reset)*

*Defined in [collision/shape/PolygonShape.ts:129](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L129)*

**Returns:** *void*

___

###  _setAsBox

▸ **_setAsBox**(`hx`: number, `hy`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[_setAsBox](polygonshape.md#_setasbox)*

*Defined in [collision/shape/PolygonShape.ts:261](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |

**Returns:** *void*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeAABB](polygonshape.md#computeaabb)*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [collision/shape/PolygonShape.ts:389](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L389)*

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

*Inherited from [PolygonShape](polygonshape.md).[computeDistanceProxy](polygonshape.md#computedistanceproxy)*

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

*Defined in [collision/shape/PolygonShape.ts:523](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L523)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeMass](polygonshape.md#computemass)*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [collision/shape/PolygonShape.ts:414](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L414)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Inherited from [PolygonShape](polygonshape.md).[getChildCount](polygonshape.md#getchildcount)*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [collision/shape/PolygonShape.ts:125](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L125)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [Shape](shape.md).[getRadius](shape.md#getradius)*

*Defined in [collision/Shape.ts:59](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L59)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[getType](shape.md#gettype)*

*Defined in [collision/Shape.ts:69](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L69)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)‹›*

*Inherited from [PolygonShape](polygonshape.md).[getVertex](polygonshape.md#getvertex)*

*Defined in [collision/shape/PolygonShape.ts:97](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[rayCast](polygonshape.md#raycast)*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [collision/shape/PolygonShape.ts:321](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L321)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) | The ray-cast results. |
`input` | [RayCastInput](../interfaces/raycastinput.md) | The ray-cast input parameters. |
`xf` | [Transform](transform.md) | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[testPoint](polygonshape.md#testpoint)*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [collision/shape/PolygonShape.ts:300](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L300)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[validate](polygonshape.md#validate)*

*Defined in [collision/shape/PolygonShape.ts:500](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/PolygonShape.ts#L500)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`shape`: [Shape](shape.md) | null | undefined): *shape is Shape*

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

*Defined in [collision/Shape.ts:55](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
