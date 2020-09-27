[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Rot](rot.md)

# Class: Rot

## Hierarchy

* **Rot**

## Callable

▸ **Rot**(`angle`: number): *[Rot](rot.md)*

*Defined in [common/index.d.ts:159](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *[Rot](rot.md)*

▸ **Rot**(`rot`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:160](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **Rot**(): *[Rot](rot.md)*

*Defined in [common/index.d.ts:161](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L161)*

**Returns:** *[Rot](rot.md)*

## Index

### Constructors

* [constructor](rot.md#constructor)

### Properties

* [c](rot.md#c)
* [s](rot.md#s)

### Methods

* [getAngle](rot.md#getangle)
* [getXAxis](rot.md#getxaxis)
* [getYAxis](rot.md#getyaxis)
* [set](rot.md#set)
* [setAngle](rot.md#setangle)
* [setIdentity](rot.md#setidentity)
* [assert](rot.md#static-assert)
* [clone](rot.md#static-clone)
* [identity](rot.md#static-identity)
* [isValid](rot.md#static-isvalid)
* [mul](rot.md#static-mul)
* [mulRot](rot.md#static-mulrot)
* [mulSub](rot.md#static-mulsub)
* [mulT](rot.md#static-mult)
* [mulTRot](rot.md#static-multrot)
* [mulTVec2](rot.md#static-multvec2)
* [mulVec2](rot.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Rot**(`angle`: number): *[Rot](rot.md)*

*Defined in [common/index.d.ts:171](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *[Rot](rot.md)*

\+ **new Rot**(`rot`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:173](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

\+ **new Rot**(): *[Rot](rot.md)*

*Defined in [common/index.d.ts:174](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L174)*

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

*Defined in [common/index.d.ts:164](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L164)*

___

###  s

• **s**: *number*

*Defined in [common/index.d.ts:163](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L163)*

## Methods

###  getAngle

▸ **getAngle**(): *number*

*Defined in [common/index.d.ts:169](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L169)*

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:170](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L170)*

**Returns:** *[Vec2](vec2.md)*

___

###  getYAxis

▸ **getYAxis**(): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:171](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L171)*

**Returns:** *[Vec2](vec2.md)*

___

###  set

▸ **set**(`angle`: number | [Rot](rot.md)): *void*

*Defined in [common/index.d.ts:167](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [Rot](rot.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [common/index.d.ts:168](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/index.d.ts:166](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L166)*

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/index.d.ts:181](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:178](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

*Defined in [common/index.d.ts:179](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L179)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`o`: any): *boolean*

*Defined in [common/index.d.ts:180](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:182](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mul**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:183](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:184](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [Rot](rot.md), `v`: [Vec2](vec2.md), `w`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:186](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`v` | [Vec2](vec2.md) |
`w` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulT

▸ **mulT**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:187](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

▸ **mulT**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:188](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [Rot](rot.md), `m`: [Rot](rot.md)): *[Rot](rot.md)*

*Defined in [common/index.d.ts:189](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Rot](rot.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:190](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [Rot](rot.md), `m`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [common/index.d.ts:185](https://github.com/shakiba/planck.js/blob/038d425/lib/common/index.d.ts#L185)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](rot.md) |
`m` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*
