[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ChainShape](chainshape.md)

# Class: ChainShape

## Hierarchy

* any

  ↳ **ChainShape**

## Callable

▸ **ChainShape**(`vertices`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [shape/index.d.ts:83](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Index

### Constructors

* [constructor](chainshape.md#constructor)

### Properties

* [TYPE](chainshape.md#static-type)

### Methods

* [getChildEdge](chainshape.md#getchildedge)
* [getVertex](chainshape.md#getvertex)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [shape/index.d.ts:85](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"chain"*

*Defined in [shape/index.d.ts:85](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L85)*

## Methods

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [shape/index.d.ts:97](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:98](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*
