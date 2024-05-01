---
showOutline: false
---

# Class: Rot

## Hierarchy

* **Rot**

## Index

### Constructors

* [constructor](/api/classes/rot#constructor)

### Properties

* [c](/api/classes/rot#c)
* [s](/api/classes/rot#s)

### Methods

* [getAngle](/api/classes/rot#getangle)
* [getXAxis](/api/classes/rot#getxaxis)
* [getYAxis](/api/classes/rot#getyaxis)
* [set](/api/classes/rot#set)
* [setAngle](/api/classes/rot#setangle)
* [setIdentity](/api/classes/rot#setidentity)
* [setRot](/api/classes/rot#setrot)
* [assert](/api/classes/rot#static-assert)
* [clone](/api/classes/rot#static-clone)
* [identity](/api/classes/rot#static-identity)
* [isValid](/api/classes/rot#static-isvalid)
* [mul](/api/classes/rot#static-mul)
* [mulRot](/api/classes/rot#static-mulrot)
* [mulSub](/api/classes/rot#static-mulsub)
* [mulT](/api/classes/rot#static-mult)
* [mulTRot](/api/classes/rot#static-multrot)
* [mulTVec2](/api/classes/rot#static-multvec2)
* [mulVec2](/api/classes/rot#static-mulvec2)

## Constructors

###  constructor

\+ **new Rot**(`angle?`: number | [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

Initialize from an angle in radians.

**Parameters:**

Name | Type |
------ | ------ |
`angle?` | number &#124; [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

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

▸ **set**(`angle`: number | [RotValue](/api/interfaces/rotvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number &#124; [RotValue](/api/interfaces/rotvalue) |

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

▸ **setRot**(`angle`: [RotValue](/api/interfaces/rotvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | [RotValue](/api/interfaces/rotvalue) |

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

▸ **clone**(`rot`: [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

___

### `Static` identity

▸ **identity**(): *[Rot](/api/classes/rot)*

**Returns:** *[Rot](/api/classes/rot)*

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

▸ **mul**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

▸ **mul**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulRot

▸ **mulRot**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

Multiply two rotations: q * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

___

### `Static` mulSub

▸ **mulSub**(`rot`: [RotValue](/api/interfaces/rotvalue), `v`: [Vec2Value](/api/interfaces/vec2value), `w`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`v` | [Vec2Value](/api/interfaces/vec2value) |
`w` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulT

▸ **mulT**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

▸ **mulT**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulTRot

▸ **mulTRot**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [RotValue](/api/interfaces/rotvalue)): *[Rot](/api/classes/rot)*

Transpose multiply two rotations: qT * r

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [RotValue](/api/interfaces/rotvalue) |

**Returns:** *[Rot](/api/classes/rot)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Inverse rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulVec2

▸ **mulVec2**(`rot`: [RotValue](/api/interfaces/rotvalue), `m`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

Rotate a vector

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [RotValue](/api/interfaces/rotvalue) |
`m` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*
