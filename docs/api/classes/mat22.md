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

*Defined in [src/common/Mat22.ts:38](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(`a`: object, `b`: object): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:40](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L40)*

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

*Defined in [src/common/Mat22.ts:41](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L41)*

**Returns:** *[Mat22](mat22.md)*

## Properties

###  ex

• **ex**: *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:37](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L37)*

___

###  ey

• **ey**: *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:38](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L38)*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:109](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L109)*

**Returns:** *[Mat22](mat22.md)*

___

###  set

▸ **set**(`a`: [Mat22](mat22.md)): *void*

*Defined in [src/common/Mat22.ts:72](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](mat22.md) |

**Returns:** *void*

▸ **set**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [src/common/Mat22.ts:73](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

▸ **set**(`a`: number, `b`: number, `c`: number, `d`: number): *void*

*Defined in [src/common/Mat22.ts:74](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L74)*

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

*Defined in [src/common/Mat22.ts:95](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L95)*

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

*Defined in [src/common/Mat22.ts:102](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L102)*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:130](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L130)*

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

*Defined in [src/common/Mat22.ts:56](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L56)*

**Returns:** *string*

___

### `Static` abs

▸ **abs**(`mx`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:225](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](mat22.md), `mx2`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:230](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](mat22.md) |
`mx2` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Mat22.ts:64](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [src/common/Mat22.ts:60](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:150](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L150)*

Multiply a matrix times a vector. If a rotation matrix is provided, then this
transforms the vector from one frame to another.

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mul**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:151](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: any, `v`: any): *[Mat22](mat22.md)‹›*

*Defined in [src/common/Mat22.ts:179](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | any |
`v` | any |

**Returns:** *[Mat22](mat22.md)‹›*

___

### `Static` mulT

▸ **mulT**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:194](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L194)*

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

*Defined in [src/common/Mat22.ts:195](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTMat22

▸ **mulTMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:217](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat22.ts:211](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: any, `v`: any): *[Vec2](vec2.md)‹›*

*Defined in [src/common/Mat22.ts:172](https://github.com/shakiba/planck.js/blob/1523746/src/common/Mat22.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | any |
`v` | any |

**Returns:** *[Vec2](vec2.md)‹›*
