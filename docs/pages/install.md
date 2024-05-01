---
showOutline: false
---

## Get Started

### Running Your Code

Planck.js is a physics simulation library, and it doesn't draw anything.

[Piqnt](https://piqnt.com/) is an online playground for Planck.js. You can explore [examples](https://piqnt.com/planck.js/), inspect and edit them, or create new ones.

[Testbed](./testbed) is a simple tool (included in the project repository) to visualize and interact with physics simulation. Testbed is compatible with Piqnt playground.

You can use Planck.js with any game engines or frameworks, or use an existing integrations. See [Simulation](./world/simulation) and [Rendering](./rendering) page for more information.

### Install

#### NPM

```sh
npm install planck
```

Import the library in your code:

```js
import { World } from 'planck';

const world = new World();
```

Import the library with testbed:

```js
import { World, Testbed } from 'planck/with-testbed';

const world = new World();

const testbed = Testbed.mount();
testbed.start(world);
```


#### Script tag

Planck.js is available on [jsDelivr](https://www.jsdelivr.com/package/npm/planck), [cdnjs](https://cdnjs.com/libraries/planck), and [unpkg](https://unpkg.com/planck/).

```html
  <script src="https://cdn.jsdelivr.net/npm/planck/dist/planck.min.js"></script>
  <script>
    const { World } = planck;
    const world = new World();
  </script>
```

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
