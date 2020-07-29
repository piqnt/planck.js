[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PolygonShape](polygonshape.md)

# Class: PolygonShape

## Hierarchy

* any

  ↳ **PolygonShape**

## Callable

▸ **PolygonShape**(`vertices`: [Vec2](vec2.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [shape/index.d.ts:59](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](vec2.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Index

### Constructors

* [constructor](polygonshape.md#constructor)

### Properties

* [m_centroid](polygonshape.md#m_centroid)
* [m_count](polygonshape.md#m_count)
* [m_normals](polygonshape.md#m_normals)
* [m_type](polygonshape.md#m_type)
* [m_vertices](polygonshape.md#m_vertices)
* [TYPE](polygonshape.md#static-type)

### Methods

* [getVertex](polygonshape.md#getvertex)
* [validate](polygonshape.md#validate)

## Constructors

###  constructor

\+ **new PolygonShape**(`vertices`: [Vec2](vec2.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [shape/index.d.ts:61](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](vec2.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:66](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L66)*

___

###  m_count

• **m_count**: *number*

*Defined in [shape/index.d.ts:69](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L69)*

___

###  m_normals

• **m_normals**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:68](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L68)*

___

###  m_type

• **m_type**: *"polygon"*

*Defined in [shape/index.d.ts:65](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L65)*

___

###  m_vertices

• **m_vertices**: *[Vec2](vec2.md)[]*

*Defined in [shape/index.d.ts:67](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L67)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"*

*Defined in [shape/index.d.ts:61](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L61)*

## Methods

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [shape/index.d.ts:71](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  validate

▸ **validate**(): *void*

*Defined in [shape/index.d.ts:72](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/shape/index.d.ts#L72)*

**Returns:** *void*
