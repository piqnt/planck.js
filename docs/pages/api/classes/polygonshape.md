
# Class: PolygonShape

A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape

## Hierarchy

* [Shape](/api/classes/shape)

  ↳ **PolygonShape**

  ↳ [BoxShape](/api/classes/boxshape)

## Index

### Constructors

* [constructor](/api/classes/polygonshape#constructor)

### Properties

* [style](/api/classes/polygonshape#style)
* [TYPE](/api/classes/polygonshape#static-type)

### Methods

* [computeAABB](/api/classes/polygonshape#computeaabb)
* [computeDistanceProxy](/api/classes/polygonshape#computedistanceproxy)
* [computeMass](/api/classes/polygonshape#computemass)
* [getChildCount](/api/classes/polygonshape#getchildcount)
* [getRadius](/api/classes/polygonshape#getradius)
* [getType](/api/classes/polygonshape#gettype)
* [rayCast](/api/classes/polygonshape#raycast)
* [testPoint](/api/classes/polygonshape#testpoint)
* [validate](/api/classes/polygonshape#validate)
* [isValid](/api/classes/polygonshape#static-isvalid)

## Constructors

###  constructor

\+ **new PolygonShape**(`vertices?`: [Vec2Value](/api/interfaces/vec2value)[]): *[PolygonShape](/api/classes/polygonshape)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2Value](/api/interfaces/vec2value)[] |

**Returns:** *[PolygonShape](/api/classes/polygonshape)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Shape](/api/classes/shape).[style](/api/classes/shape#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as const

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `xf`: [TransformValue](/api/globals#transformvalue), `childIndex`: number): *void*

*Overrides [Shape](/api/classes/shape).[computeAABB](/api/classes/shape#abstract-computeaabb)*

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

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](/api/classes/distanceproxy)): *void*

*Overrides [Shape](/api/classes/shape).[computeDistanceProxy](/api/classes/shape#abstract-computedistanceproxy)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](/api/classes/distanceproxy) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](/api/interfaces/massdata), `density`: number): *void*

*Overrides [Shape](/api/classes/shape).[computeMass](/api/classes/shape#abstract-computemass)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](/api/interfaces/massdata) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides [Shape](/api/classes/shape).[getChildCount](/api/classes/shape#abstract-getchildcount)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](/api/classes/shape).[getRadius](/api/classes/shape#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"polygon"*

*Overrides [Shape](/api/classes/shape).[getType](/api/classes/shape#abstract-gettype)*

**Returns:** *"polygon"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](/api/interfaces/raycastoutput), `input`: [RayCastInput](/api/interfaces/raycastinput), `xf`: [Transform](/api/classes/transform), `childIndex`: number): *boolean*

*Overrides [Shape](/api/classes/shape).[rayCast](/api/classes/shape#abstract-raycast)*

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

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: Vec2): *boolean*

*Overrides [Shape](/api/classes/shape).[testPoint](/api/classes/shape#abstract-testpoint)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) | The shape world transform. |
`p` | Vec2 | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Inherited from [Shape](/api/classes/shape).[isValid](/api/classes/shape#static-isvalid)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
