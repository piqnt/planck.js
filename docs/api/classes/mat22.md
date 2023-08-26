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

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(`a`: object, `b`: object): *[Mat22](mat22.md)*

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

**Returns:** *[Mat22](mat22.md)*

## Properties

###  ex

• **ex**: *Vec2*

___

###  ey

• **ey**: *Vec2*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

**Returns:** *[Mat22](mat22.md)*

___

###  set

▸ **set**(`a`: [Mat22](mat22.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](mat22.md) |

**Returns:** *void*

▸ **set**(`a`: Vec2, `b`: Vec2): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Vec2 |
`b` | Vec2 |

**Returns:** *void*

▸ **set**(`a`: number, `b`: number, `c`: number, `d`: number): *void*

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

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: Vec2): *Vec2*

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

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](mat22.md), `mx2`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](mat22.md) |
`mx2` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

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

▸ **mul**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

Multiply a matrix times a vector. If a rotation matrix is provided, then this
transforms the vector from one frame to another.

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mul**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulT

▸ **mulT**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

Multiply a matrix transpose times a vector. If a rotation matrix is provided,
then this transforms the vector from one frame to another (inverse
transform).

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mulT**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulTMat22

▸ **mulTMat22**(`mx`: [Mat22](mat22.md), `v`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: [Mat22](mat22.md), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | Vec2 |

**Returns:** *Vec2*
