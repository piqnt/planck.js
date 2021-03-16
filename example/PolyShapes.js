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

planck.testbed('PolyShapes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var MAX_BODIES = 256;

  var bodies = [];

  var shapes = [];

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

  {
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
      Vec2(-0.5 * s, 0.0),
    ]);
  }

  shapes[3] = pl.Box(0.5, 0.5);

  shapes[4] = pl.Circle(0.5);

  function createBody(index) {
    if (bodies.length > MAX_BODIES) {
      world.destroyBody(bodies.shift());
    }

    var bd = {};
    bd.type = 'dynamic';

    var x = Math.random() * 0.4 - 2.0;
    bd.position = Vec2(x, 10.0);
    bd.angle = Math.random() * 2 * Math.PI - Math.PI;

    if (index === 4) {
      bd.angularDamping = 0.02;
    }

    var body = world.createBody(bd);

    body.createFixture(shapes[index % shapes.length], {
      density: 1.0,
      friction: 0.3,
    });

    bodies.push(body);
  }

  function destroyBody() {
    world.destroyBody(bodies.shift());
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case '1':
      createBody(1);
      break;

    case '2':
      createBody(2);
      break;

    case '3':
      createBody(3);
      break;

    case '4':
      createBody(4);
      break;

    case '5':
      createBody(5);
      break;

    case 'Z':
      for (var i = 0; i < bodies.length; i += 2) {
        var body = bodies[i];
        body.setActive(!body.isActive());
      }
      break;

    case 'X':
      destroyBody();
      break;
    }
  };

  testbed.info("1-5: Drop new objects, Z: Activate/deactivate some bodies, X: Destroy an object");

  testbed.step = function() {
    AABBQueryListener.reset();
    var aabb = pl.AABB();
    AABBQueryListener.circle.computeAABB(aabb, AABBQueryListener.transform, 0);

    world.queryAABB(aabb, AABBQueryListener.callback);

    testbed.drawCircle(AABBQueryListener.circle.m_p, AABBQueryListener.circle.m_radius, testbed.color(0.4, 0.7, 0.8));
  };

  function drawFixture(fixture) {
    var color = testbed.color(0.95, 0.95, 0.6);
    var xf = fixture.getBody().getTransform();

    switch (fixture.getType()) {
      case 'circle': {
        var circle = fixture.getShape();

        var center = pl.Transform.mul(xf, circle.getCenter());
        var radius = circle.getRadius();

        testbed.drawCircle(center, radius, color);
      }
        break;

      case 'polygon': {
        var poly = fixture.getShape();
        var vertexCount = poly.m_count;
        // assert(vertexCount <= b2_maxPolygonVertices);
        var vertices = poly.m_vertices.map(pl.Transform.mulFn(xf));
        testbed.drawPolygon(vertices, color);
      }
        break;

      default:
        break;
    }
  }

  // This tests stacking. It also shows how to use World.query and TestOverlap.
  // This callback is called by World.queryAABB. We find all the fixtures
  // that overlap an AABB. Of those, we use TestOverlap to determine which fixtures
  // overlap a circle. Up to 4 overlapped fixtures will be highlighted with a
  // yellow border.
  var AABBQueryListener = (function() {
    var def = {};

    def.circle = pl.Circle(Vec2(0.0, 1.1), 2.0);
    def.transform = pl.Transform();
    var count = 0;

    var MAX_COUNT = 40;

    def.reset = function() {
      count = 0;
    };
      // Called for each fixture found in the query AABB.
    // return false to terminate the query.
    def.callback = function(fixture) {
      if (count === MAX_COUNT) {
        return false;
      }

      var body = fixture.getBody();
      var shape = fixture.getShape();

      var overlap = pl.Distance.testOverlap(shape, 0, def.circle, 0, body.getTransform(), def.transform);

      if (overlap) {
        drawFixture(fixture);
        ++count;
      }

      return true;
    };

    return def;
  })();

  return world;
});
