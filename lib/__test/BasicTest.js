var expect = require('chai').expect;

var Vec2 = require('../common/Vec2');
var Circle = require('../shape/CircleShape');
var World = require('../World');

require('../shape/CollideCircle');

describe('Basic', function() {

  it('World', function() {

    var world = new World();

    var circle = new Circle(1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    expect(b1.getFixtureList().getType()).equal('circle');
    expect(b1.getWorld()).equal(world);
    expect(world.getBodyList()).equal(b1);

    b1.applyForceToCenter(Vec2(1, 0), true);

    var b2 = world.createBody({
      position : Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(circle);
    b2.applyForceToCenter(Vec2(-1, 0), true);

    world.step(1 / 20);

    // console.log(b2.getPosition());

    var p = b1.getPosition();
    expect(p.x).closeTo(0.0, 1e-12);
    expect(p.y).closeTo(0.0, 1e-12);
  });

});
