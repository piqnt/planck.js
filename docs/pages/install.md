### Install

#### NPM

```sh
npm install planck
```

```js
import { World } from 'planck';

const world = new World();
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

### Testbed

#### NPM 

```js
import { World, Testbed } from 'planck/with-testbed';

const world = new World();

const testbed = Testbed.mount();
testbed.start(world);
```

#### Script tag

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
