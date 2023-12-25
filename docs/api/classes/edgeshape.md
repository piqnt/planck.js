[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [EdgeShape](edgeshape.md)

# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Hierarchy

* [Shape](shape.md)

  ↳ **EdgeShape**

## Index

### Constructors

* [constructor](edgeshape.md#constructor)

### Properties

* [m_hasVertex0](edgeshape.md#m_hasvertex0)
* [m_hasVertex3](edgeshape.md#m_hasvertex3)
* [m_radius](edgeshape.md#m_radius)
* [m_type](edgeshape.md#m_type)
* [m_vertex0](edgeshape.md#m_vertex0)
* [m_vertex1](edgeshape.md#m_vertex1)
* [m_vertex2](edgeshape.md#m_vertex2)
* [m_vertex3](edgeshape.md#m_vertex3)
* [style](edgeshape.md#style)
* [TYPE](edgeshape.md#static-type)

### Methods

* [_set](edgeshape.md#_set)
* [computeAABB](edgeshape.md#computeaabb)
* [computeDistanceProxy](edgeshape.md#computedistanceproxy)
* [computeMass](edgeshape.md#computemass)
* [getChildCount](edgeshape.md#getchildcount)
* [getNextVertex](edgeshape.md#getnextvertex)
* [getPrevVertex](edgeshape.md#getprevvertex)
* [getRadius](edgeshape.md#getradius)
* [getType](edgeshape.md#gettype)
* [rayCast](edgeshape.md#raycast)
* [setNextVertex](edgeshape.md#setnextvertex)
* [setPrevVertex](edgeshape.md#setprevvertex)
* [testPoint](edgeshape.md#testpoint)
* [isValid](edgeshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new EdgeShape**(`v1?`: [Vec2Value](../interfaces/vec2value.md), `v2?`: [Vec2Value](../interfaces/vec2value.md)): *[EdgeShape](edgeshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2Value](../interfaces/vec2value.md) |
`v2?` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

___

###  m_radius

• **m_radius**: *number*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

___

###  m_type

• **m_type**: *"edge"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

___

###  m_vertex0

• **m_vertex0**: *Vec2*

___

###  m_vertex1

• **m_vertex1**: *Vec2*

___

###  m_vertex2

• **m_vertex2**: *Vec2*

___

###  m_vertex3

• **m_vertex3**: *Vec2*

___

###  style

• **style**: *[Style](../interfaces/style.md)*

*Inherited from [Shape](shape.md).[style](shape.md#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"edge"* = 'edge' as const

## Methods

###  _set

▸ **_set**(`v1`: Vec2, `v2`: Vec2): *[EdgeShape](edgeshape.md)*

Set this as an isolated edge.

**Parameters:**

Name | Type |
------ | ------ |
`v1` | Vec2 |
`v2` | Vec2 |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

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

*Overrides [Shape](shape.md).[computeDistanceProxy](shape.md#abstract-computedistanceproxy)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](../interfaces/massdata.md), `density?`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

Get the number of child primitives.

**Returns:** *1*

___

###  getNextVertex

▸ **getNextVertex**(): *Vec2*

Optional next vertex, used for smooth collision.

**Returns:** *Vec2*

___

###  getPrevVertex

▸ **getPrevVertex**(): *Vec2*

Optional prev vertex, used for smooth collision.

**Returns:** *Vec2*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"edge"*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

**Returns:** *"edge"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

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

###  setNextVertex

▸ **setNextVertex**(`v?`: Vec2): *[EdgeShape](edgeshape.md)*

Optional next vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | Vec2 |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  setPrevVertex

▸ **setPrevVertex**(`v?`: Vec2): *[EdgeShape](edgeshape.md)*

Optional prev vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | Vec2 |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2Value](../interfaces/vec2value.md)): *false*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

Test a point for containment in this shape. This only works for convex
shapes.

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

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
