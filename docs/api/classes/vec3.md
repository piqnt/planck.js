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

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

___

###  y

• **y**: *number*

___

###  z

• **z**: *number*

## Methods

###  add

▸ **add**(`w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

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

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` add

▸ **add**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

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

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3Value](../interfaces/vec3value.md), `m`: number): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3Value](../interfaces/vec3value.md), `w`: [Vec3Value](../interfaces/vec3value.md)): *[Vec3](vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](../interfaces/vec3value.md) |
`w` | [Vec3Value](../interfaces/vec3value.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

**Returns:** *[Vec3](vec3.md)*
