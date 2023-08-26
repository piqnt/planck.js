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
* [addCrossNumVec2](vec2.md#static-addcrossnumvec2)
* [addCrossVec2Num](vec2.md#static-addcrossvec2num)
* [areEqual](vec2.md#static-areequal)
* [assert](vec2.md#static-assert)
* [clamp](vec2.md#static-clamp)
* [clone](vec2.md#static-clone)
* [combine](vec2.md#static-combine)
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

*Defined in [src/common/Vec2.ts:43](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:45](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L45)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:46](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L46)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

*Defined in [src/common/Vec2.ts:42](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L42)*

___

###  y

• **y**: *number*

*Defined in [src/common/Vec2.ts:43](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L43)*

## Methods

###  add

▸ **add**(`w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:227](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L227)*

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

*Defined in [src/common/Vec2.ts:246](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L246)*

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

*Defined in [src/common/Vec2.ts:261](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  clamp

▸ **clamp**(`max`: number): *Vec2*

*Defined in [src/common/Vec2.ts:592](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L592)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *Vec2*

___

###  clone

▸ **clone**(): *Vec2*

*Defined in [src/common/Vec2.ts:121](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L121)*

**Returns:** *Vec2*

___

###  length

▸ **length**(): *number*

*Defined in [src/common/Vec2.ts:339](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L339)*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [src/common/Vec2.ts:346](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L346)*

Get the length squared.

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *Vec2*

*Defined in [src/common/Vec2.ts:327](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L327)*

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

*Defined in [src/common/Vec2.ts:558](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L558)*

**Returns:** *Vec2*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [src/common/Vec2.ts:355](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L355)*

Convert this vector into a unit vector.

**Returns:** *number*

old length

___

###  set

▸ **set**(`x`: number, `y`: number): *Vec2*

*Defined in [src/common/Vec2.ts:136](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L136)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Vec2*

this

▸ **set**(`value`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:137](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L137)*

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

*Defined in [src/common/Vec2.ts:197](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L197)*

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

*Defined in [src/common/Vec2.ts:211](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  setNum

▸ **setNum**(`x`: number, `y`: number): *this*

*Defined in [src/common/Vec2.ts:163](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L163)*

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

*Defined in [src/common/Vec2.ts:177](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L177)*

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

*Defined in [src/common/Vec2.ts:130](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L130)*

Set this vector to all zeros.

**Returns:** *Vec2*

this

___

###  sub

▸ **sub**(`w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:315](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L315)*

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

*Defined in [src/common/Vec2.ts:285](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L285)*

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

*Defined in [src/common/Vec2.ts:299](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L299)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  wSub

▸ **wSub**(`a`: number, `v`: [Vec2Value](../interfaces/vec2value.md), `b?`: number, `w?`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:275](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L275)*

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

*Defined in [src/common/Vec2.ts:569](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L569)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` add

▸ **add**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:505](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L505)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` addCrossNumVec2

▸ **addCrossNumVec2**(`a`: [Vec2Value](../interfaces/vec2value.md), `v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:499](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L499)*

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

*Defined in [src/common/Vec2.ts:490](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L490)*

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

*Defined in [src/common/Vec2.ts:400](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L400)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Vec2.ts:117](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2Value](../interfaces/vec2value.md), `max`: number): *Vec2*

*Defined in [src/common/Vec2.ts:602](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L602)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`max` | number |

**Returns:** *Vec2*

___

### `Static` clone

▸ **clone**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:97](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: Vec2, `b`: number, `w`: Vec2): *Vec2*

*Defined in [src/common/Vec2.ts:520](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L520)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | Vec2 |
`b` | number |
`w` | Vec2 |

**Returns:** *Vec2*

___

### `Static` crossNumVec2

▸ **crossNumVec2**(`v`: number, `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:461](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L461)*

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

*Defined in [src/common/Vec2.ts:454](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L454)*

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

*Defined in [src/common/Vec2.ts:447](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L447)*

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

*Defined in [src/common/Vec2.ts:384](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L384)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

*Defined in [src/common/Vec2.ts:392](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *number*

*Defined in [src/common/Vec2.ts:415](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L415)*

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

*Defined in [src/common/Vec2.ts:110](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L110)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2Value](../interfaces/vec2value.md)): *number*

*Defined in [src/common/Vec2.ts:371](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L371)*

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

*Defined in [src/common/Vec2.ts:379](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L379)*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:586](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L586)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mid

▸ **mid**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:574](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L574)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulNumVec2

▸ **mulNumVec2**(`a`: number, `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:552](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L552)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulVec2Num

▸ **mulVec2Num**(`a`: [Vec2Value](../interfaces/vec2value.md), `b`: number): *Vec2*

*Defined in [src/common/Vec2.ts:546](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L546)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`b` | number |

**Returns:** *Vec2*

___

### `Static` neg

▸ **neg**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:564](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L564)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` skew

▸ **skew**(`v`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:409](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L409)*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` sub

▸ **sub**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:524](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L524)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` upper

▸ **upper**(`v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Vec2.ts:580](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L580)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` zero

▸ **zero**(): *Vec2*

*Defined in [src/common/Vec2.ts:82](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Vec2.ts#L82)*

**Returns:** *Vec2*
