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

planck.testbed('EdgeShapes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var pause = false;

  var MAX_BODIES = 256;

  var bodies = [];
  var shapes = [];

  {
    var ground = world.createBody();

    var x1 = -20.0;
    var y1 = 2.0 * Math.cos(x1 / 10.0 * Math.PI);
    for (var i = 0; i < 80; ++i) {
      var x2 = x1 + 0.5;
      var y2 = 2.0 * Math.cos(x2 / 10.0 * Math.PI);

      ground.createFixture(pl.Edge(Vec2(x1, y1), Vec2(x2, y2)), 0.0);

      x1 = x2;
      y1 = y2;
    }
  }

  shapes[0] = pl.Polygon([Vec2(-0.5, 0.0), Vec2(0.5, 0.0), Vec2(0.0, 1.5)]);

  shapes[1] = pl.Polygon([Vec2(-0.1, 0.0), Vec2(0.1, 0.0), Vec2(0.0, 1.5)]);

  {
    var w = 1.0;
    var b = w / (2.0 + Math.sqrt(2.0));
    var s = Math.sqrt(2.0) * b;

    var vertices = [];
    vertices[0] = Vec2(0.5 * s, 0.0);
    vertices[1] = Vec2(0.5 * w, b);
    vertices[2] = Vec2(0.5 * w, b + s);
    vertices[3] = Vec2(0.5 * s, w);
    vertices[4] = Vec2(-0.5 * s, w);
    vertices[5] = Vec2(-0.5 * w, b + s);
    vertices[6] = Vec2(-0.5 * w, b);
    vertices[7] = Vec2(-0.5 * s, 0.0);

    shapes[2] = pl.Polygon(vertices);
  }

  shapes[3] = pl.Box(0.5, 0.5);

  shapes[4] = pl.Circle(0.5);

  var angle = 0.0;

  function createItem(index) {
    if (bodies.length > MAX_BODIES) {
      world.destroyBody(bodies.shift());
    }

    var bd = {};

    var x = pl.Math.random(-10.0, 10.0);
    var y = pl.Math.random(10.0, 20.0);

    bd.position = Vec2(x, y);
    bd.angle = pl.Math.random(-Math.PI, Math.PI);
    bd.type = 'dynamic';

    if (index === 4) {
      bd.angularDamping = 0.02;
    }

    var body = world.createBody(bd);

    var fd = {};
    fd.shape = shapes[index];
    fd.friction = 0.3;
    fd.density = 20.0;
    body.createFixture(fd);

    bodies.push(body);
  }

  function destroyBody() {
    world.destroyBody(bodies.shift());
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case '1':
      createItem(0);
      break;
    case '2':
      createItem(1);
      break;
    case '3':
      createItem(2);
      break;
    case '4':
      createItem(3);
      break;
    case '5':
      createItem(4);
      break;
    case 'X':
      destroyBody();
      break;
    case 'Z':
      pause = !pause;
      break;
    }
  };

  testbed.info('1-5: Drop new object, X: Destroy an object');

  var RayCastListener = (function() {
    var def = {};

    def.callback = function(fixture, point, normal, fraction) {
      def.fixture = fixture;
      def.point = point;
      def.normal = normal;
      return fraction;
    };

    def.reset = function() {
      def.fixture = null;
      def.point = null;
      def.normal = null;
    };

    return def;
  })();

  testbed.step = function() {
    var advanceRay = !pause; // settings.pause == 0 || settings.singleStep;

    var L = 25.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * Math.cos(angle), -L * Math.abs(Math.sin(angle)));
    var point2 = Vec2.add(point1, d);

    RayCastListener.reset();

    world.rayCast(point1, point2, RayCastListener.callback);

    if (RayCastListener.fixture) {
      testbed.drawPoint(RayCastListener.point, 5.0, testbed.color(0.4, 0.9, 0.4));
      testbed.drawSegment(point1, RayCastListener.point, testbed.color(0.8, 0.8, 0.8));

      var head = Vec2.combine(1, RayCastListener.point, 0.5, RayCastListener.normal);
      testbed.drawSegment(RayCastListener.point, head, testbed.color(0.9, 0.9, 0.4));
    } else {
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    }

    if (advanceRay) {
      angle += 0.25 * Math.PI / 180.0;
    }
  };

  return world;
});
