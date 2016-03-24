var pl = require('../lib');
var Vec2 = pl.Vec2;

describe('Debug', function() {
  it('Debug', function() {

    var world = new pl.World({
      gravity : Vec2(0, -10),
      velocityIterations : 8,
      positionIterations : 3
    });

    // Put code to debug here:

    for (var i = 0; i < 3; i++) {
      world.step(0.02);
    }
  });
});
