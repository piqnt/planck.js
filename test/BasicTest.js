var expect = require('./testutil/expect');
var sinon = require('sinon');

var Vec2 = require('../lib/common/Vec2');
var Circle = require('../lib/shape/CircleShape');
var Body = require('../lib/Body');
var Fixture = require('../lib/Fixture');
var World = require('../lib/World');

describe('Basic', function() {

  it('World', function() {

    var world = new World();

    var circle = new Circle(1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    expect(b1.getFixtureList().getType()).be('circle');
    expect(b1.getWorld()).be(world);
    expect(world.getBodyList()).be(b1);

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
    expect(p.x).near(0.0);
    expect(p.y).near(0.0);
  });

});
