[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Rot](rot.md)

# Class: Rot

## Hierarchy

* **Rot**

## Callable

▸ **Rot**(`angle?`: number | [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:324](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L324)*

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

## Index

### Constructors

* [constructor](rot.md#constructor)

### Properties

* [c](rot.md#c)
* [s](rot.md#s)

### Methods

* [getAngle](rot.md#getangle)
* [getXAxis](rot.md#getxaxis)
* [getYAxis](rot.md#getyaxis)
* [set](rot.md#set)
* [setAngle](rot.md#setangle)
* [setIdentity](rot.md#setidentity)
* [assert](rot.md#static-assert)
* [clone](rot.md#static-clone)
* [identity](rot.md#static-identity)
* [isValid](rot.md#static-isvalid)
* [mul](rot.md#static-mul)
* [mulRot](rot.md#static-mulrot)
* [mulSub](rot.md#static-mulsub)
* [mulT](rot.md#static-mult)
* [mulTRot](rot.md#static-multrot)
* [mulTVec2](rot.md#static-multvec2)
* [mulVec2](rot.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Rot**(`angle?`: number | [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:327](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L327)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

*Defined in [dist/planck.d.ts:327](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L327)*

*Defined in [src/common/Rot.ts:36](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L36)*

___

###  s

• **s**: *number*

*Defined in [dist/planck.d.ts:326](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L326)*

*Defined in [src/common/Rot.ts:35](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L35)*

## Methods

###  getAngle

▸ **getAngle**(): *number*

*Defined in [dist/planck.d.ts:340](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L340)*

Get the angle in radians.

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:342](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L342)*

Get the x-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  getYAxis

▸ **getYAxis**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:344](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L344)*

Get the u-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  set

▸ **set**(`angle`: number | [Rot](rot.md)): *void*

*Defined in [dist/planck.d.ts:336](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L336)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [Rot](rot.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [dist/planck.d.ts:338](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L338)*

Set using an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [dist/planck.d.ts:335](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L335)*

Set to the identity rotation.

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:333](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L333)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:330](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L330)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:331](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L331)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [dist/planck.d.ts:332](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:346](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L346)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:348](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L348)*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`rot`: Rot, `m`: Rot): *Rot*

*Defined in [src/common/Rot.ts:130](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L130)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | Rot |
`m` | Rot |

**Returns:** *Rot*

▸ **mul**(`rot`: Rot, `m`: Vec2): *Vec2*

*Defined in [src/common/Rot.ts:132](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L132)*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | Rot |
`m` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:349](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L349)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [Rot](rot.md), `v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:351](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L351)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulT

▸ **mulT**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:353](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L353)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mulT**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:355](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L355)*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mulT**(`rot`: Rot, `m`: Rot): *Rot*

*Defined in [src/common/Rot.ts:178](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L178)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | Rot |
`m` | Rot |

**Returns:** *Rot*

▸ **mulT**(`rot`: Rot, `m`: Vec2): *Vec2*

*Defined in [src/common/Rot.ts:180](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Rot.ts#L180)*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | Rot |
`m` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [dist/planck.d.ts:356](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:357](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L357)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:350](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L350)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*
