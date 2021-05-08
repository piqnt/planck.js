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
* [wAdd](vec2.md#wadd)
* [wSet](vec2.md#wset)
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
* [scaleFn](vec2.md#static-scalefn)
* [skew](vec2.md#static-skew)
* [sub](vec2.md#static-sub)
* [translateFn](vec2.md#static-translatefn)
* [upper](vec2.md#static-upper)
* [wAdd](vec2.md#static-wadd)
* [zero](vec2.md#static-zero)

## Constructors

###  constructor

\+ **new Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:37](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L37)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:38](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L38)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

*Defined in [src/common/Vec2.ts:34](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L35)*

## Methods

###  add

▸ **add**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:192](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L192)*

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

*Defined in [src/common/Vec2.ts:213](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L213)*

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

*Defined in [src/common/Vec2.ts:228](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  clamp

▸ **clamp**(`max`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:513](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L513)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  clone

▸ **clone**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:112](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L112)*

**Returns:** *[Vec2](vec2.md)*

___

###  length

▸ **length**(): *number*

*Defined in [src/common/Vec2.ts:306](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L306)*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [src/common/Vec2.ts:313](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L313)*

Get the length squared.

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:294](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L294)*

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

*Defined in [src/common/Vec2.ts:479](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L479)*

**Returns:** *[Vec2](vec2.md)*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [src/common/Vec2.ts:322](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L322)*

Convert this vector into a unit vector.

**Returns:** *number*

old length

___

###  set

▸ **set**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:127](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L127)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

this

▸ **set**(`value`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:128](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L128)*

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

*Defined in [src/common/Vec2.ts:162](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L162)*

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

*Defined in [src/common/Vec2.ts:176](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setZero

▸ **setZero**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:121](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L121)*

Set this vector to all zeros.

**Returns:** *[Vec2](vec2.md)*

this

___

###  sub

▸ **sub**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:282](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L282)*

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

*Defined in [src/common/Vec2.ts:252](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L252)*

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

*Defined in [src/common/Vec2.ts:266](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/Vec2.ts:93](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L93)*

**Returns:** *string*

___

###  wAdd

▸ **wAdd**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)‹›*

*Defined in [src/common/Vec2.ts:202](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L202)*

**`deprecated`** Use addCombine or addMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  wSet

▸ **wSet**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)‹›*

*Defined in [src/common/Vec2.ts:151](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L151)*

**`deprecated`** Use setCombine or setMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

###  wSub

▸ **wSub**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)‹›*

*Defined in [src/common/Vec2.ts:242](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L242)*

**`deprecated`** Use subCombine or subMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

### `Static` abs

▸ **abs**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:490](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L490)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` add

▸ **add**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:437](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L437)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:417](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L417)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:418](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L418)*

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

*Defined in [src/common/Vec2.ts:367](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Vec2.ts:104](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2](vec2.md), `max`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:523](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L523)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` clone

▸ **clone**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:88](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:454](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L454)*

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

*Defined in [src/common/Vec2.ts:390](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L390)*

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

*Defined in [src/common/Vec2.ts:391](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L391)*

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

*Defined in [src/common/Vec2.ts:392](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L392)*

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

*Defined in [src/common/Vec2.ts:351](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L351)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:359](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L359)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:384](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L384)*

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

*Defined in [src/common/Vec2.ts:100](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L100)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2](vec2.md)): *number*

*Defined in [src/common/Vec2.ts:338](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L338)*

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

*Defined in [src/common/Vec2.ts:346](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L346)*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:507](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L507)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mid

▸ **mid**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:495](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L495)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mul

▸ **mul**(`a`: [Vec2](vec2.md), `b`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:464](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L464)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: number, `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:465](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L465)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:485](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L485)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` scaleFn

▸ **scaleFn**(`x`: any, `y`: any): *(Anonymous function)*

*Defined in [src/common/Vec2.ts:532](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L532)*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |
`y` | any |

**Returns:** *(Anonymous function)*

___

### `Static` skew

▸ **skew**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:376](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L376)*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:458](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L458)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` translateFn

▸ **translateFn**(`x`: any, `y`: any): *(Anonymous function)*

*Defined in [src/common/Vec2.ts:541](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L541)*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |
`y` | any |

**Returns:** *(Anonymous function)*

___

### `Static` upper

▸ **upper**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:501](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L501)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` wAdd

▸ **wAdd**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)‹›*

*Defined in [src/common/Vec2.ts:446](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L446)*

**`deprecated`** Use combine

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)‹›*

___

### `Static` zero

▸ **zero**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:73](https://github.com/shakiba/planck.js/blob/1523746/src/common/Vec2.ts#L73)*

**Returns:** *[Vec2](vec2.md)*
