---
showOutline: false
---

# Interface: FixtureDef

## Hierarchy

* [FixtureOpt](/api/interfaces/fixtureopt)

  ↳ **FixtureDef**

## Index

### Properties

* [density](/api/interfaces/fixturedef#optional-density)
* [filterCategoryBits](/api/interfaces/fixturedef#optional-filtercategorybits)
* [filterGroupIndex](/api/interfaces/fixturedef#optional-filtergroupindex)
* [filterMaskBits](/api/interfaces/fixturedef#optional-filtermaskbits)
* [friction](/api/interfaces/fixturedef#optional-friction)
* [isSensor](/api/interfaces/fixturedef#optional-issensor)
* [restitution](/api/interfaces/fixturedef#optional-restitution)
* [shape](/api/interfaces/fixturedef#shape)
* [userData](/api/interfaces/fixturedef#optional-userdata)

## Properties

### `Optional` density

• **density**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[density](/api/interfaces/fixtureopt#optional-density)*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[filterCategoryBits](/api/interfaces/fixtureopt#optional-filtercategorybits)*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[filterGroupIndex](/api/interfaces/fixtureopt#optional-filtergroupindex)*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[filterMaskBits](/api/interfaces/fixtureopt#optional-filtermaskbits)*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[friction](/api/interfaces/fixtureopt#optional-friction)*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[isSensor](/api/interfaces/fixtureopt#optional-issensor)*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[restitution](/api/interfaces/fixtureopt#optional-restitution)*

The restitution (elasticity) usually in the range [0,1]

___

###  shape

• **shape**: *[Shape](/api/classes/shape)*

___

### `Optional` userData

• **userData**? : *unknown*

*Inherited from [FixtureOpt](/api/interfaces/fixtureopt).[userData](/api/interfaces/fixtureopt#optional-userdata)*
