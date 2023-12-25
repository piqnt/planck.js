[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BoxShape](boxshape.md)

# Class: BoxShape

A rectangle polygon which extend PolygonShape.

## Hierarchy

  ↳ [PolygonShape](polygonshape.md)

  ↳ **BoxShape**

## Index

### Constructors

* [constructor](boxshape.md#constructor)

### Properties

* [m_centroid](boxshape.md#m_centroid)
* [m_count](boxshape.md#m_count)
* [m_normals](boxshape.md#m_normals)
* [m_radius](boxshape.md#m_radius)
* [m_type](boxshape.md#m_type)
* [m_vertices](boxshape.md#m_vertices)
* [style](boxshape.md#style)
* [TYPE](boxshape.md#static-type)

### Methods

* [computeAABB](boxshape.md#computeaabb)
* [computeDistanceProxy](boxshape.md#computedistanceproxy)
* [computeMass](boxshape.md#computemass)
* [getChildCount](boxshape.md#getchildcount)
* [getRadius](boxshape.md#getradius)
* [getType](boxshape.md#gettype)
* [rayCast](boxshape.md#raycast)
* [testPoint](boxshape.md#testpoint)
* [validate](boxshape.md#validate)
* [isValid](boxshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new BoxShape**(`hx`: number, `hy`: number, `center?`: [Vec2Value](../interfaces/vec2value.md), `angle?`: number): *[BoxShape](boxshape.md)*

*Overrides [PolygonShape](polygonshape.md).[constructor](polygonshape.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |
`center?` | [Vec2Value](../interfaces/vec2value.md) |
`angle?` | number |

**Returns:** *[BoxShape](boxshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *Vec2*

*Inherited from [PolygonShape](polygonshape.md).[m_centroid](polygonshape.md#m_centroid)*

___

###  m_count

• **m_count**: *number*

*Inherited from [PolygonShape](polygonshape.md).[m_count](polygonshape.md#m_count)*

___

###  m_normals

• **m_normals**: *Vec2[]*

*Inherited from [PolygonShape](polygonshape.md).[m_normals](polygonshape.md#m_normals)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [PolygonShape](polygonshape.md).[m_radius](polygonshape.md#m_radius)*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

___

###  m_type

• **m_type**: *"polygon"*

*Inherited from [PolygonShape](polygonshape.md).[m_type](polygonshape.md#m_type)*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

___

###  m_vertices

• **m_vertices**: *Vec2[]*

*Inherited from [PolygonShape](polygonshape.md).[m_vertices](polygonshape.md#m_vertices)*

___

###  style

• **style**: *[Style](../interfaces/style.md)*

*Inherited from [Shape](shape.md).[style](shape.md#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as const

*Overrides [PolygonShape](polygonshape.md).[TYPE](polygonshape.md#static-type)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeAABB](polygonshape.md#computeaabb)*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

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

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md)): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeDistanceProxy](polygonshape.md#computedistanceproxy)*

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](../interfaces/massdata.md), `density`: number): *void*

*Inherited from [PolygonShape](polygonshape.md).[computeMass](polygonshape.md#computemass)*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Inherited from [PolygonShape](polygonshape.md).[getChildCount](polygonshape.md#getchildcount)*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [PolygonShape](polygonshape.md).[getRadius](polygonshape.md#getradius)*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"polygon"*

*Inherited from [PolygonShape](polygonshape.md).[getType](polygonshape.md#gettype)*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

**Returns:** *"polygon"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[rayCast](polygonshape.md#raycast)*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

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

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: Vec2): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[testPoint](polygonshape.md#testpoint)*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) | The shape world transform. |
`p` | Vec2 | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

*Inherited from [PolygonShape](polygonshape.md).[validate](polygonshape.md#validate)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
