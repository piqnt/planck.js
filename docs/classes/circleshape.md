[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [CircleShape](circleshape.md)

# Class: CircleShape

## Hierarchy

* any

  ↳ **CircleShape**

## Callable

▸ **CircleShape**(`position`: [Vec2](vec2.md), `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [shape/index.d.ts:23](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

▸ **CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [shape/index.d.ts:24](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

## Index

### Constructors

* [constructor](circleshape.md#constructor)

### Properties

* [TYPE](circleshape.md#static-type)

### Methods

* [getCenter](circleshape.md#getcenter)
* [getVertex](circleshape.md#getvertex)
* [getVertexCount](circleshape.md#getvertexcount)

## Constructors

###  constructor

\+ **new CircleShape**(`position`: [Vec2](vec2.md), `radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [shape/index.d.ts:26](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

\+ **new CircleShape**(`radius?`: number): *[CircleShape](circleshape.md)*

*Defined in [shape/index.d.ts:28](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

**Returns:** *[CircleShape](circleshape.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"circle"*

*Defined in [shape/index.d.ts:26](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L26)*

## Methods

###  getCenter

▸ **getCenter**(): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:34](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L34)*

**Returns:** *[Vec2](vec2.md)*

___

###  getVertex

▸ **getVertex**(`index?`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:35](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`index?` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getVertexCount

▸ **getVertexCount**(`index?`: number): *1*

*Defined in [shape/index.d.ts:36](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`index?` | number |

**Returns:** *1*
