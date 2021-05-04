[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ChainShape](chainshape.md)

# Class: ChainShape

A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.

WARNING: The chain will not collide properly if there are self-intersections.

## Hierarchy

* [Shape](shape.md)

  ↳ **ChainShape**

## Index

### Constructors

* [constructor](chainshape.md#constructor)

### Properties

* [m_count](chainshape.md#m_count)
* [m_hasNextVertex](chainshape.md#m_hasnextvertex)
* [m_hasPrevVertex](chainshape.md#m_hasprevvertex)
* [m_isLoop](chainshape.md#m_isloop)
* [m_nextVertex](chainshape.md#m_nextvertex)
* [m_prevVertex](chainshape.md#m_prevvertex)
* [m_radius](chainshape.md#m_radius)
* [m_type](chainshape.md#m_type)
* [m_vertices](chainshape.md#m_vertices)
* [TYPE](chainshape.md#static-type)
* [TYPES](chainshape.md#static-types)

### Methods

* [_clone](chainshape.md#_clone)
* [_createChain](chainshape.md#_createchain)
* [_createLoop](chainshape.md#_createloop)
* [_reset](chainshape.md#_reset)
* [computeAABB](chainshape.md#computeaabb)
* [computeDistanceProxy](chainshape.md#computedistanceproxy)
* [computeMass](chainshape.md#computemass)
* [getChildCount](chainshape.md#getchildcount)
* [getChildEdge](chainshape.md#getchildedge)
* [getRadius](chainshape.md#getradius)
* [getType](chainshape.md#gettype)
* [getVertex](chainshape.md#getvertex)
* [rayCast](chainshape.md#raycast)
* [setNextVertex](chainshape.md#setnextvertex)
* [setPrevVertex](chainshape.md#setprevvertex)
* [testPoint](chainshape.md#testpoint)
* [isValid](chainshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices?`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [collision/shape/ChainShape.ts:51](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L51)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [collision/shape/ChainShape.ts:55](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L55)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [collision/shape/ChainShape.ts:54](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L54)*

___

###  m_isLoop

• **m_isLoop**: *boolean*

*Defined in [collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L57)*

___

###  m_nextVertex

• **m_nextVertex**: *[Vec2](vec2.md) | null*

*Defined in [collision/shape/ChainShape.ts:53](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L53)*

___

###  m_prevVertex

• **m_prevVertex**: *[Vec2](vec2.md) | null*

*Defined in [collision/shape/ChainShape.ts:52](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L52)*

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

*Defined in [collision/shape/ChainShape.ts:50](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"chain"* = 'chain' as 'chain'

*Defined in [collision/shape/ChainShape.ts:48](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L48)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [Shape](shape.md).[TYPES](shape.md#static-types)*

*Defined in [collision/Shape.ts:47](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L47)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[ChainShape](chainshape.md)‹›*

*Overrides [Shape](shape.md).[_clone](shape.md#abstract-_clone)*

*Defined in [collision/shape/ChainShape.ts:219](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L219)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[ChainShape](chainshape.md)‹›*

___

###  _createChain

▸ **_createChain**(`vertices`: [Vec2](vec2.md)[]): *this*

*Defined in [collision/shape/ChainShape.ts:166](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L166)*

Create a chain with isolated end vertices.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vertices` | [Vec2](vec2.md)[] | an array of vertices, these are copied |

**Returns:** *this*

___

###  _createLoop

▸ **_createLoop**(`vertices`: [Vec2](vec2.md)[]): *this*

*Defined in [collision/shape/ChainShape.ts:136](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L136)*

Create a loop. This automatically adjusts connectivity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vertices` | [Vec2](vec2.md)[] | an array of vertices, these are copied |

**Returns:** *this*

___

###  _reset

▸ **_reset**(): *void*

*Overrides [Shape](shape.md).[_reset](shape.md#_reset)*

*Defined in [collision/shape/ChainShape.ts:188](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L188)*

**Returns:** *void*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [collision/shape/ChainShape.ts:310](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L310)*

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

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

*Defined in [collision/shape/ChainShape.ts:334](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L334)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |
`childIndex` | number |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [collision/shape/ChainShape.ts:328](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L328)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

Chains have zero mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *number*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [collision/shape/ChainShape.ts:234](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L234)*

Get the number of child primitives.

**Returns:** *number*

___

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [collision/shape/ChainShape.ts:240](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

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

*Defined in [collision/shape/ChainShape.ts:265](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L265)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [collision/shape/ChainShape.ts:295](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L295)*

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

###  setNextVertex

▸ **setNextVertex**(`nextVertex`: [Vec2](vec2.md)): *void*

*Defined in [collision/shape/ChainShape.ts:209](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L209)*

Establish connectivity to a vertex that follows the last vertex. Don't call
this for loops.

**Parameters:**

Name | Type |
------ | ------ |
`nextVertex` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setPrevVertex

▸ **setPrevVertex**(`prevVertex`: [Vec2](vec2.md)): *void*

*Defined in [collision/shape/ChainShape.ts:200](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L200)*

Establish connectivity to a vertex that precedes the first vertex. Don't call
this for loops.

**Parameters:**

Name | Type |
------ | ------ |
`prevVertex` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *false*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [collision/shape/ChainShape.ts:283](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/shape/ChainShape.ts#L283)*

Test a point for containment in this shape. This only works for convex
shapes.

This always return false.

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

*Defined in [collision/Shape.ts:55](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/Shape.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
