[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Shape](shape.md)

# Class: Shape

A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.
A shape is used for collision detection. You can create a shape however you
like. Shapes used for simulation in World are created automatically when a
Fixture is created. Shapes may encapsulate one or more child shapes.

## Hierarchy

* **Shape**

## Index

### Properties

* [m_radius](shape.md#m_radius)
* [m_type](shape.md#m_type)
* [TYPES](shape.md#static-types)

### Methods

* [_clone](shape.md#abstract-_clone)
* [_reset](shape.md#_reset)
* [_serialize](shape.md#abstract-_serialize)
* [computeAABB](shape.md#abstract-computeaabb)
* [computeDistanceProxy](shape.md#abstract-computedistanceproxy)
* [computeMass](shape.md#abstract-computemass)
* [getChildCount](shape.md#abstract-getchildcount)
* [getRadius](shape.md#getradius)
* [getType](shape.md#gettype)
* [rayCast](shape.md#abstract-raycast)
* [testPoint](shape.md#abstract-testpoint)
* [_deserialize](shape.md#static-_deserialize)
* [isValid](shape.md#static-isvalid)

## Properties

###  m_radius

• **m_radius**: *number*

*Defined in [dist/planck.d.ts:1988](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1988)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Defined in [dist/planck.d.ts:1987](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1987)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L38)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Defined in [dist/planck.d.ts:1991](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1991)*

*Defined in [src/collision/Shape.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L46)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

### `Abstract` _clone

▸ **_clone**(): *[Shape](shape.md)*

*Defined in [dist/planck.d.ts:2009](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2009)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[Shape](shape.md)*

▸ **_clone**(): *Shape*

*Defined in [src/collision/Shape.ts:76](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L76)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *Shape*

___

###  _reset

▸ **_reset**(): *void*

*Defined in [dist/planck.d.ts:1989](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1989)*

**Returns:** *void*

___

### `Abstract` _serialize

▸ **_serialize**(): *object*

*Defined in [dist/planck.d.ts:1990](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1990)*

**Returns:** *object*

▸ **_serialize**(): *object*

*Defined in [src/collision/Shape.ts:44](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L44)*

**Returns:** *object*

___

### `Abstract` computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Defined in [dist/planck.d.ts:2039](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2039)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABB](aabb.md) | Returns the axis aligned box. |
`xf` | [Transform](transform.md) | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

▸ **computeAABB**(`aabb`: AABB, `xf`: Transform, `childIndex`: number): *void*

*Defined in [src/collision/Shape.ts:110](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L110)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | AABB | Returns the axis aligned box. |
`xf` | Transform | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

### `Abstract` computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md), `childIndex`: number): *void*

*Defined in [dist/planck.d.ts:2048](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2048)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |
`childIndex` | number |

**Returns:** *void*

▸ **computeDistanceProxy**(`proxy`: DistanceProxy, `childIndex`: number): *void*

*Defined in [src/collision/Shape.ts:121](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | DistanceProxy |
`childIndex` | number |

**Returns:** *void*

___

### `Abstract` computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density?`: number): *void*

*Defined in [dist/planck.d.ts:2047](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2047)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

▸ **computeMass**(`massData`: MassData, `density?`: number): *void*

*Defined in [src/collision/Shape.ts:119](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L119)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | MassData | Returns the mass data for this shape. |
`density?` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

### `Abstract` getChildCount

▸ **getChildCount**(): *number*

*Defined in [dist/planck.d.ts:2013](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2013)*

Get the number of child primitives.

**Returns:** *number*

▸ **getChildCount**(): *number*

*Defined in [src/collision/Shape.ts:81](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L81)*

Get the number of child primitives.

**Returns:** *number*

___

###  getRadius

▸ **getRadius**(): *number*

*Defined in [dist/planck.d.ts:1996](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1996)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [dist/planck.d.ts:2003](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2003)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

### `Abstract` rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Defined in [dist/planck.d.ts:2030](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2030)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) | The ray-cast results. |
`input` | [RayCastInput](../interfaces/raycastinput.md) | The ray-cast input parameters. |
`xf` | [Transform](transform.md) | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

▸ **rayCast**(`output`: RayCastOutput, `input`: RayCastInput, `xf`: Transform, `childIndex`: number): *boolean*

*Defined in [src/collision/Shape.ts:100](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L100)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | RayCastOutput | The ray-cast results. |
`input` | RayCastInput | The ray-cast input parameters. |
`xf` | Transform | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

### `Abstract` testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *boolean*

*Defined in [dist/planck.d.ts:2021](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L2021)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

▸ **testPoint**(`xf`: Transform, `p`: Vec2): *boolean*

*Defined in [src/collision/Shape.ts:90](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/Shape.ts#L90)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | Transform | The shape world transform. |
`p` | Vec2 | A point in world coordinates.  |

**Returns:** *boolean*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `context`: any, `restore`: any): *any*

*Defined in [dist/planck.d.ts:1994](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1994)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | any |
`restore` | any |

**Returns:** *any*

___

### `Static` isValid

▸ **isValid**(`shape`: [Shape](shape.md) | null | undefined): *shape is Shape*

*Defined in [dist/planck.d.ts:1995](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1995)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) &#124; null &#124; undefined |

**Returns:** *shape is Shape*
