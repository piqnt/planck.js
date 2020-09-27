[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Mat33](mat33.md)

# Class: Mat33

## Hierarchy

* **Mat33**

## Index

### Constructors

* [constructor](mat33.md#constructor)

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
* [add](mat33.md#static-add)
* [assert](mat33.md#static-assert)
* [isValid](mat33.md#static-isvalid)
* [mul](mat33.md#static-mul)
* [mulVec2](mat33.md#static-mulvec2)
* [mulVec3](mat33.md#static-mulvec3)

## Constructors

###  constructor

\+ **new Mat33**(`a`: [Vec3](vec3.md), `b`: [Vec3](vec3.md), `c`: [Vec3](vec3.md)): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:222](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L222)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Vec3](vec3.md) |
`b` | [Vec3](vec3.md) |
`c` | [Vec3](vec3.md) |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(`a`: any, `b`: any, `c`: any): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:223](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |
`b` | any |
`c` | any |

**Returns:** *[Mat33](mat33.md)*

\+ **new Mat33**(): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:224](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L224)*

**Returns:** *[Mat33](mat33.md)*

## Properties

###  ex

• **ex**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:236](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L236)*

___

###  ey

• **ey**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:237](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L237)*

___

###  ez

• **ez**: *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:238](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L238)*

## Methods

###  getInverse22

▸ **getInverse22**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/index.d.ts:244](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  getSymInverse33

▸ **getSymInverse33**(`M`: [Mat33](mat33.md)): *void*

*Defined in [common/index.d.ts:245](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`M` | [Mat33](mat33.md) |

**Returns:** *void*

___

###  setZero

▸ **setZero**(): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:241](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L241)*

**Returns:** *[Mat33](mat33.md)*

___

###  solve22

▸ **solve22**(`v`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:243](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L243)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  solve33

▸ **solve33**(`v`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:242](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

###  toString

▸ **toString**(): *string*

*Defined in [common/index.d.ts:240](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L240)*

**Returns:** *string*

___

### `Static` add

▸ **add**(`a`: [Mat33](mat33.md), `b`: [Mat33](mat33.md)): *[Mat33](mat33.md)*

*Defined in [common/index.d.ts:234](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L234)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Mat33](mat33.md) |

**Returns:** *[Mat33](mat33.md)*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:228](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [common/index.d.ts:227](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:230](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:231](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Mat33](mat33.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:233](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L233)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec3

▸ **mulVec3**(`a`: [Mat33](mat33.md), `b`: [Vec3](vec3.md)): *[Vec3](vec3.md)*

*Defined in [common/index.d.ts:232](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Mat33](mat33.md) |
`b` | [Vec3](vec3.md) |

**Returns:** *[Vec3](vec3.md)*
