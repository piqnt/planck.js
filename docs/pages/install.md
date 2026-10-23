
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

#### Script tag

Planck.js is available on [jsDelivr](https://www.jsdelivr.com/package/npm/planck), [cdnjs](https://cdnjs.com/libraries/planck), and [unpkg](https://unpkg.com/planck/).

```html
  <script src="https://cdn.jsdelivr.net/npm/planck/dist/planck.min.js"></script>
  <script>
    const { World } = planck;
    const world = new World();
  </script>
```

The testbed is in the same package, and the examples run in it. See [Testbed](./testbed) to try
them, or to watch your own code run.
