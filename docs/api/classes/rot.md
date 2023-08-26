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
* [mul](rot.md#static-mul)
* [mulRot](rot.md#static-mulrot)
* [mulSub](rot.md#static-mulsub)
* [mulT](rot.md#static-mult)
* [mulTRot](rot.md#static-multrot)
* [mulTVec2](rot.md#static-multvec2)
* [mulVec2](rot.md#static-mulvec2)

## Constructors

###  constructor

\+ **new Rot**(`angle?`: number | [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

## Properties

###  c

• **c**: *number*

cos(angle)

___

###  s

• **s**: *number*

sin(angle)

## Methods

###  getAngle

▸ **getAngle**(): *number*

Get the angle in radians.

**Returns:** *number*

___

###  getXAxis

▸ **getXAxis**(): *Vec2*

Get the x-axis.

**Returns:** *Vec2*

___

###  getYAxis

▸ **getYAxis**(): *Vec2*

Get the y-axis.

**Returns:** *Vec2*

___

###  set

▸ **set**(`angle`: number | [RotValue](../interfaces/rotvalue.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

Set using an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

Set to the identity rotation.

**Returns:** *void*

___

###  setRot

▸ **setRot**(`angle`: [RotValue](../interfaces/rotvalue.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`rot`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

___

### `Static` identity

▸ **identity**(): *[Rot](rot.md)*

**Returns:** *[Rot](rot.md)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

▸ **mul**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

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

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`v` | [Vec2Value](../interfaces/vec2value.md) |
`w` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulT

▸ **mulT**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [RotValue](../interfaces/rotvalue.md) |

**Returns:** *[Rot](rot.md)*

▸ **mulT**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [RotValue](../interfaces/rotvalue.md), `m`: [RotValue](../interfaces/rotvalue.md)): *[Rot](rot.md)*

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

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](../interfaces/rotvalue.md) |
`m` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*
