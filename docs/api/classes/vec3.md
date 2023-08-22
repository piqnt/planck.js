[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec3](vec3.md)

# Class: Vec3

## Hierarchy

* **Vec3**

## Index

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

## Properties

###  x

• **x**: *number*

*Defined in [common/Vec3.ts:37](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L37)*

___

###  y

• **y**: *number*

*Defined in [common/Vec3.ts:38](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L38)*

___

###  z

• **z**: *number*

*Defined in [common/Vec3.ts:39](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L39)*

## Methods

###  add

▸ **add**(`w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:136](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:150](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:192](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L192)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:129](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L129)*

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

*Defined in [common/Vec3.ts:122](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L122)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:143](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` add

▸ **add**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:180](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *boolean*

*Defined in [common/Vec3.ts:157](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/Vec3.ts:118](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:100](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:172](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L172)*

Cross product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` dot

▸ **dot**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *number*

*Defined in [common/Vec3.ts:167](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L167)*

Dot product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [common/Vec3.ts:111](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L111)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3Value](../interfaces/vec3value.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:188](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:199](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:184](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:92](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Vec3.ts#L92)*

**Returns:** *[Vec3](vec3.md)*
