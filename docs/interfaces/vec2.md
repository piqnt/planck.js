[API Doc](../README.md) › [Vec2](vec2.md)

# Interface: Vec2

## Hierarchy

* **Vec2**

## Index

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

## Properties

###  x

• **x**: *number*

*Defined in [common/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L31)*

___

###  y

• **y**: *number*

*Defined in [common/index.d.ts:32](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L32)*

## Methods

###  add

▸ **add**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:41](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  addCombine

▸ **addCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:42](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L42)*

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

*Defined in [common/index.d.ts:43](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  clamp

▸ **clamp**(`max`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:52](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`max` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  clone

▸ **clone**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:35](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L35)*

**Returns:** *[Vec2](vec2.md)*

___

###  length

▸ **length**(): *number*

*Defined in [common/index.d.ts:48](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L48)*

**Returns:** *number*

___

###  lengthSquared

▸ **lengthSquared**(): *number*

*Defined in [common/index.d.ts:49](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L49)*

**Returns:** *number*

___

###  mul

▸ **mul**(`m`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:47](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  neg

▸ **neg**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:51](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L51)*

**Returns:** *[Vec2](vec2.md)*

___

###  normalize

▸ **normalize**(): *number*

*Defined in [common/index.d.ts:50](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L50)*

**Returns:** *number*

___

###  set

▸ **set**(`x`: number, `y`: number): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Vec2](vec2.md)*

▸ **set**(`value`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:38](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setCombine

▸ **setCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:39](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L39)*

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

*Defined in [common/index.d.ts:40](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  setZero

▸ **setZero**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:36](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L36)*

**Returns:** *[Vec2](vec2.md)*

___

###  sub

▸ **sub**(`w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:44](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  subCombine

▸ **subCombine**(`a`: number, `v`: [Vec2](vec2.md), `b`: number, `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:45](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L45)*

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

*Defined in [common/index.d.ts:46](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:34](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L34)*

**Returns:** *string*
