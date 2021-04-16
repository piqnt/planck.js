[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ChainShape](chainshape.md)

# Class: ChainShape

A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.
A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.

WARNING: The chain will not collide properly if there are self-intersections.

WARNING: The chain will not collide properly if there are self-intersections.

## Hierarchy

* any

* Shape

  ↳ **ChainShape**

## Callable

▸ **ChainShape**(`vertices?`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [dist/planck.d.ts:2276](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2276)*

A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.
A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.

WARNING: The chain will not collide properly if there are self-intersections.

WARNING: The chain will not collide properly if there are self-intersections.

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

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
* [_deserialize](chainshape.md#_deserialize)
* [_reset](chainshape.md#_reset)
* [_serialize](chainshape.md#_serialize)
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
* [_deserialize](chainshape.md#static-_deserialize)
* [isValid](chainshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices?`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [dist/planck.d.ts:2293](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2293)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [dist/planck.d.ts:2288](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2288)*

*Defined in [src/collision/shape/ChainShape.ts:51](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L51)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [dist/planck.d.ts:2292](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2292)*

*Defined in [src/collision/shape/ChainShape.ts:55](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L55)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [dist/planck.d.ts:2291](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2291)*

*Defined in [src/collision/shape/ChainShape.ts:54](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L54)*

___

###  m_isLoop

• **m_isLoop**: *boolean*

*Defined in [dist/planck.d.ts:2293](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2293)*

*Defined in [src/collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L57)*

___

###  m_nextVertex

• **m_nextVertex**: *Vec2 | null*

*Defined in [dist/planck.d.ts:2290](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2290)*

*Defined in [src/collision/shape/ChainShape.ts:53](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L53)*

___

###  m_prevVertex

• **m_prevVertex**: *Vec2 | null*

*Defined in [dist/planck.d.ts:2289](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2289)*

*Defined in [src/collision/shape/ChainShape.ts:52](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L52)*

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

*Defined in [dist/planck.d.ts:2287](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2287)*

*Defined in [src/collision/shape/ChainShape.ts:50](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"chain"* = 'chain' as 'chain'

*Defined in [dist/planck.d.ts:2286](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2286)*

*Defined in [src/collision/shape/ChainShape.ts:48](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/ChainShape.ts#L48)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [CircleShape](circleshape.md).[TYPES](circleshape.md#static-types)*

*Defined in [src/collision/Shape.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L46)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[ChainShape](chainshape.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2339](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2339)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[ChainShape](chainshape.md)*

___

###  _createChain

▸ **_createChain**(`vertices`: [Vec2](vec2.md)[]): *this*

*Defined in [dist/planck.d.ts:2322](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2322)*

Create a chain with isolated end vertices.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vertices` | [Vec2](vec2.md)[] | an array of vertices, these are copied |

**Returns:** *this*

___

###  _createLoop

▸ **_createLoop**(`vertices`: [Vec2](vec2.md)[]): *this*

*Defined in [dist/planck.d.ts:2315](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2315)*

Create a loop. This automatically adjusts connectivity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vertices` | [Vec2](vec2.md)[] | an array of vertices, these are copied |

**Returns:** *this*

___

###  _deserialize

▸ **_deserialize**(`data`: any, `fixture`: any, `restore`: any): *[ChainShape](chainshape.md)*

*Defined in [dist/planck.d.ts:2304](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2304)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`fixture` | any |
`restore` | any |

**Returns:** *[ChainShape](chainshape.md)*

___

###  _reset

▸ **_reset**(): *void*

*Overrides [CircleShape](circleshape.md).[_reset](circleshape.md#_reset)*

*Defined in [dist/planck.d.ts:2323](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2323)*

**Returns:** *void*

___

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [dist/planck.d.ts:2295](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2295)*

**Returns:** *object*

* **hasNextVertex**: *boolean*

* **hasPrevVertex**: *boolean*

* **isLoop**: *boolean*

* **nextVertex**: *[Vec2](vec2.md)*

* **prevVertex**: *[Vec2](vec2.md)*

* **type**: *[ShapeType](../globals.md#shapetype)*

* **vertices**: *[Vec2](vec2.md)[]*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2374](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2374)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2385](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2385)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |
`childIndex` | number |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2384](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2384)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2343](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2343)*

Get the number of child primitives.

**Returns:** *number*

___

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [dist/planck.d.ts:2345](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2345)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

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

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2346](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2346)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2365](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2365)*

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

*Defined in [dist/planck.d.ts:2333](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2333)*

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

*Defined in [dist/planck.d.ts:2328](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2328)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2356](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2356)*

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

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `context`: any, `restore`: any): *any*

*Inherited from [ChainShape](chainshape.md).[_deserialize](chainshape.md#static-_deserialize)*

*Defined in [src/collision/Shape.ts:48](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | any |
`restore` | any |

**Returns:** *any*

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
