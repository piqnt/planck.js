# Interface: FixtureOpt

A fixture definition is used to create a fixture. This class defines an
abstract fixture definition. You can reuse fixture definitions safely.

## Extended by

- [`FixtureDef`](/api/interfaces/FixtureDef)

## Properties

### density?

> `optional` **density**: `number`

The density, usually in kg/m^2

***

### filterCategoryBits?

> `optional` **filterCategoryBits**: `number`

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

***

### filterGroupIndex?

> `optional` **filterGroupIndex**: `number`

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

***

### filterMaskBits?

> `optional` **filterMaskBits**: `number`

Collision category bit or bits that this fixture accept for collision.

***

### friction?

> `optional` **friction**: `number`

The friction coefficient, usually in the range [0,1]

***

### isSensor?

> `optional` **isSensor**: `boolean`

A sensor shape collects contact information but never generates a collision response.

***

### restitution?

> `optional` **restitution**: `number`

The restitution (elasticity) usually in the range [0,1]

***

### style?

> `optional` **style**: [`Style`](/api/interfaces/Style)

Styling for dev-tools.

***

### userData?

> `optional` **userData**: `unknown`
