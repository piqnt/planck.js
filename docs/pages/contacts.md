
## Contacts
Contacts are objects created by Planck.js to manage collision between two
fixtures. If the fixture has children, such as a chain shape, then a
contact exists for each relevant child. There are different kinds of
contacts, derived from Contact, for managing contact between different
kinds of fixtures. For example there is a contact class for managing
polygon-polygon collision and another contact class for managing
circle-circle collision.

Here is some terminology associated with contacts.

#### Contact Point
A contact point is a point where two shapes touch. Planck.js approximates
contact with a small number of points.

#### Contact Normal
A contact normal is a unit vector that points from one shape to another.
By convention, the normal points from fixtureA to fixtureB.

#### Contact Separation
Separation is the opposite of penetration. Separation is negative when
shapes overlap. It is possible that future versions of Planck.js will create
contact points with positive separation, so you may want to check the
sign when contact points are reported.

#### Contact Manifold
Contact between two convex polygons may generate up to 2 contact points.
Both of these points use the same normal, so they are grouped into a
contact manifold, which is an approximation of a continuous region of
contact.

#### Normal Impulse
The normal force is the force applied at a contact point to prevent the
shapes from penetrating. For convenience, Planck.js works with impulses. The
normal impulse is just the normal force multiplied by the time step.

#### Tangent Impulse
The tangent force is generated at a contact point to simulate friction.
For convenience, this is stored as an impulse.

#### Contact Ids
Planck.js tries to re-use the contact force results from a time step as the
initial guess for the next time step. Planck.js uses contact ids to match
contact points across time steps. The ids contain geometric features
indices that help to distinguish one contact point from another.

Contacts are created when two fixture's AABBs overlap. Sometimes
collision filtering will prevent the creation of contacts. Contacts are
destroyed with the AABBs cease to overlap.

So you might gather that there may be contacts created for fixtures that
are not touching (just their AABBs). Well, this is correct. It's a
"chicken or egg" problem. We don't know if we need a contact object
until one is created to analyze the collision. We could delete the
contact right away if the shapes are not touching, or we can just wait
until the AABBs stop overlapping. Planck.js takes the latter approach
because it lets the system cache information to improve performance.

## Contact Class
As mentioned before, the contact class is created and destroyed by
Planck.js. Contact objects are not created by the user. However, you are
able to access the contact class and interact with it.

You can access the raw contact manifold:

```js
let manifold = contact.getManifold();
```

You can potentially modify the manifold, but this is generally not
supported and is for advanced usage.

There is a helper function to get the `WorldManifold`:

```js
contact.getWorldManifold(worldManifold);
```

This uses the current positions of the bodies to compute world positions
of the contact points.

Sensors do not create manifolds, so for them use:

```js
let touching = sensorContact.isTouching();
```

This function also works for non-sensors.

You can get the fixtures from a contact. From those you can get the
bodies.

```js
let fixtureA = myContact.getFixtureA();
let bodyA = fixtureA.getBody();
let actorA = bodyA.getUserData();
```

You can disable a contact. This only works inside the
`pre-solve` event, discussed below.

## Accessing Contacts
You can get access to contacts in several ways. You can access the
contacts directly on the world and body structures. You can also
implement a contact listener.

You can iterate over all contacts in the world:

```js
for (let c = myWorld.getContactList(); c; c = c.getNext()) {
  // process c
}
```

You can also iterate over all the contacts on a body. These are stored
in a graph using a contact edge structure.

```js
for (let ce = myBody.getContactList(); ce; ce = ce.next) {
  let c = ce.contact;
  // process c
}
```

You can also access contacts using the contact listener that is
described below.

> **Caution**:
> Accessing contacts off World and Body may miss some transient
> contacts that occur in the middle of the time step. Use
> ContactListener to get the most accurate results.

## Contact Events
You can receive contact data by adding event listeners to world. The
World supports several events: begin-contact, end-contact, pre-solve,
and post-solve.

```js
world.on('begin-contact', function(contact) {
  /* handle begin event */
});
world.on('end-contact', function(contact) {
  /* handle end event */
});
world.on('pre-solve', function(contact, oldManifold) {
  /* handle pre-solve event */
});
world.on('post-solve', function(contact, contactImpulse) {
  /* handle post-solve event */
});
```

> **Caution**:
> Do not keep a reference to the pointers sent to ContactListener.
> Instead make a deep copy of the contact point data into your own buffer.
> The example below shows one way of doing this.

At run-time you can create an instance of the listener and register it
with world.on(). You can remove listener using world.off() function.

