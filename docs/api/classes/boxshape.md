[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BoxShape](boxshape.md)

# Class: BoxShape

A rectangle polygon which extend PolygonShape.
A rectangle polygon which extend PolygonShape.

## Hierarchy

* any

* PolygonShape

  ↳ **BoxShape**

## Callable

▸ **BoxShape**(`hx`: number, `hy`: number, `center?`: [Vec2](vec2.md), `angle?`: number): *[BoxShape](boxshape.md)*

*Defined in [dist/planck.d.ts:2387](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2387)*

A rectangle polygon which extend PolygonShape.
A rectangle polygon which extend PolygonShape.

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |
`center?` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[BoxShape](boxshape.md)*

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
* [_serialize](boxshape.md#_serialize)
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
* [_deserialize](boxshape.md#static-_deserialize)
* [isValid](boxshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new BoxShape**(`hx`: number, `hy`: number, `center?`: [Vec2](vec2.md), `angle?`: number): *[BoxShape](boxshape.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2392](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2392)*

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

• **m_centroid**: *Vec2*

*Inherited from [BoxShape](boxshape.md).[m_centroid](boxshape.md#m_centroid)*

*Defined in [src/collision/shape/PolygonShape.ts:49](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Inherited from [BoxShape](boxshape.md).[m_count](boxshape.md#m_count)*

*Defined in [src/collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L52)*

___

###  m_normals

• **m_normals**: *Vec2[]*

*Inherited from [BoxShape](boxshape.md).[m_normals](boxshape.md#m_normals)*

*Defined in [src/collision/shape/PolygonShape.ts:51](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [CircleShape](circleshape.md).[m_radius](circleshape.md#m_radius)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[m_type](circleshape.md#m_type)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L38)*

___

###  m_vertices

• **m_vertices**: *Vec2[]*

*Inherited from [BoxShape](boxshape.md).[m_vertices](boxshape.md#m_vertices)*

*Defined in [src/collision/shape/PolygonShape.ts:50](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as 'polygon'

*Overrides void*

*Defined in [dist/planck.d.ts:2392](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2392)*

*Defined in [src/collision/shape/BoxShape.ts:32](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/BoxShape.ts#L32)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [CircleShape](circleshape.md).[TYPES](circleshape.md#static-types)*

*Defined in [src/collision/Shape.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L46)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *PolygonShape‹›*

*Inherited from [BoxShape](boxshape.md).[_clone](boxshape.md#_clone)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:105](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L105)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *PolygonShape‹›*

___

###  _reset

▸ **_reset**(): *void*

*Inherited from [BoxShape](boxshape.md).[_reset](boxshape.md#_reset)*

*Overrides [CircleShape](circleshape.md).[_reset](circleshape.md#_reset)*

*Defined in [src/collision/shape/PolygonShape.ts:127](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L127)*

**Returns:** *void*

___

###  _serialize

▸ **_serialize**(): *object*

*Inherited from [BoxShape](boxshape.md).[_serialize](boxshape.md#_serialize)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:75](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L75)*

**Returns:** *object*

* **type**: *"circle" | "edge" | "polygon" | "chain"* = this.m_type

* **vertices**: *Vec2‹›[]* = this.m_vertices

___

###  _setAsBox

▸ **_setAsBox**(`hx`: number, `hy`: number): *void*

*Inherited from [BoxShape](boxshape.md).[_setAsBox](boxshape.md#_setasbox)*

*Defined in [src/collision/shape/PolygonShape.ts:259](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L259)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |

**Returns:** *void*

___

###  computeAABB

▸ **computeAABB**(`aabb`: AABB, `xf`: Transform, `childIndex`: number): *void*

*Inherited from [BoxShape](boxshape.md).[computeAABB](boxshape.md#computeaabb)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:387](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L387)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | AABB | Returns the axis aligned box. |
`xf` | Transform | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: DistanceProxy): *void*

*Inherited from [BoxShape](boxshape.md).[computeDistanceProxy](boxshape.md#computedistanceproxy)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:521](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L521)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | DistanceProxy |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: MassData, `density`: number): *void*

*Inherited from [BoxShape](boxshape.md).[computeMass](boxshape.md#computemass)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:412](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L412)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | MassData | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Inherited from [BoxShape](boxshape.md).[getChildCount](boxshape.md#getchildcount)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:123](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L123)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [EdgeShape](edgeshape.md).[getRadius](edgeshape.md#getradius)*

*Defined in [src/collision/Shape.ts:57](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L57)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[getType](circleshape.md#gettype)*

*Defined in [src/collision/Shape.ts:67](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L67)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  getVertex

▸ **getVertex**(`index`: number): *Vec2‹›*

*Inherited from [BoxShape](boxshape.md).[getVertex](boxshape.md#getvertex)*

*Defined in [src/collision/shape/PolygonShape.ts:95](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *Vec2‹›*

___

###  rayCast

▸ **rayCast**(`output`: RayCastOutput, `input`: RayCastInput, `xf`: Transform, `childIndex`: number): *boolean*

*Inherited from [BoxShape](boxshape.md).[rayCast](boxshape.md#raycast)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:319](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L319)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | RayCastOutput | The ray-cast results. |
`input` | RayCastInput | The ray-cast input parameters. |
`xf` | Transform | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

###  testPoint

▸ **testPoint**(`xf`: Transform, `p`: Vec2): *boolean*

*Inherited from [BoxShape](boxshape.md).[testPoint](boxshape.md#testpoint)*

*Overrides void*

*Defined in [src/collision/shape/PolygonShape.ts:298](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L298)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | Transform | The shape world transform. |
`p` | Vec2 | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

*Inherited from [BoxShape](boxshape.md).[validate](boxshape.md#validate)*

*Defined in [src/collision/shape/PolygonShape.ts:498](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L498)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `fixture`: any, `restore`: any): *PolygonShape‹›*

*Inherited from [BoxShape](boxshape.md).[_deserialize](boxshape.md#static-_deserialize)*

*Overrides [ChainShape](chainshape.md).[_deserialize](chainshape.md#static-_deserialize)*

*Defined in [src/collision/shape/PolygonShape.ts:83](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/PolygonShape.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`fixture` | any |
`restore` | any |

**Returns:** *PolygonShape‹›*

___

### `Static` isValid

▸ **isValid**(`shape`: Shape | null | undefined): *shape is Shape*

*Inherited from [CircleShape](circleshape.md).[isValid](circleshape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:53](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape &#124; null &#124; undefined |

**Returns:** *shape is Shape*
