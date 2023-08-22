[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Rot](rot.md)

# Class: Rot

## Hierarchy

* **Rot**

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
* [setRot](rot.md#setrot)
* [assert](rot.md#static-assert)
* [clone](rot.md#static-clone)
* [identity](rot.md#static-identity)
* [isValid](rot.md#static-isvalid)
* [mulRot](rot.md#static-mulrot)
* [mulSub](rot.md#static-mulsub)
* [mulTRot](rot.md#static-multrot)
* [mulTVec2](rot.md#static-multvec2)
* [mulVec2](rot.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Rot**(`angle?`: number | [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [common/Rot.ts:40](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L40)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

*Defined in [common/Rot.ts:40](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L40)*

___

###  s

• **s**: *number*

*Defined in [common/Rot.ts:39](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L39)*

## Methods

###  getAngle

▸ **getAngle**(): *number*

*Defined in [common/Rot.ts:124](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L124)*

Get the angle in radians.

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *[Vec2](vec2.md)*

*Defined in [common/Rot.ts:129](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L129)*

Get the x-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  getYAxis

▸ **getYAxis**(): *[Vec2](vec2.md)*

*Defined in [common/Rot.ts:134](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L134)*

Get the y-axis.

**Returns:** *[Vec2](vec2.md)*

___

###  set

▸ **set**(`angle`: number | [RotValue](../interfaces/rotvalue.md)): *void*

*Defined in [common/Rot.ts:95](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [common/Rot.ts:116](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L116)*

Set using an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/Rot.ts:90](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L90)*

Set to the identity rotation.

**Returns:** *void*

___

###  setRot

▸ **setRot**(`angle`: [RotValue](../interfaces/rotvalue.md)): *void*

*Defined in [common/Rot.ts:109](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/Rot.ts:85](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [common/Rot.ts:63](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

*Defined in [common/Rot.ts:71](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L71)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [common/Rot.ts:78](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [common/Rot.ts:163](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L163)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [RotValue](../interfaces/rotvalue.md), `v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Rot.ts:183](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [common/Rot.ts:213](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L213)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Rot.ts:226](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L226)*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Rot.ts:177](https://github.com/shakiba/planck.js/blob/1bc1208/src/common/Rot.ts#L177)*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*
