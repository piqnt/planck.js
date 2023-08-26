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

*Defined in [src/dynamics/Fixture.ts:58](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L58)*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

*Defined in [src/dynamics/Fixture.ts:72](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L72)*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

*Defined in [src/dynamics/Fixture.ts:67](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L67)*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

*Defined in [src/dynamics/Fixture.ts:76](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L76)*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

*Defined in [src/dynamics/Fixture.ts:50](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L50)*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

*Defined in [src/dynamics/Fixture.ts:62](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L62)*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

*Defined in [src/dynamics/Fixture.ts:54](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L54)*

The restitution (elasticity) usually in the range [0,1]

___

### `Optional` userData

• **userData**? : *unknown*

*Defined in [src/dynamics/Fixture.ts:46](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Fixture.ts#L46)*
