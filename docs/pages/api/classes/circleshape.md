
# Class: CircleShape

## Hierarchy

* [Shape](/api/classes/shape)

  ↳ **CircleShape**

## Index

### Constructors

* [constructor](/api/classes/circleshape#constructor)

### Properties

* [style](/api/classes/circleshape#style)
* [TYPE](/api/classes/circleshape#static-type)

### Methods

* [computeAABB](/api/classes/circleshape#computeaabb)
* [computeDistanceProxy](/api/classes/circleshape#computedistanceproxy)
* [computeMass](/api/classes/circleshape#computemass)
* [getCenter](/api/classes/circleshape#getcenter)
* [getChildCount](/api/classes/circleshape#getchildcount)
* [getRadius](/api/classes/circleshape#getradius)
* [getType](/api/classes/circleshape#gettype)
* [rayCast](/api/classes/circleshape#raycast)
* [testPoint](/api/classes/circleshape#testpoint)
* [isValid](/api/classes/circleshape#static-isvalid)

## Constructors

###  constructor

\+ **new CircleShape**(`position`: [Vec2Value](/api/interfaces/vec2value), `radius?`: number): *[CircleShape](/api/classes/circleshape)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`radius?` | number |

**Returns:** *[CircleShape](/api/classes/circleshape)*

\+ **new CircleShape**(`radius?`: number): *[CircleShape](/api/classes/circleshape)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](/api/classes/circleshape)*

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

*Inherited from [Shape](/api/classes/shape).[style](/api/classes/shape#style)*

Styling for dev-tools.

___

### `Static` TYPE

▪ **TYPE**: *"circle"* = 'circle' as const

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

###  getCenter

▸ **getCenter**(): *Vec2*

**Returns:** *Vec2*

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

▸ **getType**(): *"circle"*

*Overrides [Shape](/api/classes/shape).[getType](/api/classes/shape#abstract-gettype)*

**Returns:** *"circle"*

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

▸ **testPoint**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: [Vec2Value](/api/interfaces/vec2value)): *boolean*

*Overrides [Shape](/api/classes/shape).[testPoint](/api/classes/shape#abstract-testpoint)*

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

*Inherited from [Shape](/api/classes/shape).[isValid](/api/classes/shape#static-isvalid)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
