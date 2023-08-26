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

ContactFeature index on shapeA

___

###  indexB

• **indexB**: *number* = -1

ContactFeature index on shapeB

___

###  key

• **key**: *number* = -1

Used to quickly compare contact ids.

___

###  typeA

• **typeA**: *[ContactFeatureType](../enums/contactfeaturetype.md)* = ContactFeatureType.e_unset

ContactFeature type on shapeA

___

###  typeB

• **typeB**: *[ContactFeatureType](../enums/contactfeaturetype.md)* = ContactFeatureType.e_unset

ContactFeature type on shapeB

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [ContactID](contactid.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [ContactID](contactid.md) |

**Returns:** *void*

___

###  setFeatures

▸ **setFeatures**(`indexA`: number, `typeA`: [ContactFeatureType](../enums/contactfeaturetype.md), `indexB`: number, `typeB`: [ContactFeatureType](../enums/contactfeaturetype.md)): *void*

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

**Returns:** *void*
