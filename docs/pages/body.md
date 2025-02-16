
## Body
Bodies have position, angle, and velocity. You can apply forces, torques, and
impulses to bodies. Bodies can be `static`, `kinematic`, or `dynamic`. Here
are the body type definitions:

- `static` -
A static body does not move under simulation and behaves as if it has
infinite mass. Internally, Planck.js stores zero for the mass and the
inverse mass. Static bodies can be moved manually by the user. A static
body always has zero velocity. Static bodies do not collide with other static
or kinematic bodies.

- `kinematic` -
A kinematic body is like a static body, but can have velocity.
You can set kinematic body velocity or move it manually.
However, their velocity is not changed in collision or when you apply force.
Kinematic bodies do not collide with other kinematic or static bodies.
When a kinematic body collides with a dynamic body it behaves as if it has infinite mass.

- `dynamic` -
A dynamic body is fully simulated. They can be moved manually by the
user, but normally they move according to forces. A dynamic body can
collide with all body types. A dynamic body always has finite, non-zero
mass. If you try to set the mass of a dynamic body to zero, it will
automatically acquire a mass of one kilogram and it won't rotate.

Bodies are the backbone for fixtures (shapes). Bodies carry fixtures and
move them around in the world. Bodies are always rigid bodies in Planck.js.
That means that two fixtures attached to the same rigid body never move
relative to each other and fixtures attached to the same body don't
collide.

Fixtures have collision geometry and density. Normally, bodies acquire
their mass properties from the fixtures. However, you can override the
mass properties after a body is constructed.

You usually keep references to all the bodies you create. This way you can
query the body positions to update the positions of your graphical
entities. You should also keep body references so you can destroy them
when you are done with them.

## Body Factory
Bodies are created and destroyed using a body factory provided by the
`World` class. This lets the world create the body and add the body to the 
world data structure.

```js
let dynamicBody = myWorld.createBody(bodyDef);

// ... do stuff ...

myWorld.destroyBody(dynamicBody);
```

> **Caution**:
> You should never create a body directly using new. The world won't
> know about the body and the body won't be properly initialized.

Planck.js does not keep a reference to the body definition or any of the
data it holds (except user data references). So you can create temporary
body definitions and reuse the same body definitions.

When you destroy a body, the attached fixtures and joints are
automatically destroyed. This has important implications for how you
manage shape and joint references.

## Body Definition

Let's go over some of the key members of the body definition.

### Body Type
As discussed at the beginning of this chapter, there are three different
body types: static, kinematic, and dynamic. You should specify the
body type at creation because changing the body type later is expensive.

```js
world.createBody({
  type: 'dynamic'
});
```

Default body type is static, static bodies don't move in simulations.

### Position and Angle
The body definition gives you the chance to initialize the position of
the body on creation. This has far better performance than creating the
body at the world origin and then moving the body.

> **Caution**:
> Do not create a body at the origin and then move it. If you create
> several bodies at the origin, then performance will suffer.

A body has two main points of interest. The first point is the body's
origin. Fixtures and joints are attached relative to the body's origin.
The second point of interest is the center of mass. The center of mass
is determined from mass distribution of the attached shapes or is
explicitly set with `MassData`. Much of Planck.js's internal computations
use the center of mass position. For example `Body` stores the linear
velocity for the center of mass.

When you are building the body definition, you may not know where the
center of mass is located. Therefore you specify the position of the
body's origin. You may also specify the body's angle in radians, which
is not affected by the position of the center of mass. If you later
change the mass properties of the body, then the center of mass may move
on the body, but the origin position does not change and the attached
shapes and joints do not move.

```js
world.createBody({
  position: {x: 0, y: 2}, // the body's origin position.
  angle: 0.25 * Math.PI // the body's angle in radians.
})
```

A rigid body is also a frame of reference. You can define fixtures and
joints in that frame. Those fixtures and joint anchors never move in the
local frame of the body.

