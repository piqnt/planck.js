
# Class: Shape

A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.

## Hierarchy

* **Shape**

  ↳ [PolygonShape](/api/classes/polygonshape)

  ↳ [EdgeShape](/api/classes/edgeshape)

  ↳ [ChainShape](/api/classes/chainshape)

  ↳ [CircleShape](/api/classes/circleshape)

## Index

### Properties

* [style](/api/classes/shape#style)

### Methods

* [computeAABB](/api/classes/shape#abstract-computeaabb)
* [computeDistanceProxy](/api/classes/shape#abstract-computedistanceproxy)
* [computeMass](/api/classes/shape#abstract-computemass)
* [getChildCount](/api/classes/shape#abstract-getchildcount)
* [getRadius](/api/classes/shape#abstract-getradius)
* [getType](/api/classes/shape#abstract-gettype)
* [rayCast](/api/classes/shape#abstract-raycast)
* [testPoint](/api/classes/shape#abstract-testpoint)
* [isValid](/api/classes/shape#static-isvalid)

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

Styling for dev-tools.

## Methods

### `Abstract` computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `xf`: [TransformValue](/api/globals#transformvalue), `childIndex`: number): *void*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) | Returns the axis aligned box. |
`xf` | [TransformValue](/api/globals#transformvalue) | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

### `Abstract` computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](/api/classes/distanceproxy), `childIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](/api/classes/distanceproxy) |
`childIndex` | number |

**Returns:** *void*

___

### `Abstract` computeMass

▸ **computeMass**(`massData`: [MassData](/api/interfaces/massdata), `density?`: number): *void*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](/api/interfaces/massdata) | Returns the mass data for this shape. |
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

▸ **getType**(): *[ShapeType](/api/globals#shapetype)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](/api/globals#shapetype)*

the shape type.

___

### `Abstract` rayCast

▸ **rayCast**(`output`: [RayCastOutput](/api/interfaces/raycastoutput), `input`: [RayCastInput](/api/interfaces/raycastinput), `xf`: [Transform](/api/classes/transform), `childIndex`: number): *boolean*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | [RayCastOutput](/api/interfaces/raycastoutput) | The ray-cast results. |
`input` | [RayCastInput](/api/interfaces/raycastinput) | The ray-cast input parameters. |
`xf` | [Transform](/api/classes/transform) | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

### `Abstract` testPoint

▸ **testPoint**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: [Vec2Value](/api/interfaces/vec2value)): *boolean*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) | The shape world transform. |
`p` | [Vec2Value](/api/interfaces/vec2value) | A point in world coordinates.  |

**Returns:** *boolean*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
