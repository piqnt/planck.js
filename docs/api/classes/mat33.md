[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat33](mat33.md)

# Class: Mat33

A 3-by-3 matrix. Stored in column-major order.

## Hierarchy

* **Mat33**

## Index

### Properties

* [ex](mat33.md#ex)
* [ey](mat33.md#ey)
* [ez](mat33.md#ez)

### Methods

* [getInverse22](mat33.md#getinverse22)
* [getSymInverse33](mat33.md#getsyminverse33)
* [setZero](mat33.md#setzero)
* [solve22](mat33.md#solve22)
* [solve33](mat33.md#solve33)
* [add](mat33.md#static-add)
* [assert](mat33.md#static-assert)
* [isValid](mat33.md#static-isvalid)
* [mulVec2](mat33.md#static-mulvec2)
* [mulVec3](mat33.md#static-mulvec3)

## Properties

###  ex

• **ex**: *[Vec3](vec3.md)*

*Defined in [common/Mat33.ts:36](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L36)*

___

###  ey

• **ey**: *[Vec3](vec3.md)*

*Defined in [common/Mat33.ts:37](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L37)*

___

###  ez

• **ez**: *[Vec3](vec3.md)*

*Defined in [common/Mat33.ts:38](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L38)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/Mat33.ts:139](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L139)*

Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
singular.

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  getSymInverse33

▸ **getSymInverse33**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/Mat33.ts:163](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L163)*

Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
if singular.

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *[Mat33](mat33.md)*

*Defined in [common/Mat33.ts:74](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L74)*

Set this matrix to all zeros.

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Mat33.ts:120](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L120)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
equation.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  solve33

▸ **solve33**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Mat33.ts:85](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L85)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` add

▸ **add**(`a`: [Mat33](mat33.md), `b`: [Mat33](mat33.md)): *[Mat33](mat33.md)*

*Defined in [common/Mat33.ts:230](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Mat33](mat33.md) |

**Returns:** *[Mat33](mat33.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/Mat33.ts:67](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [common/Mat33.ts:60](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](mat33.md), `b`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Mat33.ts:222](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L222)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Mat33.ts:213](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Mat33.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
