
# Class: ContactImpulse

Contact impulses for reporting. Impulses are used instead of forces because
sub-step forces may approach infinity for rigid body collisions. These match
up one-to-one with the contact points in Manifold.

## Hierarchy

* **ContactImpulse**

## Index

### Constructors

* [constructor](/api/classes/contactimpulse#constructor)

### Accessors

* [normalImpulses](/api/classes/contactimpulse#normalimpulses)
* [tangentImpulses](/api/classes/contactimpulse#tangentimpulses)

### Methods

* [recycle](/api/classes/contactimpulse#recycle)

## Constructors

###  constructor

\+ **new ContactImpulse**(`contact`: [Contact](/api/classes/contact)): *[ContactImpulse](/api/classes/contactimpulse)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *[ContactImpulse](/api/classes/contactimpulse)*

## Accessors

###  normalImpulses

• **get normalImpulses**(): *number[]*

**Returns:** *number[]*

___

###  tangentImpulses

• **get tangentImpulses**(): *number[]*

**Returns:** *number[]*

## Methods

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*
