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

*Defined in [dynamics/Solver.ts:89](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Solver.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactImpulse](contactimpulse.md)*

## Accessors

###  normalImpulses

• **get normalImpulses**(): *number[]*

*Defined in [dynamics/Solver.ts:102](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Solver.ts#L102)*

**Returns:** *number[]*

___

###  tangentImpulses

• **get tangentImpulses**(): *number[]*

*Defined in [dynamics/Solver.ts:112](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Solver.ts#L112)*

**Returns:** *number[]*

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [dynamics/Solver.ts:97](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Solver.ts#L97)*

**Returns:** *void*
