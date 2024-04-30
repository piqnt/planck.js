### Testbed API

To use testbed first create a world, then start simulation.

```js
// Create a world
const world = new World();

// Start simulation
const testbed = Testbed.start(world);
```

If you need to access the testbed instance before starting simulation you can mount the testbed first, and later start simulation.

```js
// Mount testbed
const testbed = Testbed.mount();

// Create a world
const world = new World();

// Start simulation
testbed.start(world);
```

#### Viewbox

You can adjust testbed viewbox, by setting the viewbox center and dimensions. Viewbox center and dimension are in defined in physical units. Testbed will calculate and set rendering scale and offset to match provided dimensions and center.

```js
// Viewbox center
testbed.x = 0;
testbed.y = 0;

// Viewbox size
testbed.width = 30;
testbed.height = 20;
```

#### Game-loop callback

You can add a game loop callback to testbed, it will be called in each frame.

```js
testbed.step = function() {
  // Code to run in each game loop
};
```

#### Display text information

Testbed has two methods to display information on screen, `info` and `status`.

```js
// Use info() to print some text on screen
testbed.info('Use arrow keys to move player');

testbed.step = function() {
  // Use status() to print key-values
  // Testbed will retain value of keys until they are changed
  testbed.status('score', score);
  testbed.status('time', time);
};
```
