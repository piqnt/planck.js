---
showOutline: false
---

# Class: Mat22

A 2-by-2 matrix. Stored in column-major order.

## Hierarchy

* **Mat22**

## Index

### Constructors

* [constructor](/api/classes/mat22#constructor)

### Properties

* [ex](/api/classes/mat22#ex)
* [ey](/api/classes/mat22#ey)

### Methods

* [getInverse](/api/classes/mat22#getinverse)
* [set](/api/classes/mat22#set)
* [setIdentity](/api/classes/mat22#setidentity)
* [setZero](/api/classes/mat22#setzero)
* [solve](/api/classes/mat22#solve)
* [abs](/api/classes/mat22#static-abs)
* [add](/api/classes/mat22#static-add)
* [assert](/api/classes/mat22#static-assert)
* [isValid](/api/classes/mat22#static-isvalid)
* [mul](/api/classes/mat22#static-mul)
* [mulMat22](/api/classes/mat22#static-mulmat22)
* [mulT](/api/classes/mat22#static-mult)
* [mulTMat22](/api/classes/mat22#static-multmat22)
* [mulTVec2](/api/classes/mat22#static-multvec2)
* [mulVec2](/api/classes/mat22#static-mulvec2)

## Constructors

###  constructor

\+ **new Mat22**(`a`: number, `b`: number, `c`: number, `d`: number): *[Mat22](/api/classes/mat22)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *[Mat22](/api/classes/mat22)*

\+ **new Mat22**(`a`: object, `b`: object): *[Mat22](/api/classes/mat22)*

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

**Returns:** *[Mat22](/api/classes/mat22)*

\+ **new Mat22**(): *[Mat22](/api/classes/mat22)*

**Returns:** *[Mat22](/api/classes/mat22)*

## Properties

###  ex

• **ex**: *Vec2*

___

###  ey

• **ey**: *Vec2*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](/api/classes/mat22)*

**Returns:** *[Mat22](/api/classes/mat22)*

___

###  set

▸ **set**(`a`: [Mat22](/api/classes/mat22)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](/api/classes/mat22) |

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

▸ **abs**(`mx`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](/api/classes/mat22), `mx2`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](/api/classes/mat22) |
`mx2` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

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

▸ **mul**(`mx`: [Mat22](/api/classes/mat22), `my`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

Multiply a matrix times a vector. If a rotation matrix is provided, then this
transforms the vector from one frame to another.

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`my` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

▸ **mul**(`mx`: [Mat22](/api/classes/mat22), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: [Mat22](/api/classes/mat22), `v`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

___

### `Static` mulT

▸ **mulT**(`mx`: [Mat22](/api/classes/mat22), `my`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

Multiply a matrix transpose times a vector. If a rotation matrix is provided,
then this transforms the vector from one frame to another (inverse
transform).

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`my` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

▸ **mulT**(`mx`: [Mat22](/api/classes/mat22), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulTMat22

▸ **mulTMat22**(`mx`: [Mat22](/api/classes/mat22), `v`: [Mat22](/api/classes/mat22)): *[Mat22](/api/classes/mat22)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | [Mat22](/api/classes/mat22) |

**Returns:** *[Mat22](/api/classes/mat22)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`mx`: [Mat22](/api/classes/mat22), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | Vec2 |

**Returns:** *Vec2*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: [Mat22](/api/classes/mat22), `v`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](/api/classes/mat22) |
`v` | Vec2 |

**Returns:** *Vec2*
