[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat22](mat22.md)

# Class: Mat22

A 2-by-2 matrix. Stored in column-major order.

## Hierarchy

* **Mat22**

## Index

### Properties

* [ex](mat22.md#ex)
* [ey](mat22.md#ey)

### Methods

* [getInverse](mat22.md#getinverse)
* [setIdentity](mat22.md#setidentity)
* [setZero](mat22.md#setzero)
* [solve](mat22.md#solve)
* [abs](mat22.md#static-abs)
* [add](mat22.md#static-add)
* [assert](mat22.md#static-assert)
* [isValid](mat22.md#static-isvalid)
* [mulMat22](mat22.md#static-mulmat22)
* [mulTMat22](mat22.md#static-multmat22)
* [mulTVec2](mat22.md#static-multvec2)
* [mulVec2](mat22.md#static-mulvec2)

## Properties

###  ex

• **ex**: *Vec2*

*Defined in [src/common/Mat22.ts:35](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L35)*

___

###  ey

• **ey**: *Vec2*

*Defined in [src/common/Mat22.ts:36](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L36)*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:109](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L109)*

**Returns:** *[Mat22](mat22.md)*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [src/common/Mat22.ts:95](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L95)*

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

*Defined in [src/common/Mat22.ts:102](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L102)*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: Vec2): *Vec2*

*Defined in [src/common/Mat22.ts:130](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L130)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

**Parameters:**

Name | Type |
------ | ------ |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` abs

▸ **abs**(`mx`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:227](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](mat22.md), `mx2`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:232](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](mat22.md) |
`mx2` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Mat22.ts:67](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [src/common/Mat22.ts:60](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:180](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulTMat22

▸ **mulTMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [src/common/Mat22.ts:219](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

*Defined in [src/common/Mat22.ts:213](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

*Defined in [src/common/Mat22.ts:173](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Mat22.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*
