# Class: ContactImpulse

Contact impulses for reporting. Impulses are used instead of forces because
sub-step forces may approach infinity for rigid body collisions. These match
up one-to-one with the contact points in Manifold.

## Constructors

### new ContactImpulse()

> **new ContactImpulse**(`contact`): [`ContactImpulse`](/api/classes/ContactImpulse)

#### Parameters

• **contact**: [`Contact`](/api/classes/Contact)

#### Returns

[`ContactImpulse`](/api/classes/ContactImpulse)

## Accessors

### normalImpulses

#### Get Signature

> **get** **normalImpulses**(): `number`[]

##### Returns

`number`[]

***

### tangentImpulses

#### Get Signature

> **get** **tangentImpulses**(): `number`[]

##### Returns

`number`[]

## Methods

### recycle()

> **recycle**(): `void`

#### Returns

`void`
