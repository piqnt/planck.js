[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec2](vec2.md)

# Class: Vec2

## Hierarchy

* **Vec2**

## Callable

▸ **Vec2**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:30](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:31](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L31)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **Vec2**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:32](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L32)*

**Returns:** *[Vec2](vec2.md)*

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

*Defined in [common/index.d.ts:55](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(`obj`: object): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:57](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L57)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

\+ **new Vec2**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:58](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L58)*

**Returns:** *[Vec2](vec2.md)*

## Properties

###  x

• **x**: *number*

*Defined in [common/index.d.ts:34](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [common/index.d.ts:35](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L35)*

## Methods

###  add

▸ **add**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:44](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  addCombine

▸ **addCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:45](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L45)*

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

*Defined in [common/index.d.ts:46](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  clamp

▸ **clamp**(`max`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:55](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  clone

▸ **clone**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:38](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L38)*

**Returns:** *[Vec2](vec2.md)*

___

###  length

▸ **length**(): *number*

*Defined in [common/index.d.ts:51](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L51)*

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [common/index.d.ts:52](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L52)*

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:50](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  neg

▸ **neg**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:54](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L54)*

**Returns:** *[Vec2](vec2.md)*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [common/index.d.ts:53](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L53)*

**Returns:** *number*

___

###  set

▸ **set**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:40](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **set**(`value`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:41](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:42](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L42)*

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

*Defined in [common/index.d.ts:43](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setZero

▸ **setZero**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:39](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L39)*

**Returns:** *[Vec2](vec2.md)*

___

###  sub

▸ **sub**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:47](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  subCombine

▸ **subCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:48](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L48)*

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

*Defined in [common/index.d.ts:49](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:37](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L37)*

**Returns:** *string*

___

### `Static` abs

▸ **abs**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:85](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` add

▸ **add**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:78](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` addCross

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:76](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **addCross**(`a`: [Vec2](vec2.md), `v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:77](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L77)*

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

*Defined in [common/index.d.ts:70](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:65](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`v`: [Vec2](vec2.md), `max`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:89](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` clone

▸ **clone**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:63](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` combine

▸ **combine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:79](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L79)*

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

*Defined in [common/index.d.ts:73](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

▸ **cross**(`v`: [Vec2](vec2.md), `w`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:74](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **cross**(`v`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:75](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | number |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` distance

▸ **distance**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [common/index.d.ts:68](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` distanceSquared

▸ **distanceSquared**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [common/index.d.ts:69](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` dot

▸ **dot**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *number*

*Defined in [common/index.d.ts:72](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`v`: any): *boolean*

*Defined in [common/index.d.ts:64](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` lengthOf

▸ **lengthOf**(`v`: [Vec2](vec2.md)): *number*

*Defined in [common/index.d.ts:66](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lengthSquared

▸ **lengthSquared**(`v`: [Vec2](vec2.md)): *number*

*Defined in [common/index.d.ts:67](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *number*

___

### `Static` lower

▸ **lower**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:88](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mid

▸ **mid**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:86](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mul

▸ **mul**(`a`: [Vec2](vec2.md), `b`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:82](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: number, `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:83](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:84](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` skew

▸ **skew**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:71](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:81](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` upper

▸ **upper**(`v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:87](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` zero

▸ **zero**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:61](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L61)*

**Returns:** *[Vec2](vec2.md)*
