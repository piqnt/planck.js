
## Hello World

In this section we will walk through a simple example to set up the physics world, and create a platform and a small box.

### Creating a World
Every Planck.js program begins with the creation of a World object.
World is the physics hub that manages objects, their physical interactions, and runs simulation.

To create a world we simply create an object from the `World` class, and optionally pass gravity.

```js
let world = new World({
  gravity: {x: 0, y: -10},
});
```

Now that we have our physics world set up, let's start adding some stuff to it.

### Creating a platform

We will create a platform using the following steps:

1. Use the world object to create the body with position.
1. Create a fixture on the body with a shape.

For step 1, we pass body properties to the world object to create the platform body.
With the body properties we specify the type and initial position of the platform:

```js
let platform = world.createBody({
  type: "static",
  position: {x: 0, y: -10},
  angle: Math.PI * 0.1
});
```

Bodies are "static" by default. Static bodies don't collide with other static bodies and are immovable.

For step 2, we need to create a `Shape` and add it to body as `Fixture`.

```js
platform.createFixture({
  shape: new Edge({x: -50, y: 0}, {x: +50, y: 0}),
});
```

Shapes only have geometrical properties (such as vertices or radius), and do not have physical properties.
A fixture is used to add a shape to a body, and adds physical properties (such as density, friction, etc.) to a body.
A body can have any number of shapes fixed together.

`Shape`'s geometrical coordinates are local to the body. A fixture does not have location and angle. So when a body moves, all fixtures/shapes in the body move with the body. However we don't move a shape around on the body.

Planck.js is a rigid body engine and many of the assumptions made in Planck.js are based on the rigid body model.
A body with morphing shapes is not a rigid body, and if this is violated many things will break.
So moving or modifying a shape that is on a body is not supported.

Every fixture must have a parent body, even fixtures that are static.
However, you can attach all static fixtures to a single static body.

A static body has zero mass by definition, so we don't need to specify density in this case.
Later we will see how to use a fixture's properties to customize its physical behavior.

### Creating a dynamic box
Creating a dynamic box is similar to the platform. The main difference, besides dimensions, is that for a dynamic body we need to specify mass properties.

First we create the body using `createBody`. By default bodies are static, so we should set the body's `type` at construction time to make the body dynamic.

```js
let body = world.createBody({
  type: "dynamic",
  position: {x: 0, y: 4}
});
```

> **Caution**:
> You must set the body `type` to `dynamic` if you want the body to move in response to forces.

Next we create and attach a box shape using a fixture definition.

```js
body.createFixture({
    shape: new Box(1.0, 1.0),
    density: 1.0,
    friction: 0.3,
});
```

Notice that we set density to 1. The default density is zero. Setting fixture's density automatically updates the mass of the body. Also, the friction on the shape is set to 0.3.

> **Caution**:
> A dynamic body should have at least one fixture with a non-zero density. Otherwise you will get strange behavior.

You can add as many fixtures as you like to a body. Each one contributes to the total mass.

Box dimensions are specified as the **half-width** and **half-height** (like a circler radius).
So in this case the ground box is 2 units wide (x-axis) and 2 units tall (y-axis).

### Units
Planck.js by default is tuned for meters, kilograms, and seconds. So you can consider the dimensions to be in meters.
Planck.js generally works best when objects are the size of typical real world objects. For example, a barrel is about 1 meter tall.
Due to the limitations of floating point arithmetic, using Planck.js to model the movement of glaciers or dust particles is not a good idea.
If you use a different units for your objects, you can change the value of `Settings.lengthUnitsPerMeter`.
For example if you use pixels and a barrel height is 80 pixels set the `lengthUnitsPerMeter` to 80.
