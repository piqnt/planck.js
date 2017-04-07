/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('PolyShapes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_maxBodies = 256;
  var bodies = [];
  var bodyIndex = 0;
  var polygons = [];

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  polygons[0] = pl.Polygon([
    Vec2(-0.5, 0.0),
    Vec2(0.5, 0.0),
    Vec2(0.0, 1.5)
  ]);

  polygons[1] = pl.Polygon([
    Vec2(-0.1, 0.0),
    Vec2(0.1, 0.0),
    Vec2(0.0, 1.5)
  ]);

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

    polygons[2] = pl.Polygon(vertices);
  }

  polygons[3] = pl.Box(0.5, 0.5);

  var circle = pl.Circle(0.5);

  function Create(index) {
    if (bodies[bodyIndex] != null) {
      world.destroyBody(bodies[bodyIndex]);
      bodies[bodyIndex] = null;
    }

    var bd = {};
    bd.type = 'dynamic';

    var x = Math.random() * 0.4 - 2.0;
    bd.position = Vec2(x, 10.0);
    bd.angle = Math.random() * 2 * Math.PI - Math.PI;

    if (index == 4) {
      bd.angularDamping = 0.02;
    }

    bodies[bodyIndex] = world.createBody(bd);

    if (index < 4) {
      var fd = {};
      fd.density = 1.0;
      fd.friction = 0.3;
      bodies[bodyIndex].createFixture(polygons[index], fd);
    } else {
      var fd = {};
      fd.density = 1.0;
      fd.friction = 0.3;

      bodies[bodyIndex].createFixture(circle, fd);
    }

    bodyIndex = (bodyIndex + 1) % e_maxBodies;
  }

  function DestroyBody() {
    for (var i = 0; i < e_maxBodies; ++i) {
      if (bodies[i] != null) {
        world.destroyBody(bodies[i]);
        bodies[i] = null;
        return;
      }
    }
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case '1':
      Create(1);
      break;

    case '2':
      Create(2);
      break;

    case '3':
      Create(3);
      break;

    case '4':
      Create(4);
      break;

    case '5':
      Create(5);
      break;

    case 'Z':
      for (var i = 0; i < e_maxBodies; i += 2) {
        if (bodies[i]) {
          var active = bodies[i].isActive();
          bodies[i].setActive(!active);
        }
      }
      break;

    case 'X':
      DestroyBody();
      break;
    }
  };

  testbed.info("1-5: Drop new objects, Z: Activate/deactivate some bodies, X: Destroy an object");

  testbed.step = function() {
    var callback = PolyShapesCallback();

    var aabb = pl.AABB();
    callback.m_circle.computeAABB(aabb, callback.m_transform, 0);

    world.queryAABB(aabb, callback.ReportFixture);

    testbed.drawCircle(callback.m_circle.m_p, callback.m_circle.m_radius, testbed.color(0.4, 0.7, 0.8));
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
        var vertices = pl.Transform.mul(xf, poly.m_vertices);
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
  function PolyShapesCallback() {
    var def = {};

    def.m_circle = pl.Circle(Vec2(0.0, 1.1), 2.0);
    def.m_transform = pl.Transform();
    var m_count = 0;

    var e_maxCount = 40;

    // Called for each fixture found in the query AABB.
    // return false to terminate the query.
    def.ReportFixture = function(fixture) {
      if (m_count == e_maxCount) {
        return false;
      }

      var body = fixture.getBody();
      var shape = fixture.getShape();

      var overlap = pl.internal.Distance.testOverlap(shape, 0, def.m_circle, 0, body.getTransform(), def.m_transform);

      if (overlap) {
        drawFixture(fixture);
        ++m_count;
      }

      return true;
    }

    return def;
  }

  return world;
});
