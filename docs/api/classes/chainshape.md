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

### Methods

* [computeAABB](chainshape.md#computeaabb)
* [computeDistanceProxy](chainshape.md#computedistanceproxy)
* [computeMass](chainshape.md#computemass)
* [getChildCount](chainshape.md#getchildcount)
* [getChildEdge](chainshape.md#getchildedge)
* [getNextVertex](chainshape.md#getnextvertex)
* [getPrevVertex](chainshape.md#getprevvertex)
* [getRadius](chainshape.md#getradius)
* [getType](chainshape.md#gettype)
* [getVertex](chainshape.md#getvertex)
* [isLoop](chainshape.md#isloop)
* [rayCast](chainshape.md#raycast)
* [setNextVertex](chainshape.md#setnextvertex)
* [setPrevVertex](chainshape.md#setprevvertex)
* [testPoint](chainshape.md#testpoint)
* [isValid](chainshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices?`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [src/collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [src/collision/shape/ChainShape.ts:51](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L51)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [src/collision/shape/ChainShape.ts:55](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L55)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [src/collision/shape/ChainShape.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L54)*

___

###  m_isLoop

• **m_isLoop**: *boolean*

*Defined in [src/collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L57)*

___

###  m_nextVertex

• **m_nextVertex**: *[Vec2](vec2.md) | null*

*Defined in [src/collision/shape/ChainShape.ts:53](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L53)*

___

###  m_prevVertex

• **m_prevVertex**: *[Vec2](vec2.md) | null*

*Defined in [src/collision/shape/ChainShape.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L52)*

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

*Defined in [src/collision/shape/ChainShape.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"chain"* = 'chain' as 'chain'

*Defined in [src/collision/shape/ChainShape.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L48)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [src/collision/shape/ChainShape.ts:327](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L327)*

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

*Defined in [src/collision/shape/ChainShape.ts:351](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L351)*

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

*Defined in [src/collision/shape/ChainShape.ts:345](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L345)*

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

*Defined in [src/collision/shape/ChainShape.ts:247](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L247)*

Get the number of child primitives.

**Returns:** *number*

___

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [src/collision/shape/ChainShape.ts:253](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

___

###  getNextVertex

▸ **getNextVertex**(): *[Vec2](vec2.md)*

*Defined in [src/collision/shape/ChainShape.ts:222](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L222)*

**Returns:** *[Vec2](vec2.md)*

___

###  getPrevVertex

▸ **getPrevVertex**(): *[Vec2](vec2.md)*

*Defined in [src/collision/shape/ChainShape.ts:209](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L209)*

**Returns:** *[Vec2](vec2.md)*

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

*Defined in [src/collision/shape/ChainShape.ts:278](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L278)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  isLoop

▸ **isLoop**(): *boolean*

*Defined in [src/collision/shape/ChainShape.ts:287](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L287)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [src/collision/shape/ChainShape.ts:312](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L312)*

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

▸ **setNextVertex**(`nextVertex`: [Vec2](vec2.md)): *void*

*Defined in [src/collision/shape/ChainShape.ts:217](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L217)*

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

*Defined in [src/collision/shape/ChainShape.ts:204](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L204)*

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

*Defined in [src/collision/shape/ChainShape.ts:300](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/ChainShape.ts#L300)*

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

*Defined in [src/collision/Shape.ts:58](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/Shape.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
