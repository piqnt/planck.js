[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FixtureDef](fixturedef.md)

# Interface: FixtureDef

## Hierarchy

* [FixtureOpt](fixtureopt.md)

  ↳ **FixtureDef**

## Index

### Properties

* [density](fixturedef.md#optional-density)
* [filterCategoryBits](fixturedef.md#optional-filtercategorybits)
* [filterGroupIndex](fixturedef.md#optional-filtergroupindex)
* [filterMaskBits](fixturedef.md#optional-filtermaskbits)
* [friction](fixturedef.md#optional-friction)
* [isSensor](fixturedef.md#optional-issensor)
* [restitution](fixturedef.md#optional-restitution)
* [shape](fixturedef.md#shape)
* [userData](fixturedef.md#optional-userdata)

## Properties

### `Optional` density

• **density**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[density](fixtureopt.md#optional-density)*

*Defined in [src/dynamics/Fixture.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L56)*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterCategoryBits](fixtureopt.md#optional-filtercategorybits)*

*Defined in [src/dynamics/Fixture.ts:70](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L70)*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterGroupIndex](fixtureopt.md#optional-filtergroupindex)*

*Defined in [src/dynamics/Fixture.ts:65](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L65)*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterMaskBits](fixtureopt.md#optional-filtermaskbits)*

*Defined in [src/dynamics/Fixture.ts:74](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L74)*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[friction](fixtureopt.md#optional-friction)*

*Defined in [src/dynamics/Fixture.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L48)*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

*Inherited from [FixtureOpt](fixtureopt.md).[isSensor](fixtureopt.md#optional-issensor)*

*Defined in [src/dynamics/Fixture.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L60)*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[restitution](fixtureopt.md#optional-restitution)*

*Defined in [src/dynamics/Fixture.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L52)*

The restitution (elasticity) usually in the range [0,1]

___

###  shape

• **shape**: *[Shape](../classes/shape.md)*

*Defined in [src/dynamics/Fixture.ts:78](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L78)*

___

### `Optional` userData

• **userData**? : *unknown*

*Inherited from [FixtureOpt](fixtureopt.md).[userData](fixtureopt.md#optional-userdata)*

*Defined in [src/dynamics/Fixture.ts:44](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L44)*
