var expect = require('chai').expect;

var Vec2 = require('../../common/Vec2');
var Circle = require('../../shape/CircleShape');
var Box = require('../../shape/BoxShape');
var DistanceJoint = require('../../joint/DistanceJoint');
var World = require('../../World');

var Serializer = require('../../serializer');

describe('Serializer', function() {
  it('saves and loads to JSON', function() {

    var world = new World();

    var circle = new Circle(1);
    var box = new Box(1, 1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    world.createJoint(new DistanceJoint({
      bodyA: b1,
      localAnchorA: Vec2(6, 0),
      bodyB: b2,
      localAnchorB: Vec2(0, -1)
    }));

    var text = Serializer.toJson(world);
    // console.log(text);

    world = Serializer.fromJson(text);
    var text2 = Serializer.toJson(world);
    // console.log(text2);

    expect(text.split('\n')).to.deep.equal(text2.split('\n'));
  });
});
