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
* [rayCast](polygonshape.md#raycast)
* [testPoint](polygonshape.md#testpoint)
* [validate](polygonshape.md#validate)
* [isValid](polygonshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new PolygonShape**(`vertices?`: [Vec2Value](../interfaces/vec2value.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [collision/shape/PolygonShape.ts:63](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2Value](../interfaces/vec2value.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *[Vec2](vec2.md)*

*Defined in [collision/shape/PolygonShape.ts:59](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L59)*

___

###  m_count

• **m_count**: *number*

*Defined in [collision/shape/PolygonShape.ts:62](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L62)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Defined in [collision/shape/PolygonShape.ts:61](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L61)*

___

###  m_radius

• **m_radius**: *number*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [collision/shape/PolygonShape.ts:63](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L63)*

___

###  m_type

• **m_type**: *"polygon"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [collision/shape/PolygonShape.ts:57](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L57)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [collision/shape/PolygonShape.ts:60](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L60)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as const

*Defined in [collision/shape/PolygonShape.ts:56](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L56)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [collision/shape/PolygonShape.ts:399](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L399)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) | Returns the axis aligned box. |
`xf` | [TransformValue](../globals.md#transformvalue) | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md)): *void*

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

*Defined in [collision/shape/PolygonShape.ts:536](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L536)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [collision/shape/PolygonShape.ts:423](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L423)*

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

*Defined in [collision/shape/PolygonShape.ts:139](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L139)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

*Defined in [collision/shape/PolygonShape.ts:112](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L112)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"polygon"*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

*Defined in [collision/shape/PolygonShape.ts:108](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L108)*

**Returns:** *"polygon"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [collision/shape/PolygonShape.ts:331](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L331)*

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

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2](vec2.md)): *boolean*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [collision/shape/PolygonShape.ts:310](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L310)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

*Defined in [collision/shape/PolygonShape.ts:514](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/PolygonShape.ts#L514)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

*Defined in [collision/Shape.ts:50](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Shape.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
