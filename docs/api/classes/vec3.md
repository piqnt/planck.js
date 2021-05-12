[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec3](vec3.md)

# Class: Vec3

## Hierarchy

* **Vec3**

## Index

### Constructors

* [constructor](vec3.md#constructor)

### Properties

* [x](vec3.md#x)
* [y](vec3.md#y)
* [z](vec3.md#z)

### Methods

* [add](vec3.md#add)
* [mul](vec3.md#mul)
* [neg](vec3.md#neg)
* [set](vec3.md#set)
* [setZero](vec3.md#setzero)
* [sub](vec3.md#sub)
* [toString](vec3.md#tostring)
* [add](vec3.md#static-add)
* [areEqual](vec3.md#static-areequal)
* [assert](vec3.md#static-assert)
* [clone](vec3.md#static-clone)
* [cross](vec3.md#static-cross)
* [dot](vec3.md#static-dot)
* [isValid](vec3.md#static-isvalid)
* [mul](vec3.md#static-mul)
* [neg](vec3.md#static-neg)
* [sub](vec3.md#static-sub)
* [zero](vec3.md#static-zero)

## Constructors

###  constructor

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:38](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L38)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:39](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L39)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

*Defined in [src/common/Vec3.ts:34](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [src/common/Vec3.ts:35](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L35)*

___

###  z

• **z**: *number*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L36)*

## Methods

###  add

▸ **add**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:136](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:150](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:196](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L196)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:129](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  setZero

▸ **setZero**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:122](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L122)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:143](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/Vec3.ts:103](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L103)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:184](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *boolean*

*Defined in [src/common/Vec3.ts:157](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Vec3.ts:114](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:98](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:176](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L176)*

Perform the cross product on two vectors. In 2D this produces a scalar.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` dot

▸ **dot**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *number*

*Defined in [src/common/Vec3.ts:169](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L169)*

Perform the dot product on two vectors.

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`v`: any): *boolean*

*Defined in [src/common/Vec3.ts:110](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L110)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3](vec3.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:192](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:203](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L203)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:188](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:90](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Vec3.ts#L90)*

**Returns:** *[Vec3](vec3.md)*
