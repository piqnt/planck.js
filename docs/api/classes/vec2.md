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
* [setZero](vec2.md#setzero)
* [sub](vec2.md#sub)
* [subCombine](vec2.md#subcombine)
* [subMul](vec2.md#submul)
* [toString](vec2.md#tostring)
* [wSub](vec2.md#wsub)
* [abs](vec2.md#static-abs)
* [add](vec2.md#static-add)
* [addCross](vec2.md#static-addcross)
* [areEqual](vec2.md#static-areequal)
* [assert](vec2.md#static-assert)
* [clamp](vec2.md#static-clamp)
* [clone](vec2.md#static-clone)
* [combine](vec2.md#static-combine)
* [cross](vec2.md#static-cross)
* [distance](vec2.md#static-distance)
* [distanceSquared](vec2.md#static-distancesquared)
* [dot](vec2.md#static-dot)
* [isValid](vec2.md#static-isvalid)
* [lengthOf](vec2.md#static-lengthof)
* [lengthSquared](vec2.md#static-lengthsquared)
* [lower](vec2.md#static-lower)
* [mid](vec2.md#static-mid)
* [mul](vec2.md#static-mul)
* [neg](vec2.md#static-neg)
* [skew](vec2.md#static-skew)
* [sub](vec2.md#static-sub)
* [upper](vec2.md#static-upper)
* [zero](vec2.md#static-zero)

## Constructors

###  constructor

\+ **new Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:37](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L37)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L38)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

*Defined in [src/common/Vec2.ts:34](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L35)*

## Methods

###  add

▸ **add**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:196](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L196)*

Add a vector to this vector.

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

this

___

###  addCombine

▸ **addCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:218](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L218)*

Add linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |
`b` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  addMul

▸ **addMul**(`a`: number, `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:233](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  clamp

▸ **clamp**(`max`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:519](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L519)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  clone

▸ **clone**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:114](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L114)*

**Returns:** *[Vec2](vec2.md)*

___

###  length

▸ **length**(): *number*

*Defined in [src/common/Vec2.ts:311](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L311)*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [src/common/Vec2.ts:318](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L318)*

Get the length squared.

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:299](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L299)*

Multiply this vector by a scalar.

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec2](vec2.md)*

this

___

###  neg

▸ **neg**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:485](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L485)*

**Returns:** *[Vec2](vec2.md)*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [src/common/Vec2.ts:327](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L327)*

Convert this vector into a unit vector.

**Returns:** *number*

old length

___

###  set

▸ **set**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:129](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L129)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

this

▸ **set**(`value`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:130](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L130)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

this

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:166](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L166)*

Set linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |
`b` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setMul

▸ **setMul**(`a`: number, `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:180](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setZero

▸ **setZero**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:123](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L123)*

Set this vector to all zeros.

**Returns:** *[Vec2](vec2.md)*

this

___

###  sub

▸ **sub**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:287](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L287)*

Subtract a vector from this vector

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

this

___

###  subCombine

▸ **subCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:257](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L257)*

Subtract linear combination of v and w: `a * v + b * w`

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |
`b` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  subMul

▸ **subMul**(`a`: number, `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:271](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L271)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/Vec2.ts:95](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L95)*

**Returns:** *string*

___

###  wSub

▸ **wSub**(`a`: number, `v`: [Vec2](vec2.md), `b?`: number, `w?`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:247](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L247)*

**`deprecated`** Use subCombine or subMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |
`b?` | number |
`w?` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` abs

▸ **abs**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:496](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L496)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` add

▸ **add**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:444](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L444)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:423](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L423)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:424](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L424)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *boolean*

*Defined in [src/common/Vec2.ts:372](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L372)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Vec2.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2](vec2.md), `max`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:529](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L529)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` clone

▸ **clone**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:90](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:459](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L459)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |
`b` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:395](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L395)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

▸ **cross**(`v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:396](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L396)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **cross**(`v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:397](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L397)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` distance

▸ **distance**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:356](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:364](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:389](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L389)*

Perform the dot product on two vectors.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`v`: any): *boolean*

*Defined in [src/common/Vec2.ts:102](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L102)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:343](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L343)*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lengthSquared

▸ **lengthSquared**(`v`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:351](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L351)*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:513](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L513)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mid

▸ **mid**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:501](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L501)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mul

▸ **mul**(`a`: [Vec2](vec2.md), `b`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:469](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: number, `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:470](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L470)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:491](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L491)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` skew

▸ **skew**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:381](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L381)*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:463](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` upper

▸ **upper**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:507](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L507)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` zero

▸ **zero**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec2.ts#L75)*

**Returns:** *[Vec2](vec2.md)*
