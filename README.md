*This project is under active development and is not stable yet.*

## Planck.js<sup>&alpha;</sup>

Planck.js is a JavaScript rewrite of Box2D physics engine for HTML5 game development. Planck.js has a JavaScrip-friendly API and is optimized for web and mobile game development.

[![Car](/doc/img/screenshot.png "Play")](http://piqnt.com/planck.js/Car)

Planck.js includes Box2D algorithms without modification and its internal architecture and external API are very similar to Box2D. However some [changes](./CHANGES.md) and refactoring are made during rewrite to address differences between C++ and JavaScript.

*Box2D is a popular C++ 2D physics engine created by Erin Catto. Box2D is used in several popular games, such as Angry Birds, Limbo and Crayon Physics, and game development tools and libraries.*

### Development

Install development dependencies:

    npm install
    bower install

Try examples with live build (see command-line output for URL to open):

    npm run testbed
