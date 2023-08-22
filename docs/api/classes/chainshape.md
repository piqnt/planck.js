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

\+ **new ChainShape**(`vertices?`: [Vec2Value](../interfaces/vec2value.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [collision/shape/ChainShape.ts:64](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2Value](../interfaces/vec2value.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [collision/shape/ChainShape.ts:58](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L58)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [collision/shape/ChainShape.ts:62](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L62)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [collision/shape/ChainShape.ts:61](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L61)*

___

###  m_isLoop

• **m_isLoop**: *boolean*

*Defined in [collision/shape/ChainShape.ts:64](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L64)*

___

###  m_nextVertex

• **m_nextVertex**: *[Vec2](vec2.md) | null*

*Defined in [collision/shape/ChainShape.ts:60](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L60)*

___

###  m_prevVertex

• **m_prevVertex**: *[Vec2](vec2.md) | null*

*Defined in [collision/shape/ChainShape.ts:59](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L59)*

___

###  m_radius

• **m_radius**: *number*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [collision/shape/ChainShape.ts:55](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L55)*

___

###  m_type

• **m_type**: *"chain"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [collision/shape/ChainShape.ts:53](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L53)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [collision/shape/ChainShape.ts:57](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L57)*

___

### `Static` TYPE

▪ **TYPE**: *"chain"* = 'chain' as const

*Defined in [collision/shape/ChainShape.ts:52](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L52)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [collision/shape/ChainShape.ts:343](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L343)*

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

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

*Defined in [collision/shape/ChainShape.ts:367](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L367)*

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

*Defined in [collision/shape/ChainShape.ts:361](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L361)*

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

*Defined in [collision/shape/ChainShape.ts:263](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L263)*

Get the number of child primitives.

**Returns:** *number*

___

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [collision/shape/ChainShape.ts:269](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L269)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

___

###  getNextVertex

▸ **getNextVertex**(): *[Vec2](vec2.md)*

*Defined in [collision/shape/ChainShape.ts:239](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L239)*

**Returns:** *[Vec2](vec2.md)*

___

###  getPrevVertex

▸ **getPrevVertex**(): *[Vec2](vec2.md)*

*Defined in [collision/shape/ChainShape.ts:226](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L226)*

**Returns:** *[Vec2](vec2.md)*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

*Defined in [collision/shape/ChainShape.ts:141](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L141)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"chain"*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

*Defined in [collision/shape/ChainShape.ts:137](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L137)*

**Returns:** *"chain"*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [collision/shape/ChainShape.ts:294](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L294)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  isLoop

▸ **isLoop**(): *boolean*

*Defined in [collision/shape/ChainShape.ts:303](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L303)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [collision/shape/ChainShape.ts:328](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L328)*

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

*Defined in [collision/shape/ChainShape.ts:234](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L234)*

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

*Defined in [collision/shape/ChainShape.ts:221](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L221)*

Establish connectivity to a vertex that precedes the first vertex. Don't call
this for loops.

**Parameters:**

Name | Type |
------ | ------ |
`prevVertex` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2Value](../interfaces/vec2value.md)): *false*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [collision/shape/ChainShape.ts:316](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/shape/ChainShape.ts#L316)*

Test a point for containment in this shape. This only works for convex
shapes.

This always return false.

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
