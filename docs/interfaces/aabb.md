[API Doc](../README.md) › [AABB](aabb.md)

# Interface: AABB

## Hierarchy

* **AABB**

## Index

### Properties

* [lowerBound](aabb.md#lowerbound)
* [upperBound](aabb.md#upperbound)

### Methods

* [combine](aabb.md#combine)
* [combinePoints](aabb.md#combinepoints)
* [contains](aabb.md#contains)
* [extend](aabb.md#extend)
* [getCenter](aabb.md#getcenter)
* [getExtents](aabb.md#getextents)
* [getPerimeter](aabb.md#getperimeter)
* [isValid](aabb.md#isvalid)
* [rayCast](aabb.md#raycast)
* [set](aabb.md#set)
* [toString](aabb.md#tostring)

## Properties

###  lowerBound

• **lowerBound**: *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L31)*

___

###  upperBound

• **upperBound**: *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:32](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L32)*

## Methods

###  combine

▸ **combine**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *void*

*Defined in [collision/index.d.ts:38](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [collision/index.d.ts:39](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABB](aabb.md)): *boolean*

*Defined in [collision/index.d.ts:41](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [collision/index.d.ts:42](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:35](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L35)*

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:36](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L36)*

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [collision/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L37)*

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [collision/index.d.ts:34](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L34)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../README.md#raycastoutput), `input`: [RayCastInput](../README.md#raycastinput)): *boolean*

*Defined in [collision/index.d.ts:43](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../README.md#raycastoutput) |
`input` | [RayCastInput](../README.md#raycastinput) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABB](aabb.md)): *void*

*Defined in [collision/index.d.ts:40](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [collision/index.d.ts:44](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L44)*

**Returns:** *string*
