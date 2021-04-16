[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Sweep](sweep.md)

# Class: Sweep

This describes the motion of a body/shape for TOI computation. Shapes are
defined with respect to the body origin, which may not coincide with the
center of mass. However, to support dynamics we must interpolate the center
of mass position.
This describes the motion of a body/shape for TOI computation. Shapes are
defined with respect to the body origin, which may not coincide with the
center of mass. However, to support dynamics we must interpolate the center
of mass position.

## Hierarchy

* **Sweep**

## Index

### Constructors

* [constructor](sweep.md#constructor)

### Properties

* [a](sweep.md#a)
* [a0](sweep.md#a0)
* [alpha0](sweep.md#alpha0)
* [c](sweep.md#c)
* [c0](sweep.md#c0)
* [localCenter](sweep.md#localcenter)

### Methods

* [advance](sweep.md#advance)
* [clone](sweep.md#clone)
* [forward](sweep.md#forward)
* [getTransform](sweep.md#gettransform)
* [normalize](sweep.md#normalize)
* [set](sweep.md#set)
* [setLocalCenter](sweep.md#setlocalcenter)
* [setTransform](sweep.md#settransform)

## Constructors

###  constructor

\+ **new Sweep**(`c?`: [Vec2](vec2.md), `a?`: number): *[Sweep](sweep.md)*

*Defined in [dist/planck.d.ts:3850](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3850)*

**Parameters:**

Name | Type |
------ | ------ |
`c?` | [Vec2](vec2.md) |
`a?` | number |

**Returns:** *[Sweep](sweep.md)*

## Properties

###  a

• **a**: *number*

*Defined in [dist/planck.d.ts:3846](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3846)*

*Defined in [src/common/Sweep.ts:49](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L49)*

World angle
World angle

___

###  a0

• **a0**: *number*

*Defined in [dist/planck.d.ts:3850](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3850)*

*Defined in [src/common/Sweep.ts:55](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L55)*

___

###  alpha0

• **alpha0**: *number*

*Defined in [dist/planck.d.ts:3848](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3848)*

*Defined in [src/common/Sweep.ts:52](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L52)*

Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0.
Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0.

___

###  c

• **c**: *Vec2*

*Defined in [dist/planck.d.ts:3844](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3844)*

*Defined in [src/common/Sweep.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L46)*

World center position
World center position

___

###  c0

• **c0**: *Vec2*

*Defined in [dist/planck.d.ts:3849](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3849)*

*Defined in [src/common/Sweep.ts:54](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L54)*

___

###  localCenter

• **localCenter**: *Vec2*

*Defined in [dist/planck.d.ts:3842](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3842)*

*Defined in [src/common/Sweep.ts:43](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Sweep.ts#L43)*

Local center of mass position
Local center of mass position

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [dist/planck.d.ts:3866](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3866)*

Advance the sweep forward, yielding a new initial state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alpha` | number | The new initial time  |

**Returns:** *void*

___

###  clone

▸ **clone**(): *[Sweep](sweep.md)*

*Defined in [dist/planck.d.ts:3872](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3872)*

**Returns:** *[Sweep](sweep.md)*

___

###  forward

▸ **forward**(): *void*

*Defined in [dist/planck.d.ts:3867](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3867)*

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [Transform](transform.md), `beta`: number): *void*

*Defined in [dist/planck.d.ts:3860](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3860)*

Get the interpolated transform at a specific time.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | - |
`beta` | number | A factor in [0,1], where 0 indicates alpha0  |

**Returns:** *void*

___

###  normalize

▸ **normalize**(): *void*

*Defined in [dist/planck.d.ts:3871](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3871)*

normalize the angles in radians to be between -pi and pi.

**Returns:** *void*

___

###  set

▸ **set**(`that`: [Sweep](sweep.md)): *void*

*Defined in [dist/planck.d.ts:3873](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3873)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Sweep](sweep.md) |

**Returns:** *void*

___

###  setLocalCenter

▸ **setLocalCenter**(`localCenter`: [Vec2](vec2.md), `xf`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:3853](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3853)*

**Parameters:**

Name | Type |
------ | ------ |
`localCenter` | [Vec2](vec2.md) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:3852](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L3852)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*
