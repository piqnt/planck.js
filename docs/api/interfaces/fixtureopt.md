[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FixtureOpt](fixtureopt.md)

# Interface: FixtureOpt

A fixture definition is used to create a fixture. This class defines an
abstract fixture definition. You can reuse fixture definitions safely.

## Hierarchy

* **FixtureOpt**

  ↳ [FixtureDef](fixturedef.md)

## Index

### Properties

* [density](fixtureopt.md#optional-density)
* [filterCategoryBits](fixtureopt.md#optional-filtercategorybits)
* [filterGroupIndex](fixtureopt.md#optional-filtergroupindex)
* [filterMaskBits](fixtureopt.md#optional-filtermaskbits)
* [friction](fixtureopt.md#optional-friction)
* [isSensor](fixtureopt.md#optional-issensor)
* [restitution](fixtureopt.md#optional-restitution)
* [userData](fixtureopt.md#optional-userdata)

## Properties

### `Optional` density

• **density**? : *number*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

The restitution (elasticity) usually in the range [0,1]

___

### `Optional` userData

• **userData**? : *unknown*
