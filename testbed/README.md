# Testbed

Testbed runs and renders Planck.js examples. Testbed is helpful to get started with the Planck.js, and develop and debug physics code.

Please note that you don't need testbed to use Planck.js library in your application. You can run simulation and render world yourself, or integrate Planck.js with a rendering library (see [Rendering](./Rendering) for more details).

## Usage

There are few different way to run testbed.

#### Space

[Space](https://piqnt.com/space/) is an online playground for Planck.js, it is the easiest way to run testbed scripts. You can quickly edit, run and share your physics code in the Space! [Planck.js examples](https://piqnt.com/planck.js/) are hosted on Space.

#### CDN

`planck-testbed` package is available on [jsDelivr](https://www.jsdelivr.com/package/npm/planck-testbed) and [cdnjs](https://cdnjs.com/libraries/planck-testbed). 
You can simply add `planck-testbed.js` script to your page and use it.

```html
<html><body>
  <script src="//cdn.jsdelivr.net/npm/planck-testbed@latest/dist/planck-testbed.js"></script>
  <script>
    planck.testbed(function(testbed) {
      // Your testbed code
    });
  </script>
</body></html>
```

#### NPM

Install npm package.
```sh
npm install planck-testbed
```

Import it in your code.
```js
import * as planck from 'planck-testbed';

planck.testbed(function() {
  // Your testbed code
});
```

#### Development

You normally don't need to do this, however you can run examples and testbed locally with a live build. This is helpful if you would like to work on the library.

1. Install `git` and `npm`, and clone (or download) this repository

1. Install npm dependencies:

        npm install

1. Run testbed and open it in your web browser (see command-line output for URL to open):

        npm run testbed


## API

First you need to call planck.testbed and pass your code in a callback function.
This will setup everything and will call your function asynchronously.
Your function is called with a testbed instance, you can use it to setup testbed. 

```js
planck.testbed(function(testbed) {
  // Your code
});
```

Next you need to create a world and return it.

```js
planck.testbed(function(testbed) {
  // Create a world
  var world = planck.World();

  // Make sure you return the world
  return world;
});
```

#### Camera viewbox

To set up camera, you need to set center and dimensions of viewbox.
Testbed will calculate and set rendering scale and offset according to those number. 

```js
planck.testbed(function(testbed) {

  // Viewbox center and size
  testbed.x = 0;
  testbed.y = 0;

  // Viewbox size
  testbed.width = 30;
  testbed.height = 20;
});
```

#### Print information

Testbed has two methods to print information on screen, `info` and `status`.

```js
planck.testbed(function(testbed) {

  // Use info() to print some text on screen
  testbed.info('Use arrow keys to move player');

  testbed.step = function() {
    // Use status() to print key-values
    // Testbed will retain value of keys until they are changed
    testbed.status('score', score);
    testbed.status('time', time);
  };
});
```

#### Game-loop callback

You can add a game loop callback to testbed, it will be called in each frame.

```js
planck.testbed(function(testbed) {
  testbed.step = function() {
    // code to run in each game loop
  };
});
```

#### Space visual-editor

When you use Space, you can draw the world using the visual-editor and use it in your testbed code. In addition, in the visual-editor you can assign id to objects (bodies, fixtures, and joints) and then in your code query for them using `findOne` method. If an object is not found `findOne` will return null, so make sure your code handles null properly.

```js
planck.testbed(function(testbed) {
  var world = testbed.world;
  world.setGravity(planck.Vec2(0, -8.9));

  var car = testbed.findOne('body#car');
  if (car === null) {
    testbed.info('Car not found, call 911!');
    return;
  }
  car.setLinearVelocity(planck.Vec2(15.0, -5.0));
});
```
