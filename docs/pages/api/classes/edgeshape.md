
# Class: EdgeShape

A line segment (edge) shape. These can be connected in chains or loops to
other edge shapes. The connectivity information is used to ensure correct
contact normals.

## Hierarchy

* [Shape](/api/classes/shape)

  ↳ **EdgeShape**

## Index

### Constructors

* [constructor](/api/classes/edgeshape#constructor)

### Properties

* [style](/api/classes/edgeshape#style)
* [TYPE](/api/classes/edgeshape#static-type)

### Methods

* [_set](/api/classes/edgeshape#_set)
* [computeAABB](/api/classes/edgeshape#computeaabb)
* [computeDistanceProxy](/api/classes/edgeshape#computedistanceproxy)
* [computeMass](/api/classes/edgeshape#computemass)
* [getChildCount](/api/classes/edgeshape#getchildcount)
* [getNextVertex](/api/classes/edgeshape#getnextvertex)
* [getPrevVertex](/api/classes/edgeshape#getprevvertex)
* [getRadius](/api/classes/edgeshape#getradius)
* [getType](/api/classes/edgeshape#gettype)
* [rayCast](/api/classes/edgeshape#raycast)
* [setNextVertex](/api/classes/edgeshape#setnextvertex)
* [setPrevVertex](/api/classes/edgeshape#setprevvertex)
* [testPoint](/api/classes/edgeshape#testpoint)
* [isValid](/api/classes/edgeshape#static-isvalid)

## Constructors

###  constructor

\+ **new EdgeShape**(`v1?`: [Vec2Value](/api/interfaces/vec2value), `v2?`: [Vec2Value](/api/interfaces/vec2value)): *[EdgeShape](/api/classes/edgeshape)*

**Parameters:**

Name | Type |
------ | ------ |
`v1?` | [Vec2Value](/api/interfaces/vec2value) |
`v2?` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[EdgeShape](/api/classes/edgeshape)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Shape](/api/classes/shape).[style](/api/classes/shape#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"edge"* = 'edge' as const

## Methods

###  _set

▸ **_set**(`v1`: [Vec2Value](/api/interfaces/vec2value), `v2`: [Vec2Value](/api/interfaces/vec2value)): *[EdgeShape](/api/classes/edgeshape)*

Set this as an isolated edge.

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2Value](/api/interfaces/vec2value) |
`v2` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[EdgeShape](/api/classes/edgeshape)*

___

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

▸ **computeMass**(`massData`: [MassData](/api/interfaces/massdata), `density?`: number): *void*

*Overrides [Shape](/api/classes/shape).[computeMass](/api/classes/shape#abstract-computemass)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](/api/interfaces/massdata) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides [Shape](/api/classes/shape).[getChildCount](/api/classes/shape#abstract-getchildcount)*

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

*Overrides [Shape](/api/classes/shape).[getRadius](/api/classes/shape#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"edge"*

*Overrides [Shape](/api/classes/shape).[getType](/api/classes/shape#abstract-gettype)*

**Returns:** *"edge"*

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

###  setNextVertex

▸ **setNextVertex**(`v?`: [Vec2Value](/api/interfaces/vec2value)): *[EdgeShape](/api/classes/edgeshape)*

Optional next vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[EdgeShape](/api/classes/edgeshape)*

___

###  setPrevVertex

▸ **setPrevVertex**(`v?`: [Vec2Value](/api/interfaces/vec2value)): *[EdgeShape](/api/classes/edgeshape)*

Optional prev vertex, used for smooth collision.

**Parameters:**

Name | Type |
------ | ------ |
`v?` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[EdgeShape](/api/classes/edgeshape)*

___

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: [Vec2Value](/api/interfaces/vec2value)): *false*

*Overrides [Shape](/api/classes/shape).[testPoint](/api/classes/shape#abstract-testpoint)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) | The shape world transform. |
`p` | [Vec2Value](/api/interfaces/vec2value) | A point in world coordinates.  |

**Returns:** *false*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Inherited from [Shape](/api/classes/shape).[isValid](/api/classes/shape#static-isvalid)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
