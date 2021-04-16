[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [CircleShape](circleshape.md)

# Class: CircleShape

## Hierarchy

* any

* Shape

  ↳ **CircleShape**

## Callable

▸ **CircleShape**(`position`: [Vec2](vec2.md), `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [dist/planck.d.ts:2051](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2051)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

▸ **CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [dist/planck.d.ts:2052](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2052)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

## Index

### Constructors

* [constructor](circleshape.md#constructor)

### Properties

* [m_radius](circleshape.md#m_radius)
* [m_type](circleshape.md#m_type)
* [TYPE](circleshape.md#static-type)
* [TYPES](circleshape.md#static-types)

### Methods

* [_clone](circleshape.md#_clone)
* [_reset](circleshape.md#_reset)
* [_serialize](circleshape.md#_serialize)
* [computeAABB](circleshape.md#computeaabb)
* [computeDistanceProxy](circleshape.md#computedistanceproxy)
* [computeMass](circleshape.md#computemass)
* [getCenter](circleshape.md#getcenter)
* [getChildCount](circleshape.md#getchildcount)
* [getRadius](circleshape.md#getradius)
* [getType](circleshape.md#gettype)
* [getVertex](circleshape.md#getvertex)
* [rayCast](circleshape.md#raycast)
* [testPoint](circleshape.md#testpoint)
* [_deserialize](circleshape.md#static-_deserialize)
* [isValid](circleshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new CircleShape**(`position`: [Vec2](vec2.md), `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [dist/planck.d.ts:2055](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2055)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

\+ **new CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [dist/planck.d.ts:2056](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2056)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

\+ **new CircleShape**(`position`: Vec2, `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [src/collision/shape/CircleShape.ts:42](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/CircleShape.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

\+ **new CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [src/collision/shape/CircleShape.ts:44](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/CircleShape.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

## Properties

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

### `Static` TYPE

▪ **TYPE**: *"circle"* = 'circle' as 'circle'

*Defined in [dist/planck.d.ts:2054](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2054)*

*Defined in [src/collision/shape/CircleShape.ts:40](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/shape/CircleShape.ts#L40)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [CircleShape](circleshape.md).[TYPES](circleshape.md#static-types)*

*Defined in [src/collision/Shape.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L46)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[CircleShape](circleshape.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2073](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2073)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[CircleShape](circleshape.md)*

___

###  _reset

▸ **_reset**(): *void*

*Inherited from [CircleShape](circleshape.md).[_reset](circleshape.md#_reset)*

*Defined in [src/collision/Shape.ts:41](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L41)*

**Returns:** *void*

___

###  _serialize

▸ **_serialize**(): *object*

*Overrides void*

*Defined in [dist/planck.d.ts:2058](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2058)*

**Returns:** *object*

* **p**: *[Vec2](vec2.md)*

* **radius**: *number*

* **type**: *[ShapeType](../globals.md#shapetype)*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2107](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2107)*

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

*Overrides void*

*Defined in [dist/planck.d.ts:2116](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2116)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2115](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2115)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2066](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2066)*

**Returns:** *[Vec2](vec2.md)*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides void*

*Defined in [dist/planck.d.ts:2077](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2077)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [EdgeShape](edgeshape.md).[getRadius](edgeshape.md#getradius)*

*Defined in [dist/planck.d.ts:2065](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2065)*

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

▸ **getVertex**(`index`: 0): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2067](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2067)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | 0 |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2098](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2098)*

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

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2085](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2085)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any): *[CircleShape](circleshape.md)*

*Overrides [ChainShape](chainshape.md).[_deserialize](chainshape.md#static-_deserialize)*

*Defined in [dist/planck.d.ts:2063](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2063)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[CircleShape](circleshape.md)*

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
