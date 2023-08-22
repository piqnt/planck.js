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

### Methods

* [_set](edgeshape.md#_set)
* [computeAABB](edgeshape.md#computeaabb)
* [computeDistanceProxy](edgeshape.md#computedistanceproxy)
* [computeMass](edgeshape.md#computemass)
* [getChildCount](edgeshape.md#getchildcount)
* [getNextVertex](edgeshape.md#getnextvertex)
* [getPrevVertex](edgeshape.md#getprevvertex)
* [getRadius](edgeshape.md#getradius)
* [getType](edgeshape.md#gettype)
* [rayCast](edgeshape.md#raycast)
* [setNextVertex](edgeshape.md#setnextvertex)
* [setPrevVertex](edgeshape.md#setprevvertex)
* [testPoint](edgeshape.md#testpoint)
* [isValid](edgeshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new EdgeShape**(`v1?`: [Vec2Value](../interfaces/vec2value.md), `v2?`: [Vec2Value](../interfaces/vec2value.md)): *[EdgeShape](edgeshape.md)*

*Defined in [collision/shape/EdgeShape.ts:62](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2Value](../interfaces/vec2value.md) |
`v2?` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

*Defined in [collision/shape/EdgeShape.ts:61](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L61)*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

*Defined in [collision/shape/EdgeShape.ts:62](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L62)*

___

###  m_radius

• **m_radius**: *number*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [collision/shape/EdgeShape.ts:51](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L51)*

___

###  m_type

• **m_type**: *"edge"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [collision/shape/EdgeShape.ts:49](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L49)*

___

###  m_vertex0

• **m_vertex0**: *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:59](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L59)*

___

###  m_vertex1

• **m_vertex1**: *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:54](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L54)*

___

###  m_vertex2

• **m_vertex2**: *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:55](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L55)*

___

###  m_vertex3

• **m_vertex3**: *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:60](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L60)*

___

### `Static` TYPE

▪ **TYPE**: *"edge"* = 'edge' as const

*Defined in [collision/shape/EdgeShape.ts:48](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L48)*

## Methods

###  _set

▸ **_set**(`v1`: [Vec2](vec2.md), `v2`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [collision/shape/EdgeShape.ts:179](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L179)*

Set this as an isolated edge.

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2](vec2.md) |
`v2` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [collision/shape/EdgeShape.ts:297](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L297)*

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

*Defined in [collision/shape/EdgeShape.ts:318](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L318)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [collision/shape/EdgeShape.ts:312](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L312)*

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

*Defined in [collision/shape/EdgeShape.ts:208](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L208)*

Get the number of child primitives.

**Returns:** *1*

___

###  getNextVertex

▸ **getNextVertex**(): *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:146](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L146)*

Optional next vertex, used for smooth collision.

**Returns:** *[Vec2](vec2.md)*

___

###  getPrevVertex

▸ **getPrevVertex**(): *[Vec2](vec2.md)*

*Defined in [collision/shape/EdgeShape.ts:172](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L172)*

Optional prev vertex, used for smooth collision.

**Returns:** *[Vec2](vec2.md)*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

*Defined in [collision/shape/EdgeShape.ts:116](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L116)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"edge"*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

*Defined in [collision/shape/EdgeShape.ts:120](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L120)*

**Returns:** *"edge"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [collision/shape/EdgeShape.ts:231](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L231)*

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

###  setNextVertex

▸ **setNextVertex**(`v?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [collision/shape/EdgeShape.ts:132](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L132)*

Optional next vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  setPrevVertex

▸ **setPrevVertex**(`v?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [collision/shape/EdgeShape.ts:158](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L158)*

Optional prev vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2Value](../interfaces/vec2value.md)): *false*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [collision/shape/EdgeShape.ts:219](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/EdgeShape.ts#L219)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) | The shape world transform. |
`p` | [Vec2Value](../interfaces/vec2value.md) | A point in world coordinates.  |

**Returns:** *false*

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
