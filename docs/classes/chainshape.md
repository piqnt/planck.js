[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ChainShape](chainshape.md)

# Class: ChainShape

## Hierarchy

* any

  ↳ **ChainShape**

## Callable

▸ **ChainShape**(`vertices`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [shape/index.d.ts:85](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L85)*

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

* [m_count](chainshape.md#m_count)
* [m_hasNextVertex](chainshape.md#m_hasnextvertex)
* [m_hasPrevVertex](chainshape.md#m_hasprevvertex)
* [m_nextVertex](chainshape.md#m_nextvertex)
* [m_prevVertex](chainshape.md#m_prevvertex)
* [m_type](chainshape.md#m_type)
* [m_vertices](chainshape.md#m_vertices)
* [TYPE](chainshape.md#static-type)

### Methods

* [getChildEdge](chainshape.md#getchildedge)
* [getVertex](chainshape.md#getvertex)

## Constructors

###  constructor

\+ **new ChainShape**(`vertices`: [Vec2](vec2.md)[], `loop?`: boolean): *[ChainShape](chainshape.md)*

*Defined in [shape/index.d.ts:87](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](vec2.md)[] |
`loop?` | boolean |

**Returns:** *[ChainShape](chainshape.md)*

## Properties

###  m_count

• **m_count**: *number*

*Defined in [shape/index.d.ts:93](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L93)*

___

###  m_hasNextVertex

• **m_hasNextVertex**: *boolean*

*Defined in [shape/index.d.ts:97](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L97)*

___

###  m_hasPrevVertex

• **m_hasPrevVertex**: *boolean*

*Defined in [shape/index.d.ts:96](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L96)*

___

###  m_nextVertex

• **m_nextVertex**: *[Vec2](vec2.md) | null*

*Defined in [shape/index.d.ts:95](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L95)*

___

###  m_prevVertex

• **m_prevVertex**: *[Vec2](vec2.md) | null*

*Defined in [shape/index.d.ts:94](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L94)*

___

###  m_type

• **m_type**: *"chain"*

*Defined in [shape/index.d.ts:91](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L91)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:92](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L92)*

___

### `Static` TYPE

▪ **TYPE**: *"chain"*

*Defined in [shape/index.d.ts:87](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L87)*

## Methods

###  getChildEdge

▸ **getChildEdge**(`edge`: [EdgeShape](edgeshape.md), `childIndex`: number): *void*

*Defined in [shape/index.d.ts:104](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`edge` | [EdgeShape](edgeshape.md) |
`childIndex` | number |

**Returns:** *void*

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:105](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*
