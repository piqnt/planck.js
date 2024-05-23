
# Class: Vec2

## Hierarchy

* **Vec2**

## Index

### Constructors

* [constructor](/api/classes/vec2#constructor)

### Properties

* [x](/api/classes/vec2#x)
* [y](/api/classes/vec2#y)

### Methods

* [add](/api/classes/vec2#add)
* [addCombine](/api/classes/vec2#addcombine)
* [addMul](/api/classes/vec2#addmul)
* [clamp](/api/classes/vec2#clamp)
* [clone](/api/classes/vec2#clone)
* [length](/api/classes/vec2#length)
* [lengthSquared](/api/classes/vec2#lengthsquared)
* [mul](/api/classes/vec2#mul)
* [neg](/api/classes/vec2#neg)
* [normalize](/api/classes/vec2#normalize)
* [set](/api/classes/vec2#set)
* [setCombine](/api/classes/vec2#setcombine)
* [setMul](/api/classes/vec2#setmul)
* [setNum](/api/classes/vec2#setnum)
* [setVec2](/api/classes/vec2#setvec2)
* [setZero](/api/classes/vec2#setzero)
* [sub](/api/classes/vec2#sub)
* [subCombine](/api/classes/vec2#subcombine)
* [subMul](/api/classes/vec2#submul)
* [wSub](/api/classes/vec2#wsub)
* [abs](/api/classes/vec2#static-abs)
* [add](/api/classes/vec2#static-add)
* [addCross](/api/classes/vec2#static-addcross)
* [addCrossNumVec2](/api/classes/vec2#static-addcrossnumvec2)
* [addCrossVec2Num](/api/classes/vec2#static-addcrossvec2num)
* [areEqual](/api/classes/vec2#static-areequal)
* [assert](/api/classes/vec2#static-assert)
* [clamp](/api/classes/vec2#static-clamp)
* [clone](/api/classes/vec2#static-clone)
* [combine](/api/classes/vec2#static-combine)
* [cross](/api/classes/vec2#static-cross)
* [crossNumVec2](/api/classes/vec2#static-crossnumvec2)
* [crossVec2Num](/api/classes/vec2#static-crossvec2num)
* [crossVec2Vec2](/api/classes/vec2#static-crossvec2vec2)
* [distance](/api/classes/vec2#static-distance)
* [distanceSquared](/api/classes/vec2#static-distancesquared)
* [dot](/api/classes/vec2#static-dot)
* [isValid](/api/classes/vec2#static-isvalid)
* [lengthOf](/api/classes/vec2#static-lengthof)
* [lengthSquared](/api/classes/vec2#static-lengthsquared)
* [lower](/api/classes/vec2#static-lower)
* [mid](/api/classes/vec2#static-mid)
* [mul](/api/classes/vec2#static-mul)
* [mulNumVec2](/api/classes/vec2#static-mulnumvec2)
* [mulVec2Num](/api/classes/vec2#static-mulvec2num)
* [neg](/api/classes/vec2#static-neg)
* [skew](/api/classes/vec2#static-skew)
* [sub](/api/classes/vec2#static-sub)
* [upper](/api/classes/vec2#static-upper)
* [zero](/api/classes/vec2#static-zero)

## Constructors

###  constructor

\+ **new Vec2**(`x`: number, `y`: number): *[Vec2](/api/classes/vec2)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](/api/classes/vec2)*

\+ **new Vec2**(`obj`: object): *[Vec2](/api/classes/vec2)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](/api/classes/vec2)*

\+ **new Vec2**(): *[Vec2](/api/classes/vec2)*

**Returns:** *[Vec2](/api/classes/vec2)*

## Properties

###  x

• **x**: *number*

___

###  y

• **y**: *number*

## Methods

###  add

▸ **add**(`w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Add a vector to this vector.

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

this

___

###  addCombine

▸ **addCombine**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value), `b`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Add linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

###  addMul

▸ **addMul**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |

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

▸ **set**(`value`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

this

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value), `b`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Set linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

###  setMul

▸ **setMul**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |

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

▸ **setVec2**(`value`: [Vec2Value](/api/interfaces/vec2value)): *this*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2Value](/api/interfaces/vec2value) |

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

▸ **sub**(`w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Subtract a vector from this vector

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

this

___

###  subCombine

▸ **subCombine**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value), `b`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Subtract linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

###  subMul

▸ **subMul**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

###  wSub

▸ **wSub**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value), `b?`: number, `w?`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**`deprecated`** Use subCombine or subMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`b?` | number |
`w?` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` abs

▸ **abs**(`v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` add

▸ **add**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2Value](/api/interfaces/vec2value), `v`: [Vec2Value](/api/interfaces/vec2value), `w`: number): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | number |

**Returns:** *Vec2*

▸ **addCross**(`a`: [Vec2Value](/api/interfaces/vec2value), `v`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`v` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` addCrossNumVec2

▸ **addCrossNumVec2**(`a`: [Vec2Value](/api/interfaces/vec2value), `v`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`v` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` addCrossVec2Num

▸ **addCrossVec2Num**(`a`: [Vec2Value](/api/interfaces/vec2value), `v`: [Vec2Value](/api/interfaces/vec2value), `w`: number): *Vec2*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | number |

**Returns:** *Vec2*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

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

▸ **clamp**(`v`: [Vec2Value](/api/interfaces/vec2value), `max`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`max` | number |

**Returns:** *Vec2*

___

### `Static` clone

▸ **clone**(`v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: [Vec2Value](/api/interfaces/vec2value), `b`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` cross

▸ **cross**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *number*

Cross product between two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

▸ **cross**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: number): *Vec2*

Cross product between a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | number |

**Returns:** *Vec2*

▸ **cross**(`v`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Cross product between a scalar and a vector

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` crossNumVec2

▸ **crossNumVec2**(`v`: number, `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Cross product on a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` crossVec2Num

▸ **crossVec2Num**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: number): *Vec2*

Cross product on a vector and a scalar

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | number |

**Returns:** *Vec2*

___

### `Static` crossVec2Vec2

▸ **crossVec2Vec2**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *number*

Cross product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

### `Static` distance

▸ **distance**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *number*

Dot product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

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

▸ **lengthOf**(`v`: [Vec2Value](/api/interfaces/vec2value)): *number*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

### `Static` lengthSquared

▸ **lengthSquared**(`v`: [Vec2Value](/api/interfaces/vec2value)): *number*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mid

▸ **mid**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mul

▸ **mul**(`a`: [Vec2Value](/api/interfaces/vec2value), `b`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |

**Returns:** *Vec2*

▸ **mul**(`a`: number, `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulNumVec2

▸ **mulNumVec2**(`a`: number, `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulVec2Num

▸ **mulVec2Num**(`a`: [Vec2Value](/api/interfaces/vec2value), `b`: number): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`b` | number |

**Returns:** *Vec2*

___

### `Static` neg

▸ **neg**(`v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` skew

▸ **skew**(`v`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` sub

▸ **sub**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` upper

▸ **upper**(`v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` zero

▸ **zero**(): *Vec2*

**Returns:** *Vec2*
