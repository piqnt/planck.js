[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec3](vec3.md)

# Class: Vec3

## Hierarchy

* **Vec3**

## Callable

▸ **Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:183](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:184](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L184)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:189](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L189)*

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
* [zero](vec3.md#static-zero)

## Constructors

###  constructor

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:193](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:194](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L194)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:199](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L199)*

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:38](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L38)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:39](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L39)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

*Defined in [dist/planck.d.ts:191](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L191)*

*Defined in [src/common/Vec3.ts:34](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [dist/planck.d.ts:192](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L192)*

*Defined in [src/common/Vec3.ts:35](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L35)*

___

###  z

• **z**: *number*

*Defined in [dist/planck.d.ts:193](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L193)*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/6a5d3be/src/common/Vec3.ts#L36)*

## Methods

###  add

▸ **add**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:211](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:213](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:226](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L226)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:210](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L210)*

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

*Defined in [dist/planck.d.ts:209](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L209)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:212](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:203](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L203)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:223](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *boolean*

*Defined in [dist/planck.d.ts:214](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:208](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:202](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:222](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L222)*

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

*Defined in [dist/planck.d.ts:218](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L218)*

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

*Defined in [dist/planck.d.ts:207](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L207)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3](vec3.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:225](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:227](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:224](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:201](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L201)*

**Returns:** *[Vec3](vec3.md)*
