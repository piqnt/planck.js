[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec2](vec2.md)

# Class: Vec2

## Hierarchy

* **Vec2**

## Callable

▸ **Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:38](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:39](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L39)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **Vec2**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:43](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L43)*

**Returns:** *[Vec2](vec2.md)*

## Index

### Constructors

* [constructor](vec2.md#constructor)

### Properties

* [x](vec2.md#x)
* [y](vec2.md#y)

### Methods

* [_serialize](vec2.md#_serialize)
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
* [_deserialize](vec2.md#static-_deserialize)
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

*Defined in [dist/planck.d.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:47](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L47)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:51](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L51)*

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:37](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L37)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [src/common/Vec2.ts:38](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L38)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

*Defined in [dist/planck.d.ts:45](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L45)*

*Defined in [src/common/Vec2.ts:34](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [dist/planck.d.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L46)*

*Defined in [src/common/Vec2.ts:35](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L35)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Defined in [dist/planck.d.ts:53](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L53)*

**Returns:** *object*

* **x**: *number*

* **y**: *number*

___

###  add

▸ **add**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:89](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L89)*

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

*Defined in [dist/planck.d.ts:97](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L97)*

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

*Defined in [dist/planck.d.ts:98](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  clamp

▸ **clamp**(`max`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:177](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  clone

▸ **clone**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:66](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L66)*

**Returns:** *[Vec2](vec2.md)*

___

###  length

▸ **length**(): *number*

*Defined in [dist/planck.d.ts:125](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L125)*

Get the length of this vector (the norm).

For performance, use this instead of lengthSquared (if possible).

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [dist/planck.d.ts:129](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L129)*

Get the length squared.

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:119](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L119)*

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

*Defined in [dist/planck.d.ts:171](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L171)*

**Returns:** *[Vec2](vec2.md)*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [dist/planck.d.ts:135](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L135)*

Convert this vector into a unit vector.

**Returns:** *number*

old length

___

###  set

▸ **set**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:73](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L73)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

this

▸ **set**(`value`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:74](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L74)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

this

▸ **set**(`x`: number, `y`: number): *Vec2*

*Defined in [src/common/Vec2.ts:125](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L125)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Vec2*

this

▸ **set**(`value`: Vec2): *Vec2*

*Defined in [src/common/Vec2.ts:126](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L126)*

Set this vector to some specified coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`value` | Vec2 |

**Returns:** *Vec2*

this

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:82](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L82)*

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

*Defined in [dist/planck.d.ts:83](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setZero

▸ **setZero**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:72](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L72)*

Set this vector to all zeros.

**Returns:** *[Vec2](vec2.md)*

this

___

###  sub

▸ **sub**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:113](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L113)*

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

*Defined in [dist/planck.d.ts:106](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L106)*

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

*Defined in [dist/planck.d.ts:107](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:60](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L60)*

**Returns:** *string*

___

###  wAdd

▸ **wAdd**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:93](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L93)*

**`deprecated`** Use addCombine or addMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)*

___

###  wSet

▸ **wSet**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:78](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L78)*

**`deprecated`** Use setCombine or setMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)*

___

###  wSub

▸ **wSub**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:102](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L102)*

**`deprecated`** Use subCombine or subMul

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any): *any*

*Defined in [dist/planck.d.ts:57](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *any*

___

### `Static` abs

▸ **abs**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:173](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` add

▸ **add**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:162](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:160](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L160)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:161](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L161)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **addCross**(`a`: Vec2, `v`: Vec2, `w`: number): *Vec2*

*Defined in [src/common/Vec2.ts:415](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L415)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | Vec2 |
`v` | Vec2 |
`w` | number |

**Returns:** *Vec2*

▸ **addCross**(`a`: Vec2, `v`: number, `w`: Vec2): *Vec2*

*Defined in [src/common/Vec2.ts:416](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L416)*

Returns `a + (v x w)`

**Parameters:**

Name | Type |
------ | ------ |
`a` | Vec2 |
`v` | number |
`w` | Vec2 |

**Returns:** *Vec2*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *boolean*

*Defined in [dist/planck.d.ts:148](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:65](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2](vec2.md), `max`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:178](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` clone

▸ **clone**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:59](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:167](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L167)*

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

*Defined in [dist/planck.d.ts:157](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L157)*

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

*Defined in [dist/planck.d.ts:158](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L158)*

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

*Defined in [dist/planck.d.ts:159](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L159)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **cross**(`v`: Vec2, `w`: Vec2): *number*

*Defined in [src/common/Vec2.ts:388](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L388)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | Vec2 |
`w` | Vec2 |

**Returns:** *number*

▸ **cross**(`v`: Vec2, `w`: number): *Vec2*

*Defined in [src/common/Vec2.ts:389](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L389)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | Vec2 |
`w` | number |

**Returns:** *Vec2*

▸ **cross**(`v`: number, `w`: Vec2): *Vec2*

*Defined in [src/common/Vec2.ts:390](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L390)*

Perform the cross product on two vectors. In 2D this produces a scalar.

Perform the cross product on a vector and a scalar. In 2D this produces a
vector.

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | Vec2 |

**Returns:** *Vec2*

___

### `Static` distance

▸ **distance**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [dist/planck.d.ts:146](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [dist/planck.d.ts:147](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [dist/planck.d.ts:156](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L156)*

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

*Defined in [dist/planck.d.ts:64](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L64)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2](vec2.md)): *number*

*Defined in [dist/planck.d.ts:141](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L141)*

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

*Defined in [dist/planck.d.ts:145](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L145)*

Get the length squared.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:176](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mid

▸ **mid**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:174](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mul

▸ **mul**(`a`: [Vec2](vec2.md), `b`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:169](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: number, `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:170](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L170)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: Vec2, `b`: number): *Vec2*

*Defined in [src/common/Vec2.ts:462](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L462)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Vec2 |
`b` | number |

**Returns:** *Vec2*

▸ **mul**(`a`: number, `b`: Vec2): *Vec2*

*Defined in [src/common/Vec2.ts:463](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec2.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | Vec2 |

**Returns:** *Vec2*

___

### `Static` neg

▸ **neg**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:172](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` scaleFn

▸ **scaleFn**(`x`: any, `y`: any): *function*

*Defined in [dist/planck.d.ts:182](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L182)*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |
`y` | any |

**Returns:** *function*

▸ (`v`: any): *[Vec2](vec2.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

___

### `Static` skew

▸ **skew**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:152](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L152)*

Get the skew vector such that dot(skew_vec, other) == cross(vec, other)

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:168](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` translateFn

▸ **translateFn**(`x`: any, `y`: any): *function*

*Defined in [dist/planck.d.ts:186](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L186)*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |
`y` | any |

**Returns:** *function*

▸ (`v`: any): *[Vec2](vec2.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

___

### `Static` upper

▸ **upper**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:175](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` wAdd

▸ **wAdd**(`a`: any, `v`: any, `b`: any, `w`: any): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:166](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L166)*

**`deprecated`** Use combine

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`v` | any |
`b` | any |
`w` | any |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` zero

▸ **zero**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:58](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L58)*

**Returns:** *[Vec2](vec2.md)*
