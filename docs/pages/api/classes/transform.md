
# Class: Transform

A transform contains translation and rotation. It is used to represent the
position and orientation of rigid frames. Initialize using a position vector
and a rotation.

## Hierarchy

* **Transform**

## Index

### Constructors

* [constructor](/api/classes/transform#constructor)

### Properties

* [p](/api/classes/transform#p)
* [q](/api/classes/transform#q)

### Methods

* [set](/api/classes/transform#set)
* [setIdentity](/api/classes/transform#setidentity)
* [setNum](/api/classes/transform#setnum)
* [setTransform](/api/classes/transform#settransform)
* [assert](/api/classes/transform#static-assert)
* [clone](/api/classes/transform#static-clone)
* [identity](/api/classes/transform#static-identity)
* [isValid](/api/classes/transform#static-isvalid)
* [mul](/api/classes/transform#static-mul)
* [mulAll](/api/classes/transform#static-mulall)
* [mulT](/api/classes/transform#static-mult)
* [mulTVec2](/api/classes/transform#static-multvec2)
* [mulTXf](/api/classes/transform#static-multxf)
* [mulVec2](/api/classes/transform#static-mulvec2)
* [mulXf](/api/classes/transform#static-mulxf)

## Constructors

###  constructor

\+ **new Transform**(`position?`: [Vec2Value](/api/interfaces/vec2value), `rotation?`: number): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2Value](/api/interfaces/vec2value) |
`rotation?` | number |

**Returns:** *[Transform](/api/classes/transform)*

## Properties

###  p

• **p**: *Vec2*

position

___

###  q

• **q**: *[Rot](/api/classes/rot)*

rotation

## Methods

###  set

▸ **set**(`position`: [Vec2Value](/api/interfaces/vec2value), `rotation`: number): *void*

Set position and angle

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`rotation` | number |

**Returns:** *void*

▸ **set**(`xf`: [TransformValue](/api/globals#transformvalue)): *void*

Copy from another transform

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

###  setIdentity

▸ **setIdentity**(): *void*

Set this to the identity transform

**Returns:** *void*

___

###  setNum

▸ **setNum**(`position`: [Vec2Value](/api/interfaces/vec2value), `rotation`: number): *void*

Set position and angle

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`rotation` | number |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`xf`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) |

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

▸ **clone**(`xf`: [Transform](/api/classes/transform)): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](/api/classes/transform) |

**Returns:** *[Transform](/api/classes/transform)*

___

### `Static` identity

▸ **identity**(): *[Transform](/api/classes/transform)*

**Returns:** *[Transform](/api/classes/transform)*

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

▸ **mul**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

▸ **mul**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [TransformValue](/api/globals#transformvalue)): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *[Transform](/api/classes/transform)*

___

### `Static` mulAll

▸ **mulAll**(`a`: [Transform](/api/classes/transform), `b`: [Vec2Value](/api/interfaces/vec2value)[]): *Vec2[]*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](/api/classes/transform) |
`b` | [Vec2Value](/api/interfaces/vec2value)[] |

**Returns:** *Vec2[]*

▸ **mulAll**(`a`: [Transform](/api/classes/transform), `b`: [Transform](/api/classes/transform)[]): *[Transform](/api/classes/transform)[]*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Transform](/api/classes/transform) |
`b` | [Transform](/api/classes/transform)[] |

**Returns:** *[Transform](/api/classes/transform)[]*

___

### `Static` mulT

▸ **mulT**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

▸ **mulT**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [TransformValue](/api/globals#transformvalue)): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *[Transform](/api/classes/transform)*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [TransformValue](/api/globals#transformvalue)): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *[Transform](/api/classes/transform)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [Vec2Value](/api/interfaces/vec2value)): *Vec2*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *Vec2*

___

### `Static` mulXf

▸ **mulXf**(`a`: [TransformValue](/api/globals#transformvalue), `b`: [TransformValue](/api/globals#transformvalue)): *[Transform](/api/classes/transform)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](/api/globals#transformvalue) |
`b` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *[Transform](/api/classes/transform)*
