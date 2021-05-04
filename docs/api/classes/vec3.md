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

*Defined in [common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:38](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L38)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:39](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L39)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

*Defined in [common/Vec3.ts:34](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [common/Vec3.ts:35](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L35)*

___

###  z

• **z**: *number*

*Defined in [common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L36)*

## Methods

###  add

▸ **add**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:134](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:148](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:194](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L194)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:127](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L127)*

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

*Defined in [common/Vec3.ts:120](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L120)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:141](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/Vec3.ts:101](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L101)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:182](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *boolean*

*Defined in [common/Vec3.ts:155](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/Vec3.ts:112](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:96](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:174](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L174)*

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

*Defined in [common/Vec3.ts:167](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L167)*

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

*Defined in [common/Vec3.ts:108](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L108)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3](vec3.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:190](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:201](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L201)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:186](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

*Defined in [common/Vec3.ts:88](https://github.com/shakiba/planck.js/blob/8127f05/src/common/Vec3.ts#L88)*

**Returns:** *[Vec3](vec3.md)*
