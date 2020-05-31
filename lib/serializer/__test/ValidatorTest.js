var expect = require('chai').expect;

var Ajv = require('ajv');

var Vec2 = require('../../common/Vec2');
var Circle = require('../../shape/CircleShape');
var Box = require('../../shape/BoxShape');
var DistanceJoint = require('../../joint/DistanceJoint');
var World = require('../../World');

var Serializer = require('../../serializer');
var schema = require('../../serializer/schema.json');

describe('Serializer', function() {
  var ajv = new Ajv();
  var validate = ajv.compile(schema);

  it('produces valid schema', function() {
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

    var data = JSON.parse(Serializer.toJson(world));

    // console.log(data);
    var valid = validate(data);
    console.log(valid || validate.errors);
    expect(valid).be.true;
  });
});
