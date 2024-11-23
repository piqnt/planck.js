# Class: ContactID

Contact ids to facilitate warm starting.

ContactFeature: The features that intersect to form the contact point.

## Constructors

### new ContactID()

> **new ContactID**(): [`ContactID`](ContactID)

#### Returns

[`ContactID`](ContactID)

## Properties

### indexA

> **indexA**: `number` = `-1`

ContactFeature index on shapeA

***

### indexB

> **indexB**: `number` = `-1`

ContactFeature index on shapeB

***

### key

> **key**: `number` = `-1`

Used to quickly compare contact ids.

***

### typeA

> **typeA**: [`ContactFeatureType`](../enumerations/ContactFeatureType) = `ContactFeatureType.e_unset`

ContactFeature type on shapeA

***

### typeB

> **typeB**: [`ContactFeatureType`](../enumerations/ContactFeatureType) = `ContactFeatureType.e_unset`

ContactFeature type on shapeB

## Methods

### recycle()

> **recycle**(): `void`

#### Returns

`void`

***

### set()

> **set**(`that`): `void`

#### Parameters

• **that**: [`ContactID`](ContactID)

#### Returns

`void`

***

### setFeatures()

> **setFeatures**(`indexA`, `typeA`, `indexB`, `typeB`): `void`

#### Parameters

• **indexA**: `number`

• **typeA**: [`ContactFeatureType`](../enumerations/ContactFeatureType)

• **indexB**: `number`

• **typeB**: [`ContactFeatureType`](../enumerations/ContactFeatureType)

#### Returns

`void`

***

### swapFeatures()

> **swapFeatures**(): `void`

#### Returns

`void`
