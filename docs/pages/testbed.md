
## Testbed

Testbed is a debugging tool that is provided with the library. It is useful to get started with Planck.js, and develop and debug physics code, and run examples.

Testbed is not required to use Planck.js physics. You can run simulation and render physics world directly, with any rendering library or framework (see [Simulation](./world/simulation) and [Rendering](./rendering) sections for more details).

There are multiple way to use testbed:
- Use Piqnt online playground
- Install from NPM, or from CDN
- Run locally from source

### Piqnt onlin playground

[Piqnt](https://piqnt.com/) is an online playground to run testbed code. It is useful to quickly try out physics examples, and share them with others.

### Install from NPM

To install testbed from NPM, run `npm install planck`. Then import testbed in your code.

```bash
npm install planck
```

```js
import { World, Testbed } from 'planck/with-testbed';
```

### Script tag and CDN

To use testbed from CDN, add the following script tag to your HTML file.

```html
<html><body>
  <span id="testbed-info"></span>
  <span id="testbed-status"></span>
  <button id="testbed-play">Play</button>

  <script src="https://cdn.jsdelivr.net/npm/planck/dist/planck-with-testbed.min.js"></script>
  <script>
    const { World, Testbed } = planck;
    const world = new World();

    const testbed = Testbed.mount();
    testbed.start(world);
  </script>
</body></html>
```

### Run locally from source

Running testbed locally is useful if you want to debug or edit the library or testbed code, or if you want to run testbed examples locally.

To run testbed from source, clone the repository and run `npm install` and `npm run dev` in the root directory. This will start a local server and open testbed in your browser.

```bash
git clone
cd planck.js
npm install
npm run dev
```


## Testbed Usage and API

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
