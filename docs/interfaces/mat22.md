[API Doc](../README.md) › [Mat22](mat22.md)

# Interface: Mat22

## Hierarchy

* **Mat22**

## Index

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

## Properties

###  ex

• **ex**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:208](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L208)*

___

###  ey

• **ey**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:209](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L209)*

## Methods

###  getInverse

▸ **getInverse**(): *[Mat22](mat22.md)*

*Defined in [common/index.d.ts:216](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L216)*

**Returns:** *[Mat22](mat22.md)*

___

###  set

▸ **set**(`a`: [Mat22](mat22.md)): *void*

*Defined in [common/index.d.ts:211](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat22](mat22.md) |

**Returns:** *void*

▸ **set**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [common/index.d.ts:212](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

▸ **set**(`a`: number, `b`: number, `c`: number, `d`: number): *void*

*Defined in [common/index.d.ts:213](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L213)*

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

*Defined in [common/index.d.ts:214](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L214)*

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *void*

*Defined in [common/index.d.ts:215](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L215)*

**Returns:** *void*

___

###  solve

▸ **solve**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:217](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:210](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L210)*

**Returns:** *string*
