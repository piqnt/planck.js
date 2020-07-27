[API Doc](../README.md) › [Sweep](sweep.md)

# Interface: Sweep

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

*Defined in [common/index.d.ts:269](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L269)*

___

###  a0

• **a0**: *number*

*Defined in [common/index.d.ts:272](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L272)*

___

###  alpha0

• **alpha0**: *number*

*Defined in [common/index.d.ts:270](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L270)*

___

###  c

• **c**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:268](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L268)*

___

###  c0

• **c0**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:271](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L271)*

___

###  localCenter

• **localCenter**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:267](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L267)*

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [common/index.d.ts:277](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L277)*

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  clone

▸ **clone**(): *[Sweep](sweep.md)*

*Defined in [common/index.d.ts:280](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L280)*

**Returns:** *[Sweep](sweep.md)*

___

###  forward

▸ **forward**(): *void*

*Defined in [common/index.d.ts:278](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L278)*

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [Transform](transform.md), `beta`: number): *void*

*Defined in [common/index.d.ts:276](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L276)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |
`beta` | number |

**Returns:** *void*

___

###  normalize

▸ **normalize**(): *void*

*Defined in [common/index.d.ts:279](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L279)*

**Returns:** *void*

___

###  set

▸ **set**(`sweep`: [Sweep](sweep.md)): *void*

*Defined in [common/index.d.ts:281](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L281)*

**Parameters:**

Name | Type |
------ | ------ |
`sweep` | [Sweep](sweep.md) |

**Returns:** *void*

___

###  setLocalCenter

▸ **setLocalCenter**(`localCenter`: [Vec2](vec2.md), `xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:275](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L275)*

**Parameters:**

Name | Type |
------ | ------ |
`localCenter` | [Vec2](vec2.md) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:274](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L274)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*
