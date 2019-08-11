var diff = require('diff');
var sinon = require('sinon');

var expect = require('./testutil/expect');

var Vec2 = require('../lib/common/Vec2');
var Circle = require('../lib/shape/CircleShape');
var World = require('../lib/World');
var Serializer = require('../lib/util/Serializer');

describe('Serializer', function() {
  it('Serializer', function() {

    var world = new World();

    var circle = new Circle(1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(circle);

    var text = Serializer.toJson(world);
    world = Serializer.fromJson(text);
    var text2 = Serializer.toJson(world);
    var d =  diff.diffLines(text, text2);

    console.log(text);
    console.log(text2);
    console.log(d);

    // expect(p.x).near(0.0);
    // expect(p.y).near(0.0);
  });
});
