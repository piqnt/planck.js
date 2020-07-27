[API Doc](../README.md) › [Mat33](mat33.md)

# Interface: Mat33

## Hierarchy

* **Mat33**

## Index

### Properties

* [ex](mat33.md#ex)
* [ey](mat33.md#ey)
* [ez](mat33.md#ez)

### Methods

* [getInverse22](mat33.md#getinverse22)
* [getSymInverse33](mat33.md#getsyminverse33)
* [setZero](mat33.md#setzero)
* [solve22](mat33.md#solve22)
* [solve33](mat33.md#solve33)
* [toString](mat33.md#tostring)

## Properties

###  ex

• **ex**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:239](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L239)*

___

###  ey

• **ey**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:240](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L240)*

___

###  ez

• **ez**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:241](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L241)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/index.d.ts:247](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  getSymInverse33

▸ **getSymInverse33**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/index.d.ts:248](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:244](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L244)*

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:246](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  solve33

▸ **solve33**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:245](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:243](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L243)*

**Returns:** *string*
