*This project is under active development and is not stable yet.*  

# Planck.js<sup>&alpha;</sup>

Planck.js is JavaScript rewrite of Box2D physics engine for cross-platform HTML5 game development.

**[Check out demos!](http://piqnt.com/planck.js/)**

[![Car](/doc/img/screenshot.png "Play")](http://piqnt.com/planck.js/Car)

Key motivations in development of this project are:
- Taking advantage of Box2D's efforts and achievements
- Developing readable and maintainable JavaScript code
- Optimizing the library for web and mobile platforms
- Providing a JavaScrip-friendly API

## Install

#### Download

Latest builds are available on project [releases page](https://github.com/shakiba/planck.js/releases).

#### NPM

    npm install planck-js --save

#### Bower

    bower install planck-js --save


## Examples

Examples can be found in [`example`](/example/) directory.


## Getting Started

Planck.js is a physics engine and does not include any renderer by default, however this repository includes a testbed with a HTML5 Canvas renderer (based on [Stage.js](https://github.com/shakiba/stage.js/)).
If you like to try or learn Planck.js, you can just add your code as an example or start from one of available examples.

In order to do that (assuming you have `git`, `npm` and `bower` installed) follow these steps:

1. Clone or download this repository


2. Install npm and bower dependencies:


    npm install
    bower install

3. Run testbed and open it in your web browser (see command-line output for URL to open):


    npm run testbed


You are all set! You can try available examples or add your own example in `example` directory.

Alternatively, to write and use your own renderer, all you need to do is calling `world.step(hz, dt)` in each frame and then iterating over world entities to draw or update them. You may also want to listen to world events to remove objects which are removed from the world.


## Usage Manual

Planck.js public API closely follows Box2D API, with following differences:

- `b2` prefix is dropped from class names, for example `b2World` is now available as `planck.World`.
- Method names are converted from UpperCamelCase to lowerCamelCase.
- Definition classes/objects (BodyDef, FixtureDef, etc.) are replaced by inline JavaScript objects (`{}`).
- Shapes are made immutable and are not cloned when used to create fixtures.
- `World#on(eventName, listenerFn)` and `World#off(eventName, listenerFn)` are added to add and remove event listeners. Currently supported events are:
    - `'contact-begin'`
    - `'contact-end'`
    - `'pre-solve'`
    - `'post-solve'`
    - `'joint-removed'`
    - `'fixture-removed'`
    - `'body-removed'`


To learn Box2D please see Box2D <a href="http://box2d.org/documentation/" target="_blank">Manual</a> and <a href="https://github.com/erincatto/Box2D/wiki/FAQ" target="_blank">FAQ</a>.

## Architecture

Planck.js includes Box2D algorithms without modification and its internal architecture and public API are very similar to Box2D.
However some [changes](./CHANGES.md) and refactoring are made during rewrite to address differences between C++ and JavaScript.


## References

[**Box2D**](http://box2d.org/) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries such as Apple's SpriteKit.

[iforce2d](https://www.iforce2d.net/b2dtut/) website includes a collection of helpful tutorials and resources to learn Box2D.


## License

Planck.js is [available under the zlib license](./LICENSE.txt).