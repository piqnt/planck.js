# Class: ContactID

Contact ids to facilitate warm starting.

ContactFeature: The features that intersect to form the contact point.

## Constructors

### new ContactID()

> **new ContactID**(): [`ContactID`](/api/classes/ContactID)

#### Returns

[`ContactID`](/api/classes/ContactID)

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

> **typeA**: [`ContactFeatureType`](/api/enumerations/ContactFeatureType) = `ContactFeatureType.e_unset`

ContactFeature type on shapeA

***

### typeB

> **typeB**: [`ContactFeatureType`](/api/enumerations/ContactFeatureType) = `ContactFeatureType.e_unset`

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

• **that**: [`ContactID`](/api/classes/ContactID)

#### Returns

`void`

***

### setFeatures()

> **setFeatures**(`indexA`, `typeA`, `indexB`, `typeB`): `void`

#### Parameters

• **indexA**: `number`

• **typeA**: [`ContactFeatureType`](/api/enumerations/ContactFeatureType)

• **indexB**: `number`

• **typeB**: [`ContactFeatureType`](/api/enumerations/ContactFeatureType)

#### Returns

`void`

***

### swapFeatures()

> **swapFeatures**(): `void`

#### Returns

`void`
