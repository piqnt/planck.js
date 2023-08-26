[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [CircleShape](circleshape.md)

# Class: CircleShape

## Hierarchy

* [Shape](shape.md)

  ↳ **CircleShape**

## Index

### Properties

* [m_p](circleshape.md#m_p)
* [m_radius](circleshape.md#m_radius)
* [m_type](circleshape.md#m_type)
* [TYPE](circleshape.md#static-type)

### Methods

* [computeAABB](circleshape.md#computeaabb)
* [computeDistanceProxy](circleshape.md#computedistanceproxy)
* [computeMass](circleshape.md#computemass)
* [getCenter](circleshape.md#getcenter)
* [getChildCount](circleshape.md#getchildcount)
* [getRadius](circleshape.md#getradius)
* [getType](circleshape.md#gettype)
* [rayCast](circleshape.md#raycast)
* [testPoint](circleshape.md#testpoint)
* [isValid](circleshape.md#static-isvalid)

## Properties

###  m_p

• **m_p**: *Vec2*

*Defined in [src/collision/shape/CircleShape.ts:46](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L46)*

___

###  m_radius

• **m_radius**: *number*

*Overrides [Shape](shape.md).[m_radius](shape.md#m_radius)*

*Defined in [src/collision/shape/CircleShape.ts:47](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L47)*

___

###  m_type

• **m_type**: *"circle"*

*Overrides [Shape](shape.md).[m_type](shape.md#m_type)*

*Defined in [src/collision/shape/CircleShape.ts:44](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L44)*

___

### `Static` TYPE

▪ **TYPE**: *"circle"* = 'circle' as const

*Defined in [src/collision/shape/CircleShape.ts:43](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L43)*

## Methods

###  computeAABB

▸ **computeAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `xf`: [TransformValue](../globals.md#transformvalue), `childIndex`: number): *void*

*Overrides [Shape](shape.md).[computeAABB](shape.md#abstract-computeaabb)*

*Defined in [src/collision/shape/CircleShape.ts:192](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L192)*

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

*Defined in [src/collision/shape/CircleShape.ts:213](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](../interfaces/massdata.md), `density`: number): *void*

*Overrides [Shape](shape.md).[computeMass](shape.md#abstract-computemass)*

*Defined in [src/collision/shape/CircleShape.ts:206](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L206)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getCenter

▸ **getCenter**(): *Vec2*

*Defined in [src/collision/shape/CircleShape.ts:104](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L104)*

**Returns:** *Vec2*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides [Shape](shape.md).[getChildCount](shape.md#abstract-getchildcount)*

*Defined in [src/collision/shape/CircleShape.ts:124](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L124)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Overrides [Shape](shape.md).[getRadius](shape.md#abstract-getradius)*

*Defined in [src/collision/shape/CircleShape.ts:100](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L100)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *"circle"*

*Overrides [Shape](shape.md).[getType](shape.md#abstract-gettype)*

*Defined in [src/collision/shape/CircleShape.ts:96](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L96)*

**Returns:** *"circle"*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides [Shape](shape.md).[rayCast](shape.md#abstract-raycast)*

*Defined in [src/collision/shape/CircleShape.ts:148](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L148)*

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

▸ **testPoint**(`xf`: [TransformValue](../globals.md#transformvalue), `p`: [Vec2Value](../interfaces/vec2value.md)): *boolean*

*Overrides [Shape](shape.md).[testPoint](shape.md#abstract-testpoint)*

*Defined in [src/collision/shape/CircleShape.ts:135](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/shape/CircleShape.ts#L135)*

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

*Inherited from [Shape](shape.md).[isValid](shape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:50](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/Shape.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*
