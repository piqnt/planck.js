[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat22](mat22.md)

# Class: Mat22

## Hierarchy

* **Mat22**

## Index

### Constructors

* [constructor](mat22.md#constructor)

### Properties

* [ex](mat22.md#ex)
* [ey](mat22.md#ey)

### Methods

* [getInverse](mat22.md#getinverse)
* [set](mat22.md#set)
* [setIdentity](mat22.md#setidentity)
* [setZero](mat22.md#setzero)
* [solve](mat22.md#solve)
* [toString](mat22.md#tostring)
* [abs](mat22.md#static-abs)
* [add](mat22.md#static-add)
* [assert](mat22.md#static-assert)
* [isValid](mat22.md#static-isvalid)
* [mul](mat22.md#static-mul)
* [mulMat22](mat22.md#static-mulmat22)
* [mulT](mat22.md#static-mult)
* [mulVec2](mat22.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Mat22**(`a`: number, `b`: number, `c`: number, `d`: number): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:193](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(`a`: object, `b`: object): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:194](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L194)*

**Parameters:**

▪ **a**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **b**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Mat22](mat22.md)*

\+ **new Mat22**(): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:195](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L195)*

**Returns:** *[Mat22](mat22.md)*

## Properties

###  ex

• **ex**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:210](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L210)*

___

###  ey

• **ey**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:211](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L211)*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:218](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L218)*

**Returns:** *[Mat22](mat22.md)*

___

###  set

▸ **set**(`a`: [Mat22](mat22.md)): *void*

*Defined in [common/index.d.ts:213](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](mat22.md) |

**Returns:** *void*

▸ **set**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [common/index.d.ts:214](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

▸ **set**(`a`: number, `b`: number, `c`: number, `d`: number): *void*

*Defined in [common/index.d.ts:215](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L215)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/index.d.ts:216](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L216)*

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

*Defined in [common/index.d.ts:217](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L217)*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:219](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:212](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L212)*

**Returns:** *string*

___

### `Static` abs

▸ **abs**(`mx`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:207](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` add

▸ **add**(`mx1`: [Mat22](mat22.md), `mx2`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:208](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`mx1` | [Mat22](mat22.md) |
`mx2` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:199](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [common/index.d.ts:198](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:201](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L201)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mul**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:202](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulMat22

▸ **mulMat22**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:204](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

___

### `Static` mulT

▸ **mulT**(`mx`: [Mat22](mat22.md), `my`: [Mat22](mat22.md)): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:205](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`my` | [Mat22](mat22.md) |

**Returns:** *[Mat22](mat22.md)*

▸ **mulT**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:206](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`mx`: [Mat22](mat22.md), `v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:203](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L203)*

**Parameters:**

Name | Type |
------ | ------ |
`mx` | [Mat22](mat22.md) |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*
