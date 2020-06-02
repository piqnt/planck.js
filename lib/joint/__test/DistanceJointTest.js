var expect = require('chai').expect;

var Vec2 = require('../../common/Vec2');
var Circle = require('../../shape/CircleShape');
var Box = require('../../shape/BoxShape');
var World = require('../../World');

var DistanceJoint = require('../DistanceJoint');

describe('DistanceJoint', function() {

  it('calculates local anchors from global', function() {
    var world = new World();

    var circle = new Circle(1);
    var box = new Box(1, 1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });
    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2(10, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    var joint = new DistanceJoint({}, b1, b2, Vec2(1, 0), Vec2(9, -1));
    world.createJoint(joint);

    expect(joint.getLocalAnchorA()).deep.equal(Vec2(1, 0));
    expect(joint.getLocalAnchorB()).deep.equal(Vec2(-1, -1));

    expect(joint.getAnchorA()).deep.equal(Vec2(1, 0));
    expect(joint.getAnchorB()).deep.equal(Vec2(9, -1));

  });

  it('moves attached body', function() {
    var world = new World();

    var circle = new Circle(1);
    var box = new Box(1, 1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });
    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2(10, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    var joint = new DistanceJoint({}, b1, b2, Vec2(1, 0), Vec2(9, -1));
    world.createJoint(joint);

    b2.applyForceToCenter(Vec2(500, 0), true);
    world.step(1 / 10);

    expect(b1.getPosition().x).closeTo(2, 1e-1);
    expect(b2.getPosition().x).closeTo(12, 1e-1);
  });

});
