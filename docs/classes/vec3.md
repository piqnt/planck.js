[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec3](vec3.md)

# Class: Vec3

## Hierarchy

* **Vec3**

## Callable

▸ **Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:92](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:93](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L93)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:94](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L94)*

**Returns:** *[Vec3](vec3.md)*

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

## Constructors

###  constructor

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:106](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:108](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L108)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:109](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L109)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

*Defined in [common/index.d.ts:96](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L96)*

___

###  y

• **y**: *number*

*Defined in [common/index.d.ts:97](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L97)*

___

###  z

• **z**: *number*

*Defined in [common/index.d.ts:98](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L98)*

## Methods

###  add

▸ **add**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:103](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:105](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:106](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L106)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:102](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L102)*

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

*Defined in [common/index.d.ts:101](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L101)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:104](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:100](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L100)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:117](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *boolean*

*Defined in [common/index.d.ts:114](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:123](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:113](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:116](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` dot

▸ **dot**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *number*

*Defined in [common/index.d.ts:115](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`v`: any): *void*

*Defined in [common/index.d.ts:122](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *void*

___

### `Static` mul

▸ **mul**(`v`: [Vec3](vec3.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:119](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:120](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:118](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
