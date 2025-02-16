
## Rendering

Planck.js is a physics engine and it can be used with any graphics library or ui framework for rendering.

For development and debugging you can use the [Testbed](./testbed) that is provided with the library. For production you can use an existing integration or create a new one.

To run simulation and renderer physics objects you need to do the following:
- Advance physics simulation by calling `world.step(timeStep)` in each frame
- Iterate over world entities to draw or update them
- Optionally listen to world events for objects which are removed from simulation and remove them from rendering

```js
class Renderer {
  world = null;
  started = false;

  start(world) {
    this.world = world;

    // Add listeners
    world.on('remove-body', this.removeBody);
    world.on('remove-joint', this.removeJoint);
    world.on('remove-fixture', this.removeFixture);

    // Start frame loop
    this.started = true;
    this.loop(0);
  }

  stop() {
    // Remove listeners
    world.off('remove-body', this.removeBody);
    world.off('remove-joint', this.removeJoint);
    world.off('remove-fixture', this.removeFixture);

    // Stop next frame
    this.started = false;
  }

  // Game loop
  loop = (timeStamp) => {
    if (!this.started) {
      return;
    }

    // In each frame call world.step with fixed timeStep
    // This is a simplified implementation, in a more advanced implementation
    // you need to use elapsed time since last frame and call step more than once if needed.
    // When called by requestAnimationFrame() you'll get a timestamp as argument,
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.world.step(1 / 60);

    // Iterate over bodies
    for (let body = this.world.getBodyList(); body; body = body.getNext()) {
      this.renderBody(body);
      // ... and fixtures
      for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        this.renderFixture(fixture);
      }
    }

    // Iterate over joints
    for (let joint = this.world.getJointList(); joint; joint = joint.getNext()) {
      this.renderJoint(joint);
    }

    // Request a new frame
    window.requestAnimationFrame(this.loop);
  }

  renderBody(body) {
    // Render or update body rendering
  }

  renderFixture(fixture) {
    // Render or update fixture rendering
  }

  renderJoint(joint) {
    // Render or update joint rendering
  }

  removeBody(body) {
    // Remove body rendering
  }

  removeFixture(fixture) {
    // Remove fixture rendering
  }

  removeJoint(joint) {
    // Remove joint from rendering
  }
}

const renderer = new Renderer();

renderer.start(world);

```

### Pixels and Coordinate Systems

Planck.js uses MKS (meters, kilograms, and seconds) units and
radians for angles, however rendering is done in pixels.
So you need to transformation world geometry into screen and vice versa.

You should consider using MKS units in your game code and find a scale to convert
to pixels when you render. This will simplify your game logic and reduce
the chance for errors since the rendering conversion can be isolated to
a small amount of code.

If you use a conversion factor, you should try tweaking it globally to
make sure nothing breaks. You can also try adjusting it to improve
stability.

### Existing Integration Projects

 - [notchris/phaser3-planck](https://github.com/notchris/phaser3-planck) Phaser 3 Planck.js Plugin by Chris McGrane
 - [Phaser 3 with Planck.js](https://www.emanueleferonato.com/2019/10/12/use-box2d-physics-in-your-phaser-3-projects-with-planck-js-javascript-physics-engine/) by Emanuele Feronato
- [P5.js integration](https://sites.google.com/site/professorcookga/planck-box2d-physics-for-javascript-p5) by Robert Cook
- [RealPeha/planck-renderer](https://github.com/RealPeha/planck-renderer)
