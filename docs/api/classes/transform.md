[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Transform](transform.md)

# Class: Transform

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

## Hierarchy

* **Transform**

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
* [mulAll](transform.md#static-mulall)
* [mulT](transform.md#static-mult)
* [mulTVec2](transform.md#static-multvec2)
* [mulTXf](transform.md#static-multxf)
* [mulVec2](transform.md#static-mulvec2)
* [mulXf](transform.md#static-mulxf)

## Constructors

###  constructor

\+ **new Transform**(`position?`: [Vec2](vec2.md), `rotation?`: number): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2](vec2.md) |
`rotation?` | number |

**Returns:** *[Transform](transform.md)*

## Properties

###  p

• **p**: *[Vec2](vec2.md)*

*Defined in [src/common/Transform.ts:41](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L41)*

position

___

###  q

• **q**: *[Rot](rot.md)*

*Defined in [src/common/Transform.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L44)*

rotation

## Methods

###  set

▸ **set**(`position`: [Vec2](vec2.md), `rotation`: number): *void*

*Defined in [src/common/Transform.ts:90](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L90)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [Transform](transform.md)): *void*

*Defined in [src/common/Transform.ts:91](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L91)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [src/common/Transform.ts:85](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L85)*

Set this to the identity transform.

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Transform.ts:110](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`xf`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` identity

▸ **identity**(): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L75)*

**Returns:** *[Transform](transform.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [src/common/Transform.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Transform.ts:118](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:119](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulAll

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)[]): *[Vec2](vec2.md)[]*

*Defined in [src/common/Transform.ts:140](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md)[] |

**Returns:** *[Vec2](vec2.md)[]*

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)[]): *[Transform](transform.md)[]*

*Defined in [src/common/Transform.ts:141](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md)[] |

**Returns:** *[Transform](transform.md)[]*

___

### `Static` mulT

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Transform.ts:180](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:181](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Transform.ts:192](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:202](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/common/Transform.ts:161](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulXf

▸ **mulXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [src/common/Transform.ts:169](https://github.com/shakiba/planck.js/blob/acc3bd8/src/common/Transform.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*
