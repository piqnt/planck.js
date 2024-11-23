# Class: ContactImpulse

Contact impulses for reporting. Impulses are used instead of forces because
sub-step forces may approach infinity for rigid body collisions. These match
up one-to-one with the contact points in Manifold.

## Constructors

### new ContactImpulse()

> **new ContactImpulse**(`contact`): [`ContactImpulse`](ContactImpulse)

#### Parameters

• **contact**: [`Contact`](Contact)

#### Returns

[`ContactImpulse`](ContactImpulse)

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
