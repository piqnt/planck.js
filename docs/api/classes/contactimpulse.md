[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactImpulse](contactimpulse.md)

# Class: ContactImpulse

Contact impulses for reporting. Impulses are used instead of forces because
sub-step forces may approach infinity for rigid body collisions. These match
up one-to-one with the contact points in Manifold.

## Hierarchy

* **ContactImpulse**

## Index

### Constructors

* [constructor](contactimpulse.md#constructor)

### Accessors

* [normalImpulses](contactimpulse.md#normalimpulses)
* [tangentImpulses](contactimpulse.md#tangentimpulses)

### Methods

* [recycle](contactimpulse.md#recycle)

## Constructors

###  constructor

\+ **new ContactImpulse**(`contact`: [Contact](contact.md)): *[ContactImpulse](contactimpulse.md)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactImpulse](contactimpulse.md)*

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
