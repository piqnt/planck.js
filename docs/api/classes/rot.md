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

*Defined in [src/common/Rot.ts:44](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L44)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

*Defined in [src/common/Rot.ts:44](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L44)*

cos(angle)

___

###  s

• **s**: *number*

*Defined in [src/common/Rot.ts:42](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L42)*

sin(angle)

## Methods

###  getAngle

▸ **getAngle**(): *number*

*Defined in [src/common/Rot.ts:128](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L128)*

Get the angle in radians.

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *Vec2*

*Defined in [src/common/Rot.ts:133](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L133)*

Get the x-axis.

**Returns:** *Vec2*

___

###  getYAxis

▸ **getYAxis**(): *Vec2*

*Defined in [src/common/Rot.ts:138](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L138)*

Get the y-axis.

**Returns:** *Vec2*

___

###  set

▸ **set**(`angle`: number | [RotValue](../interfaces/rotvalue.md)): *void*

*Defined in [src/common/Rot.ts:99](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [src/common/Rot.ts:120](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L120)*

Set using an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [src/common/Rot.ts:94](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L94)*

Set to the identity rotation.

**Returns:** *void*

___

###  setRot

▸ **setRot**(`angle`: [RotValue](../interfaces/rotvalue.md)): *void*

*Defined in [src/common/Rot.ts:113](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [src/common/Rot.ts:89](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:67](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:75](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L75)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [src/common/Rot.ts:82](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:167](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L167)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [RotValue](../interfaces/rotvalue.md), `v`: [Vec2Value](../interfaces/vec2value.md), `w`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Rot.ts:187](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

*Defined in [src/common/Rot.ts:217](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L217)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Rot.ts:230](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L230)*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/common/Rot.ts:181](https://github.com/shakiba/planck.js/blob/ae24904/src/common/Rot.ts#L181)*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*
