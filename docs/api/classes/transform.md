[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Transform](transform.md)

# Class: Transform

## Hierarchy

* **Transform**

## Callable

▸ **Transform**(`position`: [Vec2](vec2.md), `rotation`: number): *[Transform](transform.md)*

*Defined in [common/index.d.ts:126](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *[Transform](transform.md)*

▸ **Transform**(): *[Transform](transform.md)*

*Defined in [common/index.d.ts:127](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L127)*

**Returns:** *[Transform](transform.md)*

## Index

### Constructors

* [constructor](transform.md#constructor)

### Properties

* [p](transform.md#p)
* [q](transform.md#q)

### Methods

* [set](transform.md#set)
* [setIdentity](transform.md#setidentity)
* [assert](transform.md#static-assert)
* [clone](transform.md#static-clone)
* [identity](transform.md#static-identity)
* [isValid](transform.md#static-isvalid)
* [mul](transform.md#static-mul)
* [mulT](transform.md#static-mult)
* [mulTVec2](transform.md#static-multvec2)
* [mulTXf](transform.md#static-multxf)
* [mulVec2](transform.md#static-mulvec2)
* [mulXf](transform.md#static-mulxf)

## Constructors

###  constructor

\+ **new Transform**(`position`: [Vec2](vec2.md), `rotation`: number): *[Transform](transform.md)*

*Defined in [common/index.d.ts:134](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *[Transform](transform.md)*

\+ **new Transform**(): *[Transform](transform.md)*

*Defined in [common/index.d.ts:136](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L136)*

**Returns:** *[Transform](transform.md)*

## Properties

###  p

• **p**: *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:129](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L129)*

___

###  q

• **q**: *[Rot](rot.md)*

*Defined in [common/index.d.ts:130](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L130)*

## Methods

###  set

▸ **set**(`position`: [Vec2](vec2.md), `rotation`: number): *void*

*Defined in [common/index.d.ts:133](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [Transform](transform.md)): *void*

*Defined in [common/index.d.ts:134](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/index.d.ts:132](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L132)*

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:143](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`xf`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/index.d.ts:139](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` identity

▸ **identity**(): *[Transform](transform.md)*

*Defined in [common/index.d.ts:141](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L141)*

**Returns:** *[Transform](transform.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [common/index.d.ts:142](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:144](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/index.d.ts:145](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

▸ **mul**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)[]): *[Vec2](vec2.md)[]*

*Defined in [common/index.d.ts:146](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md)[] |

**Returns:** *[Vec2](vec2.md)[]*

▸ **mul**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)[]): *[Transform](transform.md)[]*

*Defined in [common/index.d.ts:147](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md)[] |

**Returns:** *[Transform](transform.md)[]*

___

### `Static` mulT

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:153](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/index.d.ts:154](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:155](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/index.d.ts:156](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:151](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulXf

▸ **mulXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/index.d.ts:152](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*
