---
showOutline: false
---

# Class: BoxShape

A rectangle polygon which extend PolygonShape.

## Hierarchy

  ↳ [PolygonShape](/api/classes/polygonshape)

  ↳ **BoxShape**

## Index

### Constructors

* [constructor](/api/classes/boxshape#constructor)

### Properties

* [m_centroid](/api/classes/boxshape#m_centroid)
* [m_count](/api/classes/boxshape#m_count)
* [m_normals](/api/classes/boxshape#m_normals)
* [m_radius](/api/classes/boxshape#m_radius)
* [m_type](/api/classes/boxshape#m_type)
* [m_vertices](/api/classes/boxshape#m_vertices)
* [style](/api/classes/boxshape#style)
* [TYPE](/api/classes/boxshape#static-type)

### Methods

* [computeAABB](/api/classes/boxshape#computeaabb)
* [computeDistanceProxy](/api/classes/boxshape#computedistanceproxy)
* [computeMass](/api/classes/boxshape#computemass)
* [getChildCount](/api/classes/boxshape#getchildcount)
* [getRadius](/api/classes/boxshape#getradius)
* [getType](/api/classes/boxshape#gettype)
* [rayCast](/api/classes/boxshape#raycast)
* [testPoint](/api/classes/boxshape#testpoint)
* [validate](/api/classes/boxshape#validate)
* [isValid](/api/classes/boxshape#static-isvalid)

## Constructors

###  constructor

\+ **new BoxShape**(`hx`: number, `hy`: number, `center?`: [Vec2Value](/api/interfaces/vec2value), `angle?`: number): *[BoxShape](/api/classes/boxshape)*

*Overrides [PolygonShape](/api/classes/polygonshape).[constructor](/api/classes/polygonshape#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |
`center?` | [Vec2Value](/api/interfaces/vec2value) |
`angle?` | number |

**Returns:** *[BoxShape](/api/classes/boxshape)*

## Properties

###  m_centroid

• **m_centroid**: *Vec2*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_centroid](/api/classes/polygonshape#m_centroid)*

___

###  m_count

• **m_count**: *number*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_count](/api/classes/polygonshape#m_count)*

___

###  m_normals

• **m_normals**: *Vec2[]*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_normals](/api/classes/polygonshape#m_normals)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_radius](/api/classes/polygonshape#m_radius)*

*Overrides [Shape](/api/classes/shape).[m_radius](/api/classes/shape#m_radius)*

___

###  m_type

• **m_type**: *"polygon"*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_type](/api/classes/polygonshape#m_type)*

*Overrides [Shape](/api/classes/shape).[m_type](/api/classes/shape#m_type)*

___

###  m_vertices

• **m_vertices**: *Vec2[]*

*Inherited from [PolygonShape](/api/classes/polygonshape).[m_vertices](/api/classes/polygonshape#m_vertices)*

___

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Shape](/api/classes/shape).[style](/api/classes/shape#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as const

*Overrides [PolygonShape](/api/classes/polygonshape).[TYPE](/api/classes/polygonshape#static-type)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `xf`: [TransformValue](/api/globals#transformvalue), `childIndex`: number): *void*

*Inherited from [PolygonShape](/api/classes/polygonshape).[computeAABB](/api/classes/polygonshape#computeaabb)*

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

*Inherited from [PolygonShape](/api/classes/polygonshape).[computeDistanceProxy](/api/classes/polygonshape#computedistanceproxy)*

*Overrides [Shape](/api/classes/shape).[computeDistanceProxy](/api/classes/shape#abstract-computedistanceproxy)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](/api/classes/distanceproxy) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](/api/interfaces/massdata), `density`: number): *void*

*Inherited from [PolygonShape](/api/classes/polygonshape).[computeMass](/api/classes/polygonshape#computemass)*

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

*Inherited from [PolygonShape](/api/classes/polygonshape).[getChildCount](/api/classes/polygonshape#getchildcount)*

*Overrides [Shape](/api/classes/shape).[getChildCount](/api/classes/shape#abstract-getchildcount)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [PolygonShape](/api/classes/polygonshape).[getRadius](/api/classes/polygonshape#getradius)*

*Overrides [Shape](/api/classes/shape).[getRadius](/api/classes/shape#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"polygon"*

*Inherited from [PolygonShape](/api/classes/polygonshape).[getType](/api/classes/polygonshape#gettype)*

*Overrides [Shape](/api/classes/shape).[getType](/api/classes/shape#abstract-gettype)*

**Returns:** *"polygon"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](/api/interfaces/raycastoutput), `input`: [RayCastInput](/api/interfaces/raycastinput), `xf`: [Transform](/api/classes/transform), `childIndex`: number): *boolean*

*Inherited from [PolygonShape](/api/classes/polygonshape).[rayCast](/api/classes/polygonshape#raycast)*

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

*Inherited from [PolygonShape](/api/classes/polygonshape).[testPoint](/api/classes/polygonshape#testpoint)*

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

*Inherited from [PolygonShape](/api/classes/polygonshape).[validate](/api/classes/polygonshape#validate)*

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
