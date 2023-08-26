[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Sweep](sweep.md)

# Class: Sweep

This describes the motion of a body/shape for TOI computation. Shapes are
defined with respect to the body origin, which may not coincide with the
center of mass. However, to support dynamics we must interpolate the center
of mass position.

## Hierarchy

* **Sweep**

## Index

### Properties

* [a](sweep.md#a)
* [a0](sweep.md#a0)
* [alpha0](sweep.md#alpha0)
* [c](sweep.md#c)
* [c0](sweep.md#c0)
* [localCenter](sweep.md#localcenter)

### Methods

* [advance](sweep.md#advance)
* [forward](sweep.md#forward)
* [getTransform](sweep.md#gettransform)
* [normalize](sweep.md#normalize)
* [set](sweep.md#set)
* [setLocalCenter](sweep.md#setlocalcenter)
* [setTransform](sweep.md#settransform)

## Properties

###  a

• **a**: *number* = 0

*Defined in [src/common/Sweep.ts:52](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L52)*

World angle

___

###  a0

• **a0**: *number* = 0

*Defined in [src/common/Sweep.ts:58](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L58)*

___

###  alpha0

• **alpha0**: *number* = 0

*Defined in [src/common/Sweep.ts:55](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L55)*

Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0.

___

###  c

• **c**: *Vec2‹›* = Vec2.zero()

*Defined in [src/common/Sweep.ts:49](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L49)*

World center position

___

###  c0

• **c0**: *Vec2‹›* = Vec2.zero()

*Defined in [src/common/Sweep.ts:57](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L57)*

___

###  localCenter

• **localCenter**: *Vec2‹›* = Vec2.zero()

*Defined in [src/common/Sweep.ts:46](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L46)*

Local center of mass position

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [src/common/Sweep.ts:105](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L105)*

Advance the sweep forward, yielding a new initial state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alpha` | number | The new initial time  |

**Returns:** *void*

___

###  forward

▸ **forward**(): *void*

*Defined in [src/common/Sweep.ts:113](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L113)*

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [TransformValue](../globals.md#transformvalue), `beta`: number): *void*

*Defined in [src/common/Sweep.ts:92](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L92)*

Get the interpolated transform at a specific time.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) | - | - |
`beta` | number | 0 | A factor in [0,1], where 0 indicates alpha0  |

**Returns:** *void*

___

###  normalize

▸ **normalize**(): *void*

*Defined in [src/common/Sweep.ts:121](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L121)*

normalize the angles in radians to be between -pi and pi.

**Returns:** *void*

___

###  set

▸ **set**(`that`: [Sweep](sweep.md)): *void*

*Defined in [src/common/Sweep.ts:127](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Sweep](sweep.md) |

**Returns:** *void*

___

###  setLocalCenter

▸ **setLocalCenter**(`localCenter`: [Vec2Value](../interfaces/vec2value.md), `xf`: [TransformValue](../globals.md#transformvalue)): *void*

*Defined in [src/common/Sweep.ts:78](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`localCenter` | [Vec2Value](../interfaces/vec2value.md) |
`xf` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [TransformValue](../globals.md#transformvalue)): *void*

*Defined in [src/common/Sweep.ts:70](https://github.com/shakiba/planck.js/blob/6ab76c7/src/common/Sweep.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*
