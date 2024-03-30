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
* [add](mat33.md#static-add)
* [assert](mat33.md#static-assert)
* [isValid](mat33.md#static-isvalid)
* [mul](mat33.md#static-mul)
* [mulVec2](mat33.md#static-mulvec2)
* [mulVec3](mat33.md#static-mulvec3)

## Constructors

###  constructor

\+ **new Mat33**(`a`: [Vec3Value](../interfaces/vec3value.md), `b`: [Vec3Value](../interfaces/vec3value.md), `c`: [Vec3Value](../interfaces/vec3value.md)): *[Mat33](mat33.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec3Value](../interfaces/vec3value.md) |
`b` | [Vec3Value](../interfaces/vec3value.md) |
`c` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(): *[Mat33](mat33.md)*

**Returns:** *[Mat33](mat33.md)*

## Properties

###  ex

• **ex**: *[Vec3](vec3.md)*

___

###  ey

• **ey**: *[Vec3](vec3.md)*

___

###  ez

• **ez**: *[Vec3](vec3.md)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

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

Set this matrix to all zeros.

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
equation.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  solve33

▸ **solve33**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

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

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Mat33](mat33.md) |

**Returns:** *[Mat33](mat33.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Multiply a matrix times a vector.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](mat33.md), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