### Damping
Damping is used to reduce the world velocity of bodies. Damping is
different than friction because friction only occurs with contact.
Damping is not a replacement for friction and the two effects should be
used together.

Damping parameters should be between 0 and infinity, with 0 meaning no
damping, and infinity meaning full damping. Normally you will use a
damping value between 0 and 0.1. I generally do not use linear damping
because it makes bodies look like they are floating.

```js
world.createBody({
  linearDamping: 0,
  angularDamping: 0.01
});
```

Damping is approximated for stability and performance. At small damping
values the damping effect is mostly independent of the time step. At
larger damping values, the damping effect will vary with the time step.
This is not an issue if you use a fixed time step (recommended).

### Gravity Scale
You can use the gravity scale to adjust the gravity on a single body. Be
careful though, increased gravity can decrease stability.

```js
// Set the gravity scale to zero so this body will float
world.createBody({
  gravityScale: 0
});
```

### Sleep Parameters
It is expensive to simulate bodies, so the less we have to simulate the better.
When a body comes to rest we would like to stop simulating it.

When Planck.js determines that a body (or group of bodies) has come to rest,
the body enters a sleep state which has very little CPU overhead. If a
body is awake and collides with a sleeping body, then the sleeping body
wakes up. Bodies will also wake up if a joint or contact attached to
them is destroyed. You can also wake a body manually.

The body definition lets you specify whether a body can sleep and
whether a body is created sleeping.

```js
world.createBody({
  allowSleep: true,
  awake: true,
});
```

### Fixed Rotation
You may want a body, such as a character, to have a fixed
rotation. Such a body should not rotate, even under load. You can use
the fixed rotation setting to achieve this:

```js
world.createBody({
  fixedRotation: true
});
```

The fixed rotation flag causes the rotational inertia and its inverse to
be set to zero.

### Bullets
Game simulation usually generates a sequence of images that are played
at some frame rate. This is called discrete simulation. In discrete
simulation, rigid bodies can move by a large amount in one time step. If
a physics engine doesn't account for the large motion, you may see some
objects incorrectly pass through each other. This effect is called
tunneling.

By default, Planck.js uses continuous collision detection (CCD) to prevent
dynamic bodies from tunneling through static bodies. This is done by
sweeping shapes from their old position to their new positions. The
engine looks for new collisions during the sweep and computes the time
of impact (TOI) for these collisions. Bodies are moved to their first
TOI and then the solver performs a sub-step to complete the full time
step. There may be additional TOI events within a sub-step.

Normally CCD is not used between dynamic bodies. This is done to keep
performance reasonable. In some game scenarios you need dynamic bodies
to use CCD. For example, you may want to shoot a high speed bullet at a
stack of dynamic bricks. Without CCD, the bullet might tunnel through
the bricks.

Fast moving objects in Planck.js can be labeled as bullets. Bullets will
perform CCD with both static and dynamic bodies. You should decide what
bodies should be bullets based on your game design. If you decide a body
should be treated as a bullet, use the following setting.

```js
world.createBody({
  bullet: true,
});
```

The bullet flag only affects dynamic bodies.

### Activation
You may wish a body to be created but not participate in collision or
dynamics. This state is similar to sleeping except the body will not be
woken by other bodies and the body's fixtures will not be placed in the
broad-phase. This means the body will not participate in collisions, ray
casts, etc.

You can create a body in an inactive state and later re-activate it.

```js
world.createBody({
  active: false,
});
```

Joints may be connected to inactive bodies. These joints will not be
simulated. You should be careful when you activate a body that its
joints are not distorted.

Note that activating a body is almost as expensive as creating the body
from scratch. So you should not use activation for streaming worlds. Use
creation/destruction for streaming worlds to save memory.

### User Data
User data is an untyped reference. This gives you a hook to link your
application objects to bodies.

```js
world.createBody({
  userData: myActor,
});
```

## Using a Body
After creating a body, there are many operations you can perform on the
body. These include setting mass properties, accessing position and
velocity, applying forces, and transforming points and vectors.

