
# Class: Mat33

A 3-by-3 matrix. Stored in column-major order.

## Hierarchy

* **Mat33**

## Index

### Constructors

* [constructor](/api/classes/mat33#constructor)

### Properties

* [ex](/api/classes/mat33#ex)
* [ey](/api/classes/mat33#ey)
* [ez](/api/classes/mat33#ez)

### Methods

* [getInverse22](/api/classes/mat33#getinverse22)
* [getSymInverse33](/api/classes/mat33#getsyminverse33)
* [setZero](/api/classes/mat33#setzero)
* [solve22](/api/classes/mat33#solve22)
* [solve33](/api/classes/mat33#solve33)
* [add](/api/classes/mat33#static-add)
* [assert](/api/classes/mat33#static-assert)
* [isValid](/api/classes/mat33#static-isvalid)
* [mul](/api/classes/mat33#static-mul)
* [mulVec2](/api/classes/mat33#static-mulvec2)
* [mulVec3](/api/classes/mat33#static-mulvec3)

## Constructors

###  constructor

\+ **new Mat33**(`a`: [Vec3Value](/api/interfaces/vec3value), `b`: [Vec3Value](/api/interfaces/vec3value), `c`: [Vec3Value](/api/interfaces/vec3value)): *[Mat33](/api/classes/mat33)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec3Value](/api/interfaces/vec3value) |
`b` | [Vec3Value](/api/interfaces/vec3value) |
`c` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Mat33](/api/classes/mat33)*

\+ **new Mat33**(): *[Mat33](/api/classes/mat33)*

**Returns:** *[Mat33](/api/classes/mat33)*

## Properties

###  ex

• **ex**: *[Vec3](/api/classes/vec3)*

___

###  ey

• **ey**: *[Vec3](/api/classes/vec3)*

___

###  ez

• **ez**: *[Vec3](/api/classes/vec3)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](/api/classes/mat33)): *void*

Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
singular.

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](/api/classes/mat33) |

**Returns:** *void*

___

###  getSymInverse33

▸ **getSymInverse33**(`M`: [Mat33](/api/classes/mat33)): *void*

Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
if singular.

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](/api/classes/mat33) |

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *[Mat33](/api/classes/mat33)*

Set this matrix to all zeros.

**Returns:** *[Mat33](/api/classes/mat33)*

___

###  solve22

▸ **solve22**(`v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
equation.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

###  solve33

▸ **solve33**(`v`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

Solve A * x = b, where b is a column vector. This is more efficient than
computing the inverse in one-shot cases.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` add

▸ **add**(`a`: [Mat33](/api/classes/mat33), `b`: [Mat33](/api/classes/mat33)): *[Mat33](/api/classes/mat33)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](/api/classes/mat33) |
`b` | [Mat33](/api/classes/mat33) |

**Returns:** *[Mat33](/api/classes/mat33)*

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

▸ **mul**(`a`: [Mat33](/api/classes/mat33), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Multiply a matrix times a vector.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](/api/classes/mat33) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

▸ **mul**(`a`: [Mat33](/api/classes/mat33), `b`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](/api/classes/mat33) |
`b` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](/api/classes/mat33), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](/api/classes/mat33) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](/api/classes/mat33), `b`: [Vec3](/api/classes/vec3)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](/api/classes/mat33) |
`b` | [Vec3](/api/classes/vec3) |

**Returns:** *[Vec3](/api/classes/vec3)*
