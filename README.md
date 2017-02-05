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

    npm install stage-js --save

#### Bower

    bower install stage-js --save


## Usage

Planck.js does not uses any renderer by default, so you need to either use a renderer 
or manually call `world.step(hz, dt)` in each frame and then iterate over physics entities to draw or update them.

The [rendered](./testbed/stage-viewer.js) which is used in testbed is based on [Stage.js](https://github.com/shakiba/stage.js/).

## Examples

Examples can be found in [`example`](/example/) directory.


## API

Planck.js public API closely follows Box2D API, with following differences:

- Method names are converted from UpperCamelCase to lowerCamelCase.
- Definition classes/objects (BodyDef, FixtureDef, etc.) are replaced by inline JavaScript objects (`{}`).


## Architecture

Planck.js includes Box2D algorithms without modification and its internal architecture and public API are very similar to Box2D.
However some [changes](./CHANGES.md) and refactoring are made during rewrite to address differences between C++ and JavaScript.


## Development

Install development dependencies:

    npm install
    bower install

Try examples with live build (see command-line output for URL to open):

    npm run testbed


## References

[**Box2D**](http://box2d.org/) is a popular C++ 2D rigid-body physics engine created by [Erin Catto](https://twitter.com/erin_catto). Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, as well as game development tools and libraries.

[iforce2d](https://www.iforce2d.net/b2dtut/) website includes a collection of helpful tutorials and resources to learn Box2D.


## License

Planck.js is [available under the zlib license](./LICENSE.txt).