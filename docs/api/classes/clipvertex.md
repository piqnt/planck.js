[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ClipVertex](clipvertex.md)

# Class: ClipVertex

Used for computing contact manifolds.

## Hierarchy

* **ClipVertex**

## Index

### Properties

* [id](clipvertex.md#id)
* [v](clipvertex.md#v)

### Methods

* [recycle](clipvertex.md#recycle)
* [set](clipvertex.md#set)

## Properties

###  id

• **id**: *[ContactID](contactid.md)* = new ContactID()

*Defined in [collision/Manifold.ts:74](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L74)*

___

###  v

• **v**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [collision/Manifold.ts:73](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L73)*

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Manifold.ts:80](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L80)*

**Returns:** *void*

___

###  set

▸ **set**(`o`: [ClipVertex](clipvertex.md)): *void*

*Defined in [collision/Manifold.ts:76](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [ClipVertex](clipvertex.md) |

**Returns:** *void*
