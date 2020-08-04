[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [AABB](aabb.md)

# Class: AABB

## Hierarchy

* **AABB**

## Callable

▸ **AABB**(`lower?`: [Vec2](vec2.md), `upper?`: [Vec2](vec2.md)): *[AABB](aabb.md)*

*Defined in [collision/index.d.ts:34](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *[AABB](aabb.md)*

## Index

### Properties

* [lowerBound](aabb.md#lowerbound)
* [upperBound](aabb.md#upperbound)

### Methods

* [areEqual](aabb.md#areequal)
* [assert](aabb.md#assert)
* [combine](aabb.md#combine)
* [combinePoints](aabb.md#combinepoints)
* [constroctor](aabb.md#constroctor)
* [contains](aabb.md#contains)
* [diff](aabb.md#diff)
* [extend](aabb.md#extend)
* [getCenter](aabb.md#getcenter)
* [getExtents](aabb.md#getextents)
* [getPerimeter](aabb.md#getperimeter)
* [isValid](aabb.md#isvalid)
* [rayCast](aabb.md#raycast)
* [set](aabb.md#set)
* [testOverlap](aabb.md#testoverlap)
* [toString](aabb.md#tostring)

## Properties

###  lowerBound

• **lowerBound**: *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:45](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L45)*

___

###  upperBound

• **upperBound**: *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:46](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L46)*

## Methods

###  areEqual

▸ **areEqual**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [collision/index.d.ts:42](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  assert

▸ **assert**(`o`: any): *void*

*Defined in [collision/index.d.ts:39](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

###  combine

▸ **combine**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *void*

*Defined in [collision/index.d.ts:52](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2](vec2.md), `b`: [Vec2](vec2.md)): *void*

*Defined in [collision/index.d.ts:53](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2](vec2.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  constroctor

▸ **constroctor**(`lower?`: [Vec2](vec2.md), `upper?`: [Vec2](vec2.md)): *any*

*Defined in [collision/index.d.ts:36](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](vec2.md) |
`upper?` | [Vec2](vec2.md) |

**Returns:** *any*

___

###  contains

▸ **contains**(`aabb`: [AABB](aabb.md)): *boolean*

*Defined in [collision/index.d.ts:55](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  diff

▸ **diff**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *number*

*Defined in [collision/index.d.ts:43](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *number*

___

###  extend

▸ **extend**(`aabb`: [AABB](aabb.md), `value`: number): *void*

*Defined in [collision/index.d.ts:40](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |
`value` | number |

**Returns:** *void*

▸ **extend**(`value`: number): *[AABB](aabb.md)*

*Defined in [collision/index.d.ts:56](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:49](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L49)*

**Returns:** *[Vec2](vec2.md)*

___

###  getExtents

▸ **getExtents**(): *[Vec2](vec2.md)*

*Defined in [collision/index.d.ts:50](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L50)*

**Returns:** *[Vec2](vec2.md)*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

*Defined in [collision/index.d.ts:51](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L51)*

**Returns:** *number*

___

###  isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [collision/index.d.ts:38](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

▸ **isValid**(): *boolean*

*Defined in [collision/index.d.ts:48](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L48)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md)): *boolean*

*Defined in [collision/index.d.ts:57](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABB](aabb.md)): *void*

*Defined in [collision/index.d.ts:54](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](aabb.md) |

**Returns:** *void*

___

###  testOverlap

▸ **testOverlap**(`a`: [AABB](aabb.md), `b`: [AABB](aabb.md)): *boolean*

*Defined in [collision/index.d.ts:41](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABB](aabb.md) |
`b` | [AABB](aabb.md) |

**Returns:** *boolean*

___

###  toString

▸ **toString**(): *string*

*Defined in [collision/index.d.ts:58](https://github.com/shakiba/planck.js/blob/038d425/lib/collision/index.d.ts#L58)*

**Returns:** *string*
