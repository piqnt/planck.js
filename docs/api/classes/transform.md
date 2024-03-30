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
* [setNum](transform.md#setnum)
* [setTransform](transform.md#settransform)
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

\+ **new Transform**(`position?`: [Vec2Value](../interfaces/vec2value.md), `rotation?`: number): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2Value](../interfaces/vec2value.md) |
`rotation?` | number |

**Returns:** *[Transform](transform.md)*

## Properties

###  p

• **p**: *Vec2*

position

___

###  q

• **q**: *[Rot](rot.md)*

rotation

## Methods

###  set

▸ **set**(`position`: [Vec2Value](../interfaces/vec2value.md), `rotation`: number): *void*

Set position and angle

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](../interfaces/vec2value.md) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [TransformValue](../globals.md#transformvalue)): *void*

Copy from another transform

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

Set this to the identity transform

**Returns:** *void*

___

###  setNum

▸ **setNum**(`position`: [Vec2Value](../interfaces/vec2value.md), `rotation`: number): *void*

Set position and angle

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](../interfaces/vec2value.md) |
`rotation` | number |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [TransformValue](../globals.md#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) |

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

▸ **clone**(`xf`: [Transform](transform.md)): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` identity

▸ **identity**(): *[Transform](transform.md)*

**Returns:** *[Transform](transform.md)*

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

▸ **mul**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

▸ **mul**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulAll

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Vec2Value](../interfaces/vec2value.md)[]): *Vec2[]*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Vec2Value](../interfaces/vec2value.md)[] |

**Returns:** *Vec2[]*

▸ **mulAll**(`a`: [Transform](transform.md), `b`: [Transform](transform.md)[]): *[Transform](transform.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](transform.md) |
`b` | [Transform](transform.md)[] |

**Returns:** *[Transform](transform.md)[]*

___

### `Static` mulT

▸ **mulT**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

▸ **mulT**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

### `Static` mulXf

▸ **mulXf**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*
