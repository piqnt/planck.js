# Planck.js

Planck.js is JavaScript rewrite of Box2D physics engine for cross-platform HTML5 game development.

#### Motivations

- Taking advantage of Box2D's efforts and achievements
- Developing readable and maintainable JavaScript code
- Optimizing the library for web and mobile platforms
- Providing a JavaScript-friendly API


## Projects

#### Games
- [Astray 2](https://wwwtyro.github.io/astray-2/) ([source](https://github.com/wwwtyro/astray-2)) by Rye Terrell
- [I have to flap](https://ihavetoflap.web.app/) by Elias Ku
- [Hoverator](https://vgel.me/hoverator/) by Jonathon Vogel
- [Acolyte Fight](https://acolytefight.io/)
- [Nitro Clash](http://nitroclash.io/)
- [Space Rage 2](https://space-rage-2-bad-prospects-dev.netlify.app/) by Hendrik Mans
- Air Hockey ([source](https://github.com/Steveeeie/webgl-air-hockey-server)) by Steve Meredith
- [Coined](https://coined--parameterized.repl.co/) ([source](https://repl.it/talk/challenge/Coined/13314))
- [Zzzone!](https://www.engehausen.de/jan/zzz.html) ([source](https://github.com/smurf667/zzzone)) by Jan Engehausen

#### Game Development
- [Modd.io](https://www.modd.io/)

#### Other Projects
 - [Fall / Fill](https://twitter.com/jezzamonn/status/1246212104593403905) by Jez Swanson
 - [1000 Unique Postcards](https://twitter.com/andreasgysin/status/956131218386509824) by Andreas Gysin
 - [Flag in the Wind](https://codepen.io/unframework/pen/OrOMBg) by Nick Matantsev
 - [Handle](https://twitter.com/marurur/status/1240141036606947329) by Ichiro Maruta
 - [Q-Learning Ragdoll](https://codepen.io/mikkokam/pen/EGEjYe) by Mikko Kämäräinen
 - [Dynamic Convex Hull](https://codepen.io/bozheng-stokes/pen/abormNX) by Bo Zheng
 - [Chaotic Water Wheel](https://john-hearn.info/articles/simulate-chaotic-water-wheel-with-planck) by John Hearn
 - [Walking EA](https://matsemann.github.io/walkingea/) by Mats Krüger Svensson
 - [Neuroevolution Bots](https://twitter.com/mishig25/status/1077672181503590400) by Mishig Davaadorj

#### Articles and Tutorials
 - [Phaser 3 with Planck.js](https://www.emanueleferonato.com/2019/10/12/use-box2d-physics-in-your-phaser-3-projects-with-planck-js-javascript-physics-engine/) by Emanuele Feronato

#### Integration
 - [notchris/phaser3-planck](https://github.com/notchris/phaser3-planck) Phaser 3 Planck.js Plugin by Chris McGrane
 - [RealPeha/planck-renderer](https://github.com/RealPeha/planck-renderer)

#### Testbed Examples
[See here](http://piqnt.com/planck.js/) for testbed examples.


## Community

Updates and news: [Twitter @Piqnt](https://twitter.com/piqnt)  
Source code and issues: [GitHub](https://github.com/shakiba/planck.js/)  
Community discussions: [Discord](https://discord.gg/znjh6J7)


## Try it

To try Planck.js, simply add `planck-with-testbed.js` script to your HTML code and call `planck.testbed(callback)` with your code in callback. For example:

```html
<html><body>
  <script src="//cdn.jsdelivr.net/npm/planck-js@latest/dist/planck-with-testbed.js"></script>
  <script>
    planck.testbed(function(testbed) {
      var world = planck.World();
      // rest of your code
      return world; // make sure you return the world
    });
  </script>
</body></html>
```

Check out [Car example on JS Bin](http://jsbin.com/nujuxik/edit?html,output) to try it in practice.
Also see [`example`](./example/) directory for more testbed usage examples.


## Install


#### CDN

Planck.js is [available on jsDelivr](https://www.jsdelivr.com/package/npm/planck-js).


#### NPM

    npm install planck-js --save


## API and Architecture

Planck.js includes Box2D algorithms without modification and its architecture is very similar to Box2D.
However some internal changes and refactoring are made during rewrite to address differences between C++ and JavaScript.

Planck.js public API (see [API Doc](./docs)) closely follows Box2D API (see [Resources](##resources-and-references)), with the following differences:

- `b2` prefix is dropped from class names, for example `b2World` is now available as `planck.World`.
- Method names are converted from UpperCamelCase to lowerCamelCase.
- Definition classes/objects (BodyDef, FixtureDef, etc.) are replaced by inline JavaScript objects (`{}`).
- Shapes are considered immutable and are not cloned when used to create fixtures.
- Listener classes are replaced with simple functions.
- `World#on(eventName, listenerFn)` and `World#off(eventName, listenerFn)` are added to add and remove event listeners. Currently supported events are:
    - `'begin-contact'`
    - `'end-contact'`
    - `'pre-solve'`
    - `'post-solve'`
    - `'remove-joint'`
    - `'remove-fixture'`
    - `'remove-body'`

## Resources and References
- [Plankc.js API Doc](./docs)
- <a href="http://box2d.org/documentation/" target="_blank">Box2D Manual</a> and <a href="https://github.com/erincatto/box2d/blob/master/docs/FAQ.md" target="_blank">FAQ</a> are highly recommended to learn how the library works.
- [iforce2d](https://www.iforce2d.net/b2dtut/) website includes a collection of helpful tutorials and resources to learn Box2D.

Following resources are recommended if you are interested in learning about Box2D/Planck.js's internal details.

- [Continuous Collision](http://twvideo01.ubm-us.net/o1/vault/gdc2013/slides/824737Catto_Erin_PhysicsForGame.pdf) by Erin Catto (slides)
- [Solving Rigid Body Contacts](http://www.richardtonge.com/presentations/Tonge-2012-GDC-solvingRigidBodyContacts.pdf) by Richard Tonge (slides)
- [dyn4j Blog Posts](http://www.dyn4j.org/category/gamedev/) by William Bittle


## Rendering and Integration

Planck.js core library does not include any graphics by default, which means you have several options:

- Use Testbed, see [Try it](#try-it) section to run release files in a web browser (or [Development](#development) to debug testbed locally).
- Use an existing renderer, see [Integration](#integration) examples.
- Develop a renderer or integrate with a rendering library.

To create a renderer or integrate with a rendering library all you need to do 
is call `world.step(timeStep)` in each frame, and then iterate over world entities to draw or update them.
You may also want to listen to world events to remove objects which are removed from the world. For example:

```html
<script src="./path/to/planck.min.js"></script>
<script>
  var world = planck.World();

  // rendering loop
  (function loop() {
    // in each frame call world.step(timeStep) with fixed timeStep
    world.step(1 / 60);
    // iterate over bodies and fixtures
    for (var body = world.getBodyList(); body; body = body.getNext()) {
      for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        // draw or update fixture
      }
    }
    // request a new frame
    window.requestAnimationFrame(loop);
  })();

  world.on('remove-fixture', function(fixture) {
    // remove fixture from ui
  });
</script>
```

## Development

For development, you can run testbed locally with a live build and try examples in [`example`](./example/) directory.

1. Install `git` and `npm`

1. Clone or download this repository

1. Install npm dependencies:

        npm install

1. Run testbed and open it in your web browser (see command-line output for URL to open):

        npm run testbed


## Credits

[Box2D](https://github.com/erincatto/box2d) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries such as Apple's SpriteKit.

[Planck.js](https://github.com/shakiba/planck.js) is developed and maintained by [Ali Shakiba](https://github.com/shakiba/).

TypeScript definitions for planck.js are developed by [Oliver Zell](https://github.com/zOadT).


## License

Planck.js is [available under the zlib license](./LICENSE.txt).
