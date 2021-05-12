[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat22](mat22.md)

# Class: Mat22

A 2-by-2 matrix. Stored in column-major order.

## Hierarchy

* **Mat22**

## Index

### Constructors

* [constructor](mat22.md#constructor)

### Properties

* [ex](mat22.md#ex)
* [ey](mat22.md#ey)

### Methods

* [getInverse](mat22.md#getinverse)
* [set](mat22.md#set)
* [setIdentity](mat22.md#setidentity)
* [setZero](mat22.md#setzero)
* [solve](mat22.md#solve)
* [toString](mat22.md#tostring)
* [abs](mat22.md#static-abs)
* [add](mat22.md#static-add)
* [assert](mat22.md#static-assert)
* [isValid](mat22.md#static-isvalid)
* [mul](mat22.md#static-mul)
* [mulMat22](mat22.md#static-mulmat22)
* [mulT](mat22.md#static-mult)
* [mulTMat22](mat22.md#static-multmat22)
* [mulTVec2](mat22.md#static-multvec2)
* [mulVec2](mat22.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Mat22**(`a`: number, `b`: number, `c`: number, `d`: number): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(`a`: object, `b`: object): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:40](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L40)*

**Parameters:**

▪ **a**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **b**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:41](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L41)*

**Returns:** *[Mat22](mat22.md)*

## Properties

###  ex

• **ex**: *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:37](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L37)*

___

###  ey

• **ey**: *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L38)*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:111](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L111)*

**Returns:** *[Mat22](mat22.md)*

___

###  set

▸ **set**(`a`: [Mat22](mat22.md)): *void*

*Defined in [src/common/Mat22.ts:73](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](mat22.md) |

**Returns:** *void*

▸ **set**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [src/common/Mat22.ts:74](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

▸ **set**(`a`: number, `b`: number, `c`: number, `d`: number): *void*

*Defined in [src/common/Mat22.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [src/common/Mat22.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L97)*

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

*Defined in [src/common/Mat22.ts:104](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L104)*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:132](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L132)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/Mat22.ts:57](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L57)*

**Returns:** *string*

___

### `Static` abs

▸ **abs**(`mx`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:229](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L229)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](mat22.md), `mx2`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:234](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L234)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](mat22.md) |
`mx2` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Mat22.ts:65](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [src/common/Mat22.ts:61](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:152](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L152)*

Multiply a matrix times a vector. If a rotation matrix is provided, then this
transforms the vector from one frame to another.

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mul**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:153](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:182](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulT

▸ **mulT**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:197](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L197)*

Multiply a matrix transpose times a vector. If a rotation matrix is provided,
then this transforms the vector from one frame to another (inverse
transform).

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mulT**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:198](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTMat22

▸ **mulTMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:221](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L221)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:215](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L215)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:175](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat22.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*
