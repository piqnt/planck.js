[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Rot](rot.md)

# Class: Rot

## Hierarchy

* **Rot**

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

*Defined in [src/common/Rot.ts:36](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L36)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

*Defined in [src/common/Rot.ts:36](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L36)*

___

###  s

• **s**: *number*

*Defined in [src/common/Rot.ts:35](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L35)*

## Methods

###  getAngle

▸ **getAngle**(): *number*

*Defined in [src/common/Rot.ts:115](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L115)*

Get the angle in radians.

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:120](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L120)*

Get the x-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  getYAxis

▸ **getYAxis**(): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:125](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L125)*

Get the u-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  set

▸ **set**(`angle`: number | [Rot](rot.md)): *void*

*Defined in [src/common/Rot.ts:92](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [Rot](rot.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [src/common/Rot.ts:107](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L107)*

Set using an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [src/common/Rot.ts:87](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L87)*

Set to the identity rotation.

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Rot.ts:78](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:59](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:67](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L67)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [src/common/Rot.ts:74](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:130](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L130)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:132](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L132)*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:152](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [Rot](rot.md), `v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:171](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L171)*

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

*Defined in [src/common/Rot.ts:178](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L178)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mulT**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:180](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L180)*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:199](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:211](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Rot.ts:165](https://github.com/shakiba/planck.js/blob/1523746/src/common/Rot.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*
