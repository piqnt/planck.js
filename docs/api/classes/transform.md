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

* [setIdentity](transform.md#setidentity)
* [setNum](transform.md#setnum)
* [setTransform](transform.md#settransform)
* [assert](transform.md#static-assert)
* [clone](transform.md#static-clone)
* [identity](transform.md#static-identity)
* [isValid](transform.md#static-isvalid)
* [mulTVec2](transform.md#static-multvec2)
* [mulTXf](transform.md#static-multxf)
* [mulVec2](transform.md#static-mulvec2)
* [mulXf](transform.md#static-mulxf)

## Constructors

###  constructor

\+ **new Transform**(`position?`: [Vec2Value](../interfaces/vec2value.md), `rotation?`: number): *[Transform](transform.md)*

*Defined in [common/Transform.ts:48](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`position?` | [Vec2Value](../interfaces/vec2value.md) |
`rotation?` | number |

**Returns:** *[Transform](transform.md)*

## Properties

###  p

• **p**: *[Vec2](vec2.md)*

*Defined in [common/Transform.ts:45](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L45)*

position

___

###  q

• **q**: *[Rot](rot.md)*

*Defined in [common/Transform.ts:48](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L48)*

rotation

## Methods

###  setIdentity

▸ **setIdentity**(): *void*

*Defined in [common/Transform.ts:87](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L87)*

Set this to the identity transform

**Returns:** *void*

___

###  setNum

▸ **setNum**(`position`: [Vec2Value](../interfaces/vec2value.md), `rotation`: number): *void*

*Defined in [common/Transform.ts:108](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L108)*

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

*Defined in [common/Transform.ts:113](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

*Defined in [common/Transform.ts:125](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`xf`: [Transform](transform.md)): *[Transform](transform.md)*

*Defined in [common/Transform.ts:64](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [Transform](transform.md) |

**Returns:** *[Transform](transform.md)*

___

### `Static` identity

▸ **identity**(): *[Transform](transform.md)*

*Defined in [common/Transform.ts:79](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L79)*

**Returns:** *[Transform](transform.md)*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

*Defined in [common/Transform.ts:118](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mulTVec2

▸ **mulTVec2**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Transform.ts:204](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulTXf

▸ **mulTXf**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

*Defined in [common/Transform.ts:214](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*

___

### `Static` mulVec2

▸ **mulVec2**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [common/Transform.ts:173](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

### `Static` mulXf

▸ **mulXf**(`a`: [TransformValue](../globals.md#transformvalue), `b`: [TransformValue](../globals.md#transformvalue)): *[Transform](transform.md)*

*Defined in [common/Transform.ts:181](https://github.com/shakiba/planck.js/blob/5b96d95/src/common/Transform.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransformValue](../globals.md#transformvalue) |
`b` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *[Transform](transform.md)*
