[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Sweep](sweep.md)

# Class: Sweep

## Hierarchy

* **Sweep**

## Index

### Properties

* [a](sweep.md#a)
* [a0](sweep.md#a0)
* [alpha0](sweep.md#alpha0)
* [c](sweep.md#c)
* [c0](sweep.md#c0)
* [localCenter](sweep.md#localcenter)

### Methods

* [advance](sweep.md#advance)
* [clone](sweep.md#clone)
* [forward](sweep.md#forward)
* [getTransform](sweep.md#gettransform)
* [normalize](sweep.md#normalize)
* [set](sweep.md#set)
* [setLocalCenter](sweep.md#setlocalcenter)
* [setTransform](sweep.md#settransform)

## Properties

###  a

• **a**: *number*

*Defined in [common/index.d.ts:251](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L251)*

___

###  a0

• **a0**: *number*

*Defined in [common/index.d.ts:254](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L254)*

___

###  alpha0

• **alpha0**: *number*

*Defined in [common/index.d.ts:252](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L252)*

___

###  c

• **c**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:250](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L250)*

___

###  c0

• **c0**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:253](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L253)*

___

###  localCenter

• **localCenter**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:249](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L249)*

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [common/index.d.ts:259](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L259)*

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  clone

▸ **clone**(): *[Sweep](sweep.md)*

*Defined in [common/index.d.ts:262](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L262)*

**Returns:** *[Sweep](sweep.md)*

___

###  forward

▸ **forward**(): *void*

*Defined in [common/index.d.ts:260](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L260)*

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [Transform](transform.md), `beta`: number): *void*

*Defined in [common/index.d.ts:258](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |
`beta` | number |

**Returns:** *void*

___

###  normalize

▸ **normalize**(): *void*

*Defined in [common/index.d.ts:261](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L261)*

**Returns:** *void*

___

###  set

▸ **set**(`sweep`: [Sweep](sweep.md)): *void*

*Defined in [common/index.d.ts:263](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`sweep` | [Sweep](sweep.md) |

**Returns:** *void*

___

###  setLocalCenter

▸ **setLocalCenter**(`localCenter`: [Vec2](vec2.md), `xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:257](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L257)*

**Parameters:**

Name | Type |
------ | ------ |
`localCenter` | [Vec2](vec2.md) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:256](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*
