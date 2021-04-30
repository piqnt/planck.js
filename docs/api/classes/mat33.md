[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat33](mat33.md)

# Class: Mat33

A 3-by-3 matrix. Stored in column-major order.
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

*Defined in [dist/planck.d.ts:284](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L284)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec3](vec3.md) |
`b` | [Vec3](vec3.md) |
`c` | [Vec3](vec3.md) |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(): *[Mat33](mat33.md)*

*Defined in [dist/planck.d.ts:285](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L285)*

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(`a`: Vec3, `b`: Vec3, `c`: Vec3): *[Mat33](mat33.md)*

*Defined in [src/common/Mat33.ts:40](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Vec3 |
`b` | Vec3 |
`c` | Vec3 |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(): *[Mat33](mat33.md)*

*Defined in [src/common/Mat33.ts:42](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L42)*

**Returns:** *[Mat33](mat33.md)*

## Properties

###  ex

• **ex**: *Vec3*

*Defined in [dist/planck.d.ts:282](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L282)*

*Defined in [src/common/Mat33.ts:38](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L38)*

___

###  ey

• **ey**: *Vec3*

*Defined in [dist/planck.d.ts:283](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L283)*

*Defined in [src/common/Mat33.ts:39](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L39)*

___

###  ez

• **ez**: *Vec3*

*Defined in [dist/planck.d.ts:284](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L284)*

*Defined in [src/common/Mat33.ts:40](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L40)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

*Defined in [dist/planck.d.ts:309](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L309)*

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

*Defined in [dist/planck.d.ts:314](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L314)*

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

*Defined in [dist/planck.d.ts:293](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L293)*

Set this matrix to all zeros.

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:304](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L304)*

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

*Defined in [dist/planck.d.ts:298](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L298)*

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

*Defined in [dist/planck.d.ts:287](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L287)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`a`: [Mat33](mat33.md), `b`: [Mat33](mat33.md)): *[Mat33](mat33.md)*

*Defined in [dist/planck.d.ts:322](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L322)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Mat33](mat33.md) |

**Returns:** *[Mat33](mat33.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:289](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [dist/planck.d.ts:288](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:318](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L318)*

Multiply a matrix times a vector.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:319](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L319)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

▸ **mul**(`a`: Mat33, `b`: Vec2): *Vec2*

*Defined in [src/common/Mat33.ts:174](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L174)*

Multiply a matrix times a vector.

**Parameters:**

Name | Type |
------ | ------ |
`a` | Mat33 |
`b` | Vec2 |

**Returns:** *Vec2*

▸ **mul**(`a`: Mat33, `b`: Vec3): *Vec3*

*Defined in [src/common/Mat33.ts:175](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Mat33.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Mat33 |
`b` | Vec3 |

**Returns:** *Vec3*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:321](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L321)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:320](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L320)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
