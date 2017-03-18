var expect = require('./testutil/expect');
var sinon = require('sinon');

var Vec2 = require('../lib/common/Vec2');
var Transform = require('../lib/common/Transform');
var Sweep = require('../lib/common/Sweep');

var Circle = require('../lib/shape/CircleShape');

var Body = require('../lib/Body');
var Fixture = require('../lib/Fixture');
var World = require('../lib/World');

var TimeOfImpact = require('../lib/collision/TimeOfImpact');
var TOIInput = TimeOfImpact.Input;
var TOIOutput = TimeOfImpact.Output;

var Distance = require('../lib/collision/Distance');
var DistanceInput = Distance.Input;
var DistanceOutput = Distance.Output;
var DistanceProxy = Distance.Proxy;
var SimplexCache = Distance.Cache;

describe('CCD', function() {

  it('Distance', function() {
    var c1 = Circle(1);

    var input = new DistanceInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);
    input.transformA = new Transform(Vec2(0, 0), 0);
    input.transformB = new Transform(Vec2(1.9, 0), 0);
    input.useRadii = true;
    var cache = new SimplexCache();
    var output = new DistanceOutput();
    Distance(output, cache, input);

    expect(output.distance).be(0);
    console.log(output);

    var input = new DistanceInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);
    input.transformA = new Transform(Vec2(0, 0), 0);
    input.transformB = new Transform(Vec2(2.1, 0), 0);
    input.useRadii = true;
    var cache = new SimplexCache();
    var output = new DistanceOutput();
    Distance(output, cache, input);

    expect(output.distance).near(0.1)
    console.log(output);
  });

  it('TimeOfImpact', function() {
    var c1 = Circle(1);

    var input = new TOIInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);

    input.sweepA = new Sweep();
    input.sweepA = new Sweep();

    input.sweepA.setTransform(new Transform(Vec2(0, 0), 0));
    input.sweepB.setTransform(new Transform(Vec2(1.9, 0), 0));

    input.tMax = 1.0;

    var output = new TOIOutput();

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(Vec2(2, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(Vec2(2.1, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);
  });

  it('Solver', function() {
  });

});
