---
showOutline: false
---

# Class: Sweep

This describes the motion of a body/shape for TOI computation. Shapes are
defined with respect to the body origin, which may not coincide with the
center of mass. However, to support dynamics we must interpolate the center
of mass position.

## Hierarchy

* **Sweep**

## Index

### Properties

* [a](/api/classes/sweep#a)
* [a0](/api/classes/sweep#a0)
* [alpha0](/api/classes/sweep#alpha0)
* [c](/api/classes/sweep#c)
* [c0](/api/classes/sweep#c0)
* [localCenter](/api/classes/sweep#localcenter)

### Methods

* [advance](/api/classes/sweep#advance)
* [forward](/api/classes/sweep#forward)
* [getTransform](/api/classes/sweep#gettransform)
* [normalize](/api/classes/sweep#normalize)
* [set](/api/classes/sweep#set)
* [setLocalCenter](/api/classes/sweep#setlocalcenter)
* [setTransform](/api/classes/sweep#settransform)

## Properties

###  a

• **a**: *number* = 0

World angle

___

###  a0

• **a0**: *number* = 0

___

###  alpha0

• **alpha0**: *number* = 0

Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0.

___

###  c

• **c**: *Vec2‹›* = Vec2.zero()

World center position

___

###  c0

• **c0**: *Vec2‹›* = Vec2.zero()

___

###  localCenter

• **localCenter**: *Vec2‹›* = Vec2.zero()

Local center of mass position

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

Advance the sweep forward, yielding a new initial state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alpha` | number | The new initial time  |

**Returns:** *void*

___

###  forward

▸ **forward**(): *void*

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [TransformValue](/api/globals#transformvalue), `beta`: number): *void*

Get the interpolated transform at a specific time.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) | - | - |
`beta` | number | 0 | A factor in [0,1], where 0 indicates alpha0  |

**Returns:** *void*

___

###  normalize

▸ **normalize**(): *void*

normalize the angles in radians to be between -pi and pi.

**Returns:** *void*

___

###  set

▸ **set**(`that`: [Sweep](/api/classes/sweep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Sweep](/api/classes/sweep) |

**Returns:** *void*

___

###  setLocalCenter

▸ **setLocalCenter**(`localCenter`: [Vec2Value](/api/interfaces/vec2value), `xf`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`localCenter` | [Vec2Value](/api/interfaces/vec2value) |
`xf` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*
