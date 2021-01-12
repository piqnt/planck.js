[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Math](math.md)

# Class: Math

## Hierarchy

* **Math**

## Index

### Properties

* [EPSILON](math.md#readonly-epsilon)

### Methods

* [assert](math.md#static-assert)
* [clamp](math.md#static-clamp)
* [invSqrt](math.md#static-invsqrt)
* [isFinite](math.md#static-isfinite)
* [isPowerOfTwo](math.md#static-ispoweroftwo)
* [mod](math.md#static-mod)
* [nextPowerOfTwo](math.md#static-nextpoweroftwo)
* [random](math.md#static-random)

## Properties

### `Readonly` EPSILON

• **EPSILON**: *number*

*Defined in [common/index.d.ts:2](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L2)*

## Methods

### `Static` assert

▸ **assert**(`x`: any): *void*

*Defined in [common/index.d.ts:8](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |

**Returns:** *void*

___

### `Static` clamp

▸ **clamp**(`num`: number, `min`: number, `max`: number): *number*

*Defined in [common/index.d.ts:14](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |
`min` | number |
`max` | number |

**Returns:** *number*

___

### `Static` invSqrt

▸ **invSqrt**(`x`: number): *number*

*Defined in [common/index.d.ts:9](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |

**Returns:** *number*

___

### `Static` isFinite

▸ **isFinite**(`x`: any): *boolean*

*Defined in [common/index.d.ts:7](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L7)*

This function is used to ensure that a floating point number is not a NaN or
infinity.

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |

**Returns:** *boolean*

___

### `Static` isPowerOfTwo

▸ **isPowerOfTwo**(`x`: number): *boolean*

*Defined in [common/index.d.ts:11](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |

**Returns:** *boolean*

___

### `Static` mod

▸ **mod**(`num`: number, `min`: number, `max`: number): *number*

*Defined in [common/index.d.ts:12](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |
`min` | number |
`max` | number |

**Returns:** *number*

▸ **mod**(`num`: number, `max?`: number): *number*

*Defined in [common/index.d.ts:13](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |
`max?` | number |

**Returns:** *number*

___

### `Static` nextPowerOfTwo

▸ **nextPowerOfTwo**(`x`: number): *number*

*Defined in [common/index.d.ts:10](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |

**Returns:** *number*

___

### `Static` random

▸ **random**(`min`: number, `max`: number): *number*

*Defined in [common/index.d.ts:15](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** *number*

▸ **random**(`max?`: number): *number*

*Defined in [common/index.d.ts:16](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`max?` | number |

**Returns:** *number*
