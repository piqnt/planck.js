[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Shape](shape.md)

# Class: Shape

A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.

## Hierarchy

* **Shape**

  ↳ [PolygonShape](polygonshape.md)

  ↳ [EdgeShape](edgeshape.md)

  ↳ [ChainShape](chainshape.md)

  ↳ [CircleShape](circleshape.md)

## Index

### Properties

* [m_radius](shape.md#m_radius)
* [m_type](shape.md#m_type)

### Methods

* [computeAABB](shape.md#abstract-computeaabb)
* [computeDistanceProxy](shape.md#abstract-computedistanceproxy)
* [computeMass](shape.md#abstract-computemass)
* [getChildCount](shape.md#abstract-getchildcount)
* [getRadius](shape.md#abstract-getradius)
* [getType](shape.md#abstract-gettype)
* [rayCast](shape.md#abstract-raycast)
* [testPoint](shape.md#abstract-testpoint)
* [isValid](shape.md#static-isvalid)

## Properties

###  m_radius

• **m_radius**: *number*

Radius of a shape. For polygonal shapes this must be b2_polygonRadius.
There is no support for making rounded polygons.

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

## Methods

### `Abstract` computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

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

### `Abstract` computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md), `childIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |
`childIndex` | number |

**Returns:** *void*

___

### `Abstract` computeMass

▸ **computeMass**(`massData`: [MassData](../interfaces/massdata.md), `density?`: number): *void*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

### `Abstract` getChildCount

▸ **getChildCount**(): *number*

Get the number of child primitives.

**Returns:** *number*

___

### `Abstract` getRadius

▸ **getRadius**(): *number*

**Returns:** *number*

___

### `Abstract` getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

### `Abstract` rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

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

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2Value](../interfaces/vec2value.md)): *boolean*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) | The shape world transform. |
`p` | [Vec2Value](../interfaces/vec2value.md) | A point in world coordinates.  |

**Returns:** *boolean*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
