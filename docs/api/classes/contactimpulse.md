[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactImpulse](contactimpulse.md)

# Class: ContactImpulse

Contact impulses for reporting. Impulses are used instead of forces because
sub-step forces may approach infinity for rigid body collisions. These match
up one-to-one with the contact points in Manifold.
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

\+ **new ContactImpulse**(`contact`: any): *[ContactImpulse](contactimpulse.md)*

*Defined in [dist/planck.d.ts:1327](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1327)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | any |

**Returns:** *[ContactImpulse](contactimpulse.md)*

## Accessors

###  normalImpulses

• **get normalImpulses**(): *number[]*

*Defined in [src/dynamics/Solver.ts:85](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L85)*

**Returns:** *number[]*

___

###  tangentImpulses

• **get tangentImpulses**(): *number[]*

*Defined in [src/dynamics/Solver.ts:95](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L95)*

**Returns:** *number[]*
