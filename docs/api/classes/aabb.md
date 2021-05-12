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

*Defined in [src/collision/AABB.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *[AABB](aabb.md)*

## Properties

###  lowerBound

• **lowerBound**: *[Vec2](vec2.md)*

*Defined in [src/collision/AABB.ts:55](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L55)*

___

###  upperBound

• **upperBound**: *[Vec2](vec2.md)*

*Defined in [src/collision/AABB.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L56)*

## Methods

###  combine

▸ **combine**(`a`: [AABB](aabb.md), `b?`: [AABB](aabb.md)): *void*

*Defined in [src/collision/AABB.ts:121](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L121)*

Combine one or two AABB into this one.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b?` | [AABB](aabb.md) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [src/collision/AABB.ts:138](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABB](aabb.md)): *boolean*

*Defined in [src/collision/AABB.ts:148](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [src/collision/AABB.ts:157](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [src/collision/AABB.ts:100](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L100)*

Get the center of the AABB.

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [src/collision/AABB.ts:107](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L107)*

Get the extents of the AABB (half-widths).

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [src/collision/AABB.ts:114](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L114)*

Get the perimeter length.

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [src/collision/AABB.ts:79](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L79)*

Verify that the bounds are sorted.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md)): *boolean*

*Defined in [src/collision/AABB.ts:199](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABB](aabb.md)): *void*

*Defined in [src/collision/AABB.ts:143](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/collision/AABB.ts:260](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L260)*

**Returns:** *string*

___

### `Static` areEqual

▸ **areEqual**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [src/collision/AABB.ts:182](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/collision/AABB.ts:89](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` diff

▸ **diff**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *number*

*Defined in [src/collision/AABB.ts:186](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *number*

___

### `Static` extend

▸ **extend**(`aabb`: [AABB](aabb.md), `value`: number): *void*

*Defined in [src/collision/AABB.ts:162](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`value` | number |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`aabb`: any): *boolean*

*Defined in [src/collision/AABB.ts:83](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | any |

**Returns:** *boolean*

___

### `Static` testOverlap

▸ **testOverlap**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [src/collision/AABB.ts:169](https://github.com/shakiba/planck.js/blob/acc3bd8/src/collision/AABB.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*
