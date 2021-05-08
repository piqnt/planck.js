[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Shape](shape.md)

# Class: Shape

A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.

## Hierarchy

* **Shape**

  ↳ [CircleShape](circleshape.md)

  ↳ [EdgeShape](edgeshape.md)

  ↳ [PolygonShape](polygonshape.md)

  ↳ [ChainShape](chainshape.md)

## Index

### Properties

* [m_radius](shape.md#m_radius)
* [m_type](shape.md#m_type)

### Methods

* [computeAABB](shape.md#abstract-computeaabb)
* [computeDistanceProxy](shape.md#abstract-computedistanceproxy)
* [computeMass](shape.md#abstract-computemass)
* [getChildCount](shape.md#abstract-getchildcount)
* [getRadius](shape.md#getradius)
* [getType](shape.md#gettype)
* [rayCast](shape.md#abstract-raycast)
* [testPoint](shape.md#abstract-testpoint)
* [isValid](shape.md#static-isvalid)

## Properties

###  m_radius

• **m_radius**: *number*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L38)*

## Methods

### `Abstract` computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Defined in [src/collision/Shape.ts:115](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L115)*

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

### `Abstract` computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md), `childIndex`: number): *void*

*Defined in [src/collision/Shape.ts:126](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |
`childIndex` | number |

**Returns:** *void*

___

### `Abstract` computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Defined in [src/collision/Shape.ts:124](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L124)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

### `Abstract` getChildCount

▸ **getChildCount**(): *number*

*Defined in [src/collision/Shape.ts:86](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L86)*

Get the number of child primitives.

**Returns:** *number*

___

###  getRadius

▸ **getRadius**(): *number*

*Defined in [src/collision/Shape.ts:61](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L61)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [src/collision/Shape.ts:71](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L71)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

### `Abstract` rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Defined in [src/collision/Shape.ts:105](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L105)*

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

### `Abstract` testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *boolean*

*Defined in [src/collision/Shape.ts:95](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L95)*

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

*Defined in [src/collision/Shape.ts:57](https://github.com/shakiba/planck.js/blob/1523746/src/collision/Shape.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
