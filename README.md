*This project is under active development and is not stable yet.*  

# Planck.js<sup>&alpha;</sup>

Planck.js is JavaScript rewrite of Box2D physics engine for cross-platform HTML5 game development.

**[Check out demos!](http://piqnt.com/planck.js/)**

[![Car](./doc/img/screenshot.png "Play")](http://piqnt.com/planck.js/Car)

Key motivations in development of this project are:
- Taking advantage of Box2D's efforts and achievements
- Developing readable and maintainable JavaScript code
- Optimizing the library for web and mobile platforms
- Providing a JavaScript-friendly API

## Try it

To try Planck.js, simply add `planck-with-testbed.js` script to your HTML code and call `planck.testbed(callback)` with your code in callback. For example:

```html
<script src="https://cdn.jsdelivr.net/planck/0.1/planck-with-testbed.js"></script>
<script>
  planck.testbed(function(testbed) {
    var world = planck.World();
    
    // rest of your code
    
    return world; // make sure you return the world
  });
</script>

```

Check out [Car example on CodePen](https://codepen.io/ashakiba/pen/yMpvrX?editors=001) to see it in practice.
Also see [`example`](./example/) directory for more testbed usage examples.


## Install

#### Download

Latest builds are available on [releases page](https://github.com/shakiba/planck.js/releases).

#### CDN

Planck.js is [available on jsDelivr](https://www.jsdelivr.com/projects/planck).


#### NPM

    npm install planck-js --save

#### Bower

    bower install planck-js --save


## Usage

Planck.js does not use any renderer by default, to integrate it with a rendering library all you need to do 
is calling `world.step(hz)` in each frame and then iterating over world entities to draw or update them.
You may also want to listen to world events to remove objects which are removed from the world. For example:

```html
<script src="./path/to/planck.min.js"></script>
<script>
  var world = planck.World();

  window.requestAnimationFrame(function() {
    world.step(1 / 60);
    for (var body = world.getBodyList(); body; body = body.getNext()) {
      for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        // draw or update fixture
      }
    }
  });

  world.on('remove-fixture', function(fixture) {
    // remove fixture from ui
  });

</script>
```

## API

Planck.js public API closely follows Box2D API (see [Resources](#Resources)), with following differences:

- `b2` prefix is dropped from class names, for example `b2World` is now available as `planck.World`.
- Method names are converted from UpperCamelCase to lowerCamelCase.
- Definition classes/objects (BodyDef, FixtureDef, etc.) are replaced by inline JavaScript objects (`{}`).
- Shapes are made immutable and are not cloned when used to create fixtures.
- `World#on(eventName, listenerFn)` and `World#off(eventName, listenerFn)` are added to add and remove event listeners. Currently supported events are:
    - `'contact-begin'`
    - `'contact-end'`
    - `'pre-solve'`
    - `'post-solve'`
    - `'joint-removed'`
    - `'fixture-removed'`
    - `'body-removed'`


## Resources

- <a href="http://box2d.org/documentation/" target="_blank">Box2D Manual</a> and <a href="https://github.com/erincatto/Box2D/wiki/FAQ" target="_blank">FAQ</a> are highly recommended to get started.
- [iforce2d](https://www.iforce2d.net/b2dtut/) website includes a collection of helpful tutorials and resources to learn Box2D.

Following technical documents are recommend if you are interested in Box2D/Planck.js's internal details.

- [Continuous Collision](http://twvideo01.ubm-us.net/o1/vault/gdc2013/slides/824737Catto_Erin_PhysicsForGame.pdf) by Erin Catto
- [Solving Rigid Body Contacts](http://www.richardtonge.com/presentations/Tonge-2012-GDC-solvingRigidBodyContacts.pdf) by Richard Tonge


*If you you know any other useful resource, please add it or submit an issue about it.*

## Testbed

Another way to use testbed and try included examples (in [`example`](./example/) directory) is running testbed with live build locally:

1. Install `git`, `npm` and `bower`

1. Clone or download this repository

1. Install npm and bower dependencies:

        npm install
        bower install

1. Run testbed and open it in your web browser (see command-line output for URL to open):

        npm run testbed


## Architecture

Planck.js includes Box2D algorithms without modification and its internal architecture and public API are very similar to Box2D.
However some [changes](./CHANGES.md) and refactoring are made during rewrite to address differences between C++ and JavaScript.


## Credits

[Box2D](http://box2d.org/) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries such as Apple's SpriteKit.

[Planck.js](https://github.com/shakiba/planck.js) is developed and maintained by Ali Shakiba.

## License

Planck.js is [available under the zlib license](./LICENSE.txt).