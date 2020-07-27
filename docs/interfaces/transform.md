[API Doc](../README.md) › [Transform](transform.md)

# Interface: Transform

## Hierarchy

* **Transform**

## Index

### Properties

* [p](transform.md#p)
* [q](transform.md#q)

### Methods

* [set](transform.md#set)
* [setIdentity](transform.md#setidentity)

## Properties

###  p

• **p**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:135](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L135)*

___

###  q

• **q**: *[Rot](rot.md)*

*Defined in [common/index.d.ts:136](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L136)*

## Methods

###  set

▸ **set**(`position`: [Vec2](vec2.md), `rotation`: number): *void*

*Defined in [common/index.d.ts:139](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:140](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/index.d.ts:138](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L138)*

**Returns:** *void*
