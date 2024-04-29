### Testbed Install

There are multiple way to use testbed:
- Use Piqnt playground
- Install from NPM, or from CDN
- Run locally from source

#### Use Piqnt playground
[Piqnt](https://piqnt.com/) is an online playground to run testbed code. It is useful to quickly try out physics examples, and share them with others.

#### NPM
To install testbed from NPM, run `npm install planck`. Then import testbed in your code.

```bash
npm install planck
```

```js
import { World, Testbed } from 'planck/with-testbed';
```

#### Script tag
To use testbed from CDN, add the following script tag to your HTML file.

```html
<html><body>
  <script src="https://cdn.jsdelivr.net/npm/planck/dist/planck-with-testbed.min.js" />
  <script>
    const { World, Testbed } = planck;
  </script>
</body></html>
```

#### Run locally from source
Running testbed locally is useful if you want to debug or edit the library or testbed code, or if you want to run testbed examples locally.

To run testbed from source, clone the repository and run `npm install` and `npm run dev` in the root directory. This will start a local server and open testbed in your browser.

```bash
git clone
cd planck.js
npm install
npm run dev
```
