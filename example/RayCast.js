/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This test demonstrates how to use the world ray-cast feature.
// NOTE: we are intentionally filtering one of the polygons, therefore
// the ray will always miss one type of polygon.

// This callback finds the closest hit. Polygon 0 is filtered.
var RayCastClosest = (function() {
  var def = {};

  def.reset = function() {
    def.hit = false;
    def.point = null;
    def.normal = null;
  };

  def.callback = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture and
        // continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.hit = true;
    def.point = point;
    def.normal = normal;

    // By returning the current fraction, we instruct the calling code to clip the ray and
    // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
    // are reported in order. However, by clipping, we can always get the closest fixture.
    return fraction;
  };

  return def;
})();


// This callback finds any hit. Polygon 0 is filtered. For this type of query we are usually
// just checking for obstruction, so the actual fixture and hit point are irrelevant.
var RayCastAny = (function() {
  var def = {};

  def.reset = function() {
    def.hit = false;
    def.point = null;
    def.normal = null;
  };

  def.callback = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.hit = true;
    def.point = point;
    def.normal = normal;

    // At this point we have a hit, so we know the ray is obstructed.
    // By returning 0, we instruct the calling code to terminate the ray-cast.
    return 0.0;
  };

  return def;
})();

// This ray cast collects multiple hits along the ray. Polygon 0 is filtered.
// The fixtures are not necessary reported in order, so we might not capture
// the closest fixture.
var RayCastMultiple = (function() {
  var def = {};
  // var MAX_COUNT = 3;

  def.reset = function() {
    def.points = [];
    def.normals = [];
  };

  def.callback = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.points.push(point);
    def.normals.push(normal);

    // if (m_count == MAX_COUNT) {
    //   // At this point the buffer is full.
    //   // By returning 0, we instruct the calling code to terminate the ray-cast.
    //   return 0.0;
    // }

    // By returning 1, we instruct the caller to continue without clipping the
    // ray.
    return 1.0;
  };

  return def;
})();


