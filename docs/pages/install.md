
## Install

Planck can be installed or downloaded from NPM or a CDN.

#### NPM

First install the package.
```sh
npm install planck
```

Then import the library in your code:

```js
import { World } from 'planck';

const world = new World();
```

You can alternatively import planck namespace to access all classes:

```js
import planck from 'planck';

const world = new planck.World();
```

To use testbed you need to import `planck/with-testbed` instead:

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

To use testbed you need to use `planck-with-testbed.min.js` instead:

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
