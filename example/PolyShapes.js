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

planck.play('PolyShapes', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_maxBodies = 256;
  var bodies = [];
  var bodyIndex = 0;
  var polygons = [];

  {
    var ground = world.createBody();
    ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);
  }

  {
    var vertices = [];
    vertices[0] = Vec2(-0.5, 0.0);
    vertices[1] = Vec2(0.5, 0.0);
    vertices[2] = Vec2(0.0, 1.5);
    polygons[0] = pl.Polygon(vertices);
  }

  {
    var vertices = [];
    vertices[0] = Vec2(-0.1, 0.0);
    vertices[1] = Vec2(0.1, 0.0);
    vertices[2] = Vec2(0.0, 1.5);
    polygons[1] = pl.Polygon(vertices);
  }

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

  {
    polygons[3] = pl.Box(0.5, 0.5);
  }

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

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
    case '1'.charCodeAt(0):
      Create(1);
      break;

    case '2'.charCodeAt(0):
      Create(2);
      break;

    case '3'.charCodeAt(0):
      Create(3);
      break;

    case '4'.charCodeAt(0):
      Create(4);
      break;

    case '5'.charCodeAt(0):
      Create(5);
      break;

    case 'A'.charCodeAt(0):
      for (var i = 0; i < e_maxBodies; i += 2) {
        if (bodies[i]) {
          var active = bodies[i].isActive();
          bodies[i].setActive(!active);
        }
      }
      break;

    case 'D'.charCodeAt(0):
      DestroyBody();
      break;
    }
  }, false);

  function Step(settings) {
    Test.step(settings);

    var callback = new PolyShapesCallback();
    callback.m_circle.m_radius = 2.0;
    callback.m_circle.m_p.set(0.0, 1.1);
    callback.m_transform.setIdentity();
    callback.g_debugDraw = g_debugDraw;

    var /* AABB */aabb;
    callback.m_circle.computeAABB(aabb, callback.m_transform, 0);

    world.queryAABB(callback, aabb);

    var color = Color(0.4, 0.7, 0.8);
    g_debugDraw.DrawCircle(callback.m_circle.m_p, callback.m_circle.m_radius,
        color);

    g_debugDraw.DrawString(5, m_textLine, "Press 1-5 to drop stuff");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine,
        "Press 'a' to (de)activate some bodies");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine, "Press 'd' to destroy a body");
    m_textLine += DRAW_STRING_NEW_LINE;
  }

  // This tests stacking. It also shows how to use World.query and TestOverlap.
  // This callback is called by World.queryAABB. We find all the fixtures
  // that overlap an AABB. Of those, we use TestOverlap to determine which
  // fixtures
  // overlap a circle. Up to 4 overlapped fixtures will be highlighted with a
  // yellow border.
  function PolyShapesCallback() { // extends queryCallback

    var e_maxCount = 4;
    var m_count = 0;

    function DrawFixture(fixture) {
      var color = Color(0.95, 0.95, 0.6);
      var xf = fixture.getBody().getTransform();

      switch (fixture.getType()) {
      case 'circle': {
        var circle = fixture.getShape();

        var center = Transform.mul(xf, circle.m_p);
        var radius = circle.getRadius();

        g_debugDraw.DrawCircle(center, radius, color);
      }
        break;

      case 'polygon': {
        var poly = fixture.getShape();
        var vertexCount = poly.m_count;
        // assert(vertexCount <= b2_maxPolygonVertices);
        var vertices = [];
        for (var i = 0; i < vertexCount; ++i) {
          vertices[i] = Mul(xf, poly.m_vertices[i]);
        }
        g_debugDraw.DrawPolygon(vertices, vertexCount, color);
      }
        break;

      default:
        break;
      }
    }

    // Called for each fixture found in the query AABB.
    // @return false to terminate the query.
    function ReportFixture(fixture) {
      if (m_count == e_maxCount) {
        return false;
      }

      var body = fixture.getBody();
      var shape = fixture.getShape();

      var overlap = TestOverlap(shape, 0, m_circle, 0, body.getTransform(),
          m_transform);

      if (overlap) {
        DrawFixture(fixture);
        ++m_count;
      }

      return true;
    }

    var /* CircleShape */m_circle;
    var /* Transform */m_transform;
    var /* Draw */g_debugDraw;
    var /* int32 */m_count;
  }

  return world;
});
