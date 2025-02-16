# Interface: FixtureDef

A fixture definition is used to create a fixture. This class defines an
abstract fixture definition. You can reuse fixture definitions safely.

## Extends

- [`FixtureOpt`](/api/interfaces/FixtureOpt)

## Properties

### density?

> `optional` **density**: `number`

The density, usually in kg/m^2

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`density`](/api/interfaces/FixtureOpt#density)

***

### filterCategoryBits?

> `optional` **filterCategoryBits**: `number`

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`filterCategoryBits`](/api/interfaces/FixtureOpt#filtercategorybits)

***

### filterGroupIndex?

> `optional` **filterGroupIndex**: `number`

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`filterGroupIndex`](/api/interfaces/FixtureOpt#filtergroupindex)

***

### filterMaskBits?

> `optional` **filterMaskBits**: `number`

Collision category bit or bits that this fixture accept for collision.

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`filterMaskBits`](/api/interfaces/FixtureOpt#filtermaskbits)

***

### friction?

> `optional` **friction**: `number`

The friction coefficient, usually in the range [0,1]

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`friction`](/api/interfaces/FixtureOpt#friction)

***

### isSensor?

> `optional` **isSensor**: `boolean`

A sensor shape collects contact information but never generates a collision response.

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`isSensor`](/api/interfaces/FixtureOpt#issensor)

***

### restitution?

> `optional` **restitution**: `number`

The restitution (elasticity) usually in the range [0,1]

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`restitution`](/api/interfaces/FixtureOpt#restitution)

***

### shape

> **shape**: [`Shape`](/api/classes/Shape)

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`style`](/api/interfaces/FixtureOpt#style)

***

### userData?

> `optional` **userData**: `unknown`

#### Inherited from

[`FixtureOpt`](/api/interfaces/FixtureOpt).[`userData`](/api/interfaces/FixtureOpt#userdata)
