
## Fixture
Shapes only have geometrical coordinates, they don't have physical properties and don't know about the body's transformation, so may be used independently of the physics simulation.
The `Fixture` class is used to attach shapes to bodies. A body may have zero or more fixtures. A
body with multiple fixtures is sometimes called a *compound body.*

Fixtures hold the following:
- a single shape
- broad-phase proxies
- density, friction, and restitution
- collision filtering flags
- back pointer to the parent body
- user data
- sensor flag

These are described in the following sections.

### Fixture Creation
Fixtures are created by initializing a fixture definition and then
passing the definition to the parent body.

```js
let myFixture = myBody.createFixture({
  shape: myShape,
  density: 1,
});
```

This creates the fixture and attaches it to the body. You do not need to
store the fixture pointer since the fixture will automatically be
destroyed when the parent body is destroyed. You can create multiple
fixtures on a single body.

You can destroy a fixture on the parent body. You may do this to model a
breakable object. Otherwise you can just leave the fixture alone and let
the body destruction take care of destroying the attached fixtures.

```js
myBody.destroyFixture(myFixture);
```

### Density
The fixture density is used to compute the mass properties of the parent
body. The density can be zero or positive. You should generally use
similar densities for all your fixtures. This will improve stacking
stability.

The mass of a body is not adjusted when you set the density. You must
call resetMassData for this to occur.

```js
fixture.setDensity(5);
body.resetMassData();
```

### Friction
Friction is used to make objects slide along each other realistically.
Planck.js supports static and dynamic friction, but uses the same parameter
for both. Friction is simulated accurately in Planck.js and the friction
strength is proportional to the normal force (this is called Coulomb
friction). The friction parameter is usually set between 0 and 1, but
can be any non-negative value. A friction value of 0 turns off friction
and a value of 1 makes the friction strong. When the friction force is
computed between two shapes, Planck.js must combine the friction parameters
of the two parent fixtures. This is done with the geometric mean:

```js
function mixFriction(friction1, friction2) {
  return Math.sqrt(friction1 * friction2);
}
```

So if one fixture has zero friction then the contact will have zero
friction.

You can override the default mixed friction using
`contact.setFriction`. This is usually done in the contact listener
callback.

### Restitution
Restitution is used to make objects bounce. The restitution value is
usually set to be between 0 and 1. Consider dropping a ball on a table.
A value of zero means the ball won't bounce. This is called an
inelastic collision. A value of one means the ball's velocity will be
exactly reflected. This is called a perfectly elastic collision.
Restitution is combined using the following formula.

```js
function mixRestitution(restitution1, restitution2) {
  return Math.max(restitution1, restitution2);
}
```

Restitution is combined this way so that you can have a bouncy super
ball without having a bouncy floor.

You can override the default mixed restitution using
`contact.setRestitution`. This is usually done in the contact listener
callback.

When a shape develops multiple contacts, restitution is simulated
approximately. This is because Planck.js uses an iterative solver. Planck.js
also uses inelastic collisions when the collision velocity is small.
This is done to prevent jitter. See `Settings.velocityThreshold`.

### Filtering
Collision filtering allows you to prevent collision between fixtures.
For example, say you make a character that rides a bicycle. You want the
bicycle to collide with the terrain and the character to collide with
the terrain, but you don't want the character to collide with the
bicycle (because they must overlap). Planck.js supports such collision
filtering using categories and groups.

Planck.js supports 64 [todo?] collision categories. For each fixture you can specify
which category it belongs to. You also specify what other categories
this fixture can collide with. For example, you could specify in a
multiplayer game that all players don't collide with each other and
monsters don't collide with each other, but players and monsters should
collide. This is done with masking bits. For example:

```js
let playerFixtureDef = {
  filterCategoryBits: parseInt('010', 2),
  filterMaskBits: parseInt('100', 2),
};
let monsterFixtureDef = {
  filterCategoryBits: parseInt('100', 2),
  filterMaskBits: parseInt('010', 2),
};
```

Here is the rule for a collision to occur:

```js
let catA = fixtureA.filterCategoryBits;
let maskA = fixtureA.filterMaskBits;
let catB = fixtureB.filterCategoryBits;
let maskB = fixtureB.filterMaskBits;

if ((catA & maskB) !== 0 && (catB & maskA) !== 0) {
  // fixtures can collide
}
```

Collision groups let you specify an integral group index. You can have
all fixtures with the same group index always collide (positive index)
or never collide (negative index). Group indices are usually used for
things that are somehow related, like the parts of a bicycle. In the
following example, `fixture1` and `fixture2` always collide, but `fixture3`
and `fixture4` never collide.

```js
fixture1Def.filterGroupIndex = 2;
fixture2Def.filterGroupIndex = 2;
fixture3Def.filterGroupIndex = -8;
fixture4Def.filterGroupIndex = -8;
```

Collisions between fixtures of different group indices are filtered
according to the category and mask bits. In other words, group filtering
has higher precedence than category filtering.

Note that additional collision filtering occurs in Planck.js. Here is a
list:
- A fixture on a static body can only collide with a dynamic body.
- A fixture on a kinematic body can only collide with a dynamic body.
- Fixtures on the same body never collide with each other.
- You can optionally enable/disable collision between fixtures on bodies connected by a joint.

Sometimes you might need to change collision filtering after a fixture
has already been created. You can get and set the Filter structure on
an existing fixture using fixture.getFilterData and
fixture.setFilterData. Note that changing the filter data will not
add or remove contacts until the next time step (see the World class).

### Sensors
Sometimes game logic needs to know when two fixtures overlap yet there
should be no collision response. This is done by using sensors. A sensor
is a fixture that detects collision but does not produce a response.

You can flag any fixture as being a sensor. Sensors may be static,
kinematic, or dynamic. Remember that you may have multiple fixtures per
body and you can have any mix of sensors and solid fixtures. Also,
sensors only form contacts when at least one body is dynamic, so you
will not get a contact for kinematic versus kinematic, kinematic versus
static, or static versus static.

Sensors do not generate contact points. There are two ways to get the
state of a sensor:
1. `contact.isTouching()`
2. `begin-contact` and `end-contact` events