### Begin Contact Event
This is called when two fixtures begin to overlap. This is called for
sensors and non-sensors. This event can only occur inside the time step.

### End Contact Event
This is called when two fixtures cease to overlap. This is called for
sensors and non-sensors. This may be called when a body is destroyed, so
this event can occur outside the time step.

### Pre-Solve Event
This is called after collision detection, but before collision
resolution. This gives you a chance to disable the contact based on the
current configuration. For example, you can implement a one-sided
platform using this callback and calling Contact.setEnabled(false).
The contact will be re-enabled each time through collision processing,
so you will need to disable the contact every time-step. The pre-solve
event may be fired multiple times per time-step per contact due to
continuous collision detection.

```ts
world.on('pre-solve', function(contact: Contact, oldManifold: Manifold) {
  WorldManifold worldManifold;
  contact.getWorldManifold(&worldManifold);
  if (worldManifold.normal.y < -0.5)
  {
    contact.setEnabled(false);
  }
});
```

The pre-solve event is also a good place to determine the point state
and the approach velocity of collisions.

```js
world.on('pre-solve', function(contact, oldManifold) {
  let worldManifold = contact.getWorldManifold();

  let state1 = []; // [PointState]
  let state2 = []; // [PointState]
  getPointStates(state1, state2, oldManifold, contact.getManifold());

  if (state2[0] === PointState.addState) {
    let bodyA = contact.getFixtureA().getBody();
    let bodyB = contact.getFixtureB().getBody();
    let point = worldManifold.points[0];
    let vA = bodyA.getLinearVelocityFromWorldPoint(point);
    let vB = bodyB.getLinearVelocityFromWorldPoint(point);

    let approachVelocity = Vec2.dot(vB -- vA, worldManifold.normal); //[todo]

    if (approachVelocity > 1) {
      myPlayCollisionSound();
    }
  }
});
```

### Post-Solve Event
The post solve event is where you can gather collision impulse results.
If you don't care about the impulses, you should probably just implement
the pre-solve event.

It is tempting to implement game logic that alters the physics world
inside a contact callback. For example, you may have a collision that
applies damage and try to destroy the associated actor and its rigid
body. However, Planck.js does not allow you to alter the physics world
inside a callback because you might destroy objects that Planck.js is
currently processing, leading to orphaned pointers.

The recommended practice for processing contact points is to buffer all
contact data that you care about and process it after the time step. You
should always process the contact points immediately after the time
step; otherwise some other client code might alter the physics world,
invalidating the contact buffer. When you process the contact buffer you
can alter the physics world, but you still need to be careful that you
don't orphan pointers stored in the contact point buffer. The testbed
has example contact point processing that is safe from orphaned
pointers.

This code from the CollisionProcessing test shows how to handle orphaned
bodies when processing the contact buffer. Here is an excerpt. Be sure
to read the comments in the listing. This code assumes that all contact
points have been buffered in the ContactPoint array m_points.

```js
// We are going to destroy some bodies according to contact
// points. We must buffer the bodies that should be destroyed
// because they may belong to multiple contact points.
let nuke = [];

// Traverse the contact results. Destroy bodies that
// are touching heavier bodies.
for (let i = 0; i < points.length && nuke.length < MAX_NUKE; ++i) {
  let point = points[i];

  let body1 = point.fixtureA.getBody();
  let body2 = point.fixtureB.getBody();
  let mass1 = body1.getMass();
  let mass2 = body2.getMass();

  if (mass1 > 0.0 && mass2 > 0.0) {
    if (mass2 > mass1) {
      nuke.push(body1);
    } else {
      nuke.push(body2);
    }
  }
}

for (let i = 0; i < nuke.length; i++) {
  let b = nuke[i];
  world.destroyBody(b);
}
```

## Contact Filtering
Often in a game you don't want all objects to collide. For example, you
may want to create a door that only certain characters can pass through.
This is called contact filtering, because some interactions are filtered
out.

Planck.js allows you to achieve custom contact filtering by implementing a
ContactFilter class. This class requires you to implement a
ShouldCollide function that receives two Shape pointers. Your function
returns true if the shapes should collide.

The default implementation of ShouldCollide uses the filter-data
defined in fixtures.

```js
Fixture.prototype.shouldCollide = function(that) {

  if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
    return that.m_filterGroupIndex > 0;
  }

  var collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
  var collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
  var collide = collideA && collideB;
  return collide;
}
```

You can override it with your contact filter.

```js
Fixture.prototype.shouldCollide = function(that) {
  // should this and that collide? 
}
```