planck.testbed('Ray-Cast', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var MAX_BODIES = 256;

  // mode
  var CLOSEST = 1, ANY = 2, MULTIPLE = 3;

  var bodies = [];
  var shapes = [];

  var angle = 0.0;
  var mode = CLOSEST;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  shapes[0] = pl.Polygon([
    Vec2(-0.5, 0.0),
    Vec2(0.5, 0.0),
    Vec2(0.0, 1.5)
  ]);
  shapes[1] = pl.Polygon([
    Vec2(-0.1, 0.0),
    Vec2(0.1, 0.0),
    Vec2(0.0, 1.5)
  ]);

  var w = 1.0;
  var b = w / (2.0 + Math.sqrt(2.0));
  var s = Math.sqrt(2.0) * b;

  shapes[2] = pl.Polygon([
    Vec2(0.5 * s, 0.0),
    Vec2(0.5 * w, b),
    Vec2(0.5 * w, b + s),
    Vec2(0.5 * s, w),
    Vec2(-0.5 * s, w),
    Vec2(-0.5 * w, b + s),
    Vec2(-0.5 * w, b),
    Vec2(-0.5 * s, 0.0)
  ]);
  shapes[3] = pl.Box(0.5, 0.5);

  shapes[4] = pl.Circle(0.5);
  shapes[5] = pl.Edge(Vec2(-1.0, 0.0), Vec2(1.0, 0.0));

  function createBody(index) {
    if (bodies.length > MAX_BODIES) {
      world.destroyBody(bodies.shift());
    }

    var x = pl.Math.random(-10.0, 10.0);
    var y = pl.Math.random(0.0, 20.0);

    var bd = {};
    bd.position = Vec2(x, y);
    bd.angle = pl.Math.random(-Math.PI, Math.PI);
    bd.userData = index;

    if (index === 4) {
      bd.angularDamping = 0.02;
    }

    var body = world.createBody(bd);

    var shape = shapes[index % shapes.length];

    body.createFixture(shape, {friction: 0.3});

    bodies.push(body);
  }


  function destroyBody() {
    world.destroyBody(bodies.shift());
  }

  testbed.keydown = function(code, char) {
    switch (char){
      case 'Z':
        if (mode === CLOSEST) {
          mode = ANY;
        } else if (mode === ANY) {
          mode = MULTIPLE;
        } else if (mode === MULTIPLE) {
          mode = CLOSEST;
        }
        break;
      case 'X':
        destroyBody();
        break;
      case '1':
        createBody(0);
        break;
      case '2':
        createBody(1);
        break;
      case '3':
        createBody(2);
        break;
      case '4':
        createBody(3);
        break;
      case '5':
        createBody(4);
      case '6':
        createBody(5);
        break;
    }

    updateStatus()
  };

  function updateStatus() {
    switch (mode) {
      case CLOSEST:
        testbed.status("Ray-cast mode", "closest - find closest fixture along the ray");
        break;

      case ANY:
        testbed.status("Ray-cast mode", "any - check for obstruction");
        break;

      case MULTIPLE:
        testbed.status("Ray-cast mode", "multiple - gather multiple fixtures");
        break;
    }
  }

  testbed.info("1-6: Drop new objects, Z: Change mode, X: Destroy an object");

  testbed.step = function() {
    var advanceRay = true;

    var L = 11.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * Math.cos(angle), L * Math.sin(angle));
    var point2 = Vec2.add(point1, d);

    if (mode === CLOSEST) {
      RayCastClosest.reset();
      world.rayCast(point1, point2, RayCastClosest.callback);

      if (RayCastClosest.hit) {
        testbed.drawPoint(RayCastClosest.point, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, RayCastClosest.point, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.combine(1, RayCastClosest.point, 0.5, RayCastClosest.normal);
        testbed.drawSegment(RayCastClosest.point, head, testbed.color(0.9, 0.9, 0.4));
      } else {
        testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
      }

    } else if (mode === ANY) {
      RayCastAny.reset();
      world.rayCast(point1, point2, RayCastAny.callback);

      if (RayCastAny.hit) {
        testbed.drawPoint(RayCastAny.point, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, RayCastAny.point, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.combine(1, RayCastAny.point, 0.5, RayCastAny.normal);
        testbed.drawSegment(RayCastAny.point, head, testbed.color(0.9, 0.9, 0.4));
      } else {
        testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
      }

    } else if (mode === MULTIPLE) {
      RayCastMultiple.reset();
      world.rayCast(point1, point2, RayCastMultiple.callback);
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));

      for (var i = 0; i < RayCastMultiple.points.length; ++i) {
        var p = RayCastMultiple.points[i];
        var n = RayCastMultiple.normals[i];
        testbed.drawPoint(p, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, p, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.combine(1, p, 0.5, n);
        testbed.drawSegment(p, head, testbed.color(0.9, 0.9, 0.4));
      }
    }

    if (advanceRay) {
      angle += 0.25 * Math.PI / 180.0;
    }

    if (0) {
      // This case was failing.
      var shape = pl.Box(22.875, 3.0);

      var input = {}; // RayCastInput
      input.p1 = Vec2(10.2725, 1.71372);
      input.p2 = Vec2(10.2353, 2.21807);
      // input.maxFraction = 0.567623;
      input.maxFraction = 0.56762173;

      var xf = pl.Transform();
      xf.setIdentity();
      xf.position = Vec2(23.0, 5.0);

      var output = {}; // RayCastOutput
      var hit = shape.rayCast(output, input, xf);
      hit = false;

      var color = testbed.color(1.0, 1.0, 1.0);
      var vs = shape.vertices.map(Transform.mulFn(xf));

      testbed.drawPolygon(vs, color);
      testbed.drawSegment(input.p1, input.p2, color);
    }
  };

  updateStatus();

  return world;
});