### Mass Data
A body has mass (scalar), center of mass (2-vector), and rotational
inertia (scalar). For static bodies, the mass and rotational inertia are
set to zero. When a body has fixed rotation, its rotational inertia is
zero.

Normally the mass properties of a body are established automatically
when fixtures are added to the body. You can also adjust the mass of a
body at run-time. This is usually done when you have special game
scenarios that require altering the mass.

```js
body.setMassData(massData);
```

After setting a body's mass directly, you may wish to revert to the
natural mass dictated by the fixtures. You can do this with:

```js
body.resetMassData();
```

The body's mass data is available through the following functions:

```js
body.getMass(); // number
body.getInertia(); // number
body.getLocalCenter(); // Vec2
body.getMassData(massData);
```

### State Information
There are many aspects to the body's state. You can access this state
data efficiently through the following functions:

```js
body.setType(bodyType);
body.getType(); // string

body.setBullet(flag);
body.isBullet(); // boolean

body.setSleepingAllowed(flag);
body.isSleepingAllowed(); // boolean

body.setAwake(flag);
body.isAwake(); // boolean

body.setEnabled(flag);
body.isEnabled(); // boolean

body.setFixedRotation(flag);
body.isFixedRotation(); // boolean
```

### Position and Velocity
You can access the position and rotation of a body. This is common when
rendering your associated game actor. You can also set the position and rotation,
although this is less common since you will normally use Planck.js to
simulate movement.

```js
body.setTransform(position, angle);
body.getTransform(); // Transform

body.setPosition(position);
body.getPosition(); // Vec2

body.setAngle(angle);
body.getAngle(); // number
```

You can access the center of mass position in local and world
coordinates. Much of the internal simulation in Planck.js uses the center of
mass. However, you should normally not need to access it. Instead you
will usually work with the body transform. For example, you may have a
body that is square. The body origin might be a corner of the square,
while the center of mass is located at the center of the square.

```js
body.getWorldCenter(); // Vec2
body.getLocalCenter(); // Vec2
```

You can access the linear and angular velocity. The linear velocity is
for the center of mass. Therefore, the linear velocity may change if the
mass properties change.

### Forces and Impulses
You can apply forces, torques (rotational force), and impulses to a body.
When you apply a force or an impulse, you provide a world point where the load is applied.
This often results in a torque about the center of mass.

```js
body.applyForce(force, point); // force: Vec2, point: Vec2
body.applyTorque(torque);
body.applyLinearImpulse(impulse, point); // force: Vec2, point: Vec2
body.applyAngularImpulse(impulse);
```

Applying a force, torque, or impulse wakes the body. Sometimes this is
undesirable. For example, you may be applying a steady force and want to
allow the body to sleep to improve performance. In this case you can use
the following code.

```js
if (myBody.isAwake()) {
  myBody.applyForce(myForce, myPoint);
}
```

### Coordinate Transformations
The body class has some utility functions to help you transform points
and vectors between local and world space.

A `localPoint` is a coordinate relative to the body's origin.
A `worldPoint` is a coordinate relative to the world's origin.

A `localVector` is a vector between two points relative to the body's origin.
A `worldVector` is a vector between two points relative to the world's origin.

Here "point" means a point's 2D coordinate, "vector" means the vector between two points.
In point conversion both position and angle of body are considered, in vector conversion only angle.

```js
body.getWorldPoint(localPoint); // Vec2
body.getLocalPoint(worldPoint); // Vec2

body.getWorldVector(localVector); // Vec2
body.getLocalVector(worldVector); // Vec2
```

### Accessing Fixtures, Joints, and Contacts
You can iterate over a body's fixtures.

```js
for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
  // do something with fixture
}
```

You can similarly iterate over the body's joint list.

```js
for (var joint = this.getJointList(); joint; joint = joint.getNext()) {
  // do something with joint
}
```

The body also provides a list of associated contacts. You can use this
to get information about the current contacts. Be careful, because the
contact list may not contain all the contacts that existed during the
previous time step.
