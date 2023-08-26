[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec2](vec2.md)

# Class: Vec2

## Hierarchy

* **Vec2**

## Index

### Constructors

* [constructor](vec2.md#constructor)

### Properties

* [x](vec2.md#x)
* [y](vec2.md#y)

### Methods

* [add](vec2.md#add)
* [addCombine](vec2.md#addcombine)
* [addMul](vec2.md#addmul)
* [clamp](vec2.md#clamp)
* [clone](vec2.md#clone)
* [length](vec2.md#length)
* [lengthSquared](vec2.md#lengthsquared)
* [mul](vec2.md#mul)
* [neg](vec2.md#neg)
* [normalize](vec2.md#normalize)
* [set](vec2.md#set)
* [setCombine](vec2.md#setcombine)
* [setMul](vec2.md#setmul)
* [setNum](vec2.md#setnum)
* [setVec2](vec2.md#setvec2)
* [setZero](vec2.md#setzero)
* [sub](vec2.md#sub)
* [subCombine](vec2.md#subcombine)
* [subMul](vec2.md#submul)
* [wSub](vec2.md#wsub)
* [abs](vec2.md#static-abs)
* [add](vec2.md#static-add)
* [addCross](vec2.md#static-addcross)
* [addCrossNumVec2](vec2.md#static-addcrossnumvec2)
* [addCrossVec2Num](vec2.md#static-addcrossvec2num)
* [areEqual](vec2.md#static-areequal)
* [assert](vec2.md#static-assert)
* [clamp](vec2.md#static-clamp)
* [clone](vec2.md#static-clone)
* [combine](vec2.md#static-combine)
* [cross](vec2.md#static-cross)
* [crossNumVec2](vec2.md#static-crossnumvec2)
* [crossVec2Num](vec2.md#static-crossvec2num)
* [crossVec2Vec2](vec2.md#static-crossvec2vec2)
* [distance](vec2.md#static-distance)
* [distanceSquared](vec2.md#static-distancesquared)
* [dot](vec2.md#static-dot)
* [isValid](vec2.md#static-isvalid)
* [lengthOf](vec2.md#static-lengthof)
* [lengthSquared](vec2.md#static-lengthsquared)
* [lower](vec2.md#static-lower)
* [mid](vec2.md#static-mid)
* [mul](vec2.md#static-mul)
* [mulNumVec2](vec2.md#static-mulnumvec2)
* [mulVec2Num](vec2.md#static-mulvec2num)
* [neg](vec2.md#static-neg)
* [skew](vec2.md#static-skew)
* [sub](vec2.md#static-sub)
* [upper](vec2.md#static-upper)
* [zero](vec2.md#static-zero)

## Constructors

###  constructor

\+ **new Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

___

###  y

• **y**: *number*

## Methods

###  add

▸ **add**(`w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Add a vector to this vector.

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

this

___

###  addCombine

▸ **addCombine**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md), `b`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Add linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  addMul

▸ **addMul**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  clamp

▸ **clamp**(`max`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *Vec2*

___

###  clone

▸ **clone**(): *Vec2*

**Returns:** *Vec2*

___

###  length

▸ **length**(): *number*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

Get the length squared.

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *Vec2*

Multiply this vector by a scalar.

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *Vec2*

this

___

###  neg

▸ **neg**(): *Vec2*

**Returns:** *Vec2*

___

###  normalize

▸ **normalize**(): *number*

Convert this vector into a unit vector.

**Returns:** *number*

old length

___

###  set

▸ **set**(`x`: number, `y`: number): *Vec2*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Vec2*

this

▸ **set**(`value`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

this

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md), `b`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Set linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  setMul

▸ **setMul**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  setNum

▸ **setNum**(`x`: number, `y`: number): *this*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *this*

this

___

###  setVec2

▸ **setVec2**(`value`: [Vec2Value](../interfaces/vec2value.md)): *this*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *this*

this

___

###  setZero

▸ **setZero**(): *Vec2*

Set this vector to all zeros.

**Returns:** *Vec2*

this

___

###  sub

▸ **sub**(`w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Subtract a vector from this vector

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

this

___

###  subCombine

▸ **subCombine**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md), `b`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Subtract linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  subMul

▸ **subMul**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  wSub

▸ **wSub**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md), `b?`: number, `w?`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**`deprecated`** Use subCombine or subMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`b?` | number |
`w?` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` abs

▸ **abs**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` add

▸ **add**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2Value](../interfaces/vec2value.md), `v`: [Vec2Value](../interfaces/vec2value.md), `w`: number): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | number |

**Returns:** *Vec2*

▸ **addCross**(`a`: [Vec2Value](../interfaces/vec2value.md), `v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`v` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` addCrossNumVec2

▸ **addCrossNumVec2**(`a`: [Vec2Value](../interfaces/vec2value.md), `v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`v` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` addCrossVec2Num

▸ **addCrossVec2Num**(`a`: [Vec2Value](../interfaces/vec2value.md), `v`: [Vec2Value](../interfaces/vec2value.md), `w`: number): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | number |

**Returns:** *Vec2*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2Value](../interfaces/vec2value.md), `max`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`max` | number |

**Returns:** *Vec2*

___

### `Static` clone

▸ **clone**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: Vec2, `b`: number, `w`: Vec2): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | Vec2 |
`b` | number |
`w` | Vec2 |

**Returns:** *Vec2*

___

### `Static` cross

▸ **cross**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

Cross product between two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

▸ **cross**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: number): *Vec2*

Cross product between a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | number |

**Returns:** *Vec2*

▸ **cross**(`v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Cross product between a scalar and a vector

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` crossNumVec2

▸ **crossNumVec2**(`v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Cross product on a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` crossVec2Num

▸ **crossVec2Num**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: number): *Vec2*

Cross product on a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | number |

**Returns:** *Vec2*

___

### `Static` crossVec2Vec2

▸ **crossVec2Vec2**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

Cross product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` distance

▸ **distance**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

Dot product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2Value](../interfaces/vec2value.md)): *number*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` lengthSquared

▸ **lengthSquared**(`v`: [Vec2Value](../interfaces/vec2value.md)): *number*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mid

▸ **mid**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mul

▸ **mul**(`a`: [Vec2Value](../interfaces/vec2value.md), `b`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |

**Returns:** *Vec2*

▸ **mul**(`a`: number, `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulNumVec2

▸ **mulNumVec2**(`a`: number, `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulVec2Num

▸ **mulVec2Num**(`a`: [Vec2Value](../interfaces/vec2value.md), `b`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |

**Returns:** *Vec2*

___

### `Static` neg

▸ **neg**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` skew

▸ **skew**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` sub

▸ **sub**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` upper

▸ **upper**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` zero

▸ **zero**(): *Vec2*

**Returns:** *Vec2*
