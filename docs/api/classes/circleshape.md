[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [CircleShape](circleshape.md)

# Class: CircleShape

## Hierarchy

* [Shape](shape.md)

  ↳ **CircleShape**

## Index

### Constructors

* [constructor](circleshape.md#constructor)

### Properties

* [m_p](circleshape.md#m_p)
* [m_radius](circleshape.md#m_radius)
* [m_type](circleshape.md#m_type)
* [TYPE](circleshape.md#static-type)

### Methods

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
* [isValid](circleshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new CircleShape**(`position`: [Vec2](vec2.md), `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [src/collision/shape/CircleShape.ts:42](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

\+ **new CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [src/collision/shape/CircleShape.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

## Properties

###  m_p

• **m_p**: *[Vec2](vec2.md)*

*Defined in [src/collision/shape/CircleShape.ts:42](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L42)*

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

### `Static` TYPE

▪ **TYPE**: *"circle"* = 'circle' as 'circle'

*Defined in [src/collision/shape/CircleShape.ts:40](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L40)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [src/collision/shape/CircleShape.ts:187](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L187)*

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

*Defined in [src/collision/shape/CircleShape.ts:208](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [src/collision/shape/CircleShape.ts:200](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L200)*

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

*Defined in [src/collision/shape/CircleShape.ts:92](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L92)*

**Returns:** *[Vec2](vec2.md)*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [src/collision/shape/CircleShape.ts:118](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L118)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#getradius)*

*Defined in [src/collision/shape/CircleShape.ts:88](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L88)*

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

▸ **getVertex**(`index`: 0): *[Vec2](vec2.md)*

*Defined in [src/collision/shape/CircleShape.ts:96](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | 0 |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [src/collision/shape/CircleShape.ts:143](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L143)*

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

*Defined in [src/collision/shape/CircleShape.ts:129](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/shape/CircleShape.ts#L129)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

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
