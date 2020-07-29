[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [EdgeShape](edgeshape.md)

# Class: EdgeShape

## Hierarchy

* any

  ↳ **EdgeShape**

## Callable

▸ **EdgeShape**(`v1`: [Vec2](vec2.md), `v2`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:39](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2](vec2.md) |
`v2` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Index

### Constructors

* [constructor](edgeshape.md#constructor)

### Properties

* [m_hasVertex0](edgeshape.md#m_hasvertex0)
* [m_hasVertex3](edgeshape.md#m_hasvertex3)
* [m_type](edgeshape.md#m_type)
* [m_vertex0](edgeshape.md#m_vertex0)
* [m_vertex1](edgeshape.md#m_vertex1)
* [m_vertex2](edgeshape.md#m_vertex2)
* [m_vertex3](edgeshape.md#m_vertex3)
* [TYPE](edgeshape.md#static-type)

### Methods

* [setNext](edgeshape.md#setnext)
* [setPrev](edgeshape.md#setprev)

## Constructors

###  constructor

\+ **new EdgeShape**(`v1`: [Vec2](vec2.md), `v2`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:41](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2](vec2.md) |
`v2` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

## Properties

###  m_hasVertex0

• **m_hasVertex0**: *boolean*

*Defined in [shape/index.d.ts:50](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L50)*

___

###  m_hasVertex3

• **m_hasVertex3**: *boolean*

*Defined in [shape/index.d.ts:51](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L51)*

___

###  m_type

• **m_type**: *"edge"*

*Defined in [shape/index.d.ts:45](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L45)*

___

###  m_vertex0

• **m_vertex0**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:48](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L48)*

___

###  m_vertex1

• **m_vertex1**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:46](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L46)*

___

###  m_vertex2

• **m_vertex2**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:47](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L47)*

___

###  m_vertex3

• **m_vertex3**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:49](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L49)*

___

### `Static` TYPE

▪ **TYPE**: *"edge"*

*Defined in [shape/index.d.ts:41](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L41)*

## Methods

###  setNext

▸ **setNext**(`v3?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:53](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`v3?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*

___

###  setPrev

▸ **setPrev**(`v0?`: [Vec2](vec2.md)): *[EdgeShape](edgeshape.md)*

*Defined in [shape/index.d.ts:54](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/shape/index.d.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`v0?` | [Vec2](vec2.md) |

**Returns:** *[EdgeShape](edgeshape.md)*
