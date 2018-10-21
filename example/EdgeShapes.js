/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2010 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
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
