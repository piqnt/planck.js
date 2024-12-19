# Interface: FixtureDef

A fixture definition is used to create a fixture. This class defines an
abstract fixture definition. You can reuse fixture definitions safely.

## Extends

- [`FixtureOpt`](FixtureOpt)

## Properties

### density?

> `optional` **density**: `number`

The density, usually in kg/m^2

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`density`](FixtureOpt#density)

***

### filterCategoryBits?

> `optional` **filterCategoryBits**: `number`

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`filterCategoryBits`](FixtureOpt#filtercategorybits)

***

### filterGroupIndex?

> `optional` **filterGroupIndex**: `number`

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`filterGroupIndex`](FixtureOpt#filtergroupindex)

***

### filterMaskBits?

> `optional` **filterMaskBits**: `number`

Collision category bit or bits that this fixture accept for collision.

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`filterMaskBits`](FixtureOpt#filtermaskbits)

***

### friction?

> `optional` **friction**: `number`

The friction coefficient, usually in the range [0,1]

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`friction`](FixtureOpt#friction)

***

### isSensor?

> `optional` **isSensor**: `boolean`

A sensor shape collects contact information but never generates a collision response.

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`isSensor`](FixtureOpt#issensor)

***

### restitution?

> `optional` **restitution**: `number`

The restitution (elasticity) usually in the range [0,1]

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`restitution`](FixtureOpt#restitution)

***

### shape

> **shape**: [`Shape`](../classes/Shape)

***

### style?

> `optional` **style**: [`Style`](Style)

Styling for dev-tools.

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`style`](FixtureOpt#style)

***

### userData?

> `optional` **userData**: `unknown`

#### Inherited from

[`FixtureOpt`](FixtureOpt).[`userData`](FixtureOpt#userdata)
