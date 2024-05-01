---
showOutline: false
---

# Class: AABB

## Hierarchy

* **AABB**

## Index

### Constructors

* [constructor](/api/classes/aabb#constructor)

### Properties

* [lowerBound](/api/classes/aabb#lowerbound)
* [upperBound](/api/classes/aabb#upperbound)

### Methods

* [combine](/api/classes/aabb#combine)
* [combinePoints](/api/classes/aabb#combinepoints)
* [contains](/api/classes/aabb#contains)
* [extend](/api/classes/aabb#extend)
* [getCenter](/api/classes/aabb#getcenter)
* [getExtents](/api/classes/aabb#getextents)
* [getPerimeter](/api/classes/aabb#getperimeter)
* [isValid](/api/classes/aabb#isvalid)
* [rayCast](/api/classes/aabb#raycast)
* [set](/api/classes/aabb#set)
* [areEqual](/api/classes/aabb#static-areequal)
* [assert](/api/classes/aabb#static-assert)
* [combinePoints](/api/classes/aabb#static-combinepoints)
* [combinedPerimeter](/api/classes/aabb#static-combinedperimeter)
* [diff](/api/classes/aabb#static-diff)
* [extend](/api/classes/aabb#static-extend)
* [isValid](/api/classes/aabb#static-isvalid)
* [testOverlap](/api/classes/aabb#static-testoverlap)

## Constructors

###  constructor

\+ **new AABB**(`lower?`: [Vec2Value](/api/interfaces/vec2value), `upper?`: [Vec2Value](/api/interfaces/vec2value)): *[AABB](/api/classes/aabb)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2Value](/api/interfaces/vec2value) |
`upper?` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[AABB](/api/classes/aabb)*

## Properties

###  lowerBound

• **lowerBound**: *Vec2*

___

###  upperBound

• **upperBound**: *Vec2*

## Methods

###  combine

▸ **combine**(`a`: [AABBValue](/api/interfaces/aabbvalue), `b?`: [AABBValue](/api/interfaces/aabbvalue)): *void*

Combine one or two AABB into this one.

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](/api/interfaces/aabbvalue) |
`b?` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *void*

___

###  combinePoints

▸ **combinePoints**(`a`: [Vec2Value](/api/interfaces/vec2value), `b`: [Vec2Value](/api/interfaces/vec2value)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

###  contains

▸ **contains**(`aabb`: [AABBValue](/api/interfaces/aabbvalue)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *boolean*

___

###  extend

▸ **extend**(`value`: number): *[AABB](/api/classes/aabb)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *[AABB](/api/classes/aabb)*

___

###  getCenter

▸ **getCenter**(): *Vec2*

Get the center of the AABB.

**Returns:** *Vec2*

___

###  getExtents

▸ **getExtents**(): *Vec2*

Get the extents of the AABB (half-widths).

**Returns:** *Vec2*

___

###  getPerimeter

▸ **getPerimeter**(): *number*

Get the perimeter length.

**Returns:** *number*

___

###  isValid

▸ **isValid**(): *boolean*

Verify that the bounds are sorted.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](/api/interfaces/raycastoutput), `input`: [RayCastInput](/api/interfaces/raycastinput)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](/api/interfaces/raycastoutput) |
`input` | [RayCastInput](/api/interfaces/raycastinput) |

**Returns:** *boolean*

___

###  set

▸ **set**(`aabb`: [AABBValue](/api/interfaces/aabbvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *void*

___

### `Static` areEqual

▸ **areEqual**(`a`: [AABBValue](/api/interfaces/aabbvalue), `b`: [AABBValue](/api/interfaces/aabbvalue)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](/api/interfaces/aabbvalue) |
`b` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` combinePoints

▸ **combinePoints**(`out`: [AABBValue](/api/interfaces/aabbvalue), `a`: [Vec2Value](/api/interfaces/vec2value), `b`: [Vec2Value](/api/interfaces/vec2value)): *[AABBValue](/api/interfaces/aabbvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`out` | [AABBValue](/api/interfaces/aabbvalue) |
`a` | [Vec2Value](/api/interfaces/vec2value) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[AABBValue](/api/interfaces/aabbvalue)*

___

### `Static` combinedPerimeter

▸ **combinedPerimeter**(`a`: [AABBValue](/api/interfaces/aabbvalue), `b`: [AABBValue](/api/interfaces/aabbvalue)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](/api/interfaces/aabbvalue) |
`b` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *number*

___

### `Static` diff

▸ **diff**(`a`: [AABBValue](/api/interfaces/aabbvalue), `b`: [AABBValue](/api/interfaces/aabbvalue)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](/api/interfaces/aabbvalue) |
`b` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *number*

___

### `Static` extend

▸ **extend**(`out`: [AABBValue](/api/interfaces/aabbvalue), `value`: number): *[AABBValue](/api/interfaces/aabbvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`out` | [AABBValue](/api/interfaces/aabbvalue) |
`value` | number |

**Returns:** *[AABBValue](/api/interfaces/aabbvalue)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` testOverlap

▸ **testOverlap**(`a`: [AABBValue](/api/interfaces/aabbvalue), `b`: [AABBValue](/api/interfaces/aabbvalue)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [AABBValue](/api/interfaces/aabbvalue) |
`b` | [AABBValue](/api/interfaces/aabbvalue) |

**Returns:** *boolean*
