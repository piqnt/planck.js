# Planck.js

Planck.js is JavaScript (TypeScript) rewrite of Box2D physics engine for cross-platform HTML5 game development.

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


## Updates

#### v1.0-alpha

- Source code is migrated to TypeScript, to improves library usability, documentation and maintenance.

- Package name for v1.0+ is changed to `planck`. Package name for releases *before v1.0* is `planck-js`.

- `planck.internal` namespace is deprecated and everything is directly available under main namesapce (except `planck.internal.stats`).

- Source files are moved to `/src` directory (from `/lib`) and directory layout is updated to match Box2D.

- Rollup is used to build the project.


## Install

### v0.3 (stable release)
To install `planck-js@0.3` (stable release) see [v0.3 branch](https://github.com/shakiba/planck.js/tree/v0.3#install).

### v1.0 (alpha)
Staring from v1.0 package name is changed to `planck`.
Releases and updates before v1.0 will remain available under `planck-js`.

##### CDN

Planck.js is available on [jsDelivr](https://www.jsdelivr.com/package/npm/planck).

##### NPM

Install npm package.
```sh
npm install planck
```

Import it in your code.
```js
import * as planck from 'planck';
```

##### Testbed

Use CDN in a web page.
```html
<html><body>
  <script src="//cdn.jsdelivr.net/npm/planck@latest/dist/planck-with-testbed.min.js"></script>
  <script>
    planck.testbed(function(testbed) {
      // Your testbed code
    });
  </script>
</body></html>
```

Use NPM package in Node.
```js
const planck = require('planck/dist/planck-with-testbed');

planck.testbed(function() {
  // ...
});
```

## Projects

#### Games
- [Astray 2](https://wwwtyro.github.io/astray-2/) ([source](https://github.com/wwwtyro/astray-2)) by Rye Terrell
- [Rope](https://one.fserb.com/rope/) ([source](https://github.com/fserb/one/blob/master/src/rope.js)) by Fernando Serboncini
- [I have to flap](https://ihavetoflap.web.app/) by Elias Ku
- [Hoverator](https://vgel.me/hoverator/) by Jonathon Vogel
- [Totem Destroyer](https://www.emanueleferonato.com/2021/03/13/build-a-html5-game-like-old-flash-glory-totem-destroyer-using-phaser-and-planck-js-physics-engine/) by Emanuele Feronato
- [Pancake Tower](https://pancake-tower.netlify.app/) by Aloysius Kieth
- [Acolyte Fight](https://acolytefight.io/)
- [Comeback](http://romainclement.eu/Comeback/) by Romain Clément
- [Nitro Clash](http://nitroclash.io/)
- [Space Rage 2](https://space-rage-2-bad-prospects-dev.netlify.app/) by Hendrik Mans
- Air Hockey ([source](https://github.com/Steveeeie/webgl-air-hockey-server)) by Steve Meredith
- [Coined](https://coined--parameterized.repl.co/) ([source](https://repl.it/talk/challenge/Coined/13314))
- [Zzzone!](https://www.engehausen.de/jan/zzz.html) ([source](https://github.com/smurf667/zzzone)) by Jan Engehausen
- [Star Fly](https://fxplayground.herokuapp.com/) by Kal Torak

#### Dynamic Visualization
 - [Fall / Fill](https://twitter.com/jezzamonn/status/1246212104593403905) by Jez Swanson
 - [1000 Unique Postcards](https://twitter.com/andreasgysin/status/956131218386509824) by Andreas Gysin
 - [Flag in the Wind](https://codepen.io/unframework/pen/OrOMBg) by Nick Matantsev
 - [Dynamic Convex Hull](https://codepen.io/bozheng-stokes/pen/abormNX) by Bo Zheng
 - [Chaotic Water Wheel](https://john-hearn.info/articles/simulate-chaotic-water-wheel-with-planck) by John Hearn

#### Science and AI
 - [Handle](https://twitter.com/marurur/status/1240141036606947329) by Ichiro Maruta
 - [Q-Learning Ragdoll](https://codepen.io/mikkokam/pen/EGEjYe) by Mikko Kämäräinen
 - [Walking EA](https://matsemann.github.io/walkingea/) by Mats Krüger Svensson
 - [Neuroevolution Bots](https://twitter.com/mishig25/status/1077672181503590400) by Mishig Davaadorj
 - [Bubble Treemaps](https://github.com/grtlr/bubble-treemaps)
 - [Walking Robot](https://neuro-ts.vercel.app/walk) [Source](https://github.com/suhdonghwi/neuro-ts/)

#### Game Development
- [Space](https://piqnt.com/space/)
- [Modd.io](https://www.modd.io/)


## Credits

[Box2D](https://github.com/erincatto/box2d) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries such as Apple's SpriteKit.

[Planck.js](https://github.com/shakiba/planck.js) is developed and maintained by [Ali Shakiba](https://github.com/shakiba/).

TypeScript definitions for planck.js are developed by [Oliver Zell](https://github.com/zOadT).


## License

Planck.js is [available under the MIT license](./LICENSE.txt).
