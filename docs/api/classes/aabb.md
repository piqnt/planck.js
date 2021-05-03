[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [AABB](aabb.md)

# Class: AABB

## Hierarchy

* **AABB**

## Index

### Constructors

* [constructor](aabb.md#constructor)

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
* [areEqual](aabb.md#static-areequal)
* [assert](aabb.md#static-assert)
* [diff](aabb.md#static-diff)
* [extend](aabb.md#static-extend)
* [isValid](aabb.md#static-isvalid)
* [testOverlap](aabb.md#static-testoverlap)

## Constructors

###  constructor

\+ **new AABB**(`lower?`: [Vec2](vec2.md), `upper?`: [Vec2](vec2.md)): *[AABB](aabb.md)*

*Defined in [collision/AABB.ts:54](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *[AABB](aabb.md)*

## Properties

###  lowerBound

• **lowerBound**: *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:53](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L53)*

___

###  upperBound

• **upperBound**: *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:54](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L54)*

## Methods

###  combine

▸ **combine**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *void*

*Defined in [collision/AABB.ts:119](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L119)*

Combine one or two AABB into this one.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [collision/AABB.ts:136](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABB](aabb.md)): *boolean*

*Defined in [collision/AABB.ts:146](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [collision/AABB.ts:155](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:98](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L98)*

Get the center of the AABB.

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:105](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L105)*

Get the extents of the AABB (half-widths).

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [collision/AABB.ts:112](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L112)*

Get the perimeter length.

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [collision/AABB.ts:77](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L77)*

Verify that the bounds are sorted.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md)): *boolean*

*Defined in [collision/AABB.ts:197](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABB](aabb.md)): *void*

*Defined in [collision/AABB.ts:141](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [collision/AABB.ts:258](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L258)*

**Returns:** *string*

___

### `Static` areEqual

▸ **areEqual**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [collision/AABB.ts:180](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [collision/AABB.ts:87](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` diff

▸ **diff**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *number*

*Defined in [collision/AABB.ts:184](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *number*

___

### `Static` extend

▸ **extend**(`aabb`: [AABB](aabb.md), `value`: number): *void*

*Defined in [collision/AABB.ts:160](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`value` | number |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`aabb`: any): *boolean*

*Defined in [collision/AABB.ts:81](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | any |

**Returns:** *boolean*

___

### `Static` testOverlap

▸ **testOverlap**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [collision/AABB.ts:167](https://github.com/shakiba/planck.js/blob/8127f05/src/collision/AABB.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*
