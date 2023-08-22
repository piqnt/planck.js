[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactID](contactid.md)

# Class: ContactID

Contact ids to facilitate warm starting.

ContactFeature: The features that intersect to form the contact point.

## Hierarchy

* **ContactID**

## Index

### Properties

* [indexA](contactid.md#indexa)
* [indexB](contactid.md#indexb)
* [key](contactid.md#key)
* [typeA](contactid.md#typea)
* [typeB](contactid.md#typeb)

### Methods

* [recycle](contactid.md#recycle)
* [set](contactid.md#set)
* [setFeatures](contactid.md#setfeatures)
* [swapFeatures](contactid.md#swapfeatures)

## Properties

###  indexA

• **indexA**: *number* = -1

*Defined in [collision/Manifold.ts:278](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L278)*

ContactFeature index on shapeA

___

###  indexB

• **indexB**: *number* = -1

*Defined in [collision/Manifold.ts:281](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L281)*

ContactFeature index on shapeB

___

###  key

• **key**: *number* = -1

*Defined in [collision/Manifold.ts:275](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L275)*

Used to quickly compare contact ids.

___

###  typeA

• **typeA**: *[ContactFeatureType](../enums/contactfeaturetype.md)* = ContactFeatureType.e_unset

*Defined in [collision/Manifold.ts:284](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L284)*

ContactFeature type on shapeA

___

###  typeB

• **typeB**: *[ContactFeatureType](../enums/contactfeaturetype.md)* = ContactFeatureType.e_unset

*Defined in [collision/Manifold.ts:287](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L287)*

ContactFeature type on shapeB

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Manifold.ts:317](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L317)*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [ContactID](contactid.md)): *void*

*Defined in [collision/Manifold.ts:297](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L297)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [ContactID](contactid.md) |

**Returns:** *void*

___

###  setFeatures

▸ **setFeatures**(`indexA`: number, `typeA`: [ContactFeatureType](../enums/contactfeaturetype.md), `indexB`: number, `typeB`: [ContactFeatureType](../enums/contactfeaturetype.md)): *void*

*Defined in [collision/Manifold.ts:289](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`indexA` | number |
`typeA` | [ContactFeatureType](../enums/contactfeaturetype.md) |
`indexB` | number |
`typeB` | [ContactFeatureType](../enums/contactfeaturetype.md) |

**Returns:** *void*

___

###  swapFeatures

▸ **swapFeatures**(): *void*

*Defined in [collision/Manifold.ts:305](https://github.com/shakiba/planck.js/blob/1bc1208/src/collision/Manifold.ts#L305)*

**Returns:** *void*
