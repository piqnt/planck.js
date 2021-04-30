[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Transform](transform.md)

# Class: Transform

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.
A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

## Hierarchy

* **Transform**

## Callable

▸ **Transform**(`position?`: [Vec2](vec2.md), `rotation?`: number): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:359](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L359)*

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.
A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2](vec2.md) |
`rotation?` | number |

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
* [mulAll](transform.md#static-mulall)
* [mulFn](transform.md#static-mulfn)
* [mulT](transform.md#static-mult)
* [mulTVec2](transform.md#static-multvec2)
* [mulTXf](transform.md#static-multxf)
* [mulVec2](transform.md#static-mulvec2)
* [mulXf](transform.md#static-mulxf)

## Constructors

###  constructor

\+ **new Transform**(`position?`: [Vec2](vec2.md), `rotation?`: number): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:369](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L369)*

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2](vec2.md) |
`rotation?` | number |

**Returns:** *[Transform](transform.md)*

## Properties

###  p

• **p**: *Vec2*

*Defined in [dist/planck.d.ts:367](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L367)*

*Defined in [src/common/Transform.ts:41](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L41)*

position
position

___

###  q

• **q**: *Rot*

*Defined in [dist/planck.d.ts:369](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L369)*

*Defined in [src/common/Transform.ts:44](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L44)*

rotation
rotation

## Methods

###  set

▸ **set**(`position`: [Vec2](vec2.md), `rotation`: number): *void*

*Defined in [dist/planck.d.ts:377](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L377)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:378](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L378)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *void*

▸ **set**(`position`: Vec2, `rotation`: number): *void*

*Defined in [src/common/Transform.ts:90](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L90)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: Transform): *void*

*Defined in [src/common/Transform.ts:91](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L91)*

Set this based on the position and angle.

**Parameters:**

Name | Type |
------ | ------ |
`xf` | Transform |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [dist/planck.d.ts:376](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L376)*

Set this to the identity transform.

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [dist/planck.d.ts:380](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L380)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`xf`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:371](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` identity

▸ **identity**(): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:372](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L372)*

**Returns:** *[Transform](transform.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [dist/planck.d.ts:379](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L379)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:381](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L381)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mul**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:382](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L382)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

▸ **mul**(`a`: Transform, `b`: Vec2): *Vec2*

*Defined in [src/common/Transform.ts:117](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Vec2 |

**Returns:** *Vec2*

▸ **mul**(`a`: Transform, `b`: Transform): *Transform*

*Defined in [src/common/Transform.ts:118](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Transform |

**Returns:** *Transform*

___

### `Static` mulAll

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)[]): *[Vec2](vec2.md)[]*

*Defined in [dist/planck.d.ts:383](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L383)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md)[] |

**Returns:** *[Vec2](vec2.md)[]*

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)[]): *[Transform](transform.md)[]*

*Defined in [dist/planck.d.ts:384](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L384)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md)[] |

**Returns:** *[Transform](transform.md)[]*

▸ **mulAll**(`a`: Transform, `b`: Vec2[]): *Vec2[]*

*Defined in [src/common/Transform.ts:138](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Vec2[] |

**Returns:** *Vec2[]*

▸ **mulAll**(`a`: Transform, `b`: Transform[]): *Transform[]*

*Defined in [src/common/Transform.ts:139](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Transform[] |

**Returns:** *Transform[]*

___

### `Static` mulFn

▸ **mulFn**(`a`: any): *function*

*Defined in [dist/planck.d.ts:386](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L386)*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`a` | any |

**Returns:** *function*

▸ (`b`: any): *[Vec2](vec2.md)*

**Parameters:**

Name | Type |
------ | ------ |
`b` | any |

___

### `Static` mulT

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:389](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L389)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

▸ **mulT**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:390](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L390)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

▸ **mulT**(`a`: Transform, `b`: Vec2): *Vec2*

*Defined in [src/common/Transform.ts:176](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Vec2 |

**Returns:** *Vec2*

▸ **mulT**(`a`: Transform, `b`: Transform): *Transform*

*Defined in [src/common/Transform.ts:177](https://github.com/shakiba/planck.js/blob/3ede11b/src/common/Transform.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Transform |
`b` | Transform |

**Returns:** *Transform*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:391](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L391)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:392](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L392)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [Transform](transform.md), `b`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:387](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulXf

▸ **mulXf**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:388](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L388)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*
