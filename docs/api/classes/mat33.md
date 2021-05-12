[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat33](mat33.md)

# Class: Mat33

A 3-by-3 matrix. Stored in column-major order.

## Hierarchy

* **Mat33**

## Index

### Constructors

* [constructor](mat33.md#constructor)

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
* [toString](mat33.md#tostring)
* [add](mat33.md#static-add)
* [assert](mat33.md#static-assert)
* [isValid](mat33.md#static-isvalid)
* [mul](mat33.md#static-mul)
* [mulVec2](mat33.md#static-mulvec2)
* [mulVec3](mat33.md#static-mulvec3)

## Constructors

###  constructor

\+ **new Mat33**(`a`: [Vec3](vec3.md), `b`: [Vec3](vec3.md), `c`: [Vec3](vec3.md)): *[Mat33](mat33.md)*

*Defined in [src/common/Mat33.ts:40](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec3](vec3.md) |
`b` | [Vec3](vec3.md) |
`c` | [Vec3](vec3.md) |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(): *[Mat33](mat33.md)*

*Defined in [src/common/Mat33.ts:42](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L42)*

**Returns:** *[Mat33](mat33.md)*

## Properties

###  ex

• **ex**: *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L38)*

___

###  ey

• **ey**: *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:39](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L39)*

___

###  ez

• **ez**: *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:40](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L40)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

*Defined in [src/common/Mat33.ts:122](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L122)*

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

*Defined in [src/common/Mat33.ts:146](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L146)*

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

*Defined in [src/common/Mat33.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L75)*

Set this matrix to all zeros.

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat33.ts:103](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L103)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
equation.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  solve33

▸ **solve33**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:86](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L86)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/Mat33.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L56)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`a`: [Mat33](mat33.md), `b`: [Mat33](mat33.md)): *[Mat33](mat33.md)*

*Defined in [src/common/Mat33.ts:213](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Mat33](mat33.md) |

**Returns:** *[Mat33](mat33.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Mat33.ts:64](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [src/common/Mat33.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat33.ts:174](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L174)*

Multiply a matrix times a vector.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:175](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Mat33.ts:205](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Mat33.ts:196](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Mat33.ts#L196)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
