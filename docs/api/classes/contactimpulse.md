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

## Constructors

###  constructor

\+ **new ContactImpulse**(`contact`: [Contact](contact.md)): *[ContactImpulse](contactimpulse.md)*

*Defined in [src/dynamics/Solver.ts:79](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactImpulse](contactimpulse.md)*

## Accessors

###  normalImpulses

• **get normalImpulses**(): *number[]*

*Defined in [src/dynamics/Solver.ts:87](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L87)*

**Returns:** *number[]*

___

###  tangentImpulses

• **get tangentImpulses**(): *number[]*

*Defined in [src/dynamics/Solver.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L97)*

**Returns:** *number[]*
