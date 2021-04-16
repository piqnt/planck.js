[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [AABB](aabb.md)

# Class: AABB

## Hierarchy

* **AABB**

## Callable

▸ **AABB**(`lower?`: [Vec2](vec2.md), `upper?`: [Vec2](vec2.md)): *[AABB](aabb.md)*

*Defined in [dist/planck.d.ts:421](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L421)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *[AABB](aabb.md)*

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

*Defined in [dist/planck.d.ts:424](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L424)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *[AABB](aabb.md)*

## Properties

###  lowerBound

• **lowerBound**: *Vec2*

*Defined in [dist/planck.d.ts:423](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L423)*

*Defined in [src/collision/AABB.ts:53](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/AABB.ts#L53)*

___

###  upperBound

• **upperBound**: *Vec2*

*Defined in [dist/planck.d.ts:424](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L424)*

*Defined in [src/collision/AABB.ts:54](https://github.com/shakiba/planck.js/blob/7e469c4/src/collision/AABB.ts#L54)*

## Methods

###  combine

▸ **combine**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *void*

*Defined in [dist/planck.d.ts:447](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L447)*

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

*Defined in [dist/planck.d.ts:448](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L448)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABB](aabb.md)): *boolean*

*Defined in [dist/planck.d.ts:450](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L450)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [dist/planck.d.ts:451](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L451)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:435](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L435)*

Get the center of the AABB.

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:439](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L439)*

Get the extents of the AABB (half-widths).

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [dist/planck.d.ts:443](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L443)*

Get the perimeter length.

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [dist/planck.d.ts:429](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L429)*

Verify that the bounds are sorted.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md)): *boolean*

*Defined in [dist/planck.d.ts:456](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L456)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABB](aabb.md)): *void*

*Defined in [dist/planck.d.ts:449](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L449)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:457](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L457)*

**Returns:** *string*

___

### `Static` areEqual

▸ **areEqual**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [dist/planck.d.ts:454](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L454)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:431](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L431)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` diff

▸ **diff**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *number*

*Defined in [dist/planck.d.ts:455](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L455)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *number*

___

### `Static` extend

▸ **extend**(`aabb`: [AABB](aabb.md), `value`: number): *void*

*Defined in [dist/planck.d.ts:452](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L452)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`value` | number |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`aabb`: any): *boolean*

*Defined in [dist/planck.d.ts:430](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L430)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | any |

**Returns:** *boolean*

___

### `Static` testOverlap

▸ **testOverlap**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [dist/planck.d.ts:453](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L453)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*
