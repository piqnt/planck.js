# Planck.js

Planck.js is JavaScript rewrite of Box2D physics engine for cross-platform HTML5 game development.

#### Motivations

- Taking advantage of Box2D's efforts and achievements
- Developing readable and maintainable JavaScript code
- Optimizing the library for web and mobile platforms
- Providing a JavaScript-friendly API


## Documentation

- [Documentation Wiki](https://github.com/shakiba/planck.js/wiki/) - This is the best place to start, and find other resources
- [Examples](https://piqnt.com/planck.js/) - Online examples with editable code


## Community

- [Discord](https://discord.gg/znjh6J7) - Community discussions and Q/A
- [Twitter @Piqnt](https://twitter.com/piqnt) - Updates and news
- [GitHub](https://github.com/shakiba/planck.js/) - Source code and issues


## API and Architecture

Planck.js includes Box2D algorithms without modification and its architecture is very similar to Box2D.
However some internal changes and refactoring are made during rewrite to address differences between C++ and JavaScript.

Planck.js public API closely follows Box2D API, with the following differences:

- `b2` prefix is dropped from class names, for example `b2World` is now available as `planck.World`.
- Method names are converted from UpperCamelCase to lowerCamelCase.
- Definition classes/objects (BodyDef, FixtureDef, etc.) are replaced by inline JavaScript objects (`{}`).
- Shapes are considered immutable and are not cloned when used to create fixtures.
- Contact filtering can be customized by overriding shouldCollide method of Fixture.
- Listener classes are replaced with simple functions.
- `World#on(eventName, listenerFn)` and `World#off(eventName, listenerFn)` are added to add and remove event listeners. Currently supported events are:
`'begin-contact'`, `'end-contact'`, `'pre-solve'`, `'post-solve'`, `'remove-joint'`, `'remove-fixture'`, `'remove-body'`


## Install

### v0.3 (stable release)

Package name for v0.3 is `planck-js`.

##### CDN

The library is available on [jsDelivr](https://www.jsdelivr.com/package/npm/planck-js).

##### NPM

Install NPM package.
```sh
npm install planck-js --save
```

Use core library.
```js
const planck = require('planck-js');
```

##### Testbed

Use CDN in a web page.
```html
<html><body>
  <script src="//cdn.jsdelivr.net/npm/planck-js@latest/dist/planck-with-testbed.min.js"></script>
  <script>
    planck.testbed(function(testbed) {
      // Your testbed code
    });
  </script>
</body></html>
```

Use NPM package in Node.
```js
const planck = require('planck-js/dist/planck-with-testbed');

planck.testbed(function() {
  // ...
});
```

### v1.0 (alpha)

Staring from v1.0 package name is changed to `planck`.
To install v1.0 see [master branch](https://github.com/shakiba/planck.js/#install).

## Credits

[Box2D](https://github.com/erincatto/box2d) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries such as Apple's SpriteKit.

[Planck.js](https://github.com/shakiba/planck.js) is developed and maintained by [Ali Shakiba](https://github.com/shakiba/).

TypeScript definitions for planck.js are developed by [Oliver Zell](https://github.com/zOadT).


## License

Planck.js is [available under the MIT license](./LICENSE.txt).
