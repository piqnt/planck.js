---
showOutline: false
---

# Class: ContactID

Contact ids to facilitate warm starting.

ContactFeature: The features that intersect to form the contact point.

## Hierarchy

* **ContactID**

## Index

### Properties

* [indexA](/api/classes/contactid#indexa)
* [indexB](/api/classes/contactid#indexb)
* [key](/api/classes/contactid#key)
* [typeA](/api/classes/contactid#typea)
* [typeB](/api/classes/contactid#typeb)

### Methods

* [recycle](/api/classes/contactid#recycle)
* [set](/api/classes/contactid#set)
* [setFeatures](/api/classes/contactid#setfeatures)
* [swapFeatures](/api/classes/contactid#swapfeatures)

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

• **typeA**: *[ContactFeatureType](/api/enums/contactfeaturetype)* = ContactFeatureType.e_unset

ContactFeature type on shapeA

___

###  typeB

• **typeB**: *[ContactFeatureType](/api/enums/contactfeaturetype)* = ContactFeatureType.e_unset

ContactFeature type on shapeB

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*

___

###  set

▸ **set**(`that`: [ContactID](/api/classes/contactid)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [ContactID](/api/classes/contactid) |

**Returns:** *void*

___

###  setFeatures

▸ **setFeatures**(`indexA`: number, `typeA`: [ContactFeatureType](/api/enums/contactfeaturetype), `indexB`: number, `typeB`: [ContactFeatureType](/api/enums/contactfeaturetype)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`indexA` | number |
`typeA` | [ContactFeatureType](/api/enums/contactfeaturetype) |
`indexB` | number |
`typeB` | [ContactFeatureType](/api/enums/contactfeaturetype) |

**Returns:** *void*

___

###  swapFeatures

▸ **swapFeatures**(): *void*

**Returns:** *void*
