
# Class: ChainShape

A chain shape is a free form sequence of line segments. The chain has
two-sided collision, so you can use inside and outside collision. Therefore,
you may use any winding order. Connectivity information is used to create
smooth collisions.

WARNING: The chain will not collide properly if there are self-intersections.

## Hierarchy

* [Shape](/api/classes/shape)

  ↳ **ChainShape**

## Index

### Constructors

* [constructor](/api/classes/chainshape#constructor)

### Properties

* [style](/api/classes/chainshape#style)
* [TYPE](/api/classes/chainshape#static-type)

### Methods

* [computeAABB](/api/classes/chainshape#computeaabb)
* [computeDistanceProxy](/api/classes/chainshape#computedistanceproxy)
* [computeMass](/api/classes/chainshape#computemass)
* [getChildCount](/api/classes/chainshape#getchildcount)
* [getChildEdge](/api/classes/chainshape#getchildedge)
* [getNextVertex](/api/classes/chainshape#getnextvertex)
* [getPrevVertex](/api/classes/chainshape#getprevvertex)
* [getRadius](/api/classes/chainshape#getradius)
* [getType](/api/classes/chainshape#gettype)
* [getVertex](/api/classes/chainshape#getvertex)
* [isLoop](/api/classes/chainshape#isloop)
* [rayCast](/api/classes/chainshape#raycast)
* [setNextVertex](/api/classes/chainshape#setnextvertex)
* [setPrevVertex](/api/classes/chainshape#setprevvertex)
* [testPoint](/api/classes/chainshape#testpoint)
* [isValid](/api/classes/chainshape#static-isvalid)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices?`: [Vec2Value](/api/interfaces/vec2value)[], `loop?`: boolean): *[ChainShape](/api/classes/chainshape)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2Value](/api/interfaces/vec2value)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](/api/classes/chainshape)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Shape](/api/classes/shape).[style](/api/classes/shape#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"chain"* = 'chain' as const

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

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](/api/classes/distanceproxy), `childIndex`: number): *void*

*Overrides [Shape](/api/classes/shape).[computeDistanceProxy](/api/classes/shape#abstract-computedistanceproxy)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](/api/classes/distanceproxy) |
`childIndex` | number |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](/api/interfaces/massdata), `density?`: number): *void*

*Overrides [Shape](/api/classes/shape).[computeMass](/api/classes/shape#abstract-computemass)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

Chains have zero mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](/api/interfaces/massdata) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *number*

*Overrides [Shape](/api/classes/shape).[getChildCount](/api/classes/shape#abstract-getchildcount)*

Get the number of child primitives.

**Returns:** *number*

___

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](/api/classes/edgeshape), `childIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](/api/classes/edgeshape) |
`childIndex` | number |

**Returns:** *void*

___

###  getNextVertex

▸ **getNextVertex**(): *Vec2*

**Returns:** *Vec2*

___

###  getPrevVertex

▸ **getPrevVertex**(): *Vec2*

**Returns:** *Vec2*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](/api/classes/shape).[getRadius](/api/classes/shape#abstract-getradius)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"chain"*

*Overrides [Shape](/api/classes/shape).[getType](/api/classes/shape#abstract-gettype)*

**Returns:** *"chain"*

___

###  getVertex

▸ **getVertex**(`index`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *Vec2*

___

###  isLoop

▸ **isLoop**(): *boolean*

**Returns:** *boolean*

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

▸ **setNextVertex**(`nextVertex`: Vec2): *void*

Establish connectivity to a vertex that follows the last vertex. Don't call
this for loops.

**Parameters:**

Name | Type |
------ | ------ |
`nextVertex` | Vec2 |

**Returns:** *void*

___

###  setPrevVertex

▸ **setPrevVertex**(`prevVertex`: Vec2): *void*

Establish connectivity to a vertex that precedes the first vertex. Don't call
this for loops.

**Parameters:**

Name | Type |
------ | ------ |
`prevVertex` | Vec2 |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: [Vec2Value](/api/interfaces/vec2value)): *false*

*Overrides [Shape](/api/classes/shape).[testPoint](/api/classes/shape#abstract-testpoint)*

Test a point for containment in this shape. This only works for convex
shapes.

This always return false.

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
