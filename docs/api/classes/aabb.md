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
* [areEqual](aabb.md#static-areequal)
* [assert](aabb.md#static-assert)
* [combinePoints](aabb.md#static-combinepoints)
* [combinedPerimeter](aabb.md#static-combinedperimeter)
* [diff](aabb.md#static-diff)
* [extend](aabb.md#static-extend)
* [isValid](aabb.md#static-isvalid)
* [testOverlap](aabb.md#static-testoverlap)

## Constructors

###  constructor

\+ **new AABB**(`lower?`: [Vec2Value](../interfaces/vec2value.md), `upper?`: [Vec2Value](../interfaces/vec2value.md)): *[AABB](aabb.md)*

*Defined in [collision/AABB.ts:61](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2Value](../interfaces/vec2value.md) |
`upper?` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[AABB](aabb.md)*

## Properties

###  lowerBound

• **lowerBound**: *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:60](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L60)*

___

###  upperBound

• **upperBound**: *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:61](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L61)*

## Methods

###  combine

▸ **combine**(`a`: [AABBValue](../interfaces/aabbvalue.md), `b?`: [AABBValue](../interfaces/aabbvalue.md)): *void*

*Defined in [collision/AABB.ts:123](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L123)*

Combine one or two AABB into this one.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](../interfaces/aabbvalue.md) |
`b?` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2Value](../interfaces/vec2value.md), `b`: [Vec2Value](../interfaces/vec2value.md)): *void*

*Defined in [collision/AABB.ts:140](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABBValue](../interfaces/aabbvalue.md)): *boolean*

*Defined in [collision/AABB.ts:150](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [collision/AABB.ts:159](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:102](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L102)*

Get the center of the AABB.

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [collision/AABB.ts:109](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L109)*

Get the extents of the AABB (half-widths).

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [collision/AABB.ts:116](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L116)*

Get the perimeter length.

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [collision/AABB.ts:84](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L84)*

Verify that the bounds are sorted.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md)): *boolean*

*Defined in [collision/AABB.ts:202](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABBValue](../interfaces/aabbvalue.md)): *void*

*Defined in [collision/AABB.ts:145](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *void*

___

### `Static` areEqual

▸ **areEqual**(`a`: [AABBValue](../interfaces/aabbvalue.md), `b`: [AABBValue](../interfaces/aabbvalue.md)): *boolean*

*Defined in [collision/AABB.ts:185](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L185)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](../interfaces/aabbvalue.md) |
`b` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [collision/AABB.ts:95](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` combinePoints

▸ **combinePoints**(`out`: [AABBValue](../interfaces/aabbvalue.md), `a`: [Vec2Value](../interfaces/vec2value.md), `b`: [Vec2Value](../interfaces/vec2value.md)): *[AABBValue](../interfaces/aabbvalue.md)*

*Defined in [collision/AABB.ts:267](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`out` | [AABBValue](../interfaces/aabbvalue.md) |
`a` | [Vec2Value](../interfaces/vec2value.md) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[AABBValue](../interfaces/aabbvalue.md)*

___

### `Static` combinedPerimeter

▸ **combinedPerimeter**(`a`: [AABBValue](../interfaces/aabbvalue.md), `b`: [AABBValue](../interfaces/aabbvalue.md)): *number*

*Defined in [collision/AABB.ts:275](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L275)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](../interfaces/aabbvalue.md) |
`b` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *number*

___

### `Static` diff

▸ **diff**(`a`: [AABBValue](../interfaces/aabbvalue.md), `b`: [AABBValue](../interfaces/aabbvalue.md)): *number*

*Defined in [collision/AABB.ts:189](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](../interfaces/aabbvalue.md) |
`b` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *number*

___

### `Static` extend

▸ **extend**(`out`: [AABBValue](../interfaces/aabbvalue.md), `value`: number): *[AABBValue](../interfaces/aabbvalue.md)*

*Defined in [collision/AABB.ts:164](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`out` | [AABBValue](../interfaces/aabbvalue.md) |
`value` | number |

**Returns:** *[AABBValue](../interfaces/aabbvalue.md)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [collision/AABB.ts:88](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` testOverlap

▸ **testOverlap**(`a`: [AABBValue](../interfaces/aabbvalue.md), `b`: [AABBValue](../interfaces/aabbvalue.md)): *boolean*

*Defined in [collision/AABB.ts:172](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/AABB.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](../interfaces/aabbvalue.md) |
`b` | [AABBValue](../interfaces/aabbvalue.md) |

**Returns:** *boolean*
