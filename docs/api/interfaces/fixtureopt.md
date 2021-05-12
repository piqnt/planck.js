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

*Defined in [src/dynamics/Fixture.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L56)*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

*Defined in [src/dynamics/Fixture.ts:70](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L70)*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

*Defined in [src/dynamics/Fixture.ts:65](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L65)*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

*Defined in [src/dynamics/Fixture.ts:74](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L74)*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

*Defined in [src/dynamics/Fixture.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L48)*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

*Defined in [src/dynamics/Fixture.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L60)*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

*Defined in [src/dynamics/Fixture.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L52)*

The restitution (elasticity) usually in the range [0,1]

___

### `Optional` userData

• **userData**? : *unknown*

*Defined in [src/dynamics/Fixture.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L44)*
