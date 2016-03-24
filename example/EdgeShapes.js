/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
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

planck.play('EdgeShapes', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_maxBodies = 256

  var m_bodyIndex;
  var m_bodies = [];
  var m_polygons = [];

  // Ground body
  {
    var bd = {};
    var ground = world.createBody(bd);

    var x1 = -20.0;
    var y1 = 2.0 * Math.cos(x1 / 10.0 * Math.PI);
    for (var i = 0; i < 80; ++i) {
      var x2 = x1 + 0.5;
      var y2 = 2.0 * Math.cos(x2 / 10.0 * Math.PI);

      var shape = pl.Edge(Vec2(x1, y1), Vec2(x2, y2));
      ground.createFixture(shape, 0.0);

      x1 = x2;
      y1 = y2;
    }
  }

  {
    var vertices = [];
    vertices[0] = Vec2(-0.5, 0.0);
    vertices[1] = Vec2(0.5, 0.0);
    vertices[2] = Vec2(0.0, 1.5);
    m_polygons[0] = pl.Polygon(vertices, 3);
  }

  {
    var vertices = [];
    vertices[0] = Vec2(-0.1, 0.0);
    vertices[1] = Vec2(0.1, 0.0);
    vertices[2] = Vec2(0.0, 1.5);
    m_polygons[1] = pl.Polygon(vertices, 3);
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

    m_polygons[2] = pl.Polygon(vertices, 8);
  }

  {
    m_polygons[3] = pl.Box(0.5, 0.5);
  }

  {
    var m_circle = pl.Circle(0.5);
  }

  m_bodyIndex = 0;

  var m_angle = 0.0;

  function Create(index) {
    if (m_bodies[m_bodyIndex] != null) {
      world.destroyBody(m_bodies[m_bodyIndex]);
      m_bodies[m_bodyIndex] = null;
    }

    var bd = {};

    var /* float32 */x = RandomFloat(-10.0, 10.0);
    var /* float32 */y = RandomFloat(10.0, 20.0);

    bd.position = Vec2(x, y);
    bd.angle = RandomFloat(-Math.PI, Math.PI);
    bd.type = 'dynamic';

    if (index == 4) {
      bd.angularDamping = 0.02;
    }

    m_bodies[m_bodyIndex] = world.createBody(bd);

    if (index < 4) {
      var /* FixtureDef */fd;
      fd.shape = m_polygons + index;
      fd.friction = 0.3;
      fd.density = 20.0;
      m_bodies[m_bodyIndex].createFixture(fd);
    } else {
      var /* FixtureDef */fd;
      fd.shape = m_circle;
      fd.friction = 0.3;
      fd.density = 20.0;
      m_bodies[m_bodyIndex].createFixture(fd);
    }

    m_bodyIndex = (m_bodyIndex + 1) % e_maxBodies;
  }

  function DestroyBody() {
    for (var i = 0; i < e_maxBodies; ++i) {
      if (m_bodies[i] != null) {
        world.destroyBody(m_bodies[i]);
        m_bodies[i] = null;
        return;
      }
    }
  }

  function Keyboard(key) {
    switch (key) {
    case GLFW_KEY_1:
    case GLFW_KEY_2:
    case GLFW_KEY_3:
    case GLFW_KEY_4:
    case GLFW_KEY_5:
      Create(key - GLFW_KEY_1);
      break;

    case GLFW_KEY_D:
      DestroyBody();
      break;
    }
  }

  function Step(settings) {
    var advanceRay = settings.pause == 0 || settings.singleStep;

    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine, "Press 1-5 to drop stuff");
    m_textLine += DRAW_STRING_NEW_LINE;

    var L = 25.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * cosf(m_angle), -L * Abs(sinf(m_angle)));
    var /* Vec2 */point2 = point1 + d;

    var callback = new EdgeShapesCallback();

    world.rayCast(callback, point1, point2);

    if (callback.m_fixture) {
      g_debugDraw.DrawPoint(callback.m_point, 5.0, Color(0.4, 0.9, 0.4));

      g_debugDraw.DrawSegment(point1, callback.m_point, Color(0.8, 0.8, 0.8));

      var /* Vec2 */head = callback.m_povar /* int */+ 0.5
          * callback.m_normal;
      g_debugDraw.DrawSegment(callback.m_point, head, Color(0.9, 0.9, 0.4));
    } else {
      g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
    }

    if (advanceRay) {
      m_angle += 0.25 * Math.PI / 180.0;
    }
  }

  function EdgeShapesCallback() {
    /* extends rayCastCallback */
    {
      m_fixture = null;
    }

    function /* float32 */ReportFixture(/* Fixture */fixture, /* const *//* Vec2& */
    point,
    /* const *//* Vec2& */normal, /* float32 */fraction) {
      m_fixture = fixture;
      m_povar /* int */= point;
      m_normal = normal;

      return fraction;
    }

    var /* Fixture */m_fixture;
    var /* Vec2 */m_point;
    var /* Vec2 */m_normal;
  }

  return world;
});
