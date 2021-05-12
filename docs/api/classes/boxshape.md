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

### Methods

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

*Defined in [src/collision/shape/BoxShape.ts:32](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/BoxShape.ts#L32)*

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

*Defined in [src/collision/shape/PolygonShape.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Inherited from [PolygonShape](polygonshape.md).[m_count](polygonshape.md#m_count)*

*Defined in [src/collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L52)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Inherited from [PolygonShape](polygonshape.md).[m_normals](polygonshape.md#m_normals)*

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

*Inherited from [PolygonShape](polygonshape.md).[m_vertices](polygonshape.md#m_vertices)*

*Defined in [src/collision/shape/PolygonShape.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as 'polygon'

*Overrides [PolygonShape](polygonshape.md).[TYPE](polygonshape.md#static-type)*

*Defined in [src/collision/shape/BoxShape.ts:32](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/BoxShape.ts#L32)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeAABB](polygonshape.md#computeaabb)*

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

*Inherited from [PolygonShape](polygonshape.md).[computeDistanceProxy](polygonshape.md#computedistanceproxy)*

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

*Inherited from [PolygonShape](polygonshape.md).[computeMass](polygonshape.md#computemass)*

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

*Inherited from [PolygonShape](polygonshape.md).[getChildCount](polygonshape.md#getchildcount)*

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

*Inherited from [PolygonShape](polygonshape.md).[getVertex](polygonshape.md#getvertex)*

*Defined in [src/collision/shape/PolygonShape.ts:98](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/PolygonShape.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[rayCast](polygonshape.md#raycast)*

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

*Inherited from [PolygonShape](polygonshape.md).[testPoint](polygonshape.md#testpoint)*

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

*Inherited from [PolygonShape](polygonshape.md).[validate](polygonshape.md#validate)*

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
