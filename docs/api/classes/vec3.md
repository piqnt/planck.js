[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Vec3](vec3.md)

# Class: Vec3

## Hierarchy

* **Vec3**

## Callable

▸ **Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:188](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:189](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L189)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

▸ **Vec3**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:194](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L194)*

**Returns:** *[Vec3](vec3.md)*

## Index

### Constructors

* [constructor](vec3.md#constructor)

### Properties

* [x](vec3.md#x)
* [y](vec3.md#y)
* [z](vec3.md#z)

### Methods

* [_serialize](vec3.md#_serialize)
* [add](vec3.md#add)
* [mul](vec3.md#mul)
* [neg](vec3.md#neg)
* [set](vec3.md#set)
* [setZero](vec3.md#setzero)
* [sub](vec3.md#sub)
* [toString](vec3.md#tostring)
* [_deserialize](vec3.md#static-_deserialize)
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

*Defined in [dist/planck.d.ts:198](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:199](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L199)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:204](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L204)*

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(`obj`: object): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:38](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L38)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](vec3.md)*

\+ **new Vec3**(): *[Vec3](vec3.md)*

*Defined in [src/common/Vec3.ts:39](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L39)*

**Returns:** *[Vec3](vec3.md)*

## Properties

###  x

• **x**: *number*

*Defined in [dist/planck.d.ts:196](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L196)*

*Defined in [src/common/Vec3.ts:34](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L34)*

___

###  y

• **y**: *number*

*Defined in [dist/planck.d.ts:197](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L197)*

*Defined in [src/common/Vec3.ts:35](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L35)*

___

###  z

• **z**: *number*

*Defined in [dist/planck.d.ts:198](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L198)*

*Defined in [src/common/Vec3.ts:36](https://github.com/shakiba/planck.js/blob/7e469c4/src/common/Vec3.ts#L36)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Defined in [dist/planck.d.ts:206](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L206)*

**Returns:** *object*

* **x**: *number*

* **y**: *number*

* **z**: *number*

___

###  add

▸ **add**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:222](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L222)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:224](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

###  neg

▸ **neg**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:237](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L237)*

**Returns:** *[Vec3](vec3.md)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:221](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L221)*

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

*Defined in [dist/planck.d.ts:220](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L220)*

**Returns:** *[Vec3](vec3.md)*

___

###  sub

▸ **sub**(`w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:223](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:214](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L214)*

**Returns:** *string*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any): *any*

*Defined in [dist/planck.d.ts:211](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *any*

___

### `Static` add

▸ **add**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:234](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L234)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *boolean*

*Defined in [dist/planck.d.ts:225](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:219](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:213](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:233](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L233)*

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

*Defined in [dist/planck.d.ts:229](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L229)*

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

*Defined in [dist/planck.d.ts:218](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L218)*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3](vec3.md), `m`: number): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:236](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`m` | number |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:238](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3](vec3.md), `w`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:235](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |
`w` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` zero

▸ **zero**(): *[Vec3](vec3.md)*

*Defined in [dist/planck.d.ts:212](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L212)*

**Returns:** *[Vec3](vec3.md)*
