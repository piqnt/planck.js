[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Manifold](manifold.md)

# Interface: Manifold

## Hierarchy

* **Manifold**

## Index

### Properties

* [localNormal](manifold.md#localnormal)
* [localPoint](manifold.md#localpoint)
* [pointCount](manifold.md#pointcount)
* [points](manifold.md#points)
* [type](manifold.md#type)

### Methods

* [getWorldManifold](manifold.md#getworldmanifold)

## Properties

###  localNormal

• **localNormal**: *[Vec2](../classes/vec2.md)*

*Defined in [index.d.ts:50](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L50)*

___

###  localPoint

• **localPoint**: *[Vec2](../classes/vec2.md)*

*Defined in [index.d.ts:51](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L51)*

___

###  pointCount

• **pointCount**: *number*

*Defined in [index.d.ts:53](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L53)*

___

###  points

• **points**: *[ManifoldPoint](manifoldpoint.md)[]*

*Defined in [index.d.ts:52](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L52)*

___

###  type

• **type**: *[ManifoldType](../enums/manifoldtype.md)*

*Defined in [index.d.ts:49](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L49)*

## Methods

###  getWorldManifold

▸ **getWorldManifold**(`wm`: [WorldManifold](worldmanifold.md) | undefined, `xfA`: [Transform](../classes/transform.md), `radiusA`: number, `xfB`: [Transform](../classes/transform.md), `radiusB`: number): *[WorldManifold](worldmanifold.md) | undefined*

*Defined in [index.d.ts:55](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`wm` | [WorldManifold](worldmanifold.md) &#124; undefined |
`xfA` | [Transform](../classes/transform.md) |
`radiusA` | number |
`xfB` | [Transform](../classes/transform.md) |
`radiusB` | number |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*
