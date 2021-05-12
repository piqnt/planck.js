[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PolygonShape](polygonshape.md)

# Class: PolygonShape

A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape

## Hierarchy

* [Shape](shape.md)

  ↳ **PolygonShape**

  ↳ [BoxShape](boxshape.md)

## Index

### Constructors

* [constructor](polygonshape.md#constructor)

### Properties

* [m_centroid](polygonshape.md#m_centroid)
* [m_count](polygonshape.md#m_count)
* [m_normals](polygonshape.md#m_normals)
* [m_radius](polygonshape.md#m_radius)
* [m_type](polygonshape.md#m_type)
* [m_vertices](polygonshape.md#m_vertices)
* [TYPE](polygonshape.md#static-type)

### Methods

* [computeAABB](polygonshape.md#computeaabb)
* [computeDistanceProxy](polygonshape.md#computedistanceproxy)
* [computeMass](polygonshape.md#computemass)
* [getChildCount](polygonshape.md#getchildcount)
* [getRadius](polygonshape.md#getradius)
* [getType](polygonshape.md#gettype)
* [getVertex](polygonshape.md#getvertex)
* [rayCast](polygonshape.md#raycast)
* [testPoint](polygonshape.md#testpoint)
* [validate](polygonshape.md#validate)
* [isValid](polygonshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new PolygonShape**(`vertices?`: [Vec2](vec2.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [src/collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/PolygonShape.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Defined in [src/collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L52)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Defined in [src/collision/shape/PolygonShape.ts:51](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L38)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [src/collision/shape/PolygonShape.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as 'polygon'

*Defined in [src/collision/shape/PolygonShape.ts:47](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L47)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [src/collision/shape/PolygonShape.ts:388](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L388)*

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

*Defined in [src/collision/shape/PolygonShape.ts:522](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L522)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [src/collision/shape/PolygonShape.ts:413](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L413)*

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

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [src/collision/shape/PolygonShape.ts:127](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L127)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [Shape](shape.md).[getRadius](shape.md#getradius)*

*Defined in [src/collision/Shape.ts:62](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L62)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [Shape](shape.md).[getType](shape.md#gettype)*

*Defined in [src/collision/Shape.ts:72](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L72)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [src/collision/shape/PolygonShape.ts:98](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [src/collision/shape/PolygonShape.ts:320](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L320)*

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

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [src/collision/shape/PolygonShape.ts:299](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L299)*

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

*Defined in [src/collision/shape/PolygonShape.ts:499](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L499)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`shape`: [Shape](shape.md) | null | undefined): *shape is Shape*

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:58](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
